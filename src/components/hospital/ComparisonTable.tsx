'use client'

import { Star, AlertCircle, CheckCircle2, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { CompareHospitalsResult, Hospital } from '@/types/hospital'

function RatingBar({ rating }: { rating: number }) {
  const pct = (rating / 5) * 100
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-amber-400 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-6 text-right text-xs font-medium">{rating.toFixed(1)}</span>
    </div>
  )
}

const METRICS: {
  key: keyof Hospital
  label: string
  render: (h: Hospital) => React.ReactNode
}[] = [
  {
    key: 'type',
    label: 'Type',
    render: (h) => (
      <Badge variant="outline" className="text-[10px] capitalize">
        {h.type}
      </Badge>
    ),
  },
  {
    key: 'rating',
    label: 'Overall Rating',
    render: (h) => (
      <div className="flex items-center gap-1">
        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
        <span className="font-semibold">{h.rating.toFixed(1)}</span>
      </div>
    ),
  },
  {
    key: 'beds',
    label: 'Beds',
    render: (h) => <span>{h.beds.toLocaleString()}</span>,
  },
  {
    key: 'emergency',
    label: 'Emergency',
    render: (h) =>
      h.emergency ? (
        <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          24/7
        </span>
      ) : (
        <span className="flex items-center gap-1 text-muted-foreground">
          <XCircle className="h-3.5 w-3.5" />
          No
        </span>
      ),
  },
  {
    key: 'timings',
    label: 'Timings',
    render: (h) => <span className="text-xs">{h.timings}</span>,
  },
  {
    key: 'established',
    label: 'Established',
    render: (h) => <span>{h.established}</span>,
  },
  {
    key: 'area',
    label: 'Area',
    render: (h) => <span>{h.area}</span>,
  },
]

export function ComparisonTable({ hospitals }: CompareHospitalsResult) {
  const best = hospitals.reduce((a, b) => (a.rating >= b.rating ? a : b))

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Comparing {hospitals.length} Hospitals</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="w-32 px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Metric
                </th>
                {hospitals.map((h) => (
                  <th key={h.id} className="px-4 py-2 text-left">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold leading-tight">{h.name}</span>
                      {h.id === best.id && (
                        <Badge className="w-fit text-[9px]">Top Rated</Badge>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {METRICS.map(({ key, label, render }, i) => (
                <tr
                  key={key}
                  className={i % 2 === 0 ? 'bg-background' : 'bg-muted/30'}
                >
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{label}</td>
                  {hospitals.map((h) => (
                    <td key={h.id} className="px-4 py-2.5">
                      {render(h)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Separator className="my-3" />

        {/* Specialty comparison */}
        <div className="px-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Specialty Ratings
          </p>
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${hospitals.length}, 1fr)` }}>
            {hospitals.map((h) => (
              <div key={h.id} className="space-y-1.5">
                <p className="truncate text-xs font-medium">{h.name}</p>
                {h.specialties.map((s) => (
                  <div key={s.id}>
                    <p className="text-[10px] text-muted-foreground">{s.name}</p>
                    <RatingBar rating={s.rating} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
