import React from 'react';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';

const CustomRequest = () => {
  return (
    <section className="py-10 bg-darkBg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Background decorative blob */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="bg-secondary/20 p-4 rounded-full border border-secondary/30">
                <Wrench className="w-10 h-10 text-secondary" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Need something special?</h3>
                <p className="text-gray-300">We've got you covered. Describe your issue and our experts will handle it.</p>
              </div>
            </div>
            
            <button className="whitespace-nowrap px-8 py-4 bg-white text-primary font-bold rounded-full text-lg hover:bg-gray-100 transition-all shadow-lg transform hover:scale-105 w-full md:w-auto">
              Request Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomRequest;
