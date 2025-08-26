import { SignIn } from '@clerk/nextjs'

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to ResourceForge
          </h1>
          <p className="text-gray-400">
            Transform your lesson ideas into interactive educational resources
          </p>
        </div>
        
        <div className="bg-gray-900 rounded-lg shadow-xl p-6">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 
                  'bg-amber-400 hover:bg-amber-300 text-black text-sm normal-case',
                card: 'shadow-none bg-transparent',
                headerTitle: 'text-xl font-semibold text-white',
                headerSubtitle: 'text-gray-400',
                formFieldInput: 'bg-gray-800 border-gray-700 text-white placeholder-gray-500',
                formFieldLabel: 'text-gray-300',
                footerActionLink: 'text-amber-400 hover:text-amber-300',
                identityPreviewText: 'text-white',
                formResendCodeLink: 'text-amber-400 hover:text-amber-300',
                socialButtonsBlockButton: 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700',
                socialButtonsBlockButtonText: 'text-white',
                dividerLine: 'bg-gray-700',
                dividerText: 'text-gray-400',
                formFieldSuccessText: 'text-green-400',
                formFieldErrorText: 'text-red-400',
                alertText: 'text-white',
                formFieldWarningText: 'text-amber-400',
              }
            }}
            redirectUrl="/dashboard"
            signUpUrl="/auth"
          />
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Built for busy teachers who want powerful resources without the complexity
          </p>
        </div>
      </div>
    </div>
  )
}