'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Award, ChevronRight, Users } from 'lucide-react';

// Props interface for the module card
interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  completionRate?: number;
  studentsCount?: number;
  languages: string[];
}

export default function ModuleCard({
  id,
  title,
  description,
  image,
  category,
  difficulty,
  duration,
  completionRate = 0,
  studentsCount = 0,
  languages,
}: ModuleCardProps) {
  // Get difficulty color
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400';
      case 'advanced':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  // Format duration
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes > 0 ? `${remainingMinutes}m` : ''}`;
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="rounded-xl overflow-hidden border border-border bg-card flex flex-col"
    >
      {/* Module image with category overlay */}
      <div className="relative aspect-[16/9]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
          {category}
        </div>
        {languages.length > 0 && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1.5">
            <span className="text-[10px]">🌐</span>
            <span>{languages.length} languages</span>
          </div>
        )}
      </div>

      {/* Module content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor()}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
          <span className="text-xs text-muted-foreground flex items-center">
            <Clock size={12} className="mr-1" />
            {formatDuration(duration)}
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        {/* Module stats */}
        <div className="mt-auto pt-4 space-y-3">
          {/* Students count */}
          {studentsCount > 0 && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center">
                <Users size={12} className="mr-1" /> Students enrolled
              </span>
              <span className="font-medium">{studentsCount.toLocaleString()}</span>
            </div>
          )}

          {/* Completion status */}
          {completionRate > 0 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center">
                  <Award size={12} className="mr-1" /> Your progress
                </span>
                <span className="font-medium">{completionRate}%</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Start button */}
        <Link href={`/learn/${id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-5 w-full inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
          >
            {completionRate > 0 ? 'Continue Learning' : 'Start Learning'}
            <ChevronRight size={16} className="ml-1" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}