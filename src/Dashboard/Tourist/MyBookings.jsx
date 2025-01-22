import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import CelebrationModal from "./CelebrationModal";
import { Helmet } from "react-helmet";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; 

  const checkBookingCount = async (email) => {
    try {
      const response = await fetch(`https://assignment-12-deshventure-server.vercel.app/bookings/count?email=${email}`);
      const data = await response.json();
      return data.count;
    } catch (error) {
      console.error("Error checking booking count:", error);
      return 0;
    }
  };

  // updated fetch bookings 
  useEffect(() => {
    if (user?.email) {
      fetch(`https://assignment-12-deshventure-server.vercel.app/bookings?email=${user.email}&page=${currentPage}&limit=${limit}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.success) {
            setBookings(response.data.bookings);
            setTotalPages(response.data.totalPages);
          }
        })
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, [user, currentPage]); 

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  //  payment submission
  const handlePayment = async (booking) => {
    setPaymentStatus("Processing payment...");
    
    try {
      const response = await fetch("https://assignment-12-deshventure-server.vercel.app/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          bookingId: booking._id, 
          amount: parseFloat(booking.price)
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setBookings(prevBookings =>
          prevBookings.map(b =>
            b._id === booking._id
              ? { ...b, status: "in review", paymentId: data.paymentId }
              : b
          )
        );
        
        setPaymentStatus("Payment successful!");
        
        // check booking count 
        const bookingCount = await checkBookingCount(user.email);
        if (bookingCount === 3) {
          setShowCelebration(true);
        } else {
          setTimeout(() => {
            setIsModalOpen(false);
            setSelectedBooking(null);
            setTimeout(() => setPaymentStatus(""), 200);
          }, 200);
        }
  
        // Refresh bookings data
        const updatedBookings = await fetch(
          `https://assignment-12-deshventure-server.vercel.app/bookings?email=${user.email}&page=${currentPage}&limit=${limit}`
        ).then(res => res.json());
        
        if (updatedBookings.success) {
          setBookings(updatedBookings.data.bookings);
          setTotalPages(updatedBookings.data.totalPages);
        }
      } else {
        setPaymentStatus(data.error || "Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      setPaymentStatus("An error occurred while processing the payment. Please try again.");
    }
  };

  // handle cancellation
  const handleCancel = (id) => {
    fetch(`https://assignment-12-deshventure-server.vercel.app/bookings/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        fetch(`https://assignment-12-deshventure-server.vercel.app/bookings?email=${user.email}&page=${currentPage}&limit=${limit}`)
          .then((res) => res.json())
          .then((response) => {
            if (response.success) {
              setBookings(response.data.bookings);
              setTotalPages(response.data.totalPages);
              if (response.data.bookings.length === 0 && currentPage > 1) {
                setCurrentPage(prev => prev - 1);
              }
            }
          });
      })
      .catch((error) => console.error("Cancellation Error:", error));
  };

  return (
    <div className="container mx-auto p-4">
            <Helmet>
                <title> My Bookings / Deshventure
                </title>
            </Helmet>
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
  <div className="overflow-x-auto">
      <div className="min-w-full">
      <table className="table-auto w-full  border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">Package Name</th>
            <th className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">Tour Guide</th>
            <th className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">Tour Date</th>
            <th className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">Price</th>
            <th className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">Status</th>
            <th className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">{booking.packageName}</td>
              <td className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">{booking.tourGuide.name || "Not Assigned"}</td>
              <td className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">{new Date(booking.tourDate).toLocaleDateString()}</td>
              <td className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">{booking.price} BDT</td>
              <td className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">
                  <span className={`md:px-2 md:py-1 rounded ${
                    booking.status === "accepted" ? "bg-green-200 text-green-800" :
                    booking.status === "rejected" ? "bg-red-200 text-red-800" :
                    booking.status === "in review" ? "bg-yellow-200 text-yellow-800" :
                    "bg-gray-200 text-gray-800"
                  }`}>
                    {booking.status}
                  </span>
                </td>
              <td className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">
                {booking.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        setSelectedBooking(booking);
                        setIsModalOpen(true);
                      }}
                      className="bg-green-500 hover:bg-green-600 max-sm:text-xs text-white font-bold py-1 px-4 rounded mr-2"
                    >
                      Pay
                    </button>
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="bg-red-500 hover:bg-red-600 max-sm:text-xs text-white font-bold py-1 px-2 rounded"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-2 md:px-4 md:py-2 bg-gray-300 hover:bg-green-600 hover:text-white text-black rounded-l-lg"
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
          className="px-2 py-2 md:px-4 md:py-2 bg-gray-300 hover:bg-green-600 hover:text-white text-black rounded-r-lg"
        >
          Next
        </button>
      </div>

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Confirm Payment</h3>
            {selectedBooking && (
              <>
                <p>Package: {selectedBooking.packageName}</p>
                <p>Amount: {selectedBooking.price} BDT</p>
              </>
            )}
            <div className="mt-4">
              <button
                onClick={() => handlePayment(selectedBooking)}
                className="btn btn-primary mr-2"
              >
                Confirm Payment
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {paymentStatus && <p className="mt-4 text-green-600">{paymentStatus}</p>}
    
<CelebrationModal 
  isOpen={showCelebration} 
  onClose={() => {
    setShowCelebration(false);
    setIsModalOpen(false);
    setSelectedBooking(null);
    setPaymentStatus("");
  }} 
/>

    </div>
  );
};

export default MyBookings;