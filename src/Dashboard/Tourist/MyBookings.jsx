import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import CelebrationModal from "./CelebrationModal";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Items per page

  // Add this function to check booking count
  const checkBookingCount = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/bookings/count?email=${email}`);
      const data = await response.json();
      return data.count;
    } catch (error) {
      console.error("Error checking booking count:", error);
      return 0;
    }
  };

  // Updated fetch bookings to handle pagination
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/bookings?email=${user.email}&page=${currentPage}&limit=${limit}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.success) {
            setBookings(response.data.bookings);
            setTotalPages(response.data.totalPages);
          }
        })
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, [user, currentPage]); // Add currentPage to dependencies

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle payment submission
  const handlePayment = async (booking) => {
    setPaymentStatus("Processing payment...");
    
    try {
      const response = await fetch("http://localhost:5000/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          bookingId: booking._id, 
          amount: parseFloat(booking.price)
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        // Update bookings state
        setBookings(prevBookings =>
          prevBookings.map(b =>
            b._id === booking._id
              ? { ...b, status: "in review", paymentId: data.paymentId }
              : b
          )
        );
        
        setPaymentStatus("Payment successful!");
        
        // Check booking count after successful payment
        const bookingCount = await checkBookingCount(user.email);
        if (bookingCount === 3) {
          setShowCelebration(true);
        } else {
          // Close modal after a delay if no celebration
          setTimeout(() => {
            setIsModalOpen(false);
            setSelectedBooking(null);
            setTimeout(() => setPaymentStatus(""), 200);
          }, 200);
        }
  
        // Refresh bookings data
        const updatedBookings = await fetch(
          `http://localhost:5000/bookings?email=${user.email}&page=${currentPage}&limit=${limit}`
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

  // Handle cancellation with pagination refresh
  const handleCancel = (id) => {
    fetch(`http://localhost:5000/bookings/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        // Refresh the current page after cancellation
        fetch(`http://localhost:5000/bookings?email=${user.email}&page=${currentPage}&limit=${limit}`)
          .then((res) => res.json())
          .then((response) => {
            if (response.success) {
              setBookings(response.data.bookings);
              setTotalPages(response.data.totalPages);
              // If current page is empty and not the first page, go to previous page
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
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">Package Name</th>
            <th className="border border-gray-400 px-4 py-2">Tour Guide</th>
            <th className="border border-gray-400 px-4 py-2">Tour Date</th>
            <th className="border border-gray-400 px-4 py-2">Price</th>
            <th className="border border-gray-400 px-4 py-2">Status</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="border border-gray-400 px-4 py-2">{booking.packageName}</td>
              <td className="border border-gray-400 px-4 py-2">{booking.tourGuideName || "Not Assigned"}</td>
              <td className="border border-gray-400 px-4 py-2">{new Date(booking.tourDate).toLocaleDateString()}</td>
              <td className="border border-gray-400 px-4 py-2">{booking.price} BDT</td>
              <td className="border border-gray-400 px-4 py-2">{booking.status}</td>
              <td className="border border-gray-400 px-4 py-2">
                {booking.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        setSelectedBooking(booking);
                        setIsModalOpen(true);
                      }}
                      className="btn btn-primary mr-2"
                    >
                      Pay
                    </button>
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-secondary"
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

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-400 hover:bg-green-600 hover:text-white text-black rounded-l-lg"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${currentPage === index + 1 ? "text-black" : "bg-gray-300"} `}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-400 hover:bg-green-600 hover:text-white text-black rounded-r-lg"
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
    
    {/* Add this just before the final closing div */}
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