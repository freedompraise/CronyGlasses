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
    <div className="fade-in">
      <img src={banner} alt="banner" className="w-full h-340" />
      <RandomDrink />
      <WhyCrony />
      <Drinks />
    </div>
  );
}

export default Home;
