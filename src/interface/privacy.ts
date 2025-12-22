export interface Permission {
  id: number;
  category: string;
  name: string;
  description: string;
  protectionTip: string;
  sensitivity: string;
  riskScore: number;
}

export interface Tracker {
  id: number;
  name: string;
  purpose: string;
  description: string;
  protectionTip: string;
  riskScore: number;
}

export interface Sensor {
  id: number;
  name: string;
  description: string;
  riskScore: number;
  possibleInterference: string;
}
