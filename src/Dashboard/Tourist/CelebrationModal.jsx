import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Gift, PartyPopper, Sparkles } from 'lucide-react';

const CelebrationModal = ({ isOpen, onClose }) => {
  const { width, height } = useWindowSize();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 500);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Confetti
        width={width}
        height={height}
        recycle={isAnimating}
        numberOfPieces={200}
        gravity={0.3}
      />
      <div 
        className={`bg-white rounded-lg p-8 shadow-2xl transform transition-all duration-500
          ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
          max-w-md w-full mx-4`}
      >
        <div className="text-center">
          <div className="flex justify-center space-x-2 mb-4">
            <PartyPopper className="h-12 w-12 text-yellow-500 animate-bounce" />
            <Sparkles className="h-12 w-12 text-purple-500 animate-bounce delay-75" />
            <Gift className="h-12 w-12 text-green-500 animate-bounce delay-100" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Congratulations! 🎉
          </h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-600">
              You've completed your 3rd booking with us!
            </p>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-green-800 font-semibold">
                You're now eligible for a special discount on your next adventure!
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-6 bg-gradient-to-r from-green-600 to-lime-500 text-white px-6 py-3 rounded-full
                transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Continue Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebrationModal;