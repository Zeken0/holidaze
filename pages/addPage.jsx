import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import {parseCookies} from 'nookies'
import { useRouter } from "next/router";

function AddPage() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [about, setAbout] = useState("");
  const [imageOne, setImageOne] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [imageThree, setImageThree] = useState("");
  const [imageFour, setImageFour] = useState("");


  const jwt = parseCookies().jwt
  // const router = useRouter();

  // if (jwt === "null" || "undefined") {
  //   router.push("/loginPage");
  // }

  async function addHotel() {
    
    const hotelInfo = {
      name: name,
      location: location,
      price: price,
      about: about,
      image_one: imageOne,
      image_two: imageTwo,
      image_three: imageThree,
      image_four: imageFour,
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
          <form className={styles.add_form} onSubmit={(e) => {e.preventDefault()}}>
            <div className={styles.form_control}>
              <label htmlFor="name" className={styles.form_label}>
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Ahmed"
                value={name}
                onChange={(e) => {setName(e.target.value);}}
                className={styles.form_input}
              />
            </div>
            <div className={styles.form_control}>
              <label htmlFor="location" className={styles.form_label}>
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Somewhere land 26a"
                value={location}
                onChange={(e) => {setLocation(e.target.value);}}
                className={styles.form_input}
              />
            </div>
              <div className={styles.form_control}>
                <label htmlFor="about" className={styles.form_label}>
                  About
                </label>
                <textarea
                  type="text"
                  name="about"
                  placeholder="Write something"
                  value={about}
                  onChange={(e) => {setAbout(e.target.value);}}
                  className={styles.form_input_about}
                />
              </div>
            <div className={styles.form_control}>
              <label htmlFor="price" className={styles.form_label}>
                Price
              </label>
              <input
                type="number"
                name="price"
                placeholder="599,99 kr"
                value={price}
                onChange={(e) => {setPrice(e.target.value);}}
                className={styles.form_input_price}
              />
            </div>
            <div className={styles.form_control}>
              <label htmlFor="image_one" className={styles.form_label}>
                Image_one
              </label>
              <input
                type="text"
                name="image_one"
                placeholder="insert url here"
                value={imageOne}
                onChange={(e) => {setImageOne(e.target.value);}}
                className={styles.form_input}
              />
            </div>
            <div className={styles.form_control}>
              <label htmlFor="image_two" className={styles.form_label}>
                Image_two
              </label>
              <input
                type="text"
                name="image_two"
                placeholder="insert url here"
                value={imageTwo}
                onChange={(e) => {setImageTwo(e.target.value);}}
                className={styles.form_input}
              />
            </div>
            <div className={styles.form_control}>
              <label htmlFor="image_three" className={styles.form_label}>
                Image_three
              </label>
              <input
                type="text"
                name="image_three"
                placeholder="insert url here"
                value={imageThree}
                onChange={(e) => {setImageThree(e.target.value);}}
                className={styles.form_input}
              />
            </div>
            <div className={styles.form_control}>
              <label htmlFor="image_four" className={styles.form_label}>
                Image_four
              </label>
              <input
                type="text"
                name="image_four"
                placeholder="insert url here"
                value={imageFour}
                onChange={(e) => {setImageFour(e.target.value);}}
                className={styles.form_input}
              />
            </div>
            <button type="submit" className={styles.form_button} onClick={() => addHotel()}
              >Submit</button>
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
