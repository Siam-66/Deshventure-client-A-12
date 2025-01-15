import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/LogSign/Login";
import Signup from "../Pages/LogSign/Signup";
import ForgetPassword from "../Pages/LogSign/ForgetPassword";

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
            }
            // {
            //     path:"/",
            //     element:<Home></Home>,
            // },

        ]
    },
    
    ]);
