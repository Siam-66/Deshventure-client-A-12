import React from "react";
import Image1 from "../../assets/FQA.gif";

const FAQSection = () => {
  return (
    <section className="container mx-auto mt-20 mb-20 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <img
            className="w-full md:max-w-[30rem] lg:max-w-[50rem] mx-auto rounded-md max-sm:hidden"
            src={Image1}
            alt="FAQ Illustration"
          />
        </div>

        {/* FAQ Content */}
        <div className="w-full ">
          <div className="mb-8">
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold dark:text-gray-200 text-[#050233]">
              Frequently Asked Questions
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title text-lg sm:text-xl md:text-2xl font-medium">
                What is DeshAdvancher?
              </div>
              <div className="collapse-content">
                <div className="divider"></div>
                <p className="text-base sm:text-lg md:text-xl text-justify">
                  DeshAdvancher is a travel and adventure platform that helps 
                  you discover the best destinations, plan exciting trips, and 
                  connect with travel experts. Whether you're looking for hidden 
                  gems or popular attractions, we've got you covered!
                </p>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-lg sm:text-xl md:text-2xl font-medium">
                How can I book a trip with DeshAdvancher?
              </div>
              <div className="collapse-content">
                <div className="divider"></div>
                <p className="text-base sm:text-lg md:text-xl text-justify">
                  Booking a trip is easy! Simply browse our travel packages, select your 
                  preferred destination, and book directly through our platform. You can also 
                  customize your itinerary with the help of our travel experts.
                </p>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-lg sm:text-xl md:text-2xl font-medium">
                Does DeshAdvancher offer group tours?
              </div>
              <div className="collapse-content">
                <div className="divider"></div>
                <p className="text-base sm:text-lg md:text-xl text-justify">
                  Yes! We offer group tours for solo travelers, families, and 
                  corporate teams. You can join scheduled tours or create a 
                  private group tour based on your interests.
                </p>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-lg sm:text-xl md:text-2xl font-medium">
                What types of adventures does DeshAdvancher provide?
              </div>
              <div className="collapse-content">
                <div className="divider"></div>
                <p className="text-base sm:text-lg md:text-xl text-justify">
                  We offer a variety of adventures, including trekking, hiking, 
                  cultural tours, wildlife safaris, and beach getaways. Whether 
                  you're looking for extreme adventure or a relaxing escape, 
                  we have something for everyone.
                </p>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-lg sm:text-xl md:text-2xl font-medium">
                Is DeshAdvancher suitable for first-time travelers?
              </div>
              <div className="collapse-content">
                <div className="divider"></div>
                <p className="text-base sm:text-lg md:text-xl text-justify">
                  Absolutely! Our platform provides travel guides, tips, and 
                  expert advice to help first-time travelers feel confident and 
                  prepared. We also offer beginner-friendly travel packages for 
                  those new to exploring.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
