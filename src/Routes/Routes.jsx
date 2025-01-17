import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/LogSign/Login";
import Signup from "../Pages/LogSign/Signup";
import ForgetPassword from "../Pages/LogSign/ForgetPassword";
import AddPackage from "../Dashboard/Admin/AddPackage";
import Dashboards from "../Dashboard/Dashboards";
import AllTripsPage from "../Pages/AllTripsPage";
import PackageDetailsPage from "../Pages/PackageDetailsPage";


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
                element: <PackageDetailsPage />,
                loader: ({ params }) =>
                fetch(`http://localhost:5000/allTour/${params.id}`).then((res) =>
                    res.json()
                ),
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
                path:"addPackage",
                element:<AddPackage></AddPackage>,
            },
            {
                path:"dashboards",
                element:<Dashboards></Dashboards>,
            }

        ]
    },
    
    ]);
