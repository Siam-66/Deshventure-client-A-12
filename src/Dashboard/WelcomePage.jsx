import React from "react";
import { motion } from "framer-motion";

const WelcomePage = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 dark:bg-gray-950 p-2">
            <motion.div
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-4xl w-full text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Welcome Title */}
                <motion.h1
                    className="md:text-5xl text-3xl font-bold text-gray-900 dark:text-gray-200 mb-4"
                    variants={itemVariants}
                >
                    Welcome to Your <br className="md:hidden" /> Dashboard! 🎉
                </motion.h1>

                {/* Welcome Message */}
                <motion.p
                    className="text-xl text-gray-600 mb-8 dark:text-gray-400"
                    variants={itemVariants}
                >
                    We're thrilled to have you here. Explore your data, manage your tasks, and make the most of your experience with us.
                </motion.p>


                {/* Decorative Animation */}
                <motion.div
                    className="mt-12 flex justify-center space-x-4"
                    variants={itemVariants}
                >
                    {[1, 2, 3].map((item) => (
                        <motion.div
                            key={item}
                            className="w-4 h-4 bg-green-500 rounded-full"
                            animate={{
                                y: [0, -10, 0],
                                scale: [1, 1.3, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: item * 0.5,
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default WelcomePage;