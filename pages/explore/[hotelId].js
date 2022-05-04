import axios from "axios";
import React from "react";

export const getStaticPaths = async () => {
  try {
    const response = await axios.get("http://localhost:1337/api/hotels");
    const hotels = await response.data;

    const paths = hotels.map((hotel) => {
      return {
        params: { id: hotel.id.toString() },
      };
    });

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
  } finally {
  }
};

export const getStaticProps = async (context) => {
  try {
    const id = context.params.id;
    const response = await axios.get("http://localhost:1337/api/hotels/" + id);
    const hotel = await response.data;

    return {
      props: { hotel: hotel },
    };
  } catch (error) {
  } finally {
  }
};

function Details({ hotel }) {
  console.log(hotel);
  return (
    <div>
      <h1>Details nummber {hotel.attributes.name}</h1>
    </div>
  );
}

export default Details;
