import React from "react";

const Banner = () => {
  return (
    <div
      className="relative h-[200px] sm:h-[300px] md:h-[350px] lg:h-[500px] flex items-center justify-center text-center"
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
        <h1 className="text-lg max-sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4  bg-gradient-to-r from-green-600 via-lime-500 to-emerald-600 bg-clip-text text-transparent">
          Welcome to Deshventure
        </h1>
        <p className="text-sm lg:px-[25rem] max-sm:text-sm md:text-lg mb-4 sm:mb-6">
          Discover the beauty of Bangladesh with unforgettable adventures and
          breathtaking experiences.
        </p>
        <button className=" border-2 hover:border-lime-500 hover:bg-gradient-to-r from-green-600 via-lime-500 to-emerald-300 text-white font-semibold max-sm:px-2 max-sm:py-2 md:px-5 md:py-3 rounded-md md:text-lg transition-all duration-300 lg:text-lg">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
