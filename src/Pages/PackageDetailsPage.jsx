import React, { useState, useContext } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PackageDetailsPage = () => {
  const { id } = useParams(); 
  const { user } = useContext(AuthContext);
  const packageData = useLoaderData(); 
  const [tourDate, setTourDate] = useState(new Date());
  const [tourGuide, setTourGuide] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); 

  if (!packageData) {
    return <div>Loading package details...</div>;
  }

  const tourGuides = ["Guide 1", "Guide 2", "Guide 3"]; 

  const handleBookNow = async () => {
    if (!user) {
      alert("You need to log in to book this package.");
      return;
    }

    const bookingData = {
      packageName: packageData.name,
      touristName: user.displayName,
      touristEmail: user.email,
      touristImage: user.photoURL,
      price: packageData.price,
      tourDate,
      tourGuideName: tourGuide,
      status: "pending",
    };

    try {
      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      if (response.ok) {
        setBookingSuccess(true);
      } else {
        alert("Failed to book. Please try again.");
      }
    } catch (error) {
      console.error("Error booking package:", error);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image); 
  };

  const handleCloseModal = () => {
    setSelectedImage(null); 
  };

  return (
    <div className="p-4">
      <h1 className="bg-gradient-to-r from-green-600 via-lime-500 to-emerald-600 bg-clip-text text-transparent text-center text-3xl font-bold mb-10">Package Details</h1>
      {/* Gallery */}
      <div className="gallery grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {packageData.gallery?.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => handleImageClick(image)} 
          >
            <img
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>

      {/* About Tour */}
      <div className="about mt-6">
        <h2 className="text-xl font-semibold">About the Tour</h2>
        <p>{packageData.aboutTour}</p>
      </div>

      {/* Tour Plan */}
      <div className="tour-plan mt-6">
        <h2 className="text-xl font-semibold">Tour Plan</h2>
        <ul>
          {packageData.tourPlan?.map((dayPlan, index) => (
            <li key={index} className="mt-2">
              <strong>{dayPlan.day}: </strong>
              {dayPlan.details}
            </li>
          ))}
        </ul>
      </div>

      {/* Booking Form */}
      <div className="booking-form mt-10">
        <h2 className="text-2xl font-semibold text-center my-6">Book This Tour</h2>
        <form className="flex flex-col gap-4">
          <div>
            <label className="font-semibold">Package Name:</label>
            <input
              type="text"
              value={packageData.name}
              readOnly
              className="border p-2 w-full rounded-md"
            />
          </div>
          <div>
            <label className="font-semibold">Tourist Name:</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="border p-2 w-full rounded-md"
            />
          </div>
          <div>
            <label className="font-semibold">Tourist Email:</label>
            <input
              type="text"
              value={user?.email || ""}
              readOnly
              className="border p-2 w-full rounded-md"
            />
          </div>
          <div>
            <label className="font-semibold">Price:</label>
            <input
              type="text"
              value={packageData.price}
              readOnly
              className="border p-2 w-full rounded-md"
            />
          </div>
          <div>
            <label className="font-semibold pr-2">Tour Date:</label>
            <DatePicker
              selected={tourDate}
              onChange={(date) => setTourDate(date)}
              className="border p-2 w-full rounded-md"
            />
          </div>
          <div>
            <label className="font-semibold">Tour Guide:</label>
            <select
              value={tourGuide}
              onChange={(e) => setTourGuide(e.target.value)}
              className="border p-2 w-full rounded-md"
            >
              <option value="" disabled>
                Select a guide
              </option>
              {tourGuides.map((guide, index) => (
                <option key={index} value={guide}>
                  {guide}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleBookNow}
            className="bg-gradient-to-r from-green-600 via-lime-500 to-emerald-300 text-white px-4 py-2 rounded-md mt-5"
          >
            Book Now
          </button>
        </form>
      </div>

      {/* Booking Success Modal */}
      {bookingSuccess && (
        <div className="modal modal-open">
          <div className="modal-box w-[27rem]">
            <h2 className="text-xl font-semibold">Booking Confirmed!</h2>
            <p>Your booking has been successfully confirmed.</p>
            <div className="modal-action flex justify-between">
                <Link className="btn px-5 bg-gradient-to-r from-green-600 via-lime-500 to-emerald-300 text-white">
                My Bookings
                </Link>
              <button
                onClick={() => setBookingSuccess(false)}
                className="btn px-5 bg-gradient-to-r from-red-700 to-rose-400 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Full Image */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
          onClick={handleCloseModal} // Close the modal when clicking outside
        >
          <div
            className="bg-white p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
          >
            <img
              src={selectedImage}
              alt="Selected Gallery"
              className="max-w-full max-h-full"
            />
            <button
              className="absolute top-4 right-4 text-white text-xl"
              onClick={handleCloseModal}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetailsPage;
