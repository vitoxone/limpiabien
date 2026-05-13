import 'server-only';

export type IgMedia = {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  thumbnail_url?: string;
};

const IG_API = 'https://graph.instagram.com/me/media';
const FIELDS = 'id,media_url,permalink,caption,media_type,thumbnail_url';

export async function getIgMedia(limit = 6): Promise<IgMedia[]> {
  const token = process.env.IG_TOKEN;
  if (!token) return [];

  try {
    const url = `${IG_API}?fields=${FIELDS}&limit=${limit}&access_token=${token}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.data) ? data.data : [];
  } catch {
    return [];
  }
}

export function pickImage(m: IgMedia): string {
  return m.media_type === 'VIDEO' && m.thumbnail_url ? m.thumbnail_url : m.media_url;
}
