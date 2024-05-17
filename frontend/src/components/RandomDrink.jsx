import React, { useState, useEffect } from "react";
import { getRandDrink } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { postToCheckout } from "../services/api";
import { useCart } from "../CartContext";

function RandomDrink() {
  const [randomDrink, setRandomDrink] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState("");
  const { manageCart } = useCart();

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    manageCart(randomDrink, quantity);
    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 3000);
  };

  useEffect(() => {
    getRandDrink()
      .then((res) => {
        setRandomDrink(res[0]);
        console.log("The random drink is:", res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (paypalUrl) {
      window.location.href = paypalUrl;
    }
  }, [paypalUrl]);

  const handleBuyWithPaypal = async () => {
    const response = await postToCheckout(randomDrink.id);
    setPaypalUrl(response.data.paypal_url);
  };

  return (
    <div className="container bg-white px-6 mx-auto max-w-6xl mt-8">
      <div className="flex flex-col md:flex-row ">
        <div className="w-80 md:my-0 my-6 mx-auto">
          <a href={`/drinks/${randomDrink.id}`}>
            <img
              src={randomDrink.image}
              alt={randomDrink.name}
              className="w-full"
            />
          </a>
        </div>
        <div className="">
          <h2 className="text-3xl font-bold">{randomDrink.name}</h2>
          <hr className="my-4 border-t  border-black" />
          <h3 className="text-xl">${randomDrink.price}</h3>
          <p className="text-lg my-4">{randomDrink.description}</p>
          <ul className="list-disc list-inside">
            <li>70cl bottle</li>
            <li>All Natural Flavourings</li>
            <li>ABV: 3.5{randomDrink.abv}% vol</li>
          </ul>

          <div className=" mt-8 mb-2">
            <div className="text-center flex flex-row font-semibold ">Qty</div>
            <div className="text-center">
              <div className="flex items-center ">
                <button
                  className="bg-gray-100 border border-gray-400 rounded-l p-2"
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
                  className="border border-gray-400 p-2 text-center appearance-none w-full sm:w-2/5"
                />
                <button
                  className="bg-gray-100 border border-gray-400 rounded-r p-2"
                  onClick={handleIncrement}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-items-center ">
            {" "}
            <button
              className="hover:bg-blue-gray-400 md:my-0 my-2 text-black font-bold py-2 px-4 rounded border hover:bg-gray-300 border-black mr-2 w-full"
              onClick={handleAddToCart}
            >
              {isAddedToCart ? (
                <FontAwesomeIcon icon={faCheck} className="text-gray-500" />
              ) : (
              "Add to Cart"
              )}
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white  font-bold font-mono py-2 px-4 rounded w-full"f
              onClick={handleBuyWithPaypal}
            >
              Buy with PayPal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RandomDrink;
