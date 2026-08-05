/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // La landing /servicios quedó obsoleta: el listado vive en la home (/#servicios).
      // 301 permanente para no perder el posicionamiento ni dejar caer visitas desde buscadores.
      { source: '/servicios', destination: '/#servicios', permanent: true },
    ]
  },
}

export default nextConfig
