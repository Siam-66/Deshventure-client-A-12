import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const EditStoryGuide = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [story, setStory] = useState({
    title: "",
    storyText: "",
    images: [],
  });
  const [isUploading, setIsUploading] = useState(false);

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  useEffect(() => {
    fetchStoryDetails();
  }, [id]);

  const fetchStoryDetails = async () => {
    try {
      const response = await fetch(`https://assignment-12-deshventure-server.vercel.app/stories/detail/${id}`);
      if (response.ok) {
        const data = await response.json();
        setStory(data);
      }
    } catch (error) {
      console.error("Error fetching story details:", error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    
    if (!file) return;
  
    if (story.images.length >= 5) {
      Swal.fire({
        icon: "error",
        title: "Too Many Images",
        text: "You can upload a maximum of 5 images."
      });
      return;
    }
  
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
  
      const uploadResponse = await fetch(`https://assignment-12-deshventure-server.vercel.app/stories/${id}/upload-image`, {
        method: "POST",
        body: formData
      });
  
      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }
  
      const result = await uploadResponse.json();
      const newImageUrl = result.imageUrl;
  
      setStory({
        ...story,
        images: [...story.images, newImageUrl]
      });
  
      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Image added successfully.",
      });
  
    } catch (error) {
      console.error("Image upload error:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Error",
        text: error.message || "Failed to upload image. Please try again."
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://assignment-12-deshventure-server.vercel.app/stories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: story.title,
          storyText: story.storyText,
          images: story.images, 
          email: user?.email,
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Your story has been updated successfully.",
        });
        navigate("/dashboards/manageStoriesGuide");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update story');
      }
    } catch (error) {
      console.error("Error updating story:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Failed to update the story.",
      });
    }
  };

  const handleRemoveImage = async (imageUrl) => {
    try {
      const response = await fetch(`https://assignment-12-deshventure-server.vercel.app/stories/${id}/remove-image`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          imageUrl,
          email: user?.email 
        }),
      });

      if (response.ok) {
        setStory({
          ...story,
          images: story.images.filter(img => img !== imageUrl)
        });
        Swal.fire({
          icon: "success",
          title: "Removed!",
          text: "Image removed successfully.",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove image');
      }
    } catch (error) {
      console.error("Error removing image:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Failed to remove the image.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-md my-8">
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-10">Edit Story</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-6">
          <label className="block text-gray-600 font-semibold text-lg mb-1">Story Title</label>
          <input
            type="text"
            value={story.title}
            onChange={(e) => setStory({ ...story, title: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-gray-800"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 font-semibold text-lg mb-1">Story Content</label>
          <textarea
            value={story.storyText}
            onChange={(e) => setStory({ ...story, storyText: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-gray-800 h-40"
            required
          />
        </div>

        {/* Current Images Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Current Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {story.images.map((imageUrl, index) => (
              <div key={index} className="relative">
                <img
                  src={imageUrl} 
                  alt={`Story image ${index + 1}`}
                  className="w-full h-40 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(imageUrl)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Image Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Add New Image (Max 5)</h3>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
            disabled={isUploading || story.images.length >= 5}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isUploading}
            className="bg-gradient-to-r from-green-600 via-lime-500 to-emerald-300 text-white w-full py-2 text-xl rounded-md shadow transition disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Update Story"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStoryGuide;