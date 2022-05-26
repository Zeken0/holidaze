import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.scss";
import { useRouter } from "next/router";
import { Tabs} from "@mantine/core";
import { MessageCircle } from "tabler-icons-react";
import { parseCookies } from "nookies";

export default function Admin() {
  const [messages, setMessages] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  const router = useRouter();

  const fetchData = () => {
    const getMessages = axios.get("http://localhost:1337/api/messages");
    const getEnquiries = axios.get("http://localhost:1337/api/enquiries");

    axios.all([getMessages, getEnquiries]).then(
      axios.spread((...allData) => {
        console.log(allData);
        const allMessagesData = allData[0].data.data;
        const allEnquiriesData = allData[1].data.data;

        setMessages(allMessagesData);
        setEnquiries(allEnquiriesData);
      })
    );
  };

  useEffect(() => {

    // const jwt = parseCookies().jwt;

    // if (
    //   !jwt === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUzNTUzNzgwLCJleHAiOjE2NTYxNDU3ODB9.FJh9UnjDJ4-VWaNuK93rJcU2xR70osRgJfGhZ0htPtk") {
    //   router.push("/loginPage");
    // }
    fetchData();
  }, []);

  return (
    <div className={styles.admin_container}>
      <Head>
        <title>Admin | Holidaze</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="This is the admin page to the hotel booking site Holidaze" />
      </Head>
      <NavBar />
      <main className={styles.admin_main}>
        <div className={styles.admin_action}>
          <h1>Admin</h1>
          <Link href={"/addPage/"}>
            <button className={styles.add_button}>Add establishment</button>
          </Link>
        </div>
        <div className={styles.admin_tabs}>
          <Tabs tabPadding="xl" color="orange" position="apart">
            <Tabs.Tab label="All">
            <div className={styles.admin_users_container}>
                {enquiries.map((enquiry) => {
                  return <div className={styles.admin_user} key={enquiry.id}>

                        <div className={styles.user_name}>
                          <h3>Name:</h3>
                          <span>{enquiry.attributes.name}</span>
                        </div>

                        <div className={styles.user_email}>
                          <h3>Email:</h3>
                          <span>{enquiry.attributes.email}</span>
                        </div>

                        <div className={styles.user_question}>
                          <h3>Question:</h3>
                          <p>
                            {enquiry.attributes.question}
                          </p>
                        </div>
                  </div>;
                })}

              {messages.map((message) => {
                return <div className={styles.admin_user} key={message.id}>

                      <div className={styles.user_name}>
                        <h3>Name:</h3>
                        <span>{message.attributes.name}</span>
                      </div>

                      <div className={styles.user_email}>
                        <h3>Email:</h3>
                        <span>{message.attributes.email}</span>
                      </div>

                      <div className={styles.user_message}>
                        <h3>Message:</h3>
                        <p>
                          {message.attributes.message}
                        </p>
                      </div>
                </div>;
              })}
              </div>
            </Tabs.Tab>

            <Tabs.Tab label="Enquiries" icon={<MessageCircle size={17} />}>
              <div className={styles.admin_users_container}>
                {enquiries.map((enquiry) => {
                  return <div className={styles.admin_user} key={enquiry.id}>

                        <div className={styles.user_name}>
                          <h3>Name:</h3>
                          <span>{enquiry.attributes.name}</span>
                        </div>

                        <div className={styles.user_email}>
                          <h3>Email:</h3>
                          <span>{enquiry.attributes.email}</span>
                        </div>

                        <div className={styles.user_question}>
                          <h3>Question:</h3>
                          <p>
                            {enquiry.attributes.question}
                          </p>
                        </div>
                  </div>;
                })}
              </div>
            </Tabs.Tab>

            <Tabs.Tab label="Messages" icon={<MessageCircle size={17} />}>
              <div className={styles.admin_users_container}>

              {messages.map((message) => {
                return <div className={styles.admin_user} key={message.id}>

                      <div className={styles.user_name}>
                        <h3>Name:</h3>
                        <span>{message.attributes.name}</span>
                      </div>

                      <div className={styles.user_email}>
                        <h3>Email:</h3>
                        <span>{message.attributes.email}</span>
                      </div>

                      <div className={styles.user_message}>
                        <h3>Message:</h3>
                        <p>
                          {message.attributes.message}
                        </p>
                      </div>
                </div>;
              })}
              </div>
            </Tabs.Tab>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
