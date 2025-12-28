
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseOverview from './components/CourseOverview';
import CourseDetails from './components/CourseDetails';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section id="home">
          <Hero />
        </section>
        
        <section id="courses" className="py-20 bg-white">
          <CourseOverview />
        </section>

        <section id="pricing" className="py-20 bg-slate-50">
          <CourseDetails />
        </section>

        <section id="register" className="py-20 bg-white">
          <RegistrationForm />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
