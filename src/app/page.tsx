import HeroSection from '@/components/home/HeroSection'
import FeatureSection from '@/components/home/FeatureSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import OnboardingModal from '@/components/onboarding/OnboardingModal'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* First-time user onboarding modal */}
      <OnboardingModal />
      
      {/* Hero section with search and CTA */}
      <HeroSection />
      
      {/* Main features section */}
      <FeatureSection />
      
      {/* User testimonials */}
      <TestimonialsSection />
      
      {/* Call to action section */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to access legal knowledge in your language?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Join thousands of individuals from diverse linguistic backgrounds 
              who are empowered through accessible legal information.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/ask" 
                className="px-6 py-3 rounded-lg bg-white text-primary font-medium hover:bg-opacity-90 transition-colors shadow-lg"
              >
                Ask a Legal Question
              </Link>
              <Link
                href="/learn" 
                className="px-6 py-3 rounded-lg bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 font-medium hover:bg-primary-foreground/20 transition-colors"
              >
                Explore Learning Resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
