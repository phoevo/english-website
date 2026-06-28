export async function POST(req: Request) {
  try {
    const { userId } = await req.json()

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400 })
    }

    const endpoint = (process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1').replace(/\/$/, '')
    const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!
    const apiKey = process.env.APPWRITE_API_KEY!

    // Direct REST call to Appwrite — no function cold start needed
    const resp = await fetch(`${endpoint}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Appwrite-Project': project,
        'X-Appwrite-Key': apiKey,
      },
    })

    if (!resp.ok) {
      const body = await resp.text()
      return new Response(
        JSON.stringify({ error: 'Failed to delete auth user', status: resp.status, details: body }),
        { status: resp.status, headers: { 'content-type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, userId }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    )
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({ error: 'Delete-account failed', message: (err as Error)?.message || String(err) }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    )
  }
}
