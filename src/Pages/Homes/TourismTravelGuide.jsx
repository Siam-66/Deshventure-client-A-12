import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TourismTravelGuide = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [randomPackages, setRandomPackages] = useState([]);
  const [tourGuides, setTourGuides] = useState([]);
  const [randomTourGuides, setRandomTourGuides] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("https://assignment-12-deshventure-server.vercel.app/allTour");
        const data = await response.json();
        setPackages(data);
        const randomIndexes = [];
        while (randomIndexes.length < 3) {
          const randomIndex = Math.floor(Math.random() * data.length);
          if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
          }
        }
        setRandomPackages(randomIndexes.map((index) => data[index]));
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };

    const fetchTourGuides = async () => {
      try {
        const response = await fetch("https://assignment-12-deshventure-server.vercel.app/tour-guides");
        const data = await response.json();
        setTourGuides(data);
        const randomIndexes = [];
        while (randomIndexes.length < 6) {
          const randomIndex = Math.floor(Math.random() * data.length);
          if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
          }
        }
        setRandomTourGuides(randomIndexes.map((index) => data[index]));
      } catch (error) {
        console.error("Error fetching tour guides:", error);
      }
    };

    fetchPackages();
    fetchTourGuides();
  }, []);

  return (
    <section className="py-10 bg-gray-100 container mx-auto dark:bg-gray-950">
      <div className=" text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Tourism and Travel Guide
        </h2>
        <p className="text-gray-600 text-lg mb-10 dark:text-gray-400">
          Explore our exclusive travel packages and meet our experienced tour guides.
        </p>

        <div className="tabs tabs-boxed justify-center mb-8 dark:bg-gray-900 md:w-[21rem] max-sm:w-[18rem]  items-center flex mx-auto max-sm:text-xs bg-gray-200 ">
          <button
            className={`tab ${
              activeTab === 0
                ? "tab-active bg-gradient-to-r from-green-600 to-lime-500 text-xl  text-white max-sm:text-base"
                : " text-xl  max-sm:text-base"
            }`}
            onClick={() => setActiveTab(0)}
          >
            Our Packages
          </button>
          <button
            className={`tab ${
              activeTab === 1
                ? "tab-active bg-gradient-to-r from-green-600 to-lime-500 text-xl  text-white max-sm:text-base"
                : "text-xl max-sm:text-base"
            }`}
            onClick={() => setActiveTab(1)}
          >
            Our Guides
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {randomPackages.map((pkg) => (
                <div
                  key={pkg._id}
                  className="card  bg-white dark:bg-gray-900 shadow-lg rounded-md p-4"
                >
                  <img
                    src={pkg.gallery[0]}
                    alt={pkg.name}
                    className="rounded-md w-full h-48 object-cover mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 h-[9rem] mb-2 dark:text-gray-400">{pkg.aboutTour}</p>
                  <p className="text-green-600 font-semibold mb-4">
                    Price: {pkg.price}
                  </p>
                  <button
                    className="bg-gradient-to-r from-green-600 to-lime-500 text-white px-4 py-2 rounded-md shadow transition"
                    onClick={() => navigate(`/packageDetailsPage/${pkg._id}`)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {randomTourGuides.map((guide) => (
                <div
                  key={guide._id}
                  className="flex flex-col items-center space-y-4 p-4 bg-white shadow-lg rounded-md dark:bg-gray-900"
                >
                  <div onClick={() => navigate(`/tourGuideProfile/${guide._id}`)} className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-green-500 ring-offset-2 hover:scale-110 duration-300">
                    <img
                      src={guide.photo}
                      alt={guide.name}
                      className="w-full h-full object-cover "
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {guide.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{guide.bio}</p>
                  <button
                    className="bg-gradient-to-r from-green-600 to-lime-500 text-white px-4 py-2 rounded-md shadow transition"
                    onClick={() => navigate(`/tourGuideProfile/${guide._id}`)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TourismTravelGuide;
