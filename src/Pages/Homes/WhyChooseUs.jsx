import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-50 via-white to-green-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
          🌟 Why Choose Us? 🌟
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Discover why we're the best at crafting unforgettable travel experiences!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 shadow-lg rounded-xl transform hover:scale-105 transition duration-300">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Explore the World
            </h3>
            <p className="text-gray-600">
              From exotic beaches to bustling cities, we offer trips to the most exciting destinations worldwide.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white p-6 shadow-lg rounded-xl transform hover:scale-105 transition duration-300">
            <div className="text-6xl mb-4">👨‍✈️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Trusted Guides
            </h3>
            <p className="text-gray-600">
              Our experienced guides ensure you enjoy every step of your journey with expert knowledge and care.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white p-6 shadow-lg rounded-xl transform hover:scale-105 transition duration-300">
            <div className="text-6xl mb-4">💸</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Affordable Pricing
            </h3>
            <p className="text-gray-600">
              Travel without breaking the bank! We provide exceptional value for your money.
            </p>
          </div>
          {/* Feature 4 */}
          <div className="bg-white p-6 shadow-lg rounded-xl transform hover:scale-105 transition duration-300">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Tailored Packages
            </h3>
            <p className="text-gray-600">
              Customize your trips to match your dreams. We make travel personal, just for you.
            </p>
          </div>
          {/* Feature 5 */}
          <div className="bg-white p-6 shadow-lg rounded-xl transform hover:scale-105 transition duration-300">
            <div className="text-6xl mb-4">🛡️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Safety First
            </h3>
            <p className="text-gray-600">
              Your safety is our priority. Travel with peace of mind, knowing you're in good hands.
            </p>
          </div>
          {/* Feature 6 */}
          <div className="bg-white p-6 shadow-lg rounded-xl transform hover:scale-105 transition duration-300">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Award-Winning Service
            </h3>
            <p className="text-gray-600">
              Recognized globally for our exceptional service and unforgettable experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
