// SessionTrackingContext.tsx
import React, { useState, useEffect, ReactNode } from "react";
import {
  PostAssessment,
  PreAssessment,
  SessionData,
  UserContext,
} from "../interface/assessment";
import SessionTrackingContext from "../context/SessionTrackingContext";

// Generate UUID
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const initialSessionData: SessionData = {
  sessionId: generateUUID(),
  startTimestamp: new Date().toISOString(),
  preAssessment: null,
  postAssessment: null,
  behavior: {
    modulesCompleted: [],
    totalTimeSpent: 0,
    timePerModule: {},
    quizzesAttempted: 0,
    simulatorInteractions: 0,
    timelineViews: 0,
  },
  userContext: {
    ageRange: null,
    techProficiency: null,
    priorPrivacyKnowledge: null,
  },
  userName: null,
  feedback: null,
};

export const SessionTrackingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sessionData, setSessionData] =
    useState<SessionData>(initialSessionData);

  // Load session from localStorage on mount (for persistence)
  useEffect(() => {
    const savedSession = localStorage.getItem("dataaware_session");
    if (savedSession) {
      try {
        setSessionData(JSON.parse(savedSession));
      } catch (e) {
        console.error("Error loading session:", e);
      }
    }
  }, []);

  // Save session to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("dataaware_session", JSON.stringify(sessionData));
  }, [sessionData]);

  const setPreAssessment = (data: PreAssessment) => {
    setSessionData((prev) => ({
      ...prev,
      preAssessment: data,
    }));
  };

  const setPostAssessment = (data: PostAssessment) => {
    setSessionData((prev) => ({
      ...prev,
      postAssessment: data,
    }));
  };

  const addCompletedModule = (moduleId: number, timeSpent: number) => {
    setSessionData((prev) => ({
      ...prev,
      behavior: {
        ...prev.behavior,
        modulesCompleted: prev.behavior.modulesCompleted.includes(moduleId)
          ? prev.behavior.modulesCompleted
          : [...prev.behavior.modulesCompleted, moduleId],
        timePerModule: {
          ...prev.behavior.timePerModule,
          [moduleId]: timeSpent,
        },
        totalTimeSpent: prev.behavior.totalTimeSpent + timeSpent,
      },
    }));
  };

  const addQuizAttempt = () => {
    setSessionData((prev) => ({
      ...prev,
      behavior: {
        ...prev.behavior,
        quizzesAttempted: prev.behavior.quizzesAttempted + 1,
      },
    }));
  };

  const addSimulatorInteraction = () => {
    setSessionData((prev) => ({
      ...prev,
      behavior: {
        ...prev.behavior,
        simulatorInteractions: prev.behavior.simulatorInteractions + 1,
      },
    }));
  };

  const addTimelineView = () => {
    setSessionData((prev) => ({
      ...prev,
      behavior: {
        ...prev.behavior,
        timelineViews: prev.behavior.timelineViews + 1,
      },
    }));
  };

  const setUserContext = (context: Partial<UserContext>) => {
    setSessionData((prev) => ({
      ...prev,
      userContext: {
        ...prev.userContext,
        ...context,
      },
    }));
  };

  const setUserName = (name: string) => {
    setSessionData((prev) => ({
      ...prev,
      userName: name,
    }));
  };

  const setFeedback = (feedback: string) => {
    setSessionData((prev) => ({
      ...prev,
      feedback: feedback,
    }));
  };

  const getSessionData = () => sessionData;

  const resetSession = () => {
    setSessionData({
      ...initialSessionData,
      sessionId: generateUUID(),
      startTimestamp: new Date().toISOString(),
    });
    localStorage.removeItem("dataaware_session");
  };

  return (
    <SessionTrackingContext.Provider
      value={{
        sessionData,
        setPreAssessment,
        setPostAssessment,
        addCompletedModule,
        addQuizAttempt,
        addSimulatorInteraction,
        addTimelineView,
        setUserContext,
        setUserName,
        setFeedback,
        getSessionData,
        resetSession,
      }}
    >
      {children}
    </SessionTrackingContext.Provider>
  );
};
