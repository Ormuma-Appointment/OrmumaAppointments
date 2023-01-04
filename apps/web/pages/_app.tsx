import { AppProps } from "next/app";
import React from "react";
import "../globals.css";
import Navigation from "../ui/components/Navigation/Navigation";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation customer_logged_out />
      <Component {...pageProps} />
    </>
  );
}
