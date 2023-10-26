import React, { useState, useEffect } from "react";
import { getRandDrink } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function RandomDrink() {
  const [randomDrink, setRandomDrink] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };

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
    <div className="container bg-white p-4 md:p-8 mx-auto max-w-6xl mt-8">
      <div className="flex flex-row">
        <div className="w-1/3">
          <a href={`/drinks/${randomDrink.id}`}>
            <img
              src={randomDrink.image}
              alt={randomDrink.name}
              className="w-full"
            />
          </a>
        </div>
        <div className="w-1/2 mx-auto p-4">
          <h2 className="text-3xl font-bold">{randomDrink.name}</h2>
          <hr className="my-4 border-t  border-gray-300" />
          <h3 className="text-xl font-bold">${randomDrink.price}</h3>
          <p className="text-lg my-4">{randomDrink.description}</p>
          <ul className="list-disc list-inside">
            <li>70cl bottle</li>
            <li>All Natural Flavourings</li>
            <li>ABV: {randomDrink.abv}% vol</li>
          </ul>

          <div className=" my-8">
            <div className="text-center flex flex-row font-semibold ">Qty</div>
            <div className="text-center">
              <div className="flex items-center">
                <button
                  className="bg-gray-300 border border-gray-400 rounded-l p-2"
                  onClick={handleDecrement}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <input
                  type="number"
                  id="qty"
                  name="qty"
                  value={quantity}
                  readOnly
                  className="border border-gray-400 p-2 w-1/3 text-center appearance-none"
                />
                <button
                  className="bg-gray-300 border border-gray-400 rounded-r p-2"
                  onClick={handleIncrement}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          </div>

          <button className="hover:bg-blue-gray-400 text-black font-bold py-2 px-4 rounded border border:bg-black mr-4">
            Add to Cart
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Buy with Shop
          </button>
        </div>
      </div>
    </div>
  );
}

export default RandomDrink;
