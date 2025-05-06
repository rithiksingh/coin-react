"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FundSellerDropdown } from "@/components/fund-seller-dropdown"

// This interface should match your API response structure
interface FundSeller {
  id: string
  name: string
  // Add other properties your API returns
}

interface MutualFundFilterProps {
  apiUrl: string
  apiKey?: string
  onFilter: (filters: {
    seller: FundSeller | null
    search: string
  }) => void
  mockData?: FundSeller[]
}

export function MutualFundFilter({ apiUrl, apiKey, onFilter, mockData }: MutualFundFilterProps) {
  const [selectedSeller, setSelectedSeller] = useState<FundSeller | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSellerChange = (seller: FundSeller | null) => {
    setSelectedSeller(seller)
    onFilter({ seller, search: searchTerm })
  }

  const handleSearch = () => {
    onFilter({ seller: selectedSeller, search: searchTerm })
  }

  const handleReset = () => {
    setSelectedSeller(null)
    setSearchTerm("")
    onFilter({ seller: null, search: "" })
  }

  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Mutual Funds Filter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="fund-seller" className="text-sm font-medium">
              Fund Seller
            </label>
            <FundSellerDropdown
              apiUrl={apiUrl}
              apiKey={apiKey}
              onSellerChange={handleSellerChange}
              placeholder="All Fund Sellers"
              mockData={mockData}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="search" className="text-sm font-medium">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Search by fund name"
                className="pl-8 bg-white border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button onClick={handleSearch} className="flex-1">
              Apply Filter
            </Button>
            <Button variant="outline" onClick={handleReset} className="flex-1">
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
