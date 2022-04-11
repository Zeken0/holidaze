import { useState } from "react";
import { Drawer, Button, Group, Image } from "@mantine/core";
import styles from "../styles/Home.module.scss";

function Nav() {
  const [opened, setOpened] = useState(false);
  return (
    <div className={styles.nav_container}>
      <div className={styles.logo}>
        <Image src="../public/images/logo.png" alt="Logo" />
      </div>
      <>
        <Drawer
          position="top"
          opened={opened}
          onClose={() => setOpened(false)}
          title="Register"
          padding="xs"
          size="sm"
        >
          {/* Drawer content */}
        </Drawer>

        <Group position="center">
          <Button onClick={() => setOpened(true)}>Open Drawer</Button>
        </Group>
      </>
    </div>
  );
}

export default Nav;
