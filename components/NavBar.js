import { useState } from "react";
import Image from "next/image";
import { Drawer, Button, Group, Burger } from "@mantine/core";
import styles from "../styles/Home.module.scss";

function Navbar() {
  const [opened, setOpened] = useState(false);
  const title = opened ? "Close navigation" : "Open navigation";
  return (
    <div className={styles.nav_container}>
      <div className={styles.nav_logo}>
        <Image src="/images/logo.jpg" height={37} width={163} alt="Logo" />
      </div>

      <ul className={styles.nav_actions}>
        <li>
          <span className={styles.nav_actions_active}>H</span>ome
        </li>
        <li>
          <span className={styles.nav_actions_styling}>E</span>xplore
        </li>
        <li>
          <span className={styles.nav_actions_styling}>C</span>ontact
        </li>
        <button className={styles.nav_actions_button}>Sign in</button>
      </ul>

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
          padding="xs"
          size="sm"
        >
          {
            <ul className={styles.nav_actions}>
              <li>
                <span className={styles.nav_actions_active}>H</span>ome
              </li>
              <li>
                <span className={styles.nav_actions_styling}>E</span>xplore
              </li>
              <li>
                <span className={styles.nav_actions_styling}>C</span>ontact
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
