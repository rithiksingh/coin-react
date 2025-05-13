"use client"

import { useState, useEffect } from "react"
import { Calculator, TrendingUp, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function InvestmentCalculator() {
  // Investment type tab
  const [calculatorType, setCalculatorType] = useState("lumpsum")

  // Lumpsum calculator state
  const [lumpsumAmount, setLumpsumAmount] = useState(10000)
  const [lumpsumYears, setLumpsumYears] = useState(5)
  const [lumpsumReturn, setLumpsumReturn] = useState(12)

  // SIP calculator state
  const [sipAmount, setSipAmount] = useState(1000)
  const [sipYears, setSipYears] = useState(10)
  const [sipReturn, setSipReturn] = useState(12)
  const [sipFrequency, setSipFrequency] = useState("monthly")

  // Results
  const [lumpsumResult, setLumpsumResult] = useState({
    investedAmount: 0,
    estimatedReturns: 0,
    totalValue: 0,
    growthMultiple: 0,
  })

  const [sipResult, setSipResult] = useState({
    investedAmount: 0,
    estimatedReturns: 0,
    totalValue: 0,
    growthMultiple: 0,
  })

  // Calculate lumpsum investment
  useEffect(() => {
    const principal = lumpsumAmount
    const ratePerYear = lumpsumReturn / 100
    const timeInYears = lumpsumYears

    // Calculate using compound interest formula: A = P(1 + r)^t
    const totalValue = principal * Math.pow(1 + ratePerYear, timeInYears)
    const estimatedReturns = totalValue - principal
    const growthMultiple = totalValue / principal

    setLumpsumResult({
      investedAmount: principal,
      estimatedReturns,
      totalValue,
      growthMultiple,
    })
  }, [lumpsumAmount, lumpsumReturn, lumpsumYears])

  // Calculate SIP investment
  useEffect(() => {
    let periodsPerYear
    switch (sipFrequency) {
      case "monthly":
        periodsPerYear = 12
        break
      case "quarterly":
        periodsPerYear = 4
        break
      case "yearly":
        periodsPerYear = 1
        break
      default:
        periodsPerYear = 12
    }

    const monthlyRate = sipReturn / (100 * periodsPerYear)
    const totalPeriods = sipYears * periodsPerYear
    const periodicAmount = sipAmount

    // Calculate using SIP formula: M × (((1 + r)^n - 1) / r) × (1 + r)
    const totalValue =
      periodicAmount * ((Math.pow(1 + monthlyRate, totalPeriods) - 1) / monthlyRate) * (1 + monthlyRate)

    const investedAmount = periodicAmount * totalPeriods
    const estimatedReturns = totalValue - investedAmount
    const growthMultiple = totalValue / investedAmount

    setSipResult({
      investedAmount,
      estimatedReturns,
      totalValue,
      growthMultiple,
    })
  }, [sipAmount, sipReturn, sipYears, sipFrequency])

  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6" />
          <CardTitle>Investment Calculator</CardTitle>
        </div>
        <CardDescription className="text-slate-300">
          Calculate your potential returns on mutual fund investments
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="lumpsum" onValueChange={setCalculatorType} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="lumpsum">One-time Investment</TabsTrigger>
            <TabsTrigger value="sip">SIP Investment</TabsTrigger>
          </TabsList>

          <TabsContent value="lumpsum" className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="lumpsum-amount">Investment Amount (SAR)</Label>
                  <span className="text-sm font-medium">{lumpsumAmount.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-[1fr_120px] gap-2">
                  <Slider
                    id="lumpsum-amount-slider"
                    min={1000}
                    max={1000000}
                    step={1000}
                    value={[lumpsumAmount]}
                    onValueChange={(value) => setLumpsumAmount(value[0])}
                  />
                  <Input
                    id="lumpsum-amount"
                    type="number"
                    value={lumpsumAmount}
                    onChange={(e) => setLumpsumAmount(Number(e.target.value))}
                    className="h-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="lumpsum-years">Investment Period (Years)</Label>
                  <span className="text-sm font-medium">{lumpsumYears} years</span>
                </div>
                <div className="grid grid-cols-[1fr_120px] gap-2">
                  <Slider
                    id="lumpsum-years-slider"
                    min={1}
                    max={30}
                    step={1}
                    value={[lumpsumYears]}
                    onValueChange={(value) => setLumpsumYears(value[0])}
                  />
                  <Input
                    id="lumpsum-years"
                    type="number"
                    value={lumpsumYears}
                    onChange={(e) => setLumpsumYears(Number(e.target.value))}
                    className="h-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="lumpsum-return">Expected Return Rate (%)</Label>
                  <span className="text-sm font-medium">{lumpsumReturn}%</span>
                </div>
                <div className="grid grid-cols-[1fr_120px] gap-2">
                  <Slider
                    id="lumpsum-return-slider"
                    min={1}
                    max={30}
                    step={0.5}
                    value={[lumpsumReturn]}
                    onValueChange={(value) => setLumpsumReturn(value[0])}
                  />
                  <Input
                    id="lumpsum-return"
                    type="number"
                    value={lumpsumReturn}
                    onChange={(e) => setLumpsumReturn(Number(e.target.value))}
                    className="h-9"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Card className="bg-slate-100">
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Invested Amount</div>
                  <div className="text-2xl font-bold">
                    {lumpsumResult.investedAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} SAR
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-100">
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Estimated Returns</div>
                  <div className="text-2xl font-bold text-emerald-500">
                    {lumpsumResult.estimatedReturns.toLocaleString(undefined, { maximumFractionDigits: 0 })} SAR
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-2 bg-slate-700 text-white">
                <CardContent className="p-4">
                  <div className="text-sm opacity-90">Total Value</div>
                  <div className="text-3xl font-bold">
                    {lumpsumResult.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} SAR
                  </div>
                  <div className="text-sm mt-1 opacity-90">{lumpsumResult.growthMultiple.toFixed(2)}x growth</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sip" className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="sip-amount">Monthly Investment (SAR)</Label>
                  <span className="text-sm font-medium">{sipAmount.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-[1fr_120px] gap-2">
                  <Slider
                    id="sip-amount-slider"
                    min={100}
                    max={100000}
                    step={100}
                    value={[sipAmount]}
                    onValueChange={(value) => setSipAmount(value[0])}
                  />
                  <Input
                    id="sip-amount"
                    type="number"
                    value={sipAmount}
                    onChange={(e) => setSipAmount(Number(e.target.value))}
                    className="h-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sip-frequency">Investment Frequency</Label>
                <Select value={sipFrequency} onValueChange={setSipFrequency}>
                  <SelectTrigger id="sip-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="sip-years">Investment Period (Years)</Label>
                  <span className="text-sm font-medium">{sipYears} years</span>
                </div>
                <div className="grid grid-cols-[1fr_120px] gap-2">
                  <Slider
                    id="sip-years-slider"
                    min={1}
                    max={30}
                    step={1}
                    value={[sipYears]}
                    onValueChange={(value) => setSipYears(value[0])}
                  />
                  <Input
                    id="sip-years"
                    type="number"
                    value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    className="h-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="sip-return">Expected Return Rate (%)</Label>
                  <span className="text-sm font-medium">{sipReturn}%</span>
                </div>
                <div className="grid grid-cols-[1fr_120px] gap-2">
                  <Slider
                    id="sip-return-slider"
                    min={1}
                    max={30}
                    step={0.5}
                    value={[sipReturn]}
                    onValueChange={(value) => setSipReturn(value[0])}
                  />
                  <Input
                    id="sip-return"
                    type="number"
                    value={sipReturn}
                    onChange={(e) => setSipReturn(Number(e.target.value))}
                    className="h-9"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Card className="bg-slate-100">
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Invested Amount</div>
                  <div className="text-2xl font-bold">
                    {sipResult.investedAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} SAR
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-100">
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Estimated Returns</div>
                  <div className="text-2xl font-bold text-emerald-500">
                    {sipResult.estimatedReturns.toLocaleString(undefined, { maximumFractionDigits: 0 })} SAR
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-2 bg-slate-700 text-white">
                <CardContent className="p-4">
                  <div className="text-sm opacity-90">Total Value</div>
                  <div className="text-3xl font-bold">
                    {sipResult.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} SAR
                  </div>
                  <div className="text-sm mt-1 opacity-90">{sipResult.growthMultiple.toFixed(2)}x growth</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Returns are calculated based on projected annual growth rates and are not guaranteed.
          </p>
          <p className="flex items-center gap-1 mt-1">
            <Calendar className="h-3 w-3" />
            The longer your investment horizon, the better your potential for growth.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
