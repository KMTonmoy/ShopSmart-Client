import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Layout/Main";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/AboutUs/Aboutus";
import Contact from "../Pages/Contact/Contact";
import Signup from "../Pages/Signup/Signup";
import Login from "../Pages/Login/Login";
import Products from "../Pages/ProductsPage/Products";
import Details from "../Pages/Home/Details/Details";
import Cart from "../Pages/Cart/Cart";
import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <PrivateRoute><Contact /></PrivateRoute>,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/cart",
                element: <PrivateRoute><Cart /></PrivateRoute>,
            },
            {
                path: "/details/:id",
                element: <Details />,
                loader: ({ params }) => fetch(`https://y-taupe-chi.vercel.app/product/${params.id}`)
            },
        ]
    },
]);