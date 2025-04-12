'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ArrowRight, X } from 'lucide-react';

// Languages supported by the platform
const languages = [
  { name: 'English', code: 'en', nativeName: 'English' },
  { name: 'Hindi', code: 'hi', nativeName: 'हिंदी' },
  { name: 'Bengali', code: 'bn', nativeName: 'বাংলা' },
  { name: 'Telugu', code: 'te', nativeName: 'తెలుగు' },
  { name: 'Tamil', code: 'ta', nativeName: 'தமிழ்' },
  { name: 'Marathi', code: 'mr', nativeName: 'मराठी' },
  { name: 'Gujarati', code: 'gu', nativeName: 'ગુજરાતી' },
  { name: 'Kannada', code: 'kn', nativeName: 'ಕನ್ನಡ' },
  { name: 'Malayalam', code: 'ml', nativeName: 'മലയാളം' },
];

// Topics for the user's interests
const legalTopics = [
  { id: 'family', name: 'Family Law' },
  { id: 'property', name: 'Property Rights' },
  { id: 'consumer', name: 'Consumer Protection' },
  { id: 'employment', name: 'Employment Law' },
  { id: 'criminal', name: 'Criminal Law' },
  { id: 'womens-rights', name: 'Women\'s Rights' },
  { id: 'senior-citizens', name: 'Senior Citizen Issues' },
  { id: 'dispute', name: 'Dispute Resolution' },
];

interface OnboardingModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function OnboardingModal({ isOpen: propIsOpen, onClose: propOnClose }: OnboardingModalProps = {}) {
  // Internal state for when props are not provided
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  // Combined state - use props if provided, otherwise use internal state
  const isOpen = propIsOpen !== undefined ? propIsOpen : internalIsOpen;
  const onClose = propOnClose || (() => setInternalIsOpen(false));
  
  // Check if this is the user's first visit
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      // Check if user has seen onboarding before
      const hasSeenOnboarding = localStorage.getItem('has-seen-onboarding');
      
      // If this is first visit and no isOpen prop is provided, show the modal
      if (!hasSeenOnboarding && propIsOpen === undefined) {
        setInternalIsOpen(true);
      }
    }
  }, [propIsOpen]);
  
  // State for tracking onboarding steps
  const [step, setStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [accessibilityOptions, setAccessibilityOptions] = useState({
    textToSpeech: false,
    highContrast: false,
    simplifiedLanguage: false,
    largerText: false,
  });

  // Toggle a topic selection
  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId) 
        : [...prev, topicId]
    );
  };

  // Toggle accessibility option
  const toggleAccessibilityOption = (option: keyof typeof accessibilityOptions) => {
    setAccessibilityOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  // Handle next step
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save preferences and close modal
      const userPreferences = {
        language: selectedLanguage,
        topics: selectedTopics,
        accessibility: accessibilityOptions,
      };
      
      // Save to local storage
      localStorage.setItem('user-preferences', JSON.stringify(userPreferences));
      localStorage.setItem('has-seen-onboarding', 'true');
      
      // Close the modal
      onClose();
    }
  };

  // Handle back step
  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.2,
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2,
      }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }
    },
    exit: { 
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  const stepVariants = {
    hidden: { 
      opacity: 0,
      x: 50
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }
    },
    exit: { 
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-card border border-border w-full max-w-xl rounded-lg shadow-xl z-50"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-xl font-semibold">Welcome to BhashaBandhu</h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-accent/10 text-muted-foreground"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal body */}
            <div className="py-8 px-6">
              {/* Step indicators */}
              <div className="flex justify-center mb-8">
                {[1, 2, 3].map(stepNumber => (
                  <div 
                    key={stepNumber}
                    className={`flex items-center ${stepNumber !== 3 ? 'w-24' : ''}`}
                  >
                    {/* Step circle */}
                    <div
                      className={`rounded-full w-10 h-10 flex items-center justify-center ${
                        stepNumber === step
                          ? 'bg-primary text-primary-foreground'
                          : stepNumber < step
                          ? 'bg-primary/20 text-primary'
                          : 'bg-accent/20 text-muted-foreground'
                      }`}
                    >
                      {stepNumber < step ? <Check size={18} /> : stepNumber}
                    </div>
                    
                    {/* Connector line */}
                    {stepNumber !== 3 && (
                      <div className="h-[2px] w-full">
                        <div 
                          className={`h-full ${
                            step > stepNumber ? 'bg-primary' : 'bg-accent/20'
                          }`} 
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Content based on current step */}
              <div className="relative min-h-[350px]">
                <AnimatePresence mode="wait">
                  {/* Step 1: Language Selection */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute inset-0"
                    >
                      <div className="text-center mb-8">
                        <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-3">Select Your Preferred Language</h3>
                        <p className="text-muted-foreground">
                          Choose the language you're most comfortable with. You can change this anytime.
                        </p>
                      </div>

                      {/* Language grid */}
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        {languages.map((language) => (
                          <button
                            key={language.code}
                            className={`rounded-lg border p-3 text-center transition-colors ${
                              selectedLanguage === language.code
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border hover:border-primary/30 hover:bg-accent/5'
                            }`}
                            onClick={() => setSelectedLanguage(language.code)}
                          >
                            <div className="font-medium">{language.nativeName}</div>
                            <div className="text-sm text-muted-foreground">{language.name}</div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Topic Selection */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute inset-0"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-lg font-semibold mb-3">What Legal Topics Interest You?</h3>
                        <p className="text-muted-foreground">
                          Select topics that are relevant to you. This helps us personalize your experience.
                        </p>
                      </div>

                      {/* Topics grid */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {legalTopics.map((topic) => (
                          <button
                            key={topic.id}
                            className={`rounded-lg border p-3 text-left transition-colors flex items-center ${
                              selectedTopics.includes(topic.id)
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border hover:border-primary/30 hover:bg-accent/5'
                            }`}
                            onClick={() => toggleTopic(topic.id)}
                          >
                            <div className={`w-5 h-5 rounded-full border ${
                              selectedTopics.includes(topic.id) 
                                ? 'bg-primary border-primary' 
                                : 'border-muted-foreground'
                            } mr-3 flex items-center justify-center flex-shrink-0`}>
                              {selectedTopics.includes(topic.id) && (
                                <Check size={12} className="text-primary-foreground" />
                              )}
                            </div>
                            <span>{topic.name}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Accessibility Preferences */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute inset-0"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-lg font-semibold mb-3">Accessibility Preferences</h3>
                        <p className="text-muted-foreground">
                          Customize your experience with these optional accessibility features.
                        </p>
                      </div>

                      {/* Accessibility options */}
                      <div className="space-y-4 mb-6">
                        {/* Text to speech */}
                        <div className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/30 hover:bg-accent/5 cursor-pointer"
                          onClick={() => toggleAccessibilityOption('textToSpeech')}>
                          <div>
                            <h4 className="font-medium text-base">Text-to-Speech</h4>
                            <p className="text-sm text-muted-foreground mt-1">Enable audio narration of text content</p>
                          </div>
                          <div className={`w-12 h-6 rounded-full transition-colors ${
                            accessibilityOptions.textToSpeech ? 'bg-primary' : 'bg-accent/30'
                          } flex items-center`}>
                            <div className={`w-5 h-5 rounded-full bg-background shadow-md transition-transform ${
                              accessibilityOptions.textToSpeech ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </div>
                        </div>

                        {/* High contrast */}
                        <div className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/30 hover:bg-accent/5 cursor-pointer"
                          onClick={() => toggleAccessibilityOption('highContrast')}>
                          <div>
                            <h4 className="font-medium text-base">High Contrast Mode</h4>
                            <p className="text-sm text-muted-foreground mt-1">Increase contrast for better visibility</p>
                          </div>
                          <div className={`w-12 h-6 rounded-full transition-colors ${
                            accessibilityOptions.highContrast ? 'bg-primary' : 'bg-accent/30'
                          } flex items-center`}>
                            <div className={`w-5 h-5 rounded-full bg-background shadow-md transition-transform ${
                              accessibilityOptions.highContrast ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </div>
                        </div>

                        {/* Simplified language */}
                        <div className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/30 hover:bg-accent/5 cursor-pointer"
                          onClick={() => toggleAccessibilityOption('simplifiedLanguage')}>
                          <div>
                            <h4 className="font-medium text-base">Simplified Language</h4>
                            <p className="text-sm text-muted-foreground mt-1">Use simpler terms and explanations</p>
                          </div>
                          <div className={`w-12 h-6 rounded-full transition-colors ${
                            accessibilityOptions.simplifiedLanguage ? 'bg-primary' : 'bg-accent/30'
                          } flex items-center`}>
                            <div className={`w-5 h-5 rounded-full bg-background shadow-md transition-transform ${
                              accessibilityOptions.simplifiedLanguage ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </div>
                        </div>

                        {/* Larger text */}
                        <div className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/30 hover:bg-accent/5 cursor-pointer"
                          onClick={() => toggleAccessibilityOption('largerText')}>
                          <div>
                            <h4 className="font-medium text-base">Larger Text</h4>
                            <p className="text-sm text-muted-foreground mt-1">Increase the text size throughout the app</p>
                          </div>
                          <div className={`w-12 h-6 rounded-full transition-colors ${
                            accessibilityOptions.largerText ? 'bg-primary' : 'bg-accent/30'
                          } flex items-center`}>
                            <div className={`w-5 h-5 rounded-full bg-background shadow-md transition-transform ${
                              accessibilityOptions.largerText ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Modal footer */}
            <div className="p-5 border-t border-border flex justify-between">
              {step > 1 ? (
                <button 
                  onClick={handleBackStep}
                  className="px-5 py-2.5 rounded-md border border-border hover:bg-accent/5 font-medium"
                >
                  Back
                </button>
              ) : (
                <div></div> // Empty div to maintain flex spacing
              )}

              <button 
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-medium flex items-center shadow-sm hover:bg-primary/90"
              >
                {step < 3 ? 'Next' : 'Get Started'}
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}