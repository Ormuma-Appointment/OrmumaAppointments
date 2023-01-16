import { AppProps } from "next/app";
import React from "react";
import "../globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import Navigation from "../ui/components/Navigation/Navigation";
import Footer from "../ui/components/Footer/Footer";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        {/* <Component {...pageProps} /> */}

        <div className="grid_main_wrapper">
          <Navigation customer_logged_out />
          <div className="page_wrapper">
            <Component {...pageProps} />
          </div>
        </div>
        <div className="grid_footer">
          <Footer />
        </div>
      </AuthContextProvider>
    </>
  );
}
