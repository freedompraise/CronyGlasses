import React from "react";

const RelatedDrinks = (props) => {
  return (
    <div className="bg-white p-4 md:p-8 mt-8">
      <h2 className="text-center text-lg font-bold uppercase mb-4">
        CHECK OUT OUR COLLECTIONS
      </h2>
      <hr className="w-full mb-4" />
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {props.relatedDrinks &&
          props.relatedDrinks
            .slice(0, 3)
            .map((drink, index) => (
              <img
                key={index}
                src={drink.image}
                alt={`Drink ${index + 1}`}
                className="mx-2"
              />
            ))}
      </div>
    </div>
  );
};

export default RelatedDrinks;
