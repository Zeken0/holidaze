import axios from "axios";
import React from "react";

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
  console.log(hotel);
  return (
    <div>
      <h1>Details nummber {hotel.attributes?.name}</h1>
    </div>
  );
}

export default Details;
