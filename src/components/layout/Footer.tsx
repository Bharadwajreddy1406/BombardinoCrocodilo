'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Globe, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Navigation sections for footer
  const footerNavigation = {
    legalInfo: [
      { name: 'Family Law', href: '/learn/family-law' },
      { name: 'Property Rights', href: '/learn/property-rights' },
      { name: 'Consumer Protection', href: '/learn/consumer-protection' },
      { name: 'Employment Law', href: '/learn/employment-law' },
      { name: 'Criminal Law', href: '/learn/criminal-law' },
    ],
    resources: [
      { name: 'Learning Modules', href: '/learn' },
      { name: 'Legal Dictionary', href: '/resources/dictionary' },
      { name: 'Document Templates', href: '/resources/templates' },
      { name: 'FAQs', href: '/resources/faqs' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/about/team' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Find Legal Aid', href: '/locator' },
      { name: 'Feedback', href: '/feedback' },
    ],
  };

  // Social media links
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  // Animation variants
  const linkHoverVariants = {
    initial: { x: 0 },
    hover: { x: 5, transition: { duration: 0.2 } },
  };

  const iconHoverVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, transition: { duration: 0.2 } },
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand and Mission */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl mr-3">
                B
              </div>
              <span className="font-semibold text-xl">BhashaBandhu</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Breaking down legal barriers through language accessibility.
              Our platform empowers communities with multilingual legal resources
              and simplified information.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@bhashabandhu.org</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+91 123 456 7890</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                <span>www.bhashabandhu.org</span>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground"
                  initial="initial"
                  whileHover="hover"
                  aria-label={item.name}
                >
                  <motion.div variants={iconHoverVariants}>
                    <item.icon className="h-5 w-5" />
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Legal Information</h3>
            <ul className="space-y-2">
              {footerNavigation.legalInfo.map((item) => (
                <li key={item.name}>
                  <motion.div
                    initial="initial"
                    whileHover="hover"
                  >
                    <Link href={item.href} className="text-muted-foreground hover:text-foreground text-sm">
                      <motion.span variants={linkHoverVariants} className="flex items-center">
                        {item.name}
                      </motion.span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerNavigation.resources.map((item) => (
                <li key={item.name}>
                  <motion.div
                    initial="initial"
                    whileHover="hover"
                  >
                    <Link href={item.href} className="text-muted-foreground hover:text-foreground text-sm">
                      <motion.span variants={linkHoverVariants} className="flex items-center">
                        {item.name}
                      </motion.span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <motion.div
                    initial="initial"
                    whileHover="hover"
                  >
                    <Link href={item.href} className="text-muted-foreground hover:text-foreground text-sm">
                      <motion.span variants={linkHoverVariants} className="flex items-center">
                        {item.name}
                      </motion.span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            
            <h3 className="text-sm font-semibold mt-6 mb-4">Support</h3>
            <ul className="space-y-2">
              {footerNavigation.support.map((item) => (
                <li key={item.name}>
                  <motion.div
                    initial="initial"
                    whileHover="hover"
                  >
                    <Link href={item.href} className="text-muted-foreground hover:text-foreground text-sm">
                      <motion.span variants={linkHoverVariants} className="flex items-center">
                        {item.name}
                      </motion.span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} BhashaBandhu. All rights reserved.
            </p>
            
            <div className="flex mt-4 md:mt-0">
              <select 
                className="bg-transparent text-sm text-muted-foreground border-border rounded-md py-1 px-2 focus:outline-none focus:ring-1 focus:ring-primary"
                defaultValue="en"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="bn">বাংলা</option>
                <option value="te">తెలుగు</option>
                <option value="ta">தமிழ்</option>
                <option value="mr">मराठी</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}