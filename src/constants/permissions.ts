import { Users, Camera, Mic, Smartphone, MapPin } from "lucide-react";

// Types
interface Permission {
  name: string;
  icon: any;
  risk: number;
  value: number;
  inferences: string[];
}
// Available permissions for simulator
const availablePermissions: Permission[] = [
  {
    name: "Location",
    icon: MapPin,
    risk: 0.85,
    value: 1.8,
    inferences: [
      "Home/work address",
      "Daily routines",
      "Travel patterns",
      "Income level",
      "Lifestyle preferences",
    ],
  },
  {
    name: "Camera",
    icon: Camera,
    risk: 0.75,
    value: 0.9,
    inferences: [
      "Facial recognition",
      "Social connections",
      "Interests",
      "Physical appearance",
      "Locations visited",
    ],
  },
  {
    name: "Microphone",
    icon: Mic,
    risk: 0.7,
    value: 0.8,
    inferences: [
      "Voice patterns",
      "Ambient conversations",
      "Media consumption",
      "Language preferences",
    ],
  },
  {
    name: "Contacts",
    icon: Users,
    risk: 0.65,
    value: 0.7,
    inferences: [
      "Social network",
      "Professional connections",
      "Family relationships",
      "Communication patterns",
    ],
  },
  {
    name: "Storage",
    icon: Smartphone,
    risk: 0.6,
    value: 0.5,
    inferences: [
      "Photos metadata",
      "Document types",
      "App usage",
      "Personal interests",
    ],
  },
];

export default availablePermissions;
