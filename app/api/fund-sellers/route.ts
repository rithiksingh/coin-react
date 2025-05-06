// This is a mock API route - replace with your actual API integration
import { NextResponse } from "next/server"

// Mock data - replace with your actual API call
const mockFundSellers = [
  { id: "1", name: "Al Rajhi Capital" },
  { id: "2", name: "NCB Capital" },
  { id: "3", name: "Riyad Capital" },
  { id: "4", name: "HSBC Saudi Arabia" },
  { id: "5", name: "Saudi Fransi Capital" },
  { id: "6", name: "Albilad Investment" },
  { id: "7", name: "Alinma Investment" },
  { id: "8", name: "ANB Invest" },
  { id: "9", name: "Derayah Financial" },
  { id: "10", name: "Jadwa Investment" },
  { id: "11", name: "Alistithmar Capital" },
  { id: "12", name: "Alawwal Invest" },
]

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(mockFundSellers)
}
