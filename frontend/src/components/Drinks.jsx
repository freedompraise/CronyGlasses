import React, { useState, useEffect } from "react";
import { getDrinks } from "../services/api";
import Loader from "./Loader";

const Drinks = () => {
  // const [popularDrinks, setPopularDrinks] = useState([]);
  // const [topDrinks, setTopDrinks] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoader(true);

    getDrinks()
      .then((res) => {
        setDrinks(res.data.slice(0, 8)); // Update the popularDrinks state with the response data
        // setTopDrinks(res.data.slice(4, 8)); // Update the topDrinks state with the response data
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
        <div className="container max-w-6xl mx-auto my-8 p-4">
          <h1 className="text-center py-4 text-xl mb-4 ">
            {" "}
            BROWSE OUR POPULAR ITEMS{" "}
          </h1>
          <hr className="border-gray-300 mb-8" />
          <p className="text-center mt-4 mb-8">
            Quench your thirst with our popular drinks. Try them today and
            experience refreshment!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 text-center gap-4">
            {/* TO DO: make the drinks div centre aligned */}
            <div className="absolute translate-x-1/2">
              {loader && <Loader />}
              <h1>{error}</h1>
            </div>

            {drinks &&
              drinks.map((prop, i) => (
                <div className="mx-0 h-1/2 w-1/2" key={i}>
                  {/* TO DO: make the div full width and height */}
                  <div className="flex items-center justify-center h-full">
                    <img className="" src={prop.image} alt={prop.name} />
                  </div>
                  <h2 className="mt-6 lg:text-xl text-black">{prop.name}</h2>
                  {console.log(prop)}
                  <h2 className="text-xl font-bold mt-2">${prop.price} </h2>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Drinks;
