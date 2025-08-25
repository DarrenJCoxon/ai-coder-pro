import { HeroCodeDemo } from '@/components/HeroCodeDemo';
import { InteractiveShowcase } from '@/components/InteractiveShowcase';
import { LiveStatsCounter } from '@/components/LiveStatsCounter';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Live Code Demo */}
      <HeroCodeDemo />
      
      {/* Interactive Capabilities Showcase */}
      <InteractiveShowcase />
      
      {/* Live Statistics and Impact */}
      <LiveStatsCounter />
      
      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Education?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of educators who are already using AI to create 
            extraordinary learning experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Start Building Now
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View Examples
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
