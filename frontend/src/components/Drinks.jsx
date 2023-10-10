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
        <div className="container">
          <h1 className="text-center py-4 text-xl mb-4 ">
            {" "}
            BROWSE OUR POPULAR ITEMS{" "}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-center gap-12">
            <div className="absolute left-1/2 -translate-x-1/2">
              {loader && <Loader />}
              <h1>{error}</h1>
            </div>
            {popularDrinks &&
              popularDrinks.map((prop, i) => (
                <div key={i}>
                  <div className="shadow-xl p-2 roun\ ded-md">
                    <img
                      className="h-[25vh] md:h-[35vh]"
                      src={prop.image}
                      alt={prop.name}
                    />
                    <h2 className="mt-6 lg:text-xl text-black">{prop.name}</h2>
                    {console.log(prop)}
                    <h2 className="text-xl font-bold mt-2">{prop.price} $</h2>
                  </div>
                </div>
              ))}
          </div>
          <h1 className="py-4 text-center mb-4 text-xl">
            TOP SALES THIS WEEKEND
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 textCenter gap-12">
            <div className="absolute left-1/2 -translate-x-1/2">
              {loader && <Loader />}
              <h1>{error}</h1>
            </div>
            {topDrinks &&
              topDrinks.map((prop, i) => (
                <div key={i}>
                  <div className="shadow-xl p-8 rounded-md md:h-[35vh]">
                    <img
                      className="h-[25vh] md:h-[35vh]"
                      src={prop.image}
                      alt={prop.name}
                    />
                    <h2 className="mt-6 lg:text-xl text-black">{prop.name}</h2>
                    {console.log(prop)}
                    <h2 className="text-xl font-bold mt-2">{prop.price} $</h2>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Drinks;
