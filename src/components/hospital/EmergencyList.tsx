'use client'

import { AlertCircle, MapPin, Phone, Star, Clock, Bed } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { EmergencyHospitalsResult } from '@/types/hospital'

export function EmergencyList({ hospitals }: EmergencyHospitalsResult) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-red-500" />
        <p className="text-sm font-semibold">
          {hospitals.length} Emergency Hospitals
          <span className="ml-1.5 text-xs font-normal text-muted-foreground">sorted by rating</span>
        </p>
      </div>

      <div className="space-y-2">
        {hospitals.map((hospital, index) => (
          <Card
            key={hospital.id}
            className="border-l-4 border-l-red-500 transition-shadow hover:shadow-md"
          >
            <CardContent className="flex items-start justify-between gap-3 py-3">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600 dark:bg-red-900 dark:text-red-400">
                  {index + 1}
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-semibold leading-none">{hospital.name}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {hospital.area}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {hospital.timings}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bed className="h-3 w-3" />
                      {hospital.beds.toLocaleString()} beds
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {hospital.phone}
                    </span>
                  </div>
                  {hospital.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {hospital.specialties.slice(0, 4).map((s) => (
                        <span
                          key={s.name}
                          className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span className="text-sm font-bold">{hospital.rating.toFixed(1)}</span>
                </div>
                <Badge variant="outline" className="text-[10px] capitalize">
                  {hospital.type}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
