'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, X, User, Globe, ChevronDown, MoonStar, Sun } from 'lucide-react';

// Navigation links
const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Ask a Question', href: '/ask' },
  { name: 'Learning Resources', href: '/learn' },
  { name: 'Find Legal Aid', href: '/find-legal-aid' },
  { name: 'Resources', href: '/resources', dropdown: true, 
    submenu: [
      { name: 'Document Templates', href: '/resources/templates' },
      { name: 'Legal Guides', href: '/resources/guides' },
      { name: 'Terminology', href: '/resources/terminology' },
    ] 
  },
];

export default function Navbar() {
  // State hooks
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Current path for active link highlighting
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle theme toggle
  useEffect(() => {
    // Check for saved theme preference or system preference
    const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && isDarkModePreferred)) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  // Handle dropdown toggle
  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  // Check if path is active (including partial matches for dropdown items)
  const isActivePath = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(path);
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-200 ${
      scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={handleLinkClick}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg mr-3">
              B
            </div>
            <span className="font-semibold text-lg hidden sm:block">BhashaBandhu</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className={`px-3 py-2 rounded-md text-sm flex items-center hover:bg-accent/10 ${
                        isActivePath(link.href) ? 'text-primary font-medium' : 'text-foreground'
                      }`}
                    >
                      {link.name}
                      <ChevronDown size={14} className={`ml-1 transition-transform ${
                        activeDropdown === link.name ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {link.submenu && (
                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-card border border-border"
                          >
                            <div className="py-1 rounded-md">
                              {link.submenu.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={handleLinkClick}
                                  className={`block px-4 py-2 text-sm hover:bg-accent/10 ${
                                    pathname === subItem.href ? 'text-primary font-medium' : 'text-foreground'
                                  }`}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm hover:bg-accent/10 transition-colors ${
                      pathname === link.href ? 'text-primary font-medium' : 'text-foreground'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center">
            {/* Language selector */}
            <button className="p-2 rounded-md hover:bg-accent/10 text-foreground">
              <Globe size={20} />
            </button>
            
            {/* Theme toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-accent/10 text-foreground"
            >
              {darkMode ? <Sun size={20} /> : <MoonStar size={20} />}
            </button>
            
            {/* User profile/login */}
            <Link 
              href="/profile" 
              className="ml-2 p-2 rounded-md hover:bg-accent/10 text-foreground"
            >
              <User size={20} />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 p-2 rounded-md hover:bg-accent/10 text-foreground md:hidden"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Toggle navigation menu</span>
              {isOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-card border-t border-border"
          >
            <div className="container mx-auto px-4 sm:px-6 py-3">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.dropdown ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(link.name)}
                          className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm hover:bg-accent/10 ${
                            isActivePath(link.href) ? 'text-primary font-medium' : 'text-foreground'
                          }`}
                        >
                          {link.name}
                          <ChevronDown size={16} className={`transition-transform ${
                            activeDropdown === link.name ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === link.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 ml-2 border-l border-border space-y-1 mt-1"
                            >
                              {link.submenu?.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={handleLinkClick}
                                  className={`block px-3 py-2 rounded-md text-sm hover:bg-accent/10 ${
                                    pathname === subItem.href ? 'text-primary font-medium' : 'text-foreground'
                                  }`}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={handleLinkClick}
                        className={`block px-3 py-2 rounded-md text-sm hover:bg-accent/10 ${
                          pathname === link.href ? 'text-primary font-medium' : 'text-foreground'
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}