export type HospitalType = 'public' | 'private' | 'semi-government'

export interface Specialty {
  id: string
  name: string
  rating: number
  hospitalId: string
}

export interface Hospital {
  id: string
  name: string
  type: HospitalType
  city: string
  province: string
  address: string
  area: string
  lat: number
  lng: number
  phone: string
  emergency: boolean
  beds: number
  rating: number
  timings: string
  established: number
  specialties: Specialty[]
  createdAt: Date
  updatedAt: Date
}

// Lightweight version returned by map/search tools (no full specialty list)
export interface HospitalSummary {
  id: string
  name: string
  type: HospitalType
  city: string
  province: string
  address: string
  area: string
  lat: number
  lng: number
  phone: string
  emergency: boolean
  beds: number
  rating: number
  timings: string
  established: number
  specialties: Pick<Specialty, 'name' | 'rating'>[]
  createdAt: Date
  updatedAt: Date
}

// Tool result shapes — each tool returns one of these
export interface SearchHospitalsResult {
  hospitals: HospitalSummary[]
  total: number
  query: { specialty?: string; emergency?: boolean; area?: string; type?: HospitalType; city?: string; province?: string }
}

export interface HospitalDetailResult {
  hospital: Hospital
}

export interface HospitalMapResult {
  hospitals: Pick<Hospital, 'id' | 'name' | 'lat' | 'lng' | 'area' | 'emergency' | 'rating'>[]
  center: { lat: number; lng: number }
}

export interface SpecialtyStatsResult {
  stats: { specialty: string; count: number; avgRating: number }[]
  totalHospitals: number
}

export interface EmergencyHospitalsResult {
  hospitals: HospitalSummary[]
}

export interface CompareHospitalsResult {
  hospitals: Hospital[]
}
