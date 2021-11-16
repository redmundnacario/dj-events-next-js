import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";
import Showcase from "@/components/showcase/Showcase";
import styles from "@/styles/Layout.module.css";

export default function Layout({ title, keywords, description, children }) {
    const router = useRouter();
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <link rel="icon" href="/favicon.ico" />s
            </Head>

            <Header />
            {router.pathname === "/" && <Showcase />}
            <div className={styles.container}>{children}</div>
            <Footer />
        </div>
    );
}

Layout.defaultProps = {
    title: "DJ Events | Find the latest DJ events",
    Description: "Find the latest DJ and other musical events",
    keywords: "music, dj, events",
};
