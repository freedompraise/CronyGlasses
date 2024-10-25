import { supabase } from "./supabaseClient";

export const getAllDrinks = async () => {
  const { data, error } = await supabase.from("Drink").select("*");
  if (error) {
    throw error;
  }
  return data;
};

export const getRelatedDrinks = async (currentDrinkId) => {
  try {
    const response = await supabase
      .from("Drink")
      .select("*")
      .neq("id", currentDrinkId.toString())
      .limit(3);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRandDrink = async () => {
  const randomDrinkId = (Math.floor(Math.random() * 8) + 1).toString();
  try {
    const response = await supabase
      .from("Drink")
      .select("*")
      .eq("id", randomDrinkId);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDrink = async (id) => {
  try {
    const { data, error } = await supabase
      .from("Drink")
      .select("*")
      .eq("id", id.toString());

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log("Error fetching drink:", error);
  }
};
