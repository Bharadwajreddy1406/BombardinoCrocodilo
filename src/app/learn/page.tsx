'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen } from 'lucide-react';
import ModuleCard from '@/components/learning/ModuleCard';
import Link from 'next/link';

// Sample module data
const modules = [
  {
    id: 'family-law-basics',
    title: 'Family Law Basics',
    description: 'Understand the fundamental principles of family law, including marriage, divorce, and child custody.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000',
    category: 'Family Law',
    difficulty: 'beginner',
    duration: 45,
    completionRate: 0,
    studentsCount: 1245,
    languages: ['English', 'Hindi', 'Telugu', 'Tamil', 'Marathi'],
  },
  {
    id: 'property-rights',
    title: 'Property Rights & Transfers',
    description: 'Learn about property ownership, inheritance rights, and the legal processes for property transfers.',
    image: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?q=80&w=1000',
    category: 'Property Law',
    difficulty: 'intermediate',
    duration: 90,
    completionRate: 25,
    studentsCount: 978,
    languages: ['English', 'Hindi', 'Bengali'],
  },
  {
    id: 'consumer-protection',
    title: 'Consumer Protection Laws',
    description: 'Discover your rights as a consumer and the legal frameworks that protect you from unfair business practices.',
    image: 'https://images.unsplash.com/photo-1556742212-5b321f3c261b?q=80&w=1000',
    category: 'Consumer Law',
    difficulty: 'beginner',
    duration: 60,
    completionRate: 0,
    studentsCount: 1578,
    languages: ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam'],
  },
  {
    id: 'employment-rights',
    title: 'Employment Rights & Regulations',
    description: 'Understand your rights in the workplace, including fair wages, working hours, and protection against discrimination.',
    image: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=1000',
    category: 'Employment Law',
    difficulty: 'intermediate',
    duration: 75,
    completionRate: 0,
    studentsCount: 867,
    languages: ['English', 'Hindi', 'Bengali', 'Marathi'],
  },
  {
    id: 'criminal-procedures',
    title: 'Criminal Procedures & Rights',
    description: 'Learn about criminal justice procedures, rights of the accused, and the legal process in criminal cases.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000',
    category: 'Criminal Law',
    difficulty: 'advanced',
    duration: 120,
    completionRate: 0,
    studentsCount: 543,
    languages: ['English', 'Hindi'],
  },
  {
    id: 'womens-rights',
    title: "Women's Legal Rights",
    description: 'Explore the specific legal protections and rights for women, including domestic violence laws and workplace equality.',
    image: 'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?q=80&w=1000',
    category: 'Gender Justice',
    difficulty: 'beginner',
    duration: 60,
    completionRate: 75,
    studentsCount: 1890,
    languages: ['English', 'Hindi', 'Bengali', 'Tamil', 'Marathi'],
  },
  {
    id: 'alternative-dispute-resolution',
    title: 'Alternative Dispute Resolution',
    description: 'Understand non-litigation methods for resolving disputes, including mediation, arbitration, and negotiation.',
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=1000',
    category: 'Dispute Resolution',
    difficulty: 'intermediate',
    duration: 70,
    completionRate: 10,
    studentsCount: 765,
    languages: ['English', 'Hindi', 'Telugu'],
  },
  {
    id: 'constitutional-rights',
    title: 'Constitutional Rights & Duties',
    description: 'Learn about fundamental rights, directive principles, and duties enshrined in the Constitution.',
    image: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=1000',
    category: 'Constitutional Law',
    difficulty: 'advanced',
    duration: 100,
    completionRate: 0,
    studentsCount: 1124,
    languages: ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Kannada'],
  },
];

// Filter options
const categories = [
  'All Categories',
  'Family Law',
  'Property Law',
  'Consumer Law',
  'Employment Law',
  'Criminal Law',
  'Gender Justice',
  'Dispute Resolution',
  'Constitutional Law',
];

const difficulties = [
  'All Levels',
  'Beginner',
  'Intermediate',
  'Advanced',
];

// Language options for filter
const languageOptions = [
  'All Languages',
  'English',
  'Hindi',
  'Bengali',
  'Tamil',
  'Telugu', 
  'Marathi',
  'Kannada',
  'Malayalam',
];

export default function LearnPage() {
  // State hooks for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  // Debounce search input to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter modules based on search and selected filters
  const filteredModules = modules.filter((module) => {
    // Search filter
    const matchesSearch =
      debouncedSearchQuery === '' ||
      module.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      module.category.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      selectedCategory === 'All Categories' ||
      module.category === selectedCategory;

    // Difficulty filter
    const matchesDifficulty =
      selectedDifficulty === 'All Levels' ||
      module.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
      
    // Language filter
    const matchesLanguage =
      selectedLanguage === 'All Languages' ||
      module.languages.includes(selectedLanguage);

    return matchesSearch && matchesCategory && matchesDifficulty && matchesLanguage;
  });

  // Reset filters function
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedDifficulty('All Levels');
    setSelectedLanguage('All Languages');
  };

  // Animation variants
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
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Interactive Legal Learning
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Explore our multilingual learning modules designed to help you understand complex legal
            concepts in simple, accessible language.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/learn/popular"
              className="px-4 py-2 rounded-md bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            >
              Popular Modules
            </Link>
            <Link 
              href="/learn/recently-added"
              className="px-4 py-2 rounded-md bg-accent/10 hover:bg-accent/20 text-foreground transition-colors"
            >
              Recently Added
            </Link>
            <Link 
              href="/learn/my-learning"
              className="px-4 py-2 rounded-md bg-accent/10 hover:bg-accent/20 text-foreground transition-colors"
            >
              My Learning
            </Link>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search for modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors"
              />
            </div>

            {/* Filter button - mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg bg-card hover:bg-accent/10 transition-colors"
                aria-expanded={isFilterOpen}
                aria-controls="mobile-filters"
              >
                <Filter size={18} />
                Filters {filteredModules.length !== modules.length && '(Active)'}
              </button>
            </div>

            {/* Desktop filters */}
            <div className="hidden md:flex items-center gap-4">
              {/* Category filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg bg-background focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors"
                  aria-label="Filter by category"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty filter */}
              <div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg bg-background focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors"
                  aria-label="Filter by difficulty"
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Language filter */}
              <div>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg bg-background focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors"
                  aria-label="Filter by language"
                >
                  {languageOptions.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Reset filters button */}
              {(selectedCategory !== 'All Categories' || 
                selectedDifficulty !== 'All Levels' || 
                selectedLanguage !== 'All Languages' ||
                searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                  aria-label="Reset all filters"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Mobile filters - collapsible */}
          {isFilterOpen && (
            <motion.div
              id="mobile-filters"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 border border-border rounded-lg bg-card md:hidden"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Difficulty</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors"
                  >
                    {difficulties.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Language</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors"
                  >
                    {languageOptions.map((language) => (
                      <option key={language} value={language}>
                        {language}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="pt-2">
                  <button
                    onClick={resetFilters}
                    className="w-full px-3 py-2 text-sm text-center border border-border rounded-lg hover:bg-accent/10"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results summary */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {filteredModules.length} {filteredModules.length === 1 ? 'Module' : 'Modules'} Available
          </h2>
        </div>

        {/* Modules grid */}
        {filteredModules.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredModules.map((module) => (
              <motion.div key={module.id} variants={itemVariants}>
                <ModuleCard 
                  id={module.id}
                  title={module.title}
                  description={module.description}
                  image={module.image}
                  category={module.category}
                  difficulty={module.difficulty as 'beginner' | 'intermediate' | 'advanced'}
                  duration={module.duration}
                  completionRate={module.completionRate}
                  studentsCount={module.studentsCount}
                  languages={module.languages}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No modules found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search query to find what you're looking for.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}