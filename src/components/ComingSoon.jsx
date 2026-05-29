import { motion } from 'framer-motion';
import { Bell, CalendarClock, Mail, Phone } from 'lucide-react';

const ComingSoon = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Car service workshop"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(11,17,32,0.98),rgba(15,23,42,0.86)_48%,rgba(249,115,22,0.28))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-darkBg to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl"
          >
            Quick Mech is
            <span className="block text-gradient">Coming Soon</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-10 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl"
          >
            We are preparing a smoother doorstep car and bike service experience for Guwahati.
            The app is getting its final polish, and bookings will open soon.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {[
              { icon: CalendarClock, title: 'Doorstep Service', text: 'Car and bike care' },
              { icon: Bell, title: 'App Launch', text: 'Bookings opening soon' }
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-white/10 bg-white/8 p-4 backdrop-blur-md">
                <item.icon className="mb-3 h-6 w-6 text-secondary" />
                <h2 className="mb-1 text-base font-bold text-white">{item.title}</h2>
                <p className="text-sm text-slate-300">{item.text}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col gap-3 text-sm font-semibold text-slate-200 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <a
              href="mailto:SUPPORT@QUICKMECH.IN"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-primary transition hover:bg-orange-100"
            >
              <Mail className="h-4 w-4" />
              SUPPORT@QUICKMECH.IN
            </a>
            <a
              href="tel:+918787451886"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <Phone className="h-4 w-4" />
              +91 8787451886
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
