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
import { Moon, Sun } from "lucide-react";


const Dashboards = () => {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

    // Handle theme toggle
    const handleThemeToggle = () => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      document.documentElement.classList.toggle("dark");
    };
    // Initialize theme on component mount and handle theme changes
    useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.email) {
        try {
          const response = await fetch(`https://assignment-12-deshventure-server.vercel.app/getRole?email=${user.email}`);
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
    <div className="flex flex-col md:flex-row">
            <Helmet>
                <title>  Deshventure
                </title>
            </Helmet>
      <div className="w-full md:w-64 md:min-h-screen bg-green-600">
        <div className="flex justify-end items-center p-1 ">
          <button
          onClick={handleThemeToggle}
          className="btn btn-circle btn-ghost dark:text-white "
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="size-8" />
          ) : (
            <Sun className="size-8" />
          )}
        </button>
        </div>

        <ul className="menu p-4">
          <div>
            <img className="w-60" src={Image1} alt="Sunflower Logo" />
          </div>
          
          
          {userRole === "tourist" && (
            <>
              <p className="font-bold  text-xl mb-4 text-white">Tourist Dashboard</p>
              <li className="mb-2">
                <NavLink to="/dashboards/manageProfile"  className=" block px-4 py-2 text-white hover:bg-green-700 rounded">
                  <FaHouseUser className="inline mr-2"/>Manage Profile
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboards/myBookings" className="block px-4 py-2 text-white hover:bg-green-700 rounded">
                  <MdSaveAs className="inline mr-2"/>My Bookings
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboards/AddStory"className="block px-4 py-2 text-white hover:bg-green-700 rounded">
                  <BsChatSquareHeartFill className="inline mr-2"/>Add Stories
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboards/manageStories"className="block px-4 py-2 text-white hover:bg-green-700 rounded">
                  <GiLoveMystery className="inline mr-2"/>Manage Stories
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboards/joinAsTourGuide"className="block px-4 py-2 text-white hover:bg-green-700 rounded">
                  <ImHappy2 className="inline mr-2"/>Join as Tour Guide
                </NavLink>
              </li>
            </>
          )}

          {userRole === "tour-guide" && (
            <>
              <p className="font-bold  text-xl mb-4 text-white">Tour Guide Dashboard</p>
              <li className="mb-2">
                <NavLink to="/dashboards/manageProfileGuide"className="block px-4 py-2 text-white hover:bg-green-700 rounded">
                  <FaHouseUser className="inline mr-2"/>Manage Profile
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboards/myAssignedTours"className="block px-4 py-2 text-white hover:bg-green-700 rounded">
                  <MdSaveAs className="inline mr-2"/>My Assigned Tours
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboards/addStory"className="block px-4 py-2 text-white hover:bg-green-700 rounded">
                  <BsChatSquareHeartFill className="inline mr-2"/>Add Stories
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboards/manageStories"className="block px-4 py-2 text-white hover:bg-green-700 rounded">
                  <GiLoveMystery className="inline mr-2"/>Manage Stories
                </NavLink>
              </li>
            </>
          )}

          {userRole === "admin" && (
            <>
              <p className="font-bold   text-xl mb-4 text-white">Admin Dashboard</p>
              <li className="mb-2">
                <NavLink to="/dashboards/manageProfileAdmin"className="block px-4 py-2 text-white hover:bg-green-700 rounded">
                  <FaHouseUser className="inline mr-2"/>Manage Profile
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboards/addPackage"className="block px-4 py-2 text-white hover:bg-green-700 rounded">
                  <BsDatabaseFillAdd className="inline mr-2"/>Add Package
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboards/manageUsers"className="block px-4 py-2 text-white hover:bg-green-700 rounded">
                  <PiUserGearFill className="inline mr-2"/>Manage Users
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboards/manageCandidates"className="block px-4 py-2 text-white hover:bg-green-700 rounded">
                  <FaHouseUser className="inline mr-2"/>Manage Candidates
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>

          <li className="mb-2">
            <NavLink to="/"className="block px-4 py-2 text-white hover:bg-green-700 rounded">
              <RiArrowGoBackLine className="inline mr-2"/>Go Back Home
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-4 w-full dark:bg-gray-950">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboards;