import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Calendar, Award, Star } from 'lucide-react';

const TourGuideProfile = () => {
  const { id } = useParams();
  const [guideData, setGuideData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/allUserData/${id}`)
      .then(res => res.json())
      .then(data => {
        setGuideData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching guide data:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!guideData) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-700">Guide not found</h2>
        <Link to="/" className="text-green-600 hover:text-green-700 mt-4 inline-block">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header/Banner Section */}
        <div className="h-48 bg-gradient-to-r from-green-600 to-lime-500"></div>

        {/* Profile Info Section */}
        <div className="relative px-6 pb-6">
          {/* Profile Image */}
          <div className="absolute -top-16 left-6">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
              <img
                src={guideData.photo}
                alt={guideData.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name and Basic Info */}
          <div className="pt-20">
            <h1 className="text-3xl font-bold text-gray-800">{guideData.name}</h1>
            <p className="text-gray-600 flex items-center gap-2 mt-2">
              <MapPin className="w-4 h-4" />
              {guideData.location || 'Location not specified'}
            </p>
          </div>

          {/* Contact and Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-600" />
                <span>{guideData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-600" />
                <span>{guideData.phone || 'Phone not provided'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-green-600" />
                <span>Member since {guideData.joinDate || 'Not specified'}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-green-600" />
                <span>{guideData.expertise || 'General Tour Guide'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-green-600" />
                <span>{guideData.rating || '4.5'} Rating</span>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
            <p className="text-gray-600 leading-relaxed">
              {guideData.about || 
                'An experienced tour guide passionate about creating memorable experiences for tourists. Specialized in cultural tours and historical sites.'}
            </p>
          </div>

          {/* Skills/Specialties Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Specialties</h2>
            <div className="flex flex-wrap gap-2">
              {(guideData.specialties || ['Cultural Tours', 'Historical Sites', 'Adventure Tours'])
                .map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <Link
              to="/"
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-lime-500 text-white rounded-md hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
            <button
              className="px-6 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourGuideProfile;