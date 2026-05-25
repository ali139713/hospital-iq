import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'

const startTime = Date.now()

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`

    return NextResponse.json({
      status: 'ok',
      db: 'connected',
      uptime: Math.floor((Date.now() - startTime) / 1000),
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version ?? '0.1.0',
    })
  } catch {
    return NextResponse.json(
      { status: 'error', db: 'disconnected', timestamp: new Date().toISOString() },
      { status: 503 },
    )
  }
}
