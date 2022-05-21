import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import styles from "../../styles/Home.module.scss";
import { Bed, Calendar, ChevronDown, MoodKid, User, MapPin } from "tabler-icons-react";
import axios from "axios";
import { DatePicker } from "@mantine/dates";
import { Checkbox, Select } from "@mantine/core";

export const getStaticPaths = async () => {
  let paths = [];
  try {
    const response = await axios.get("http://localhost:1337/api/hotels");
    const hotels = await response.data.data;

    paths = hotels.map((hotel) => {
      return {
        params: { hotelId: hotel.id.toString() },
      };
    });
  } catch (error) {
    console.warn("failed to fetch hotess");
  }
  console.log("paths", paths);

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  let props = { hotel: {} };
  try {
    const id = context.params.hotelId;
    const response = await axios.get("http://localhost:1337/api/hotels/" + id);
    const hotel = await response.data.data;
    props = { hotel: hotel };
  } catch (error) {
    console.warn("failed to fetch data");
  }

  return {
    props: props,
  };
};

function Details({ hotel }) {
  const data = Array(51)
    .fill(0)
    .map((_, index) => ` ${index}`);

  return (
    <div className={styles.details_container}>
      <Head>
        <title>{hotel.attributes.name} | Holidaze</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="This is the details page to the hotel booking site Holidaze"
        />
      </Head>
      <NavBar />
      <main className={styles.details_main}>
        <div className={styles.details_actions}>
          <div className={styles.actions_left}>
            <div className={styles.actions_filter_container}>
              <DatePicker
                placeholder="Pick date"
                label="Check-in date"
                defaultValue={new Date()}
                icon={<Calendar size={16} />}
                className={styles.actions_datePicker}
              />

              <DatePicker
                placeholder="Pick date"
                label="Check-out date"
                defaultValue={new Date()}
                icon={<Calendar size={16} />}
                className={styles.actions_datePicker}
              />

              <div className={styles.actions_accommodation}>
                <Select
                  label="Rooms"
                  placeholder="Select"
                  searchable
                  clearable
                  nothingFound="No options"
                  maxDropdownHeight={115}
                  data={data}
                  icon={<Bed size={18} />}
                  rightSection={<ChevronDown size={14} />}
                  rightSectionWidth={0}
                />

                <Select
                  label="Adults"
                  placeholder="Select"
                  searchable
                  clearable
                  nothingFound="No options"
                  maxDropdownHeight={115}
                  data={data}
                  icon={<User size={18} />}
                  rightSection={<ChevronDown size={14} />}
                  rightSectionWidth={0}
                />

                <Select
                  label="Kids"
                  placeholder="Select"
                  searchable
                  clearable
                  nothingFound="No options"
                  maxDropdownHeight={115}
                  data={data}
                  icon={<MoodKid size={18} />}
                  rightSection={<ChevronDown size={14} />}
                  rightSectionWidth={0}
                />
              </div>

              <Checkbox
                label="I'm travelling for work"
                color="red"
                radius="xs"
              />

              <button className={styles.actions_filter_button}>Search</button>
            </div>
          </div>
          <div className={styles.actions_right}>

            <div className={styles.actions_info}>
              <h1>{hotel.attributes?.name}</h1>
              <span>{<MapPin/>}{hotel.attributes?.location}</span>
            </div>

          </div>
        </div>
        <div className={styles.details_info}>
          <h2>About</h2>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Details;
