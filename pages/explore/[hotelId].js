import React from "react";

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:1337/api/hotels");
  const data = await res.json();

  const paths = data.map((hotel) => {
    return {
      params: { id: hotel.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("http://localhost:1337/api/hotels" + id);
  const data = await res.json();

  return {
    props: { hotel: data.data },
  };
};

function Details(hotel) {
  return (
    <div>
      <h1>Details nummber {hotel.id}</h1>
    </div>
  );
}

export default Details;
