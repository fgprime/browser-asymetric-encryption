# Asymetric encryption in web browser


## Generate keys

```bash
openssl genpkey -algorithm RSA -out privatekey.pem
openssl rsa -in privatekey.pem -pubout -out publickey.pem
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.





