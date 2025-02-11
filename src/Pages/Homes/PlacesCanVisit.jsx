import { Link } from "react-router-dom";

const PlacesCanVisit = () => {
  const photos = [
    { id: 1, src: "https://i.ibb.co/br5XC8P/1-River-and-Beach.jpg", name: "River and Beach" },
    { id: 2, src: "https://i.ibb.co/6mBR8rB/2-Historical-Places2.jpg", name: "Historical Places" },
    { id: 3, src: "https://i.ibb.co/Sw6P47S/3-Modern-Architecture.jpg", name: "Modern Architecture" },
    { id: 4, src: "https://i.ibb.co/hfHPRfP/4-Hill-Tracts-Tour.jpg", name: "Hill Tracts Tour" },
    { id: 5, src: "https://i.ibb.co/Jqs3Gjn/5-Gardens-and-Forest.jpg", name: "Gardens and Forest" },
    { id: 6, src: "https://i.ibb.co/pXpL2bH/6-Entertainment-Center.jpg", name: "Entertainment Center" },
  ];

  return (
    <div className="mt-16 px-4 md:px-12 lg:px-32 container mx-auto">
      <h1 className="text-3xl font-bold text-center">
        Places Can be Visited
      </h1>
      <p className="text-center text-gray-600 mt-4">
        Discover stunning destinations, from serene beaches to vibrant cities, and create unforgettable memories!
      </p>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-1 mt-10">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative overflow-hidden rounded-sm group"
          >
            <img
              src={photo.src}
              alt={photo.name}
              className="h-[30rem] md:h-full w-[16rem] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-all duration-500 group-hover:opacity-100"
            >
              <span className="text-white text-center text-sm font-semibold">
                {photo.name}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-7">
        <Link 
          to="/allTripsPage" 
          className="btn bg-gradient-to-r from-green-600 to-lime-500 text-lg text-white"
        >
          Adventure Awaits
        </Link>
      </div>
    </div>
  );
};

export default PlacesCanVisit;