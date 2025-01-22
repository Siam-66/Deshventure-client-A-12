import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const AllTripsPage = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("https://assignment-12-deshventure-server.vercel.app/allTour");
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
          <title> All Trips Page / Deshventure
          </title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-600 via-lime-500 to-emerald-600 bg-clip-text text-transparent">All Trips</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg._id} className="card bg-base-200 shadow-lg">
            <figure>
              <img src={pkg.gallery[0]} alt={pkg.name} className="h-52 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{pkg.name}</h2>
              <p className="text-justify">{pkg.aboutTour}</p>
              <p className="text-lg font-bold text-green-600 mt-2">Price: {pkg.price}</p>
              <div className="card-actions justify-end">
              <Link className="btn bg-gradient-to-r from-green-600 to-lime-500 text-white" to={`/packageDetailsPage/${pkg._id}`}>
            Package Details
            </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTripsPage;
