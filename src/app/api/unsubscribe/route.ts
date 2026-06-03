// import { Client, Functions } from 'appwrite'

// export async function POST(req: Request) {
//   try {
//     const { userId } = await req.json()
//     if (!userId) {
//       return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400 })
//     }

//     const auth = req.headers.get('authorization') || ''
//     if (!auth.startsWith('Bearer ')) {
//       return new Response(JSON.stringify({ error: 'Missing Authorization bearer token' }), { status: 401 })
//     }

//     const token = auth.slice(7).trim()

//     const endpoint = (process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1').replace(/\/$/, '')
//     const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!

//     const client = new Client().setEndpoint(endpoint).setProject(project).setJWT(token)
//     const functions = new Functions(client)

//     const fnId = process.env.NEXT_PUBLIC_APPWRITE_STRIPE_FUNCTION!;
//     const exec = await functions.createExecution(
//       fnId,
//       JSON.stringify({ user_id: userId, jwt: token }),
//       false,
//       '/unsubscribe',
//       'POST' as unknown as import('appwrite').ExecutionMethod
//     )

//     const body = exec.responseBody || '{}'
//     let data: unknown
//     try {
//       data = JSON.parse(body)
//     } catch {
//       data = { raw: body }
//     }

//     const ok = exec.status === 'completed'
//     return new Response(
//       JSON.stringify({ ok, status: exec.status, errors: exec.errors, logs: exec.logs, data }),
//       { status: ok ? 200 : 502, headers: { 'content-type': 'application/json' } }
//     )
//   } catch (err: unknown) {
//     return new Response(
//       JSON.stringify({ error: 'Unsubscribe proxy failed', message: (err as Error)?.message || String(err) }),
//       { status: 500, headers: { 'content-type': 'application/json' } }
//     )
//   }
// }