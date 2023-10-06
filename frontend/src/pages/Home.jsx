import React from "react";
import banner from "../assets/banner.png";

function Home() {
  return (
    <div className="">
      <img src={banner} alt="banner" className="w-full h-340" />
      <h3 className="text-white">This is Home Page</h3>
    </div>
  );
}

export default Home;
