import React from "react";
import banner from "../assets/banner.png";
import { Drinks, RandomDrink, WhyCrony } from "../components";

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
