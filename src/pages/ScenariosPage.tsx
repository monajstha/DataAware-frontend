import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Shield,
  MapPin,
  ShoppingBag,
  Heart,
  Users,
  Camera,
  Mic,
  Smartphone,
  DollarSign,
  Eye,
  TrendingUp,
  User,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  Zap,
} from "lucide-react";

// Types
interface Permission {
  name: string;
  icon: any;
  risk: number;
  value: number;
  inferences: string[];
}

interface ScenarioStep {
  title: string;
  description: string;
  action?: string;
  dataCollected?: string[];
  choice?: {
    question: string;
    options: Array<{ text: string; outcome: string }>;
  };
}

interface Scenario {
  id: string;
  name: string;
  icon: any;
  color: string;
  steps: ScenarioStep[];
}

const Scenarios: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "walkthroughs" | "simulator" | "timeline"
  >("walkthroughs");
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(
    null
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [userChoices, setUserChoices] = useState<{ [key: number]: number }>({});

  // Simulator state
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Social Media");

  // Timeline state
  const [timelineStage, setTimelineStage] = useState<
    "day1" | "week1" | "month1" | "month6" | "year1"
  >("day1");

  // Analytics tracking
  const [analytics, setAnalytics] = useState({
    tabStartTime: Date.now(),
    scenariosCompleted: [] as string[],
    simulatorInteractions: 0,
    timelineViews: 0,
  });

  // Track tab changes
  useEffect(() => {
    const timeSpent = Date.now() - analytics.tabStartTime;
    console.log(`Time spent on previous tab: ${timeSpent}ms`);
    setAnalytics((prev) => ({ ...prev, tabStartTime: Date.now() }));
  }, [activeTab]);

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

  // Scenarios data
  const scenarios: Scenario[] = [
    {
      id: "social",
      name: "Social Media App",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      steps: [
        {
          title: "App Installation",
          description:
            "You download a popular social media app to stay connected with friends and share photos.",
          action: "Install App",
        },
        {
          title: "Permission Requests",
          description:
            "The app requests access to your camera, microphone, location, and contacts.",
          choice: {
            question: "What do you do?",
            options: [
              {
                text: "Allow All",
                outcome:
                  "Maximum tracking enabled. The app can now build a comprehensive profile.",
              },
              {
                text: "Allow Some",
                outcome:
                  "Partial tracking. You limit some exposure but the app still collects significant data.",
              },
              {
                text: "Deny All",
                outcome:
                  "Limited functionality. You can't post photos or find friends, but your privacy is protected.",
              },
            ],
          },
        },
        {
          title: "Daily Usage",
          description:
            "Over the next week, you post 10 photos, like 200 posts, and spend 2 hours daily on the app.",
          dataCollected: [
            "15 location data points",
            "10 photos analyzed",
            "200 engagement patterns",
            "50 social connections mapped",
          ],
        },
        {
          title: "Profile Building",
          description:
            "The app's algorithms analyze your behavior to understand your interests, demographics, and social circle.",
          dataCollected: [
            "Age: 25-34",
            "Interests: Fitness, Travel, Food",
            "Income: $50K+",
            "Urban lifestyle",
            "Social influence score",
          ],
        },
        {
          title: "Ad Targeting",
          description:
            "Within 2 weeks, you start seeing highly targeted ads for products matching your exact interests and recent conversations.",
          action: "Monetization Active",
          dataCollected: [
            "Ad impressions: 500+",
            "Click-through rate tracked",
            "Purchase intent scored",
            "Data sold to 12 ad partners",
          ],
        },
        {
          title: "Long-term Impact",
          description:
            "After 6 months, the app has created a detailed behavioral profile worth $18 in ad revenue. Your data is shared with dozens of third parties.",
          dataCollected: [
            "3,650 location points",
            "450 photos analyzed",
            "10,000+ interactions tracked",
            "Comprehensive psychographic profile",
          ],
        },
      ],
    },
    {
      id: "navigation",
      name: "Navigation App",
      icon: MapPin,
      color: "from-blue-500 to-cyan-500",
      steps: [
        {
          title: "First Launch",
          description:
            "You install a navigation app to help with daily commutes and finding new places.",
          action: "Install App",
        },
        {
          title: "Location Access",
          description:
            "The app requests 'Always Allow' location access to provide turn-by-turn directions.",
          choice: {
            question: "How do you respond?",
            options: [
              {
                text: "Always Allow",
                outcome:
                  "24/7 location tracking begins. The app knows everywhere you go.",
              },
              {
                text: "While Using",
                outcome:
                  "Location tracked only during active use. Some features limited but better privacy.",
              },
              {
                text: "Deny",
                outcome: "App cannot function. No navigation available.",
              },
            ],
          },
        },
        {
          title: "Pattern Recognition",
          description:
            "After 1 week of use, the app identifies your home, workplace, and frequent destinations.",
          dataCollected: [
            "Home address identified",
            "Work location tracked",
            "3 favorite restaurants",
            "Gym visit patterns",
            "Weekend travel habits",
          ],
        },
        {
          title: "Behavioral Inference",
          description:
            "The app now knows your daily routine, income bracket (based on neighborhood), and lifestyle preferences.",
          dataCollected: [
            "Commute time: 8am, 6pm",
            "Affluent neighborhood",
            "Health-conscious (gym visits)",
            "Social life patterns",
            "Shopping locations",
          ],
        },
        {
          title: "Data Monetization",
          description:
            "Your location data is anonymized and sold to advertisers, retailers, and data brokers.",
          dataCollected: [
            "Real-time location stream",
            "Visit frequency to businesses",
            "Dwell time analytics",
            "Movement patterns",
            "Data shared with 15 partners",
          ],
        },
        {
          title: "Economic Value",
          description:
            "In 6 months, your location data generates $10.80 in revenue. Businesses use it for foot traffic analysis and targeted ads.",
          dataCollected: [
            "43,200 location pings",
            "200+ unique locations",
            "Complete mobility profile",
            "Predictive movement modeling",
          ],
        },
      ],
    },
    {
      id: "ecommerce",
      name: "E-commerce App",
      icon: ShoppingBag,
      color: "from-green-500 to-emerald-500",
      steps: [
        {
          title: "Account Creation",
          description:
            "You sign up for an online shopping app to browse products and find deals.",
          action: "Create Account",
        },
        {
          title: "Initial Permissions",
          description:
            "The app requests access to your location, camera (for visual search), and storage.",
          choice: {
            question: "What permissions do you grant?",
            options: [
              {
                text: "All Permissions",
                outcome:
                  "Full tracking capability. The app can analyze your shopping behavior comprehensively.",
              },
              {
                text: "Location Only",
                outcome:
                  "Reduced tracking. You get local deals but maintain some privacy.",
              },
              {
                text: "None",
                outcome:
                  "Basic functionality only. Limited personalization and features.",
              },
            ],
          },
        },
        {
          title: "Browsing Activity",
          description:
            "You browse 50 products across various categories: electronics, clothing, home goods.",
          dataCollected: [
            "50 product views",
            "15-minute avg session",
            "3 searches performed",
            "2 items added to cart",
            "Price sensitivity tracked",
          ],
        },
        {
          title: "Purchase Pattern Analysis",
          description:
            "After 2 purchases, the app builds a profile of your shopping habits, budget, and preferences.",
          dataCollected: [
            "Average order: $75",
            "Purchase frequency: bi-weekly",
            "Brand preferences identified",
            "Size/style preferences",
            "Payment method stored",
          ],
        },
        {
          title: "Recommendation Engine",
          description:
            "The app now shows highly personalized product recommendations based on your complete shopping profile.",
          dataCollected: [
            "Predicted purchases",
            "Cross-sell opportunities",
            "Upsell targets",
            "Abandoned cart tracking",
            "Email engagement metrics",
          ],
        },
        {
          title: "Data Ecosystem",
          description:
            "Your shopping data is worth $8.40/year. It's used for personalization and shared with brands and advertisers.",
          dataCollected: [
            "Complete purchase history",
            "Browsing patterns",
            "Price comparison behavior",
            "Category affinities",
            "Lifetime value prediction",
          ],
        },
      ],
    },
    {
      id: "fitness",
      name: "Fitness App",
      icon: Heart,
      color: "from-red-500 to-orange-500",
      steps: [
        {
          title: "Onboarding",
          description:
            "You install a fitness tracking app to monitor your workouts and health goals.",
          action: "Install & Setup",
        },
        {
          title: "Sensor Access",
          description:
            "The app requests access to your location, body sensors, and physical activity data.",
          choice: {
            question: "Do you grant access?",
            options: [
              {
                text: "Allow All",
                outcome:
                  "Comprehensive health tracking begins. The app monitors your every move and vital sign.",
              },
              {
                text: "Activity Only",
                outcome:
                  "Basic tracking without precise location. Health data collected but location privacy maintained.",
              },
              {
                text: "Manual Entry",
                outcome:
                  "No automatic tracking. You maintain privacy but lose convenience.",
              },
            ],
          },
        },
        {
          title: "Activity Tracking",
          description:
            "The app tracks your workouts, steps, heart rate, and sleep patterns daily.",
          dataCollected: [
            "Daily steps: 8,000 avg",
            "3 workouts/week",
            "Heart rate patterns",
            "Sleep quality data",
            "Calorie burn estimates",
          ],
        },
        {
          title: "Health Profile",
          description:
            "After 1 month, the app has detailed health metrics that reveal your fitness level, habits, and potential health risks.",
          dataCollected: [
            "Fitness level: Moderate",
            "Workout consistency",
            "Recovery patterns",
            "Stress indicators",
            "Activity locations mapped",
          ],
        },
        {
          title: "Third-party Integration",
          description:
            "Your health data is shared with insurance companies (for discounts) and wellness programs.",
          dataCollected: [
            "Aggregated health score",
            "Activity trends",
            "Lifestyle indicators",
            "Risk assessment data",
            "Engagement metrics",
          ],
        },
        {
          title: "Data Value",
          description:
            "Health data is highly valuable. Your 6-month profile is worth $15 to insurers, researchers, and marketers.",
          dataCollected: [
            "10,800 activity records",
            "Complete fitness profile",
            "Health predictions",
            "Lifestyle classification",
            "Monetization through partnerships",
          ],
        },
      ],
    },
  ];

  // Calculate risk score
  const calculateRiskScore = () => {
    if (selectedPermissions.length === 0) return 0;
    const totalRisk = selectedPermissions.reduce((sum, perm) => {
      const permission = availablePermissions.find((p) => p.name === perm);
      return sum + (permission?.risk || 0);
    }, 0);
    return Math.min(1, totalRisk / selectedPermissions.length);
  };

  // Calculate data value
  const calculateDataValue = () => {
    return selectedPermissions.reduce((sum, perm) => {
      const permission = availablePermissions.find((p) => p.name === perm);
      return sum + (permission?.value || 0);
    }, 0);
  };

  // Get all inferences
  const getAllInferences = () => {
    const inferences = new Set<string>();
    selectedPermissions.forEach((perm) => {
      const permission = availablePermissions.find((p) => p.name === perm);
      permission?.inferences.forEach((inf) => inferences.add(inf));
    });
    return Array.from(inferences);
  };

  // Get ad categories
  const getAdCategories = () => {
    const categories = [];
    if (selectedPermissions.includes("Location")) {
      categories.push("Local Businesses", "Real Estate", "Travel & Tourism");
    }
    if (selectedPermissions.includes("Camera")) {
      categories.push(
        "Fashion & Beauty",
        "Home Decor",
        "Events & Entertainment"
      );
    }
    if (selectedPermissions.includes("Microphone")) {
      categories.push("Music Services", "Podcasts", "Voice Assistants");
    }
    if (selectedPermissions.includes("Contacts")) {
      categories.push(
        "Social Networks",
        "Communication Apps",
        "Professional Services"
      );
    }
    if (selectedPermissions.includes("Storage")) {
      categories.push("Cloud Storage", "Photo Services", "Productivity Tools");
    }
    return categories;
  };

  // Timeline data
  const getTimelineData = () => {
    const stages = {
      day1: {
        label: "Day 1",
        dataPoints: 15,
        inferences: ["Basic demographics", "Initial interests"],
        value: 0.05,
        description:
          "Initial data collection begins. The app learns basic information about you.",
      },
      week1: {
        label: "Week 1",
        dataPoints: 105,
        inferences: [
          "Usage patterns",
          "Behavior trends",
          "Social connections",
          "Time preferences",
        ],
        value: 0.35,
        description:
          "Patterns emerge. The app starts understanding your habits and preferences.",
      },
      month1: {
        label: "Month 1",
        dataPoints: 450,
        inferences: [
          "Comprehensive profile",
          "Purchase intent",
          "Lifestyle classification",
          "Income estimation",
          "Interest categories",
        ],
        value: 1.5,
        description:
          "Profile solidifies. The app has enough data to accurately predict your behavior.",
      },
      month6: {
        label: "Month 6",
        dataPoints: 2700,
        inferences: [
          "Deep behavioral insights",
          "Life events tracking",
          "Social influence score",
          "Brand affinity",
          "Predictive modeling",
          "Risk assessment",
        ],
        value: 9.0,
        description:
          "Comprehensive understanding. The app knows you better than you know yourself.",
      },
      year1: {
        label: "Year 1",
        dataPoints: 5400,
        inferences: [
          "Complete digital identity",
          "Long-term trends",
          "Life stage prediction",
          "Future behavior modeling",
          "Cross-platform profile",
          "Maximum monetization",
        ],
        value: 18.0,
        description:
          "Full data maturity. Your profile is highly valuable and traded across multiple platforms.",
      },
    };
    return stages[timelineStage];
  };

  const getRiskLevel = (score: number) => {
    if (score >= 0.7)
      return { label: "High", color: "text-red-600 bg-red-100" };
    if (score >= 0.4)
      return { label: "Medium", color: "text-orange-600 bg-orange-100" };
    return { label: "Low", color: "text-green-600 bg-green-100" };
  };

  const riskScore = calculateRiskScore();
  const dataValue = calculateDataValue();
  const riskLevel = getRiskLevel(riskScore);
  const inferences = getAllInferences();
  const adCategories = getAdCategories();
  const timelineData = getTimelineData();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Play className="w-10 h-10" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Privacy Scenarios
              </h1>
            </div>
            <p className="text-xl text-indigo-50 leading-relaxed max-w-3xl">
              Experience real-world data collection scenarios. See how apps
              track you, build profiles, and monetize your information through
              interactive demonstrations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className="flex flex-wrap gap-2 border-b border-gray-200">
          {[
            {
              id: "walkthroughs" as const,
              label: "Interactive Walkthroughs",
              icon: Play,
            },
            {
              id: "simulator" as const,
              label: "Privacy Impact Simulator",
              icon: Zap,
            },
            {
              id: "timeline" as const,
              label: "Timeline Visualization",
              icon: Clock,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all border-b-2 ${
                activeTab === tab.id
                  ? "text-indigo-600 border-indigo-600"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <AnimatePresence mode="wait">
          {/* Tab 1: Walkthroughs */}
          {activeTab === "walkthroughs" && (
            <motion.div
              key="walkthroughs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {!selectedScenario ? (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Choose a Scenario
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Select an app type to see how data collection unfolds from
                    installation to long-term profiling.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {scenarios.map((scenario, index) => (
                      <motion.button
                        key={scenario.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        onClick={() => {
                          setSelectedScenario(scenario);
                          setCurrentStep(0);
                          setUserChoices({});
                        }}
                        className="bg-white border-2 border-gray-200 hover:border-indigo-400 rounded-2xl p-8 text-left transition-all hover:shadow-lg group"
                      >
                        <div
                          className={`w-16 h-16 bg-linear-to-br ${scenario.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                        >
                          <scenario.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {scenario.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {scenario.steps.length} steps · Interactive choices ·
                          Real data insights
                        </p>
                        <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                          Start Scenario
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {selectedScenario.name}
                      </h3>
                      <span className="text-sm text-gray-600">
                        Step {currentStep + 1} of{" "}
                        {selectedScenario.steps.length}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-linear-to-br ${selectedScenario.color} transition-all duration-500`}
                        style={{
                          width: `${
                            ((currentStep + 1) /
                              selectedScenario.steps.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Step Content */}
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12"
                  >
                    <div
                      className={`w-20 h-20 bg-linear-to-br ${selectedScenario.color} rounded-xl flex items-center justify-center mb-6`}
                    >
                      <selectedScenario.icon className="w-10 h-10 text-white" />
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {selectedScenario.steps[currentStep].title}
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      {selectedScenario.steps[currentStep].description}
                    </p>

                    {/* Choice */}
                    {selectedScenario.steps[currentStep].choice &&
                      !userChoices[currentStep] && (
                        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-6">
                          <p className="font-semibold text-gray-900 mb-4">
                            {
                              selectedScenario.steps[currentStep].choice!
                                .question
                            }
                          </p>
                          <div className="space-y-3">
                            {selectedScenario.steps[
                              currentStep
                            ].choice!.options.map((option, idx) => (
                              <button
                                key={idx}
                                onClick={() =>
                                  setUserChoices({
                                    ...userChoices,
                                    [currentStep]: idx,
                                  })
                                }
                                className="w-full text-left px-4 py-3 bg-white text-black hover:bg-indigo-50 border border-gray-300 hover:border-indigo-400 rounded-lg transition-all"
                              >
                                {option.text}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Outcome */}
                    {selectedScenario.steps[currentStep].choice &&
                      userChoices[currentStep] !== undefined && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
                          <p className="font-semibold text-yellow-900 mb-2">
                            Outcome:
                          </p>
                          <p className="text-yellow-800">
                            {
                              selectedScenario.steps[currentStep].choice!
                                .options[userChoices[currentStep]].outcome
                            }
                          </p>
                        </div>
                      )}

                    {/* Data Collected */}
                    {selectedScenario.steps[currentStep].dataCollected && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Database className="w-5 h-5 text-blue-600" />
                          <p className="font-semibold text-blue-900">
                            Data Collected:
                          </p>
                        </div>
                        <ul className="space-y-2">
                          {selectedScenario.steps[
                            currentStep
                          ].dataCollected!.map((data, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-blue-800"
                            >
                              <CheckCircle className="w-4 h-4 mt-1 shrink-0" />
                              <span>{data}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <button
                        onClick={() => {
                          if (currentStep === 0) {
                            setSelectedScenario(null);
                            setCurrentStep(0);
                            setUserChoices({});
                          } else {
                            setCurrentStep(currentStep - 1);
                          }
                        }}
                        className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        {currentStep === 0 ? "Back to Scenarios" : "Previous"}
                      </button>

                      {currentStep < selectedScenario.steps.length - 1 ? (
                        <button
                          onClick={() => setCurrentStep(currentStep + 1)}
                          disabled={
                            selectedScenario.steps[currentStep].choice &&
                            userChoices[currentStep] === undefined
                          }
                          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next Step
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setAnalytics((prev) => ({
                              ...prev,
                              scenariosCompleted: [
                                ...prev.scenariosCompleted,
                                selectedScenario.id,
                              ],
                            }));
                            setSelectedScenario(null);
                            setCurrentStep(0);
                            setUserChoices({});
                          }}
                          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Complete Scenario
                        </button>
                      )}
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}

          {/* Tab 2: Simulator */}
          {activeTab === "simulator" && (
            <motion.div
              key="simulator"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Privacy Impact Simulator
              </h2>
              <p className="text-gray-600 mb-8">
                Select permissions to see real-time privacy risks, data value,
                profile inferences, and ad targeting impacts.
              </p>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left: Controls */}
                <div className="space-y-6">
                  {/* Category Selection */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      App Category
                    </h3>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option>Social Media</option>
                      <option>Navigation</option>
                      <option>E-commerce</option>
                      <option>Fitness</option>
                      <option>Gaming</option>
                      <option>Productivity</option>
                    </select>
                  </div>

                  {/* Permission Selection */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Grant Permissions
                    </h3>
                    <div className="space-y-3">
                      {availablePermissions.map((perm) => (
                        <label
                          key={perm.name}
                          className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg cursor-pointer transition-all"
                        >
                          <input
                            type="checkbox"
                            checked={selectedPermissions.includes(perm.name)}
                            onChange={(e) => {
                              setAnalytics((prev) => ({
                                ...prev,
                                simulatorInteractions:
                                  prev.simulatorInteractions + 1,
                              }));
                              if (e.target.checked) {
                                setSelectedPermissions([
                                  ...selectedPermissions,
                                  perm.name,
                                ]);
                              } else {
                                setSelectedPermissions(
                                  selectedPermissions.filter(
                                    (p) => p !== perm.name
                                  )
                                );
                              }
                            }}
                            className="w-5 h-5 text-indigo-600"
                          />
                          <perm.icon className="w-5 h-5 text-gray-700" />
                          <span className="flex-1 font-medium text-gray-900">
                            {perm.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            ${perm.value}/year
                          </span>
                        </label>
                      ))}
                    </div>

                    {selectedPermissions.length > 0 && (
                      <button
                        onClick={() => setSelectedPermissions([])}
                        className="mt-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Clear All
                      </button>
                    )}
                  </div>
                </div>

                {/* Right: Results */}
                <div className="space-y-6">
                  {selectedPermissions.length === 0 ? (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                      <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Select permissions to see privacy impact
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Risk & Value Overview */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">
                          Privacy Impact
                        </h3>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <Shield className="w-5 h-5 text-red-600" />
                              <span className="text-sm font-semibold text-red-900">
                                Risk Score
                              </span>
                            </div>
                            <div className="text-3xl font-bold text-red-600 mb-1">
                              {(riskScore * 100).toFixed(0)}%
                            </div>
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${riskLevel.color}`}
                            >
                              {riskLevel.label} Risk
                            </span>
                          </div>

                          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <DollarSign className="w-5 h-5 text-green-600" />
                              <span className="text-sm font-semibold text-green-900">
                                Data Value
                              </span>
                            </div>
                            <div className="text-3xl font-bold text-green-600 mb-1">
                              ${dataValue.toFixed(2)}
                            </div>
                            <span className="text-xs text-green-700">
                              per year
                            </span>
                          </div>
                        </div>

                        {/* Risk Breakdown */}
                        <div className="space-y-2">
                          {selectedPermissions.map((permName) => {
                            const perm = availablePermissions.find(
                              (p) => p.name === permName
                            )!;
                            return (
                              <div
                                key={permName}
                                className="flex items-center gap-2"
                              >
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-linear-to-br from-orange-400 to-red-500"
                                    style={{ width: `${perm.risk * 100}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-600 w-24">
                                  {permName}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Digital Twin */}
                      <div className="bg-linear-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <User className="w-5 h-5 text-purple-600" />
                          <h3 className="font-semibold text-gray-900">
                            Your Digital Twin
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          What advertisers can infer about you:
                        </p>

                        {inferences.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {inferences.map((inference, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-white border border-purple-200 text-purple-800 text-xs font-medium rounded-full"
                              >
                                {inference}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 italic">
                            No inferences yet
                          </p>
                        )}
                      </div>

                      {/* Ad Targeting */}
                      <div className="bg-linear-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Target className="w-5 h-5 text-orange-600" />
                          <h3 className="font-semibold text-gray-900">
                            Ad Targeting Categories
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          You'll see ads for:
                        </p>

                        {adCategories.length > 0 ? (
                          <div className="space-y-2">
                            {adCategories.map((category, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 p-3 bg-white rounded-lg border border-orange-200"
                              >
                                <Eye className="w-4 h-4 text-orange-600" />
                                <span className="text-sm text-gray-800">
                                  {category}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 italic">
                            No targeted ads yet
                          </p>
                        )}
                      </div>

                      {/* Summary */}
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-5 h-5 text-blue-600" />
                          <h4 className="font-semibold text-blue-900">
                            Privacy Summary
                          </h4>
                        </div>
                        <p className="text-sm text-blue-800 leading-relaxed">
                          By granting {selectedPermissions.length} permission
                          {selectedPermissions.length > 1 ? "s" : ""}, you've
                          enabled {inferences.length} types of inferences about
                          your behavior and identity. Your data generates
                          approximately ${dataValue.toFixed(2)} annually in
                          advertising revenue, and you'll be targeted with{" "}
                          {adCategories.length} categories of personalized ads.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 3: Timeline */}
          {activeTab === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onViewportEnter={() => {
                setAnalytics((prev) => ({
                  ...prev,
                  timelineViews: prev.timelineViews + 1,
                }));
              }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Data Accumulation Timeline
              </h2>
              <p className="text-gray-600 mb-8">
                See how your data profile grows over time. Watch as simple
                permissions transform into comprehensive behavioral profiles.
              </p>

              {/* Timeline Selector */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Select Time Period
                </h3>
                <div className="flex flex-wrap gap-3">
                  {(
                    ["day1", "week1", "month1", "month6", "year1"] as const
                  ).map((stage) => (
                    <button
                      key={stage}
                      onClick={() => setTimelineStage(stage)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        timelineStage === stage
                          ? "bg-indigo-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {stage === "day1" && "Day 1"}
                      {stage === "week1" && "Week 1"}
                      {stage === "month1" && "Month 1"}
                      {stage === "month6" && "6 Months"}
                      {stage === "year1" && "1 Year"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline Visualization */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Data Points */}
                <motion.div
                  key={`points-${timelineStage}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-linear-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Database className="w-6 h-6 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Data Points</h4>
                  </div>
                  <div className="text-5xl font-bold text-blue-600 mb-2">
                    {timelineData.dataPoints.toLocaleString()}
                  </div>
                  <p className="text-sm text-blue-800">Collected so far</p>

                  {/* Mini chart */}
                  <div className="mt-6 h-20 flex items-end gap-1">
                    {["day1", "week1", "month1", "month6", "year1"].map(
                      (stage) => {
                        const stages = {
                          day1: 15,
                          week1: 105,
                          month1: 450,
                          month6: 2700,
                          year1: 5400,
                        };
                        const isActive = stage === timelineStage;
                        const height =
                          (stages[stage as keyof typeof stages] / 5400) * 100;
                        return (
                          <div
                            key={stage}
                            className={`flex-1 rounded-t transition-all ${
                              isActive ? "bg-blue-600" : "bg-blue-300"
                            }`}
                            style={{ height: `${height}%` }}
                          />
                        );
                      }
                    )}
                  </div>
                </motion.div>

                {/* Inferences */}
                <motion.div
                  key={`inferences-${timelineStage}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-linear-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Eye className="w-6 h-6 text-purple-600" />
                    <h4 className="font-semibold text-gray-900">Inferences</h4>
                  </div>
                  <div className="text-5xl font-bold text-purple-600 mb-2">
                    {timelineData.inferences.length}
                  </div>
                  <p className="text-sm text-purple-800 mb-4">
                    Types of insights
                  </p>
                  <div className="space-y-2">
                    {timelineData.inferences.slice(0, 3).map((inf, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-purple-800"
                      >
                        <CheckCircle className="w-3 h-3" />
                        <span>{inf}</span>
                      </div>
                    ))}
                    {timelineData.inferences.length > 3 && (
                      <p className="text-xs text-purple-600 font-medium">
                        +{timelineData.inferences.length - 3} more...
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Economic Value */}
                <motion.div
                  key={`value-${timelineStage}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-linear-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="w-6 h-6 text-green-600" />
                    <h4 className="font-semibold text-gray-900">
                      Value Generated
                    </h4>
                  </div>
                  <div className="text-5xl font-bold text-green-600 mb-2">
                    ${timelineData.value.toFixed(2)}
                  </div>
                  <p className="text-sm text-green-800">Cumulative revenue</p>

                  {/* Growth indicator */}
                  <div className="mt-6 flex items-center gap-2 text-sm text-green-700">
                    <TrendingUp className="w-4 h-4" />
                    <span>
                      {timelineStage === "year1" ? "Maximum" : "Growing"}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Detailed Description */}
              <motion.div
                key={`desc-${timelineStage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white border border-gray-200 rounded-xl p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {timelineData.label}
                  </h3>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {timelineData.description}
                </p>

                {/* All Inferences */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    What They Know About You:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {timelineData.inferences.map((inference, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="px-4 py-2 bg-white border border-gray-200 text-gray-800 text-sm rounded-lg"
                      >
                        {inference}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Visual Timeline */}
              <div className="mt-8 bg-linear-to-br from-blue-50 to-purple-50 border border-gray-200 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Your Data Journey
                </h3>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute top-6 left-0 right-0 h-1 bg-gray-300" />

                  {/* Timeline points */}
                  <div className="relative flex justify-between">
                    {["day1", "week1", "month1", "month6", "year1"].map(
                      (stage, idx) => {
                        const isActive = stage === timelineStage;
                        const labels = [
                          "Day 1",
                          "Week 1",
                          "Month 1",
                          "6 Months",
                          "1 Year",
                        ];
                        return (
                          <button
                            key={stage}
                            onClick={() =>
                              setTimelineStage(stage as typeof timelineStage)
                            }
                            className="flex flex-col items-center group"
                          >
                            <div
                              className={`w-12 h-12 rounded-full border-4 border-white flex items-center justify-center transition-all ${
                                isActive
                                  ? "bg-indigo-600 scale-125 shadow-lg"
                                  : "bg-gray-300 group-hover:bg-gray-400"
                              }`}
                            >
                              <span
                                className={`text-sm font-bold ${
                                  isActive ? "text-white" : "text-gray-600"
                                }`}
                              >
                                {idx + 1}
                              </span>
                            </div>
                            <span
                              className={`mt-4 text-xs font-medium ${
                                isActive ? "text-indigo-600" : "text-gray-600"
                              }`}
                            >
                              {labels[idx]}
                            </span>
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Scenarios;
