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
                src="/images/logo.png"
                height={37}
                width={163}
                alt="Logo"
              />
            </a>
          </Link>
        </div>
        <div className={styles.footer_list}>
          <ul>
            <li>About us</li>
            <Link href="/contact">
              <a>
                <li>Contact</li>
              </a>
            </Link>
            <li>Trust & Safety</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className={styles.footer_logos}>
          <IoLogoTwitter />
          <IoLogoYoutube />
          <IoLogoInstagram />
        </div>
      </div>
      <div className={styles.footer_lineSeparator}></div>
      <div className={styles.footer_bottom_content}>
        <div>
          <p>
            This site is made for a school project. | © 2022 Holidaze.com. All
            rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
