import { Client, Functions } from 'appwrite'

export async function POST(req: Request) {
  try {
    const { plan } = await req.json()

    if (!plan) {
      return new Response(JSON.stringify({ error: 'Missing plan' }), { status: 400 })
    }

    const auth = req.headers.get('authorization') || ''
    if (!auth.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Missing Authorization token' }), { status: 401 })
    }

    const token = auth.slice(7)

    const endpoint = (process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1').replace(/\/$/, '')
    const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!

    const client = new Client()
      .setEndpoint(endpoint)
      .setProject(project)

    const functions = new Functions(client)

    const fnId = process.env.NEXT_PUBLIC_APPWRITE_STRIPE_FUNCTION!

    const exec = await functions.createExecution(
      fnId,
      JSON.stringify({ plan }),
      false,
      '/payments',
      'POST' as any
    )

    const data = JSON.parse(exec.responseBody || '{}')

    return new Response(
      JSON.stringify({
        ok: exec.status === 'completed',
        checkout_url: data?.checkout_url,
      }),
      { status: 200 }
    )
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Checkout failed', message: err.message }),
      { status: 500 }
    )
  }
}