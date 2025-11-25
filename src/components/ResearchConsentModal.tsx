import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle,
  Shield,
  FileText,
  AlertCircle,
  Send,
} from "lucide-react";

interface ResearchConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ConsentData) => void;
  preScore: number;
  postScore: number;
  improvement: number;
}

interface ConsentData {
  consent: boolean;
  userName?: string;
  feedback?: string;
  demographics: {
    ageRange?: string;
    techProficiency?: string;
    priorPrivacyKnowledge?: string;
    referralSource?: string;
  };
}

const ResearchConsentModal: React.FC<ResearchConsentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  preScore,
  postScore,
  improvement,
}) => {
  const [consent, setConsent] = useState(false);
  const [userName, setUserName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [techProficiency, setTechProficiency] = useState("");
  const [priorKnowledge, setPriorKnowledge] = useState("");
  const [referralSource, setReferralSource] = useState("");

  const handleSubmit = () => {
    const data: ConsentData = {
      consent,
      userName: userName.trim() || undefined,
      feedback: feedback.trim() || undefined,
      demographics: {
        ageRange: ageRange || undefined,
        techProficiency: techProficiency || undefined,
        priorPrivacyKnowledge: priorKnowledge || undefined,
        referralSource: referralSource.trim() || undefined,
      },
    };
    onSubmit(data);
  };

  const handleDecline = () => {
    onSubmit({ consent: false, demographics: {} });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    Help Improve DataAware
                  </h2>
                  <p className="text-indigo-100 text-sm">
                    Your participation helps us understand the effectiveness of
                    this platform
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white hover:text-blue-700 rounded-lg p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Results Summary */}
            <div className="bg-linear-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Your Learning Results
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pre-Assessment</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {preScore}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Post-Assessment</p>
                  <p className="text-3xl font-bold text-green-600">
                    {postScore}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Improvement</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {improvement > 0 ? "+" : ""}
                    {improvement}%
                  </p>
                </div>
              </div>
            </div>

            {/* Research Purpose */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                About This Research
              </h3>
              <p className="text-sm text-blue-800 leading-relaxed mb-3">
                This is a Master's research project studying how educational
                platforms can improve privacy awareness among general users.
                Your anonymous data helps us understand:
              </p>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>
                    How effective the platform is at teaching privacy concepts
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>
                    Which learning approaches work best for different users
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>How to improve privacy education for future users</span>
                </li>
              </ul>
            </div>

            {/* What We Collect */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-700" />
                What Data Will Be Collected
              </h3>
              <div className="text-sm text-gray-700 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Assessment scores:</strong> Your pre-test and
                    post-test results
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Learning behavior:</strong> Which modules you
                    completed and time spent
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Interactions:</strong> Scenarios completed,
                    simulator usage, quiz attempts
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>
                    <strong>Optional info:</strong> Name, feedback, and
                    demographic details (if you choose to provide them)
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4 italic">
                All data is anonymized and used only for academic research. Your
                data will be stored securely and can be deleted upon request.
              </p>
            </div>

            {/* Consent Checkbox */}
            <div className="bg-indigo-50 border-2 border-indigo-300 rounded-xl p-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="w-6 h-6 text-indigo-600 mt-1 cursor-pointer"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-1">
                    I consent to share my learning data for research purposes
                  </p>
                  <p className="text-sm text-gray-600">
                    I understand that my data will be used anonymously to
                    improve privacy education and will be stored securely for
                    academic research.
                  </p>
                </div>
              </label>
            </div>

            {/* Optional Fields - Only show if consent is given */}
            {consent && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-6"
              >
                {/* Divider */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Optional Information{" "}
                    <span className="text-sm font-normal text-gray-500">
                      (helps us understand different user groups)
                    </span>
                  </h3>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g., John Smith"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                  />
                </div>

                {/* Demographics */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Age Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age Range (Optional)
                    </label>
                    <select
                      value={ageRange}
                      onChange={(e) => setAgeRange(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                    >
                      <option value="">Select age range</option>
                      <option value="18-24">18-24</option>
                      <option value="25-34">25-34</option>
                      <option value="35-44">35-44</option>
                      <option value="45-54">45-54</option>
                      <option value="55+">55+</option>
                    </select>
                  </div>

                  {/* Tech Proficiency */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tech Proficiency (Optional)
                    </label>
                    <select
                      value={techProficiency}
                      onChange={(e) => setTechProficiency(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                    >
                      <option value="">Select proficiency</option>
                      <option value="Beginner">
                        Beginner - I'm new to technology
                      </option>
                      <option value="Intermediate">
                        Intermediate - I'm comfortable with tech
                      </option>
                      <option value="Advanced">
                        Advanced - I'm very tech-savvy
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Prior Knowledge */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Privacy Knowledge Before (Optional)
                    </label>
                    <select
                      value={priorKnowledge}
                      onChange={(e) => setPriorKnowledge(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                    >
                      <option value="">Select prior knowledge</option>
                      <option value="None">
                        I knew very little about privacy
                      </option>
                      <option value="Basic">I knew some basics</option>
                      <option value="Advanced">
                        I was already knowledgeable
                      </option>
                    </select>
                  </div>

                  {/* Referral Source */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How did you find this? (Optional)
                    </label>
                    <input
                      type="text"
                      value={referralSource}
                      onChange={(e) => setReferralSource(e.target.value)}
                      placeholder="e.g., University course, Friend, Online search"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                    />
                  </div>
                </div>

                {/* Feedback */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback (Optional)
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your thoughts about the learning experience, content clarity, or suggestions for improvement..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-black"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex flex-col sm:flex-row gap-3 justify-end border-t border-gray-200">
            <button
              onClick={handleDecline}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              No Thanks, Keep Private
            </button>
            <button
              onClick={handleSubmit}
              disabled={!consent}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
            >
              <Send className="w-5 h-5" />
              {consent ? "Share My Results" : "Please Accept Consent"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResearchConsentModal;
