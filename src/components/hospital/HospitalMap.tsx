import type { HospitalMapResult } from '@/types/hospital'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl.src,
  iconUrl: iconUrl.src,
  shadowUrl: shadowUrl.src,
})

type Props = HospitalMapResult

function makeCircleIcon(color: string): L.DivIcon {
  return L.divIcon({
    html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>`,
    className: '',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10],
  })
}

const emergencyIcon = makeCircleIcon('#ef4444')
const generalIcon = makeCircleIcon('#3b82f6')

function starRating(rating: number): string {
  const full = Math.round(rating)
  return '⭐'.repeat(full)
}

export default function HospitalMap(props: Props) {
  const { hospitals, center } = props

  return (
    <div className="border rounded-2xl overflow-hidden bg-white shadow-sm">
      <div className="h-72 w-full rounded-xl overflow-hidden">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {hospitals.map((hospital) => (
            <Marker
              key={hospital.id}
              position={[hospital.lat, hospital.lng]}
              icon={hospital.emergency ? emergencyIcon : generalIcon}
            >
              <Popup>
                <div className="text-sm min-w-[160px]">
                  <p className="font-semibold text-gray-900 mb-0.5">{hospital.name}</p>
                  <p className="text-gray-500 text-xs mb-1">{hospital.area}</p>
                  <p className="text-xs mb-1">{starRating(hospital.rating)} {hospital.rating.toFixed(1)}</p>
                  {hospital.emergency && (
                    <span className="inline-block bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      Emergency 24/7
                    </span>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <span
              style={{
                display: 'inline-block',
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#ef4444',
              }}
            />
            Emergency
          </span>
          <span className="flex items-center gap-1.5">
            <span
              style={{
                display: 'inline-block',
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#3b82f6',
              }}
            />
            General
          </span>
        </div>
        <span className="text-xs text-gray-400 font-medium">
          Showing {hospitals.length} hospital{hospitals.length !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  )
}
