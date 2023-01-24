import { AppProps } from "next/app";
import App from "next/app";
import React, { useEffect, useState } from "react";
import "../globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import Navigation from "../ui/components/Navigation/Navigation";
import Footer from "../ui/components/Footer/Footer";
import PageOverviewTemp from "../ui/components/PageOverviewTemp/PageOverviewTemp";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import ProtectedRoutes from "../route/ProtectedRoutes";
import AdminProtectedRoutes from "../route/AdminProtectedRoutes";

// This default export is required in a new `pages/_app.js` file.

const noAuthRequired = ["/", "/login", "/register", "/register-admin"];
const customerAuthRequired = [
  "/account",
  "/booking-service",
  "/booking-employee",
  "/booking-calendar",
  "/booking-confirmation",
];
const adminAuthRequired = [
  "/account-admin",
  "/store-setup",
  "/service-setup",
  "/register-admin",
  "/team-setup",
];
export default function MyApp({ Component, pageProps }: AppProps) {
  // const { currentUser } = useAuthContext();
  const Router = useRouter();

  return (
    <AuthContextProvider>
      {/* <Component {...pageProps} /> */}

      <div className="grid_main_wrapper">
        <Navigation customer_logged_out />
        <div className="page_wrapper">
          {noAuthRequired.includes(Router.pathname) ? (
            <Component {...pageProps} />
          ) : customerAuthRequired.includes(Router.pathname) ? (
            <ProtectedRoutes>
              <Component {...pageProps} />
            </ProtectedRoutes>
          ) : (
            <AdminProtectedRoutes>
              <Component {...pageProps} />
            </AdminProtectedRoutes>
          )}
        </div>
        <PageOverviewTemp />
      </div>
      <div className="grid_footer">
        <Footer />
      </div>
    </AuthContextProvider>
  );
}
