import Link from 'next/link'

export function HomeHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-16">
          {/* TODO: Reinstate sign-in button when site is ready for user registration */}
          {/* 
          <div className="flex items-center space-x-4">
            <Link
              href="/auth"
              className="bg-amber-400 text-black px-6 py-2 rounded-lg font-medium hover:bg-amber-300 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
          */}
        </div>
      </div>
    </header>
  )
}