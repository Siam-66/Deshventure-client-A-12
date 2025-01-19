import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/LogSign/Login";
import Signup from "../Pages/LogSign/Signup";
import ForgetPassword from "../Pages/LogSign/ForgetPassword";
import AllTripsPage from "../Pages/AllTripsPage";
import PackageDetailsPage from "../Pages/PackageDetailsPage";
import AboutUs from "../Pages/AboutUs";
import PrivateRoute from "../Routes/PrivateRoute";
import TourGuideProfile from "../Pages/TourGuideProfile";

import AddPackage from "../Dashboard/Admin/AddPackage";
import ManageUsers from "../Dashboard/Admin/ManageUsers";
import ManageCandidates from "../Dashboard/Admin/ManageCandidates";
import ManageProfileAdmin from "../Dashboard/Admin/ManageProfileAdmin";



import Dashboards from "../Dashboard/Dashboards";
import ManageProfile from "../Dashboard/Tourist/ManageProfile";
import JoinAsTourGuide from "../Dashboard/Tourist/JoinAsTourGuide";
import MyBookings from "../Dashboard/Tourist/MyBookings";

import ManageProfileGuide from "../Dashboard/TourGuide/ManageProfileGuide";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage />,

        children:[
            {
                path:"/",
                element:<Home></Home>,
            },
            {
                path:"allTripsPage",
                element:<AllTripsPage></AllTripsPage>,
            },
            {
                path: "/packageDetailsPage/:id",
                element:<PrivateRoute>
                    <PackageDetailsPage />
                </PrivateRoute>,
                loader: ({ params }) =>
                fetch(`http://localhost:5000/allTour/${params.id}`).then((res) =>
                    res.json()
                ),
            },
            {
                path:"aboutUs",
                element:<AboutUs></AboutUs>,
            },
            {
                path:"login",
                element:<Login></Login>,
            },
            {
                path:"signup",
                element:<Signup></Signup>,
            },
            {
                path:"forgetPassword",
                element:<ForgetPassword></ForgetPassword>,
            },

            {
                path:"dashboards",
                element:<Dashboards></Dashboards>,
            },

            {
                path: "tourGuideProfile/:id",
                element: <TourGuideProfile />,
                loader: ({ params }) =>
                fetch(`http://localhost:5000/allUserData/${params.id}`).then((res) =>
                    res.json()
                ),
            }

        ]
    },

    {
        path:"dashboards",
        element:<Dashboards></Dashboards>,
        errorElement: <ErrorPage />,
        children:[
            {
                path:"addPackage",
                element:<AddPackage></AddPackage>,
            },
            {
                path:"manageProfile",
                element:<ManageProfile></ManageProfile>,
            },
            {
                path:"joinAsTourGuide",
                element:<JoinAsTourGuide></JoinAsTourGuide>,
            },
            {
                path:"manageProfileGuide",
                element:<ManageProfileGuide></ManageProfileGuide>,
            },
            {
                path:"myBookings",
                element:<MyBookings></MyBookings>,
            },
            {
                path:"manageUsers",
                element:<ManageUsers></ManageUsers>,
            },
            {
                path:"manageCandidates",
                element:<ManageCandidates></ManageCandidates>,
            },
            {
                path:"manageProfileAdmin",
                element:<ManageProfileAdmin></ManageProfileAdmin>,
            },
        ]
    },
    
    ]);
