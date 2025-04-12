'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, BookOpen, MapPin } from 'lucide-react';

// Array of supported languages
const supportedLanguages = [
  { name: 'English', code: 'en' },
  { name: 'हिंदी', code: 'hi' },
  { name: 'বাংলা', code: 'bn' },
  { name: 'తెలుగు', code: 'te' },
  { name: 'தமிழ்', code: 'ta' },
  { name: 'मराठी', code: 'mr' },
  { name: 'ગુજરાતી', code: 'gu' },
  { name: 'ಕನ್ನಡ', code: 'kn' },
  { name: 'മലയാളം', code: 'ml' },
];

export default function HeroSection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }
    },
  };

  const featureCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: {
        delay: 0.4 + (i * 0.1),
        type: 'spring',
        stiffness: 100,
        damping: 10,
      }
    }),
  };

  const languageBubbleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.7 + (i * 0.05),
        type: 'spring',
        stiffness: 200,
        damping: 10,
      }
    }),
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-accent/5 pt-16 pb-24 md:pt-20 md:pb-32">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-50 pointer-events-none">
        <div className="absolute -right-40 -top-40 w-80 h-80 rounded-full bg-primary/10" />
        <div className="absolute -left-20 top-1/4 w-60 h-60 rounded-full bg-accent/10" />
        <div className="absolute right-1/4 bottom-10 w-40 h-40 rounded-full bg-primary/5" />
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main heading */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight"
            variants={childVariants}
          >
            Legal Information <span className="text-primary">Accessible</span> to Everyone
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            variants={childVariants}
          >
            Breaking down legal barriers through multilingual resources, simplified explanations, and AI-powered assistance.
          </motion.p>

          {/* CTA buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12 md:mb-16"
            variants={childVariants}
          >
            <Link href="/ask">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center shadow-lg shadow-primary/20 w-full sm:w-auto"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask a Legal Question
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </Link>

            <Link href="/learn">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium flex items-center justify-center border border-border w-full sm:w-auto"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Learning Resources
              </motion.button>
            </Link>
          </motion.div>

          {/* Language circles */}
          <motion.div 
            className="mb-16 md:mb-20"
            variants={childVariants}
          >
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
              Available in Multiple Languages
            </h2>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {supportedLanguages.map((language, index) => (
                <motion.div
                  key={language.code}
                  custom={index}
                  variants={languageBubbleVariants}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background border border-border shadow-sm flex items-center justify-center text-sm font-medium"
                  title={language.name}
                >
                  {language.code}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Legal Q&A Card */}
            <motion.div
              custom={0}
              variants={featureCardVariants}
              whileHover={{ y: -5 }}
              className="bg-card rounded-xl p-6 border border-border shadow-sm flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Legal Assistant</h3>
              <p className="text-muted-foreground">
                Get answers to your legal questions in multiple languages through our AI-powered assistant.
              </p>
            </motion.div>

            {/* Learning Card */}
            <motion.div
              custom={1}
              variants={featureCardVariants}
              whileHover={{ y: -5 }}
              className="bg-card rounded-xl p-6 border border-border shadow-sm flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Interactive Learning</h3>
              <p className="text-muted-foreground">
                Access simplified legal modules with interactive content to understand your rights and obligations.
              </p>
            </motion.div>

            {/* Locator Card */}
            <motion.div
              custom={2}
              variants={featureCardVariants}
              whileHover={{ y: -5 }}
              className="bg-card rounded-xl p-6 border border-border shadow-sm flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Legal Aid Locator</h3>
              <p className="text-muted-foreground">
                Find nearby legal aid centers, pro bono services, and community resources for in-person assistance.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}