import React from "react";

const AboutUs = () => {
    return (
        <div className="bg-base-100 py-16 dark:bg-gray-950">
            <div className="container mx-auto px-6 lg:px-20">
                {/* Header */}
                <h2 className="text-center text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-200 mb-6">
                    About <span className="text-green-600">DeshAdventure</span>
                </h2>
                <p className="text-center text-lg text-gray-600 mb-12 lg:px-36 dark:text-gray-400">
                    Embark on unforgettable journeys with{" "}
                    <span className="font-bold text-green-600">DeshAdventure</span>. We are a passionate team dedicated to making your adventures thrilling, safe, and truly extraordinary.
                </p>

                {/* About Section */}
                <div className="grid gap-10 lg:grid-cols-2 items-center">
                    <div className="lg:order-1 order-2">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4 dark:text-gray-200">Our Mission</h3>
                        <p className="text-lg text-gray-600 leading-relaxed dark:text-gray-400">
                            At DeshAdventure, we believe that adventure is the ultimate way to explore the world. Our mission is to connect thrill-seekers with breathtaking destinations, immersive outdoor experiences, and expert guidance.
                        </p>
                    </div>
                    <div className="lg:order-2 order-1">
                        <img 
                            src="https://images.javatpoint.com/tourist-places/images/tourist-places-in-bangladesh20.jpg" 
                            alt="Adventure"
                            className="rounded-lg shadow-2xl w-full transform hover:scale-105 transition duration-500"
                        />
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="mt-20 text-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-8 dark:text-gray-200">Why Choose DeshAdventure?</h3>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
                            <div className="text-green-600 mb-4">
                                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-3 md:h-12">Expert Guides</h4>
                            <p className="text-gray-600 dark:text-gray-400">Our professional guides ensure a safe and exciting adventure every time.</p>
                        </div>
                        <div className="p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
                            <div className="text-blue-600 mb-4">
                                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-3 md:h-12">Unforgettable Experiences</h4>
                            <p className="text-gray-600 dark:text-gray-400">From trekking to kayaking, we bring you the most thrilling outdoor experiences.</p>
                        </div>
                        <div className="p-8 bg-white rounded-xl dark:bg-gray-900 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
                            <div className="text-red-600 mb-4">
                                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div> 
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-3 md:h-12">Eco-Friendly Travel</h4>
                            <p className="text-gray-600 dark:text-gray-400">We promote responsible tourism to preserve nature and its beauty.</p>
                        </div>
                    </div>
                </div>

                {/* Call-to-Action */}
                <div className="text-center mt-20">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 dark:text-gray-200">Start Your Adventure Today!</h3>
                    <p className="text-lg text-gray-600 mb-6 dark:text-gray-400">
                        Join thousands of adventurers exploring the wonders of the world with us.
                    </p>
                    <a 
                        href="/contactUs"
                        className="inline-block px-8 py-3 bg-gradient-to-r from-green-600 to-lime-500 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;