"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MutualFundFilter } from "@/components/mutual-fund-filter"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// This interface should match your API response structure
interface FundSeller {
  id: string
  name: string
}

// Mock data for development when API is not accessible
const mockFundSellers = [
  { id: "1", name: "Al Rajhi Capital" },
  { id: "2", name: "NCB Capital" },
  { id: "3", name: "Riyad Capital" },
  { id: "4", name: "HSBC Saudi Arabia" },
  { id: "5", name: "Saudi Fransi Capital" },
  { id: "6", name: "Albilad Investment" },
  { id: "7", name: "Alinma Investment" },
  { id: "8", name: "ANB Invest" },
  { id: "9", name: "Derayah Financial" },
  { id: "10", name: "Jadwa Investment" },
  { id: "11", name: "Alistithmar Capital" },
  { id: "12", name: "Alawwal Invest" },
]

export default function MutualFundsPage() {
  const [filters, setFilters] = useState({
    seller: null as FundSeller | null,
    search: "",
  })

  // The API URL that requires authentication
  const apiUrl =
    "https://www.saudiexchange.sa/wps/portal/saudiexchange/ourmarkets/funds-market-watch/mutual-funds/!ut/p/z1/lc_LDoIwFATQb-EDTIdqS7eNIIhieYhiN6YLY5ooujB-v427Bp93d5MzyQzRpCO6N3d7NDd76c3J_TvN90xy0ExAqSSKUM3WKtyECZ3UnGx9IIqUo1rJStGIAQ0l-q88mpI5UBbjJWqk4L_l8eYkvue1T0QcTx1ZiCyHosjDARhO9MGLDU_woWRz6Mn13LYd7Hwkg-ABxvvksA!!/p0/IZ7_5A602H80OOMQC0604RU6VD1067=CZ6_5A602H80OOE770QFTO1V1E24R6=NJgetMutualFundsData=/"

  const handleFilter = (newFilters: {
    seller: FundSeller | null
    search: string
  }) => {
    setFilters(newFilters)
    // Here you would typically fetch filtered funds data
    console.log("Applying filters:", newFilters)
  }

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Mutual Funds</h1>
        <p className="text-muted-foreground mt-2">Browse and filter mutual funds from various fund sellers.</p>
      </div>

      <Alert variant="warning" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>API Access Required</AlertTitle>
        <AlertDescription>
          The Saudi Exchange API requires proper authentication. Using mock data for demonstration purposes.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div>
          <MutualFundFilter apiUrl={apiUrl} onFilter={handleFilter} mockData={mockFundSellers} />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Mutual Funds</CardTitle>
                  <CardDescription>
                    {filters.seller ? `Showing funds from ${filters.seller.name}` : "Showing all funds"}
                    {filters.search && ` matching "${filters.search}"`}
                  </CardDescription>
                </div>
                <Tabs defaultValue="all" className="w-[400px]">
                  <TabsList>
                    <TabsTrigger value="all">All Funds</TabsTrigger>
                    <TabsTrigger value="equity">Equity</TabsTrigger>
                    <TabsTrigger value="debt">Debt</TabsTrigger>
                    <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              {/* This is where your funds table would go */}
              <div className="rounded-md border p-8 text-center">
                <p className="text-muted-foreground">Connect your API to display mutual funds here.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Current filters: {JSON.stringify(filters, null, 2)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
