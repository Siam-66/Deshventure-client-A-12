import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet";

const MyAssignedTours = () => {
  const { user } = useContext(AuthContext);
  const [assignedTours, setAssignedTours] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    if (user?.email) {
      fetchAssignedTours();
    }
  }, [user, currentPage]);

  const fetchAssignedTours = () => {
    fetch(`http://localhost:5000/assigned-tours?guideEmail=${user.email}&page=${currentPage}&limit=${limit}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setAssignedTours(response.data.tours);
          setTotalPages(response.data.totalPages);
        }
      })
      .catch((error) => console.error("Error fetching assigned tours:", error));
  };

  const handleAccept = async (tourId) => {
    try {
      const response = await fetch(`http://localhost:5000/tours/accept/${tourId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "accepted" }),
      });

      if (response.ok) {
        fetchAssignedTours();
      }
    } catch (error) {
      console.error("Error accepting tour:", error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch(`http://localhost:5000/tours/reject/${selectedTourId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });

      if (response.ok) {
        setShowRejectModal(false);
        setSelectedTourId(null);
        fetchAssignedTours();
      }
    } catch (error) {
      console.error("Error rejecting tour:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container mx-auto p-4">
              <Helmet>
                <title> My Assigned Tours / Deshventure
                </title>
            </Helmet>
      <h2 className="text-2xl font-bold mb-4">My Assigned Tours</h2>
      
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Package Name</th>
              <th className="border border-gray-400 px-4 py-2">Tourist Name</th>
              <th className="border border-gray-400 px-4 py-2">Tour Date</th>
              <th className="border border-gray-400 px-4 py-2">Price</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignedTours.map((tour) => (
              <tr key={tour._id}>
                <td className="border border-gray-400 px-4 py-2">{tour.packageName}</td>
                <td className="border border-gray-400 px-4 py-2">{tour.touristName}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {new Date(tour.tourDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-400 px-4 py-2">{tour.price}</td>
                <td className="border border-gray-400 px-4 py-2">
                  <span className={`px-2 py-1 rounded ${
                    tour.status === "accepted" ? "bg-green-200 text-green-800" :
                    tour.status === "rejected" ? "bg-red-200 text-red-800" :
                    tour.status === "in review" ? "bg-yellow-200 text-yellow-800" :
                    "bg-gray-200 text-gray-800"
                  }`}>
                    {tour.status}
                  </span>
                </td>
                <td className="border border-gray-400 px-4 py-2">

                
                  <button
                    onClick={() => handleAccept(tour._id)}
                    disabled={tour.status !== "in review"}
                    className={`bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded mr-2 ${
                      tour.status !== "in review" ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Accept
                  </button>
                  
                  
                    <button
                      onClick={() => {
                        setSelectedTourId(tour._id);
                        setShowRejectModal(true);
                      }}
                      disabled={tour.status !== "in review"}
                      className={`bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded ${
                        tour.status !== "in review" ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Reject
                    </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-green-600 hover:text-white text-black rounded-l-lg  disabled:cursor-not-allowed"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${
              currentPage === index + 1 
                ? "text-black" 
                : "bg-gray-300 "
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 hover:bg-green-600 hover:text-white text-black rounded-r-lg  disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Rejection</h3>
            <p>Are you sure you want to reject this tour?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedTourId(null);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAssignedTours;