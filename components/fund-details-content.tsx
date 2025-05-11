"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, DollarSign, Tag, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// The Saudi Exchange API URL
const SAUDI_EXCHANGE_API_URL =
  "https://www.saudiexchange.sa/wps/portal/saudiexchange/ourmarkets/funds-market-watch/mutual-funds/!ut/p/z1/lc_LDoIwFATQb-EDTIdqS7eNIIhieYhiN6YLY5ooujB-v427Bp93d5MzyQzRpCO6N3d7NDd76c3J_TvN90xy0ExAqSSKUM3WKtyECZ3UnGx9IIqUo1rJStGIAQ0l-q88mpI5UBbjJWqk4L_l8eYkvue1T0QcTx1ZiCyHosjDARhO9MGLDU_woWRz6Mn13LYd7Hwkg-ABxvvksA!!/p0/IZ7_5A602H80OOMQC0604RU6VD1067=CZ6_5A602H80OOE770QFTO1V1E24R6=NJgetMutualFundsData=/"

// Mock data to use as fallback when the API fails
const mockFundsData = [
  {
    fundName: "Al-Badr Murabaha Fund - US Dollars",
    fundCurrency: "USD",
    fundCategory: "Saudi Fransi Capital",
    fundSubCategory: "Shari&#39;ah Compliant",
    fundClass: "Capital Preservation",
    unitPrice: 1.8832,
    YTDPrecent: 4.64,
    ValuationDate: "May 7, 2025",
    valuationDateModified: "2025-05-07",
    fundCode: "005012",
    Row: 164,
    fundNav: 93870714.22,
    companyUrl: "#",
    symbol: "005012",
    watchListId: 0,
  },
  {
    fundName: "Saudi Riyal Money Market Fund",
    fundCurrency: "SAR",
    fundCategory: "Saudi Fransi Capital",
    fundSubCategory: "-",
    fundClass: "Capital Preservation",
    unitPrice: 32.0605,
    YTDPrecent: 5.13,
    ValuationDate: "May 7, 2025",
    valuationDateModified: "2025-05-07",
    fundCode: "005010",
    Row: 165,
    fundNav: 466847608.38,
    companyUrl: "#",
    symbol: "005010",
    watchListId: 0,
  },
]

// Helper function to decode HTML entities
const decodeHtmlEntities = (text: string): string => {
  if (!text) return ""
  return text.replace(/&#39;/g, "'")
}

// Helper function to extract array data from API response
const extractFundsArray = (data: any): any[] => {
  console.log("API Response Type:", typeof data)

  // If it's already an array, return it
  if (Array.isArray(data)) {
    console.log("Data is an array with", data.length, "items")
    return data
  }

  // If it's an object, try to find an array property
  if (typeof data === "object" && data !== null) {
    console.log("Data is an object with keys:", Object.keys(data))

    // Look for common array properties
    for (const key of Object.keys(data)) {
      if (Array.isArray(data[key])) {
        console.log(`Found array in property "${key}" with ${data[key].length} items`)
        return data[key]
      }
    }

    // If we can't find an array, log the data structure and return empty array
    console.log("Could not find array in response. Full response:", JSON.stringify(data).substring(0, 500) + "...")
  }

  // If all else fails, return empty array
  console.log("Returning empty array as fallback")
  return []
}

export default function FundDetailsContent() {
  const params = useParams()
  const router = useRouter()
  const [fund, setFund] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUsingMockData, setIsUsingMockData] = useState(false)
  const [rawResponse, setRawResponse] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setIsUsingMockData(false)
    setRawResponse(null)

    // First, fetch all funds
    fetch(SAUDI_EXCHANGE_API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        // Store raw response for debugging
        setRawResponse(JSON.stringify(data).substring(0, 1000) + "...")

        // Try to extract the array of funds from the response
        const fundsArray = extractFundsArray(data)

        if (fundsArray.length === 0) {
          console.log("No funds found in API response, falling back to mock data")
          throw new Error("No funds data found in API response")
        }

        console.log(`Successfully extracted ${fundsArray.length} funds from API`)

        // Process the data to decode HTML entities
        const processedData = fundsArray.map((fund: any) => ({
          ...fund,
          fundSubCategory: decodeHtmlEntities(fund.fundSubCategory),
        }))

        // Find the specific fund
        const fundId = params.id as string
        const foundFund = processedData.find((f: any) => f.fundCode === fundId)

        if (!foundFund) {
          throw new Error("Fund not found")
        }

        setFund(foundFund)
      })
      .catch((error) => {
        console.error("Error fetching fund details:", error)
        setError(error.message)

        // Try to find the fund in mock data
        if (params.id) {
          const mockFund = mockFundsData.find((f) => f.fundCode === params.id)
          if (mockFund) {
            setFund({
              ...mockFund,
              fundSubCategory: decodeHtmlEntities(mockFund.fundSubCategory),
            })
            setIsUsingMockData(true)
          }
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-slate-600 mb-4" />
        <p className="text-lg">Loading fund details...</p>
      </div>
    )
  }

  if (error && !fund) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        {rawResponse && (
          <details className="mb-4">
            <summary className="cursor-pointer text-sm text-gray-500">Show API Response (for debugging)</summary>
            <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto max-h-40">{rawResponse}</pre>
          </details>
        )}

        <Button variant="outline" onClick={() => router.push("/explore")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Explore
        </Button>
      </div>
    )
  }

  if (!fund) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-4">Fund not found</h1>
        <Button variant="outline" onClick={() => router.push("/explore")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Explore
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-5xl">
      {isUsingMockData && (
        <Alert variant="warning" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Using Demo Data</AlertTitle>
          <AlertDescription>
            Unable to fetch real data from the API. Showing sample data for demonstration purposes.
          </AlertDescription>
        </Alert>
      )}

      <Button variant="outline" onClick={() => router.push("/explore")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Explore
      </Button>

      <h1 className="text-3xl font-bold mb-2">{fund.fundName}</h1>
      <p className="text-gray-500 mb-6">{fund.fundCategory}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Fund Overview</CardTitle>
            <CardDescription>Key information about this fund</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start">
              <Tag className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Asset Class</p>
                <p className="font-medium">{fund.fundClass}</p>
              </div>
            </div>

            <div className="flex items-start">
              <DollarSign className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Currency</p>
                <p className="font-medium">{fund.fundCurrency}</p>
              </div>
            </div>

            <div className="flex items-start">
              <User className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Fund Manager</p>
                <p className="font-medium">{fund.fundCategory}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Calendar className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Valuation Date</p>
                <p className="font-medium">{fund.ValuationDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
            <CardDescription>Current performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start">
              <div>
                <p className="text-sm text-gray-500">NAV Per Unit</p>
                <p className="font-medium">
                  {fund.unitPrice?.toFixed(4) || "N/A"} {fund.fundCurrency}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div>
                <p className="text-sm text-gray-500">YTD Change</p>
                <p className={`font-medium ${fund.YTDPrecent > 0 ? "text-green-500" : "text-red-500"}`}>
                  {typeof fund.YTDPrecent === "number" ? (
                    <>
                      {fund.YTDPrecent > 0 ? "+" : ""}
                      {fund.YTDPrecent.toFixed(2)}%
                    </>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div>
                <p className="text-sm text-gray-500">Total NAV</p>
                <p className="font-medium">
                  {typeof fund.fundNav === "number"
                    ? `${fund.fundNav.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${fund.fundCurrency}`
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div>
                <p className="text-sm text-gray-500">Shariah Compliant</p>
                <p className="font-medium">
                  {fund.fundSubCategory && fund.fundSubCategory.includes("Shari'ah Compliant") ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Fund Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {fund.fundName} is managed by {fund.fundCategory} and is classified as a {fund.fundClass} fund. It is
            denominated in {fund.fundCurrency} and{" "}
            {fund.fundSubCategory && fund.fundSubCategory.includes("Shari'ah Compliant")
              ? "is Shariah compliant."
              : "is not Shariah compliant."}
          </p>
          <p className="mt-4">
            The fund's current NAV per unit is {fund.unitPrice?.toFixed(4) || "N/A"} {fund.fundCurrency} with a
            year-to-date performance of{" "}
            {typeof fund.YTDPrecent === "number" ? (
              <>
                {fund.YTDPrecent > 0 ? "+" : ""}
                {fund.YTDPrecent.toFixed(2)}%
              </>
            ) : (
              "N/A"
            )}
            . The total fund size is{" "}
            {typeof fund.fundNav === "number"
              ? `${fund.fundNav.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${fund.fundCurrency}`
              : "N/A"}
            .
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Fund Code</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{fund.fundCode}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Symbol</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{fund.symbol}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Last Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{fund.ValuationDate}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
