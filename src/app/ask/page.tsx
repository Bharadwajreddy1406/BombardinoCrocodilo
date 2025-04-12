import ChatInterface from '@/components/chatbot/ChatInterface';

export default function AskPage() {
  return (
    <div className="py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Ask Your Legal Questions
          </h1>
          <p className="text-lg text-muted-foreground">
            Get accurate legal information in your preferred language. Our AI assistant
            simplifies complex legal concepts and helps you understand your rights and options.
          </p>
        </div>

        {/* Chat Interface Container */}
        <div className="max-w-4xl mx-auto">
          <ChatInterface />
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
            <h3 className="text-xl font-semibold mb-3">About Our Legal Assistant</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary p-1 rounded mr-2 mt-0.5">✓</span>
                <span>Trained on relevant legal statutes and case laws</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary p-1 rounded mr-2 mt-0.5">✓</span>
                <span>Provides information in multiple languages</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary p-1 rounded mr-2 mt-0.5">✓</span>
                <span>Updated regularly with latest legal developments</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary p-1 rounded mr-2 mt-0.5">✓</span>
                <span>Available 24/7 for immediate assistance</span>
              </li>
            </ul>
          </div>
          
          <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Important Note</h3>
            <p className="mb-4 text-muted-foreground">
              While our AI provides helpful guidance, please remember:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="bg-accent/10 text-accent-foreground p-1 rounded mr-2 mt-0.5">!</span>
                <span>Information is for educational purposes only</span>
              </li>
              <li className="flex items-start">
                <span className="bg-accent/10 text-accent-foreground p-1 rounded mr-2 mt-0.5">!</span>
                <span>Not a substitute for professional legal advice</span>
              </li>
              <li className="flex items-start">
                <span className="bg-accent/10 text-accent-foreground p-1 rounded mr-2 mt-0.5">!</span>
                <span>Laws vary by jurisdiction and may change</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}