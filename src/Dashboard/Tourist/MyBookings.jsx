import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null); 
  const [paymentStatus, setPaymentStatus] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  // Fetch bookings from the database
  useEffect(() => {
    if (user?.email) {
      fetch("http://localhost:5000/bookings?email=" + user.email)
        .then((res) => res.json())
        .then((data) => setBookings(data))
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, [user]);

  // Handle payment submission
const handlePayment = async (booking) => {
  setPaymentStatus("Processing payment...");
  
  try {
    const response = await fetch("http://localhost:5000/payment", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
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
      
      // Refresh bookings data
      const updatedBookings = await fetch("http://localhost:5000/bookings?email=" + user.email)
        .then(res => res.json());
      setBookings(updatedBookings);
    } else {
      setPaymentStatus(data.error || "Payment failed. Please try again.");
    }
  } catch (error) {
    console.error("Payment Error:", error);
    setPaymentStatus("An error occurred while processing the payment. Please try again.");
  } finally {
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedBooking(null);
      setTimeout(() => setPaymentStatus(""), 500);
    }, 500);
  }
};


  // when cancellation
  const handleCancel = (id) => {
    fetch(`http://localhost:5000/bookings/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        setBookings((prevBookings) => prevBookings.filter((b) => b._id !== id));
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

      {/*for Payment Confirmation */}
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
    </div>
  );
};

export default MyBookings;
