import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./First.jsx";
import Home from "./Home";
import Singleproject from "./Singleproject.jsx";
import About from "./About";
import Contact from "./Contact.jsx";
import Blog from "./Blog.jsx";
import Cart from "./Cart.jsx";

import LoginPage from "./LoginPage.jsx";
import RegisterPage from "./RegisterPage.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx";
import Wishlist from "./Wishlist.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      { index: true, element: <Home /> },
      { path: "product/:id", element: <Singleproject /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "blog", element: <Blog /> },
      {path:"wishlist",element:
        
          <Wishlist/>
       
      },
      {
        path: "cart",
       
        element: 
        <ProtectedRoute>
        <Cart />
        </ProtectedRoute>
        ,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path:"register",
        element:<RegisterPage/>

      }
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
