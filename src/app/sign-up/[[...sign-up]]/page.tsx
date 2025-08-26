import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Join ResourceForge
          </h1>
          <p className="text-gray-400">
            Start creating amazing educational resources with AI
          </p>
        </div>
        
        <div className="bg-gray-900 rounded-lg shadow-xl p-6">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 
                  'bg-amber-400 hover:bg-amber-300 text-black text-sm normal-case',
                card: 'shadow-none bg-transparent',
                headerTitle: 'text-xl font-semibold text-white',
                headerSubtitle: 'text-gray-400',
                formFieldInput: 'bg-gray-800 border-gray-700 text-white',
                formFieldLabel: 'text-gray-300',
                footerActionLink: 'text-amber-400 hover:text-amber-300',
                identityPreviewText: 'text-white',
                formResendCodeLink: 'text-amber-400 hover:text-amber-300',
              }
            }}
            redirectUrl="/dashboard"
          />
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Perfect for busy teachers who want powerful resources without coding
          </p>
        </div>
      </div>
    </div>
  )
}