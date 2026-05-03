import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services } from '../utils/data';
import { ArrowLeft, Star, Check, Download, Apple } from 'lucide-react';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.id === parseInt(id));

  if (!service) {
    return (
      <div className="min-h-screen bg-darkBg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-secondary text-white rounded-full hover:bg-orange-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darkBg pt-20">
      {/* Header with Back Button */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-primary/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white hover:text-secondary transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Back</span>
          </motion.button>
        </div>
      </div>

      {/* Hero Image Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-96 overflow-hidden"
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-darkBg"></div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-8 left-8 right-8">
          <h1 className="text-5xl font-bold text-white mb-2">{service.title}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-white font-semibold">{service.rating}</span>
              <span className="text-gray-300">({service.reviews.toLocaleString()} reviews)</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">About This Service</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{service.fullDescription}</p>
            </motion.section>

            {/* Features Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-6">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10 hover:border-orange-400/50 transition-colors"
                  >
                    <Check className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-200">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Benefits Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Benefits</h2>
              <div className="space-y-4">
                {service.benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 text-gray-200 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Price Card */}
            <div className="glass-card rounded-2xl p-8 sticky top-24 mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Pricing</h3>
              <div className="text-5xl font-bold text-secondary mb-6">{service.price}</div>
              <p className="text-gray-400 mb-6">Starting from this price. Actual cost may vary based on vehicle condition.</p>

              {/* App Download CTA */}
              <div className="space-y-4 border-t border-white/10 pt-6">
                <p className="text-sm text-gray-400">Book this service on our app</p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-all"
                >
                  <Download className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Get it on</div>
                    <div className="font-bold">Google Play</div>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-all"
                >
                  <Apple className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on</div>
                    <div className="font-bold">App Store</div>
                  </div>
                </motion.a>
              </div>
            </div>

            {/* Service Info */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h4 className="font-bold text-white text-lg">Service Duration</h4>
              <p className="text-gray-300">{service.duration}</p>
              
              <div className="border-t border-white/10 pt-4">
                <h4 className="font-bold text-white text-lg mb-2">Customer Rating</h4>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(service.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-semibold">{service.rating}/5</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">Based on {service.reviews.toLocaleString()} customer reviews</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 border-t border-white/10 py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Book {service.title}?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Download the QuickMech app now and book this service at your convenience. Fast, reliable, and transparent pricing.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30"
          >
            Back to Top
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default ServiceDetail;
