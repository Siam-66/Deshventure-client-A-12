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
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-white px-4 sm:px-6 md:px-10">
        <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
          Welcome to Deshventure
        </h1>
        <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
          Discover the beauty of Bangladesh with unforgettable adventures and
          breathtaking experiences.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-md transition-all duration-300">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
