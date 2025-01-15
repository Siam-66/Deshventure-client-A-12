import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TourismTravelGuide = () => {
  const navigate = useNavigate();

  // Placeholder data for packages
  const packages = [
    {
      id: 1,
      photo: "https://via.placeholder.com/300",
      tourType: "Adventure",
      title: "Mountain Trekking",
      price: "$500",
    },
    {
      id: 2,
      photo: "https://via.placeholder.com/300",
      tourType: "Relaxation",
      title: "Beach Vacation",
      price: "$700",
    },
    {
      id: 3,
      photo: "https://via.placeholder.com/300",
      tourType: "Cultural",
      title: "Historical Tour",
      price: "$400",
    },
  ];

  // Placeholder data for tour guides
  const guides = [
    {
      id: 1,
      photo: "https://via.placeholder.com/150",
      name: "John Doe",
      experience: "5 years",
      specialty: "Mountain Trekking",
    },
    {
      id: 2,
      photo: "https://via.placeholder.com/150",
      name: "Jane Smith",
      experience: "3 years",
      specialty: "Beach Vacations",
    },
    {
      id: 3,
      photo: "https://via.placeholder.com/150",
      name: "Mike Johnson",
      experience: "7 years",
      specialty: "Historical Tours",
    },
  ];

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
            className={`tab ${activeTab === 0 ? "tab-active" : ""}`}
            onClick={() => setActiveTab(0)}
          >
            Our Packages
          </button>
          <button
            className={`tab ${activeTab === 1 ? "tab-active" : ""}`}
            onClick={() => setActiveTab(1)}
          >
            Meet Our Tour Guides
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div key={pkg.id} className="card bg-white shadow-lg rounded-md p-4">
                  <img
                    src={pkg.photo}
                    alt={pkg.title}
                    className="rounded-md w-full h-48 object-cover mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-gray-600 mb-2">Type: {pkg.tourType}</p>
                  <p className="text-green-600 font-semibold mb-4">
                    Price: {pkg.price}
                  </p>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
                    onClick={() => navigate(`/packages/${pkg.id}`)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <div key={guide.id} className="card bg-white shadow-lg rounded-md p-4">
                  <img
                    src={guide.photo}
                    alt={guide.name}
                    className="rounded-full w-24 h-24 mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {guide.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Experience: {guide.experience}
                  </p>
                  <p className="text-gray-600 mb-2">Specialty: {guide.specialty}</p>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
                    onClick={() => navigate(`/guides/${guide.id}`)}
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
