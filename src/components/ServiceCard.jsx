import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Check } from 'lucide-react';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/service/${service.id}`);
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative rounded-3xl overflow-hidden group shadow-xl h-72 w-full border border-white/5 hover:border-orange-400/50 transition-colors bg-transparent cursor-pointer"
    >
      {/* Background Image */}
      <img 
        src={service.image} 
        alt={service.title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 opacity-80 mix-blend-multiply ${service.gradient}`}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      {/* Top Badge - Rating Only */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="absolute top-2 right-2 bg-white/20 backdrop-blur-md border border-white/30 px-2 py-0.5 rounded-full flex items-center gap-0.5 group-hover:bg-orange-500/30 transition-colors"
      >
        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
        <span className="text-xs font-semibold text-white">{service.rating}</span>
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Title Section */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
          <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
            {service.description}
          </p>
        </div>

        {/* Bottom Section */}
        <div className="space-y-3">
          {/* Features Preview */}
          <div className="space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {service.features.slice(0, 2).map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                <Check className="w-3 h-3 text-orange-400" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Price and Button */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-secondary font-bold text-lg">{service.price}</span>
              <span className="text-gray-400 text-xs ml-1">onwards</span>
            </div>
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 backdrop-blur-sm p-2 rounded-full border border-white/30 group-hover:bg-secondary group-hover:border-secondary transition-colors"
              title="Learn More"
              aria-hidden="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
