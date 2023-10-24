import React from "react";

const RelatedDrinks = () => {
  return (
    <div className="bg-white p-4 md:p-8">
      <h2 className="text-center text-lg font-bold uppercase mb-4">
        CHECK OUT OUR COLLECTIONS
      </h2>
      <hr className="w-full mb-4" />
      <div className="flex flex-row justify-between">
        <img
          src="https://via.placeholder.com/120x120"
          alt="Drink 1"
          className="w-1/4 mx-2"
        />
        <img
          src="https://via.placeholder.com/120x120"
          alt="Drink 2"
          className="w-1/4 mx-2"
        />
        <img
          src="https://via.placeholder.com/120x120"
          alt="Drink 3"
          className="w-1/4 mx-2"
        />
      </div>
    </div>
  );
};

export default RelatedDrinks;
