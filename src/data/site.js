export const BRAND = {
  name: 'QuickMech',
  motto: 'We wrench. You chill.',
  supportEmail: 'support@quickmech.in',
  supportPhone: '+91 8787451886',
  /** Shared hero + loader background */
  heroImage: '/art/hero-shared.jpg?v=2',
  legal: {
    privacy: '/docs/privacy-policy',
    terms: '/docs/terms-and-conditions',
    /** Same path apps expect on quickmech.in — served by this site, not an external hop. */
    refund: '/refund-policy',
    /** Google Play / App Store account-deletion resource URL. */
    deleteAccount: '/docs/delete-account',
  },
};

export const SERVICES = [
  {
    id: 'basic-service',
    name: 'Basic Service',
    blurb: 'Oil, filters, and essentials — done at your door.',
    image: '/services/basic-service.jpg',
  },
  {
    id: 'full-service',
    name: 'Full Service',
    blurb: 'Deep care for cars and bikes that deserve a reset.',
    image: '/services/full-service.jpg',
  },
  {
    id: 'car-wash',
    name: 'Car Wash',
    blurb: 'Exterior shine without the driveway mess.',
    image: '/services/car-wash.jpg',
  },
  {
    id: 'battery-care',
    name: 'Battery Care',
    blurb: 'Health check, jump, or swap when you’re stranded.',
    image: '/services/battery-care.jpg',
  },
  {
    id: 'ac-service',
    name: 'AC Service',
    blurb: 'Cool cabin, clear vents, ready for the heat.',
    image: '/services/ac-service.jpg',
  },
  {
    id: 'wheel-alignment',
    name: 'Wheel Alignment',
    blurb: 'Straighter ride, longer tyre life.',
    image: '/services/wheel-alignment.jpg',
  },
  {
    id: 'detailing',
    name: 'Detailing',
    blurb: 'Interior and exterior polish that looks showroom-fresh.',
    image: '/services/detailing.jpg',
  },
  {
    id: 'inspection',
    name: 'Inspection',
    blurb: 'Know what’s wrong before you spend.',
    image: '/services/inspection.jpg',
  },
  {
    id: 'custom-service',
    name: 'Custom Request',
    blurb: 'Describe the job — we price it and send a mechanic.',
    image: '/services/custom-service.jpg',
  },
];

export const HOW_STEPS = [
  {
    title: 'Book in a minute',
    text: 'Pick a service, share your location, and confirm — doorstep care starts there.',
  },
  {
    title: 'Track live',
    text: 'See your verified mechanic on the map as they head your way.',
  },
  {
    title: 'OTP handoff',
    text: 'Start and complete the job with secure codes so you’re always in control.',
  },
  {
    title: 'Pay your way',
    text: 'UPI, cards, net banking, or cash — clear pricing before work begins.',
  },
];

export const WHY = [
  {
    title: 'Verified mechanics',
    text: 'Rated pros who finish the job on-site — not a mystery garage miles away.',
    image: '/art/mechanic.jpg',
  },
  {
    title: 'Transparent pricing',
    text: 'See the quote up front. No surprise invoices after the wrench stops turning.',
    image: '/art/why-pricing.jpg',
  },
  {
    title: '30-day warranty',
    text: 'Labor and genuine parts covered so you can chill after we wrench.',
    image: '/art/why-warranty.jpg',
  },
  {
    title: 'Live tracking',
    text: 'Know who’s coming and when — right inside the QuickMech app.',
    image: '/art/why-tracking.jpg',
  },
];

export const FAQ_ITEMS = [
  {
    q: 'How does doorstep service work?',
    a: 'Book in the app, a verified mechanic arrives at your location, and the job is completed on-site.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'UPI, cards, net banking, and cash on delivery — depending on your region.',
  },
  {
    q: 'Is there a warranty?',
    a: 'Yes. We offer a 30-day warranty on labor and genuine parts for eligible jobs.',
  },
  {
    q: 'Can I track my mechanic?',
    a: 'Yes. Live location tracking is built into the QuickMech customer app.',
  },
  {
    q: 'What if I need something not listed?',
    a: 'Use Custom Request — describe the job, we price it, and send a mechanic to your door.',
  },
];
