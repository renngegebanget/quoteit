export async function GET() {
  let res = await fetch('https://zenquotes.io/api/random')
  const data = await res.json()
  return Response.json(data)
}
