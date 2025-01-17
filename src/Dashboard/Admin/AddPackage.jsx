import React, { useState } from "react";

const AddPackage = () => {
  const [gallery, setGallery] = useState(["", "", ""]);
  const [aboutTour, setAboutTour] = useState("");
  const [tourPlan, setTourPlan] = useState([{ day: "", details: "" }]);
  const [price, setPrice] = useState("");

  // Handle gallery image URL changes
  const handleGalleryChange = (index, value) => {
    const updatedGallery = [...gallery];
    updatedGallery[index] = value;
    setGallery(updatedGallery);
  };

  // Add a new day to the tour plan
  const addTourDay = () => {
    setTourPlan([...tourPlan, { day: "", details: "" }]);
  };

  // Handle changes in the tour plan
  const handleTourPlanChange = (index, field, value) => {
    const updatedTourPlan = [...tourPlan];
    updatedTourPlan[index][field] = value;
    setTourPlan(updatedTourPlan);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      gallery,
      aboutTour,
      tourPlan,
      price,
    };
    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <form className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Package Details Form</h2>

      {/* Gallery Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Gallery</h3>
        {gallery.map((url, index) => (
          <div key={index} className="mb-3">
            <label className="block text-gray-600 text-sm mb-1">
              Image URL {index + 1}
            </label>
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
      </div>



      {/* Tour Plan Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Tour Plan</h3>
        {tourPlan.map((plan, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">
              Day {index + 1}
            </label>
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
              onChange={(e) =>
                handleTourPlanChange(index, "details", e.target.value)
              }
              placeholder={`Enter details for day ${index + 1}`}
              className="w-full px-3 py-2 border rounded-md text-gray-800 h-20"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addTourDay}
          className="text-blue-600 text-sm hover:underline"
        >
          + Add another day
        </button>
      </div>

      {/* Price Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Price</h3>
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
        <h3 className="text-lg font-semibold text-gray-700 mb-2">About The Tour</h3>
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
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddPackage;
