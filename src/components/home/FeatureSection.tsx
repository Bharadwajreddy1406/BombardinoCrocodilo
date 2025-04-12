'use client';

import { motion } from 'framer-motion';
import { Feather, BookOpenIcon, MapPinIcon, GlobeIcon, ShieldCheckIcon, UserIcon } from 'lucide-react';

// Feature item type
type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
};

// List of platform features
const features: Feature[] = [
  {
    title: 'AI Legal Assistant',
    description: 'Get accurate legal guidance through our AI-powered assistant that responds to your questions in multiple languages.',
    icon: Feather,
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  },
  {
    title: 'Interactive Learning',
    description: 'Access simplified legal courses and materials designed for non-lawyers, with quizzes to test your understanding.',
    icon: BookOpenIcon,
    color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
  },
  {
    title: 'Legal Aid Locator',
    description: 'Find nearby legal aid centers, pro bono services, and community resources using our interactive map.',
    icon: MapPinIcon,
    color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
  },
  {
    title: 'Multilingual Support',
    description: 'Access legal information in your preferred language with our comprehensive translation services.',
    icon: GlobeIcon,
    color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  },
  {
    title: 'Document Security',
    description: 'Upload and store your legal documents securely with enterprise-grade encryption and privacy controls.',
    icon: ShieldCheckIcon,
    color: 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400',
  },
  {
    title: 'Personalized Experience',
    description: 'Get recommendations and resources tailored to your specific needs and legal situation.',
    icon: UserIcon,
    color: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400',
  },
];

export default function FeatureSection() {
  // Framer motion animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  // Feature card component with hover effects
  const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
    return (
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
        className="flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-200"
      >
        <div className="mb-4 flex items-center space-x-3">
          {/* Icon with color */}
          <div className={`rounded-lg p-2.5 ${feature.color}`}>
            <feature.icon className="h-6 w-6" />
          </div>
          
          {/* Feature title with number */}
          <h3 className="text-xl font-semibold">
            {feature.title}
          </h3>
        </div>
        
        {/* Feature description */}
        <p className="text-muted-foreground">{feature.description}</p>
      </motion.div>
    );
  };

  return (
    <section className="bg-muted/30 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
          >
            Empowering Access to Justice
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
            className="text-lg text-muted-foreground"
          >
            Our platform breaks down barriers to legal understanding through technology, 
            accessible language, and community resources.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}