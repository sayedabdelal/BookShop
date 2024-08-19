 

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import RootPage from './pages/RootPage';
import ErrorPage from './UI/ErrorPage';
import LoginPage from './pages/AuthenticationPages/LoginPage';
import SignupPage from './pages/AuthenticationPages/SignupPage';
import PrivateRoute from './pages/AuthenticationPages/PrivateRoute';
import UserPage from './pages/UserPage';
// import Home from './components/Home/Home';
import HomePage from './pages/HomePage';
import DiscountPage from './pages/DiscountPage';
import TestimonialPage from './pages/TestimonialPage';
import ShopPage from './pages/ShopPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element : <HomePage />
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'user', // This is the protected route
        element: (
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'discount',
        element: <DiscountPage />,  
      },
      {
        path: 'testimonial',
        element: <TestimonialPage />,  
      },
      {
        path: 'shop',
        element: <ShopPage />,  
      }
      
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
    <RouterProvider router={router} />
  )
}

export default App