'use client'

import { MapPin, Phone, Clock, Bed, Calendar, AlertCircle, Star, Building2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { HospitalDetailResult } from '@/types/hospital'

export function HospitalDetailCard({ hospital }: HospitalDetailResult) {
  const typeColor =
    hospital.type === 'public'
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      : hospital.type === 'private'
        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
        : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">{hospital.name}</CardTitle>
              <div className="mt-1 flex items-center gap-1.5">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${typeColor}`}>
                  {hospital.type}
                </span>
                {hospital.emergency && (
                  <Badge variant="destructive" className="text-[10px]">
                    <AlertCircle className="mr-0.5 h-2.5 w-2.5" />
                    Emergency 24/7
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-base font-bold">{hospital.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-muted-foreground">Rating</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: MapPin, label: 'Area', value: hospital.area },
            { icon: Bed, label: 'Beds', value: hospital.beds.toLocaleString() },
            { icon: Clock, label: 'Timings', value: hospital.timings },
            { icon: Calendar, label: 'Est.', value: hospital.established.toString() },
            { icon: Phone, label: 'Phone', value: hospital.phone },
            { icon: MapPin, label: 'Address', value: hospital.address },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-2">
              <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-[10px] text-muted-foreground">{label}</p>
                <p className="text-xs font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Specialties */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Specialties ({hospital.specialties.length})
          </p>
          <div className="grid grid-cols-2 gap-2">
            {hospital.specialties.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between rounded-lg bg-muted px-3 py-1.5"
              >
                <span className="text-xs font-medium">{s.name}</span>
                <div className="flex items-center gap-0.5 text-amber-500">
                  <Star className="h-2.5 w-2.5 fill-current" />
                  <span className="text-[10px]">{s.rating.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
