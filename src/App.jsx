import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http.js";
import RootPage from "./pages/RootPage";
import ErrorPage from "./UI/ErrorPage";
import LoginPage from "./pages/AuthenticationPages/LoginPage";
import SignupPage from "./pages/AuthenticationPages/SignupPage";
import PrivateRoute from "./pages/AuthenticationPages/PrivateRoute";
import UserPage from "./pages/UserPage";
// import Home from './components/Home/Home';
import HomePage from "./pages/HomePage";
import DiscountPage from "./pages/DiscountPage";
import TestimonialPage from "./pages/TestimonialPage";
import ShopPage from "./pages/ShopPage";
import ShopDesPage from "./pages/ShopDesPage";
import CartPage from "./pages/CartPage";
import Wishlist from "./components/wishlist/Wishlist.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "user", // This is the protected route
        element: (
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        ),
      },
      {
        path: "discount",
        element: <DiscountPage />,
      },
      {
        path: "testimonial",
        element: <TestimonialPage />,
      },
      {
        path: "shop",
        children: [
          {
            index: true, // This is the default route for "/shop"
            element: <ShopPage />,
          },
          {
            path: "cart",
            element: <CartPage />,

          },
          {
            path: "wishlist",
            element: <Wishlist />,
          },
          {
            path: ":id", // Dynamic segment for shop description
            element: <ShopDesPage/>,
          }
          
        ]
      },
      

      // other routes...
    ],
  },
  // {
  //   path: 'discount',

  //   errorElement: <ErrorPage />,
  //   children : [
  //     {
  //       path: '',
  //       element: <HomePage />
  //     }
  //   ]
  // }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
