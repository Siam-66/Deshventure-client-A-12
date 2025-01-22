import React, { useState, useContext, useEffect } from "react";
import { Link, useLoaderData, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Maximize2, ChevronLeft, ChevronRight, X, ChevronDown } from "lucide-react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { Helmet } from "react-helmet";


const PackageDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const packageData = useLoaderData();
  const [tourDate, setTourDate] = useState(new Date());
  const [tourGuide, setTourGuide] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tourGuides, setTourGuides] = useState([]);

  useEffect(() => {
    fetch("https://assignment-12-deshventure-server.vercel.app/tour-guides")
      .then((res) => res.json())
      .then((data) => {
        setTourGuides(data);
      })
      .catch((error) => console.error("Error fetching tour guides:", error));
  }, []);

  if (!packageData) {
    return <div>Loading package details...</div>;
  }



  const handleBookNow = async () => {
    if (!user) {
      alert("You need to log in to book this package.");
      return;
    }
  
    if (!tourGuide) {
      alert("Please select a tour guide before booking.");
      return;
    }
  
   
    const selectedGuide = tourGuides.find((guide) => guide._id === tourGuide);
  
    if (!selectedGuide) {
      alert("Selected tour guide not found. Please try again.");
      return;
    }
  
    const bookingData = {
      packageName: packageData.name,
      touristName: user.displayName,
      touristEmail: user.email,
      touristImage: user.photoURL,
      price: packageData.price,
      tourDate,
      tourGuide: {
        id: selectedGuide._id,  
        name: selectedGuide.name,
        email: selectedGuide.email,
      },
      status: "pending",
    };
  
    try {
      const response = await fetch("https://assignment-12-deshventure-server.vercel.app/bookings", {
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

  
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const navigateImage = (direction) => {
    const newIndex = selectedImageIndex + direction;
    if (newIndex >= 0 && newIndex < packageData.gallery.length) {
      setSelectedImageIndex(newIndex);
    }
  };

  const handleKeyPress = (e) => {
    if (selectedImageIndex === null) return;
    if (e.key === 'ArrowLeft') navigateImage(-1);
    if (e.key === 'ArrowRight') navigateImage(1);
    if (e.key === 'Escape') handleCloseModal();
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedImageIndex]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
        <Helmet>
            <title>Package Details Page / Deshventure
            </title>
        </Helmet>
      <h1 className="bg-gradient-to-r from-green-700 via-lime-500 to-emerald-700 bg-clip-text text-transparent text-center text-4xl font-bold mb-10">
        Package Details
      </h1>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {packageData.gallery?.map((image, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-xl cursor-pointer
              ${index % 3 === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
              ${index % 5 === 0 ? 'row-span-2' : ''}`}
            onClick={() => handleImageClick(index)}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                onLoad={() => setIsLoading(false)}
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
              <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
            </div>
          </div>
        ))}
      </div>

      {/* Tour Guides Section */}
      <div className="my-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Our Tour Guides</h2>
        <div className="relative">
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6 px-4">
              {tourGuides.map((guide) => (

              

                <div
                  key={guide._id}
                  className="flex flex-col items-center space-y-2 cursor-pointer min-w-[150px]"
                  
                >
                <Link to={`/tourGuideProfile/${guide._id}`}>
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-green-500 ring-offset-2">
                    <img
                      src={guide.photo}
                      alt={guide.name}
                      className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <span className="font-medium text-center">{guide.name}</span>
                  <hr />
                  <span className="text-sm text-gray-600">Tour Guide</span>
                  </Link>
                </div>
                
              ))}
            </div>
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>

      <div className="about mt-6">
        <h2 className="text-xl font-semibold">About the Tour</h2>
        <p>{packageData.aboutTour}</p>
      </div>

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
        <form className="flex flex-col card-body gap-4">
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

<div className="relative">
    <label className="font-semibold">Tour Guide:</label>
    <div className="border rounded-md">
      <select
        value={tourGuide}
        onChange={(e) => setTourGuide(e.target.value)}
        className="w-full p-2 appearance-none bg-transparent"
      >
        <option value="" disabled>
          Select a guide
        </option>
        {tourGuides.map((guide) => (
          <option key={guide._id} value={guide._id}>  
            {guide.name}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-[38px] pointer-events-none">
        <ChevronDown className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleBookNow}
              className="bg-gradient-to-r from-green-600 to-lime-500 text-white text-xl py-3 w-1/3 rounded-md mt-5"
            >
              Book Now
            </button>
          </div>
        </form>
        <div className="flex justify-center">
        <Link to="/allTripsPage" className="btn  bg-gradient-to-r text-center from-green-600 to-lime-500 text-white text-xl py-3  rounded-md mt-5">
        <RiArrowGoBackLine />Go Back
        </Link>
        </div>

      </div>

      {/* Booking Success Modal */}
      {bookingSuccess && (
        <div className="modal modal-open">
          <div className="modal-box w-[27rem]">
            <h2 className="text-xl font-semibold">Booking Confirmed!</h2>
            <p>Your booking has been successfully confirmed.</p>
            <div className="modal-action flex justify-between">
              <Link
                to="/dashboards/myBookings"
                className="btn px-5 bg-gradient-to-r from-green-600 to-lime-500 text-white"
              >
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

      {/* Full Image Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={handleCloseModal}
            >
              <X size={32} />
            </button>

            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              onClick={() => navigateImage(-1)}
              disabled={selectedImageIndex === 0}
            >
              <ChevronLeft
                size={48}
                className={selectedImageIndex === 0 ? 'opacity-50' : 'opacity-100'}
              />
            </button>

            <div className="relative max-w-5xl max-h-[80vh]">
              <img
                src={packageData.gallery[selectedImageIndex]}
                alt={`Gallery Image ${selectedImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 text-center text-white bg-black bg-opacity-50 py-2">
                Image {selectedImageIndex + 1} of {packageData.gallery.length}
              </div>
            </div>

            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              onClick={() => navigateImage(1)}
              disabled={selectedImageIndex === packageData.gallery.length - 1}
            >
              <ChevronRight
                size={48}
                className={
                  selectedImageIndex === packageData.gallery.length - 1
                    ? 'opacity-50'
                    : 'opacity-100'
                }
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetailsPage;