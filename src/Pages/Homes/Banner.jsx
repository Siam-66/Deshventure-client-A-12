import React, { useEffect } from "react";
import "animate.css"; // Importing Animate.css
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="relative h-[250px]  md:h-[350px] lg:h-[500px] flex items-center justify-center text-center mb-10"
      style={{
        backgroundImage: `url(https://i.ibb.co/tBGfDq2/slider.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 text-white px-4 sm:px-6 md:px-10">
        <h1 className="animate__animated animate__fadeInDown  max-sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-5 sm:mb-4 bg-gradient-to-r from-green-600 via-lime-500 to-emerald-600 bg-clip-text text-transparent">
          Welcome to Deshventure
        </h1>
        <p className="animate__animated animate__fadeInDown animate__delay-1s text-sm lg:px-[25rem] max-sm:text-sm md:text-lg mb-4 sm:mb-6">
          Discover the beauty of Bangladesh with unforgettable adventures and
          breathtaking experiences.
        </p>
        <div className=" flex justify-center items-center gap-8">
          <Link to="allTripsPage" className="animate__animated animate__fadeInDown animate__delay-2s border-2 hover:border-lime-600 hover:bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold max-sm:px-2 max-sm:py-2 md:px-5 md:py-3 rounded-md md:text-lg  lg:text-lg">
          Explore More</Link>
          <a href="#becomeGuide" className="animate__animated animate__fadeInDown animate__delay-2s border-2 hover:border-lime-600 hover:bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold max-sm:px-2 max-sm:py-2 md:px-5 md:py-3 rounded-md md:text-lg  lg:text-lg">
          Join Our Team
        </a>
        </div>

      </div>
    </div>
  );
};

export default Banner;
