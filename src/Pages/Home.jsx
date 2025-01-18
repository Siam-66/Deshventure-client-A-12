import JoinAsTourGuide from "../Dashboard/Tourist/JoinAsTourGuide";
import Banner from "./Homes/Banner";
import OverviewSection from "./Homes/OverviewSection";
import PlacesCanVisit from "./Homes/PlacesCanVisit";
import TourismTravelGuide from "./Homes/TourismTravelGuide";
import WhyChooseUs from "./Homes/WhyChooseUs";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OverviewSection></OverviewSection>
            <TourismTravelGuide></TourismTravelGuide>
            <PlacesCanVisit></PlacesCanVisit>
            <WhyChooseUs></WhyChooseUs>
            <JoinAsTourGuide></JoinAsTourGuide>
        </div>
    );
};

export default Home;