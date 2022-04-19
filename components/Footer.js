import styles from "../styles/Home.module.scss";
import Image from "next/image";
import Link from "next/link";
import { IoLogoTwitter, IoLogoInstagram, IoLogoYoutube } from "react-icons/io5";

function Footer() {
  return (
    <div className={styles.footer_container}>
      <div className={styles.footer_top_content}>
        <div>
          <Link href="/">
            <a>
              <Image
                src="/images/logo.jpg"
                height={37}
                width={163}
                alt="Logo"
              />
            </a>
          </Link>
          <p>ewefwefwefwefefwefwefwefwefwefwef</p>
        </div>
        <div>
          <ul>
            <span className={styles.primary_span}>About us</span>
            <span className={styles.secondary_span}></span>
            <span className={styles.secondary_span}></span>
            <span className={styles.secondary_span}></span>
          </ul>
          <ul>
            <span className={styles.primary_span}>About us</span>
            <span className={styles.secondary_span}></span>
            <span className={styles.secondary_span}></span>
            <span className={styles.secondary_span}></span>
          </ul>
          <ul>
            <span className={styles.primary_span}>About us</span>
            <span className={styles.secondary_span}></span>
            <span className={styles.secondary_span}></span>
            <span className={styles.secondary_span}></span>
          </ul>
        </div>
      </div>
      <div className={styles.footer_lineSeparator}></div>
      <div className={styles.footer_bottom_content}>
        <div>
          <p>© 2020 mantine.dev. All rights reserved.</p>
        </div>
        <div>
          <IoLogoTwitter />
          <IoLogoYoutube />
          <IoLogoInstagram />
        </div>
      </div>
    </div>
  );
}

export default Footer;
