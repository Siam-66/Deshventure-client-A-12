import React, { useState } from 'react';

const StoryModal = ({ story, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === story.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? story.images.length - 1 : prev - 1
    );
  };

  if (!isOpen) return null;

  return (
    <dialog id={`story_modal_${story._id}`} className="modal modal-bottom sm:modal-middle" open>
      <div className="modal-box max-w-4xl">

        <div className="relative w-full h-[400px] mb-6">
          <img
            src={story.images[currentImageIndex] || "https://placehold.co/600x400"}
            alt={`Story image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
          
          {story.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              >
                ❮
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              >
                ❯
              </button>
              
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {story.images.length}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <img
            src={story.photo}
            alt={story.name}
            className="w-12 h-12 rounded-full border-2 border-gray-200"
          />
          <div>
            <h4 className="font-semibold text-lg">{story.name}</h4>
            <span className="text-sm text-gray-500">
              {new Date(story.timestamp).toLocaleDateString()}
            </span>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">{story.title}</h3>
        <div className="prose max-w-none">
          <p className="text-gray-600 whitespace-pre-wrap">{story.storyText}</p>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button 
              className="btn bg-gradient-to-r from-red-700 to-red-400 text-white"
              onClick={onClose}
            >
              Close
            </button>
          </form>
        </div>
      </div>
      
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default StoryModal;