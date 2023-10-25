import React, { useState, useEffect } from "react";
import { getDrink } from "../services/api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Drink() {
  const [Drink, setDrink] = useState([]);
  const [RelatedDrinks, setRelatedDrinks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getDrink(id)
      .then((res) => {
        setDrink(res.data.drink);
        setRelatedDrinks(res.data.relatedDrinks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="flex flex-row">
      <div className="w-1/2">
        <img src={Drink.image} alt={Drink.name} />
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-3xl font-bold">{Drink.name}</h2>
        <hr className="my-4" />
        <h3 className="text-xl font-bold">${Drink.price}</h3>
        <p className="text-lg my-4">{Drink.description}</p>
        <ul className="list-disc list-inside">
          <li>70cl bottle</li>
          <li>All Natural Flavourings</li>
          <li>ABV: 4.5% vol</li>
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
        <button className="hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded rounded-md border border-black  mr-4">
          Add to Cart
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Buy with Paypal
        </button>
      </div>
    </div>
  );
}

export default Drink;
