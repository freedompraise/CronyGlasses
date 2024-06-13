import React, { useState, useEffect } from "react";
import { getDrink, getRelatedDrinks } from "../services/api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Drink, FAQ, RelatedDrinks } from "../components/INDEX";

function Product() {
  const [relatedDrinks, setRelatedDrinks] = useState([]);
  const [drink, setDrink] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getDrink(id)
      .then((res) => {
        if (res && res.length > 0) {
          setDrink(res[0]);
          console.log("The set drink is:", drink);
        } else {
          console.log("No drink found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    const relatedDrinks = getRelatedDrinks(id);
    setRelatedDrinks(relatedDrinks);
  }, [id]);

  return (
    <div className="container bg-white px-6 mx-auto max-w-6xl mt-8">
      {console.log("The drink is:", drink)}
      <Drink drink={drink} />
      <FAQ />
      {/* <RelatedDrinks props={relatedDrinks} /> */}
      {/* <AgeVerificationPopup /> */}
    </div>
  );
}

export default Product;
