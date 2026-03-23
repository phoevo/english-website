import { Client, Functions } from 'appwrite'

export async function POST(req: Request) {
  try {
    const { plan, documentId } = await req.json()

    if (!plan || !documentId) {
      return new Response(JSON.stringify({ error: 'Missing plan or documentId' }), { status: 400 })
    }

    const auth = req.headers.get('authorization') || ''
    if (!auth.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Missing Authorization bearer token' }), { status: 401 })
    }

    const token = auth.slice(7).trim()

    const endpoint = (process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1').replace(/\/$/, '')
    const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!

    const client = new Client().setEndpoint(endpoint).setProject(project).setJWT(token)
    const functions = new Functions(client)

    const fnId = process.env.NEXT_PUBLIC_APPWRITE_STRIPE_FUNCTION!;
    const exec = await functions.createExecution(
      fnId,
      JSON.stringify({ plan, documentId, jwt: token }),
      false,
      '/payments',
      'POST' as unknown as import('appwrite').ExecutionMethod
    )

    const body = exec.responseBody || '{}'
    let data: any
    try {
      data = JSON.parse(body)
    } catch {
      data = { raw: body }
    }

    const ok = exec.status === 'completed'
    return new Response(
      JSON.stringify({ ok, status: exec.status, errors: exec.errors, logs: exec.logs, ...data }),
      { status: ok ? 200 : 502, headers: { 'content-type': 'application/json' } }
    )
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Checkout proxy failed', message: err?.message || String(err) }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    )
  }
}
