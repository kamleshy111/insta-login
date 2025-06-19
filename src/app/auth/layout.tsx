'use client'

import { Suspense } from "react"
import { ErrorProvider } from "@/components/ErrorProvider"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    }>
      <ErrorProvider>
        {children}
      </ErrorProvider>
    </Suspense>
  )
} 