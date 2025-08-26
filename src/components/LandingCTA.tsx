import Link from 'next/link'

export function LandingCTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Ready to Transform Your Teaching?
        </h2>
        
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          Join thousands of teachers already using ResourceForge to create amazing educational experiences. 
          Start building interactive resources that engage your pupils and save you time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            href="/sign-up"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Creating Resources
          </Link>
          
          <Link
            href="/sign-in"
            className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300"
          >
            Sign In
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-purple-600 text-2xl mb-3">🚀</div>
            <h3 className="font-semibold text-lg mb-2">Instant Deployment</h3>
            <p className="text-gray-600 text-sm">
              Your resources go live immediately. No hosting, no setup, no technical knowledge required.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-2xl mb-3">🔒</div>
            <h3 className="font-semibold text-lg mb-2">Pupil Safety First</h3>
            <p className="text-gray-600 text-sm">
              Built-in safety controls, age-appropriate content, and GDPR compliance for peace of mind.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-green-600 text-2xl mb-3">⚡</div>
            <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
            <p className="text-gray-600 text-sm">
              From lesson idea to interactive resource in minutes. Save hours of preparation time.
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          No credit card required • Free trial available • Cancel anytime
        </p>
      </div>
    </section>
  )
}