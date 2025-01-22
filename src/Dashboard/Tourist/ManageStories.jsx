import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import StoryModal from '../../Component/StoryModal';
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const ManageStories = () => {
  const { user } = useContext(AuthContext);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetchUserStories();
    }
  }, [user?.email]);

  const fetchUserStories = async () => {
    try {
      const response = await fetch(`https://assignment-12-deshventure-server.vercel.app/stories/${user.email}`);
      if (response.ok) {
        const data = await response.json();
        setStories(data);
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (storyId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`https://assignment-12-deshventure-server.vercel.app/stories/${storyId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"  
            },
            body: JSON.stringify({ email: user.email })  
          });
  
          if (response.ok) {
            setStories(stories.filter(story => story._id !== storyId));
            Swal.fire("Deleted!", "Your story has been deleted.", "success");
          } else {
            Swal.fire("Error!", "Failed to delete the story.", "error");
          }
        } catch (error) {
          console.error("Error deleting story:", error);
          Swal.fire("Error!", "An error occurred while deleting.", "error");
        }
      }
    });
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const handleCardClick = (story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setSelectedStory(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
            <Helmet>
                <title> Manage Stories / Deshventure
                </title>
            </Helmet>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">My Stories</h2>

      {stories.length === 0 ? (
        <p className="text-center text-gray-600">No stories found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <div key={story._id}  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105">

              {/* Story Image */}
              <div onClick={() => handleCardClick(story)} className="relative h-48 ">
                <img
                  src={story.images[0] || "https://placehold.co/600x400"}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                    {story.userRole}
                  </span>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                <p className="text-gray-600 mb-4">
                  {story.storyText.substring(0, 150)}...
                </p>
                
                {/* Image Count */}
                <div className="mb-4">
                  <span className="text-sm text-gray-500">
                    {story.images.length} {story.images.length === 1 ? 'image' : 'images'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between">
                  <Link
                    to={`/dashboards/editStory/${story._id}`}
                    className="btn rounded-md bg-gradient-to-r from-green-600 to-lime-500 text-white  "
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(story._id)}
                    className="btn rounded-md bg-gradient-to-r from-red-700 to-red-400 text-white  hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedStory && (
  <StoryModal
    story={selectedStory}
    isOpen={isModalOpen}
    onClose={handleCloseModal}
  />
)}
    </div>
  );
};

export default ManageStories;