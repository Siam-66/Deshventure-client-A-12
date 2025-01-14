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
            className="w-12 h-12 rounded-full border-2 border-yellow-700"
            // alt={user?.displayName}
            // src={user?.photoURL}
            src={Image1}
          />
        </div>
      </button>
    
      {/* Dropdown menu */}
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100  rounded-box z-[1] mt-3 w-52 p-2 shadow dropdown-start"
      >
        {linkDrop}
        <li className="w-28 mt-3 ml-10">
          <button
            onClick={logOut}
            className="px-5 py-2 text-center rounded-3xl md:text-lg text-sm font-semibold border-yellow-800 hover:bg-gradient-to-r from-yellow-900 via-orange-800 to-red-900 text-black hover:text-white border"
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
    
    
      
              ) : 
              
              (
                
                <div className="flex items-center gap-2">
                <FaUserCircle className="size-10  text-yellow-800" />
                <NavLink
                  to="login"
                  className="px-5 py-2  rounded-3xl md:text-xl text-lg font-semibold bg-gradient-to-r from-yellow-900 via-orange-800 to-red-900 border text-white"
                >
                  Log In
                </NavLink>
                </div>
              )}