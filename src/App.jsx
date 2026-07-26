import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrendingServices from './components/TrendingServices'
import Services from './components/Services'
import CustomRequest from './components/CustomRequest'
import InquiryForm from './components/InquiryForm'
import FAQ from './components/FAQ'
import WhyChooseUs from './components/WhyChooseUs'
import AppPromotion from './components/AppPromotion'
import Footer from './components/Footer'
import ServiceDetail from './components/ServiceDetail'
import ComingSoon from './components/ComingSoon'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'

// Change this to false when the app is ready to show the full website again.
const COMING_SOON_MODE = true

function HomePage() {
  return (
    <>
      <Hero />
      <TrendingServices />
      <Services />
      <CustomRequest />
      <WhyChooseUs />
      <InquiryForm />
      <FAQ />
      <AppPromotion />
    </>
  )
}

function MarketingLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function ComingSoonLayout() {
  return (
    <>
      <Navbar hideLinks />
      <main>
        <ComingSoon />
      </main>
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="bg-darkBg min-h-screen font-sans text-slate-200 selection:bg-secondary selection:text-white overflow-x-hidden">
        <Routes>
          <Route path="/docs/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/docs/terms-and-conditions" element={<TermsAndConditions />} />

          {COMING_SOON_MODE ? (
            <Route path="*" element={<ComingSoonLayout />} />
          ) : (
            <Route element={<MarketingLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/service/:id" element={<ServiceDetail />} />
            </Route>
          )}
        </Routes>
      </div>
    </Router>
  )
}

export default App
