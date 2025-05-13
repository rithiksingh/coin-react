"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface TickerItem {
  pk_rf_company: string
  companyShortNameEn: string
  companyShortNameAr: string
  lastTradePrice: string
  change: string
  changePercent: string
}

export function StockTicker() {
  const [tickerData, setTickerData] = useState<TickerItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://www.saudiexchange.sa/tadawul.eportal.theme.helper/TickerServlet")

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`)
        }

        const data = await response.json()
        console.log("API Response:", data)

        // Handle different possible response formats
        let tickerItems: TickerItem[] = []

        if (Array.isArray(data)) {
          // If data is directly an array
          tickerItems = data
        } else if (typeof data === "object" && data !== null) {
          // If data is an object
          // Try to find an array property
          const keys = Object.keys(data)

          for (const key of keys) {
            if (Array.isArray(data[key])) {
              tickerItems = data[key]
              break
            }
          }

          // Special case for the format shown in the sample: {[...]}
          if (tickerItems.length === 0 && keys.length === 1 && keys[0] === "0") {
            // This might be the case where the API returns {[...]} which gets parsed as {"0": [...]}
            const possibleArray = data[0]
            if (Array.isArray(possibleArray)) {
              tickerItems = possibleArray
            }
          }
        }

        if (tickerItems.length > 0) {
          setTickerData(tickerItems)
        } else {
          // If we couldn't find an array, create a mock array from the sample data
          console.error("Could not extract ticker items from API response, using fallback data")

          // Fallback to mock data
          const mockData = [
            {
              pk_rf_company: "9535",
              companyShortNameEn: "LADUN",
              companyShortNameAr: "لدن",
              lastTradePrice: "3.46",
              change: "-0.07",
              changePercent: "-1.97",
            },
            {
              pk_rf_company: "9591",
              companyShortNameEn: "VIEW",
              companyShortNameAr: "فيو",
              lastTradePrice: "7.00",
              change: "0.04",
              changePercent: "0.57",
            },
            {
              pk_rf_company: "9610",
              companyShortNameEn: "FIRST AVENUE",
              companyShortNameAr: "الجادة الأولى",
              lastTradePrice: "8.78",
              change: "0.00",
              changePercent: "0.00",
            },
          ]

          setTickerData(mockData)
          throw new Error("Invalid data format received from API, using fallback data")
        }
      } catch (err) {
        console.error("Error fetching ticker data:", err)
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchTickerData()

    // Refresh data every 60 seconds
    const intervalId = setInterval(fetchTickerData, 60000)

    return () => clearInterval(intervalId)
  }, [])

  // Animate the ticker
  useEffect(() => {
    if (!scrollRef.current || tickerData.length === 0) return

    const scrollElement = scrollRef.current
    const scrollWidth = scrollElement.scrollWidth
    const clientWidth = scrollElement.clientWidth

    if (scrollWidth <= clientWidth) return

    let scrollPosition = 0
    const scrollSpeed = 1 // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed

      if (scrollPosition >= scrollWidth / 2) {
        scrollPosition = 0
      }

      scrollElement.scrollLeft = scrollPosition
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [tickerData])

  if (loading) {
    return (
      <div className="bg-slate-800 text-white py-2 px-4 overflow-hidden">
        <div className="flex items-center justify-center h-6">
          <span className="text-sm">Loading market data...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-slate-800 text-white py-2 px-4 overflow-hidden">
        <div className="flex items-center justify-center h-6">
          <span className="text-sm text-red-400">Error loading market data: {error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-800 text-white py-2 px-4 overflow-hidden">
      <div
        ref={scrollRef}
        className="flex items-center space-x-6 whitespace-nowrap overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Duplicate the items to create a seamless loop */}
        {[...tickerData, ...tickerData].map((item, index) => (
          <div key={`${item.pk_rf_company}-${index}`} className="flex items-center space-x-2">
            <span className="font-medium">{item.companyShortNameEn}</span>
            <span className="font-bold">{item.lastTradePrice}</span>
            <div className="flex items-center">
              {Number.parseFloat(item.change) > 0 ? (
                <>
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">
                    {item.change} ({item.changePercent}%)
                  </span>
                </>
              ) : Number.parseFloat(item.change) < 0 ? (
                <>
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">
                    {item.change} ({item.changePercent}%)
                  </span>
                </>
              ) : (
                <span className="text-gray-400">0.00 (0.00%)</span>
              )}
            </div>
            <span className="text-gray-400">|</span>
          </div>
        ))}
      </div>
    </div>
  )
}
