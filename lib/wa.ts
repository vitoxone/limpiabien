/**
 * Build a WhatsApp link using the public env phone number.
 * Define NEXT_PUBLIC_WHATSAPP_PHONE in your .env.local, e.g. +56998765432
 */
export function buildWaLink(message: string) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '+56912345678';
  const digits = phone.replace(/\D/g, '');
  const text = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${text}`;
}
