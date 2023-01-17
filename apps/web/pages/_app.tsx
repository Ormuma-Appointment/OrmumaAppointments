import { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import "../globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import Navigation from "../ui/components/Navigation/Navigation";
import Footer from "../ui/components/Footer/Footer";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  // const { currentUser } = useAuthContext();

  const router = useRouter();
  console.log(pageProps);
  return (
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
  );
}
