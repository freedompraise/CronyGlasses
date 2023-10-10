// api.js
import axios from "axios";

const url = "http://localhost:8000/api/drinks/";

// const api = axios.create({
//   baseURL: url,
// });

export const getDrinks = async () => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getRandDrink = async () => {};
