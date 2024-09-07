import { useEffect } from "react";
import banner from "../assets/banner.png";
import RandomDrink from "../components/RandomDrink";
import WhyCrony from "../components/WhyCrony";
import Drinks from "../components/Drinks";
import { initializeScrollAnimations } from "../utils/ScrollObserver";

function Home() {
  useEffect(() => {
    initializeScrollAnimations();
  }, []);

  return (
    <div>
      <img src={banner} alt="banner" className="w-full h-340" />
      <div className="fade-in">
        <RandomDrink />
      </div>
      <div className="fade-in">
        <WhyCrony />
      </div>
      <div className="fade-in">
        <Drinks />
      </div>
    </div>
  );
}

export default Home;
