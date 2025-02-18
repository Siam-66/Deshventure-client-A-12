import { useState } from 'react';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const uploadImage = async (file) => {
    if (!file) return null;

    setIsUploading(true);
    setUploadError("");

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(image_hosting_api, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const result = await response.json();
      return result.data.display_url;
    } catch (error) {
      console.error("Image upload error:", error);
      setUploadError("Failed to upload image. Please try again.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, uploadError, uploadImage };
};