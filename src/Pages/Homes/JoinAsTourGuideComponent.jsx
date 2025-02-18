import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const JoinAsTourGuideComponent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [applicationData, setApplicationData] = useState({
    title: "",
    reason: "",
    cvLink: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You need to log in to submit the application.");
      navigate("/login"); 
      return;
    }

    const dataToSave = {
      ...applicationData,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      role: "tourist", 
    };

    try {
      const response = await fetch("https://assignment-12-deshventure-server.vercel.app/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });

      if (response.ok) {
        setShowModal(true);
        setApplicationData({ title: "", reason: "", cvLink: "" }); // Reset form
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div id="becomeGuide"
      className="container mx-auto h-[40rem] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url("https://i.ibb.co.com/XYYD2bM/application.jpg")`,
      }}
    >
      <div className="bg-white bg-opacity-40 max-sm:mx-5 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Join as a Tour Guide
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="font-semibold">Application Title:</label>
            <input
              type="text"
              name="title"
              value={applicationData.title}
              onChange={handleInputChange}
              className="border p-2 w-full rounded-md dark:bg-gray-900"
              placeholder="Enter application title"
              required
            />
          </div>
          <div>
            <label className="font-semibold">
              Why do you want to be a Tour Guide?
            </label>
            <textarea
              name="reason"
              value={applicationData.reason}
              onChange={handleInputChange}
              className="border p-2 w-full rounded-md dark:bg-gray-900"
              placeholder="Explain your reasons"
              required
            ></textarea>
          </div>
          <div>
            <label className="font-semibold">CV Link:</label>
            <input
              type="url"
              name="cvLink"
              value={applicationData.cvLink}
              onChange={handleInputChange}
              className="border  p-2 w-full rounded-md dark:bg-gray-900"
              placeholder="Enter link to your CV"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-green-600 to-lime-500 text-lg text-white  px-4 py-2 rounded-md w-full"
          >
            Submit Application
          </button>
        </form>
        {!user?.email && (
        <p className="mt-5">
            Don't have an account? Why not
            <Link to="/signup" className="link text-green-500   font-bold  pl-2">
              Sign up
            </Link>
          </p>
          )}
      </div>
    

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Application Successful!</h2>
            <p>
              Your application has been submitted successfully. We will get back
              to you soon.
            </p>
            <div className="flex justify-end">
              <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-green-600 text-white text-lg px-4 py-2 rounded-md"
            >
              Close
            </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default JoinAsTourGuideComponent;
