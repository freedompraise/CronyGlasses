// api.js
import axios from "axios";

const url = "http://localhost:8000/api/drinks/";

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
