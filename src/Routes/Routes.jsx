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
import CommunityPage from "../Pages/CommunityPage";
import TermsOfUse from "../Component/TermsOfUse";
import PrivacyPolicy from "../Component/PrivacyPolicy ";
import UserAgreement from "../Component/UserAgreement";

import AddPackage from "../Dashboard/Admin/AddPackage";
import ManageUsers from "../Dashboard/Admin/ManageUsers";
import ManageCandidates from "../Dashboard/Admin/ManageCandidates";
import ManageProfileAdmin from "../Dashboard/Admin/ManageProfileAdmin";



import Dashboards from "../Dashboard/Dashboards";
import ManageProfile from "../Dashboard/Tourist/ManageProfile";
import JoinAsTourGuide from "../Dashboard/Tourist/JoinAsTourGuide";
import MyBookings from "../Dashboard/Tourist/MyBookings";
import AddStory from "../Dashboard/Tourist/AddStory";
import ManageStories from "../Dashboard/Tourist/ManageStories";
import EditStory from "../Dashboard/Tourist/EditStory";


import ManageProfileGuide from "../Dashboard/TourGuide/ManageProfileGuide";
import MyAssignedTours from "../Dashboard/TourGuide/MyAssignedTours";
import ManageStoriesGuide from "../Dashboard/TourGuide/ManageStoriesGuide";
import EditStoryGuide from "../Dashboard/TourGuide/EditStoryGuide";
import AddStoryGuide from "../Dashboard/TourGuide/AddStoryGuide";  

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
                fetch(`https://assignment-12-deshventure-server.vercel.app/allTour/${params.id}`).then((res) =>
                    res.json()
                ),
            },
            {
                path:"communityPage",
                element:<CommunityPage></CommunityPage>,
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
                fetch(`https://assignment-12-deshventure-server.vercel.app/allUserData/${params.id}`).then((res) =>
                    res.json()
                ),
            },

            {
                path:"termsOfUse",
                element:<TermsOfUse></TermsOfUse>,
            },
            {
                path:"privacyPolicy",
                element:<PrivacyPolicy></PrivacyPolicy>,
            },
            {
                path:"userAgreement",
                element:<UserAgreement></UserAgreement>,
            },

        ]
    },

    {
        path:"dashboards",
        element:<Dashboards></Dashboards>,
        errorElement: <ErrorPage />,
        children:[
            {
                path:"addPackage",
                element: <PrivateRoute>  
                <AddPackage></AddPackage>
                </PrivateRoute>,
            },
            {
                path:"manageProfile",
                element: <PrivateRoute>  
                <ManageProfile></ManageProfile>
                </PrivateRoute>,
            },
            {
                path:"joinAsTourGuide",
                element: <PrivateRoute>  
                <JoinAsTourGuide></JoinAsTourGuide>
                </PrivateRoute>,
            },
            {
                path:"manageProfileGuide",
                element: <PrivateRoute>  
                <ManageProfileGuide></ManageProfileGuide>
                </PrivateRoute>,
            },
            {
                path:"myBookings",
                element: <PrivateRoute>  
                <MyBookings></MyBookings>
                </PrivateRoute>,
            },
            {
                path:"manageUsers",
                element: <PrivateRoute>  
                <ManageUsers></ManageUsers>
                </PrivateRoute>,
            },
            {
                path:"manageCandidates",
                element: <PrivateRoute>  
                <ManageCandidates></ManageCandidates>
                </PrivateRoute>,
            },
            {
                path:"manageProfileAdmin",
                element: <PrivateRoute>  
                <ManageProfileAdmin></ManageProfileAdmin>
                </PrivateRoute>,
            },
            {
                path:"myAssignedTours",
                element: <PrivateRoute>  
                <MyAssignedTours></MyAssignedTours>
                </PrivateRoute>,
            },
            {
                path:"addStory",
                element: <PrivateRoute>  
                <AddStory></AddStory>
                </PrivateRoute>,
            },
            {
                path:"manageStories",
                element: <PrivateRoute>  
                <ManageStories></ManageStories>
                </PrivateRoute>,
            },
            {
                path:"editStory/:id",
                element: <PrivateRoute>  
                <EditStory></EditStory>
                </PrivateRoute>,

            },
            {
                path:"addStoryGuide",
                element: <PrivateRoute>  
                <AddStoryGuide></AddStoryGuide>
                </PrivateRoute>,
            },
            {
                path:"manageStoriesGuide",
                element: <PrivateRoute>  
                <ManageStoriesGuide></ManageStoriesGuide>
                </PrivateRoute>,
            },
            {
                path:"editStoryGuide/:id",
                element: <PrivateRoute>  
                <EditStoryGuide></EditStoryGuide>
                </PrivateRoute>,
            },
        ]
    },
    
    ]);
