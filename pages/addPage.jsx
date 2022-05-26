import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import {parseCookies} from 'nookies'
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";


function AddPage() {

  const jwt = parseCookies().jwt
  // const router = useRouter();

  // if (jwt === "null" || "undefined") {
  //   router.push("/loginPage");
  // }

  async function addHotel() {
    
    const hotelInfo = {
      name: values.name,
      location: values.location,
      price: values.price,
      about: values.about,
      image_one: values.image_one,
      image_two: values.image_two,
      image_three: values.image_three,
      image_four: values.image_four,
    };

    const add = await fetch("http://localhost:1337/api/hotels", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: hotelInfo }),
    });

    const addResponse = await add.json();
    console.log(addResponse);
  }

  const {handleSubmit, handleChange, values, touched, errors, handleBlur, resetForm} = useFormik({
    initialValues: {
      name: "",
      about: "",
      price: "",
      location: "",
      image_one: "",
      image_two: "",
      image_three: "",
      image_four: "",
    },
    validationSchema: Yup.object({
      name: Yup
      .string()
      .trim()
      .required('Name required')
      .min(2, "Must be higher than 1 character")
      .max(20, "Must be less than 20 character"),

      about: Yup
      .string()
      .trim()
      .min(3, 'Must be higher than 3 characters')
      .required('About required'),

      price: Yup
      .string()
      .trim()

      .required('Price required'),
      
      location: Yup
      .string()
      .trim()
      .min(10, 'Must be higher than 10 characters')
      .max(30, 'Must be less than 30 characters')
      .required('Location required'),

      image_one: Yup
      .string()
      .trim()
      .required('url required')
      .url('Must be an url'),

      image_two: Yup
      .string()
      .trim()
      .url('Must be a url'),

      image_three: Yup
      .string()
      .trim()
      .url('Must be a url'),

      image_four: Yup
      .string()
      .trim()
      .url('Must be a url'),
    }),
    onSubmit: () => {
      addHotel()
      resetForm()
      alert('Hotel has been added!')
    }
  })

  return (
    <div className={styles.add_container}>
      <Head>
        <title>Add | Holidaze</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="This is the add establishment page to the hotel booking site Holidaze"
        />
      </Head>
      <Navbar />
      <main className={styles.add_main}>
        <div className={styles.add_form_section}>
          <h1>Add establishment</h1>
          <form className={styles.add_form} onSubmit={handleSubmit}>
            <div className={styles.form_control}>
              <label htmlFor="name" className={styles.form_label}>
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Hotel name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.form_input}
              />
              {touched.name && errors.name ? (
                  <div className="text-danger">{errors.name}</div>
                ): null}
            </div>
            <div className={styles.form_control}>
              <label htmlFor="location" className={styles.form_label}>
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Somewhere land 26a"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.form_input}
              />
              {touched.location && errors.location ? (
                  <div className="text-danger">{errors.location}</div>
                ): null}
            </div>
              <div className={styles.form_control}>
                <label htmlFor="about" className={styles.form_label}>
                  About
                </label>
                <textarea
                  type="text"
                  name="about"
                  placeholder="Write something"
                  value={values.about}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.form_input_about}
                />
                {touched.about && errors.about ? (
                  <div className="text-danger">{errors.about}</div>
                ): null}
              </div>
            <div className={styles.form_control}>
              <label htmlFor="price" className={styles.form_label}>
                Price
              </label>
              <input
                type="number"
                name="price"
                placeholder="299,99 kr"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.form_input_price}
              />
              {touched.price && errors.price ? (
                  <div className="text-danger">{errors.price}</div>
                ): null}
            </div>
            <div className={styles.form_control}>
              <label htmlFor="image_one" className={styles.form_label}>
                Image_one
              </label>
              <input
                type="text"
                name="image_one"
                placeholder="insert url here"
                value={values.image_one}
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.form_input}
              />
              {touched.image_one && errors.image_one ? (
                  <div className="text-danger">{errors.image_one}</div>
                ): null}
            </div>
            <div className={styles.form_control}>
              <label htmlFor="image_two" className={styles.form_label}>
                Image_two
              </label>
              <input
                type="text"
                name="image_two"
                placeholder="insert url here"
                value={values.image_two}
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.form_input}
              />
              {touched.image_two && errors.image_two ? (
                  <div className="text-danger">{errors.image_two}</div>
                ): null}
            </div>
            <div className={styles.form_control}>
              <label htmlFor="image_three" className={styles.form_label}>
                Image_three
              </label>
              <input
                type="text"
                name="image_three"
                placeholder="insert url here"
                value={values.image_three}
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.form_input}
              />
              {touched.image_three && errors.image_three ? (
                  <div className="text-danger">{errors.image_three}</div>
                ): null}
            </div>
            <div className={styles.form_control}>
              <label htmlFor="image_four" className={styles.form_label}>
                Image_four
              </label>
              <input
                type="text"
                name="image_four"
                placeholder="insert url here"
                value={values.image_four}
                onChange={handleChange}
                onBlur={handleBlur}
                className={styles.form_input}
              />
              {touched.image_four && errors.image_four ? (
                  <div className="text-danger">{errors.image_four}</div>
                ): null}
            </div>
            <button type="submit" className={styles.form_button}
              >Submit
            </button>
          </form>
        </div>
        <div className={styles.add_image}>
          <Image src={"/images/addImg.png"} width={450} height={450} alt={""} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AddPage;
