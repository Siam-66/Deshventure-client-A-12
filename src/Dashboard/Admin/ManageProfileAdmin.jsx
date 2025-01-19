import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const ManageProfileAdmin = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [stats, setStats] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/profileData?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setProfileData(data.profile);
          setStats(data.stats);
        })
        .catch((err) => console.error("Error fetching profile data:", err));
    }
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = {
      name: e.target.name.value,
      photo: e.target.photo.value,
    };

    fetch(`http://localhost:5000/updateUserData/${profileData._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Profile updated successfully!");
          setProfileData({ ...profileData, ...updatedData });
          setModalOpen(false);
        }
      })
      .catch((err) => console.error("Error updating profile:", err));
  };
  

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto border-2 border-lime-400 bg-base-100 rounded-lg shadow-xl p-6">
        <h1 className="mb-5 text-center text-3xl font-bold bg-gradient-to-r from-green-600 via-lime-500 to-emerald-600 bg-clip-text text-transparent">
          Welcome back {profileData.name}
        </h1>
        <div className="flex justify-center mb-4">
          <img
            src={profileData.photo}
            alt={profileData.name}
            className="w-32 h-32 rounded-full"
          />
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">Admin Information</h2>
          <p className="text-lg text-gray-700"><strong>Name:</strong> {profileData.name}</p>
          <p className="text-lg text-gray-700"><strong>Email:</strong> {profileData.email}</p>
          <p className="text-lg text-gray-700"><strong>Role:</strong> {profileData.role}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-green-100 rounded-lg text-center shadow">
            <p className="text-xl font-bold">{stats.totalPayment}</p>
            <p>Total Payment</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg text-center shadow">
            <p className="text-xl font-bold">{stats.totalPackages}</p>
            <p>Total Packages</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg text-center shadow">
            <p className="text-xl font-bold">{stats.totalStories}</p>
            <p>Total Stories</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg text-center shadow">
            <p className="text-xl font-bold">{stats.totalTourists}</p>
            <p>Total Tourists</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg text-center shadow">
            <p className="text-xl font-bold">{stats.totalTourGuides}</p>
            <p>Total Tour Guides</p>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="btn bg-gradient-to-r from-green-600 to-lime-500 text-white px-8 rounded-lg shadow-lg hover:shadow-2xl"
        >
          Edit Profile
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={profileData.name}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  defaultValue={profileData.photo}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-gradient-to-r from-green-600 to-lime-500 text-white px-4 py-2 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProfileAdmin;
