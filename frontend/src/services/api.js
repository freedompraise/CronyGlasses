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

export const createReview = async (drinkId, rating, reviewText, userId) => {
  try {
    if (!userId) {
      throw new Error("User not authenticated");
    }
    const { data, error } = await supabase
      .from("Reviews")
      .insert([
        { drink_id: drinkId, rating, review_text: reviewText, user_id: userId },
      ])
      .select(
        `
        *,
        profiles:user_id (username)
      `
      )
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

export const getDrinkReviews = async (drinkId) => {
  try {
    const { data, error } = await supabase
      .from("Reviews")
      .select(`*, profiles:user_id (username)`)
      .eq("drink_id", drinkId);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

export const updateReview = async (reviewId, rating, reviewText, userId) => {
  try {
    if (!userId) {
      throw new Error("User not authenticated");
    }
    const { data, error } = await supabase
      .from("Reviews")
      .update({
        rating,
        review_text: reviewText,
        updated_at: new Date(),
      })
      .eq("id", reviewId)
      .eq("user_id", userId)
      .select(
        `
        *,
        profiles:user_id (username)
      `
      )
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

export const deleteReview = async (reviewId, userId) => {
  try {
    if (!userId) {
      throw new Error("User not authenticated");
    }
    const { data, error } = await supabase
      .from("Reviews")
      .delete()
      .eq("id", reviewId)
      .eq("user_id", userId);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error deleting review:", error);
  }
};
