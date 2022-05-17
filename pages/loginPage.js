import React, { useState } from "react";
import Head from "next/head";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import { useFormik } from "formik";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useRouter } from "next/router";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = { username, password };

    const user = await axios.post(
      "http://localhost:1337/auth/login",
      credentials
    );

    if (user.status === 200) {
      router.push("/admin");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {},
    validationSchema: yup.object({
      password: yup
        .string()
        .trim()
        .min(2, "Too Short!")
        .max(20, "Too Long!")
        .required("Password is required"),
      email: yup
        .string()
        .email("Must be a valid email")
        .required("Email is required"),
    }),
  });
  return (
    <div className={styles.login_container}>
      <Head>
        <title>Sign in | Holidaze</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Generated by create next app" />
      </Head>
      <NavBar />
      <main className={styles.login_main}>
        <div className={styles.main_image}>
          <Image
            src="/images/loginImg.png"
            height={400}
            width={400}
            alt="an image of a person and a gigantic phone"
          />
        </div>
        <div className={styles.main_content}>
          <div className={styles.content_form}>
            <h1>Sign in</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="admin@admin.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && (
                  <div className="text-danger">{formik.errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  className="form-control"
                  placeholder="Admin1234"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && (
                  <div className="text-danger">{formik.errors.password}</div>
                )}
              </div>

              <button type="submit" className={styles.login_button}>
                Login
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LoginPage;
