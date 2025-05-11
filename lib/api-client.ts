// This file would handle the authenticated API requests

interface ApiClientOptions {
  baseUrl: string
  apiKey?: string
}

export interface MutualFund {
  fundName: string
  fundCurrency: string
  fundCategory: string
  fundSubCategory: string
  fundClass: string
  unitPrice: number
  YTDPrecent: number
  ValuationDate: string
  valuationDateModified: string
  fundCode: string
  Row: number
  fundNav: number
  companyUrl: string
  symbol: string
  watchListId: number
}

export interface MutualFundsResponse {
  funds: MutualFund[]
  error?: string
  isUsingMockData?: boolean
}

export class ApiClient {
  private baseUrl: string
  private apiKey?: string

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl
    this.apiKey = options.apiKey
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    console.log(`Making API request to: ${url}`)

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.apiKey) {
      headers["Authorization"] = `Bearer ${this.apiKey}`
    }

    const config: RequestInit = {
      ...options,
      headers,
      credentials: "include", // Include cookies if needed for authentication
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return response.json()
    } catch (error) {
      console.error(`Error in API request to ${url}:`, error)
      throw error
    }
  }

  async getMutualFunds(): Promise<MutualFundsResponse> {
    try {
      console.log("Fetching mutual funds data...")
      const funds = await this.request<MutualFund[]>("/api/mutual-funds")
      console.log(`Successfully fetched ${funds.length} mutual funds`)
      return { funds }
    } catch (error) {
      console.error("Error fetching mutual funds:", error)
      // Return an empty array with error information
      return {
        funds: [],
        error: (error as Error).message,
        isUsingMockData: true,
      }
    }
  }

  async getFundDetails(fundCode: string): Promise<MutualFund | null> {
    try {
      console.log(`Fetching details for fund: ${fundCode}`)
      const { funds } = await this.getMutualFunds()
      const fund = funds.find((fund) => fund.fundCode === fundCode)

      if (!fund) {
        console.log(`Fund with code ${fundCode} not found`)
        return null
      }

      console.log(`Found fund: ${fund.fundName}`)
      return fund
    } catch (error) {
      console.error(`Error fetching fund details for ${fundCode}:`, error)
      return null
    }
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient({
  baseUrl: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
})
