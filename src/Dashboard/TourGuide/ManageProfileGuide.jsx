import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet";
import { useImageUpload } from "../useImageUpload";
import ProfileEditModal from "../ProfileEditModal";

const ManageProfileGuide = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { isUploading, uploadError, uploadImage } = useImageUpload();

  useEffect(() => {
    if (user?.email) {
      fetch(`https://assignment-12-deshventure-server.vercel.app/userData?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setProfileData(data))
        .catch((err) => console.error("Error fetching profile data:", err));
    }
  }, [user]);

  const handleFileChange = async (e, setUploadedPhotoUrl) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      
      const imageUrl = await uploadImage(file);
      if (imageUrl && setUploadedPhotoUrl) {
        setUploadedPhotoUrl(imageUrl);
      }
    }
  };

  const handleUpdate = async (updatedData) => {
    fetch(`https://assignment-12-deshventure-server.vercel.app/updateUserData/${profileData._id}`, {
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
          setPreviewImage(null);
        }
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Tour Guide Profile / Deshventure</title>
      </Helmet>
      <div className="max-w-lg mx-auto border-2 dark:bg-gray-900 border-lime-400 bg-base-100 rounded-lg shadow-xl p-6">
        <h1 className="mb-5 text-center text-3xl font-bold bg-gradient-to-r from-green-600 via-lime-500 to-emerald-600 bg-clip-text text-transparent">
          Welcome back
          <br />
          <span className="text-5xl ">{profileData.name}</span>
        </h1>
        <div className="flex justify-center mb-4">
          <img
            src={profileData.photo}
            alt={profileData.name}
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Profile Information</h2>
          <div className="mt-2">
            <p className="text-lg text-gray-700 dark:text-gray-200"><strong>Name:</strong> {profileData.name}</p>
            <p className="text-lg text-gray-700 dark:text-gray-200"><strong>Email:</strong> {profileData.email}</p>
            <p className="text-lg text-gray-700 dark:text-gray-200"><strong>Role:</strong> {profileData.role}</p>
          </div>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="btn text-xl font-bold bg-gradient-to-r from-green-600 to-lime-500 text-white rounded-lg px-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          Edit Profile
        </button>
      </div>

      <ProfileEditModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setPreviewImage(null);
        }}
        profileData={profileData}
        onUpdate={handleUpdate}
        handleFileChange={handleFileChange}
        isUploading={isUploading}
        uploadError={uploadError}
        previewImage={previewImage}
      />
    </div>
  );
};

export default ManageProfileGuide;