import { AppProps } from "next/app";
import React from "react";
import "../globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import Navigation from "../ui/components/Navigation/Navigation";
import Footer from "../ui/components/Footer/Footer";
import { useRouter } from "next/router";
import ProtectedRoutes from "../route/ProtectedRoutes";
import { BookingContextProvider } from "../context/BookingContext";
import AdminProtectedRoutes from "../route/AdminProtectedRoutes";
import { ParallaxProvider } from "react-scroll-parallax";

const noAuthRequired = [
  "/",
  "/h/[slug]",
  "/login",
  "/register",
  "/register-admin",
  "/registration-confirmation",
];
const customerAuthRequired = [
  "/account",
  "/booking-service",
  "/booking-employee",
  "/booking-calendar",
  "/booking-confirmation",
];

export default function MyApp({ Component, pageProps }: AppProps) {
  const Router = useRouter();

  return (
    <ParallaxProvider>
      <AuthContextProvider>
        <BookingContextProvider>
          <div className="grid_main_wrapper">

            <Navigation />

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
          </div>
          <div className="grid_footer">
            <Footer />
          </div>
        </BookingContextProvider>
      </AuthContextProvider>
    </ParallaxProvider>
  );
}
