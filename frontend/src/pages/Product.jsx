import { useState, useEffect } from "react";
import { getDrink, getRelatedDrinks } from "../services/api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Drink from "../components/Drink";
import FAQ from "../components/FAQ";
import RelatedDrinks from "../components/RelatedDrinks";
// import AgeVerificationPopup from "../components/AgeVerification";

function Product() {
  const [relatedDrinks, setRelatedDrinks] = useState([]);
  const [drink, setDrink] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getDrink(id)
      .then((res) => {
        if (res && res.length > 0) {
          setDrink(res[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    getRelatedDrinks(id)
      .then((res) => {
        if (res && res.length > 0) {
          setRelatedDrinks(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="container bg-white px-6 mx-auto max-w-6xl mt-8">
      <Drink drink={drink} />
      <FAQ />
      <RelatedDrinks props={relatedDrinks} />
      {/* <AgeVerificationPopup /> */}
    </div>
  );
}

export default Product;
