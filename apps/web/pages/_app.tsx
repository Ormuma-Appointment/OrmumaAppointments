import { AppProps } from "next/app";
import React from "react";
import "../globals.css";
import Navigation from "../ui/components/Navigation/Navigation";
import Footer from "../ui/components/Footer/Footer";
import PageOverviewTemp from "../ui/components/PageOverviewTemp/PageOverviewTemp";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="grid_main_wrapper">
        <Navigation customer_logged_out />
        <div className="page_wrapper">
          <Component {...pageProps} />
        </div>
        <PageOverviewTemp />
      </div>
      <div className="grid_footer">
        <Footer />
      </div>
    </>
  );
}
