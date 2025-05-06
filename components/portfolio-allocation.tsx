"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Large Cap", value: 35 },
  { name: "Mid Cap", value: 25 },
  { name: "Small Cap", value: 15 },
  { name: "Debt", value: 20 },
  { name: "Gold", value: 5 },
]

const COLORS = ["#0ea5e9", "#14b8a6", "#f59e0b", "#8b5cf6", "#f43f5e"]

export function PortfolioAllocation() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
