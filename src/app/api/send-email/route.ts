import { Client, Functions } from 'appwrite'

export async function POST(req: Request) {
  try {
    const { type, userEmail, userName } = await req.json().catch(() => ({} as Record<string, unknown>));
    if (!type || !userEmail || !userName) {
      return new Response(JSON.stringify({ error: 'Missing type, userEmail, or userName' }), { status: 400 });
    }

    const auth = req.headers.get('authorization') || '';
    if (!auth.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Missing Authorization bearer token' }), { status: 401 });
    }

    const token = auth.slice(7).trim();

    const endpoint = (process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1').replace(/\/$/, '');
    const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
    const fnId = process.env.NEXT_PUBLIC_APPWRITE_STRIPE_FUNCTION || '68794e830018a53dcad6'; // fallback to known ID

    const client = new Client().setEndpoint(endpoint).setProject(project);

    const adminKey = process.env.APPWRITE_API_KEY || process.env.NEXT_PUBLIC_APPWRITE_API_KEY; // prefer server-only var
    const hasAdminKey = Boolean(adminKey);
    if (hasAdminKey) {
      client.setKey(adminKey as string);
    } else {
      client.setJWT(token);
    }

    const functions = new Functions(client);

    const exec = await functions.createExecution(
      fnId,
      JSON.stringify({ type, userEmail, userName, jwt: token }),
      false,
      '/send-email',
      'POST' as unknown as import('appwrite').ExecutionMethod,
      { 'content-type': 'application/json' }
    );

    const body = exec.responseBody || '{}';
    let data: unknown;
    try {
      data = JSON.parse(body);
    } catch {
      data = { raw: body };
    }

    const ok = exec.status === 'completed';
    const hasError = !!data?.error;
    const statusCode = !ok ? 502 : hasError ? (data?.statusCode || 400) : 200;
    const debug = process.env.NODE_ENV !== 'production' ? {
      debug: {
        endpoint,
        projectSet: Boolean(project),
        fnIdSuffix: fnId?.slice?.(-6) || null,
      }
    } : {};

    return new Response(
      JSON.stringify({ ok, status: exec.status, errors: exec.errors, logs: exec.logs, data, ...debug }),
      { status: statusCode, headers: { 'content-type': 'application/json' } }
    );
  } catch (err: unknown) {
    // Log server-side for debugging during dev
    console.error('[api/send-email] proxy failed:', err);
    return new Response(
      JSON.stringify({ error: 'Send-email proxy failed', message: (err as Error)?.message || String(err) }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
