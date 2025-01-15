import Banner from "./Homes/Banner";
import OverviewSection from "./Homes/OverviewSection";
import PlacesCanVisit from "./Homes/PlacesCanVisit";
import TourismTravelGuide from "./Homes/TourismTravelGuide";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OverviewSection></OverviewSection>
            <TourismTravelGuide></TourismTravelGuide>
            <PlacesCanVisit></PlacesCanVisit>
        </div>
    );
};

export default Home;