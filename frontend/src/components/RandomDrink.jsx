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
    <div className="flex flex-row">
      <div className="w-1/2">
        <a href={`/drinks/${randomDrink.id}`}>
          <img src={randomDrink.image} alt={randomDrink.name} />
        </a>
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-3xl font-bold">{randomDrink.name}</h2>
        <hr className="my-4" />
        <h3 className="text-xl font-bold">${randomDrink.price}</h3>
        <p className="text-lg my-4">{randomDrink.description}</p>
        <ul className="list-disc list-inside">
          <li>70cl bottle</li>
          <li>All Natural Flavourings</li>
          <li>ABV: {randomDrink.abv}% vol</li>
        </ul>
        <div className="flex flex-row my-4">
          <label htmlFor="qty" className="mr-4">
            Qty
          </label>
          <input
            type="number"
            id="qty"
            name="qty"
            placeholder="0"
            className="border border-gray-400 rounded-md p-2 w-1/3"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
          Add to Cart
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Buy with Shop
        </button>
      </div>
    </div>
  );
}

export default RandomDrink;
