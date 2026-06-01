import { tool } from 'ai'
import { z } from 'zod'
import { prisma } from '@/lib/db/client'
import type {
  SearchHospitalsResult,
  HospitalDetailResult,
  HospitalMapResult,
  SpecialtyStatsResult,
  EmergencyHospitalsResult,
  CompareHospitalsResult,
  HospitalType,
} from '@/types/hospital'

const specialtyInclude = {
  specialties: { select: { id: true, name: true, rating: true, hospitalId: true } },
}

// Prisma returns `type` as string — cast to our union type
function castType(t: string): HospitalType {
  return t as HospitalType
}

export const hospitalTools = {
  searchHospitals: tool({
    description:
      'Search hospitals by specialty, area, type, or emergency availability. Use this when the user asks to find hospitals or describes medical needs.',
    inputSchema: z.object({
      specialty: z.string().max(50).optional().describe('Medical specialty e.g. "Cardiology", "Oncology", "Gynecology"'),
      city: z.string().max(50).optional().describe('City in Pakistan e.g. "Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta", "Multan", "Faisalabad"'),
      province: z.string().max(50).optional().describe('Province e.g. "Punjab", "Sindh", "KPK", "Balochistan", "ICT"'),
      area: z.string().max(50).optional().describe('Specific area or neighbourhood within a city'),
      type: z.enum(['public', 'private', 'semi-government']).optional(),
      emergency: z.boolean().optional().describe('Filter to emergency-capable hospitals only'),
    }),
    execute: async ({ specialty, city, province, area, type, emergency }): Promise<SearchHospitalsResult> => {
      const rows = await prisma.hospital.findMany({
        where: {
          ...(emergency !== undefined && { emergency }),
          ...(type && { type }),
          ...(city && { city: { contains: city } }),
          ...(province && { province: { contains: province } }),
          ...(area && { area: { contains: area } }),
          ...(specialty && { specialties: { some: { name: { contains: specialty } } } }),
        },
        include: specialtyInclude,
        orderBy: { rating: 'desc' },
        take: 12,
      })

      const hospitals = rows.map((h) => ({ ...h, type: castType(h.type) }))
      return { hospitals, total: hospitals.length, query: { specialty, emergency, area, type, city, province } }
    },
  }),

  showHospitalDetail: tool({
    description:
      'Show full details for a specific hospital by name or ID. Use when user asks about a specific hospital.',
    inputSchema: z.object({
      name: z.string().max(100).optional().describe('Hospital name to search for'),
      id: z.string().optional().describe('Hospital ID if known'),
    }),
    execute: async ({ name, id }): Promise<HospitalDetailResult> => {
      const row = await prisma.hospital.findFirst({
        where: id ? { id } : { name: { contains: name ?? '' } },
        include: specialtyInclude,
      })
      if (!row) throw new Error('Hospital not found')
      return { hospital: { ...row, type: castType(row.type) } }
    },
  }),

  showHospitalMap: tool({
    description:
      'Display hospitals on an interactive map. Use when user asks "where is", "show on map", or asks about location.',
    inputSchema: z.object({
      specialty: z.string().max(50).optional(),
      city: z.string().max(50).optional(),
      province: z.string().max(50).optional(),
      area: z.string().max(50).optional(),
      emergency: z.boolean().optional(),
    }),
    execute: async ({ specialty, city, province, area, emergency }): Promise<HospitalMapResult> => {
      const hospitals = await prisma.hospital.findMany({
        where: {
          ...(emergency !== undefined && { emergency }),
          ...(city && { city: { contains: city } }),
          ...(province && { province: { contains: province } }),
          ...(area && { area: { contains: area } }),
          ...(specialty && { specialties: { some: { name: { contains: specialty } } } }),
        },
        select: { id: true, name: true, lat: true, lng: true, area: true, emergency: true, rating: true },
        orderBy: { rating: 'desc' },
      })

      const center =
        hospitals.length > 0
          ? {
              lat: hospitals.reduce((s, h) => s + h.lat, 0) / hospitals.length,
              lng: hospitals.reduce((s, h) => s + h.lng, 0) / hospitals.length,
            }
          : { lat: 31.5204, lng: 74.3587 }

      return { hospitals, center }
    },
  }),

  showSpecialtyStats: tool({
    description:
      'Show analytics and statistics about specialties across all hospitals. Use for "how many", "statistics", "analytics", "breakdown" queries.',
    inputSchema: z.object({
      topN: z.number().min(1).max(20).default(10).describe('Number of top specialties to return'),
    }),
    execute: async ({ topN }): Promise<SpecialtyStatsResult> => {
      const specialties = await prisma.specialty.findMany({
        select: { name: true, rating: true },
      })

      const grouped = specialties.reduce<Record<string, { count: number; totalRating: number }>>(
        (acc, s) => {
          if (!acc[s.name]) acc[s.name] = { count: 0, totalRating: 0 }
          acc[s.name]!.count++
          acc[s.name]!.totalRating += s.rating
          return acc
        },
        {},
      )

      const stats = Object.entries(grouped)
        .map(([specialty, { count, totalRating }]) => ({
          specialty,
          count,
          avgRating: Math.round((totalRating / count) * 10) / 10,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, topN)

      const totalHospitals = await prisma.hospital.count()
      return { stats, totalHospitals }
    },
  }),

  showEmergencyHospitals: tool({
    description:
      'List all hospitals with 24/7 emergency services, sorted by rating. Use for "emergency", "urgent care", "accident" queries.',
    inputSchema: z.object({
      area: z.string().max(50).optional().describe('Filter by area of Lahore'),
    }),
    execute: async ({ area }): Promise<EmergencyHospitalsResult> => {
      const rows = await prisma.hospital.findMany({
        where: {
          emergency: true,
          ...(area && { area: { contains: area } }),
        },
        include: specialtyInclude,
        orderBy: { rating: 'desc' },
      })
      return { hospitals: rows.map((h) => ({ ...h, type: castType(h.type) })) }
    },
  }),

  compareHospitals: tool({
    description:
      'Side-by-side comparison of 2 or more hospitals. Use when user asks to "compare" or asks "which is better".',
    inputSchema: z.object({
      names: z.array(z.string()).min(2).max(4).describe('Names of hospitals to compare'),
    }),
    execute: async ({ names }): Promise<CompareHospitalsResult> => {
      const rows = await Promise.all(
        names.map((name) =>
          prisma.hospital.findFirst({
            where: { name: { contains: name } },
            include: specialtyInclude,
          }),
        ),
      )
      const found = rows.filter((h): h is NonNullable<typeof h> => h !== null)
      if (found.length < 2) throw new Error('Could not find enough hospitals to compare')
      return { hospitals: found.map((h) => ({ ...h, type: castType(h.type) })) }
    },
  }),
}
