import Link from "next/link"
import { ArrowRight, BarChart3, DollarSign, PieChart, Shield, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PublicLayout from "@/components/public-layout"
import { InvestmentCalculator } from "@/components/investment-calculator"
import { AnimatedHero } from "@/components/animated-hero"

export default function LandingPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4">
        {/* Animated Hero Section */}
        <AnimatedHero />

        {/* Investment Calculator Section */}
        <div className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">Calculate Your Investment</h2>
            <p className="text-muted-foreground">See how your investments can grow over time</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <InvestmentCalculator />
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">Categories</h2>
            <p className="text-muted-foreground">Select fund categories to start investing</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Link href="/explore?category=equity" className="block">
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Equity</CardTitle>
                  <CardDescription>Invest in stocks for long-term growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      <span>High risk, high returns</span>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/explore?category=debt" className="block">
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Debt</CardTitle>
                  <CardDescription>Fixed income securities for stability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      <span>Low risk, stable returns</span>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/explore?category=hybrid" className="block">
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle>Hybrid</CardTitle>
                  <CardDescription>Mix of equity and debt for balanced growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <PieChart className="h-4 w-4" />
                      <span>Moderate risk, balanced returns</span>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Get Started Section */}
        <div className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">Get Started</h2>
            <p className="text-muted-foreground">Find the right mutual fund across these asset classes</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/explore?type=index-funds" className="block">
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-slate-600" />
                    Low-cost Index Funds
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Long term wealth creation at low cost</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/explore?type=tax-saving" className="block">
              <Card className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-emerald-500" />
                    Save Taxes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Build wealth and save taxes</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
