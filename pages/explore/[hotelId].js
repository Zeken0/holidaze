import React from "react";
import Head from "next/head";
import Image from "next/image";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import styles from "../../styles/Home.module.scss";
import {
  Bed,
  Calendar,
  ChevronDown,
  MoodKid,
  User,
  MapPin,
  Wifi,
  Briefcase,
  Parking,
  Windmill,
  ShieldLock,
  Snowflake,
  DeviceTv,
  SmokingNo,
  Coffee,
} from "tabler-icons-react";
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
    console.warn("failed to fetch hotels");
  }

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
            <div className={styles.actions_price}>
              Sum: <span>{hotel.attributes?.price} NOK</span>
            </div>
          </div>
          <div className={styles.actions_right}>
            <div className={styles.actions_right_top}>
              <div className={styles.actions_info}>
                <h1>{hotel.attributes?.name}</h1>
                <span>
                  {<MapPin />}
                  {hotel.attributes?.location}
                </span>
              </div>
              <button>Reserve</button>
            </div>
            <div className={styles.actions_gallary}>
              <Image
                src={hotel.attributes?.image_one}
                alt={"A image of a hotel"}
                height={600}
                width={895}
              />
            </div>
          </div>
        </div>
        <div className={styles.details_info_container}>
          <h2>About</h2>
          <div className={styles.lineSeperator}></div>
          <div className={styles.details_info}>
            <p>{hotel.attributes?.about}</p>
            <div className={styles.info_accommodation}>
              <div className={styles.info_accommodation_content}>
                <h3>Property amenities</h3>
                <div className={styles.accommodation_content_item}>
                  <span>
                    <Wifi /> Free High Speed Internet (WiFi)
                  </span>
                  <span>
                    <Coffee /> Free breakfast
                  </span>
                  <span>
                    <Briefcase /> Baggage storage
                  </span>
                  <span>
                    <Parking /> Paid private parking nearby
                  </span>
                </div>
              </div>

              <div className={styles.info_accommodation_content}>
                <h3>Room features</h3>
                <div className={styles.accommodation_content_item}>
                  <span>
                    <Windmill /> Air conditioning
                  </span>
                  <span>
                    <ShieldLock /> Safe
                  </span>
                  <span>
                    <Snowflake /> Refrigerator
                  </span>
                  <span>
                    <DeviceTv /> Flatscreen TV
                  </span>
                </div>
              </div>

              <div className={styles.info_accommodation_content}>
                <h3>Room types</h3>
                <div className={styles.accommodation_content_item}>
                  <span>
                    <SmokingNo /> Non-smoking rooms
                  </span>
                  <span>
                    <Bed /> Suites
                  </span>
                  <span>
                    <Bed /> Family rooms
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Details;
