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
        <div className={styles.footer_list}>
          <ul>
            <li className={styles.primary_span}>About us</li>
            <li className={styles.secondary_span}>1</li>
            <li className={styles.secondary_span}>2</li>
            <li className={styles.secondary_span}>3</li>
          </ul>
          <ul>
            <li className={styles.primary_span}>About us</li>
            <li className={styles.secondary_span}>1</li>
            <li className={styles.secondary_span}>2</li>
            <li className={styles.secondary_span}>3</li>
          </ul>
          <ul>
            <li className={styles.primary_span}>About us</li>
            <li className={styles.secondary_span}>1</li>
            <li className={styles.secondary_span}>2</li>
            <li className={styles.secondary_span}>3</li>
          </ul>
        </div>
      </div>
      <div className={styles.footer_lineSeparator}></div>
      <div className={styles.footer_bottom_content}>
        <div>
          <p>This site is for a school project.</p>
          <p>© 2022 Holidaze.com. All rights reserved.</p>
        </div>
        <div className={styles.footer_logos}>
          <IoLogoTwitter />
          <IoLogoYoutube />
          <IoLogoInstagram />
        </div>
      </div>
    </div>
  );
}

export default Footer;
