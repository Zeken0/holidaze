import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer, Button, Group, Burger, Modal } from "@mantine/core";
import styles from "../styles/Home.module.scss";

function Navbar() {
  const [opened, setOpened] = useState(false);

  return (
    <div className={styles.nav_container}>
      <div className={styles.nav_logo}>
        <Link href="/">
          <a>
            <Image src="/images/logo.png" height={32} width={132} alt="Logo" />
          </a>
        </Link>
      </div>

      <ul className={styles.nav_actions}>
        <li>
          <Link href="/">
            <a>
              <span className={styles.nav_actions_styling}>H</span>ome
            </a>
          </Link>
        </li>

        <li>
          <Link href="/explore">
            <a>
              <span className={styles.nav_actions_styling}>E</span>xplore
            </a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>
              <span className={styles.nav_actions_styling}>C</span>ontact
            </a>
          </Link>
        </li>
        <button className={styles.nav_actions_button}>Sign in</button>
      </ul>

      <div className={styles.nav_burger}>
        <Burger
          size={20}
          opened={opened}
          onClick={() => setOpened((o) => !o)}
        />
      </div>
      <div className={styles.nav_drawer}>
        <Drawer
          position="left"
          opened={opened}
          onClose={() => setOpened(false)}
          padding="sm"
          size="md"
        >
          {
            <ul className={styles.nav_actions}>
              <li>
                <Link href="/">
                  <a>
                    <span className={styles.nav_actions_styling}>H</span>ome
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/explore">
                  <a>
                    <span className={styles.nav_actions_styling}>E</span>xplore
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/contact">
                  <a>
                    <span className={styles.nav_actions_styling}>C</span>ontact
                  </a>
                </Link>
              </li>

              <button className={styles.nav_actions_button}>Sign in</button>
            </ul>
          }
        </Drawer>
      </div>
    </div>
  );
}

export default Navbar;
