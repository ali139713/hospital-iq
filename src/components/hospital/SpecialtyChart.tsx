'use client'

import type { SpecialtyStatsResult } from '@/types/hospital'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

type Props = SpecialtyStatsResult

const BAR_COLORS = [
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#f59e0b',
  '#10b981',
  '#3b82f6',
  '#ef4444',
  '#14b8a6',
]

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max - 1) + '…' : str
}

interface TooltipPayloadEntry {
  value: number
  payload: { specialty: string; count: number; avgRating: number }
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadEntry[]
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null
  const d = payload[0].payload
  return (
    <div className="rounded-lg border bg-white px-3 py-2 shadow-md text-sm">
      <p className="font-semibold text-gray-800 mb-0.5">{d.specialty}</p>
      <p className="text-gray-600">
        {d.count} hospital{d.count !== 1 ? 's' : ''} · avg rating {d.avgRating.toFixed(1)}★
      </p>
    </div>
  )
}

export default function SpecialtyChart(props: Props) {
  const { stats, totalHospitals } = props

  const sorted = [...stats].sort((a, b) => b.count - a.count)
  const top3 = sorted.slice(0, 3)

  const chartData = sorted.map((s) => ({
    ...s,
    label: truncate(s.specialty, 18),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Specialties Overview</CardTitle>
        <CardDescription>
          {stats.length} specialt{stats.length !== 1 ? 'ies' : 'y'} across {totalHospitals} hospital{totalHospitals !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 4, right: 24, left: 8, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
            <XAxis
              type="number"
              allowDecimals={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="label"
              width={130}
              tick={{ fontSize: 12, fill: '#374151' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={28}>
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={BAR_COLORS[index % BAR_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {top3.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {top3.map((s, i) => (
              <div
                key={s.specialty}
                className="rounded-lg border bg-gray-50 px-3 py-2.5 text-center"
              >
                <div
                  className="text-xs font-semibold uppercase tracking-wide mb-1"
                  style={{ color: BAR_COLORS[i % BAR_COLORS.length] }}
                >
                  #{i + 1}
                </div>
                <div className="text-sm font-medium text-gray-800 leading-tight mb-1 truncate" title={s.specialty}>
                  {s.specialty}
                </div>
                <div className="text-xs text-gray-500">
                  {s.count} hospital{s.count !== 1 ? 's' : ''}
                </div>
                <div className="text-xs text-gray-400">
                  {s.avgRating.toFixed(1)}★ avg
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
