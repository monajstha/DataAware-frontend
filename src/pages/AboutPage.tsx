import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  BookOpen,
  Database,
  Users,
  Shield,
  TrendingUp,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Cpu,
  Search,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  const objectives = [
    {
      icon: Users,
      title: "Enhance Privacy Awareness",
      description:
        "Bridge the gap between academic privacy research and public understanding by translating complex technical concepts into accessible information.",
    },
    {
      icon: Shield,
      title: "Transparency in Data Collection",
      description:
        "Provide clear, comprehensive insights into how mobile applications collect, utilize, and monetize personal data through permissions, trackers, and sensors.",
    },
    {
      icon: TrendingUp,
      title: "Economic Understanding",
      description:
        "Illuminate the economic value of personal data to help users comprehend the commercial implications of their digital footprint.",
    },
    {
      icon: Lightbulb,
      title: "Informed Decision-Making",
      description:
        "Empower users to make evidence-based decisions about application permissions and data sharing practices through education and awareness.",
    },
  ];

  const methodology = [
    {
      icon: Search,
      title: "Systematic Literature Review",
      description:
        "Comprehensive analysis of academic research on mobile application privacy, data collection practices, and user awareness studies to establish theoretical foundations.",
    },
    {
      icon: Database,
      title: "Data Compilation & Classification",
      description:
        "Systematic collection and categorization of Android permissions, tracking SDKs, and device sensors based on technical documentation and privacy research.",
    },
    {
      icon: BarChart3,
      title: "Economic Valuation Analysis",
      description:
        "Research-based assessment of personal data economic value drawing from data broker market studies, advertising industry reports, and academic literature on data economics.",
    },
    {
      icon: Cpu,
      title: "Technical Implementation",
      description:
        "Development of a full-stack web platform utilizing React, Node.js/Express, and PostgreSQL to deliver an accessible, user-friendly interface for privacy education.",
    },
  ];

  const scope = [
    {
      icon: CheckCircle,
      title: "Included in Scope",
      items: [
        "Android mobile application permissions and their privacy implications",
        "Common tracking SDKs and analytics frameworks embedded in applications",
        "Device sensors accessible through mobile operating systems",
        "Economic valuation of personal data types in commercial markets",
        "Educational content on privacy protection strategies",
      ],
    },
    {
      icon: AlertCircle,
      title: "Limitations & Boundaries",
      items: [
        "Focus on Android ecosystem; iOS-specific permissions not comprehensively covered",
        "Economic valuations represent general market estimates and may vary by context",
        "Data reflects current research and industry practices as of 2024-2025",
        "Platform designed for educational purposes; not a real-time app scanner",
        "Individual app analysis requires separate privacy policy review",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-blue-50 to-white text-black py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About DataAware
            </h1>
            <p className="text-xl md:text-2xl text-black leading-relaxed">
              A Research-Driven Educational Platform for Mobile Application
              Privacy Awareness
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center items-center gap-3 mb-8">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Project Overview
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              DataAware is a Master's-level research artefact designed to
              address the critical gap between academic privacy research and
              public understanding of mobile application data collection
              practices. Despite extensive scholarly work on digital privacy,
              surveillance capitalism, and data economics, many users remain
              inadequately informed about the extent and implications of data
              collection occurring through their mobile devices.
            </p>

            <p>
              This platform synthesizes findings from privacy research,
              technical documentation, and market analysis to present
              comprehensive, accessible information about how mobile
              applications collect personal data through permissions, embedded
              tracking software development kits (SDKs), and device sensors. By
              translating complex technical and economic concepts into clear,
              actionable knowledge, DataAware serves as an educational tool that
              empowers users to understand their digital privacy landscape.
            </p>

            <p>
              The research underpinning this platform examines user awareness of
              mobile privacy practices and investigates effective methods for
              communicating privacy risks to non-technical audiences. Through
              systematic categorization of applications, detailed explanation of
              data collection mechanisms, and transparent presentation of
              economic valuations, DataAware contributes to the broader
              objective of enhancing digital literacy and privacy consciousness
              among the general public.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Research Objectives */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-12">
              <Target className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Research Objectives
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {objectives.map((objective, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                    <objective.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {objective.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {objective.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Methodology */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12">
            <Database className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Research Methodology
            </h2>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mb-12">
            The development of DataAware employed a mixed-methods approach,
            integrating systematic literature review, technical analysis, and
            platform development to create a comprehensive educational resource.
          </p>

          <div className="space-y-8">
            {methodology.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <method.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {method.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Data Sources */}
      <section className="bg-blue-50 py-16 md:py-20 border-y border-blue-100">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Database className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Data Sources & Compilation
              </h2>
            </div>

            <div className="bg-white rounded-xl p-8 md:p-10 border border-blue-200 shadow-sm">
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Permissions Data
                  </h3>
                  <p>
                    Android permission documentation, Google Play Services API
                    reference, and academic literature on mobile operating
                    system security were consulted to compile comprehensive
                    permission classifications, risk assessments, and usage
                    patterns.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Tracking SDK Information
                  </h3>
                  <p>
                    Data on tracking software development kits was derived from
                    privacy research publications, developer documentation, and
                    third-party privacy analysis tools that document embedded
                    trackers in mobile applications.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Sensor Capabilities
                  </h3>
                  <p>
                    Device sensor data was compiled from Android developer
                    documentation, sensor API specifications, and academic
                    research on sensor-based inference and privacy implications.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Economic Valuations
                  </h3>
                  <p>
                    Personal data economic values were derived from data broker
                    market research reports, advertising industry publications,
                    academic studies on data economics, and publicly available
                    information on user monetization by major technology
                    platforms.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scope & Limitations */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Scope & Limitations
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {scope.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <section.icon
                    className={`w-6 h-6 ${
                      index === 0 ? "text-green-600" : "text-orange-600"
                    }`}
                  />
                  <h3 className="text-xl font-bold text-gray-900">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div
                        className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                          index === 0 ? "bg-green-600" : "bg-orange-600"
                        }`}
                      ></div>
                      <span className="text-gray-700 leading-relaxed text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Technology Stack */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Cpu className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Technical Implementation
              </h2>
            </div>

            <div className="bg-white rounded-xl p-8 md:p-10 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-8">
                DataAware is implemented as a full-stack web application
                utilizing modern development frameworks and technologies to
                ensure performance, scalability, and user experience quality.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2">Frontend</h4>
                  <p className="text-sm text-gray-700">
                    React with TypeScript, Vite build tool, Tailwind CSS
                  </p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-bold text-gray-900 mb-2">Backend</h4>
                  <p className="text-sm text-gray-700">
                    Node.js, Express framework, RESTful API architecture
                  </p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-bold text-gray-900 mb-2">Database</h4>
                  <p className="text-sm text-gray-700">
                    PostgreSQL relational database system
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Conclusion CTA */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 border border-blue-200"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Explore the Platform
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
            Begin your journey toward enhanced privacy awareness by exploring
            application categories, understanding data collection mechanisms,
            and learning about the economic value of your personal information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/categories">
              <button className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg">
                View Categories
              </button>
            </Link>
            <Link to="/privacy-guide">
              <button className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-lg transition-colors border-2 border-gray-300">
                Privacy Guide
              </button>
            </Link>
            <Link to="/privacy-economics">
              <button className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-lg transition-colors border-2 border-gray-300">
                Data Economics
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
