import {
  Shield,
  Eye,
  Radio,
  DollarSign,
  Lightbulb,
  Database,
} from "lucide-react";
import { Module } from "../interface/assessment";

// Learning modules
const modules: Module[] = [
  {
    id: 1,
    title: "Data Collection Basics",
    icon: Database,
    color: "from-blue-500 to-cyan-500",
    summary:
      "Mobile apps collect data through three primary mechanisms: permissions (explicit access requests), tracking SDKs (embedded third-party code), and sensors (device hardware). Understanding these mechanisms is fundamental to privacy awareness.",
    keyPoints: [
      "Apps request permissions to access sensitive device features like location, camera, and contacts",
      "Tracking SDKs are third-party libraries embedded in apps that collect behavioral data",
      "Device sensors like accelerometers and gyroscopes can infer activity and behavior patterns",
      "Data collection often happens in the background without user awareness",
    ],
    examples: [
      "A weather app requesting location to show local forecasts",
      "A social media app embedding Facebook Analytics SDK to track user engagement",
      "A fitness app using accelerometer data to count steps",
    ],
    protectionTips: [
      "Review permissions before installing apps",
      "Regularly audit which apps have access to sensitive data",
      "Understand that 'free' apps monetize through data collection",
    ],
    linkTo: "/categories",
    quiz: [
      {
        id: 1,
        question: "Which of these is NOT a primary data collection mechanism?",
        type: "multiple",
        options: ["Permissions", "Tracking SDKs", "Sensors", "App Reviews"],
        correctAnswer: 3,
        topic: "Basics",
        explanation:
          "App reviews are user-generated content, not a data collection mechanism. The three primary mechanisms are permissions, tracking SDKs, and sensors.",
      },
      {
        id: 2,
        question:
          "True or False: Apps always notify you when collecting data through sensors.",
        type: "truefalse",
        options: ["True", "False"],
        correctAnswer: 1,
        topic: "Basics",
        explanation:
          "False. Sensor data collection often happens silently in the background without explicit user notification.",
      },
    ],
  },
  {
    id: 2,
    title: "Permissions & Privacy Risks",
    icon: Shield,
    color: "from-purple-500 to-pink-500",
    summary:
      "Android permissions control app access to sensitive device features. High-risk permissions like location, camera, and microphone enable extensive surveillance and profiling. Understanding permission risk levels helps users make informed decisions.",
    keyPoints: [
      "Location permissions enable 24/7 tracking and routine identification",
      "Camera and microphone access allow visual and audio surveillance",
      "Contact access reveals social networks and relationships",
      "Storage permissions expose photos, documents, and metadata",
      "Permission combinations amplify tracking capabilities",
    ],
    examples: [
      "A navigation app with 'Always Allow' location can track you even when not in use",
      "A shopping app with camera access can scan and analyze products in your home",
      "A messaging app with contact access can map your entire social graph",
    ],
    protectionTips: [
      "Use 'While Using App' instead of 'Always Allow' for location",
      "Revoke permissions for apps you rarely use",
      "Question why apps need certain permissions for their core functionality",
    ],
    linkTo: "/privacy-guide",
    quiz: [
      {
        id: 1,
        question: "Which permission combination is most privacy-invasive?",
        type: "multiple",
        options: [
          "Vibrate + Internet",
          "Location + Contacts + Microphone",
          "Flashlight + Storage",
          "Notifications + Network State",
        ],
        correctAnswer: 1,
        topic: "Permissions",
        explanation:
          "Location + Contacts + Microphone enables comprehensive surveillance: tracking where you are, who you know, and what you say.",
      },
    ],
  },
  {
    id: 3,
    title: "Trackers & Profiling",
    icon: Eye,
    color: "from-orange-500 to-red-500",
    summary:
      "Tracking SDKs are third-party software libraries embedded in apps that collect behavioral data for advertising, analytics, and profiling. They enable cross-app tracking, creating comprehensive user profiles across your entire digital footprint.",
    keyPoints: [
      "Common trackers include Google Ads SDK, Facebook Analytics, Firebase, and Appsflyer",
      "Trackers collect device identifiers, behavioral patterns, and engagement metrics",
      "Cross-app tracking links your behavior across multiple applications",
      "Data is shared with advertisers, data brokers, and analytics companies",
      "Ad networks build psychographic profiles for targeted advertising",
    ],
    examples: [
      "Google Ads SDK tracking your app usage to show relevant ads across the internet",
      "Facebook Analytics monitoring your behavior even in non-Facebook apps",
      "Mixpanel tracking every button click and screen view to optimize engagement",
    ],
    protectionTips: [
      "Reset your advertising ID monthly to break tracking continuity",
      "Opt out of personalized ads in device settings",
      "Use privacy-focused app alternatives when available",
    ],
    linkTo: "/privacy-guide",
    quiz: [
      {
        id: 1,
        question: "What enables trackers to follow you across multiple apps?",
        type: "multiple",
        options: [
          "Your email address",
          "Advertising identifiers (IDFA/AAID)",
          "Your phone number",
          "Your device brand",
        ],
        correctAnswer: 1,
        topic: "Trackers",
        explanation:
          "Advertising identifiers like IDFA (iOS) and AAID (Android) are unique IDs that enable cross-app tracking across your device.",
      },
    ],
  },
  {
    id: 4,
    title: "Sensors & Inference",
    icon: Radio,
    color: "from-green-500 to-emerald-500",
    summary:
      "Device sensors like accelerometers, gyroscopes, and magnetometers collect motion and orientation data. While seemingly innocuous, sensor data enables sophisticated inference of activities, behaviors, and even personal characteristics without explicit permissions.",
    keyPoints: [
      "Accelerometers detect movement patterns and activity types",
      "Gyroscopes measure device rotation and orientation",
      "Magnetometers determine compass direction for navigation",
      "Sensor fusion combines data to infer complex behaviors",
      "No explicit permissions required for most sensor access",
    ],
    examples: [
      "Accelerometer data revealing if you're walking, running, driving, or stationary",
      "Step counter sensors identifying your daily activity patterns and locations",
      "Proximity sensors detecting when your phone is near your face during calls",
    ],
    protectionTips: [
      "Be aware that sensors don't require permissions but still collect data",
      "Limit background app activity to reduce sensor data collection",
      "Understand that 'free' apps may monetize sensor-derived insights",
    ],
    linkTo: "/privacy-guide",
    quiz: [
      {
        id: 1,
        question:
          "True or False: Apps need explicit permission to access accelerometer data.",
        type: "truefalse",
        options: ["True", "False"],
        correctAnswer: 1,
        topic: "Sensors",
        explanation:
          "False. Most motion sensors like accelerometers can be accessed without explicit user permissions, making them a privacy concern.",
      },
    ],
  },
  {
    id: 5,
    title: "Economic Value of Data",
    icon: DollarSign,
    color: "from-yellow-500 to-orange-500",
    summary:
      "Personal data is a commodity with real economic value. Location data, browsing behavior, and purchase history are bought and sold in massive data broker markets. Understanding your data's worth reveals the true business model behind 'free' apps.",
    keyPoints: [
      "Location data is worth $1.80+ per user annually",
      "Social media platforms generate $200-500 per US user per year",
      "Data broker industry valued at $278 billion globally in 2024",
      "High-quality data commands premium prices from advertisers",
      "Your digital profile is traded across multiple platforms and partners",
    ],
    examples: [
      "A navigation app selling your location patterns to retailers for $10.80/year",
      "Social media platforms monetizing your engagement data for targeted ads",
      "Shopping apps analyzing purchase behavior to predict future spending",
    ],
    protectionTips: [
      "Recognize that 'free' apps profit from your data",
      "Consider paid alternatives that don't rely on data monetization",
      "Understand your data rights under GDPR, CCPA, and other privacy laws",
    ],
    linkTo: "/privacy-economics",
    quiz: [
      {
        id: 1,
        question:
          "What makes location data particularly valuable to advertisers?",
        type: "multiple",
        options: [
          "It's easy to collect",
          "It reveals routines, habits, income level, and lifestyle",
          "It's required by law",
          "It uses less battery",
        ],
        correctAnswer: 1,
        topic: "Economics",
        explanation:
          "Location data reveals where you live, work, shop, and socialize—enabling precise demographic and lifestyle targeting.",
      },
    ],
  },
  {
    id: 6,
    title: "Protection Strategies",
    icon: Lightbulb,
    color: "from-indigo-500 to-purple-500",
    summary:
      "Privacy protection requires proactive strategies: permission management, tracker blocking, advertising controls, and informed app selection. While perfect privacy is impossible, these techniques significantly reduce data exposure and tracking.",
    keyPoints: [
      "Review and revoke unnecessary permissions regularly",
      "Use 'While Using App' instead of 'Always Allow' for location",
      "Reset advertising identifiers monthly",
      "Disable ad personalization in device settings",
      "Choose privacy-focused alternatives when available",
      "Read privacy policies before installing apps",
    ],
    examples: [
      "Setting location to 'While Using' for food delivery apps",
      "Using privacy-focused browsers that block trackers",
      "Choosing Signal over WhatsApp for messaging privacy",
    ],
    protectionTips: [
      "Android: Settings > Privacy > Permission Manager to review all permissions",
      "iOS: Settings > Privacy & Security to manage access",
      "Regularly audit installed apps and remove unused ones",
      "Enable 'Ask App Not to Track' on iOS",
      "Use DNS-based ad blockers for system-wide protection",
    ],
    linkTo: "/privacy-guide",
    quiz: [
      {
        id: 1,
        question: "Which action provides the MOST privacy protection?",
        type: "multiple",
        options: [
          "Changing your wallpaper",
          "Regularly reviewing and revoking permissions",
          "Updating app names",
          "Restarting your phone daily",
        ],
        correctAnswer: 1,
        topic: "Protection",
        explanation:
          "Regularly auditing and revoking unnecessary permissions is one of the most effective ways to limit data collection.",
      },
    ],
  },
];

export default modules;
