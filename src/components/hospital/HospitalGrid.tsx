'use client'

import { useState } from 'react'
import { MapPin, Phone, Clock, AlertCircle, Star, Bed } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { SearchHospitalsResult, HospitalSummary } from '@/types/hospital'

function RatingStars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5 text-xs text-amber-500">
      <Star className="h-3 w-3 fill-current" />
      <span className="font-medium">{rating.toFixed(1)}</span>
    </span>
  )
}

function HospitalCard({ hospital }: { hospital: HospitalSummary }) {
  return (
    <Card className="group transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm leading-tight">{hospital.name}</CardTitle>
          <RatingStars rating={hospital.rating} />
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Badge
            variant={hospital.type === 'public' ? 'secondary' : 'outline'}
            className="text-[10px] capitalize"
          >
            {hospital.type}
          </Badge>
          {hospital.emergency && (
            <Badge variant="destructive" className="text-[10px]">
              <AlertCircle className="mr-0.5 h-2.5 w-2.5" />
              Emergency
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3 w-3 shrink-0" />
          <span>{hospital.area}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3 w-3 shrink-0" />
          <span>{hospital.timings}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Bed className="h-3 w-3 shrink-0" />
          <span>{hospital.beds.toLocaleString()} beds</span>
        </div>
        {hospital.specialties.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {hospital.specialties.slice(0, 3).map((s) => (
              <span
                key={s.name}
                className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary"
              >
                {s.name}
              </span>
            ))}
            {hospital.specialties.length > 3 && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                +{hospital.specialties.length - 3} more
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

type FilterType = 'all' | 'public' | 'private' | 'semi-government' | 'emergency'

export function HospitalGrid({ hospitals, total, query }: SearchHospitalsResult) {
  const [filter, setFilter] = useState<FilterType>('all')

  const filtered = hospitals.filter((h) => {
    if (filter === 'emergency') return h.emergency
    if (filter === 'all') return true
    return h.type === filter
  })

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: `All (${hospitals.length})` },
    { key: 'private', label: 'Private' },
    { key: 'public', label: 'Public' },
    { key: 'semi-government', label: 'Semi-Gov' },
    { key: 'emergency', label: '🚨 Emergency' },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">
          {total} hospital{total !== 1 ? 's' : ''} found
          {query.specialty && <span className="text-muted-foreground"> · {query.specialty}</span>}
          {query.area && <span className="text-muted-foreground"> in {query.area}</span>}
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1.5">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={cn(
              'rounded-full px-3 py-1 text-xs transition-colors',
              filter === key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">No hospitals match the selected filter.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
      )}
    </div>
  )
}
