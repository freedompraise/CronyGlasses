import React, { useState, useEffect } from "react";
import { getDrink } from "../services/api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Drink, FAQ, RelatedDrinks} from "../components/INDEX";

function Product() {
  const [relatedDrinks, setRelatedDrinks] = useState([]);
  const [drink, setDrink] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getDrink(id)
      .then((res) => {
        setDrink(res[0]);
        // setRelatedDrinks(res.data.related_drinks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="container bg-white px-6 mx-auto max-w-6xl mt-8">
      <Drink drink={drink} />
      <FAQ />
      <RelatedDrinks relatedDrinks={relatedDrinks} />
      {/* <AgeVerificationPopup /> */}  
    </div>
  );
}

export default Product;
