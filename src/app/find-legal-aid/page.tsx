'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MapLocator from '@/components/locator/MapLocator';

export default function FindLegalAidPage() {
  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Find Legal Aid Near You
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Locate free or affordable legal assistance centers in your area. These centers provide services in multiple languages to help with various legal matters.
          </p>
        </div>
        
        {/* Map Locator Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MapLocator />
        </motion.div>
        
        {/* Additional information */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">
            About Legal Aid Centers
          </h2>
          <div className="prose prose-lg dark:prose-invert">
            <p>
              Legal aid centers provide free or low-cost legal assistance to those who cannot afford private legal representation. Services typically include:
            </p>
            <ul>
              <li>Free legal advice and consultation</li>
              <li>Representation in court for eligible cases</li>
              <li>Help with preparing legal documents</li>
              <li>Mediation services</li>
              <li>Legal literacy and awareness programs</li>
            </ul>
            <p>
              Many centers offer services in multiple languages and can accommodate special needs. If you're unable to visit a center in person, some also offer remote consultations via phone or video.
            </p>
            <h3 className="font-semibold">Eligibility for Free Legal Aid</h3>
            <p>
              In India, the following categories of people are generally eligible for free legal aid:
            </p>
            <ul>
              <li>Persons with annual income below the specified limit (varies by state)</li>
              <li>Women and children</li>
              <li>Members of Scheduled Castes and Scheduled Tribes</li>
              <li>Victims of trafficking</li>
              <li>Persons with disabilities</li>
              <li>Victims of mass disaster, ethnic violence, caste atrocity, flood, drought, earthquake, or industrial disaster</li>
              <li>Industrial workmen</li>
              <li>Persons in custody</li>
            </ul>
            <p>
              Even if you don't fall into these categories, many centers offer affordable services with sliding scale fees based on your income.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}