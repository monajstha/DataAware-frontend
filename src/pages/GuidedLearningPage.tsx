import React, { useState, useEffect } from "react";
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
  Lightbulb,
  Target,
  Database,
  Brain,
  X,
  Play,
} from "lucide-react";
import { useSessionTracking } from "../hooks/useSession";
import ResearchConsentModal from "../components/ResearchConsentModal";
import modules from "../constants/modules";
import assessmentQuestions from "../constants/assessmentQuestions";

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

  // Session tracking
  const sessionTracking = useSessionTracking();
  const [assessmentStartTime, setAssessmentStartTime] = useState<number>(0);
  const [moduleStartTime, setModuleStartTime] = useState<number>(0);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [dataSubmitted, setDataSubmitted] = useState(false);

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

  // Track assessment start time
  useEffect(() => {
    if (stage === "pre-test" || stage === "post-test") {
      setAssessmentStartTime(Date.now());
    }
  }, [stage]);

  // Track module start time
  useEffect(() => {
    if (stage === "learning") {
      setModuleStartTime(Date.now());
    }
  }, [currentModule, stage]);

  // Save pre-assessment to session
  const savePreAssessment = () => {
    const timeSpent = Math.floor((Date.now() - assessmentStartTime) / 1000);
    sessionTracking.setPreAssessment({
      score: preTestScore,
      answers: assessmentQuestions.map((q) => preTestAnswers[q.id]),
      timeSpent,
      timestamp: new Date().toISOString(),
    });
  };

  // Save post-assessment to session
  const savePostAssessment = () => {
    const timeSpent = Math.floor((Date.now() - assessmentStartTime) / 1000);
    sessionTracking.setPostAssessment({
      score: postTestScore,
      answers: assessmentQuestions.map((q) => postTestAnswers[q.id]),
      timeSpent,
      timestamp: new Date().toISOString(),
    });
  };

  // Handle consent modal submission
  const handleConsentSubmit = async (consentData: any) => {
    if (consentData.consent) {
      // Prepare data for backend
      const sessionData = sessionTracking.getSessionData();
      const researchData = {
        ...sessionData,
        userName: consentData.userName,
        feedback: consentData.feedback,
        userContext: {
          ageRange: consentData.demographics.ageRange,
          techProficiency: consentData.demographics.techProficiency,
          priorPrivacyKnowledge: consentData.demographics.priorPrivacyKnowledge,
          referralSource: consentData.demographics.referralSource,
        },
      };

      // TODO: Send to backend
      console.log("Research data to submit:", researchData);

      // For now, just log and show success
      try {
        // const response = await fetch('http://localhost:3000/api/research-data', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(researchData)
        // });

        setDataSubmitted(true);
        alert(
          "Thank you for contributing to privacy education research! Your data has been submitted."
        );
      } catch (error) {
        console.error("Error submitting data:", error);
        alert("There was an error submitting your data. Please try again.");
      }
    }

    setShowConsentModal(false);
  };

  // Module completion
  const markModuleComplete = (moduleId: number) => {
    if (!completedModules.includes(moduleId)) {
      const timeSpent = Math.floor((Date.now() - moduleStartTime) / 1000);
      sessionTracking.addCompletedModule(moduleId, timeSpent);
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
                savePreAssessment();
                setStage("learning");
              } else {
                savePostAssessment();
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
      <section className="flex justify-center bg-linear-to-br from-indigo-600 to-purple-700 text-white py-16 md:py-20">
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
                      onClick={() => {
                        setShowQuiz(true);
                        sessionTracking.addQuizAttempt();
                      }}
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
                      "Myths",
                      "Misconceptions",
                      "Tracking",
                      "Sensors",
                      "Economics",
                      "Understanding",
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

                {/* Research Contribution Section */}
                {!dataSubmitted && (
                  <div className="bg-linear-to-br from-indigo-50 to-blue-50 border-2 border-indigo-300 rounded-xl p-8 mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Database className="w-8 h-8 text-indigo-600" />
                      <h3 className="text-2xl font-bold text-gray-900">
                        Help Improve Privacy Education
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      Your learning journey can help improve privacy education
                      for future users. Would you like to share your anonymous
                      results for academic research?
                    </p>
                    <button
                      onClick={() => setShowConsentModal(true)}
                      className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
                    >
                      Contribute to Research
                    </button>
                  </div>
                )}

                {dataSubmitted && (
                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-center gap-3">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                      <p className="text-lg font-semibold text-green-900">
                        Thank you for contributing to privacy education
                        research!
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Consent Modal */}
              {showConsentModal && (
                <ResearchConsentModal
                  isOpen={showConsentModal}
                  onClose={() => setShowConsentModal(false)}
                  onSubmit={handleConsentSubmit}
                  preScore={preTestScore}
                  postScore={postTestScore}
                  improvement={improvement}
                />
              )}

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
