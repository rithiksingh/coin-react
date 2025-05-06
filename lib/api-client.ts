// This file would handle the authenticated API requests

interface ApiClientOptions {
  baseUrl: string
  apiKey?: string
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

    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  }

  async getFundSellers() {
    return this.request<any[]>("/fund-sellers")
  }

  async getFunds(params: { sellerId?: string; search?: string; category?: string }) {
    const queryParams = new URLSearchParams()

    if (params.sellerId) {
      queryParams.append("sellerId", params.sellerId)
    }

    if (params.search) {
      queryParams.append("search", params.search)
    }

    if (params.category) {
      queryParams.append("category", params.category)
    }

    const queryString = queryParams.toString()
    return this.request<any[]>(`/funds${queryString ? `?${queryString}` : ""}`)
  }
}
