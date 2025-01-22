import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const AddPackage = () => {
  const [name, setName] = useState("");
  const [gallery, setGallery] = useState([""]);
  const [aboutTour, setAboutTour] = useState("");
  const [tourPlan, setTourPlan] = useState([{ day: "", details: "" }]);
  const [price, setPrice] = useState("");

  const handleGalleryChange = (index, value) => {
    const updatedGallery = [...gallery];
    updatedGallery[index] = value;
    setGallery(updatedGallery);
  };

  const addTourDay = () => {
    setTourPlan([...tourPlan, { day: "", details: "" }]);
  };

  const handleTourPlanChange = (index, field, value) => {
    const updatedTourPlan = [...tourPlan];
    updatedTourPlan[index][field] = value;
    setTourPlan(updatedTourPlan);
  };

  const resetForm = () => {
    setName("");
    setGallery([""]);
    setAboutTour("");
    setTourPlan([{ day: "", details: "" }]);
    setPrice("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      gallery,
      aboutTour,
      tourPlan,
      price,
    };

    try {
      const response = await fetch("https://assignment-12-deshventure-server.vercel.app/addtour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Submitted!",
          text: "Your package has been submitted successfully.",
        });
        resetForm(); 
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Failed to submit your package. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while submitting the form.",
      });
    }
  };

  return (
    <form className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-md" onSubmit={handleSubmit}>
      <Helmet>
          <title> Add Package / Deshventure
          </title>
      </Helmet>
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-10">Add Packages</h2>

      {/* Name Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-semibold text-lg mb-1">Package Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter package name"
          className="w-full px-3 py-2 border rounded-md text-gray-800"
          required
        />
      </div>

      {/* Updated Gallery Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Gallery</h3>
        {gallery.map((url, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Image URL {index + 1}</label>
            <input
              type="url"
              value={url}
              onChange={(e) => handleGalleryChange(index, e.target.value)}
              placeholder={`Enter image URL ${index + 1}`}
              className="w-full px-3 py-2 border rounded-md text-gray-800"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setGallery([...gallery, ""])}
          className="text-blue-600 text-sm hover:underline"
        >
          + Add another image
        </button>
      </div>

      {/* Tour Plan Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Tour Plan</h3>
        {tourPlan.map((plan, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Day {index + 1}</label>
            <input
              type="text"
              value={plan.day}
              onChange={(e) => handleTourPlanChange(index, "day", e.target.value)}
              placeholder={`Enter day ${index + 1}`}
              className="w-full px-3 py-2 border rounded-md text-gray-800 mb-2"
              required
            />
            <textarea
              value={plan.details}
              onChange={(e) => handleTourPlanChange(index, "details", e.target.value)}
              placeholder={`Enter details for day ${index + 1}`}
              className="w-full px-3 py-2 border rounded-md text-gray-800 h-20"
              required
            />
          </div>
        ))}
        <button type="button" onClick={addTourDay} className="text-blue-600 text-sm hover:underline">
          + Add another day
        </button>
      </div>

      {/* Price Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-semibold text-lg mb-1">Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          className="w-full px-3 py-2 border rounded-md text-gray-800"
          required
        />
      </div>

      {/* About The Tour Section */}
      <div className="mb-6">
        <label className="block text-gray-600  font-semibold text-lg mb-1">About The Tour</label>
        <textarea
          value={aboutTour}
          onChange={(e) => setAboutTour(e.target.value)}
          placeholder="Provide relevant information about the tour"
          className="w-full px-3 py-2 border rounded-md text-gray-800 h-28"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-gradient-to-r from-green-600 via-lime-500 to-emerald-300 text-white w-full py-2 text-xl rounded-md shadow transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddPackage;
