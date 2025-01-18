import { NavLink, Outlet } from "react-router-dom";
import { FaHouseUser } from "react-icons/fa";
import { MdSaveAs } from "react-icons/md";
import { GiLoveMystery } from "react-icons/gi";
import { BsChatSquareHeartFill } from "react-icons/bs";
import { ImHappy2 } from "react-icons/im";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { PiUserGearFill } from "react-icons/pi";
import { RiArrowGoBackLine } from "react-icons/ri";

const Dashboards = () => {
    return (
        <div className="flex">
            <div className="W-64 main-h-screen bg-green-600">
                <ul className="menu">



                    <p>Tourist</p>

                    <li><NavLink to="/dashboards/manageProfile">
                    <FaHouseUser />Manage  profile </NavLink></li>

                    <li><NavLink to="/dashboards/">
                    <MdSaveAs />My Bookings </NavLink></li>

                    <li><NavLink to="/dashboards/">
                    <BsChatSquareHeartFill />Add  Stories </NavLink></li>

                    <li><NavLink to="/dashboards/">
                    <GiLoveMystery />Manage Stories </NavLink></li>
                    
                    <li><NavLink to="/dashboards/joinAsTourGuide">
                    <ImHappy2 />Join as tour guide </NavLink></li>
                    




                    <p>Tour Guide</p>

                    <li><NavLink to="/dashboards/manageProfileGuide">
                    <FaHouseUser />Manage  profile </NavLink></li>

                    <li><NavLink to="/dashboards/">
                    <MdSaveAs />My Bookings </NavLink></li>

                    <li><NavLink to="/dashboards/">
                    <BsChatSquareHeartFill />Add  Stories </NavLink></li>

                    <li><NavLink to="/dashboards/">
                    <GiLoveMystery />Manage Stories </NavLink></li>



                    <p>Admin</p>
                    
                    <li><NavLink to="/dashboards/">
                    <FaHouseUser />Manage  profile </NavLink></li>

                    <li><NavLink to="/dashboards/addPackage">
                    <BsDatabaseFillAdd />Add Package </NavLink></li>

                    <li><NavLink to="/dashboards/">
                    <PiUserGearFill />Manage Users </NavLink></li>

                    <li><NavLink to="/dashboards/">
                    <FaHouseUser />Manage Candidates </NavLink></li>

                    <div className="divider"></div>

                    <li><NavLink to="/">
                    <RiArrowGoBackLine />Go back home </NavLink></li>

                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboards;