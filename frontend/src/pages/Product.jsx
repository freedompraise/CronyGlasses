import React from "react";
import { Drink, FAQ, RelatedDrinks } from "../components/INDEX";

function Product() {
  return (
    <div className="container bg-white px-12 mx-auto max-w-4xl mt-8">
      <Drink />
      <FAQ />
      <RelatedDrinks />
    </div>
  );
}

export default Product;
