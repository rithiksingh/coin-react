"use client"

import { useState, useEffect } from "react"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Filter options
const assetClassOptions = ["All", "Equity", "Fixed Income", "Money Market", "Real Estate", "Multi-Asset"]
const fundObjectiveOptions = ["All", "Growth", "Income", "Capital Preservation", "Balanced"]
const fundExposureOptions = ["All", "Local", "International", "GCC", "Arab", "Global"]
const shariahCompliantOptions = ["All", "Yes", "No"]
const fundManagerOptions = [
  "All",
  "Al Rajhi Capital",
  "NCB Capital",
  "Riyad Capital",
  "HSBC Saudi Arabia",
  "Saudi Fransi Capital",
  "Albilad Investment",
  "Alinma Investment",
]
const fundCurrencyOptions = ["All", "SAR", "USD", "EUR"]
const fundTypeOptions = ["All", "index-funds", "tax-saving", "solution-oriented"]

// Mock data for the table
const mockFundsData = [
  {
    id: "1",
    name: "Riyad Blue Chip Equity Fund",
    manager: "Riyad Capital Company",
    currency: "SAR",
    shariahCompliant: "-",
    objective: "Growth",
    navPerUnit: 111.4952,
    ytdChange: 3.76,
    valuationDate: "2025-04-29",
    nav: 887646290.94,
    type: "index-funds",
    assetClass: "Equity",
  },
  {
    id: "2",
    name: "Al Rajhi Saudi Equity Fund",
    manager: "Al Rajhi Capital",
    currency: "SAR",
    shariahCompliant: "Yes",
    objective: "Growth",
    navPerUnit: 245.6723,
    ytdChange: 4.21,
    valuationDate: "2025-04-29",
    nav: 1245678345.67,
    type: "index-funds",
    assetClass: "Equity",
  },
  {
    id: "3",
    name: "HSBC Saudi Equity Income Fund",
    manager: "HSBC Saudi Arabia",
    currency: "SAR",
    shariahCompliant: "Yes",
    objective: "Income",
    navPerUnit: 156.8934,
    ytdChange: 2.87,
    valuationDate: "2025-04-29",
    nav: 567890123.45,
    type: "tax-saving",
    assetClass: "Equity",
  },
  {
    id: "4",
    name: "Saudi Fransi GCC Fund",
    manager: "Saudi Fransi Capital",
    currency: "USD",
    shariahCompliant: "Yes",
    objective: "Growth",
    navPerUnit: 18.4532,
    ytdChange: 1.95,
    valuationDate: "2025-04-29",
    nav: 345678912.34,
    type: "solution-oriented",
    assetClass: "Fixed Income",
  },
  {
    id: "5",
    name: "Alinma Saudi Riyal Liquidity Fund",
    manager: "Alinma Investment",
    currency: "SAR",
    shariahCompliant: "Yes",
    objective: "Capital Preservation",
    navPerUnit: 12.3456,
    ytdChange: 0.87,
    valuationDate: "2025-04-29",
    nav: 789012345.67,
    type: "tax-saving",
    assetClass: "Money Market",
  },
]

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

  const [funds, setFunds] = useState(mockFundsData)
  const [filteredFunds, setFilteredFunds] = useState(mockFundsData)

  // Apply filters when they change
  useEffect(() => {
    let result = [...mockFundsData]

    if (filters.assetClass !== "All") {
      result = result.filter((fund) => fund.assetClass === filters.assetClass)
    }

    if (filters.fundObjective !== "All") {
      result = result.filter((fund) => fund.objective === filters.fundObjective)
    }

    if (filters.type !== "All") {
      result = result.filter((fund) => fund.type === filters.type)
    }

    // Apply other filters similarly...

    setFilteredFunds(result)
  }, [filters])

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

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Mutual Funds Summary</h1>

      <div className="border-t-4 border-emerald-500 w-36 mb-8"></div>

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
          <label className="block text-sm font-medium mb-2">Fund Type</label>
          <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
            <SelectTrigger className="w-full bg-slate-700 text-white">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {fundTypeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option === "index-funds"
                    ? "Index Funds"
                    : option === "tax-saving"
                      ? "Tax Saving"
                      : option === "solution-oriented"
                        ? "Solution Oriented"
                        : option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Fund Exposure</label>
          <Select value={filters.fundExposure} onValueChange={(value) => handleFilterChange("fundExposure", value)}>
            <SelectTrigger className="w-full bg-slate-700 text-white">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {fundExposureOptions.map((option) => (
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
            {filteredFunds.map((fund) => (
              <TableRow key={fund.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <a href={`/fund/${fund.id}`} className="text-blue-600 hover:underline">
                    {fund.name}
                  </a>
                </TableCell>
                <TableCell>{fund.manager}</TableCell>
                <TableCell>{fund.currency}</TableCell>
                <TableCell>{fund.shariahCompliant}</TableCell>
                <TableCell>{fund.objective}</TableCell>
                <TableCell className="text-right">{fund.navPerUnit.toFixed(4)}</TableCell>
                <TableCell className="text-right">
                  <span className={fund.ytdChange > 0 ? "text-green-500" : "text-red-500"}>
                    {fund.ytdChange > 0 ? "▲" : "▼"} {Math.abs(fund.ytdChange).toFixed(2)}
                  </span>
                </TableCell>
                <TableCell className="text-right">{fund.valuationDate}</TableCell>
                <TableCell className="text-right">
                  {fund.nav.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
