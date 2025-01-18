import React, { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { AuthContext } from "../../Provider/AuthProvider";
import Modal from "react-modal"; // Install Modal with `npm install react-modal`

const stripePromise = loadStripe("your_stripe_publishable_key");

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null); // Booking selected for payment
  const [paymentStatus, setPaymentStatus] = useState(""); // Status message
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

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
    try {
      const response = await fetch("http://localhost:5000/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: booking._id, amount: booking.price }),
      });
      const data = await response.json();
      if (data.success) {
        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b._id === booking._id ? { ...b, status: "in review" } : b
          )
        );
        setPaymentStatus("Payment successful!");
      } else {
        setPaymentStatus("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      setPaymentStatus("An error occurred while processing the payment.");
    } finally {
      setIsModalOpen(false);
      setSelectedBooking(null);
    }
  };

  // Handle cancellation
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

      {/* Payment Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Payment Confirmation"
        className="modal bg-white p-4 rounded shadow-md"
        overlayClassName="modal-overlay"
      >
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
      </Modal>

      {paymentStatus && <p className="mt-4 text-green-600">{paymentStatus}</p>}
    </div>
  );
};

export default MyBookings;
