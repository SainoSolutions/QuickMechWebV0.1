import React from 'react';
import { motion } from 'framer-motion';
import { Car, Mail, Phone, MapPin, Heart, Share2, MessageCircle, Zap, Apple, Download } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Heart, href: '#', label: 'Like', color: 'hover:text-red-400' },
    { icon: Share2, href: '#', label: 'Share', color: 'hover:text-blue-400' },
    { icon: MessageCircle, href: '#', label: 'Message', color: 'hover:text-green-400' },
    { icon: Zap, href: '#', label: 'Connect', color: 'hover:text-yellow-400' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <footer className="bg-primary pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-secondary/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <Car className="text-secondary w-8 h-8" />
              <span className="text-2xl font-bold text-white">Quick Mech</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner for doorstep car and bike maintenance. Download our app today and get premium service at your convenience.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'About Us', 'Privacy Policy', 'Terms & Conditions'].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-400 hover:text-secondary transition-colors text-sm">{link}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-white font-bold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {['Car Wash', 'Oil Service', 'Battery Care', 'AC Service', 'Wheel Alignment', 'Inspection'].map((service, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-400 hover:text-secondary transition-colors text-sm">{service}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-1" />
                <span>Mumbai, Delhi, Bangalore & More</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <span>support@quickmech.in</span>
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-white font-bold mb-6">Follow Us</h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-secondary hover:border-secondary transition-all ${social.color}`}
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* App Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-12 px-8 rounded-2xl bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-white/10 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-3">Download Our App</h3>
              <p className="text-gray-400 mb-6">
                Get exclusive deals, track your bookings, and enjoy premium car maintenance services. Available on both platforms.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex items-center justify-center gap-3 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-all shadow-lg"
              >
                <Download className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Get it on</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex items-center justify-center gap-3 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-all shadow-lg"
              >
                <Apple className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on</div>
                  <div className="font-bold">App Store</div>
                </div>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div 
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Quick Mech. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">  
            <p className="hover:text-gray-300 transition-colors">Powered by Saino Solutions</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
