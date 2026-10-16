import React, { useState } from 'react';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioGallery } from './components/PortfolioGallery';
import { ProjectEstimator } from './components/ProjectEstimator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ServiceCategory } from './types';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceCategory | null>(null);
  const [attachedEstimate, setAttachedEstimate] = useState<{
    platform: string;
    estimatedCost: string;
    estimatedWeeks: string;
    category: ServiceCategory;
    selectedFeatures: string[];
  } | null>(null);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceSelect = (service: ServiceCategory) => {
    setSelectedService(service);
  };

  const handleAttachEstimate = (estimate: {
    platform: string;
    estimatedCost: string;
    estimatedWeeks: string;
    category: ServiceCategory;
    selectedFeatures: string[];
  }) => {
    setAttachedEstimate(estimate);
    setSelectedService(estimate.category);
  };

  return (
    <AnalyticsProvider>
      <div className="min-h-screen bg-[#070b14] text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950 flex flex-col font-sans">
        {/* Top Bar Contract Navbar */}
        <Navbar onNavigate={handleNavigate} />

        <main className="flex-1">
          {/* Hero Section with 3D Three.js Studio Scene */}
          <HeroSection
            onSelectService={handleServiceSelect}
            selectedService={selectedService}
            onNavigate={handleNavigate}
          />

          {/* Core Services Section: Mobile, Web, Desktop, Custom */}
          <ServicesSection
            onSelectService={handleServiceSelect}
            onNavigate={handleNavigate}
            selectedCategory={selectedService}
          />

          {/* Verified Case Studies & Portfolio Gallery with Interactive Simulator */}
          <PortfolioGallery
            onNavigate={handleNavigate}
            selectedCategory={selectedService}
          />

          {/* Scope & Cost Estimator */}
          <ProjectEstimator
            onAttachToContact={handleAttachEstimate}
            onNavigate={handleNavigate}
          />

          {/* Verified Client Testimonials */}
          <TestimonialsSection />

          {/* Real-Time User Engagement Analytics Dashboard */}
          <AnalyticsDashboard />

          {/* Contact & Architectural Review Request Form */}
          <ContactSection
            attachedEstimate={attachedEstimate}
            onClearEstimate={() => setAttachedEstimate(null)}
          />
        </main>

        {/* Quiet, Clean Footer */}
        <Footer onNavigate={handleNavigate} />
      </div>
    </AnalyticsProvider>
  );
}
