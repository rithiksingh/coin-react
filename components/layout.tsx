"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, CreditCard, Home, Menu, Search, Settings, TrendingUp, User, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { StockTicker } from "@/components/stock-ticker"
import { SiteFooter } from "@/components/site-footer"

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const pathname = usePathname()

  // Function to check if a path is active
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

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
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <Wallet className="h-6 w-6" />
                <span>Coin</span>
              </Link>
              <Link href="/" className={`flex items-center gap-2 ${isActive("/") ? "text-primary" : ""}`}>
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link href="/explore" className={`flex items-center gap-2 ${isActive("/explore") ? "text-primary" : ""}`}>
                <BarChart3 className="h-5 w-5" />
                Explore
              </Link>
              <Link
                href="/investments"
                className={`flex items-center gap-2 ${isActive("/investments") ? "text-primary" : ""}`}
              >
                <BarChart3 className="h-5 w-5" />
                Investments
              </Link>
              <Link href="/markets" className={`flex items-center gap-2 ${isActive("/markets") ? "text-primary" : ""}`}>
                <TrendingUp className="h-5 w-5" />
                Markets
              </Link>
              <Link
                href="/transactions"
                className={`flex items-center gap-2 ${isActive("/transactions") ? "text-primary" : ""}`}
              >
                <CreditCard className="h-5 w-5" />
                Transactions
              </Link>
              <Link
                href="/settings"
                className={`flex items-center gap-2 ${isActive("/settings") ? "text-primary" : ""}`}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Wallet className="h-6 w-6" />
          <span>Coin</span>
        </Link>
        <div className="flex-1">
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/" className={isActive("/") ? "font-medium" : "text-muted-foreground"}>
              Dashboard
            </Link>
            <Link href="/explore" className={isActive("/explore") ? "font-medium" : "text-muted-foreground"}>
              Explore
            </Link>
            <Link href="/investments" className={isActive("/investments") ? "font-medium" : "text-muted-foreground"}>
              Investments
            </Link>
            <Link href="/markets" className={isActive("/markets") ? "font-medium" : "text-muted-foreground"}>
              Markets
            </Link>
            <Link href="/transactions" className={isActive("/transactions") ? "font-medium" : "text-muted-foreground"}>
              Transactions
            </Link>
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

      {/* Fixed Stock Ticker */}
      <div className="sticky top-16 z-20 w-full">
        <StockTicker />
      </div>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
