import React from "react";
import styles from "../styles/Home.module.scss";

function Footer() {
  return (
    <div className={styles.footer_container}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
      </a>
    </div>
  );
}

export default Footer;
