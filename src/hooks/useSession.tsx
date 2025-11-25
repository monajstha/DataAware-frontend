import { useContext } from "react";
import SessionTrackingContext from "../context/SessionTrackingContext";

export const useSessionTracking = () => {
  const context = useContext(SessionTrackingContext);
  if (!context) {
    throw new Error(
      "useSessionTracking must be used within SessionTrackingProvider"
    );
  }
  return context;
};
