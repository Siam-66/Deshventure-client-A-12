import React from "react";

const OverviewSection = () => {
  const videoLinks = [
    "https://www.youtube.com/embed/Z44fFqBQQtg",
    "https://www.youtube.com/embed/X5yOjH0wpg8",
    "https://www.youtube.com/embed/JLjvEYMBGzQ",
    "https://www.youtube.com/embed/k8C949_CZUo",
    "https://www.youtube.com/embed/Qq4pFcHBhis",
    "https://www.youtube.com/embed/Cn4G2lZ_g2I",
  ];

  return (
    <section className="relative bg-gray-100 py-10">
      <div className=" text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Discover Bangladesh
        </h2>

        <p className="text-gray-600 text-lg mb-5 lg:px-[15rem]">
          Explore the beauty, adventure, and unique experiences waiting for you. 
          Our platform is your gateway to breathtaking destinations and unforgettable memories.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videoLinks.map((link, index) => (
            <div key={index} className="flex justify-center">
              <iframe
                className="rounded-md shadow-lg"
                src={link}
                title={`Overview Video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: "100%", 
                  maxWidth: "450px", 
                  height: "195px", 
                }}
              ></iframe>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="https://www.youtube.com/results?search_query=best+place+to+travel+in+bangladesh"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-green-600 via-lime-500 to-emerald-300 text-white font-semibold px-8 py-3 rounded-md shadow-md transition-all duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
