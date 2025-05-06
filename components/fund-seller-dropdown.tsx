"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// This interface should match your API response structure
interface FundSeller {
  id: string
  name: string
  // Add other properties your API returns
}

interface FundSellerDropdownProps {
  apiUrl?: string
  apiKey?: string
  onSellerChange: (seller: FundSeller | null) => void
  placeholder?: string
  className?: string
  // For demo/development purposes when API is not accessible
  mockData?: FundSeller[]
}

export function FundSellerDropdown({
  apiUrl,
  apiKey,
  onSellerChange,
  placeholder = "Select fund seller",
  className,
  mockData,
}: FundSellerDropdownProps) {
  const [open, setOpen] = useState(false)
  const [sellers, setSellers] = useState<FundSeller[]>([])
  const [selectedSeller, setSelectedSeller] = useState<FundSeller | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSellers = async () => {
      // If mockData is provided, use it instead of making an API call
      if (mockData) {
        setSellers(mockData)
        return
      }

      if (!apiUrl) {
        setError("API URL is not configured")
        return
      }

      setLoading(true)
      setError(null)

      try {
        const headers: HeadersInit = {}
        if (apiKey) {
          headers["Authorization"] = `Bearer ${apiKey}`
        }

        const response = await fetch(apiUrl, {
          headers,
          credentials: "include", // Include cookies if needed for authentication
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()
        setSellers(data)
      } catch (err) {
        console.error("Failed to fetch fund sellers:", err)
        setError("Failed to load fund sellers. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchSellers()
  }, [apiUrl, apiKey, mockData])

  const handleSellerSelect = (seller: FundSeller) => {
    setSelectedSeller(seller)
    setOpen(false)
    onSellerChange(seller)
  }

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-white border-gray-300 hover:bg-gray-50"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </div>
            ) : selectedSeller ? (
              selectedSeller.name
            ) : (
              placeholder
            )}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder="Search fund seller..." className="h-9" />
            <CommandList>
              <CommandEmpty>No fund seller found.</CommandEmpty>
              {error ? (
                <div className="py-6 text-center text-sm text-red-500">{error}</div>
              ) : (
                <CommandGroup>
                  {sellers.map((seller) => (
                    <CommandItem
                      key={seller.id}
                      value={seller.name}
                      onSelect={() => handleSellerSelect(seller)}
                      className="cursor-pointer"
                    >
                      {seller.name}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedSeller?.id === seller.id ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
