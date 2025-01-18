import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TourismTravelGuide = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [randomPackages, setRandomPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("http://localhost:5000/allTour");
        const data = await response.json();
        setPackages(data);
        // Get random 3 packages from the fetched data
        const randomIndexes = [];
        while (randomIndexes.length < 3) {
          const randomIndex = Math.floor(Math.random() * data.length);
          if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
          }
        }
        setRandomPackages(randomIndexes.map(index => data[index]));
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Tourism and Travel Guide
        </h2>
        <p className="text-gray-600 text-lg mb-10">
          Explore our exclusive travel packages and meet our experienced tour guides.
        </p>

        {/* Tabs */}
        <div className="tabs tabs-boxed justify-center mb-8">
  <button
    className={`tab ${
      activeTab === 0
        ? "tab-active bg-gradient-to-r from-green-600 to-lime-500  text-white"
        : ""
    }`}
    onClick={() => setActiveTab(0)}
  >
    Our Packages
  </button>
  <button
    className={`tab ${
      activeTab === 1
        ? "tab-active bg-gradient-to-r from-green-600 to-lime-500  text-white"
        : ""
    }`}
    onClick={() => setActiveTab(1)}
  >
    Meet Our Tour Guides
  </button>
</div>


        {/* Tab Content */}
        <div>
          {activeTab === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {randomPackages.map((pkg) => (
                <div key={pkg._id} className="card bg-white shadow-lg rounded-md p-4">
                  <img
                    src={pkg.gallery[0]} // Assuming the first image is in the gallery array
                    alt={pkg.name}
                    className="rounded-md w-full h-48 object-cover mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 h-[9rem] mb-2">{pkg.aboutTour}</p>
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
              {/* Replace with actual guide data */}
              {/* Your tour guides content goes here */}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TourismTravelGuide;
