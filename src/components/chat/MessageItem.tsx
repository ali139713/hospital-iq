'use client'

import { type UIMessage } from 'ai'
import { Bot, User } from 'lucide-react'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'
import { GridSkeleton, MapSkeleton, ChartSkeleton, CardSkeleton } from '@/components/shared/LoadingSkeleton'
import type {
  SearchHospitalsResult,
  HospitalDetailResult,
  HospitalMapResult,
  SpecialtyStatsResult,
  EmergencyHospitalsResult,
  CompareHospitalsResult,
} from '@/types/hospital'

// Lazy-load heavy components — reduces initial bundle size
const HospitalGrid = dynamic(
  () => import('@/components/hospital/HospitalGrid').then((m) => ({ default: m.HospitalGrid })),
  { loading: () => <GridSkeleton /> },
)
const HospitalDetailCard = dynamic(
  () => import('@/components/hospital/HospitalDetailCard').then((m) => ({ default: m.HospitalDetailCard })),
  { loading: () => <CardSkeleton /> },
)
const HospitalMap = dynamic(
  () => import('@/components/hospital/HospitalMap'),
  { loading: () => <MapSkeleton />, ssr: false }, // Leaflet requires browser APIs
)
const SpecialtyChart = dynamic(
  () => import('@/components/hospital/SpecialtyChart'),
  { loading: () => <ChartSkeleton /> },
)
const EmergencyList = dynamic(
  () => import('@/components/hospital/EmergencyList').then((m) => ({ default: m.EmergencyList })),
  { loading: () => <GridSkeleton /> },
)
const ComparisonTable = dynamic(
  () => import('@/components/hospital/ComparisonTable').then((m) => ({ default: m.ComparisonTable })),
  { loading: () => <ChartSkeleton /> },
)

type AnyToolPart = {
  type: string
  toolCallId: string
  state: string
  output?: unknown
}

function ToolResult({ toolName, result }: { toolName: string; result: unknown }) {
  switch (toolName) {
    case 'searchHospitals':
      return <HospitalGrid {...(result as SearchHospitalsResult)} />
    case 'showHospitalDetail':
      return <HospitalDetailCard {...(result as HospitalDetailResult)} />
    case 'showHospitalMap':
      return <HospitalMap hospitals={(result as HospitalMapResult).hospitals} center={(result as HospitalMapResult).center} />
    case 'showSpecialtyStats':
      return <SpecialtyChart stats={(result as SpecialtyStatsResult).stats} totalHospitals={(result as SpecialtyStatsResult).totalHospitals} />
    case 'showEmergencyHospitals':
      return <EmergencyList {...(result as EmergencyHospitalsResult)} />
    case 'compareHospitals':
      return <ComparisonTable {...(result as CompareHospitalsResult)} />
    default:
      return null
  }
}

function ToolSkeleton({ toolName }: { toolName: string }) {
  if (toolName === 'showHospitalMap') return <MapSkeleton />
  if (toolName === 'showSpecialtyStats') return <ChartSkeleton />
  if (['searchHospitals', 'showEmergencyHospitals'].includes(toolName)) return <GridSkeleton />
  return <CardSkeleton />
}

interface MessageItemProps {
  message: UIMessage
}

export function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user'

  // In v6, text content is in parts with type 'text'
  const textContent = message.parts
    .filter((p) => p.type === 'text')
    .map((p) => (p as { type: 'text'; text: string }).text)
    .join('')

  // Tool parts have type 'tool-{toolName}'
  const toolParts = message.parts
    .filter((p) => p.type.startsWith('tool-'))
    .map((p) => p as unknown as AnyToolPart)

  return (
    <div className={cn('flex gap-3', isUser && 'flex-row-reverse')}>
      {/* Avatar */}
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          isUser ? 'bg-primary text-primary-foreground' : 'bg-muted',
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Content */}
      <div className={cn('flex max-w-[85%] flex-col gap-2', isUser && 'items-end')}>
        {/* Text content */}
        {textContent && (
          <div
            className={cn(
              'rounded-2xl px-4 py-2.5 text-sm',
              isUser
                ? 'rounded-tr-sm bg-primary text-primary-foreground'
                : 'rounded-tl-sm bg-muted text-foreground',
            )}
          >
            {textContent}
          </div>
        )}

        {/* Tool invocation results — rendered as interactive components */}
        {toolParts.map((part) => {
          const toolName = part.type.slice(5) // strip 'tool-' prefix

          if (part.state !== 'output-available') {
            return (
              <div key={part.toolCallId} className="w-full">
                <ToolSkeleton toolName={toolName} />
              </div>
            )
          }

          return (
            <ErrorBoundary key={part.toolCallId}>
              <div className="w-full min-w-[320px]">
                <ToolResult toolName={toolName} result={part.output} />
              </div>
            </ErrorBoundary>
          )
        })}
      </div>
    </div>
  )
}
