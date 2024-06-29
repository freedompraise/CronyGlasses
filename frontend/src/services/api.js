import axios from "axios";
import { supabase } from "./supabaseClient";

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
    return relatedDrinks.slice(0, 3);
  } else {
    throw new Error("No drinks found in local storage");
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
      localStorage.setItem("drinks", JSON.stringify(response.data));
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
    return data;
  } catch (error) {
    console.log("Error fetching drink:", error);
  }
};
