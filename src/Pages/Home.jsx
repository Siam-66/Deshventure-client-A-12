

import Banner from "./Homes/Banner";
import JoinAsTourGuideComponent from "./Homes/JoinAsTourGuideComponent";
import OverviewSection from "./Homes/OverviewSection";
import PlacesCanVisit from "./Homes/PlacesCanVisit";
import TourismTravelGuide from "./Homes/TourismTravelGuide";
import WhyChooseUs from "./Homes/WhyChooseUs";
import TouristStorySection from "./Homes/TouristStorySection";
import { Helmet } from "react-helmet";
import Testimonials from "./Homes/Testimonials";
import FAQSection from "./Homes/FAQSection";
import SuccessSection from "./Homes/SuccessSection";
const Home = () => {
    return (
        <div>
        <Helmet>
            <title> Deshventure
            </title>
        </Helmet>
            <Banner></Banner>
            <OverviewSection></OverviewSection>
            <TourismTravelGuide></TourismTravelGuide>
            <PlacesCanVisit></PlacesCanVisit>
            <TouristStorySection></TouristStorySection>
            <SuccessSection></SuccessSection>
            <Testimonials></Testimonials>
            <WhyChooseUs></WhyChooseUs>
            <JoinAsTourGuideComponent></JoinAsTourGuideComponent>
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;