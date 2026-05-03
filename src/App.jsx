import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <Router>
      <div className="bg-darkBg min-h-screen font-sans text-slate-200 selection:bg-secondary selection:text-white overflow-x-hidden">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
