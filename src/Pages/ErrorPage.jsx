import Button from "../Component/Button";

const ErrorPage = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-9xl font-extrabold text-center animate-glow relative">
          404
        </h1>


        <p className="text-2xl mt-4 text-center">
        Turn back now, traveler, danger lies ahead!
        </p>
  

        <button
          className="mt-8 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-green-600 via-lime-500 to-emerald-200
          text-gray-800 rounded-lg focus:ring-4 focus:ring-green-900"
          onClick={() => window.location.replace("/")}
        >
          Back to Home
        </button>
      </div>
    );
  };
  
  export default ErrorPage;
  