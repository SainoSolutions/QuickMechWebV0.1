import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, CheckCircle, Download, Apple, Zap, MapPin, Star, Clock } from 'lucide-react';

const AppPromotion = () => {
  const features = [
    { icon: Zap, title: 'Instant Booking', desc: 'Book services in seconds' },
    { icon: MapPin, title: 'Real-time Tracking', desc: 'Know exactly when mechanic arrives' },
    { icon: Star, title: 'Exclusive Deals', desc: 'App-only offers and discounts' },
    { icon: Clock, title: 'Service History', desc: 'Track all your car maintenance' }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-darkBg to-primary/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-400/30 rounded-full text-orange-400 font-semibold text-sm mb-6"
              whileHover={{ scale: 1.05 }}
            >
              ⭐ Available Now on App Stores
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Download the <br />
              <span className="text-gradient">Quick Mech App</span>
            </h2>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Your personal car concierge in your pocket. Book premium car maintenance services, track mechanics in real-time, and keep your vehicle in perfect condition.
            </p>

            <div className="space-y-3 mb-10">
              {['✓ Book services anytime, anywhere', '✓ Real-time mechanic tracking', '✓ Exclusive app-only discounts', '✓ Complete service history', '✓ Professional verified mechanics'].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 text-white"
                >
                  <span className="text-orange-400 font-bold">{item.substring(0, 1)}</span>
                  <span className="text-lg">{item.substring(2)}</span>
                </motion.div>
              ))}
            </div>

            {/* App Store Buttons */}
            <div className="app-store-buttons flex flex-col sm:flex-row gap-4">
              <motion.a
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-black text-white rounded-xl hover:bg-gray-900 transition-all shadow-lg shadow-black/50 border border-white/10"
              >
                <Download className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Get it on</div>
                  <div className="font-bold text-lg">Google Play</div>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-black text-white rounded-xl hover:bg-gray-900 transition-all shadow-lg shadow-black/50 border border-white/10"
              >
                <Apple className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on</div>
                  <div className="font-bold text-lg">App Store</div>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/40 to-purple-500/40 rounded-[3rem] transform rotate-6 blur-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1512941691920-25bda36dc6f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Mobile App"
                className="relative z-10 w-full rounded-[3rem] shadow-2xl border-4 border-white/10"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 pt-20 border-t border-white/10"
        >
          <h3 className="text-3xl font-bold text-white mb-12 text-center">Why Choose Our App?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-400/50 transition-all group"
              >
                <div className="p-3 rounded-lg bg-orange-500/20 w-fit mb-4 group-hover:bg-orange-500/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-orange-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-10 rounded-3xl bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-white/10 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Experience Premium Car Care?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust QuickMech for their car maintenance needs.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const buttons = document.querySelector('.app-store-buttons');
              buttons?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30"
          >
            Download Now - It's Free!
          </motion.button>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 blur-[120px] pointer-events-none"></div>
    </section>
  );
};

export default AppPromotion;
