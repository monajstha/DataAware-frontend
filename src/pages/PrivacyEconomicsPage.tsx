import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Loader2,
  Search,
  Filter,
  Calculator,
  BarChart3,
  Info,
  ExternalLink,
  Database,
  Users,
  Lock,
} from "lucide-react";
import { api } from "../api";

interface DataType {
  id: number;
  name: string;
  category: string;
  economicValueUsd: number;
  description: string;
  riskLevel: string;
  commonUses: string;
  protectionTip: string;
}

const PrivacyEconomics: React.FC = () => {
  const [dataTypes, setDataTypes] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"value" | "name">("value");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/dataValue?limit=20");
        const result = await response?.data;

        if (result.ok) {
          setDataTypes(result.data?.datatypes || result.dataValues || []);
        } else {
          setError("Failed to load economic data");
        }
      } catch (err) {
        setError("Unable to connect to the server");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get unique categories
  const categories = ["all", ...new Set(dataTypes.map((dt) => dt.category))];

  // Filter and sort data
  const filteredData = dataTypes
    .filter((dt) => {
      const matchesSearch =
        dt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dt.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || dt.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "value") {
        return b.economicValueUsd - a.economicValueUsd;
      }
      return a.name.localeCompare(b.name);
    });

  // Calculate total value
  const calculateTotalValue = () => {
    if (selectedItems.length === 0) return 0;
    return selectedItems.reduce((sum, id) => {
      const item = dataTypes.find((dt) => dt.id === id);
      return sum + (item?.economicValueUsd || 0);
    }, 0);
  };

  const totalValue = calculateTotalValue();

  // Risk color helper
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

  // Toggle item selection
  const toggleSelection = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading economic data...</p>
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
      <section className="bg-linear-to-br from-green-600 to-blue-700 text-white py-16 md:py-20">
        <div className="flex justify-center max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">
                The Economics of Your Data
              </h1>
            </div>
            <p className="flex text-xl text-green-50 leading-relaxed max-w-3xl">
              Your personal data is a commodity with real economic value.
              Understanding what it's worth helps you make informed decisions
              about privacy and sharing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industry Overview */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-linear-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-200"
          >
            <Database className="w-10 h-10 text-blue-600 mb-4" />
            <div className="text-4xl font-bold text-blue-600 mb-2">$278B</div>
            <div className="text-sm text-gray-600 mb-3">
              Global Data Broker Market (2024)
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              The data broker industry reached $278 billion in 2024 and is
              projected to grow to $512 billion by 2033.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-linear-to-br from-green-50 to-white p-8 rounded-2xl border border-green-200"
          >
            <Users className="w-10 h-10 text-green-600 mb-4" />
            <div className="text-4xl font-bold text-green-600 mb-2">$220</div>
            <div className="text-sm text-gray-600 mb-3">
              Annual Value Per US User (Google)
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Google generates approximately $220-$250 per year from each
              American user through targeted advertising.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-linear-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-200"
          >
            <TrendingUp className="w-10 h-10 text-purple-600 mb-4" />
            <div className="text-4xl font-bold text-purple-600 mb-2">$235</div>
            <div className="text-sm text-gray-600 mb-3">
              Meta Revenue Per US User (2024)
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Meta (Facebook & Instagram) generates $235 annually per US user
              through personalized advertising.
            </p>
          </motion.div>
        </div>

        {/* How Data Valuation Works */}
        <div className="bg-blue-50 rounded-2xl p-8 md:p-12 border border-blue-100 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                How Data Valuation Works
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Personal data valuation is complex and context-dependent. The
                  same piece of information can have vastly different values
                  depending on who's buying it and how they intend to use it.
                </p>
                <p className="font-semibold text-gray-900">
                  Key Factors Affecting Data Value:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Data Type:</strong> Location data and financial
                    information command premium prices compared to basic
                    demographic data
                  </li>
                  <li>
                    <strong>Data Quality:</strong> Accurate, up-to-date
                    information is significantly more valuable than outdated or
                    incomplete data
                  </li>
                  <li>
                    <strong>Buyer Intent:</strong> Advertisers pay more for data
                    indicating purchase intent (e.g., shopping for a car:
                    $0.0021 vs. basic demographics: $0.0005)
                  </li>
                  <li>
                    <strong>Market Context:</strong> Data broker markets sell
                    information for fractions of a cent, while tech platforms
                    generate hundreds of dollars per user annually
                  </li>
                  <li>
                    <strong>Aggregation Value:</strong> Individual data points
                    are worth little, but combined datasets reveal valuable
                    patterns and insights
                  </li>
                </ul>
                <p>
                  Research from Stanford economists Jones and Tonetti
                  demonstrates that data is "nonrival"—unlike physical goods,
                  the same data can be used by multiple parties simultaneously,
                  creating inherent social and economic value in data sharing.
                  However, this characteristic also makes data vulnerable to
                  exploitation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Example */}
        <div className="bg-red-50 rounded-2xl p-8 md:p-12 border border-red-100 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Case Study: Facebook-Cambridge Analytica Scandal (2018)
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="font-semibold text-red-900">
                  The largest unauthorized data harvesting incident in social
                  media history
                </p>
                <p>
                  In March 2018, it was revealed that Cambridge Analytica, a
                  political consulting firm, had harvested personal data from
                  approximately 87 million Facebook users without their explicit
                  consent. The data was collected through a personality quiz app
                  called "thisisyourdigitallife" created by researcher Aleksandr
                  Kogan in 2014.
                </p>
                <div className="bg-white rounded-lg p-6 border border-red-200">
                  <p className="font-semibold text-gray-900 mb-3">Key Facts:</p>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>
                      Only 270,000 users downloaded the app, but it collected
                      data from 87 million people through Facebook's friend
                      network access
                    </li>
                    <li>
                      Data was used to create psychographic profiles for
                      targeted political advertising in the 2016 US presidential
                      election
                    </li>
                    <li>
                      Facebook's stock dropped 24% in one week, losing $134
                      billion in market value
                    </li>
                    <li>
                      Facebook was fined $5 billion by the FTC and £500,000 by
                      the UK's Information Commissioner's Office
                    </li>
                    <li>
                      Cambridge Analytica ceased operations in May 2018
                      following the scandal
                    </li>
                  </ul>
                </div>
                <p>
                  This breach demonstrated the vulnerability of user data and
                  led to stricter data protection regulations worldwide,
                  including accelerated implementation of GDPR in Europe and
                  increased privacy legislation globally.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Certain Data is More Valuable */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-linear-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-200">
            <TrendingUp className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              High-Value Data Types
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 shrink-0"></div>
                <div>
                  <strong>Location Data:</strong> Reveals movement patterns,
                  frequented places, and routines. Used for geotargeted
                  advertising, retail proximity marketing, and navigation
                  services.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 shrink-0"></div>
                <div>
                  <strong>Financial Data:</strong> Purchase history, income
                  estimates, and credit information enable precise consumer
                  profiling and high-value targeting.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 shrink-0"></div>
                <div>
                  <strong>Behavioral Data:</strong> Browsing habits, app usage,
                  and online activity patterns predict future behavior and
                  purchase intent.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 shrink-0"></div>
                <div>
                  <strong>Health & Biometric:</strong> Medical records and
                  fitness data command premium prices in research and insurance
                  sectors.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-200">
            <Lock className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Protection Recommendations
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Review App Permissions:</strong> Only grant access to
                  data that apps genuinely need to function.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Disable Ad Personalization:</strong> Limit tracking by
                  opting out of personalized ads in your device and account
                  settings.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Reset Advertising IDs:</strong> Periodically reset
                  your advertising identifier to break tracking continuity.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Use Privacy-Focused Services:</strong> Consider
                  alternatives that prioritize user privacy over advertising
                  revenue.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Understand Data Rights:</strong> Exercise your rights
                  under GDPR, CCPA, and other privacy laws to access, delete, or
                  port your data.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Value Calculator */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Calculate Your Data Value
              </h2>
            </div>
            <p className="text-gray-600 mb-8">
              Select the types of data you share with apps to estimate your
              annual data value. This calculator shows the commercial value of
              your data to advertisers and data brokers.
            </p>

            {selectedItems.length > 0 && (
              <div className="bg-linear-to-br from-green-50 to-blue-50 rounded-xl p-6 mb-8 border-2 border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Your Estimated Annual Data Value:
                  </span>
                  <button
                    onClick={() => setSelectedItems([])}
                    className="text-xs text-gray-600 hover:text-gray-900 underline"
                  >
                    Clear All
                  </button>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-1">
                  ${totalValue.toFixed(2)}
                </div>
                <p className="text-xs text-gray-600">
                  Based on {selectedItems.length} selected data type
                  {selectedItems.length > 1 ? "s" : ""}
                </p>
              </div>
            )}

            <div className="text-sm text-gray-500 mb-4">
              Click on cards below to add them to your calculation
            </div>
          </div>
        </div>
      </section>

      {/* Data Types Table/Cards */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">Data Type Values</h2>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search data types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "value" | "name")}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            >
              <option value="value">Highest Value</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Showing {filteredData.length} of {dataTypes.length} data types
        </p>

        {/* Data Cards */}
        <div className="space-y-4">
          {filteredData.map((dataType, index) => {
            const RiskIcon = getRiskIcon(dataType.riskLevel);
            const isSelected = selectedItems.includes(dataType.id);

            return (
              <motion.div
                key={dataType.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => toggleSelection(dataType.id)}
                className={`bg-white border rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer ${
                  isSelected
                    ? "border-green-500 border-2 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left: Main Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {dataType.name}
                        </h3>
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          {dataType.category}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-3xl font-bold text-green-600">
                          ${dataType.economicValueUsd}
                        </div>
                        <div className="text-xs text-gray-500">per year</div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {dataType.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Info className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-semibold text-blue-900">
                            Common Uses
                          </span>
                        </div>
                        <p className="text-xs text-blue-800 leading-relaxed">
                          {dataType.commonUses}
                        </p>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock className="w-4 h-4 text-green-600" />
                          <span className="text-xs font-semibold text-green-900">
                            Protection Tip
                          </span>
                        </div>
                        <p className="text-xs text-green-800 leading-relaxed">
                          {dataType.protectionTip}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Risk Badge */}
                  <div className="flex md:flex-col items-center md:items-start gap-3">
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${getRiskColor(
                        dataType.riskLevel
                      )}`}
                    >
                      <RiskIcon className="w-4 h-4" />
                      {dataType.riskLevel.toUpperCase()} RISK
                    </div>
                    {isSelected && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        Selected
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredData.length === 0 && (
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

      {/* Sources Section */}
      <section className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Academic Sources & References
          </h3>
          <div className="flex flex-col text-sm text-blue-500 space-y-2">
            <a href="https://www.mordorintelligence.com/industry-reports/data-broker-market">
              • Mordor Intelligence (2024). Data Broker Market Analysis &
              Forecast 2025-2030
            </a>
            <a href="https://proton.me/blog/what-is-your-data-worth">
              • Proton (2025). What's Your Data Really Worth? Industry Analysis
            </a>
            <a href="https://christophertonetti.com/files/papers/JonesTonetti_DataNonrivalry.pdf">
              • Jones, C. I., & Tonetti, C. (Stanford GSB). The Economics of
              Nonrival Data
            </a>
            <a href="https://www.theguardian.com/news/2018/mar/17/cambridge-analytica-facebook-influence-us-election">
              • Cadwalladr, C. (The Guardian, 2018). Cambridge Analytica
              Whistleblower Investigation
            </a>
            <a href="https://www.bbc.co.uk/news/technology-64075067">
              • Facebook-Cambridge Analytica Scandal: Historical Analysis
              (Multiple Sources)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyEconomics;
