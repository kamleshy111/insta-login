'use client'

import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from "next/navigation"

interface ErrorContextValue {
  errorMessage: string
  hasError: boolean
  clearError: () => void
  handleTryAgain: () => void
  handleGoHome: () => void
}

const ErrorContext = createContext<ErrorContextValue | undefined>(undefined)

export function ErrorProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [hasError, setHasError] = useState<boolean>(false)
  
  // Only handle errors on specific auth routes
  const isAuthRoute = pathname?.startsWith('/auth/')
  const error = isAuthRoute ? searchParams.get("error") : null

  useEffect(() => {
    if (error && isAuthRoute) {
      setHasError(true)
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
    } else {
      setHasError(false)
      setErrorMessage("")
    }
  }, [error, pathname, isAuthRoute])

  const clearError = () => {
    setHasError(false)
    setErrorMessage("")
  }

  const handleTryAgain = () => {
    clearError()
    router.push("/auth/signin")
  }

  const handleGoHome = () => {
    clearError()
    router.push("/")
  }

  return (
    <ErrorContext.Provider value={{ 
      errorMessage, 
      hasError, 
      clearError, 
      handleTryAgain, 
      handleGoHome 
    }}>
      {children}
    </ErrorContext.Provider>
  )
}

export function useErrorContext() {
  const ctx = useContext(ErrorContext)
  if (!ctx) throw new Error('useErrorContext must be used within an ErrorProvider')
  return ctx
} 