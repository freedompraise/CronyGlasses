import React, { useState, useEffect } from "react";
import { getDrinks } from "../services/api";
import Loader from "./Loader";

const Drinks = () => {
  const [popularDrinks, setPopularDrinks] = useState([]);
  const [topDrinks, setTopDrinks] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoader(true);

    getDrinks()
      .then((res) => {
        setPopularDrinks(res.data.slice(0, 4)); // Update the popularDrinks state with the response data
        setTopDrinks(res.data.slice(4, 8)); // Update the topDrinks state with the response data
        setLoader(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoader(false);
      });
  }, []);

  console.log("Drinks State:", popularDrinks);

  return (
    <>
      <div className="py-12 bg-[#fefefe]">
        <div className="container max-w-6xl mx-auto my-8 p-4">
          <h1 className="text-center py-4 text-xl mb-4 ">
            {" "}
            BROWSE OUR POPULAR ITEMS{" "}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 text-center gap-4">
            <div className="absolute left-1/2 -translate-x-1/2">
              {loader && <Loader />}
              <h1>{error}</h1>
            </div>

            {popularDrinks &&
              popularDrinks.map((prop, i) => (
                <div className="mx-0 h-1/2 w-1/2" key={i}>
                  <img className="" src={prop.image} alt={prop.name} />
                  <h2 className="mt-6 lg:text-xl text-black">{prop.name}</h2>
                  {console.log(prop)}
                  <h2 className="text-xl font-bold mt-2">{prop.price} $</h2>
                </div>
              ))}
          </div>
          <h1 className="py-4 text-center mb-4 text-xl">
            TOP SALES THIS WEEKEND
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 textCenter gap-1/4">
            <div className="absolute left-1/2 -translate-x-1/2">
              {loader && <Loader />}
              <h1>{error}</h1>
            </div>
            {topDrinks &&
              topDrinks.map((prop, i) => (
                <div className="h-1/2 w-1/2 mx-0" key={i}>
                  <img className="" src={prop.image} alt={prop.name} />
                  <h2 className="mt-6 lg:text-xl text-black">{prop.name}</h2>
                  {console.log(prop)}
                  <h2 className="text-xl font-bold mt-2">{prop.price} $</h2>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Drinks;
