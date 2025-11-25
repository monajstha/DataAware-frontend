import { createContext } from "react";
import { SessionTrackingContextType } from "../interface/assessment";

const SessionTrackingContext = createContext<
  SessionTrackingContextType | undefined
>(undefined);

export default SessionTrackingContext;
