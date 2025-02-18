import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AddStory = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [storyText, setStoryText] = useState("");
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    
    if (images.length + files.length > 5) {
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
      setImages([...images, ...uploadedImageUrls]);
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
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storyData = {
      title,
      storyText,
      images,
      name: user?.displayName,
      photo: user?.photoURL,
      email: user?.email,
      timestamp: new Date(),
    };

    try {
      const response = await fetch("https://assignment-12-deshventure-server.vercel.app/stories", {
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
        navigate("/dashboards/manageStories"); 
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
    <form className="max-w-3xl mx-auto bg-gray-200 dark:bg-gray-900 shadow-lg p-6 rounded-md" onSubmit={handleSubmit}>
      <Helmet>
        <title>Add Story / Deshventure</title>
      </Helmet>
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-10 dark:text-gray-200">Share Your Story</h2>

      {/* Title Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-semibold text-lg mb-1 dark:text-gray-200">Story Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your story title"
          className="w-full px-3 py-2 border rounded-md text-gray-800 "
          required
        />
      </div>

      {/* Story Text Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-semibold text-lg mb-1 dark:text-gray-200">Your Story</label>
        <textarea
          value={storyText}
          onChange={(e) => setStoryText(e.target.value)}
          placeholder="Share your travel experience..."
          className="w-full px-3 py-2 border rounded-md text-gray-800 h-40 "
          required
        />
      </div>

      {/* Images Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2 dark:text-gray-200">Story Images (Max 5)</h3>
        
        {/* Image Upload Input */}
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleImageUpload}
          disabled={isUploading || images.length >= 5}
          className="mb-4 w-full border rounded-md px-3 py-2 dark:bg-gray-950"
        />

        {/* Uploaded Images Preview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative">
              <img 
                src={imageUrl} 
                alt={`Story image ${index + 1}`} 
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

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={isUploading}
          className="bg-gradient-to-r from-green-600 via-lime-500 to-emerald-300 text-white w-full py-2 text-xl rounded-md shadow transition disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Publish Story"}
        </button>
      </div>
    </form>
  );
};

export default AddStory;