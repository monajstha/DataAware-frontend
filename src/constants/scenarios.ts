import { MapPin, ShoppingBag, Heart, Users } from "lucide-react";

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

export interface Scenario {
  id: string;
  name: string;
  icon: any;
  color: string;
  steps: ScenarioStep[];
}

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

export default scenarios;
