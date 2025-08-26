import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { InteractiveCTA } from '@/components/InteractiveCTA'

export default async function DashboardPage() {
  const user = await currentUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">
                ResourceForge
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                Welcome, {user.firstName || user.emailAddresses[0].emailAddress}
              </span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Create Your Educational Resource
          </h2>
          <p className="text-gray-400 text-lg">
            Transform your lesson ideas into interactive digital experiences with AI
          </p>
        </div>

        {/* Interactive CTA Component */}
        <InteractiveCTA />

        {/* Additional Dashboard Content */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-2">
              Recent Resources
            </h3>
            <p className="text-gray-400 text-sm">
              View and manage your previously created educational resources
            </p>
            <button className="mt-4 text-amber-400 hover:text-amber-300 text-sm font-medium">
              View All →
            </button>
          </div>

          <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-2">
              Templates
            </h3>
            <p className="text-gray-400 text-sm">
              Browse pre-built templates for common lesson types
            </p>
            <button className="mt-4 text-amber-400 hover:text-amber-300 text-sm font-medium">
              Explore Templates →
            </button>
          </div>

          <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-2">
              Help & Support
            </h3>
            <p className="text-gray-400 text-sm">
              Get help with creating your perfect educational resource
            </p>
            <button className="mt-4 text-amber-400 hover:text-amber-300 text-sm font-medium">
              Get Support →
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}