export interface Question {
  id: number;
  question: string;
  type: "multiple" | "truefalse";
  options?: string[];
  correctAnswer: number;
  topic: string;
  explanation: string;
}

export interface Module {
  id: number;
  title: string;
  icon: any;
  color: string;
  summary: string;
  keyPoints: string[];
  examples: string[];
  protectionTips: string[];
  linkTo: string;
  quiz?: Question[];
}

export interface PreAssessment {
  score: number;
  answers: number[];
  timeSpent: number;
  timestamp: string;
}

export interface PostAssessment {
  score: number;
  answers: number[];
  timeSpent: number;
  timestamp: string;
}

export interface LearningBehavior {
  modulesCompleted: number[];
  totalTimeSpent: number;
  timePerModule: { [key: number]: number };
  quizzesAttempted: number;
  simulatorInteractions: number;
  timelineViews: number;
}

export interface UserContext {
  ageRange: string | null;
  techProficiency: string | null;
  priorPrivacyKnowledge: string | null;
}

export interface SessionData {
  sessionId: string;
  startTimestamp: string;
  preAssessment: PreAssessment | null;
  postAssessment: PostAssessment | null;
  behavior: LearningBehavior;
  userContext: UserContext;
  userName: string | null;
  feedback: string | null;
}

export interface SessionTrackingContextType {
  sessionData: SessionData;
  setPreAssessment: (data: PreAssessment) => void;
  setPostAssessment: (data: PostAssessment) => void;
  addCompletedModule: (moduleId: number, timeSpent: number) => void;
  addQuizAttempt: () => void;
  addSimulatorInteraction: () => void;
  addTimelineView: () => void;
  setUserContext: (context: Partial<UserContext>) => void;
  setUserName: (name: string) => void;
  setFeedback: (feedback: string) => void;
  getSessionData: () => SessionData;
  resetSession: () => void;
}
