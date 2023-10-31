import React, { useState, useEffect } from "react";
import { getDrink } from "../services/api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Drink, FAQ, RelatedDrinks } from "../components/INDEX";

function Product() {
  const [relatedDrinks, setRelatedDrinks] = useState([]);
  const [drink, setDrink] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getDrink(id)
      .then((res) => {
        setDrink(res.data.drink);
        setRelatedDrinks(res.data.related_drinks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="container bg-white px-12 mx-auto max-w-4xl mt-8">
      <Drink drink={drink} />
      <FAQ />
      <RelatedDrinks relatedDrinks={relatedDrinks} />
    </div>
  );
}

export default Product;
