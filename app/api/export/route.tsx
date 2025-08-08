// @ts-nocheck
import { NextResponse } from 'next/server'
export async function POST(req) {
  const progress = await req.json()
  const json = JSON.stringify(progress, null, 2)

  return new NextResponse(json, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="data.json"',
    },
  })
}
