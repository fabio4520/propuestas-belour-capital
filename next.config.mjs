/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // AVIF primero: los JPG editoriales de sectores y liderazgo pesan entre 157
    // y 466 KB y en AVIF quedan en una fracción. Next negocia por cabecera
    // Accept, así que un navegador sin soporte recibe WebP y, si tampoco, el
    // original — no hay que gestionar fallbacks a mano.
    formats: ["image/avif", "image/webp"],
    // Placeholders mock desde servicios externos (no se usan en build estático local)
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
