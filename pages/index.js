import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

const MESSAGE =
  "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.";

export default function Home() {
  const [message, setMessage] = useState(MESSAGE);
  const [ciphertext, setCiphertext] = useState(null);
  const [encryption, setEncryption] = useState(false);
  const [cryptoKey, setCryptoKey] = useState(null);

  useEffect(() => {
    const creatCryptoKey = async () => {
      const publicKeyPem = await loadPublicKey();
      const result = await createCryptoKeyFromPublicKey(publicKeyPem);
      setCryptoKey(result);
    };
    creatCryptoKey();

    example();
  }, []);

  const example = async () => {
    // Load external public key from PEM file
    const publicKeyPem = await loadPublicKey();

    // Create crypto key from public key PEM file
    const cryptoKeyPublic = await createCryptoKeyFromPublicKey(publicKeyPem);

    // Encrypt message based on public key
    const encodedCipher = await encrypt(MESSAGE, cryptoKeyPublic);
    console.log(encodedCipher);

    // Load internal example private key from PEM const
    const privateKeyPem = process.env.privateKey;

    // Create crypto key from private key PEM file
    const cryptoKeyPrivate = await createCryptoKeyFromPrivateKey(privateKeyPem);

    // Decrypt message based on private key
    const message = await decrypt(encodedCipher, cryptoKeyPrivate);

    console.dir(MESSAGE);
    console.dir(message);
  };

  const encryptEvent = async () => {
    const cipherArray = await encrypt(message, cryptoKey);

    setCiphertext(cipherArray);
    setEncryption(true);
    setMessage(cipherArray);
  };

  const decryptEvent = async () => {
    try {
      const key = await createCryptoKeyFromPrivateKey(process.env.privateKey);
      const message = await decrypt(ciphertext, key);
      setEncryption(false);
      setMessage(message);
    } catch (error) {
      console.error(error);
    }
  };

  const doSomething = async () => {
    // Load external public key from PEM file
    const publicKeyPem = await loadPublicKey();

    // Encrypt message based on public key
    const encodedCipher = await encrypt(exampleText, publicKeyPem);
    console.log(encodedCipher);

    // Load internal example private key from PEM const
    const privateKeyPem = pemEncodedPrivateKey;

    // Decrypt message based on private key
    const message = await decrypt(encodedCipher, privateKeyPem);

    console.dir(exampleText);
    console.dir(message);
  };

  const loadPublicKey = async () => {
    try {
      const response = await fetch("publickey");

      if (!response.ok) {
        throw new Error("Network response failed");
      }

      return response.text();
    } catch (error) {
      console.log(error);

      return;
    }
  };

  const createCryptoKeyFromPublicKey = (publicKeyPem) => {
    return crypto.subtle.importKey(
      "spki",
      pemToBinary(publicKeyPem),
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      true,
      ["encrypt"]
    );
  };

  const createCryptoKeyFromPrivateKey = (privateKeyPem) => {
    return crypto.subtle.importKey(
      "pkcs8",
      pemToBinary(privateKeyPem),
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      false,
      ["decrypt"]
    );
  };

  const encrypt = async (message, cryptoKeyPublic) => {
    let encoder = new TextEncoder();
    let encoded = encoder.encode(message);

    const cipher = await window.crypto.subtle.encrypt(
      { name: "RSA-OAEP" },
      cryptoKeyPublic,
      encoded
    );

    return arrayBufferToBase64(cipher);
  };

  const decrypt = async (encodedCipher, cryptoKeyPrivate) => {
    const cipher = base64ToArrayBuffer(encodedCipher);

    let message = await window.crypto.subtle.decrypt(
      {
        name: "RSA-OAEP",
      },
      cryptoKeyPrivate,
      cipher
    );

    const decoder = new TextDecoder();

    return decoder.decode(message);
  };

  // Convert PEM key file to a binary key
  const pemToBinary = (pem) => {
    const lines = pem.split("\n");

    const start = lines.findIndex((element) => {
      return element.includes("BEGIN") && element.includes("KEY");
    });

    const end = lines.findIndex((element) => {
      return element.includes("END") && element.includes("KEY");
    });

    if (end === -1 || start === -1) throw new Error("Invalid PEM file");

    const encoded = lines
      .filter((_, index) => index > start && index < end)
      .join("")
      .replace(/\s/g, "");

    return Uint8Array.from(window.atob(encoded), (c) => c.charCodeAt(0));
  };

  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  function base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Encryption example</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>En/Decryption example</h1>
        <p>
          <input
            type="text"
            value={message}
            readOnly={encryption}
            onChange={(e) => setMessage(e.target.value)}
          />
        </p>
        {encryption ? (
          <button onClick={() => decryptEvent()}>Decrypt </button>
        ) : (
          <button onClick={() => encryptEvent()}>Encrypt</button>
        )}
      </main>
    </div>
  );
}
