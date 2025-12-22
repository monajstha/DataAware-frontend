import { Question } from "../interface/assessment";

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

export default assessmentQuestions;
