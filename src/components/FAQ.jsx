import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What services does QuickMech offer?",
      answer: "QuickMech provides comprehensive car maintenance services including basic service, full service, car wash, battery care, AC service, wheel alignment, detailing, and 100-point inspections. All services are available at your doorstep!"
    },
    {
      question: "How do I book a service through the app?",
      answer: "Simply download the QuickMech app from Google Play or App Store, sign up, select your desired service, choose a convenient date and time, and confirm your booking. Our mechanic will arrive at your location with all necessary tools."
    },
    {
      question: "Are your mechanics verified and trained?",
      answer: "Yes! All our mechanics are thoroughly verified and trained professionals. We conduct background checks and continuous skill assessments to ensure the highest quality of service for our customers."
    },
    {
      question: "What is the pricing for services?",
      answer: "Our pricing is transparent with no hidden charges. Prices vary by service type - ranging from ₹299 for battery care to ₹2499 for premium detailing. You'll see the exact price before confirming your booking."
    },
    {
      question: "Can I schedule service for a specific date and time?",
      answer: "Absolutely! You can choose any date from tomorrow onwards and select from available time slots. Our scheduling system allows you to pick a time that suits your convenience best."
    },
    {
      question: "How long does each service typically take?",
      answer: "Service duration varies: Basic Service (45 mins), Full Service (2 hours), Car Wash (30 mins), Battery Care (20 mins), AC Service (1.5 hours), Wheel Alignment (1 hour), Detailing (3 hours), and Inspection (1.5 hours)."
    },
    {
      question: "Is the service available in my area?",
      answer: "We're currently available in Guwahati (Assam). Enter your location in the app to check availability."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept multiple payment methods including credit/debit cards, UPI, digital wallets, and cash payments. All transactions are secure and encrypted."
    },
    {
      question: "What if I need to reschedule or cancel?",
      answer: "You can easily reschedule or cancel your booking through the app. Cancellations made 24 hours before the service are free. Late cancellations may have a small fee."
    },
    {
      question: "Do you provide warranty on services?",
      answer: "Yes! All our services come with a service guarantee. If you're not satisfied, we'll redo the service for free within 48 hours."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-darkBg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-8 h-8 text-orange-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find answers to common questions about QuickMech services and app features
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className={`w-full px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-between border-2 ${
                  openIndex === index
                    ? 'bg-gradient-to-r from-orange-500/20 to-purple-500/20 border-orange-400/50'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <span className="text-left text-white font-semibold text-lg">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className={`w-6 h-6 ${openIndex === index ? 'text-orange-400' : 'text-gray-400'}`} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-white/5 border-l-4 border-orange-400 rounded-b-lg mt-1">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Additional Help CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-400/30 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3">Didn't find your answer?</h3>
          <p className="text-gray-400 mb-6">
            Can't find the answer you're looking for? Our support team is here to help!
          </p>
          <a href="#inquiry" className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30">
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
