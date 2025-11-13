import { createBrowserRouter, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/HomePage";
import Categories from "../pages/CategoriesPage";
import PrivacyGuide from "../pages/PrivacyGuidePage";
import PrivacyEconomics from "../pages/PrivacyEconomicsPage";
import About from "../pages/AboutPage";

const router = createBrowserRouter([
  //   {
  //     path: "/login",
  //     element: <LoginPage />,
  //   },
  {
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/privacy-guide",
        element: <PrivacyGuide />,
      },
      {
        path: "/privacy-economics",
        element: <PrivacyEconomics />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

export default router;
