

import Banner from "./Homes/Banner";
import JoinAsTourGuideComponent from "./Homes/JoinAsTourGuideComponent";
import OverviewSection from "./Homes/OverviewSection";
import PlacesCanVisit from "./Homes/PlacesCanVisit";
import TourismTravelGuide from "./Homes/TourismTravelGuide";
import WhyChooseUs from "./Homes/WhyChooseUs";
import TouristStorySection from "./Homes/TouristStorySection";
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OverviewSection></OverviewSection>
            <TourismTravelGuide></TourismTravelGuide>
            <PlacesCanVisit></PlacesCanVisit>
            <TouristStorySection></TouristStorySection>
            <WhyChooseUs></WhyChooseUs>
            <JoinAsTourGuideComponent></JoinAsTourGuideComponent>
        </div>
    );
};

export default Home;