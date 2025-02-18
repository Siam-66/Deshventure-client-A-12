import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Image1 from "../assets/Deshventure.png";
import { FaUserCircle } from "react-icons/fa";
import { Moon, Sun } from "lucide-react";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
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

const linkDrop = (
  <>
    <li className="hover:bg-gradient-to-r from-green-600 to-lime-500 hover:text-white font-semibold mb-1 hover:rounded-2xl">
    <NavLink
      to="dashboards"
      className={({ isActive }) =>
        isActive
          ? "bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold rounded-2xl px-3 py-2"
          : "px-3 py-2"
      }
    >
      Dashboard
    </NavLink>
  </li>
  {/* <li className="hover:bg-gradient-to-r from-green-600 to-lime-500 hover:text-white font-semibold mb-1 hover:rounded-2xl">
    <NavLink
      to="myArtifacts"
      className={({ isActive }) =>
        isActive
          ? "bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold rounded-2xl px-3 py-2"
          : "px-3 py-2"
      }
    >
      Special Offers
    </NavLink>
  </li> */}
  </>
);

  const links = (
<>
  <li className="hover:bg-gradient-to-r from-green-600 to-lime-500 hover:text-white font-semibold hover:rounded-2xl">
    <NavLink
      to="/"
      className={({ isActive }) =>
        isActive
          ? "bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold rounded-2xl px-3 py-2"
          : "px-3 py-2"
      }
    >
      Home
    </NavLink>
  </li>
  
  <li className="hover:bg-gradient-to-r from-green-600 to-lime-500 hover:text-white font-semibold hover:rounded-2xl">
    <NavLink
      to="allTripsPage"
      className={({ isActive }) =>
        isActive
          ? " bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold rounded-2xl px-3 py-2"
          : "px-3 py-2"
      }
    >
    All Trips
</NavLink>
  </li>

  {user?.email && (
  <li className="hover:bg-gradient-to-r from-green-600 to-lime-500 hover:text-white font-semibold hover:rounded-2xl">
    <NavLink
      to="CommunityPage"
      className={({ isActive }) =>
        isActive
          ? "bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold rounded-2xl px-3 py-2"
          : "px-3 py-2"
      }
    >
      Community
    </NavLink>
  </li>
  
    )}




  <li className="hover:bg-gradient-to-r from-green-600 to-lime-500 hover:text-white font-semibold hover:rounded-2xl">
    <NavLink
      to="aboutUs"
      className={({ isActive }) =>
        isActive
          ? "bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold rounded-2xl px-3 py-2"
          : "px-3 py-2"
      }
    >
      About Us
    </NavLink>
  </li>


</>
  );

  return (
    <div className="navbar bg-base-100/85 dark:bg-gray-900/85 dark:text-white z-50 sticky top-0 md:px-24 px-1">
      {/* Navbar content... */}
      <div className="navbar-start">
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 dark:bg-gray-700 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <NavLink to="/" className="flex items-center cursor-pointer">
          <img className="md:w-20 w-12" src={Image1} alt="Sunflower Logo" />
          <span className="font-bold md:text-3xl text-lg dark:text-white">Deshventure</span>
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1 text-xl dark:text-white">{links}</ul>
      </div>

      <div className="navbar-end flex items-center gap-4">
        <button
          onClick={handleThemeToggle}
          className="btn btn-circle btn-ghost dark:text-white"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="h-6 w-6" />
          ) : (
            <Sun className="h-6 w-6" />
          )}
        </button>
        
        <div className="flex items-center   rounded-3xl">


        {user?.email ? (

<div className="dropdown dropdown-end">
  {/* Dropdown button */}
  <button
    tabIndex={0}
    className="btn btn-ghost btn-circle mr-2 avatar"
    aria-label="Open user menu"
  >
    <div className="w-10 rounded-full">
      <img
        className="w-12 h-12 rounded-full border-2 border-green-700"
        alt={user?.displayName}
        src={user?.photoURL}
        
      />
    </div>
  </button>

  {/* Dropdown menu */}
  <ul
    tabIndex={0}
    className="menu menu-sm dropdown-content bg-base-100  rounded-box z-[1] mt-3 w-56 p-2 pr-3 shadow dropdown-start">
    <li className="bg-gradient-to-r from-green-600 to-lime-500 text-white rounded-lg mb-1 py-4">
      <p>{user?.displayName}</p>
      <p className="text-xs">{user?.email}</p>
    </li>
    {linkDrop}
    <li className="w-28 mt-3 ml-10">
      <button
        onClick={logOut}
        className="px-4 py-2 text-center rounded-3xl md:text-lg text-sm font-semibold border-lime-500 hover:bg-gradient-to-r from-green-600 to-lime-500 text-black hover:text-white border"
      >
        Log Out
      </button>
    </li>
  </ul>
</div>


  
          ) : 
          
          (
            
            <div className="flex items-center ">
            <FaUserCircle className="md:size-10 size-8  text-lime-500" />
            <NavLink
              to="login"
              className="px-5 py-2  rounded-3xl md:text-xl text-xs font-semibold bg-gradient-to-r from-green-600 to-lime-500 border text-white"
            >
              Log In
            </NavLink>
            </div>
          )}


        </div>

      </div>
      
    </div>
  );
};

export default Navbar;