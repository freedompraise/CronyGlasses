import { supabase } from "./supabaseClient";

export const getAllDrinks = async () => {
  try {
    const response = await supabase.from("Drinks").select("*");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRelatedDrinks = async (currentDrinkId) => {
  try {
    const response = await supabase
      .from("Drinks")
      .select("*")
      .neq("id", currentDrinkId)
      .limit(3);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRandDrink = async () => {
  const randomDrinkId = Math.floor(Math.random() * 8) + 1;
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
