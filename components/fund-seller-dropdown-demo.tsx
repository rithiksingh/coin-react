"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FundSellerDropdown } from "@/components/fund-seller-dropdown"

// This interface should match your API response structure
interface FundSeller {
  id: string
  name: string
}

export default function FundSellerDropdownDemo() {
  const [selectedSeller, setSelectedSeller] = useState<FundSeller | null>(null)

  // Replace with your actual API endpoint
  const apiUrl = "/api/fund-sellers"

  return (
    <div className="max-w-md mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Fund Seller Selection</CardTitle>
          <CardDescription>Select a mutual fund seller from the dropdown</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FundSellerDropdown apiUrl={apiUrl} onSellerChange={setSelectedSeller} placeholder="Select fund seller" />

          {selectedSeller && (
            <div className="p-4 border rounded-md bg-muted">
              <p className="font-medium">Selected Seller:</p>
              <p>{selectedSeller.name}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
