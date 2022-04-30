import React from "react";
import Head from "next/head";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.scss";
import { Select } from "@mantine/core";
import { Search } from "tabler-icons-react";

const defaultEndpoint = "http://localhost:1337/api/hotels";

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();

  return {
    props: {
      hotels: data,
    },
  };
}

function explore({ hotels }) {
  console.log(hotels.data);
  return (
    <div>
      <Head>
        <title>Holidaze | Explore</title>
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
            transitionDuration={80}
            transitionTimingFunction="ease"
            maxDropdownHeight={200}
            data={[]}
          />
        </div>
        <div className={styles.explore_hotels_container}>
          {/* {hotels.map(({ id, name }) => {
            return <span key={id}>{name}</span>;
          })} */}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default explore;
