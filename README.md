# Asymetric encryption in web browser


## Generate keys

openssl genrsa -out key.pem 1024
openssl rsa -in key.pem -outform PEM -pubout -out public.pem
openssl rsa -pubin -inform PEM -in public.pem -modulus -outform PEM -out pub.spki.pem


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.





