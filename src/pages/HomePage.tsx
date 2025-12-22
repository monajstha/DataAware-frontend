import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Eye, DollarSign, Lock, TrendingUp, Users } from "lucide-react";

const Home: React.FC = () => {
  const stats = [
    { icon: Eye, value: "70%", label: "Apps track your location" },
    { icon: Users, value: "5.3B", label: "Data points collected daily" },
    {
      icon: DollarSign,
      value: "$200",
      label: "Average Revenue Per User (ARPU)",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Discover What's Tracked",
      description:
        "See exactly what data each app collects—from location to contacts to browsing habits.",
    },
    {
      icon: DollarSign,
      title: "Understand Your Value",
      description:
        "Learn how much your personal data is worth and who profits from it.",
    },
    {
      icon: Lock,
      title: "Take Control",
      description:
        "Get actionable tips to protect your privacy and make informed choices.",
    },
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-block">
              <span className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
                Data Privacy Education
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Understand your data.
              <br />
              <span className="text-blue-600">Control your privacy.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Every app you use collects data. DataAware helps you understand
              what's being tracked, who's profiting, and how to protect
              yourself.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to={"/privacy-guide"}
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg shadow-blue-600/20 cursor-pointer"
              >
                Start Learning
              </Link>
              <Link
                to={"/categories"}
                // onClick={() => (window.location.href = "/categories")}
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-lg transition-colors border-2 border-gray-200 cursor-pointer"
              >
                Explore Categories
              </Link>
            </div>
          </motion.div>

          {/* Right: Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Central Phone Illustration */}
            <div className="relative mx-auto w-64 md:w-80 h-[500px] md:h-[600px]">
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-linear-to-br from-gray-900 to-gray-800 rounded-[3rem] shadow-2xl p-3">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Screen Content */}
                  <div className="absolute inset-0 bg-linear-to-b from-blue-50 to-white p-6 flex flex-col">
                    {/* App Icons Grid */}
                    <div className="grid grid-cols-3 gap-4 mt-12">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                        <div
                          key={i}
                          className="aspect-square bg-linear-to-br from-blue-400 to-blue-600 rounded-2xl shadow-md"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Data Points */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-8 top-20 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
              >
                <Eye className="w-6 h-6 text-orange-500 mb-2" />
                <p className="text-xs font-semibold text-gray-900">Location</p>
                <p className="text-xs text-gray-500">Tracked</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -right-8 top-32 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
              >
                <Users className="w-6 h-6 text-purple-500 mb-2" />
                <p className="text-xs font-semibold text-gray-900">Contacts</p>
                <p className="text-xs text-gray-500">Accessed</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -left-6 bottom-32 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
              >
                <TrendingUp className="w-6 h-6 text-green-500 mb-2" />
                <p className="text-xs font-semibold text-gray-900">Analytics</p>
                <p className="text-xs text-gray-500">$3.50/mo</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            How DataAware Works
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We analyze app permissions, tracking mechanisms, and data
            monetization to give you a complete picture of your digital
            footprint.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-br from-blue-600 to-blue-700 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to understand your data?
            </h2>
            <p className="text-lg md:text-xl text-blue-50 mb-8">
              Start exploring how apps collect and profit from your personal
              information.
            </p>
            <Link
              to={"/categories"}
              //   onClick={() => window.location.href = '/categories'}
              className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-blue-600 font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg cursor-pointer"
            >
              Explore App Categories
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
