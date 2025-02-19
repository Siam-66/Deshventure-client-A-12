import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Testimonials = () => {
    const testimonials = [
        {
            name: "John Doe",
            feedback: "DeshVenture helped me discover hidden gems in Bangladesh! An amazing platform for travelers.",
            avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp",
            background: "https://i.ibb.co.com/rcv7nw9/Cox-s-Bazar1.jpg",
        },
        {
            name: "Robert Downey",
            feedback: "I found the best travel guides and tips for my trip to Cox’s Bazar. Highly recommended!",
            avatar: "https://i.pinimg.com/736x/95/80/f7/9580f730887e0c36c8bf208435d2c510.jpg",
            background: "https://i.ibb.co.com/F7GZpmf/Cox-s-Bazar3.jpg",
        },
        {
            name: "Jane Smith",
            feedback: "A must-have website for anyone planning to explore Bangladesh! Everything is well-organized and easy to find.",
            avatar: "https://www.famousbirthdays.com/headshots/maria-jane-smith-5.jpg",
            background: "https://i.ibb.co.com/R2KsG7x/Jaflong1.jpg",
        },
        {
            name: "Sam Wilson",
            feedback: "Thanks to DeshVenture, I discovered some breathtaking locations in Sylhet that I never knew existed!",
            avatar: "https://lesbruyeresauberchicourt.fr/wp-content/uploads/2020/09/testimonial-avatar-male-1-ux-builder.jpg",
            background: "https://i.ibb.co.com/WHZ6SwZ/Jaflong3.jpg",
        },
        {
            name: "Lisa Monroe",
            feedback: "The travel recommendations and cultural insights made my trip more enjoyable. Great job!",
            avatar: "https://litu.tu.ac.th/news/wp-content/uploads/2023/06/testimonial-avatar-female-2-ux-builder-element.jpg",
            background: "https://i.ibb.co.com/BNq1HyC/Ratargul-Swamp-Forest1.jpg",
        },
        {
            name: "Tom Hanks",
            feedback: "Planning a trip has never been this easy! DeshVenture is my go-to travel guide now.",
            avatar: "https://www.ethnicmusical.com/wp-content/uploads/2020/06/testimonial-avatar-male-2-ux-builder-element.jpg",
            background: "https://i.ibb.co.com/b1V61R2/Ratargul-Swamp-Forest3.jpg",
        },
        {
            name: "Emily Clarkn",
            feedback: "From Sundarbans to Sajek Valley, I found everything I needed to plan my journey. Fantastic site!",
            avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp",
            background: "https://i.ibb.co.com/s3bzG5R/Saint-Martin1.jpg",
        },
        {
            name: "Michael Scott",
            feedback: "Love how easy it is to find detailed travel guides on this website! Perfect for travelers.",
            avatar: "https://www.cloudways.com/wp-content/uploads/2020/01/testimonial-edward.png",
            background: "https://i.ibb.co.com/XsYPhzD/Sundarbans2.jpg",
        },
        {
            name: "Sophie Turner",
            feedback: "I never knew Bangladesh had so many beautiful places! This website made my travel experience much better.",
            avatar: "https://shop.kcomacademy.com/wp-content/uploads/2013/08/team3.png",
            background: "https://i.ibb.co.com/qdLzxJD/Sajek-Valley1.jpg",
        },
        {
            name: "Scarlett Johansson",
            feedback: "DeshVenture is the best travel resource for Bangladesh! Highly recommended for foreign tourists.",
            avatar: "https://propertylist.lk/sites/default/files/testimonial/avatar-3.jpg",
            background: "https://i.ibb.co.com/qnM640w/Kuakata3.jpg",
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
<div className="bg-gray-100 py-12 dark:bg-gray-950">
            <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
            <Slider {...settings} className="max-w-5xl mx-auto">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="relative text-center">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 w-full h-[300px]"
                            style={{
                                backgroundImage: `url(${testimonial.background})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                filter: "blur(8px)",
                            }}
                        ></div>
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50  w-full h-[300px]"></div>
                        {/* Content */}
                        <div className="relative z-10 p-6 text-white">
                            <img
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                className="mx-auto rounded-full w-20 h-20 mb-4 border-4 border-white"
                            />
                            <p className="text-lg italic mb-2 ">"{testimonial.feedback}"</p>
                            <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Testimonials;
