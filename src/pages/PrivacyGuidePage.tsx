import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Shield,
  Eye,
  Radio,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Loader2,
  Lock,
  Smartphone,
  TrendingUp,
  Info,
  ChevronRight,
  Filter,
  ExternalLink,
} from "lucide-react";
import { Sensor, Permission, Tracker } from "../interface/privacy";
import { TabType, RiskFilter } from "../types";
import { api } from "../api";

const PrivacyGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("permissions");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all");

  // Fetch data from all endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [permRes, trackRes, sensorRes] = await Promise.all([
          api.get("/api/permissions"),
          api.get("/api/trackers"),
          api.get("/api/sensors"),
        ]);

        const permData = await permRes?.data;
        const trackData = await trackRes?.data;
        const sensorData = await sensorRes?.data;

        if (permData.ok)
          setPermissions(
            permData.data.permissions || permData.permissions || []
          );
        if (trackData.ok)
          setTrackers(trackData.data.trackers || trackData.trackers || []);
        if (sensorData.ok)
          setSensors(sensorData.data.sensors || sensorData.sensors || []);
      } catch (err) {
        setError("Unable to load privacy data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Risk calculation helper
  const getRiskLevel = (score: number): "high" | "medium" | "low" => {
    if (score >= 0.7) return "high";
    if (score >= 0.4) return "medium";
    return "low";
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high":
        return AlertTriangle;
      case "medium":
        return AlertCircle;
      case "low":
        return CheckCircle;
      default:
        return Info;
    }
  };

  // Filter data based on search and risk level
  const filterData = <
    T extends { name: string; riskScore?: number; sensitivity?: string }
  >(
    data: T[]
  ): T[] => {
    return data.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (riskFilter === "all") return matchesSearch;

      const itemRisk = item.riskScore
        ? getRiskLevel(item.riskScore)
        : item.sensitivity?.toLowerCase() || "low";

      return matchesSearch && itemRisk === riskFilter;
    });
  };

  const filteredPermissions = filterData(permissions);
  const filteredTrackers = filterData(trackers);
  const filteredSensors = filterData(sensors);

  // Get active data based on tab
  const getActiveData = () => {
    switch (activeTab) {
      case "permissions":
        return filteredPermissions;
      case "trackers":
        return filteredTrackers;
      case "sensors":
        return filteredSensors;
    }
  };

  const activeData = getActiveData();

  // Stats
  const stats = [
    {
      icon: Shield,
      value: permissions.length,
      label: "Permissions Documented",
      color: "text-purple-600",
    },
    {
      icon: Eye,
      value: trackers.length,
      label: "Trackers Identified",
      color: "text-orange-600",
    },
    {
      icon: Radio,
      value: sensors.length,
      label: "Sensors Catalogued",
      color: "text-green-600",
    },
  ];

  const quickTips = [
    {
      icon: Smartphone,
      title: "Check App Permissions Regularly",
      description:
        "Review which apps have access to sensitive data like location, camera, and contacts in your phone settings.",
    },
    {
      icon: Lock,
      title: "Limit Background Access",
      description:
        "Only allow apps to access location and other permissions while you're actively using them, not in the background.",
    },
    {
      icon: Eye,
      title: "Reset Your Advertising ID",
      description:
        "Periodically reset your device's advertising identifier to limit cross-app tracking and profiling.",
    },
    {
      icon: TrendingUp,
      title: "Use Privacy-Focused Alternatives",
      description:
        "Consider apps that prioritize privacy and minimize data collection when alternatives are available.",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading privacy guide...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Unable to Load Data
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-blue-50 to-white text-black py-16 md:py-20">
        <div className="flex justify-center max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Guide
            </h1>
            <p className="text-xl text-black leading-relaxed">
              Understanding what data apps collect is the first step to
              protecting your privacy. This guide explains permissions,
              trackers, and sensors—and how to safeguard your personal
              information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why This Matters */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="bg-blue-50 rounded-2xl p-8 md:p-12 border border-blue-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Privacy Matters
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Every app you install requests permissions to access different
                  parts of your device. While some are necessary for
                  functionality, others enable extensive data collection that
                  you might not be aware of.
                </p>
                <p className="font-semibold text-gray-900">
                  Did you know? The average smartphone user has 80+ apps
                  installed, with many requesting far more permissions than they
                  need to function.
                </p>
                <p>
                  Understanding these permissions, the trackers embedded in
                  apps, and the sensors being accessed helps you make informed
                  decisions about your digital privacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Quick Protection Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <tip.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {tip.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Tabbed Interface */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Explore Privacy Data
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {[
            {
              id: "permissions" as TabType,
              label: "Permissions",
              icon: Shield,
              count: permissions.length,
            },
            {
              id: "trackers" as TabType,
              label: "Trackers",
              icon: Eye,
              count: trackers.length,
            },
            {
              id: "sensors" as TabType,
              label: "Sensors",
              icon: Radio,
              count: sensors.length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchTerm("");
                setRiskFilter("all");
              }}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all border-b-2 ${
                activeTab === tab.id
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
              <span className="ml-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value as RiskFilter)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            >
              <option value="all">All Risk Levels</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-600 mb-6">
          Showing {activeData.length} of{" "}
          {activeTab === "permissions" && permissions.length}
          {activeTab === "trackers" && trackers.length}
          {activeTab === "sensors" && sensors.length} {activeTab}
        </p>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-6">
          {activeTab === "permissions" &&
            filteredPermissions.map((perm, index) => {
              const risk = getRiskLevel(perm.riskScore);
              const RiskIcon = getRiskIcon(risk);
              console.log(perm.name, risk);
              return (
                <motion.div
                  key={perm.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {perm.name}
                        </h3>
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full mb-3">
                          {perm.category}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor(
                        risk
                      )}`}
                    >
                      <RiskIcon className="w-3 h-3" />
                      {risk.toUpperCase()}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {perm.description}
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-1">
                          Protection Tip
                        </p>
                        <p className="text-sm text-blue-800 leading-relaxed">
                          {perm.protectionTip}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

          {activeTab === "trackers" &&
            filteredTrackers.map((tracker, index) => {
              const risk = getRiskLevel(tracker.riskScore);
              const RiskIcon = getRiskIcon(risk);
              return (
                <motion.div
                  key={tracker.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                        <Eye className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {tracker.name}
                        </h3>
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full mb-3">
                          {tracker.purpose}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor(
                        risk
                      )}`}
                    >
                      <RiskIcon className="w-3 h-3" />
                      {risk.toUpperCase()}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {tracker.description}
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-1">
                          Protection Tip
                        </p>
                        <p className="text-sm text-blue-800 leading-relaxed">
                          {tracker.protectionTip}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

          {activeTab === "sensors" &&
            filteredSensors.map((sensor, index) => {
              const risk = getRiskLevel(sensor.riskScore);
              const RiskIcon = getRiskIcon(risk);
              return (
                <motion.div
                  key={sensor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                        <Radio className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {sensor.name}
                        </h3>
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full mb-3">
                          {sensor.possibleInterference}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor(
                        risk
                      )}`}
                    >
                      <RiskIcon className="w-3 h-3" />
                      {risk.toUpperCase()}
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {sensor.description}
                  </p>
                </motion.div>
              );
            })}
        </div>

        {/* No Results */}
        {activeData.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter settings
            </p>
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to explore app categories?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            See how different types of apps use these permissions, trackers, and
            sensors.
          </p>
          <button
            onClick={() => (window.location.href = "/categories")}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg"
          >
            View App Categories
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Sources Section */}
      <section className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Academic Sources & References
          </h3>
          <div className="flex flex-col text-sm text-blue-500 space-y-2">
            <a href="https://www.usenix.org/conference/usenixsecurity19/presentation/reardon">
              • 50 ways to leak your data: An exploration of apps' circumvention
              of the android permissions system
            </a>
            <a href="https://developer.android.com/guide/topics/permissions/overview">
              • Permissions on Android
            </a>
            <a href="https://developer.android.com/develop/sensors-and-location/sensors/sensors_overview">
              • Sensors on Android
            </a>
            <a href="https://arxiv.org/abs/2311.00066">
              • Assessing Mobile Application Privacy: A Quantitative Framework
              for Privacy Measurement
            </a>
            <a href="https://www.usenix.org/conference/usenixsecurity18/presentation/harkous">
              • Polisis: Automated Analysis and Presentation of Privacy Policies
              Using Deep Learning
            </a>

            <a href="https://42matters.com/sdk-analysis/top-ad-networks-sdks">
              • Top 20 Ad Networks SDKs Used in Android Apps on Google Play
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyGuide;
