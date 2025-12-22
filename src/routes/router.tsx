import { createBrowserRouter, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/HomePage";
import Categories from "../pages/CategoriesPage";
import PrivacyGuide from "../pages/PrivacyGuidePage";
import PrivacyEconomics from "../pages/PrivacyEconomicsPage";
import About from "../pages/AboutPage";
import Scenarios from "../pages/ScenariosPage";
import GuidedLearning from "../pages/GuidedLearningPage";
import ScrollToTop from "../components/ScrollToTop";

const router = createBrowserRouter([
  {
    element: (
      <>
        <ScrollToTop />
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
      {
        path: "/scenarios",
        element: <Scenarios />,
      },
      {
        path: "/guided-learning",
        element: <GuidedLearning />,
      },
    ],
  },
]);

export default router;
