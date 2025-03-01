import React from "react";
import Footer from "../components/Footer.jsx";
import Testimonials from "../components/Testimonial.jsx";
import { HeroSection } from "../components/HeroSection.jsx";
import Navbar from "../components/Navbar.jsx";
import Features from "../components/Features.jsx";

function LandingPage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Features/>
      <Testimonials />
      <Footer />
    </div>
  );
}

export default LandingPage;
