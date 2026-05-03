import React from 'react';
import ServiceCard from './ServiceCard';
import { trendingServices } from '../utils/data';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

const TrendingServices = () => {
  return (
    <section id="trending" className="py-20 bg-primary/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <Flame className="text-secondary w-8 h-8" />
          <h2 className="text-3xl font-bold text-white">Trending Services</h2>
        </div>

        {/* Horizontal Scroll Area */}
        <div className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x snap-mandatory">
          {trendingServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] snap-center shrink-0"
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingServices;
