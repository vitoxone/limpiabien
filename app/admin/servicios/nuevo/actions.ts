'use server';

import { appendServicio, type ServicioInput } from '@/lib/sheets';

export type RegistrarServicioResult = { ok: true } | { ok: false; error: string };

export async function registrarServicio(pw: string, data: ServicioInput): Promise<RegistrarServicioResult> {
  const expected = process.env.CALCULADORA_PASSWORD;
  if (!expected || pw !== expected) {
    return { ok: false, error: 'No autorizado' };
  }
  try {
    await appendServicio(data);
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Error desconocido';
    console.error('[admin] registrarServicio', msg);
    return { ok: false, error: msg };
  }
}
