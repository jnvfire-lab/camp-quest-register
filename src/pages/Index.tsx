import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { MultiStepForm } from '@/components/form/MultiStepForm';

const Index = () => {
  const [showForm, setShowForm] = useState(false);

  const handleStartForm = () => {
    setShowForm(true);
    
    // Smooth scroll to form
    setTimeout(() => {
      const formElement = document.getElementById('registration-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero onStartForm={handleStartForm} />
      
      {/* Form Section */}
      {showForm && (
        <section id="registration-form" className="min-h-screen bg-background py-16">
          <MultiStepForm />
        </section>
      )}
    </div>
  );
};

export default Index;
