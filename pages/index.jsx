import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useRouter } from "next/router";
import { Select } from "@mantine/core";
import { Search, ChevronDown} from "tabler-icons-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export async function getStaticProps() {
  try {
    const response = await axios.get("http://localhost:1337/api/hotels");
    const data = await response.data;

    return {
      props: {
        hotels: data.data,
      },
    };
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      hotels: data.data,
    },
  };
}

export default function Home({ hotels }) {

  async function askQuestion() {
    const questionInfo = {
      name: values.name,
      email: values.email,
      question: values.question,
    };

    const ask = await fetch("http://localhost:1337/api/enquiries", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: questionInfo }),
    });

    const askResponse = await ask.json();
  }

  const {handleSubmit, handleChange, values, touched, errors, handleBlur, resetForm} = useFormik( {
    initialValues: {
      name: "",
      email: "",
      question: "",
      emailTwo: "",
    },
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
      question: yup
        .string()
        .trim()
        .min(10, "Too Short!")
        .required("Question is required"),
      emailTwo: yup
      .string()
      .email("Must be a valid email"),
    }),

    onSubmit: () => {
      askQuestion()
      resetForm()
      alert('youre question has been sendt! we will get back to you in 1-2 days')
    }
  });

  try {
    const router = useRouter();

    const handleOnClick = (hotelName) => {
      if (!hotelName) {
        return;
      }

      const selectedHotel = hotels.find((currentHotel) => {
        return currentHotel.attributes.name === hotelName;
      });

      router.push(`/explore/${selectedHotel.id}`);
    };

    const searchData = hotels.map((hotel) => {
      return hotel.attributes.name;
    });

    const settings = {
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 2,
      className: "slides",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <div className={styles.home_container}>
        <Head>
          <title>Home | Holidaze</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="This is the Home page to the hotel booking site Holidaze"
          />
        </Head>
        <NavBar />

        <main className={styles.home_main}>
          <div className={styles.home_heroBanner}>
            <Select
              placeholder="Search for hotels"
              variant="filled"
              size="lg"
              nothingFound="No hotels found"
              icon={<Search size={26} />}
              searchable
              clearable
              rightSection={<ChevronDown size={14} />}
              rightSectionWidth={0}
              transitionDuration={80}
              transition="pop-top-left"
              transitionTimingFunction="ease"
              maxDropdownHeight={172}
              data={searchData}
              onChange={(hotel) => {
                handleOnClick(hotel);
              }}
            />
          </div>

          <div className={styles.home_featuredContainer}>
            <h1 className={styles.intro_text}>Featured hotels</h1>
            <Slider {...settings}>
              {hotels.map((hotel) => {
                if (hotel.id <= 4) {
                  return (
                    <Link href={"/explore/" + hotel.id} key={hotel.id}>
                      <div className={styles.home_featuredItem}>
                        <Image
                          src={hotel.attributes?.image_one}
                          height={250}
                          width={305}
                          alt="Image of the hotel"
                        />
                        <span className={styles.featuredItem_name}>
                          {hotel.attributes.name}
                        </span>
                        <span className={styles.featuredItem_price}>
                          Starting from {hotel.attributes.price} NOK
                        </span>
                      </div>
                    </Link>
                  );
                } else {
                  return;
                }
              })}
            </Slider>
          </div>

          <div className={styles.home_emailBanner}>
            <div className={styles.home_emailBanner_leftContent}>
              <h2>Wait a minute...</h2>
              <h3>Subscribe to our newsletter!</h3>
              <p>
                You will never miss important updates, latest news and community
                QA sessions. Our newsletter is once a week, every Sunday.
              </p>
              <div className={styles.emailBanner_action}>
                <form onSubmit={handleSubmit}>
                  <div className={styles.emailBanner_input}>
                    <input
                      type="email"
                      name="emailTwo"
                      placeholder="Your email"
                      value={values.emailTwo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.emailTwo && touched.emailTwo ?(
                      <div className="text-danger">
                        {errors.emailTwo}
                      </div>
                    ): null}
                  </div>
                </form>
                <button type="submit" className={styles.actionButton}>
                  Subscribe
                </button>
              </div>
            </div>
            <div className={styles.home_emailBanner_rightContent}>
              <Image
                src="/images/emailBanner.png"
                height={365}
                width={450}
                alt="Image of two humans holding a message"
              />
            </div>
          </div>

          <div className={styles.home_popularContainer}>
            <span className={styles.intro_text}>Most popular hotels</span>
            <Slider {...settings}>
              {hotels.map((hotel) => {
                if (hotel.id <= 4) {
                  return (
                    <Link href={"/explore/" + hotel.id} key={hotel.id}>
                      <div className={styles.home_popularItem}>
                        <Image
                          src={hotel.attributes?.image_one}
                          height={250}
                          width={305}
                          alt="Image of the hotel"
                        />
                        <span className={styles.popularItem_name}>
                          {hotel.attributes.name}
                        </span>
                        <span className={styles.popularItem_price}>
                          Starting from {hotel.attributes.price} NOK
                        </span>
                      </div>
                    </Link>
                  );
                } else {
                  return;
                }
              })}
            </Slider>
          </div>

          <div className={styles.enquiry_container}>
            <span className={styles.intro_text}>Have a question?</span>
            <div className={styles.enquiry_content}>
              <div>
                <Image
                  src="/images/questionImg.png"
                  height={360}
                  width={360}
                  alt="Image of two people and a question mark"
                />
              </div>
              <div className={styles.enquiry_form}>
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
                    {errors.name && touched.name ?(
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
                    {errors.email && touched.email ? (
                      <div className="text-danger">{errors.email}</div>
                    ): null}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="question" className="form-label">
                      Question
                    </label>
                    <textarea
                      name="question"
                      className="form-control"
                      placeholder="Your question ..."
                      value={values.question}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.question && touched.question?(
                      <div className="text-danger">
                        {errors.question}
                      </div>
                    ): null}
                  </div>

                  <button
                    type="submit"
                    className={styles.enquiry_btn}>
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch {
    
  } 
}
