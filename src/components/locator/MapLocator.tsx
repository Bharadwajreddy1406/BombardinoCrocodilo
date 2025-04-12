'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown, ChevronRight, ExternalLink, Phone, Clock, Volume2, X } from 'lucide-react';

// Legal aid center type definition
interface LegalAidCenter {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email?: string;
  website?: string;
  hours: {
    [key: string]: string;
  };
  services: string[];
  languages: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  distance?: number; // in km
}

// Sample data of legal aid centers
const legalAidCenters: LegalAidCenter[] = [
  {
    id: 'dlsa-south',
    name: 'District Legal Services Authority - South',
    description: 'Government authority providing free legal aid to eligible citizens.',
    address: '2nd Floor, Patiala House Court Complex',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    phone: '011-23383014',
    email: 'dlsasouth@gmail.com',
    website: 'https://dslsa.org',
    hours: {
      'Monday': '10:00 AM - 5:00 PM',
      'Tuesday': '10:00 AM - 5:00 PM',
      'Wednesday': '10:00 AM - 5:00 PM',
      'Thursday': '10:00 AM - 5:00 PM',
      'Friday': '10:00 AM - 5:00 PM',
      'Saturday': '10:00 AM - 1:00 PM',
      'Sunday': 'Closed',
    },
    services: [
      'Free Legal Aid',
      'Legal Advice',
      'Lok Adalat',
      'Mediation',
      'Legal Awareness Programs',
    ],
    languages: ['English', 'Hindi'],
    coordinates: {
      lat: 28.6139,
      lng: 77.2090,
    },
    distance: 1.8,
  },
  {
    id: 'human-rights-law',
    name: 'Human Rights Law Network',
    description: 'Non-profit focused on human rights law and providing legal aid to marginalized communities.',
    address: '576, Masjid Road, Jangpura',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110014',
    phone: '011-24379855',
    email: 'contact@hrln.org',
    website: 'https://hrln.org',
    hours: {
      'Monday': '9:30 AM - 6:00 PM',
      'Tuesday': '9:30 AM - 6:00 PM',
      'Wednesday': '9:30 AM - 6:00 PM',
      'Thursday': '9:30 AM - 6:00 PM',
      'Friday': '9:30 AM - 6:00 PM',
      'Saturday': '10:00 AM - 2:00 PM',
      'Sunday': 'Closed',
    },
    services: [
      'Public Interest Litigation',
      'Human Rights Cases',
      'Women\'s Rights',
      'Environmental Justice',
      'Legal Consultations',
    ],
    languages: ['English', 'Hindi', 'Bengali', 'Tamil'],
    coordinates: {
      lat: 28.5921,
      lng: 77.2438,
    },
    distance: 3.2,
  },
  {
    id: 'nliu-legal-aid',
    name: 'NLIU Legal Aid Clinic',
    description: 'University-run legal aid clinic providing free services to the community.',
    address: 'National Law Institute University, Kerwa Dam Road',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    pincode: '462044',
    phone: '0755-2696970',
    email: 'legalaiddept@nliu.ac.in',
    website: 'https://www.nliu.ac.in/legal-aid-clinic',
    hours: {
      'Monday': '10:00 AM - 4:00 PM',
      'Tuesday': '10:00 AM - 4:00 PM',
      'Wednesday': '10:00 AM - 4:00 PM',
      'Thursday': '10:00 AM - 4:00 PM',
      'Friday': '10:00 AM - 4:00 PM',
      'Saturday': 'By Appointment',
      'Sunday': 'Closed',
    },
    services: [
      'Free Legal Advice',
      'Document Drafting',
      'Mediation Services',
      'Legal Literacy Campaigns',
    ],
    languages: ['English', 'Hindi'],
    coordinates: {
      lat: 23.2128,
      lng: 77.3677,
    },
    distance: 5.7,
  },
  {
    id: 'womens-legal-centre',
    name: 'Women\'s Legal Centre',
    description: 'Specialized legal aid center for women facing domestic violence and discrimination.',
    address: '45, Second Main Road, CIT Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600035',
    phone: '044-24453447',
    email: 'contact@wlcindia.org',
    hours: {
      'Monday': '9:00 AM - 5:00 PM',
      'Tuesday': '9:00 AM - 5:00 PM',
      'Wednesday': '9:00 AM - 5:00 PM',
      'Thursday': '9:00 AM - 5:00 PM',
      'Friday': '9:00 AM - 5:00 PM',
      'Saturday': '10:00 AM - 1:00 PM',
      'Sunday': 'Closed',
    },
    services: [
      'Domestic Violence Counseling',
      'Legal Representation for Women',
      'Family Law Advice',
      'Support for Sexual Harassment Cases',
    ],
    languages: ['English', 'Tamil', 'Telugu', 'Malayalam'],
    coordinates: {
      lat: 13.0334,
      lng: 80.2240,
    },
    distance: 2.1,
  },
  {
    id: 'legal-aid-society',
    name: 'Legal Aid Society of Mumbai',
    description: 'Voluntary organization providing free legal services to underprivileged communities.',
    address: '219, Lawyer\'s Chambers, High Court',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400032',
    phone: '022-22622818',
    email: 'mumbailegalaid@gmail.com',
    website: 'https://legalaidsociety.in',
    hours: {
      'Monday': '10:30 AM - 5:30 PM',
      'Tuesday': '10:30 AM - 5:30 PM',
      'Wednesday': '10:30 AM - 5:30 PM',
      'Thursday': '10:30 AM - 5:30 PM',
      'Friday': '10:30 AM - 5:30 PM',
      'Saturday': 'Closed',
      'Sunday': 'Closed',
    },
    services: [
      'Pro Bono Legal Services',
      'Consumer Disputes',
      'Labor Law Cases',
      'Senior Citizen Legal Aid',
    ],
    languages: ['English', 'Hindi', 'Marathi', 'Gujarati'],
    coordinates: {
      lat: 19.0706,
      lng: 72.8296,
    },
    distance: 4.5,
  },
];

export default function MapLocator() {
  // State for selected center
  const [selectedCenter, setSelectedCenter] = useState<LegalAidCenter | null>(null);
  // State for sidebar visibility on mobile
  const [sidebarVisible, setSidebarVisible] = useState(false);
  // State for currently playing audio
  const [isPlaying, setIsPlaying] = useState(false);
  // State for current location and loading state
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Reference for the map container
  const mapRef = useRef<HTMLDivElement>(null);

  // Simulated map loading effect
  useEffect(() => {
    // This would normally be where you'd initialize the Google Maps API
    const loadMap = () => {
      // Simulate map load time
      const timer = setTimeout(() => {
        if (mapRef.current) {
          // In a real implementation, you would initialize Google Maps here
          console.log('Map loaded');
        }
      }, 500);
      return () => clearTimeout(timer);
    };

    loadMap();
  }, []);

  // Simulate getting user location
  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    // Simulating geolocation API with a timeout
    setTimeout(() => {
      // Simulated coordinates for New Delhi
      setUserLocation({ lat: 28.6139, lng: 77.2090 });
      setIsLoadingLocation(false);
      
      // Recalculate distances
      const updatedCenters = legalAidCenters.map((center) => {
        // In a real app, you would calculate actual distance from user location
        return { ...center, distance: Math.random() * 10 + 0.5 };
      });
      
      // Sort by distance and set selected center
      if (updatedCenters.length > 0) {
        const nearestCenter = [...updatedCenters].sort((a, b) => 
          (a.distance || 999) - (b.distance || 999))[0];
        setSelectedCenter(nearestCenter);
      }
    }, 1500);
  };

  // Handle pin click
  const handlePinClick = (center: LegalAidCenter) => {
    setSelectedCenter(center);
    setSidebarVisible(true);
  };

  // Handle text-to-speech
  const handleTextToSpeech = () => {
    if (!selectedCenter) return;
    
    // Toggle playing state
    setIsPlaying(!isPlaying);
    
    // In a real implementation, you would use the Web Speech API or a similar service
    if (!isPlaying) {
      const text = `${selectedCenter.name} is located at ${selectedCenter.address}, ${selectedCenter.city}. 
        They offer services like ${selectedCenter.services.join(', ')}. 
        You can contact them at ${selectedCenter.phone}.`;
      
      // Simulated speech - in a real app you would use the Web Speech API
      console.log(`Speaking: ${text}`);
      
      // Stop after a few seconds
      setTimeout(() => {
        setIsPlaying(false);
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[550px] lg:h-[700px] border border-border rounded-xl overflow-hidden relative">
      {/* Map Section */}
      <div className="flex-grow relative bg-accent/5">
        {/* Interactive Map would be rendered here - we're showing a placeholder */}
        <div 
          ref={mapRef} 
          className="w-full h-full bg-accent/10 flex items-center justify-center relative"
        >
          {/* Simulated map */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-full h-full opacity-60 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=India&zoom=5&size=800x800&scale=2&key=PLACEHOLDER')]">
              {/* We're using a placeholder for the map background */}
            </div>
            
            {/* Simulated location pins */}
            {legalAidCenters.map((center) => (
              <motion.button
                key={center.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.2, y: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                onClick={() => handlePinClick(center)}
                className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
                style={{
                  top: `${30 + (center.coordinates.lat % 10) * 5}%`,
                  left: `${30 + (center.coordinates.lng % 10) * 5}%`,
                }}
              >
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center
                  ${selectedCenter?.id === center.id 
                    ? 'bg-primary text-primary-foreground shadow-lg' 
                    : 'bg-accent text-accent-foreground'}
                `}>
                  <MapPin size={14} />
                </div>
                {selectedCenter?.id === center.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 bg-card px-2 py-1 rounded shadow-md whitespace-nowrap text-xs mb-1">
                    {center.name}
                  </div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Map center button - to get current location */}
          <button
            onClick={getCurrentLocation}
            disabled={isLoadingLocation}
            className="absolute bottom-4 right-4 bg-card p-3 rounded-full shadow-lg z-10"
          >
            <motion.div
              animate={isLoadingLocation ? { rotate: 360 } : { rotate: 0 }}
              transition={{ repeat: isLoadingLocation ? Infinity : 0, duration: 1 }}
              className="text-primary"
            >
              <MapPin size={20} />
            </motion.div>
          </button>

          {/* Mobile toggle for sidebar */}
          <button
            onClick={() => setSidebarVisible(!sidebarVisible)}
            className="absolute top-4 right-4 bg-card p-2 rounded-full shadow-lg lg:hidden z-10"
          >
            {sidebarVisible ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </div>

      {/* Centers Sidebar */}
      <AnimatePresence>
        {(sidebarVisible || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ x: 300, opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`
              absolute top-0 right-0 bottom-0 w-full max-w-md bg-card border-l border-border
              z-20 lg:relative lg:flex lg:w-80 xl:w-96 overflow-hidden
            `}
          >
            {/* Mobile close button */}
            <button
              onClick={() => setSidebarVisible(false)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-muted/50 hover:bg-muted lg:hidden z-10"
            >
              <X size={18} />
            </button>
            
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold">Legal Aid Centers</h3>
                <p className="text-sm text-muted-foreground">
                  {userLocation 
                    ? 'Showing centers near your location'
                    : 'Select a center or share your location to find nearby services'}
                </p>
              </div>
              
              {/* Centers List */}
              <div className="flex-grow overflow-y-auto">
                {selectedCenter ? (
                  <div className="p-4">
                    {/* Center details */}
                    <div className="mb-4">
                      <h4 className="text-xl font-semibold mb-2">{selectedCenter.name}</h4>
                      <p className="text-muted-foreground mb-3">{selectedCenter.description}</p>
                      
                      {/* Distance */}
                      {selectedCenter.distance && (
                        <div className="flex items-center text-sm text-primary mb-3">
                          <MapPin size={16} className="mr-1" />
                          <span>{selectedCenter.distance.toFixed(1)} km away</span>
                        </div>
                      )}
                      
                      {/* Contact Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-5 mr-2 text-muted-foreground">📍</div>
                          <div>
                            {selectedCenter.address}, {selectedCenter.city}, {selectedCenter.state}, {selectedCenter.pincode}
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-5 mr-2 text-muted-foreground">☎️</div>
                          <div>
                            <a 
                              href={`tel:${selectedCenter.phone}`}
                              className="text-primary hover:underline"
                            >
                              {selectedCenter.phone}
                            </a>
                          </div>
                        </div>
                        
                        {selectedCenter.email && (
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-5 mr-2 text-muted-foreground">✉️</div>
                            <div>
                              <a 
                                href={`mailto:${selectedCenter.email}`}
                                className="text-primary hover:underline"
                              >
                                {selectedCenter.email}
                              </a>
                            </div>
                          </div>
                        )}
                        
                        {selectedCenter.website && (
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-5 mr-2 text-muted-foreground">🌐</div>
                            <div>
                              <a 
                                href={selectedCenter.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline flex items-center"
                              >
                                Visit website
                                <ExternalLink size={12} className="ml-1" />
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Business hours */}
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold mb-2 flex items-center">
                          <Clock size={14} className="mr-1" /> Business Hours
                        </h5>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          {Object.entries(selectedCenter.hours).map(([day, hours]) => (
                            <div key={day} className="flex justify-between">
                              <span className="text-muted-foreground">{day}:</span>
                              <span>{hours}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Services */}
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold mb-2">Services Offered</h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedCenter.services.map((service, index) => (
                            <div 
                              key={index}
                              className="px-2 py-1 bg-accent/10 text-xs rounded-full"
                            >
                              {service}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Languages */}
                      <div>
                        <h5 className="text-sm font-semibold mb-2">Languages</h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedCenter.languages.map((language, index) => (
                            <div 
                              key={index}
                              className="px-2 py-1 bg-primary/10 text-xs rounded-full text-primary"
                            >
                              {language}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Text-to-Speech button */}
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleTextToSpeech}
                        className={`mt-5 w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2
                          ${isPlaying 
                            ? 'bg-primary/10 text-primary border border-primary/30' 
                            : 'bg-accent/10 border border-border'
                          }`}
                      >
                        <Volume2 size={16} /> 
                        {isPlaying ? 'Stop Reading' : 'Listen to Information'}
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {legalAidCenters.map((center) => (
                      <motion.button
                        key={center.id}
                        onClick={() => handlePinClick(center)}
                        whileHover={{ y: -2 }}
                        className="w-full text-left p-3 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
                      >
                        <h4 className="font-medium">{center.name}</h4>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <MapPin size={12} className="mr-1" />
                          {center.city}, {center.state}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}