"use client"

import { useState } from "react"
import {
  BarChart3,
  ChevronDown,
  CreditCard,
  DollarSign,
  Home,
  Menu,
  Plus,
  Search,
  Settings,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InvestmentChart } from "@/components/investment-chart"
import { InvestmentTable } from "@/components/investment-table"
import { PortfolioAllocation } from "@/components/portfolio-allocation"

export default function Dashboard() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-6 text-lg font-medium">
              <a href="#" className="flex items-center gap-2 text-lg font-semibold">
                <Wallet className="h-6 w-6" />
                <span>Coin</span>
              </a>
              <a href="#" className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Dashboard
              </a>
              <a href="/explore" className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Explore
              </a>
              <a href="#" className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Investments
              </a>
              <a href="#" className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Markets
              </a>
              <a href="#" className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Transactions
              </a>
              <a href="#" className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <a href="#" className="flex items-center gap-2 font-semibold">
          <Wallet className="h-6 w-6" />
          <span>Coin</span>
        </a>
        <div className="flex-1">
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#" className="font-medium">
              Dashboard
            </a>
            <a href="/explore" className="text-muted-foreground">
              Explore
            </a>
            <a href="#" className="text-muted-foreground">
              Investments
            </a>
            <a href="#" className="text-muted-foreground">
              Markets
            </a>
            <a href="#" className="text-muted-foreground">
              Transactions
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <form className="hidden md:flex">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search funds..." className="w-64 pl-8 bg-background" />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Invest Now
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹4,35,289.45</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">↑ 8.2%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹5,12,347.82</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">↑ 17.7%</span> overall returns
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Monthly SIP</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹25,000.00</div>
              <p className="text-xs text-muted-foreground">Next SIP date: 15 May 2025</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹77,058.37</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">↑ 17.7%</span> XIRR
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Tables */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-1">
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>Track your investment growth over time</CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      1Y
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>1M</DropdownMenuItem>
                    <DropdownMenuItem>3M</DropdownMenuItem>
                    <DropdownMenuItem>6M</DropdownMenuItem>
                    <DropdownMenuItem>1Y</DropdownMenuItem>
                    <DropdownMenuItem>3Y</DropdownMenuItem>
                    <DropdownMenuItem>5Y</DropdownMenuItem>
                    <DropdownMenuItem>All</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <InvestmentChart />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Portfolio Allocation</CardTitle>
              <CardDescription>Breakdown by category</CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioAllocation />
            </CardContent>
          </Card>
        </div>

        {/* Investments Table */}
        <Card>
          <CardHeader>
            <Tabs defaultValue="all">
              <div className="flex items-center justify-between">
                <CardTitle>Your Investments</CardTitle>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="equity">Equity</TabsTrigger>
                  <TabsTrigger value="debt">Debt</TabsTrigger>
                  <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </CardHeader>
          <CardContent>
            <InvestmentTable />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" className="w-full">
              View All Investments
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
