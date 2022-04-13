import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer, Button, Group, Burger, Modal } from "@mantine/core";
import styles from "../styles/Home.module.scss";

function Navbar() {
  const [opened, setOpened] = useState(false);
  const [poppUp, setPoppUp] = useState(false);
  const title = opened ? "Close navigation" : "Open navigation";
  return (
    <div className={styles.nav_container}>
      <div className={styles.nav_logo}>
        <Link href="/">
          <a>
            <Image src="/images/logo.jpg" height={37} width={163} alt="Logo" />
          </a>
        </Link>
      </div>

      <ul className={styles.nav_actions}>
        <li>
          <Link href="/">
            <a>
              <span className={styles.nav_actions_active}>H</span>ome
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
        <button
          className={styles.nav_actions_button}
          onClick={() => setPoppUp(true)}
        >
          Sign in
        </button>
      </ul>

      <Modal
        poppUp={poppUp}
        onClose={() => setPoppUp(false)}
        title="Introduce yourself!"
      >
        {/* Modal content */}
      </Modal>

      <div className={styles.nav_burger}>
        <Burger
          size={20}
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          title={title}
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
                    <span className={styles.nav_actions_active}>H</span>ome
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

        <Group position="center">
          <Button onClick={() => setOpened(true)}>Open Drawer</Button>
        </Group>
      </div>
    </div>
  );
}

export default Navbar;
