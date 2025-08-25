import { HeroCodeDemo } from '@/components/HeroCodeDemo';
import { InteractiveDemo } from '@/components/InteractiveDemo';
import { ProcessTimeline } from '@/components/ProcessTimeline';
import { SafetyCompliance } from '@/components/SafetyCompliance';
import { InteractiveCTA } from '@/components/InteractiveCTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Live Code Demo */}
      <HeroCodeDemo />
      
      {/* Interactive AI Demo */}
      <InteractiveDemo />
      
      {/* Process Timeline */}
      <ProcessTimeline />
      
      {/* Safety & Compliance */}
      <SafetyCompliance />
      
      {/* Interactive AI Demo CTA */}
      <InteractiveCTA />
    </div>
  );
}
