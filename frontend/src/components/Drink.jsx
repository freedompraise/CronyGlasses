import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function Drink(props) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };

  return (
    <div className="flex flex-row">
      <div className="w-1/2">
        <img src={props.drink.image} alt={props.drink.name} />
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-3xl font-bold">{props.drink.name}</h2>
        <hr className="my-4" />
        <h3 className="text-xl font-bold">${props.drink.price}</h3>
        <p className="text-lg my-4">{props.drink.description}</p>
        <ul className="list-disc list-inside">
          <li>70cl bottle</li>
          <li>All Natural Flavourings</li>
          <li>ABV: 4.5% vol</li>
        </ul>
        <div className="text-center flex flex-row font-semibold mt-4 mb-0">
          Qty
        </div>
        <div className="flex flex-row my-4">
          <div className="flex items-center ">
            <button
              className="bg-gray-100 border border-gray-400 rounded-l p-2 hover:bg-gray-300"
              onClick={handleDecrement}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <input
              type="number"
              id="qty"
              name="qty"
              value={quantity}
              placeholder="0"
              readOnly
              className="border border-gray-400 p-2 text-center appearance-none w-full sm:w-2/5"
            />
            <button
              className="bg-gray-100 border border-gray-400 rounded-r p-2 hover:bg-gray-300"
              onClick={handleIncrement}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-items-center ">
          <button className="hover:bg-black hover:text-white md:my-0 my-2 text-black font-bold py-2 px-4 rounded rounded-md border border-black  mr-4">
            Add to Cart
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
            Buy with Paypal
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drink;
