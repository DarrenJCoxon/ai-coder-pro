import { HeroCodeDemo } from '@/components/HeroCodeDemo';
import { InteractiveDemo } from '@/components/InteractiveDemo';
import { ProcessTimeline } from '@/components/ProcessTimeline';
import { SafetyCompliance } from '@/components/SafetyCompliance';
import { InteractiveCTA } from '@/components/InteractiveCTA';
import { HomeHeader } from '@/components/HomeHeader';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await currentUser();
  
  // If user is authenticated, redirect to dashboard
  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Sign In for signed-out users */}
      <HomeHeader />
      
      {/* Hero Section with Live Code Demo */}
      <HeroCodeDemo />
      
      {/* Interactive AI Demo */}
      <InteractiveDemo />
      
      {/* Process Timeline */}
      <ProcessTimeline />
      
      {/* Safety & Compliance */}
      <SafetyCompliance />
      
      {/* Interactive CTA - The Best Feature */}
      <InteractiveCTA />
    </div>
  );
}
