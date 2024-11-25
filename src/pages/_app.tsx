// pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

const MyApp = ({ Component, pageProps }: AppProps) => (
    <>
        <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
            strategy="beforeInteractive"
        />
        <Component {...pageProps} />
    </>
);

export default MyApp;
