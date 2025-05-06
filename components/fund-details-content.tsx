"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, DollarSign, Tag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for the fund details
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
    description:
      "The fund invests in blue-chip companies listed on the Saudi Stock Exchange (Tadawul) with the aim of achieving long-term capital growth.",
    inceptionDate: "2010-01-15",
    riskLevel: "Medium to High",
    minimumInvestment: 10000,
    managementFee: 1.5,
    assetClass: "Equity",
    benchmark: "S&P Saudi Arabia Domestic Total Return in Local Currency Index",
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
    description:
      "The fund aims to provide long-term capital growth by investing in Shariah-compliant companies listed on the Saudi Stock Exchange.",
    inceptionDate: "2008-06-20",
    riskLevel: "High",
    minimumInvestment: 5000,
    managementFee: 1.75,
    assetClass: "Equity",
    benchmark: "S&P Saudi Arabia Shariah Total Return Index",
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
    description:
      "The fund aims to provide income and moderate capital appreciation by investing in dividend-paying Shariah-compliant stocks listed on the Saudi Stock Exchange.",
    inceptionDate: "2011-09-10",
    riskLevel: "Medium",
    minimumInvestment: 7500,
    managementFee: 1.6,
    assetClass: "Equity",
    benchmark: "HSBC Saudi Equity Income Index",
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
    description:
      "The fund invests in Shariah-compliant equities across GCC markets with the aim of achieving long-term capital growth.",
    inceptionDate: "2012-03-25",
    riskLevel: "High",
    minimumInvestment: 2000,
    managementFee: 1.8,
    assetClass: "Equity",
    benchmark: "S&P GCC Composite Shariah Index",
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
    description:
      "The fund aims to provide capital preservation and liquidity by investing in short-term Shariah-compliant money market instruments.",
    inceptionDate: "2014-11-05",
    riskLevel: "Low",
    minimumInvestment: 10000,
    managementFee: 0.5,
    assetClass: "Money Market",
    benchmark: "1-month Saudi Interbank Offered Rate",
  },
]

export default function FundDetailsContent() {
  const params = useParams()
  const router = useRouter()
  const [fund, setFund] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, you would fetch the fund details from the API
    const fundId = params.id as string
    const foundFund = mockFundsData.find((f) => f.id === fundId)

    if (foundFund) {
      setFund(foundFund)
    }

    setLoading(false)
  }, [params.id])

  if (loading) {
    return <div className="container mx-auto py-12 px-4">Loading...</div>
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
      <Button variant="outline" onClick={() => router.push("/explore")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Explore
      </Button>

      <h1 className="text-3xl font-bold mb-2">{fund.name}</h1>
      <p className="text-gray-500 mb-6">{fund.manager}</p>

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
                <p className="font-medium">{fund.assetClass}</p>
              </div>
            </div>

            <div className="flex items-start">
              <DollarSign className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Currency</p>
                <p className="font-medium">{fund.currency}</p>
              </div>
            </div>

            <div className="flex items-start">
              <User className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Fund Manager</p>
                <p className="font-medium">{fund.manager}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Calendar className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Inception Date</p>
                <p className="font-medium">{fund.inceptionDate}</p>
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
                  {fund.navPerUnit.toFixed(4)} {fund.currency}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div>
                <p className="text-sm text-gray-500">YTD Change</p>
                <p className={`font-medium ${fund.ytdChange > 0 ? "text-green-500" : "text-red-500"}`}>
                  {fund.ytdChange > 0 ? "+" : ""}
                  {fund.ytdChange.toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div>
                <p className="text-sm text-gray-500">Total NAV</p>
                <p className="font-medium">
                  {fund.nav.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
                  {fund.currency}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div>
                <p className="text-sm text-gray-500">Last Valuation Date</p>
                <p className="font-medium">{fund.valuationDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Fund Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{fund.description}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Risk Level</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{fund.riskLevel}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Minimum Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">
              {fund.minimumInvestment.toLocaleString()} {fund.currency}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Management Fee</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{fund.managementFee}% per annum</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
