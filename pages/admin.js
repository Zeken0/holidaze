import React from "react";
import Head from "next/head";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.scss";
import { Tabs } from "@mantine/core";
import { MessageCircle } from "tabler-icons-react";

export default function Admin() {
  try {
    return (
      <div>
        <Head>
          <title>Admin | Holidaze</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Generated by create next app" />
        </Head>
        <NavBar />
        <main className={styles.admin_container}>
          <div className={styles.admin_action}>
            <h1>Admin</h1>
            <button className={styles.add_button}>Add establishment</button>
          </div>
          <div className={styles.admin_tabs}>
            <Tabs tabPadding="xl" color="orange" position="apart">
              <Tabs.Tab label="All">First tab content</Tabs.Tab>
              <Tabs.Tab label="Enquiries" icon={<MessageCircle size={17} />}>
                Second tab content
              </Tabs.Tab>
              <Tabs.Tab label="Messages" icon={<MessageCircle size={17} />}>
                Third tab content
              </Tabs.Tab>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
  } finally {
  }
}
