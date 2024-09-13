import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../contexts/CartContext";
import MockPaymentModal from "./MockPaymentModal";

function Drink({ drink }) {
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { manageCart } = useCart();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  const handleAddToCart = () => {
    manageCart(drink, quantity);
    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 3000);
  };

  const handleBuyWithStripe = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsAddedToCart(false);
    setQuantity(1);
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row ">
        <div className="w-80 md:my-0 my-6 mx-auto">
          <a href={`/drinks/${drink.id}`}>
            <img src={drink.image} alt={drink.name} className="w-full" />
          </a>
        </div>
        <div className="">
          <h2 className="text-3xl font-bold">{drink.name}</h2>
          <hr className="my-4 border-t  border-black" />
          <h3 className="text-xl font-bold">${drink.price}</h3>
          <p className="text-lg my-4">{drink.description}</p>
          <ul className="list-disc list-inside">
            <li>70cl bottle</li>
            <li>All Natural Flavourings</li>
            <li>Gluten Free</li>
            <li>100% Vegan</li>
          </ul>
          <div className="mt-8 mb-2">
            <div className="text-center flex flex-row font-semibold">Qty</div>
            <div className="text-center">
              <div className="flex items-center">
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

          <div className="flex flex-col sm:flex-row justify-items-center">
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold font-mono py-2 px-4 rounded w-full"
              onClick={handleBuyWithStripe}
            >
              Buy with Stripe
            </button>
          </div>
        </div>
      </div>

      <MockPaymentModal
        isOpen={isPaymentModalOpen}
        onRequestClose={() => setIsPaymentModalOpen(false)}
        amount={(drink.price * quantity).toFixed(2)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}

export default Drink;
