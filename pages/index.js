import Head from "next/head";
import Image from "next/image";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.home_container}>
      <Head>
        <title>Home | Holidaze</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />

      <main className={styles.home_main}>
        <div className={styles.home_heroBanner}>
          <SearchBar />
        </div>
        <div className={styles.home_emailBanner}>
          <div className={styles.home_emailBanner_leftContent}></div>
          <div className={styles.home_emailBanner_rightContent}>
            <Image
              src="/images/emailBanner.png"
              height={250}
              width={250}
              alt="Email banner"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
