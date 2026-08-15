import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AmbientBackdrop from './components/AmbientBackdrop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import WhyChooseUs from './components/WhyChooseUs';
import PlayStore from './components/PlayStore';
import Partner from './components/Partner';
import FAQ from './components/FAQ';
import InquiryForm from './components/InquiryForm';
import Footer from './components/Footer';
import SiteLoader from './components/SiteLoader';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicy from './pages/RefundPolicy';
import DeleteAccount from './pages/DeleteAccount';

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <WhyChooseUs />
      <PlayStore />
      <Partner />
      <FAQ />
      <InquiryForm />
    </>
  );
}

function MarketingLayout() {
  return (
    <>
      <AmbientBackdrop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg)] font-sans text-[var(--ink)] antialiased selection:bg-brand/30">
          <SiteLoader />
          <Routes>
            <Route path="/docs/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/docs/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/docs/delete-account" element={<DeleteAccount />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/docs/refund-policy" element={<RefundPolicy />} />
            <Route element={<MarketingLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
