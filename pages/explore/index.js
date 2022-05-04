import React from "react";
import Head from "next/head";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import styles from "../../styles/Home.module.scss";
import { Select } from "@mantine/core";
import { Search } from "tabler-icons-react";
import { useRouter } from "next/router";
import axios from "axios";

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
  } finally {
  }
}

function Explore({ hotels }) {
  const router = useRouter();

  const handleOnClick = (hotels) => {
    hotels.map((hotel) => {
      router.push(`/explore/${hotel.id}`);
    });
  };

  const searchData = hotels.map((hotel) => {
    return hotel.attributes.name;
  });
  return (
    <div>
      <Head>
        <title>Explore | Holidaze</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className={styles.explore_container}>
        <div className={styles.explore_actions}>
          <h1>Explore our bookings</h1>
          <Select
            placeholder="Search for hotels"
            variant="filled"
            size="lg"
            nothingFound="No hotels found"
            icon={<Search size={21} />}
            searchable
            clearable
            transitionDuration={100}
            transitionTimingFunction="ease"
            maxDropdownHeight={210}
            data={searchData}
          />
        </div>
        <div className={styles.explore_hotels_container}>
          {hotels.map((hotel) => {
            return (
              <Link href={"/explore/" + hotel.id} key={hotel.id}>
                {hotel.attributes.name}
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Explore;
