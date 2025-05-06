"use client"

import { useEffect, useState } from "react"
import Layout from "@/components/layout"
import PublicLayout from "@/components/public-layout"
import FundDetailsContent from "@/components/fund-details-content"

// This is a temporary solution until we implement actual authentication
// In a real app, you would check the authentication state from your auth provider
const useIsAuthenticated = () => {
  // For demo purposes, we'll consider the user authenticated if they came from the dashboard
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if the user navigated from the dashboard or login page
    // This is just for demo purposes
    const referrer = document.referrer
    if (referrer.includes("/dashboard") || referrer.includes("/login")) {
      setIsAuthenticated(true)
    } else {
      // Check if we have a stored auth state in sessionStorage
      const storedAuth = sessionStorage.getItem("isAuthenticated")
      if (storedAuth === "true") {
        setIsAuthenticated(true)
      }
    }
  }, [])

  // Store the auth state when it changes
  useEffect(() => {
    sessionStorage.setItem("isAuthenticated", isAuthenticated.toString())
  }, [isAuthenticated])

  return isAuthenticated
}

export default function FundDetailsPage() {
  const isAuthenticated = useIsAuthenticated()

  return isAuthenticated ? (
    <Layout>
      <FundDetailsContent />
    </Layout>
  ) : (
    <PublicLayout>
      <FundDetailsContent />
    </PublicLayout>
  )
}
