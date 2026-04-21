import 'server-only';
import { google } from 'googleapis';

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, '\n');
  if (!email || !key || !SHEET_ID) {
    throw new Error('Faltan GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_SERVICE_ACCOUNT_KEY / GOOGLE_SHEET_ID');
  }
  return new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

function client() {
  return google.sheets({ version: 'v4', auth: getAuth() });
}

export type ServicioInput = {
  fecha: string;           // DD/MM/YYYY
  cliente: string;
  ciudad: string;
  ubicacion: string;
  servicio: string;
  cantidad: number;
  precioUnitario: number;
  medioPago: string;
  pagado: boolean;
  notas?: string;
  origen?: string;
};

export async function appendServicio(s: ServicioInput) {
  // Columnas de la hoja "Servicios":
  // A Fecha | B Cliente | C Ciudad | D Ubicación | E Servicio | F Cantidad
  // G Precio unitario | H Total (fórmula) | I Medio de pago | J Pagado | K Notas
  // L Mes (fórmula) | M Año (fórmula) | N Semana (fórmula) | O Columna 1 (fórmula) | P vacía | Q Origen
  const row = [
    s.fecha,
    s.cliente,
    s.ciudad,
    s.ubicacion,
    s.servicio,
    s.cantidad,
    s.precioUnitario,
    '=IFERROR(INDIRECT("F"&ROW())*INDIRECT("G"&ROW()),"")',
    s.medioPago,
    s.pagado ? 'si' : '',
    s.notas || '',
    '=IFERROR(MONTH(INDIRECT("A"&ROW())),"")',
    '=IFERROR(YEAR(INDIRECT("A"&ROW())),"")',
    '=IFERROR(WEEKNUM(INDIRECT("A"&ROW()),2),"")',
    '=TEXT(INDIRECT("L"&ROW()),"0")&"-"&INDIRECT("M"&ROW())',
    '',
    s.origen || '',
  ];
  await client().spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'Servicios!A:Q',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  });
}

export type GastoInput = {
  fecha: string;           // DD/MM/YYYY
  categoria: string;
  descripcion: string;
  monto: number;
  medioPago: string;
};

export async function appendGasto(g: GastoInput) {
  // A Fecha | B Categoría | C Descripción | D Monto | E Medio de pago
  // F Mes (fórmula) | G Año (fórmula) | H Semana (fórmula)
  const row = [
    g.fecha,
    g.categoria,
    g.descripcion,
    g.monto,
    g.medioPago,
    '=IFERROR(MONTH(INDIRECT("A"&ROW())),"")',
    '=IFERROR(YEAR(INDIRECT("A"&ROW())),"")',
    '=IFERROR(WEEKNUM(INDIRECT("A"&ROW()),2),"")',
  ];
  await client().spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'Gastos!A:H',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  });
}

// Devuelve las últimas N filas de la hoja "Servicios" en orden descendente de fecha.
export async function lastServicios(n = 5) {
  const res = await client().spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'Servicios!A2:Q',
  });
  const rows = res.data.values ?? [];
  return rows.slice(-n).reverse().map(r => ({
    fecha: r[0] ?? '',
    cliente: r[1] ?? '',
    ciudad: r[2] ?? '',
    servicio: r[4] ?? '',
    total: Number(r[7] ?? r[6] ?? 0),
  }));
}

export async function lastGastos(n = 5) {
  const res = await client().spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'Gastos!A2:E',
  });
  const rows = res.data.values ?? [];
  return rows.slice(-n).reverse().map(r => ({
    fecha: r[0] ?? '',
    categoria: r[1] ?? '',
    descripcion: r[2] ?? '',
    monto: Number(r[3] ?? 0),
  }));
}
