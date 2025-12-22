import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Shield,
  Eye,
  Radio,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Loader2,
  Users,
  Heart,
  CreditCard,
  Gamepad2,
  Navigation,
  ShoppingCart,
  Briefcase,
  Film,
  Newspaper,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { api } from "../api";
import { IAppCategory } from "../interface/appCategory";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<IAppCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "risk">("name");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/appcategories");

        if (response.data.ok) {
          setCategories(response.data.data.appCategories);
        } else {
          setError("Failed to load categories");
        }
      } catch (err) {
        setError("Unable to connect to the server");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Category icon mapping
  const getCategoryIcon = (name: string) => {
    const iconMap: { [key: string]: any } = {
      "Social Media": Users,
      "Health & Fitness": Heart,
      Finance: CreditCard,
      Gaming: Gamepad2,
      Navigation: Navigation,
      "E-commerce": ShoppingCart,
      Productivity: Briefcase,
      Entertainment: Film,
      "News & Information": Newspaper,
      Education: GraduationCap,
    };
    return iconMap[name] || Shield;
  };

  // Calculate risk level based on data collection
  const calculateRisk = (category: IAppCategory): "low" | "medium" | "high" => {
    const totalDataPoints =
      category.permissions.length +
      category.trackers.length +
      category.sensors.length;

    if (totalDataPoints >= 20) return "high";
    if (totalDataPoints >= 12) return "medium";
    return "low";
  };

  const getRiskColor = (risk: "low" | "medium" | "high") => {
    switch (risk) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-orange-600 bg-orange-50";
      case "low":
        return "text-green-600 bg-green-50";
    }
  };

  const getRiskIcon = (risk: "low" | "medium" | "high") => {
    switch (risk) {
      case "high":
        return AlertTriangle;
      case "medium":
        return AlertCircle;
      case "low":
        return CheckCircle;
    }
  };

  // Filter and sort categories
  const filteredCategories = categories
    .filter(
      (cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        const riskOrder = { high: 3, medium: 2, low: 1 };
        return riskOrder[calculateRisk(b)] - riskOrder[calculateRisk(a)];
      }
    });

  // Stats calculation
  const totalPermissions = categories.reduce(
    (sum, cat) => sum + cat.permissions.length,
    0
  );
  const totalTrackers = categories.reduce(
    (sum, cat) => sum + cat.trackers.length,
    0
  );
  const totalSensors = categories.reduce(
    (sum, cat) => sum + cat.sensors.length,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading categories...</p>
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
            Unable to Load Categories
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
      {/* Header Section */}
      <section className="bg-linear-to-br from-blue-50 to-white py-12 md:py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              App Categories
            </h1>
            <div className="flex justify-center">
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
                Explore how different types of apps collect and use your data.
                Each category shows permissions, trackers, and sensors commonly
                used.
              </p>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {categories.length}
              </div>
              <div className="text-sm text-gray-600">Categories Analyzed</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {totalPermissions}
              </div>
              <div className="text-sm text-gray-600">Total Permissions</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {totalTrackers}
              </div>
              <div className="text-sm text-gray-600">Tracking SDKs</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <div className="text-3xl font-bold text-green-600 mb-1">
                {totalSensors}
              </div>
              <div className="text-sm text-gray-600">Device Sensors</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "name" | "risk")}
              className="px-2 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer text-black"
            >
              <option value="name">Name</option>
              <option value="risk">Risk Level</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 mt-4">
          Showing {filteredCategories.length} of {categories.length} categories
        </p>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => {
            const Icon = getCategoryIcon(category.name);
            const risk = calculateRisk(category);
            const RiskIcon = getRiskIcon(risk);
            const isExpanded = expandedId === category.id;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Card Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getRiskColor(
                        risk
                      )}`}
                    >
                      <RiskIcon className="w-3 h-3" />
                      {risk.toUpperCase()}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Data Collection Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <Shield className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                      <div className="text-lg font-bold text-purple-600">
                        {category.permissions.length}
                      </div>
                      <div className="text-xs text-gray-600">Permissions</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <Eye className="w-4 h-4 text-orange-600 mx-auto mb-1" />
                      <div className="text-lg font-bold text-orange-600">
                        {category.trackers.length}
                      </div>
                      <div className="text-xs text-gray-600">Trackers</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <Radio className="w-4 h-4 text-green-600 mx-auto mb-1" />
                      <div className="text-lg font-bold text-green-600">
                        {category.sensors.length}
                      </div>
                      <div className="text-xs text-gray-600">Sensors</div>
                    </div>
                  </div>

                  {/* Expand Button */}
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : category.id)
                    }
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-medium text-sm py-2 border-t border-gray-200 hover:bg-blue-800 transition-colors rounded"
                  >
                    {isExpanded ? "Show Less" : "View Details"}
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200 bg-gray-50"
                    >
                      <div className="p-6 space-y-6">
                        {/* Permissions */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Shield className="w-5 h-5 text-purple-600" />
                            <h4 className="font-semibold text-gray-900">
                              Permissions
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {category.permissions.map((permission, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full"
                              >
                                {permission}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Trackers */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Eye className="w-5 h-5 text-orange-600" />
                            <h4 className="font-semibold text-gray-900">
                              Trackers
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {category.trackers.map((tracker, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full"
                              >
                                {tracker}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Sensors */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Radio className="w-5 h-5 text-green-600" />
                            <h4 className="font-semibold text-gray-900">
                              Sensors
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {category.sensors.map((sensor, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full"
                              >
                                {sensor}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* No results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No categories found
            </h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </section>

      {/* Sources Section */}
      <section className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Academic Sources & References
          </h3>
          <div className="flex flex-col text-sm text-blue-500 space-y-2">
            <a href="https://developer.android.com/guide/topics/permissions/overview">
              • Apps, Trackers, Privacy, and Regulators A Global Study of the
              Mobile Tracking Ecosystem
            </a>
            <a href="https://developer.android.com/guide/topics/permissions/overview">
              • Permissions on Android
            </a>
            <a href="https://arxiv.org/abs/2311.00066">
              • Assessing Mobile Application Privacy: A Quantitative Framework
              for Privacy Measurement
            </a>
            <a href="https://petsymposium.org/popets/2017/popets-2017-0020.pdf">
              • Cross-Device Tracking: Measurement and Disclosures
            </a>
            <a href="https://pearl.plymouth.ac.uk/secam-research/981/">
              • MORI: An Innovative Mobile Applications Data Risk Assessment
              Model
            </a>
            <a href="https://dl.acm.org/doi/abs/10.1145/1870096.1870102">
              • A framework for computing the privacy scores of users in online
              social networks
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
