import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { RiResetLeftFill } from "react-icons/ri";

const AllTripsPage = () => {
  const [packages, setPackages] = useState([]);
  const [originalPackages, setOriginalPackages] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("https://assignment-12-deshventure-server.vercel.app/allTour");
        const data = await response.json();
        setPackages(data);
        setOriginalPackages(data);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };
    fetchPackages();
  }, []);

  // Handle search
  useEffect(() => {
    if (search.trim() === "") {
      setPackages(originalPackages);
    } else {
      const filteredPackages = originalPackages.filter((pkg) =>
        pkg.name.toLowerCase().includes(search.toLowerCase())
      );
      setPackages(filteredPackages);
    }
  }, [search, originalPackages]);

  // Handle sort change
  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    if (order === "none") {
      setPackages([...originalPackages]);
      return;
    }

    const sortedPackages = [...packages].sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
      const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
      return order === "asc" ? priceA - priceB : priceB - priceA;
    });
    setPackages(sortedPackages);
  };

  // Reset to original state
  const handleReset = () => {
    setSearch("");
    setSortOrder("none");
    setPackages([...originalPackages]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>All Trips Page / Deshventure</title>
      </Helmet>
      
      <h1 className="md:text-4xl text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-600 via-lime-500 to-emerald-600 bg-clip-text text-transparent">
        All Trips
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        {/* Search Input */}
        <div className="relative w-full md:w-auto">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Trip Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered pl-10 w-full md:w-80"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex gap-2 items-center">
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="select select-bordered w-full md:w-60"
          >
            <option value="none">Sort by price...</option>
            <option value="desc">Price High to Low</option>
            <option value="asc">Price Low to High</option>
          </select>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="btn bg-gradient-to-r from-green-600 to-lime-500 text-white"
          >
            <RiResetLeftFill />Reset All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg._id} className="card bg-base-200 shadow-lg dark:bg-gray-900">
            <figure>
              <img
                src={pkg.gallery[0]}
                alt={pkg.name}
                className="h-52 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{pkg.name}</h2>
              <p className="text-justify">{pkg.aboutTour}</p>
              <p className="text-lg font-bold text-green-600 mt-2">
                Price: {pkg.price}
              </p>
              <div className="card-actions justify-end">
                <Link
                  className="btn bg-gradient-to-r from-green-600 to-lime-500 text-white"
                  to={`/packageDetailsPage/${pkg._id}`}
                >
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