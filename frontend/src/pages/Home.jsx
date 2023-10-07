import React from "react";
import banner from "../assets/banner.png";
import Drink from "../components/Drink";

function Home() {
  return (
    <div className="">
      <img src={banner} alt="banner" className="w-full h-340" />
      <h3 className="text-black">This is Home Page</h3>
      <Drink />
    </div>
  );
}

export default Home;
