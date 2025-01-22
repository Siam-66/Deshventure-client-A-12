import { NavLink, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FaHouseUser } from "react-icons/fa";
import { MdSaveAs } from "react-icons/md";
import { GiLoveMystery } from "react-icons/gi";
import { BsChatSquareHeartFill } from "react-icons/bs";
import { ImHappy2 } from "react-icons/im";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { PiUserGearFill } from "react-icons/pi";
import { RiArrowGoBackLine } from "react-icons/ri";
import { Helmet } from "react-helmet";
import Image1 from "../assets/Deshventure.png";

const Dashboards = () => {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.email) {
        try {
          const response = await fetch(`http://localhost:5000/getRole?email=${user.email}`);
          const data = await response.json();
          setUserRole(data.role);
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };

    fetchUserRole();
  }, [user]);

  return (
    <div className="flex">
            <Helmet>
                <title>  Deshventure
                </title>
            </Helmet>
      <div className="w-64 min-h-screen bg-green-600">
        <ul className="menu">
          <img className="w-60" src={Image1} alt="Sunflower Logo" />
          
          {userRole === "tourist" && (
            <>
              <p className="font-bold text-center text-xl mb-4 text-white">Tourist Dashboard</p>
              <li>
                <NavLink to="/dashboards/manageProfile">
                  <FaHouseUser />Manage Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboards/myBookings">
                  <MdSaveAs />My Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboards/AddStory">
                  <BsChatSquareHeartFill />Add Stories
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboards/manageStories">
                  <GiLoveMystery />Manage Stories
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboards/joinAsTourGuide">
                  <ImHappy2 />Join as Tour Guide
                </NavLink>
              </li>
            </>
          )}

          {userRole === "tour-guide" && (
            <>
              <p className="font-bold text-center text-xl mb-4 text-white">Tour Guide Dashboard</p>
              <li>
                <NavLink to="/dashboards/manageProfileGuide">
                  <FaHouseUser />Manage Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboards/myAssignedTours">
                  <MdSaveAs />My Assigned Tours
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboards/addStory">
                  <BsChatSquareHeartFill />Add Stories
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboards/manageStories">
                  <GiLoveMystery />Manage Stories
                </NavLink>
              </li>
            </>
          )}

          {userRole === "admin" && (
            <>
              <p className="font-bold text-center text-xl mb-4 text-white">Admin Dashboard</p>
              <li>
                <NavLink to="/dashboards/manageProfileAdmin">
                  <FaHouseUser />Manage Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboards/addPackage">
                  <BsDatabaseFillAdd />Add Package
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboards/manageUsers">
                  <PiUserGearFill />Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboards/manageCandidates">
                  <FaHouseUser />Manage Candidates
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>

          <li>
            <NavLink to="/">
              <RiArrowGoBackLine />Go Back Home
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboards;