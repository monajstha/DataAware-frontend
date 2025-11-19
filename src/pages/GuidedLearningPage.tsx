import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  CheckCircle,
  Circle,
  Lock,
  ChevronRight,
  ChevronLeft,
  Award,
  TrendingUp,
  BookOpen,
  Shield,
  Eye,
  Radio,
  DollarSign,
  Lightbulb,
  Target,
  Database,
  Brain,
  X,
  MessageSquare,
  Play,
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  type: "multiple" | "truefalse";
  options?: string[];
  correctAnswer: number;
  topic: string;
  explanation: string;
}

interface Module {
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

const GuidedLearning: React.FC = () => {
  const [stage, setStage] = useState<
    "intro" | "pre-test" | "learning" | "post-test" | "results"
  >("intro");
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [preTestAnswers, setPreTestAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [postTestAnswers, setPostTestAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Assessment questions - Demystifying privacy for general users
  const assessmentQuestions: Question[] = [
    {
      id: 1,
      question:
        "You mention wanting to buy running shoes to your friend in person (not online). The next day, you see ads for running shoes on Instagram. What's most likely happening?",
      type: "multiple",
      options: [
        "Your phone's microphone is always listening to your conversations",
        "Apps are tracking your location, contacts, and browsing to predict your interests",
        "It's just a coincidence",
        "Someone in your contacts searched for shoes",
      ],
      correctAnswer: 1,
      topic: "Myths",
      explanation:
        "While it feels like your phone is listening, it's more likely that apps tracked your location (were you near a running store?), noticed you searched for fitness content, or saw your friend's searches. This combination creates eerily accurate predictions without actually listening.",
    },
    {
      id: 2,
      question:
        "True or False: If you deny an app's permission request, that app cannot collect any data about you.",
      type: "truefalse",
      options: ["True", "False"],
      correctAnswer: 1,
      topic: "Misconceptions",
      explanation:
        "False. Apps can still collect lots of data without permissions: your IP address, device type, how long you use the app, which buttons you tap, and anything you voluntarily type or post. Permissions just control access to specific phone features.",
    },
    {
      id: 3,
      question:
        "You search for beach vacations on Google, then later see vacation ads on a completely different app. How is this possible?",
      type: "multiple",
      options: [
        "The apps are secretly sharing your screen",
        "Advertising networks track you across different apps using identifiers",
        "Your internet provider is selling your searches",
        "All apps can see what you do in other apps",
      ],
      correctAnswer: 1,
      topic: "Tracking",
      explanation:
        "Advertising networks like Google Ads use a unique identifier on your phone to follow you across different apps and websites. When you search in one place, they show related ads everywhere else you go.",
    },
    {
      id: 4,
      question:
        "Your fitness app knows when you're walking, running, or driving without you telling it. How does it know?",
      type: "multiple",
      options: [
        "It watches your screen activity",
        "It uses motion sensors that detect your movement patterns",
        "It guesses based on the time of day",
        "Someone else told it",
      ],
      correctAnswer: 1,
      topic: "Sensors",
      explanation:
        "Your phone has motion sensors (accelerometer, gyroscope) that detect how you're moving. Apps can access this data without special permissions and use it to figure out if you're walking, running, driving, or even what type of exercise you're doing.",
    },
    {
      id: 5,
      question:
        "True or False: Closing or force-stopping an app completely stops it from collecting your data.",
      type: "truefalse",
      options: ["True", "False"],
      correctAnswer: 1,
      topic: "Misconceptions",
      explanation:
        "False. Many apps can still collect data in the background, especially if you granted 'Always Allow' for location. Some apps also sync data when you reopen them. To truly stop data collection, you need to revoke permissions or delete the app.",
    },
    {
      id: 6,
      question:
        "A free social media app makes billions in profit despite charging users nothing. What's really happening?",
      type: "multiple",
      options: [
        "They have generous investors who love losing money",
        "They make money from premium features only",
        "They collect your data and sell insights to advertisers",
        "They earn from app store placements",
      ],
      correctAnswer: 2,
      topic: "Economics",
      explanation:
        "When an app is free, YOU are the product. These apps collect detailed data about your behavior, interests, and connections, then sell access to advertisers who want to target people exactly like you. Your attention and data have real monetary value.",
    },
    {
      id: 7,
      question:
        "You use 'incognito mode' on your browser while shopping. Does this keep your shopping activity completely private?",
      type: "multiple",
      options: [
        "Yes, incognito mode makes you completely invisible",
        "No, it only hides from your local device - websites, apps, and your internet provider can still track you",
        "Yes, but only if you also turn off WiFi",
        "No one can track anything you do on your phone",
      ],
      correctAnswer: 1,
      topic: "Misconceptions",
      explanation:
        "Incognito mode only prevents your phone from saving your browsing history locally. The websites you visit, your internet provider, and any apps you use can still track everything you do. It's private from people using your device, not from companies online.",
    },
    {
      id: 8,
      question:
        "A navigation app asks for 'Always Allow' location access. What does this really mean for your privacy?",
      type: "multiple",
      options: [
        "It only tracks you while navigating",
        "It tracks everywhere you go 24/7, even when you're not using the app",
        "It just shows your current city",
        "Location tracking stops when you close the app",
      ],
      correctAnswer: 1,
      topic: "Permissions",
      explanation:
        "'Always Allow' means the app can track your location constantly, even in the background. This reveals where you live, work, shop, and socialize. Choose 'While Using App' instead - navigation still works, but tracking stops when you close the app.",
    },
    {
      id: 9,
      question:
        "True or False: Deleting an app from your phone immediately removes all the data that app collected about you.",
      type: "truefalse",
      options: ["True", "False"],
      correctAnswer: 1,
      topic: "Misconceptions",
      explanation:
        "False. Deleting the app removes it from your phone, but the company still has all the data they collected about you stored on their servers. To truly delete your data, you usually need to contact the company or use account deletion features before uninstalling.",
    },
    {
      id: 10,
      question:
        "Your friend asks: 'I have nothing to hide, so why should I care about privacy?' What's the best response?",
      type: "multiple",
      options: [
        "You're right, only criminals need privacy",
        "Privacy isn't about hiding - it's about controlling who profits from your information and preventing manipulation",
        "Privacy doesn't matter anymore in the digital age",
        "You should only care if you're doing something wrong",
      ],
      correctAnswer: 1,
      topic: "Understanding",
      explanation:
        "Privacy isn't about hiding bad things. It's about having control over your personal information, preventing manipulation through targeted ads and content, avoiding discrimination (like higher prices based on your data), and not letting companies profit from your life without your informed consent.",
    },
  ];

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
          question:
            "Which of these is NOT a primary data collection mechanism?",
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

  // Calculate scores
  const calculateScore = (answers: { [key: number]: number }) => {
    let correct = 0;
    assessmentQuestions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    return Math.round((correct / assessmentQuestions.length) * 100);
  };

  const preTestScore = calculateScore(preTestAnswers);
  const postTestScore = calculateScore(postTestAnswers);
  const improvement = postTestScore - preTestScore;

  // Module completion
  const markModuleComplete = (moduleId: number) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const canAccessModule = (moduleId: number) => {
    if (moduleId === 1) return true;
    return completedModules.includes(moduleId - 1);
  };

  const allModulesComplete = completedModules.length === modules.length;

  // Render assessment
  const renderAssessment = (isPreTest: boolean) => {
    const answers = isPreTest ? preTestAnswers : postTestAnswers;
    const setAnswers = isPreTest ? setPreTestAnswers : setPostTestAnswers;
    const allAnswered =
      Object.keys(answers).length === assessmentQuestions.length;

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {isPreTest ? "Pre-Assessment" : "Post-Assessment"}
          </h2>
          <p className="text-gray-600 mb-6">
            {isPreTest
              ? "Test your current knowledge about mobile app privacy. This helps us measure your learning progress."
              : "Let's see how much you've learned! Answer the same questions to measure your improvement."}
          </p>
          <div className="flex items-center justify-between mb-6 p-4 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium text-blue-900">
              Progress: {Object.keys(answers).length} /{" "}
              {assessmentQuestions.length}
            </span>
            <div className="w-48 h-2 bg-blue-200 rounded-full">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{
                  width: `${
                    (Object.keys(answers).length / assessmentQuestions.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {assessmentQuestions.map((q, index) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-indigo-600">
                    {index + 1}
                  </span>
                </div>
                <p className="text-lg font-medium text-gray-900 flex-1">
                  {q.question}
                </p>
              </div>

              <div className="ml-12 space-y-3">
                {q.options?.map((option, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      answers[q.id] === idx
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q${q.id}`}
                      checked={answers[q.id] === idx}
                      onChange={() => setAnswers({ ...answers, [q.id]: idx })}
                      className="w-5 h-5 text-indigo-600"
                    />
                    <span className="text-gray-800">{option}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => {
              if (isPreTest) {
                setStage("learning");
              } else {
                setStage("results");
              }
            }}
            disabled={!allAnswered}
            className="flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPreTest ? "Start Learning" : "View Results"}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-10 h-10" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Guided Learning Journey
              </h1>
            </div>
            <p className="text-xl text-indigo-50 leading-relaxed max-w-3xl">
              Master mobile privacy through structured learning. Test your
              knowledge, learn essential concepts, and measure your improvement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <AnimatePresence mode="wait">
          {/* Intro Stage */}
          {stage === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Welcome to Your Privacy Education Journey
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  This guided learning experience will help you understand how
                  mobile apps collect, use, and monetize your personal data.
                  You'll progress through 6 modules covering essential privacy
                  concepts.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-left">
                  <h3 className="font-semibold text-blue-900 mb-3">
                    What to Expect:
                  </h3>
                  <ul className="space-y-2 text-blue-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
                      <span>
                        Pre-assessment to measure your starting knowledge
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
                      <span>
                        6 interactive learning modules with examples and tips
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
                      <span>Optional knowledge checks after each module</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
                      <span>Post-assessment to measure your improvement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
                      <span>Completion badge and feedback opportunity</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setStage("pre-test")}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Begin Pre-Assessment
                </button>
              </div>
            </motion.div>
          )}

          {/* Pre-Test Stage */}
          {stage === "pre-test" && (
            <motion.div
              key="pre-test"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {renderAssessment(true)}
            </motion.div>
          )}

          {/* Learning Stage */}
          {stage === "learning" && (
            <motion.div
              key="learning"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Learning Progress
                  </h3>
                  <span className="text-sm text-gray-600">
                    {completedModules.length} / {modules.length} modules
                    complete
                  </span>
                </div>
                <div className="flex gap-2">
                  {modules.map((module) => (
                    <div
                      key={module.id}
                      className={`flex-1 h-2 rounded-full transition-all ${
                        completedModules.includes(module.id)
                          ? "bg-green-500"
                          : currentModule + 1 === module.id
                          ? "bg-indigo-500"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Module Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {modules.map((module) => {
                  const isComplete = completedModules.includes(module.id);
                  const isCurrent = currentModule + 1 === module.id;
                  const canAccess = canAccessModule(module.id);
                  const IconComponent = module.icon;

                  return (
                    <motion.button
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: module.id * 0.05 }}
                      onClick={() => {
                        if (canAccess) {
                          setCurrentModule(module.id - 1);
                        }
                      }}
                      disabled={!canAccess}
                      className={`text-left p-6 rounded-xl border-2 transition-all ${
                        isCurrent
                          ? "border-indigo-500 bg-indigo-50 shadow-lg"
                          : isComplete
                          ? "border-green-500 bg-green-50 hover:shadow-md"
                          : canAccess
                          ? "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                          : "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-12 h-12 bg-linear-to-br ${module.color} rounded-xl flex items-center justify-center`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        {isComplete ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : canAccess ? (
                          <Circle className="w-6 h-6 text-gray-300" />
                        ) : (
                          <Lock className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Module {module.id}: {module.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isComplete
                          ? "Completed"
                          : canAccess
                          ? "Available"
                          : "Locked"}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              {/* Current Module Content */}
              {currentModule < modules.length && (
                <motion.div
                  key={currentModule}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12"
                >
                  <div
                    className={`w-16 h-16 bg-linear-to-br ${modules[currentModule].color} rounded-xl flex items-center justify-center mb-6`}
                  >
                    {React.createElement(modules[currentModule].icon, {
                      className: "w-8 h-8 text-white",
                    })}
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Module {modules[currentModule].id}:{" "}
                    {modules[currentModule].title}
                  </h2>

                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {modules[currentModule].summary}
                  </p>

                  {/* Key Points */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                    <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      Key Concepts
                    </h3>
                    <ul className="space-y-3">
                      {modules[currentModule].keyPoints.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-blue-800"
                        >
                          <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Examples */}
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
                    <h3 className="font-semibold text-purple-900 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Real-World Examples
                    </h3>
                    <ul className="space-y-3">
                      {modules[currentModule].examples.map((example, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-purple-800"
                        >
                          <div className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-purple-900">
                              {idx + 1}
                            </span>
                          </div>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Protection Tips */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                    <h3 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Protection Tips
                    </h3>
                    <ul className="space-y-3">
                      {modules[currentModule].protectionTips.map((tip, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-green-800"
                        >
                          <Lightbulb className="w-5 h-5 mt-0.5 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Learn More Link */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Explore More
                    </h3>
                    <p className="text-gray-600 mb-4">
                      For detailed information and interactive tools, visit our
                      comprehensive resources.
                    </p>
                    <button
                      onClick={() =>
                        (window.location.href = modules[currentModule].linkTo)
                      }
                      className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Visit Resource Page
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Optional Quiz */}
                  {!showQuiz && modules[currentModule].quiz && (
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="w-full py-4 bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-300 text-yellow-900 font-semibold rounded-lg transition-all mb-4"
                    >
                      Test Your Knowledge (Optional)
                    </button>
                  )}

                  {/* Quiz Content */}
                  {showQuiz && modules[currentModule].quiz && (
                    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-8">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-yellow-900 flex items-center gap-2">
                          <Brain className="w-5 h-5" />
                          Knowledge Check
                        </h3>
                        <button
                          onClick={() => {
                            setShowQuiz(false);
                            setQuizAnswers({});
                          }}
                          className="text-yellow-700 hover:text-yellow-900"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-6">
                        {modules[currentModule].quiz!.map((q, idx) => {
                          const answered = quizAnswers[q.id] !== undefined;
                          const isCorrect =
                            quizAnswers[q.id] === q.correctAnswer;

                          return (
                            <div key={q.id} className="bg-white rounded-lg p-5">
                              <p className="font-medium text-gray-900 mb-4">
                                {idx + 1}. {q.question}
                              </p>
                              <div className="space-y-2 mb-4">
                                {q.options?.map((option, optIdx) => (
                                  <label
                                    key={optIdx}
                                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                      answered
                                        ? optIdx === q.correctAnswer
                                          ? "border-green-500 bg-green-50"
                                          : quizAnswers[q.id] === optIdx
                                          ? "border-red-500 bg-red-50"
                                          : "border-gray-200"
                                        : quizAnswers[q.id] === optIdx
                                        ? "border-indigo-500 bg-indigo-50"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      checked={quizAnswers[q.id] === optIdx}
                                      onChange={() =>
                                        setQuizAnswers({
                                          ...quizAnswers,
                                          [q.id]: optIdx,
                                        })
                                      }
                                      disabled={answered}
                                      className="w-4 h-4"
                                    />
                                    <span className="text-gray-800">
                                      {option}
                                    </span>
                                    {answered && optIdx === q.correctAnswer && (
                                      <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                                    )}
                                  </label>
                                ))}
                              </div>
                              {answered && (
                                <div
                                  className={`p-4 rounded-lg ${
                                    isCorrect ? "bg-green-100" : "bg-blue-100"
                                  }`}
                                >
                                  <p
                                    className={`text-sm ${
                                      isCorrect
                                        ? "text-green-800"
                                        : "text-blue-800"
                                    }`}
                                  >
                                    {isCorrect ? "✓ Correct! " : "ℹ "}
                                    {q.explanation}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <button
                      onClick={() => {
                        if (currentModule > 0) {
                          setCurrentModule(currentModule - 1);
                          setShowQuiz(false);
                          setQuizAnswers({});
                        }
                      }}
                      disabled={currentModule === 0}
                      className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Previous Module
                    </button>

                    {currentModule < modules.length - 1 ? (
                      <button
                        onClick={() => {
                          markModuleComplete(modules[currentModule].id);
                          setCurrentModule(currentModule + 1);
                          setShowQuiz(false);
                          setQuizAnswers({});
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                      >
                        Next Module
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          markModuleComplete(modules[currentModule].id);
                          setStage("post-test");
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        Complete Learning & Take Post-Test
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Early Post-Test Access */}
              {allModulesComplete && (
                <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    All Modules Completed!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    You've finished all learning modules. Ready to test your
                    knowledge?
                  </p>
                  <button
                    onClick={() => setStage("post-test")}
                    className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Take Post-Assessment
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Post-Test Stage */}
          {stage === "post-test" && (
            <motion.div
              key="post-test"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {renderAssessment(false)}
            </motion.div>
          )}

          {/* Results Stage */}
          {stage === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center mb-8">
                <div className="w-24 h-24 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Award className="w-12 h-12 text-white" />
                </div>

                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Congratulations!
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  You've completed the Guided Learning Journey
                </p>

                {/* Score Comparison */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <p className="text-sm font-semibold text-blue-900 mb-2">
                      Pre-Assessment
                    </p>
                    <p className="text-5xl font-bold text-blue-600 mb-2">
                      {preTestScore}%
                    </p>
                    <p className="text-sm text-blue-700">Starting knowledge</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <p className="text-sm font-semibold text-green-900 mb-2">
                      Post-Assessment
                    </p>
                    <p className="text-5xl font-bold text-green-600 mb-2">
                      {postTestScore}%
                    </p>
                    <p className="text-sm text-green-700">Final knowledge</p>
                  </div>
                </div>

                {/* Improvement */}
                <div className="bg-linear-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-8 mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Your Improvement
                    </h3>
                  </div>
                  <p className="text-6xl font-bold text-purple-600 mb-2">
                    {improvement > 0 ? "+" : ""}
                    {improvement}%
                  </p>
                  <p className="text-lg text-purple-800">
                    {improvement > 50 &&
                      "Outstanding progress! You've mastered privacy concepts."}
                    {improvement > 30 &&
                      improvement <= 50 &&
                      "Great improvement! You've learned a lot."}
                    {improvement > 10 &&
                      improvement <= 30 &&
                      "Good progress! Keep building your knowledge."}
                    {improvement >= 0 &&
                      improvement <= 10 &&
                      "You maintained strong knowledge throughout."}
                    {improvement < 0 &&
                      "You started with strong knowledge. Keep it up!"}
                  </p>
                </div>

                {/* Badge */}
                <div className="bg-linear-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-8 mb-8">
                  <Award className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Privacy Awareness Badge Earned
                  </h3>
                  <p className="text-gray-600 mb-4">
                    You've completed all modules and assessments. You're now
                    equipped with essential privacy knowledge!
                  </p>
                  <div className="inline-block px-6 py-3 bg-yellow-400 text-yellow-900 font-bold rounded-lg shadow-md">
                    🏆 PRIVACY CHAMPION
                  </div>
                </div>

                {/* Topic Breakdown */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                  <h3 className="font-semibold text-gray-900 mb-4 text-center">
                    Topic Performance
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Permissions",
                      "Trackers",
                      "Economics",
                      "Sensors",
                      "Protection",
                    ].map((topic) => {
                      const topicQuestions = assessmentQuestions.filter(
                        (q) => q.topic === topic
                      );
                      const correct = topicQuestions.filter(
                        (q) => postTestAnswers[q.id] === q.correctAnswer
                      ).length;
                      const percentage =
                        topicQuestions.length > 0
                          ? (correct / topicQuestions.length) * 100
                          : 0;

                      return (
                        <div key={topic}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              {topic}
                            </span>
                            <span className="text-sm text-gray-600">
                              {Math.round(percentage)}%
                            </span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-full bg-linear-to-br from-indigo-500 to-purple-500 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Feedback */}
                {!showFeedback ? (
                  <button
                    onClick={() => setShowFeedback(true)}
                    className="flex items-center gap-2 mx-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Provide Feedback
                  </button>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 text-left">
                      Help Us Improve
                    </h3>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Share your thoughts about the learning experience, content clarity, or suggestions for improvement..."
                      className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                    />
                    <button
                      onClick={() => {
                        console.log("Feedback submitted:", feedback);
                        alert(
                          "Thank you for your feedback! It helps us improve the learning experience."
                        );
                        setShowFeedback(false);
                      }}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Submit Feedback
                    </button>
                  </div>
                )}
              </div>

              {/* Next Steps */}
              <div className="grid md:grid-cols-3 gap-6">
                <button
                  onClick={() => (window.location.href = "/scenarios")}
                  className="bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-lg rounded-xl p-6 text-left transition-all"
                >
                  <Play className="w-8 h-8 text-indigo-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Try Scenarios
                  </h3>
                  <p className="text-sm text-gray-600">
                    Experience interactive privacy simulations
                  </p>
                </button>

                <button
                  onClick={() => (window.location.href = "/privacy-guide")}
                  className="bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-lg rounded-xl p-6 text-left transition-all"
                >
                  <BookOpen className="w-8 h-8 text-indigo-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Explore Reference
                  </h3>
                  <p className="text-sm text-gray-600">
                    Deep dive into permissions and trackers
                  </p>
                </button>

                <button
                  onClick={() => (window.location.href = "/categories")}
                  className="bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-lg rounded-xl p-6 text-left transition-all"
                >
                  <Shield className="w-8 h-8 text-indigo-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Browse Categories
                  </h3>
                  <p className="text-sm text-gray-600">
                    See how different app types collect data
                  </p>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default GuidedLearning;
