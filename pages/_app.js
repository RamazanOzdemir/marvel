import { HeroProvider } from "../context/Heros";
import "../styles/globals.css";

import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <HeroProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </HeroProvider>
  );
}

export default MyApp;
