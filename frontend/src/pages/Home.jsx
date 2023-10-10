import React from "react";
import banner from "../assets/banner.png";
import { Drinks, WhyCrony } from "../components/INDEX";

function Home() {
  return (
    <div className="">
      <img src={banner} alt="banner" className="w-full h-340" />
      <WhyCrony />
      <p>Drink</p>
      <Drinks />
    </div>
  );
}

export default Home;
