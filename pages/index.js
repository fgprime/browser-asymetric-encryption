import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

const pemEncodedKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy3Xo3U13dc+xojwQYWoJLCbOQ5fOVY8LlnqcJm1W1BFtxIhOAJWohiHuIRMctv7dzx47TLlmARSKvTRjd0dF92jx/xY20Lz+DXp8YL5yUWAFgA3XkO3LSJgEOex10NB8jfkmgSb7QIudTVvbbUDfd5fwIBmCtaCwWx7NyeWWDb7A9cFxj7EjRdrDaK3ux/ToMLHFXVLqSL341TkCf4ZQoz96RFPUGPPLOfvN0x66CM1PQCkdhzjE6U5XGE964ZkkYUPPsy6Dcie4obhW4vDjgUmLzv0z7UD010RLIneUgDE2FqBfY/C+uWigNPBPkkQ+Bv/UigS6dHqTCVeD5wgyBQIDAQAB
-----END PUBLIC KEY-----`;

const text =
  "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.";

export default function Home() {
  // const [encryptedText, setEncryptedText] = useState(null);

  useEffect(() => {
    encrypt();
  });

  // from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey
  const str2ab = (str) => {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  };

  const importRsaKey = async (pem) => {
    // fetch the part of the PEM string between header and footer
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    const pemContents = pem.substring(
      pemHeader.length,
      pem.length - pemFooter.length
    );
    // base64 decode the string to get the binary data
    const binaryDerString = window.atob(pemContents);
    // convert from a binary string to an ArrayBuffer
    const binaryDer = str2ab(binaryDerString);

    return await window.crypto.subtle
      .importKey(
        "spki",
        binaryDer,
        {
          name: "RSA-OAEP",
          hash: "SHA-256",
        },
        true,
        ["encrypt"]
      )
      .then((result) => {
        // setEncryptionKey;
        // console.dir(result);
        return result;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const encrypt = (e) => {
    importRsaKey(pemEncodedKey).then((key) => {
      encryptMessage(text, key);
      console.dir(key);
    });
  };

  const encryptMessage = async (message, key) => {
    let encoder = new TextEncoder();
    let encoded = encoder.encode(message);

    let ciphertext = await window.crypto.subtle.encrypt(
      { name: "RSA-OAEP" },
      key,
      encoded
    );

    console.dir(ciphertext);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Encryption example</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button onClick={encrypt}>Import PEM</button>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
