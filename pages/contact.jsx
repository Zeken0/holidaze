import React, { useState } from "react";
import Head from "next/head";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  IoAt,
  IoSunnyOutline,
  IoLocationOutline,
  IoCallOutline,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoYoutube,
} from "react-icons/io5";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function sendMessage() {
    const messageInfo = {
      name: name,
      email: email,
      message: message,
    };

    const add = await fetch("http://localhost:1337/api/messages", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data:messageInfo}),
    });

    const addResponse = await add.json();
    console.log(addResponse);
  }

  try {
    const formik = useFormik({
      initialValues: {
        name: "",
        email: "",
        message: "",
      },
      onSubmit: () => {},
      validationSchema: yup.object({
        name: yup
          .string()
          .trim()
          .min(2, "Too Short!")
          .max(20, "Too Long!")
          .required("Name is required"),
        email: yup
          .string()
          .email("Must be a valid email")
          .required("Email is required"),
        message: yup
          .string()
          .trim()
          .min(10, "Too Short!")
          .required("Message is required"),
      }),
    });

    return (
      <div className={styles.contact_container}>
        <Head>
          <title>Contact | Holidaze</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="This is the Sign in page to the hotel booking site Holidaze"
          />
        </Head>
        <NavBar />
        <main className={styles.contact_main}>
          <div className={styles.contact_main_info}>
            <div>
              <h1>Contact us</h1>
              <h2>
                Leave your email and we will get back to you within 24 hours
              </h2>
            </div>
            <div className={styles.info_content}>
              <IoAt />
              <div className={styles.info_content_item}>
                <h3>Email</h3>
                <span>Ask@Holidaze.com</span>
              </div>
            </div>
            <div className={styles.info_content}>
              <IoCallOutline />
              <div className={styles.info_content_item}>
                <h3>Phone</h3>
                <span>+47 335 355 35</span>
              </div>
            </div>
            <div className={styles.info_content}>
              <IoLocationOutline />
              <div className={styles.info_content_item}>
                <h3>Address</h3>
                <span>844 Morris Park avenue</span>
              </div>
            </div>
            <div className={styles.info_content}>
              <IoSunnyOutline />
              <div className={styles.info_content_item}>
                <h3>Working hours</h3>
                <span>8 a.m. – 11 p.m.</span>
              </div>
            </div>
            <div className={styles.info_content_logos}>
              <IoLogoTwitter />
              <IoLogoYoutube />
              <IoLogoInstagram />
            </div>
          </div>
          <div className={styles.contact_main_message}>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Ahmed Jibril"
                  value={name}
                  onChange={(e) => {
                    formik.handleChange;
                    setName(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && (
                  <div className="text-danger">{formik.errors.name}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Your@example.com"
                  value={email}
                  onChange={(e) => {
                    formik.handleChange;
                    setEmail(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && (
                  <div className="text-danger">{formik.errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  name="message"
                  className="form-control"
                  placeholder="Your message ..."
                  value={message}
                  onChange={(e) => {
                    formik.handleChange;
                    setMessage(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.message && (
                  <div className="text-danger">{formik.errors.message}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => sendMessage()}
              >
                Send message
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {}
}

export default Contact;
