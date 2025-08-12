import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./login/login";
import Register from "./Register/Register";
import Partneroverview from "./Partner/Partneroverview";
import LandingPage from "./landingPage/LandingPage";
import DashboardDetails from "./DashboardDetails/DashboardDetails";
import Bookingpage from "./Bookingpage/Bookingpage";
import Storage from "./Bookingpage/Storage";
import UserOverview from "./User/UserOverview";
import Profile from "./Profile/Profile";
import Reviews from "./Reviews/Reviews";
import Reservation from "./reservation/Reservation";
import UserBookings from "./User/UserBookings";
import Onboardingpage from "./OnBoarding/Onboardingpage";
import Loginmid from "./login/logmid";
import Registerpartner from "./Register/Registerpartner";
import SuperAdmin from "./SuperAdmin/SuperAdmin";
import SuperAdminUser from "./SuperAdmin/SuperAdminUser";

const Body = () => {
  const approuter = createBrowserRouter([
    { path: "/", element: <Login /> },
    {path: "/login/partner", element: <Loginmid />},
    { path: "/register", element: <Register /> },
    {path: "/register/partner", element: <Registerpartner />},
    { path: "/partneroverview", element: <Partneroverview /> },
    { path: "/landingpage", element: <LandingPage /> },
    { path: "/dashboard", element: <DashboardDetails /> },
    { path: "/bookingpage", element: <Bookingpage /> },
    { path: "/storage", element: <Storage /> },
    { path: "/useroverview", element: <UserOverview /> },
    { path: "/profile", element: <Profile /> },
    { path: "/reviews", element: <Reviews /> },
    { path: "/reservation", element: <Reservation /> },
    { path: "/userbookings", element: <UserBookings /> },
    { path: "/onboarding", element: <Onboardingpage /> },
    { path: "/superAdminuser",element:<SuperAdminUser/>},
    { path: "/superAdminpartner",element:<SuperAdmin/>}
  ]);
  return (
    <div>
      <RouterProvider router={approuter} />
    </div>
  );
};

export default Body;
