import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import styles from "../../styles/Home.module.scss";
import { Select, Checkbox, RangeSlider, CheckboxGroup } from "@mantine/core";
import {
  Search,
  ChevronDown,
  MapPin,
  Coffee,
  Massage,
  Check,
  Wifi,
} from "tabler-icons-react";
import { useRouter } from "next/router";
import axios from "axios";

export async function getStaticProps() {
  let hotels = [];
  try {
    const response = await axios.get("http://localhost:1337/api/hotels");
    const data = await response.data;
    hotels = data.data;
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      hotels: hotels,
    },
  };
}

function Explore({ hotels }) {
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
  return (
    <div>
      <Head>
        <title>Explore | Holidaze</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="This is the explore page to the hotel booking site Holidaze"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className={styles.explore_container}>
        <div className={styles.explore_actions}>
          <h1>Explore our hotels</h1>
          <Select
            placeholder="Search for hotels"
            variant="filled"
            size="lg"
            nothingFound="No hotels found"
            icon={<Search size={21} />}
            searchable
            clearable
            rightSection={<ChevronDown size={14} />}
            rightSectionWidth={0}
            transitionDuration={100}
            transitionTimingFunction="ease"
            maxDropdownHeight={210}
            data={searchData}
            onChange={(hotel) => {
              handleOnClick(hotel);
            }}
          />
        </div>
        <div className={styles.explore_hotels_container}>
          <div className={styles.explore_filter}>
            <div className={styles.filter_content}>
              <h3>Popular filters</h3>
              <CheckboxGroup
                color="red"
                orientation="vertical"
                radius="xs"
                size="md"
              >
                <Checkbox value="1" label="Breakfast included" />
                <Checkbox value="2" label="Spa" />
                <Checkbox value="3" label="Pool" />
                <Checkbox value="4" label="Pet friendly" />
                <Checkbox value="5" label="Bathtub in room" />
              </CheckboxGroup>
            </div>
            <div className={styles.filter_content}>
              <h3>Price (for 1 night)</h3>
              <RangeSlider
                color="red"
                size="lg"
                showLabelOnHover={false}
                marks={[
                  { value: 0, label: "Low" },
                  { value: 100, label: "High" },
                ]}
              />
            </div>
            <div className={styles.filter_content}>
              <h3>Star rating</h3>
              <CheckboxGroup
                color="red"
                orientation="vertical"
                radius="xs"
                size="md"
              >
                <Checkbox value="5" label="5. star" />
                <Checkbox value="4" label="4. star" />
                <Checkbox value="3" label="3. star" />
                <Checkbox value="2" label="2. star" />
                <Checkbox value="1" label="1. star" />
              </CheckboxGroup>
            </div>
            <div className={styles.filter_content}>
              <h3>Payments and cancellations</h3>
              <CheckboxGroup
                color="red"
                orientation="vertical"
                radius="xs"
                size="md"
              >
                <Checkbox value="1" label="Free cancellation" />
                <Checkbox value="2" label="Pay with gift card" />
              </CheckboxGroup>
            </div>
            <div className={styles.filter_content}>
              <h3>Guest rating</h3>
              <RangeSlider
                color="red"
                size="lg"
                showLabelOnHover={true}
                marks={[
                  { value: 0, label: "0" },
                  { value: 100, label: "10" },
                ]}
              />
            </div>
          </div>
          <div className={styles.explore_content}>
            {hotels.map((hotel) => {
              return (
                <div className={styles.content_item} key={hotel.id}>
                  <Image
                    src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                    height={200}
                    width={400}
                    alt="Image of a hotel"
                  />
                  <div className={styles.item_info}>
                    <div>
                      <Link href={"/explore/" + hotel.id} key={hotel.id}>
                        <h3>{hotel.attributes.name}</h3>
                      </Link>
                      <span>
                        <MapPin /> {hotel.attributes.location}
                      </span>
                    </div>

                    <ul>
                      <li>
                        <Wifi /> Free Wifi
                      </li>
                      <li>
                        <Check /> Free cancellation
                      </li>
                      <li>
                        <Coffee /> Breakfast included
                      </li>
                      <li>
                        <Massage /> Spa
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h2>From {hotel.attributes.price} kr</h2>
                    <Link href={"/explore/" + hotel.id} key={hotel.id}>
                      <button className={styles.item_button}>View more</button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Explore;
