"use client"

import { useState, useEffect } from "react"
import { RefreshCw, Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  {
    fundName: "Alistithmar Capital Saudi Equity Fund",
    fundCurrency: "SAR",
    fundCategory: "Alistithmar for Financial Securities and Brokerage",
    fundSubCategory: "-",
    fundClass: "Growth",
    unitPrice: 606.5711,
    YTDPrecent: -0.15,
    ValuationDate: "May 7, 2025",
    valuationDateModified: "2025-05-07",
    fundCode: "003200",
    Row: 166,
    fundNav: 79418127.72,
    companyUrl: "#",
    symbol: "003200",
    watchListId: 0,
  },
  {
    fundName: "Albilad Diversified SAR Fund",
    fundCurrency: "SAR",
    fundCategory: "ALBILAD Investment Co",
    fundSubCategory: "Shari&#39;ah Compliant",
    fundClass: "Capital Preservation",
    unitPrice: 10.7728,
    YTDPrecent: 2.33,
    ValuationDate: "May 7, 2025",
    valuationDateModified: "2025-05-07",
    fundCode: "014013",
    Row: 167,
    fundNav: 157165460.5,
    companyUrl: "#",
    symbol: "014013",
    watchListId: 0,
  },
  {
    fundName: "Albilad Saudi Equity Income Fund",
    fundCurrency: "SAR",
    fundCategory: "ALBILAD Investment Co",
    fundSubCategory: "Shari&#39;ah Compliant",
    fundClass: "Income and Growth",
    unitPrice: 2.1695,
    YTDPrecent: -0.94,
    ValuationDate: "May 7, 2025",
    valuationDateModified: "2025-05-07",
    fundCode: "014008",
    Row: 168,
    fundNav: 40936348.81,
    companyUrl: "#",
    symbol: "014008",
    watchListId: 0,
  },
]

// Filter options based on the Saudi Exchange API data structure
const assetClassOptions = [
  "All",
  "Equity",
  "Bond/Sukuk",
  "Money Market",
  "Commodity",
  "Real Estate",
  "Multi Asset",
  "Funds of Funds",
  "Balanced",
  "Others",
]
const fundObjectiveOptions = [
  "All",
  "Equity",
  "Bond/Sukuk",
  "Money Market",
  "Commodity",
  "Real Estate",
  "Multi Asset",
  "Funds of Funds",
  "Balanced",
  "Others",
]
const shariahCompliantOptions = ["All", "Yes", "No"]
const fundCurrencyOptions = ["All", "SAR", "USD"]

// Extract unique fund managers from the data
const extractFundManagers = (funds: any[]): string[] => {
  const managers = new Set<string>()
  managers.add("All")
  funds.forEach((fund) => managers.add(fund.fundCategory))
  return Array.from(managers)
}

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

interface ExploreContentProps {
  initialFilters?: {
    assetClass: string
    fundObjective: string
    fundExposure: string
    shariahCompliant: string
    fundManager: string
    fundCurrency: string
    type: string
  }
}

export default function ExploreContent({ initialFilters }: ExploreContentProps) {
  const [filters, setFilters] = useState(
    initialFilters || {
      assetClass: "All",
      fundObjective: "All",
      fundExposure: "All",
      shariahCompliant: "All",
      fundManager: "All",
      fundCurrency: "All",
      type: "All",
    },
  )

  const [funds, setFunds] = useState<any[]>([])
  const [filteredFunds, setFilteredFunds] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUsingMockData, setIsUsingMockData] = useState(false)
  const [fundManagerOptions, setFundManagerOptions] = useState<string[]>(["All"])
  const [rawResponse, setRawResponse] = useState<string | null>(null)

  // Fetch funds data directly from the API
  useEffect(() => {
    setLoading(true)
    setError(null)
    setIsUsingMockData(false)
    setRawResponse(null)

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

        setFunds(processedData)
        setFilteredFunds(processedData)
        setFundManagerOptions(extractFundManagers(processedData))
      })
      .catch((error) => {
        console.error("Error fetching mutual funds data:", error)
        setError(error.message)

        // Fall back to mock data
        console.log("Falling back to mock data")
        const processedMockData = mockFundsData.map((fund) => ({
          ...fund,
          fundSubCategory: decodeHtmlEntities(fund.fundSubCategory),
        }))

        setFunds(processedMockData)
        setFilteredFunds(processedMockData)
        setFundManagerOptions(extractFundManagers(processedMockData))
        setIsUsingMockData(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // Apply filters when they change or when funds data changes
  useEffect(() => {
    if (funds.length === 0) return

    let result = [...funds]

    if (filters.assetClass !== "All") {
      result = result.filter((fund) => {
        // Check if fundClass exists and matches the selected asset class
        // This handles case sensitivity and partial matches
        if (!fund.fundClass) return false

        const fundClassLower = fund.fundClass.toLowerCase()
        const filterClassLower = filters.assetClass.toLowerCase()

        // Handle special cases for certain asset classes
        if (filters.assetClass === "Bond/Sukuk") {
          return (
            fundClassLower.includes("bond") ||
            fundClassLower.includes("sukuk") ||
            fundClassLower.includes("fixed income")
          )
        }

        if (filters.assetClass === "Money Market") {
          return (
            fundClassLower.includes("money market") ||
            fundClassLower.includes("cash") ||
            fundClassLower.includes("liquidity")
          )
        }

        if (filters.assetClass === "Multi Asset") {
          return fundClassLower.includes("multi asset") || fundClassLower.includes("mixed")
        }

        if (filters.assetClass === "Funds of Funds") {
          return fundClassLower.includes("fund of funds") || fundClassLower.includes("fof")
        }

        // For other asset classes, check if the fund class contains the filter value
        return fundClassLower.includes(filterClassLower)
      })
    }

    if (filters.fundObjective !== "All") {
      result = result.filter((fund) => {
        // Check if fundClass exists and matches the selected objective
        // This handles case sensitivity and partial matches
        if (!fund.fundClass) return false

        const fundClassLower = fund.fundClass.toLowerCase()
        const filterObjectiveLower = filters.fundObjective.toLowerCase()

        // Handle special cases for certain objectives
        if (filters.fundObjective === "Bond/Sukuk") {
          return (
            fundClassLower.includes("bond") ||
            fundClassLower.includes("sukuk") ||
            fundClassLower.includes("fixed income")
          )
        }

        if (filters.fundObjective === "Money Market") {
          return (
            fundClassLower.includes("money market") ||
            fundClassLower.includes("cash") ||
            fundClassLower.includes("liquidity")
          )
        }

        if (filters.fundObjective === "Multi Asset") {
          return fundClassLower.includes("multi asset") || fundClassLower.includes("mixed")
        }

        if (filters.fundObjective === "Funds of Funds") {
          return fundClassLower.includes("fund of funds") || fundClassLower.includes("fof")
        }

        // For other objectives, check if the fund class contains the filter value
        return fundClassLower.includes(filterObjectiveLower)
      })
    }

    if (filters.fundManager !== "All") {
      result = result.filter((fund) => fund.fundCategory === filters.fundManager)
    }

    if (filters.fundCurrency !== "All") {
      result = result.filter((fund) => fund.fundCurrency === filters.fundCurrency)
    }

    if (filters.shariahCompliant !== "All") {
      result = result.filter((fund) => {
        if (filters.shariahCompliant === "Yes") {
          return fund.fundSubCategory && fund.fundSubCategory.includes("Shari'ah Compliant")
        } else {
          return !fund.fundSubCategory || !fund.fundSubCategory.includes("Shari'ah Compliant")
        }
      })
    }

    setFilteredFunds(result)
  }, [filters, funds])

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters({
      ...filters,
      [filterName]: value,
    })
  }

  const resetFilters = () => {
    setFilters({
      assetClass: "All",
      fundObjective: "All",
      fundExposure: "All",
      shariahCompliant: "All",
      fundManager: "All",
      fundCurrency: "All",
      type: "All",
    })
  }

  const retryFetch = () => {
    setLoading(true)
    setError(null)
    setIsUsingMockData(false)
    setRawResponse(null)

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

        setFunds(processedData)
        setFilteredFunds(processedData)
        setFundManagerOptions(extractFundManagers(processedData))
        setIsUsingMockData(false)
      })
      .catch((error) => {
        console.error("Error fetching mutual funds data:", error)
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6 px-4 max-w-7xl flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-slate-600 mb-4" />
        <p className="text-lg">Loading mutual funds data...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Mutual Funds Summary</h1>

      <div className="border-t-4 border-emerald-500 w-36 mb-8"></div>

      {error && !isUsingMockData && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
            <Button variant="outline" onClick={retryFetch} className="ml-4">
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {rawResponse && error && (
        <details className="mb-4">
          <summary className="cursor-pointer text-sm text-gray-500">Show API Response (for debugging)</summary>
          <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto max-h-40">{rawResponse}</pre>
        </details>
      )}

      {isUsingMockData && (
        <Alert variant="warning" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Using Demo Data</AlertTitle>
          <AlertDescription>
            Unable to connect to the Saudi Exchange API. Showing sample data for demonstration purposes.
            <Button variant="outline" onClick={retryFetch} className="ml-4">
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">Asset Class</label>
          <Select value={filters.assetClass} onValueChange={(value) => handleFilterChange("assetClass", value)}>
            <SelectTrigger className="w-full bg-slate-700 text-white">
              <SelectValue placeholder="View All" />
            </SelectTrigger>
            <SelectContent>
              {assetClassOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Fund Objective</label>
          <Select value={filters.fundObjective} onValueChange={(value) => handleFilterChange("fundObjective", value)}>
            <SelectTrigger className="w-full bg-slate-700 text-white">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {fundObjectiveOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Fund Manager</label>
          <Select value={filters.fundManager} onValueChange={(value) => handleFilterChange("fundManager", value)}>
            <SelectTrigger className="w-full bg-slate-700 text-white">
              <SelectValue placeholder="View All" />
            </SelectTrigger>
            <SelectContent>
              {fundManagerOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Fund Currency</label>
          <Select value={filters.fundCurrency} onValueChange={(value) => handleFilterChange("fundCurrency", value)}>
            <SelectTrigger className="w-full bg-slate-700 text-white">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {fundCurrencyOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Shari&apos;ah Compliant</label>
          <Select
            value={filters.shariahCompliant}
            onValueChange={(value) => handleFilterChange("shariahCompliant", value)}
          >
            <SelectTrigger className="w-full bg-slate-700 text-white">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {shariahCompliantOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end mb-8">
        <Button variant="outline" onClick={resetFilters} className="text-blue-600 border-blue-600 hover:bg-blue-50">
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="bg-blue-100">
            <TableRow>
              <TableHead className="whitespace-nowrap">Fund Name</TableHead>
              <TableHead className="whitespace-nowrap">Fund Manager</TableHead>
              <TableHead className="whitespace-nowrap">Fund Currency</TableHead>
              <TableHead className="whitespace-nowrap">Shari&apos;ah Compliant</TableHead>
              <TableHead className="whitespace-nowrap">Fund Objective</TableHead>
              <TableHead className="whitespace-nowrap text-right">NAV Per Unit</TableHead>
              <TableHead className="whitespace-nowrap text-right">% YTD Change</TableHead>
              <TableHead className="whitespace-nowrap text-right">Valuation Date</TableHead>
              <TableHead className="whitespace-nowrap text-right">NAV</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFunds.length > 0 ? (
              filteredFunds.map((fund) => (
                <TableRow key={fund.fundCode || fund.Row} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <a href={`/fund/${fund.fundCode}`} className="text-blue-600 hover:underline">
                      {fund.fundName}
                    </a>
                  </TableCell>
                  <TableCell>{fund.fundCategory}</TableCell>
                  <TableCell>{fund.fundCurrency}</TableCell>
                  <TableCell>
                    {fund.fundSubCategory && fund.fundSubCategory.includes("Shari'ah Compliant") ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>{fund.fundClass}</TableCell>
                  <TableCell className="text-right">{fund.unitPrice?.toFixed(4) || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    {typeof fund.YTDPrecent === "number" ? (
                      <span className={fund.YTDPrecent > 0 ? "text-green-500" : "text-red-500"}>
                        {fund.YTDPrecent > 0 ? "▲" : "▼"} {Math.abs(fund.YTDPrecent).toFixed(2)}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell className="text-right">{fund.ValuationDate || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    {typeof fund.fundNav === "number"
                      ? fund.fundNav.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  No funds match your current filter criteria. Try adjusting your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
