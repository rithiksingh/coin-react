"use client"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const investments = [
  {
    id: "1",
    name: "HDFC Index Fund - Nifty 50 Plan",
    category: "Equity",
    invested: 120000,
    units: 2345.678,
    nav: 58.23,
    value: 136578.32,
    returns: 13.82,
  },
  {
    id: "2",
    name: "Axis Bluechip Fund",
    category: "Equity",
    invested: 85000,
    units: 1876.543,
    nav: 52.17,
    value: 97900.43,
    returns: 15.18,
  },
  {
    id: "3",
    name: "SBI Small Cap Fund",
    category: "Equity",
    invested: 60000,
    units: 1234.567,
    nav: 62.45,
    value: 77098.21,
    returns: 28.5,
  },
  {
    id: "4",
    name: "ICICI Prudential Corporate Bond Fund",
    category: "Debt",
    invested: 100000,
    units: 4321.098,
    nav: 24.78,
    value: 107078.61,
    returns: 7.08,
  },
  {
    id: "5",
    name: "Mirae Asset Hybrid Equity Fund",
    category: "Hybrid",
    invested: 70000,
    units: 2109.876,
    nav: 38.56,
    value: 81356.8,
    returns: 16.22,
  },
]

export function InvestmentTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Fund Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Invested</TableHead>
            <TableHead className="text-right">Units</TableHead>
            <TableHead className="text-right">NAV</TableHead>
            <TableHead className="text-right">Current Value</TableHead>
            <TableHead className="text-right">
              <div className="flex items-center justify-end">
                Returns
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments.map((investment) => (
            <TableRow key={investment.id}>
              <TableCell className="font-medium">{investment.name}</TableCell>
              <TableCell>{investment.category}</TableCell>
              <TableCell className="text-right">₹{investment.invested.toLocaleString()}</TableCell>
              <TableCell className="text-right">{investment.units.toFixed(3)}</TableCell>
              <TableCell className="text-right">₹{investment.nav.toFixed(2)}</TableCell>
              <TableCell className="text-right">₹{investment.value.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <span className={investment.returns > 0 ? "text-emerald-500" : "text-red-500"}>
                  {investment.returns > 0 ? "+" : ""}
                  {investment.returns.toFixed(2)}%
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Buy More</DropdownMenuItem>
                    <DropdownMenuItem>Redeem</DropdownMenuItem>
                    <DropdownMenuItem>SIP Details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
