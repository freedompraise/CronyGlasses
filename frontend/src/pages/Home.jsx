import React from "react";
import banner from "../assets/banner.png";
import RandomDrink from "../components/RandomDrink";
import WhyCrony from "../components/WhyCrony";
import Drinks from "../components/Drinks";

function Home() {
  return (
    <div className="">
      <img src={banner} alt="banner" className="w-full h-340" />
      <RandomDrink />
      <WhyCrony />
      <Drinks />
    </div>
  );
}

export default Home;
