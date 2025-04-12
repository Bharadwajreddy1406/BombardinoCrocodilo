'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Testimonial type definition
type Testimonial = {
  id: number;
  quote: string;
  author: string;
  role: string;
  language?: string;
  avatar?: string;
};

// Sample testimonials data
const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "BhashaBandhu helped me understand my tenant rights in my native language. I was able to successfully negotiate with my landlord because of the clear guidance I received.",
    author: "Priya Sharma",
    role: "Tenant, Delhi",
    language: "Hindi",
  },
  {
    id: 2,
    quote: "As a community legal aid worker, this platform has become an invaluable tool. I can now assist people in multiple languages with accurate legal information.",
    author: "Rajesh Kumar",
    role: "Legal Aid Worker, Mumbai",
    language: "Marathi",
  },
  {
    id: 3,
    quote: "The interactive learning modules made complex legal concepts easy to understand. I now feel confident navigating the consumer protection laws in my region.",
    author: "Lakshmi Narayanan",
    role: "Small Business Owner, Chennai",
    language: "Tamil",
  },
  {
    id: 4,
    quote: "Finding pro bono legal help used to be challenging in my rural area. The Legal Aid Locator helped me connect with a lawyer who took my case for free.",
    author: "Rahul Mehta",
    role: "Farmer, Uttar Pradesh",
    language: "Hindi",
  },
  {
    id: 5,
    quote: "The AI assistant answered my questions about divorce proceedings clearly and compassionately. It guided me through each step in my language.",
    author: "Sunita Reddy",
    role: "Single Parent, Hyderabad",
    language: "Telugu",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Animation variants for the testimonial carousel
  const slideVariants = {
    hiddenRight: {
      x: 300,
      opacity: 0,
    },
    hiddenLeft: {
      x: -300,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  // Handle navigation to the next testimonial
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setAutoplay(false);
  };

  // Handle navigation to the previous testimonial
  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setAutoplay(false);
  };

  // Autoplay functionality
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (autoplay) {
      intervalId = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoplay, currentIndex]);

  // Re-enable autoplay after 10 seconds of inactivity
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAutoplay(true);
    }, 10000);
    
    return () => clearTimeout(timeoutId);
  }, [autoplay]);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
          >
            Voices from Our Community
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            Hear how our platform is making legal knowledge accessible across different languages and communities.
          </motion.p>
        </div>
        
        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-2xl shadow-lg p-6 md:p-10">
            {/* Quote icon */}
            <div className="absolute top-6 left-6 text-primary/10">
              <Quote size={80} />
            </div>
            
            {/* Testimonial content */}
            <div className="min-h-[260px] flex flex-col justify-center items-center text-center relative z-10">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={testimonials[currentIndex].id}
                  custom={direction}
                  variants={slideVariants}
                  initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
                  animate="visible"
                  exit="exit"
                  className="absolute w-full"
                >
                  <blockquote>
                    <p className="text-xl md:text-2xl font-medium italic text-foreground mb-6">
                      "{testimonials[currentIndex].quote}"
                    </p>
                    <footer className="mt-4">
                      <div className="flex flex-col items-center">
                        {testimonials[currentIndex].avatar ? (
                          <div className="w-12 h-12 rounded-full overflow-hidden mb-3">
                            <img
                              src={testimonials[currentIndex].avatar}
                              alt={testimonials[currentIndex].author}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <span className="text-primary text-lg font-bold">
                              {testimonials[currentIndex].author.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="text-center">
                          <p className="font-semibold text-foreground">
                            {testimonials[currentIndex].author}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {testimonials[currentIndex].role}
                            {testimonials[currentIndex].language && (
                              <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                {testimonials[currentIndex].language}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevious}
                className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </motion.button>
              
              {/* Pagination dots */}
              <div className="flex items-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                      setAutoplay(false);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-primary scale-125' 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}