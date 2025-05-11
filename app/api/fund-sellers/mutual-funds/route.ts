import { NextResponse } from "next/server"

// The Saudi Exchange API URL
const SAUDI_EXCHANGE_API_URL =
  "https://www.saudiexchange.sa/wps/portal/saudiexchange/ourmarkets/funds-market-watch/mutual-funds/!ut/p/z1/lc_LDoIwFATQb-EDTIdqS7eNIIhieYhiN6YLY5ooujB-v427Bp93d5MzyQzRpCO6N3d7NDd76c3J_TvN90xy0ExAqSSKUM3WKtyECZ3UnGx9IIqUo1rJStGIAQ0l-q88mpI5UBbjJWqk4L_l8eYkvue1T0QcTx1ZiCyHosjDARhO9MGLDU_woWRz6Mn13LYd7Hwkg-ABxvvksA!!/p0/IZ7_5A602H80OOMQC0604RU6VD1067=CZ6_5A602H80OOE770QFTO1V1E24R6=NJgetMutualFundsData=/"

// Mock data to use as fallback when the API fails
const mockFundsData = [
  {
    fundName: "Al-Badr Murabaha Fund - US Dollars",
    fundCurrency: "USD",
    fundCategory: "Saudi Fransi Capital",
    fundSubCategory: "Shari&#39;ah Compliant",
    fundClass: "Capital Preservation",
    unitPrice: 1.8832,
    YTDPrecent: 4.64,
    ValuationDate: "May 7, 2025",
    valuationDateModified: "2025-05-07",
    fundCode: "005012",
    Row: 164,
    fundNav: 93870714.22,
    companyUrl: "#",
    symbol: "005012",
    watchListId: 0,
  },
  {
    fundName: "Saudi Riyal Money Market Fund",
    fundCurrency: "SAR",
    fundCategory: "Saudi Fransi Capital",
    fundSubCategory: "-",
    fundClass: "Capital Preservation",
    unitPrice: 32.0605,
    YTDPrecent: 5.13,
    ValuationDate: "May 7, 2025",
    valuationDateModified: "2025-05-07",
    fundCode: "005010",
    Row: 165,
    fundNav: 466847608.38,
    companyUrl: "#",
    symbol: "005010",
    watchListId: 0,
  },
  {
    fundName: "Alistithmar Capital Saudi Equity Fund",
    fundCurrency: "SAR",
    fundCategory: "Alistithmar for Financial Securities and Brokerage",
    fundSubCategory: "-",
    fundClass: "Growth",
    unitPrice: 606.5711,
    YTDPrecent: -0.15,
    ValuationDate: "May 7, 2025",
    valuationDateModified: "2025-05-07",
    fundCode: "003200",
    Row: 166,
    fundNav: 79418127.72,
    companyUrl: "#",
    symbol: "003200",
    watchListId: 0,
  },
  {
    fundName: "Albilad Diversified SAR Fund",
    fundCurrency: "SAR",
    fundCategory: "ALBILAD Investment Co",
    fundSubCategory: "Shari&#39;ah Compliant",
    fundClass: "Capital Preservation",
    unitPrice: 10.7728,
    YTDPrecent: 2.33,
    ValuationDate: "May 7, 2025",
    valuationDateModified: "2025-05-07",
    fundCode: "014013",
    Row: 167,
    fundNav: 157165460.5,
    companyUrl: "#",
    symbol: "014013",
    watchListId: 0,
  },
  {
    fundName: "Albilad Saudi Equity Income Fund",
    fundCurrency: "SAR",
    fundCategory: "ALBILAD Investment Co",
    fundSubCategory: "Shari&#39;ah Compliant",
    fundClass: "Income and Growth",
    unitPrice: 2.1695,
    YTDPrecent: -0.94,
    ValuationDate: "May 7, 2025",
    valuationDateModified: "2025-05-07",
    fundCode: "014008",
    Row: 168,
    fundNav: 40936348.81,
    companyUrl: "#",
    symbol: "014008",
    watchListId: 0,
  },
]

export async function GET(request: Request) {
  try {
    console.log("Attempting to fetch data from Saudi Exchange API...")

    // Try to fetch from the Saudi Exchange API
    const response = await fetch(SAUDI_EXCHANGE_API_URL, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9,ar;q=0.8",
        Referer: "https://www.saudiexchange.sa/wps/portal/saudiexchange/ourmarkets/funds-market-watch/mutual-funds",
        Origin: "https://www.saudiexchange.sa",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    console.log(`API response status: ${response.status}`)

    if (!response.ok) {
      console.log(`API responded with error status: ${response.status}`)
      // If the API fails, fall back to mock data
      console.log("Falling back to mock data")

      // Process the mock data to decode HTML entities
      const processedMockData = mockFundsData.map((fund) => ({
        ...fund,
        fundSubCategory: fund.fundSubCategory.replace(/&#39;/g, "'"),
      }))

      return NextResponse.json(processedMockData)
    }

    const data = await response.json()
    console.log(`Successfully fetched ${data.length} funds from API`)

    // Process the data to decode HTML entities
    const processedData = data.map((fund: any) => ({
      ...fund,
      fundSubCategory: fund.fundSubCategory.replace(/&#39;/g, "'"),
    }))

    return NextResponse.json(processedData)
  } catch (error) {
    console.error("Error fetching mutual funds data:", error)

    // If there's any error, fall back to mock data
    console.log("Falling back to mock data due to error")

    // Process the mock data to decode HTML entities
    const processedMockData = mockFundsData.map((fund) => ({
      ...fund,
      fundSubCategory: fund.fundSubCategory.replace(/&#39;/g, "'"),
    }))

    return NextResponse.json(processedMockData)
  }
}
