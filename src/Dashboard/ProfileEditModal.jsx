import React, { useState } from 'react';

const ProfileEditModal = ({ 
  isOpen, 
  onClose, 
  profileData, 
  onUpdate,
  handleFileChange,
  isUploading,
  uploadError,
  previewImage 
}) => {
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(profileData.photo);

  // Update uploadedPhotoUrl when a new photo is uploaded
  const handlePhotoChange = async (e) => {
    await handleFileChange(e, setUploadedPhotoUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      name: e.target.name.value,
      photo: uploadedPhotoUrl
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={profileData.name}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full border rounded-lg px-3 py-2 mb-2 dark:bg-gray-700 dark:text-white"
            />
            {isUploading && <p className="text-yellow-500 mt-1">Uploading image...</p>}
            {uploadError && <p className="text-red-500 mt-1">{uploadError}</p>}
            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg mx-auto"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="btn bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="btn bg-gradient-to-r from-green-600 to-lime-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;