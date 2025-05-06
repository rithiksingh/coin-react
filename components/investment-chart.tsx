"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "May", invested: 100000, value: 98000 },
  { month: "Jun", invested: 125000, value: 124000 },
  { month: "Jul", invested: 150000, value: 152000 },
  { month: "Aug", invested: 175000, value: 180000 },
  { month: "Sep", invested: 200000, value: 210000 },
  { month: "Oct", invested: 225000, value: 240000 },
  { month: "Nov", invested: 250000, value: 270000 },
  { month: "Dec", invested: 275000, value: 300000 },
  { month: "Jan", invested: 300000, value: 330000 },
  { month: "Feb", invested: 325000, value: 360000 },
  { month: "Mar", invested: 350000, value: 390000 },
  { month: "Apr", invested: 375000, value: 420000 },
  { month: "May", invested: 400000, value: 450000 },
]

export function InvestmentChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `₹${value / 1000}k`}
          />
          <Tooltip
            formatter={(value) => [`₹${value.toLocaleString()}`, undefined]}
            labelFormatter={(label) => `${label} 2025`}
          />
          <Line
            type="monotone"
            dataKey="invested"
            stroke="#94a3b8"
            strokeWidth={2}
            dot={false}
            name="Amount Invested"
          />
          <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} dot={false} name="Current Value" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
