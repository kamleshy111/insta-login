'use client'

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AuthError() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string>("")
  
  const error = searchParams.get("error")

  useEffect(() => {
    if (error) {
      switch (error) {
        case "Configuration":
          setErrorMessage("There is a problem with the server configuration. Please contact support.")
          break
        case "AccessDenied":
          setErrorMessage("Access denied. You do not have permission to sign in.")
          break
        case "Verification":
          setErrorMessage("The verification link is invalid or has expired.")
          break
        case "OAuthSignin":
          setErrorMessage("Error occurred during Instagram sign in. Please check your credentials and try again.")
          break
        case "OAuthCallback":
          setErrorMessage("Error in OAuth callback. Please try signing in again.")
          break
        case "OAuthCreateAccount":
          setErrorMessage("Could not create account. The Instagram account may already be linked to another user.")
          break
        case "EmailCreateAccount":
          setErrorMessage("Could not create account with email.")
          break
        case "Callback":
          setErrorMessage("Error in authentication callback. Please try again.")
          break
        case "OAuthAccountNotLinked":
          setErrorMessage("This Instagram account is not linked to your profile. Please use the correct account or link it first.")
          break
        case "EmailSignin":
          setErrorMessage("Error sending verification email.")
          break
        case "CredentialsSignin":
          setErrorMessage("Sign in failed. Please check your credentials.")
          break
        case "SessionRequired":
          setErrorMessage("Please sign in to access this page.")
          break
        default:
          setErrorMessage("An unknown error occurred during authentication.")
      }
    }
  }, [error])

  const handleTryAgain = () => {
    router.push("/auth/signin")
  }

  const handleGoHome = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Authentication Error
            </h1>
            <p className="text-gray-600 mb-4">
              We encountered an issue while trying to sign you in.
            </p>
          </div>

          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">
              {errorMessage || "An unknown error occurred."}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleTryAgain}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              Try Again
            </button>
            
            <button
              onClick={handleGoHome}
              className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Go Home
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-sm font-medium mb-2">
              Need Help?
            </p>
            <p className="text-blue-600 text-xs">
              Make sure you have proper Instagram OAuth credentials configured in your environment variables. 
              Contact support if the problem persists.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 