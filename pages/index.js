import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import styles from "../styles/Home.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useRouter } from "next/router";
import { Notification, Select } from "@mantine/core";
import { X, Search, ChevronDown } from "tabler-icons-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export async function getStaticProps() {
  try {
    const response = await axios.get("http://localhost:1337/api/hotels");
    const data = await response.data;

    console.log(data);

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

    const formik = useFormik({
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
        emailTwo: yup.string().email("Must be a valid email"),
      }),
    });

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
              size="xl"
              nothingFound="No hotels found"
              icon={<Search size={26} />}
              searchable
              clearable
              rightSection={<ChevronDown size={14} />}
              rightSectionWidth={0}
              transitionDuration={80}
              transition="pop-top-left"
              transitionTimingFunction="ease"
              maxDropdownHeight={200}
              data={searchData}
              onChange={(hotel) => {
                handleOnClick(hotel);
              }}
            />
          </div>

          <div className={styles.home_featuredContainer}>
            <span className={styles.intro_text}>Featured hotels</span>
            <Slider {...settings}>
              {hotels.map((hotel) => {
                if (hotel.id <= 4) {
                  return (
                    <Link href={"/explore/" + hotel.id} key={hotel.id}>
                      <div className={styles.home_featuredItem}>
                        <Image
                          src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                          height={250}
                          width={250}
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
                <form onSubmit={formik.handleSubmit}>
                  <div className={styles.emailBanner_input}>
                    <input
                      type="email"
                      name="emailTwo"
                      placeholder="Your email"
                      value={formik.values.emailTwo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.emailTwo && (
                      <div className="text-danger">
                        {formik.errors.emailTwo}
                      </div>
                    )}
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
            <h1>Most popular hotels</h1>
            <Slider {...settings}>
              {hotels.map((hotel) => {
                if (hotel.id <= 4) {
                  return (
                    <Link href={"/explore/" + hotel.id} key={hotel.id}>
                      <div className={styles.home_popularItem}>
                        <Image
                          src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                          height={250}
                          width={250}
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
                      value={formik.values.full_name}
                      onChange={formik.handleChange}
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
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && (
                      <div className="text-danger">{formik.errors.email}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="question" className="form-label">
                      Question
                    </label>
                    <textarea
                      name="question"
                      className="form-control"
                      placeholder="Your question ..."
                      value={formik.values.question}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.question && (
                      <div className="text-danger">
                        {formik.errors.question}
                      </div>
                    )}
                  </div>

                  <button type="submit" className={styles.enquiry_btn}>
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
    <Notification icon={<X size={18} />} color="red">
      An error has occurd!
    </Notification>;
  } finally {
  }
}
