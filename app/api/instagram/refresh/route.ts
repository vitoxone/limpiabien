import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  // Vercel Cron envía Authorization: Bearer ${CRON_SECRET}
  const auth = req.headers.get('authorization');
  const expected = `Bearer ${process.env.CRON_SECRET ?? ''}`;
  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = process.env.IG_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'IG_TOKEN no configurado' }, { status: 500 });
  }

  const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;
  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();

  if (!res.ok || !data?.access_token) {
    console.error('[ig:refresh] Falló el refresh:', data);
    return NextResponse.json({ error: 'Refresh falló', detail: data }, { status: 500 });
  }

  // El nuevo token DEBE actualizarse manualmente en las env vars de Vercel.
  // Lo logueamos para que aparezca en los logs del cron.
  console.warn(
    `[ig:refresh] Nuevo IG_TOKEN (válido ~60 días). Actualizar en Vercel → Project Settings → Env Vars: ${data.access_token}`,
  );

  return NextResponse.json({
    ok: true,
    expiresInSeconds: data.expires_in,
    note: 'Copia "newToken" a la env var IG_TOKEN en Vercel y redeploya.',
    newToken: data.access_token,
  });
}
