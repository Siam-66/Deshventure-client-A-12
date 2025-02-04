import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const AddPackage = () => {
  const [name, setName] = useState("");
  const [gallery, setGallery] = useState([]);
  const [aboutTour, setAboutTour] = useState("");
  const [tourPlan, setTourPlan] = useState([{ day: "", details: "" }]);
  const [price, setPrice] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    
    if (gallery.length + files.length > 5) {
      Swal.fire({
        icon: "error",
        title: "Too Many Images",
        text: "You can upload a maximum of 5 images."
      });
      return;
    }

    setIsUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(image_hosting_api, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Image upload failed');
        }

        const result = await response.json();
        return result.data.display_url;
      });

      const uploadedImageUrls = await Promise.all(uploadPromises);
      setGallery([...gallery, ...uploadedImageUrls]);
    } catch (error) {
      console.error("Image upload error:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Error",
        text: "Failed to upload images. Please try again."
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setGallery(gallery.filter((_, index) => index !== indexToRemove));
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
    setGallery([]);
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
        <title>Add Package / Deshventure</title>
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

      {/* Gallery Section with Image Upload */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Gallery Images (Max 5)</h3>
        
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleImageUpload}
          disabled={isUploading || gallery.length >= 5}
          className="mb-4 w-full"
        />

        {/* Uploaded Images Preview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((imageUrl, index) => (
            <div key={index} className="relative">
              <img 
                src={imageUrl} 
                alt={`Package image ${index + 1}`} 
                className="w-full h-40 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
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
        <label className="block text-gray-600 font-semibold text-lg mb-1">About The Tour</label>
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
          disabled={isUploading}
          className="bg-gradient-to-r from-green-600 via-lime-500 to-emerald-300 text-white w-full py-2 text-xl rounded-md shadow transition disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AddPackage;