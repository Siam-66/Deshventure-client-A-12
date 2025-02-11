import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { AuthContext } from '../Provider/AuthProvider';
import StoryModal from '../Component/StoryModal';
import { Helmet } from 'react-helmet';

const CommunityPage = () => {
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
        setStories(data);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation(); 
    if (!user) {
      navigate('/login');
      return;
    }
  };

  const handleCardClick = (story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedStory(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center container mx-auto">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading stories...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <Helmet>
          <title>Community Page / Deshventure
          </title>
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Tourist Community Stories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing travel experiences shared by tourists from around the world. Each story is a unique adventure waiting to inspire your next journey.
          </p>
        </div>

        {stories.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>No stories have been shared yet. Be the first to share your adventure!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div 
                key={story._id} 
                onClick={() => handleCardClick(story)}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
              >
                <div className="relative h-64">
                  <img
                    src={story.images[0] || "https://placehold.co/600x400"}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-green-600 to-lime-500 text-white px-3 py-1 rounded-full text-sm">
                      {story.userRole}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 h-14 text-gray-800">{story.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {story.storyText}
                  </p>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <img
                        src={story.photo}
                        alt={story.name}
                        className="w-10 h-10 rounded-full border-2 border-gray-200"
                      />
                      <div>
                        <span className="block text-sm font-medium text-gray-800">{story.name}</span>
                        <span className="block text-xs text-gray-500">
                          {new Date(story.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <FacebookShareButton
                      url={`${window.location.origin}/story/${story._id}`}
                      quote={`Check out ${story.name}'s travel story: ${story.title}`}
                      onClick={handleShare}
                      className="text-blue-600 hover:text-blue-700 transition duration-300"
                    >
                      <FacebookIcon size={36} round />
                    </FacebookShareButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {selectedStory && (
        <StoryModal
          story={selectedStory}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default CommunityPage;