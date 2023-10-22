import React, { useState, useEffect } from "react";
import { getRandDrink } from "../services/api";

function RandomDrink() {
  const [randomDrink, setRandomDrink] = useState([]);

  useEffect(() => {
    getRandDrink()
      .then((res) => {
        setRandomDrink(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mx-0 h-full w-full">
      <div className="flex mt-2 items-center justify-center h-full">
        <img className="" src={randomDrink.image} alt={randomDrink.name} />
      </div>
      <h2 className="mt-1 lg:text-xl text-black">{randomDrink.name}</h2>
      <h3 className="text-lg font-bold mt-1">${randomDrink.price} </h3>
      <p className="text-sm mt-1">{randomDrink.description}</p>
    </div>
  );
}

export default RandomDrink;
