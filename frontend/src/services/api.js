// api.js
import axios from "axios";

// const isDevelopment = process.env.NODE_ENV === "development";

const baseUrl = "https://cronyglasses-api.onrender.com/";

console.log(baseUrl, "is the base url");
const drinkUrl = baseUrl + "api/drinks/";
const checkoutUrl = baseUrl + "paypal/checkout/";
const createCartUrl = baseUrl + "api/cart/add/";
const getCartUrl = baseUrl + "api/cart/";

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
      },
    });

    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const addToCart = async (productId) => {
  const postData = {
    drink_id: productId,
  };

  try {
    const response = await axios.post(createCartUrl, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getCart = async () => {
  try {
    const response = await axios.get(getCartUrl);
    return response;
  } catch (error) {
    console.error("Error fetching cart details:", error);
  }
};
