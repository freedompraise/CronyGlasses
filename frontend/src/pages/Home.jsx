import React from "react";
import banner from "../assets/banner.png";
import Drinks from "../components/Drinks";

function Home() {
  return (
    <div className="">
      <img src={banner} alt="banner" className="w-full h-340" />
      <h3 className="text-black">This is Home Page</h3>
      <Drinks />
    </div>
  );
}

export default Home;
