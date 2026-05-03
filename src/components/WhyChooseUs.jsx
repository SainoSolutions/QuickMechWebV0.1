import React from 'react';
import { motion } from 'framer-motion';
import { whyChooseUs } from '../utils/data';
import * as Icons from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-20 bg-primary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Quick Mech</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience the difference with our premium doorstep service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((feature, index) => {
            const Icon = Icons[feature.icon];
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glassmorphism p-8 rounded-3xl text-center group hover:bg-white/10 transition-colors"
              >
                <div className="w-16 h-16 mx-auto bg-secondary/20 rounded-2xl flex items-center justify-center mb-6 border border-secondary/30 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
