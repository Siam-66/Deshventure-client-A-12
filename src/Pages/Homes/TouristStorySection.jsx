import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { AuthContext } from '../../Provider/AuthProvider';
import StoryModal from '../../Component/StoryModal';

const TouristStorySection = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTouristStories();
  }, []);

  const fetchTouristStories = async () => {
    try {
      const response = await fetch('https://assignment-12-deshventure-server.vercel.app/touristStories');
      if (response.ok) {
        const data = await response.json();
        const shuffled = data.sort(() => 0.5 - Math.random());
        setStories(shuffled.slice(0, 4));
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (!user) {
      navigate('/login');
      return;
    }
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
    <div className="w-full overflow-hidden bg-gray-50 container mx-auto mt-10">
      <div className=" mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Tourist Stories</h2>

        <div className="card  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6  ">
          {stories.map((story) => (
            <div 
              key={story._id} 
              onClick={() => handleCardClick(story)}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
            >
              <div className="relative h-48">
                <img
                  src={story.images[0] || "https://placehold.co/600x400"}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="card-body">
                <h3 className="text-xl font-semibold h-20 overflow-hidden">{story.title}</h3>
                <p className="text-gray-600 h-36 overflow-hidden">
                  {story.storyText.substring(0, 100)}...
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={story.photo}
                      alt={story.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium truncate max-w-[100px]">{story.name}</span>
                  </div>
                  
                  <FacebookShareButton
                    url={`${window.location.origin}/story/${story._id}`}
                    quote={story.title}
                    onClick={handleShare}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <Link 
            to="/CommunityPage" 
            className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-sky-500 text-white px-4 py-2 rounded text-center"
          >
            View All Stories
          </Link>
          <Link 
            to="/dashboards/addStory" 
            className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-lime-500 text-white px-4 py-2 rounded text-center"
          >
            Share Your Story
          </Link>
        </div>
      </div>

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

export default TouristStorySection;