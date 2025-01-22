import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const AddStoryGuide = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [storyText, setStoryText] = useState("");
  const [images, setImages] = useState([""]);

  const handleImageChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index] = value;
    setImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storyData = {
      title,
      storyText,
      images,
      email: user?.email,
      timestamp: new Date(),
    };

    try {
      const response = await fetch("http://localhost:5000/stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(storyData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your story has been published successfully.",
        });
        navigate("/dashboards/manageStoriesGuide"); 

      }
    } catch (error) {
      console.error("Error submitting story:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while publishing the story.",
      });
    }
  };

  return (
    <form className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-md" onSubmit={handleSubmit}>

      <h2 className="text-3xl text-center font-bold text-gray-800 mb-10">Share Your Story</h2>

      {/* Title Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-semibold text-lg mb-1">Story Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your story title"
          className="w-full px-3 py-2 border rounded-md text-gray-800"
          required
        />
      </div>

      {/* Story Text Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-semibold text-lg mb-1">Your Story</label>
        <textarea
          value={storyText}
          onChange={(e) => setStoryText(e.target.value)}
          placeholder="Share your travel experience..."
          className="w-full px-3 py-2 border rounded-md text-gray-800 h-40"
          required
        />
      </div>

      {/* Images Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Story Images</h3>
        {images.map((url, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Image URL {index + 1}</label>
            <input
              type="url"
              value={url}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder={`Enter image URL ${index + 1}`}
              className="w-full px-3 py-2 border rounded-md text-gray-800"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setImages([...images, ""])}
          className="text-blue-600 text-sm hover:underline"
        >
          + Add another image
        </button>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-gradient-to-r from-green-600 via-lime-500 to-emerald-300 text-white w-full py-2 text-xl rounded-md shadow transition"
        >
          Publish Story
        </button>
      </div>
    </form>
  );
};

export default AddStoryGuide;