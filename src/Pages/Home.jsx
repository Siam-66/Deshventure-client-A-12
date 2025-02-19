

import Banner from "./Homes/Banner";
import JoinAsTourGuideComponent from "./Homes/JoinAsTourGuideComponent";
import OverviewSection from "./Homes/OverviewSection";
import PlacesCanVisit from "./Homes/PlacesCanVisit";
import TourismTravelGuide from "./Homes/TourismTravelGuide";
import WhyChooseUs from "./Homes/WhyChooseUs";
import TouristStorySection from "./Homes/TouristStorySection";
import { Helmet } from "react-helmet";
import Testimonials from "./Homes/Testimonials";
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
            <Testimonials></Testimonials>
            <WhyChooseUs></WhyChooseUs>
            <JoinAsTourGuideComponent></JoinAsTourGuideComponent>
        </div>
    );
};

export default Home;