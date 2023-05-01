import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

// const pemEncodedPublicKey = `-----BEGIN PUBLIC KEY-----
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo5jclK+fySPnGFco1Nut
// 7eiXzdPIkR5zBxVSKCXIdOJ0qsPjYIeKZQ1Di+xFfJJEO3xuNi8M9ol2Zqte/DD2
// W83OxQre0tGUmx5mddlChwUthPXt6i+lCEGpjkiD5fATK70YBMFc4UI3iTzFxPcQ
// ZXvhe53uCkR4JUJhFireeujExr+spoodaUxE4dZvu4WXeJiXrG5B9ONJ9awaZJAi
// kOqm7Q70cfI5LnW2BaOIQcgGPNvErGwBgJrE5lk704VIPvet7wnQKzD7I/YnAVWg
// t4iL6xSzKBp/mcS+4S78IIhkhAkxVUrvpnNNnb/Yab/0/7Fatp2PWINSGzD9qyKm
// rwIDAQAB
// -----END PUBLIC KEY-----`;

const pemEncodedPrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCjmNyUr5/JI+cY
VyjU263t6JfN08iRHnMHFVIoJch04nSqw+Ngh4plDUOL7EV8kkQ7fG42Lwz2iXZm
q178MPZbzc7FCt7S0ZSbHmZ12UKHBS2E9e3qL6UIQamOSIPl8BMrvRgEwVzhQjeJ
PMXE9xBle+F7ne4KRHglQmEWKt566MTGv6ymih1pTETh1m+7hZd4mJesbkH040n1
rBpkkCKQ6qbtDvRx8jkudbYFo4hByAY828SsbAGAmsTmWTvThUg+963vCdArMPsj
9icBVaC3iIvrFLMoGn+ZxL7hLvwgiGSECTFVSu+mc02dv9hpv/T/sVq2nY9Yg1Ib
MP2rIqavAgMBAAECggEAFS5EWMfIMz1/vQoD0lNC2IuFo/Nog0li8SbUhTgnFOMA
4d8MwEGsLFskRKhpcrBpPx5kEoXS8tRnTPGhEZuxOb+SprY6lSbnS5ILB/UCBQMp
mo5QqEJU5pXBwxcmZI3JnZ8UzgDO6qctE4qXvGGUcN8yGVQgLpogyAopEbqpJVZq
rXT/WPSocjFEHGQqudAZsoSFVJOCVM4PrEFc3Tc7Tu4xnO0ttuwPQiRRINd/LkgE
un02f8tEakmyLSOl6sm/yyoKR2klxIFUwVPJZtSInXInXGhv3iMZhIQuBh1xuw58
3d4WJQ79tvWdF4QIjP9FPQvTvl3UIYgWmNF+BK34QQKBgQDN5vR+XG4Fv2dOyeGc
WniFsbQ/t3K9Ndq1rahsGS1Jsz11Bv1gvuuNnP5KHckunrUGyFJiwOFEFyzWRY77
kklq7fjwxdARawAtBDXuK6WGmnRophMMMvY9/Gw/pcdxEznqZD9erSNdOYVMzdB8
nNDkijQ7gNY2ENR6Mu4BIsUJYQKBgQDLZtkvnlEHvOklWf32xSnOkVUBmt3sdtpX
zy3LuUu4bWVASV4KcutzWpF7Ix6vwF03zJO7QYGAVEa55PONoUchgVV3g1VJJ7Q4
wh0/PhTE0jOU6AafPybchghggloun5k+KfUWapJahTUVkN/CG+03fZKUawsRQFCO
M94CaStaDwKBgQC5VHGrLy0E1WR6YXJGFpS22d3BIDERp+DFeJrJOdwuozvlEzaL
ly1UWQP12FuWL9oHUdX991iLvkRoVVG+lMyqh6pzpcmDdAlDe6/DQdwKjQnMi/dH
GrPT1Vnl7CTZXZHarQLxB+x14+lc2UAYedn4a4FaMbweDAYEO8VIlnA94QKBgQCt
zXRH/D/BHOsbv4oDEvZmTEkW1f5L0ENCRQYcznilXtTl2ctBonEOYJVvYtMV2onM
5EJX/+FohprovXpfyy+8sYcWWGLH3+Vfmn7jS2jzxanN03XVHWFXjjAaR0hIDpgj
RjbmsKneL3TsuJ56fuJ0SBi4Ob97PjmXSTqrVLJ2gQKBgHXIsR2DjEVZRoEu+JIA
ybVoeJNmfZNVcC/RE1ij74p42xMfVlhYxlaFH5SOp5T2GnaafkfL6JGd0ZXrIqPs
ihBGzYBg5BqHhw3FAtZltaWjXTCDzsW0A4zuTK6tCw63e7sRVdcA67bIDrS5pIF3
QfxCdZSvDUp8XAEUzdiiecUo
-----END PRIVATE KEY-----`;

const exampleText =
  "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.";

const State = Object.freeze({
  LOADING: "LOADING",
  ERROR: "ERROR",
  READY: "READY",
});

export default function Home() {
  const [state, setState] = useState(State.LOADING);
  let cryptoKey = null;

  useEffect(() => {
    doSomething();
  });

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
        setState(State.ERROR);
        throw new Error("Network response failed");
      }

      return response.text();
    } catch (error) {
      console.log(error);
      setState(State.ERROR);

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

  const encrypt = async (message, publicKeyPem) => {
    const cryptoKeyPublic = await createCryptoKeyFromPublicKey(publicKeyPem);

    let encoder = new TextEncoder();
    let encoded = encoder.encode(message);

    const cipher = await window.crypto.subtle.encrypt(
      { name: "RSA-OAEP" },
      cryptoKeyPublic,
      encoded
    );

    return arrayBufferToBase64(cipher);
  };

  const decrypt = async (encodedCipher, privateKeyPem) => {
    const cipher = base64ToArrayBuffer(encodedCipher);

    const cryptoKeyPrivate = await createCryptoKeyFromPrivateKey(privateKeyPem);

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
      .join("");

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
        <h1>Encryption example</h1>
        <button
          onClick={() => {
            doSomething();
          }}
        >
          Import PEM
        </button>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
