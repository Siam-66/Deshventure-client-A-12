import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Select from "react-select";
import { Helmet } from "react-helmet";

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  // Fetch user role
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

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const query = new URLSearchParams({
          name: searchTerm,
          role: filterRole,
          page: page.toString(),
          limit: limit.toString(),
        }).toString();

        const response = await fetch(`https://assignment-12-deshventure-server.vercel.app/getTourists?${query}`);
        const data = await response.json();

        setUsers(data.users);
        setTotalPages(Math.ceil(data.total / limit));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (userRole === "admin") {
      fetchUsers();
    }
  }, [userRole, searchTerm, filterRole, page]);

  // Render access denied if user is not an admin
  if (userRole !== "admin") {
    return <div>Access denied</div>;
  }

  return (
    <div>
        <Helmet>
          <title> Manage Users  / Deshventure
          </title>
      </Helmet>
      <h1>Manage Users</h1>

      {/* Search and Filter */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Name/Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <Select
          options={[
            { value: "tourist", label: "Tourist" },
            { value: "tourGuide", label: "Tour Guide" },
            { value: "admin", label: "Admin" },
          ]}
          placeholder="Filter by Role"
          onChange={(option) => setFilterRole(option?.value || "")}
          isClearable
        />
      </div>
        
        

      {/* Users Table */}
      <div className="overflow-x-auto"> 
              <div className="min-w-full">
            <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">Name</th>
            <th className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">Email</th>
            <th className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">Photo</th>
            <th className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
                <td className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">
                <img src={user.photo} alt={user.name} className="w-12 h-12 rounded-full" />
              </td>
              <td className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">{user.name}</td>
              <td className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">{user.email}</td>
 
              <td className="border border-gray-400 px-1 md:px-2 py-2 text-xs lg:px-4 md:text-base">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>



      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    className="px-2 py-2 md:px-4 md:py-2 bg-gray-300 hover:bg-green-600 hover:text-white text-black  rounded-l-lg"
  >
    Prev
  </button>
  <span className="px-2 py-2 md:px-4 md:py-2 text-lg font-medium text-black">{page}</span>
  <button
    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={page === totalPages}
    className="px-2 py-2 md:px-4 md:py-2 bg-gray-300 hover:bg-green-600 text-black  rounded-r-lg"
  >
    Next
  </button>
</div>

    </div>
  );
};

export default ManageUsers;
