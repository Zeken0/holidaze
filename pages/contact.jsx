import React from "react";
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

  async function sendMessage() {
    const messageInfo = {
      name: values.name,
      email: values.email,
      message: values.message,
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

  
    const {handleSubmit, handleChange, values, touched, errors, handleBlur, resetForm} = useFormik( {

      initialValues: {
        name: "",
        email: "",
        message: "",
      },
      validationSchema: yup.object({
        name: yup
          .string()
          .trim()
          .min(2, "Must be higher than 2 characters")
          .max(20, "Must be shorter than 20 characters")
          .required("Name is required"),
        email: yup
          .string()
          .email("Must be a valid email")
          .required("Email is required"),
        message: yup
          .string()
          .trim()
          .min(10, "Must be higher than 10 characters")
          .max(500, "We dont need a novel")
          .required("Message is required"),
      }),

      onSubmit: () => {
        sendMessage()
        resetForm()
        alert('youre message has been sendt! we will get back to you in 1-2 days')
      },
    })
    

    return (
      <div className={styles.contact_container}>
        <Head>
          <title>Contact | Holidaze</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="This is the contact page to the hotel booking site Holidaze"
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
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Ahmed Jibril"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.name ?(
                  <div className="text-danger">{errors.name}</div>
                ): null}
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
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ?(
                  <div className="text-danger">{errors.email}</div>
                ): null}
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  name="message"
                  className="form-control"
                  placeholder="Your message ..."
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.message &&  touched.message ?(
                  <div className="text-danger">{errors.message}</div>
                ): null}
              </div>

              <button
                type="submit"
                className="btn btn-primary">
                Send message
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
}
export default Contact;
