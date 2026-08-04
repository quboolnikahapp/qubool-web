import { createClient } from 'npm:@supabase/supabase-js@2'

export function corsHeaders(origin: string | null) {
  const allowed = (Deno.env.get('ALLOWED_ORIGINS') ?? '').split(',').map((value) => value.trim())
  return { 'Access-Control-Allow-Origin': allowed.includes(origin ?? '') ? origin! : 'null', 'Access-Control-Allow-Headers': 'authorization, content-type, x-client-info, apikey', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Content-Type': 'application/json', Vary: 'Origin' }
}

export function optionsResponse(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request.headers.get('origin')) })
}

export async function withCors(request: Request, handler: () => Promise<Response>) {
  if (request.method === 'OPTIONS') return optionsResponse(request)
  const response = await handler()
  const headers = new Headers(response.headers)
  for (const [name, value] of Object.entries(corsHeaders(request.headers.get('origin')))) headers.set(name, value)
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers })
}

export async function requireUser(request: Request) {
  const token = request.headers.get('Authorization')?.replace(/^Bearer\s+/i, '')
  if (!token) throw new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  const client = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: `Bearer ${token}` } } })
  const { data: { user }, error } = await client.auth.getUser(token)
  if (error || !user) throw new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  return { client, user }
}

export function serviceClient() { return createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!) }
