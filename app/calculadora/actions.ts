'use server';

export async function verificarClave(clave: string): Promise<boolean> {
  const claveCorrecta = process.env.CALCULADORA_PASSWORD;
  if (!claveCorrecta) {
    console.warn('[calculadora] CALCULADORA_PASSWORD no está definida en .env');
    return false;
  }
  return clave === claveCorrecta;
}
