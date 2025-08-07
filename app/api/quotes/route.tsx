process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export async function GET() {
  let res = await fetch('https://api.quotable.io/quotes?limit=10')
  const data = await res.json()
  return Response.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  return NextResponse.json({ received: body })
}
