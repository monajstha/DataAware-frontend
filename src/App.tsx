import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionTrackingProvider } from "./provider/SessionTrackingProvider";

function App() {
  return (
    <>
      <SessionTrackingProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" />
      </SessionTrackingProvider>
    </>
  );
}

export default App;
