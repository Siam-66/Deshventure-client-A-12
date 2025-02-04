import { Link } from "react-router-dom";
import Image1 from "../assets/Deshventure.png";

const Footer = () => {
  return (
    <div className="bg-base-200">
      {/* Main Footer */}
      <footer className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Section - Logo and Description */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-gray-200 pb-8">
          <div className="mb-6 sm:mb-0">
            <img className="w-40" src={Image1} alt="Deshventure Logo" />
            <p className="mt-4 text-sm text-base-content max-w-xs">
              Deshventure Ltd. <br />
              A online Tourist Guide platform
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <a className="hover:opacity-75 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a className="hover:opacity-75 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a className="hover:opacity-75 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Sections - Responsive Grid */}
          <div className="md:mt-5 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
            <div>
              <h6 className="text-base font-semibold mb-4">Services</h6>
              <ul className="space-y-3">
                <li><Link to="/" className="text-sm hover:underline">Home</Link></li>
                <li><Link to="/AllTripsPage" className="text-sm hover:underline">All Trips</Link></li>
                <li><Link to="/communityPage" className="text-sm hover:underline">Community</Link></li>
              </ul>
            </div>

            <div>
              <h6 className="text-base font-semibold mb-4">Company</h6>
              <ul className="space-y-3">
                <li><Link className="text-sm hover:underline">Jobs</Link></li>
                <li><Link className="text-sm hover:underline">Contact</Link></li>
                <li><Link to="/aboutUs" className="text-sm hover:underline">About us</Link></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h6 className="text-base font-semibold mb-4">Legal</h6>
              <ul className="space-y-3">
                <li><Link to="/termsOfUse" className="text-sm hover:underline">Terms of use</Link></li>
                <li><Link to="/privacyPolicy" className="text-sm hover:underline">Privacy policy</Link></li>
                <li><Link to="/userAgreement" className="text-sm hover:underline">User Agreement</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="pt-8">
          <p className="text-sm text-center">
            Copyright © {new Date().getFullYear()} - All right reserved by Deshventure Ltd.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;