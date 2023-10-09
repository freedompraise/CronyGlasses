import React, { useState, useEffect } from "react";
import { getDrinks } from "../services/api";
import Loader from "./Loader";

const Drinks = () => {
  const [drinks, setDrinks] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoader(true);

    getDrinks()
      .then((res) => {
        setDrinks(res.data); // Update the drinks state with the response data
        setLoader(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoader(false);
      });
  }, []);

  console.log("Drinks State:", drinks);

  return (
    <>
      <div className="py-12 bg-[#fefefe]">
        <div className="container">
          <div className="text-center py-16">
            <h1> Browse Our Popular Items </h1>
            <h6 className="mt-4">Top Sales In This Weekend</h6>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 textCenter gap-12">
            <div className="absolute left-1/2 -translate-x-1/2">
              {loader && <Loader />}
              <h1>{error}</h1>
            </div>
            {drinks &&
              drinks.map((prop, i) => (
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
