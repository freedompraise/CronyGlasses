// api.js
import axios from "axios";
import { supabase } from "./supabaseClient";

const baseUrl = "https://cronyglasses-api.onrender.com/";
const checkoutUrl = baseUrl + "paypal/checkout/";
const createCartUrl = baseUrl + "api/cart/add/";
const getCartUrl = baseUrl + "api/cart/";

export const getAllDrinks = async () => {
  if (localStorage.getItem("drinks")) {
    return JSON.parse(localStorage.getItem("drinks"));
  } else {
    try {
      const response = await supabase.from("Drinks").select("*");
      localStorage.setItem("drinks", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};

export const getRelatedDrinks = async (currentDrinkId) => {
  if (localStorage.getItem("drinks")) {
    const drinks = JSON.parse(localStorage.getItem("drinks"));
    const relatedDrinks = drinks.filter(
      (drink) => drink.id !== currentDrinkId && drink.id >= 1 && drink.id <= 8
    );
    return relatedDrinks.slice(0, 4);
  } else {
    return ["No related drinks found"];
  }
};

export const getRandDrink = async () => {
  const randomDrinkId = Math.floor(Math.random() * 8) + 1;
  if (localStorage.getItem("drinks")) {
    const drinks = JSON.parse(localStorage.getItem("drinks"));
    return drinks.filter((drink) => drink.id === randomDrinkId);
  } else {
    try {
      const response = await supabase
        .from("Drinks")
        .select("*")
        .eq("id", randomDrinkId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};

export const getDrink = async (id) => {
  // if (localStorage.getItem("drinks")) {
  //   const drinks = JSON.parse(localStorage.getItem("drinks"));
  //   return drinks.filter((drink) => drink.id === id);
  // } else {
  try {
    const { data, error } = await supabase
      .from("Drinks")
      .select("*")
      .eq("id", id);

    if (error) {
      throw error;
    }

    console.log("The drink response is:", data);
    return data;
  } catch (error) {
    console.log("Error fetching drink:", error);
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

export const addToCart = async (productId, quantity) => {
  const postData = {
    drink_id: productId,
    quantity: quantity,
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
