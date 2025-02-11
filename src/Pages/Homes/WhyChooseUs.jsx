import React from "react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const features = [
    {
      icon: "🌍",
      title: "Explore the World",
      description: "From exotic beaches to bustling cities, we offer trips to the most exciting destinations worldwide."
    },
    {
      icon: "👨‍✈️",
      title: "Trusted Guides",
      description: "Our experienced guides ensure you enjoy every step of your journey with expert knowledge and care."
    },
    {
      icon: "💸",
      title: "Affordable Pricing",
      description: "Travel without breaking the bank! We provide exceptional value for your money."
    },
    {
      icon: "✨",
      title: "Tailored Packages",
      description: "Customize your trips to match your dreams. We make travel personal, just for you."
    },
    {
      icon: "🛡️",
      title: "Safety First",
      description: "Your safety is our priority. Travel with peace of mind, knowing you're in good hands."
    },
    {
      icon: "🏆",
      title: "Award-Winning Service",
      description: "Recognized globally for our exceptional service and unforgettable experiences."
    }
  ];

  return (
    <div className="w-full overflow-hidden container mx-auto">
      <section className="bg-gradient-to-r from-green-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 sm:mb-6 text-center px-2"
          >
            🌟 Why Choose Us? 🌟
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 text-center px-2"
          >
            Discover why we're the best at crafting unforgettable travel experiences!
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mx-auto w-full"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-4xl sm:text-6xl mb-3 sm:mb-4 text-center"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;