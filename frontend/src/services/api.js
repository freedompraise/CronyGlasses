// api.js
import axios from "axios";

const baseUrl = "https://cronyglasses-api.onrender.com/";
console.log(baseUrl, "is the base url");
const drinkUrl = baseUrl + "api/drinks/";
const checkoutUrl = baseUrl + "paypal/checkout/";

export const getDrinks = async () => {
  try {
    const response = await axios.get(drinkUrl);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getRandDrink = async () => {
  try {
    const response = await axios.get(`${drinkUrl}random`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getDrink = async (id) => {
  try {
    const response = await axios.get(`${drinkUrl}${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postToCheckout = async (productId) => {
  const postData = {
    product_id: productId,
  };

  try {
    const response = await axios.post(checkoutUrl, postData, {
      headers: {
        "Content-Type": "application/json",
        // Include any other headers your API requires
      },
    });

    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};
