import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, MapPin, CreditCard, AlertCircle } from 'lucide-react';

const BookingFlow = ({ selectedService, setSelectedService }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    address: '',
    carModel: '',
    phone: '',
    email: '',
    paymentMethod: 'card'
  });
  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: 'Service', icon: <CheckCircle2 className="w-5 h-5" /> },
    { id: 2, title: 'Schedule', icon: <Calendar className="w-5 h-5" /> },
    { id: 3, title: 'Details', icon: <MapPin className="w-5 h-5" /> },
    { id: 4, title: 'Payment', icon: <CreditCard className="w-5 h-5" /> },
  ];

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 2) {
      if (!formData.date) newErrors.date = 'Date is required';
      if (!formData.time) newErrors.time = 'Time is required';
    }
    
    if (currentStep === 3) {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.carModel) newErrors.carModel = 'Car model is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.email) newErrors.email = 'Email is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !selectedService) {
      setErrors({ service: 'Please select a service' });
      return;
    }
    
    if (validateStep(step)) {
      setStep(Math.min(4, step + 1));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleConfirmBooking = () => {
    alert(`Booking confirmed for ${selectedService.title}!\nDetails will be sent to ${formData.email}`);
    // Reset form
    setStep(1);
    setSelectedService(null);
    setFormData({
      date: '',
      time: '',
      address: '',
      carModel: '',
      phone: '',
      email: '',
      paymentMethod: 'card'
    });
  };

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <section id="booking" className="py-20 bg-darkBg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Easy Booking in 4 Steps</h2>
          <p className="text-gray-400">Complete your booking quickly and securely</p>
        </motion.div>

        <div className="glass-card rounded-3xl p-6 md:p-10">
          {/* Progress Indicator */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -z-10 -translate-y-1/2 rounded-full"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 -z-10 -translate-y-1/2 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {steps.map((s) => (
              <motion.div 
                key={s.id} 
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step >= s.id 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/40 border border-orange-400' 
                    : 'bg-primary border border-white/20 text-gray-400'
                }`}>
                  {s.icon}
                </div>
                <span className={`mt-2 text-sm font-medium hidden sm:block ${step >= s.id ? 'text-white' : 'text-gray-500'}`}>
                  {s.title}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Form Area */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[350px] flex items-center justify-center border border-white/10 rounded-2xl bg-white/5 mb-8 p-6"
          >
            {/* Step 1: Service Selection */}
            {step === 1 && (
              <div className="w-full max-w-md">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Select Your Service</h3>
                {selectedService ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-orange-400/30 p-8 rounded-2xl flex flex-col items-center gap-6"
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-orange-400 shadow-lg shadow-orange-500/30">
                      <img src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center">
                      <h4 className="text-3xl font-bold text-white">{selectedService.title}</h4>
                      <p className="text-orange-400 font-semibold mt-2 text-lg">{selectedService.price}</p>
                      <p className="text-gray-400 text-sm mt-2">{selectedService.duration}</p>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedService(null)}
                      className="text-sm text-orange-400 hover:text-orange-300 underline mt-2 transition-colors"
                    >
                      Change Service
                    </motion.button>
                  </motion.div>
                ) : (
                  <div className="py-12 text-center">
                    <AlertCircle className="w-16 h-16 text-gray-500 mx-auto mb-4 opacity-50" />
                    <p className="text-gray-400 mb-6">No service selected yet.</p>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                      className="px-8 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30"
                    >
                      Browse Services
                    </motion.button>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Schedule */}
            {step === 2 && (
              <div className="w-full max-w-md space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Select Date</label>
                  <input
                    type="date"
                    name="date"
                    min={minDate}
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
                  />
                  {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Select Time</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-400 transition-colors"
                  >
                    <option value="">Choose a time slot</option>
                    <option value="08:00">8:00 AM - 9:00 AM</option>
                    <option value="09:00">9:00 AM - 10:00 AM</option>
                    <option value="10:00">10:00 AM - 11:00 AM</option>
                    <option value="11:00">11:00 AM - 12:00 PM</option>
                    <option value="14:00">2:00 PM - 3:00 PM</option>
                    <option value="15:00">3:00 PM - 4:00 PM</option>
                    <option value="16:00">4:00 PM - 5:00 PM</option>
                    <option value="17:00">5:00 PM - 6:00 PM</option>
                  </select>
                  {errors.time && <p className="text-red-400 text-sm mt-1">{errors.time}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Details */}
            {step === 3 && (
              <div className="w-full max-w-md space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Car Model</label>
                  <input
                    type="text"
                    name="carModel"
                    placeholder="e.g., Honda City, Maruti Swift"
                    value={formData.carModel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
                  />
                  {errors.carModel && <p className="text-red-400 text-sm mt-1">{errors.carModel}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Service Address</label>
                  <textarea
                    name="address"
                    placeholder="Full address including city and ZIP code"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors resize-none"
                  />
                  {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payment */}
            {step === 4 && (
              <div className="w-full max-w-md">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Payment Method</h3>
                
                <div className="space-y-4 mb-8">
                  {[
                    { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                    { id: 'upi', label: 'UPI Payment', icon: '📱' },
                    { id: 'wallet', label: 'Digital Wallet', icon: '👛' }
                  ].map(method => (
                    <motion.label
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.paymentMethod === method.id
                          ? 'border-orange-400 bg-orange-500/10'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleInputChange}
                        className="mr-4"
                      />
                      <span className="text-2xl mr-3">{method.icon}</span>
                      <span className="text-white font-semibold">{method.label}</span>
                    </motion.label>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-3">
                  <h4 className="font-bold text-white mb-4">Order Summary</h4>
                  <div className="flex justify-between text-gray-300">
                    <span>Service:</span>
                    <span className="font-semibold">{selectedService?.title}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Date & Time:</span>
                    <span className="font-semibold">{formData.date} @ {formData.time}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between text-white font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-orange-400">{selectedService?.price}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                step === 1 
                  ? 'bg-white/5 text-gray-500 cursor-not-allowed' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Back
            </motion.button>
            
            <div className="flex-1"></div>

            {step < 4 ? (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={step === 1 && !selectedService}
                className={`px-8 py-3 rounded-full font-medium transition-all ${
                  (step === 1 && !selectedService)
                    ? 'bg-orange-500/50 text-white/50 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 hover:scale-110'
                }`}
              >
                Continue
              </motion.button>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConfirmBooking}
                className="px-8 py-3 rounded-full font-medium bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/30 transition-all"
              >
                Confirm Booking
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingFlow;
