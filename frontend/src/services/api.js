// api.js
import axios from "axios";

const url = "http://localhost:8000/api/drinks/";
const checkoutUrl = "http://localhost:8000/api/paypal/checkout/";

export const getDrinks = async () => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getRandDrink = async () => {
  try {
    const response = await axios.get(`${url}random`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getDrink = async (id) => {
  try {
    const response = await axios.get(`${url}${id}`);
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
