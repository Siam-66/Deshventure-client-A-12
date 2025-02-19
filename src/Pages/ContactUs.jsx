import React from "react";

const ContactUs = () => {
    return (
        <div className="bg-gray-50 py-16 dark:bg-gray-950">
            <div className="container mx-auto px-6 lg:px-20">
                <h2 className="text-center text-4xl sm:text-5xl font-bold text-black mb-6 dark:text-gray-200">
                    Contact Us
                </h2>
                <p className="text-center text-lg text-gray-600 mb-12 lg:px-36 dark:text-gray-400">
                    Have questions or need assistance? Feel free to reach out to us. 
                    We're here to help you plan your next great adventure!
                </p>

                <div className="grid gap-10 lg:grid-cols-2 items-center">
                    {/* Contact Information */}
                    <div className="bg-white shadow-lg rounded-lg p-8 dark:bg-gray-900">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 dark:text-gray-200">Get in Touch</h3>
                        <p className="text-lg text-gray-600 mb-6 dark:text-gray-400">
                            Our team is always ready to assist you with travel inquiries, bookings, and support.
                        </p>
                        <div className="space-y-4">
                            <p className="flex items-center text-gray-600 dark:text-gray-400">
                                📍 <span className="ml-2">123 Adventure Street, Dhaka, Bangladesh</span>
                            </p>
                            <p className="flex items-center text-gray-600 dark:text-gray-400">
                                📞 <span className="ml-2">+880 1234 567 890</span>
                            </p>
                            <p className="flex items-center text-gray-600 dark:text-gray-400">
                                📧 <span className="ml-2">support@deshadventure.com</span>
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white shadow-lg rounded-lg p-8 dark:bg-gray-900">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 dark:text-gray-200">Send Us a Message</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium dark:text-gray-200">Your Name</label>
                                <input type="text" className="w-full p-3 border  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter your name" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium dark:text-gray-200">Your Email</label>
                                <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter your email" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium dark:text-gray-200">Your Message</label>
                                <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" rows="4" placeholder="Type your message..." required></textarea>
                            </div>
                            <button type="submit" className="w-full py-3 bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-16">
                    <h3 className="text-3xl font-bold text-gray-800 text-center mb-6 dark:text-gray-200">Find Us Here</h3>
                    <div className="w-full h-80 rounded-lg overflow-hidden">
                        <iframe 
                            title="Google Map"
                            className="w-full h-full"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902041973062!2d90.39146331550657!3d23.75087239463807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c77a4d8916a5%3A0x1f4e2b3992e7a82f!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1616856181731!5m2!1sen!2sbd"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
