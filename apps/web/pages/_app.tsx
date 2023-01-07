import { AppProps } from "next/app";
import "../globals.css";
import { AuthContextProvider } from "../firebase/AuthContext";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
