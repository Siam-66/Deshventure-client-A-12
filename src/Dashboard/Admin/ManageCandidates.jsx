import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const ManageCandidates = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);

  // Fetch all applications with pagination
  const fetchApplications = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://assignment-12-deshventure-server.vercel.app/applications?page=${page}&limit=10`);
      setApplications(response.data.applications);
      setTotalApplications(response.data.total);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications(currentPage);
  }, [currentPage]);

  // Handle Accept Application
  const handleAccept = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to accept this application and change the user's role to Tour Guide.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, accept it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(`https://assignment-12-deshventure-server.vercel.app/applications/accept/${id}`);
          Swal.fire("Accepted!", "User role has been updated.", "success");
          fetchApplications(currentPage); // Refresh the applications list
        } catch (error) {
          Swal.fire("Error", "Failed to accept the application.", "error");
        }
      }
    });
  };

  // Handle Reject Application
  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this application and delete it.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://assignment-12-deshventure-server.vercel.app/applications/reject/${id}`);
          Swal.fire("Rejected!", "Application has been deleted.", "success");
          fetchApplications(currentPage); // Refresh the applications list
        } catch (error) {
          Swal.fire("Error", "Failed to reject the application.", "error");
        }
      }
    });
  };

  // Pagination logic
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div className="text-center text-xl mt-10">Loading...</div>;
  }

  const totalPages = Math.ceil(totalApplications / 10);

  return (
    <div className="container mx-auto mt-10">
      <Helmet>
          <title> Manage Candidates / Deshventure
          </title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-6">Manage Candidates</h1>
      <div className="overflow-x-auto">
        <div className="min-w-full">
        <table className="table-auto w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">Photo</th>
              <th className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">Name</th>
              <th className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">Email</th>
              <th className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">CV Link</th>
              <th className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="text-center">
                <td className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">
                  <img
                    src={app.photo}
                    alt={app.name}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">{app.name}</td>
                <td className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">{app.email}</td>
                <td className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">
                  <a
                    href={app.cvLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View CV
                  </a>
                </td>
                <td className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">
                  <button
                    onClick={() => handleAccept(app._id)}
                    className="bg-green-500 hover:bg-green-600 max-sm:text-xs text-white font-bold py-1 px-4 rounded mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(app._id)}
                    className="bg-red-500 hover:bg-red-600 max-sm:text-xs text-white font-bold py-1 px-4 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {applications.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No applications found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-2 md:px-4 md:py-2 bg-gray-300 hover:bg-green-600 hover:text-white text-black rounded-l-lg "
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-2 py-2 md:px-4 md:py-2 ${currentPage === index + 1 ? "text-black" : "bg-gray-300"} `}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-2 md:px-4 md:py-2 bg-gray-300 hover:bg-green-600 hover:text-white text-black rounded-r-lg "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageCandidates;
