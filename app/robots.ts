import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://uzembassy.ae";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Quyidagi yo'llarni indekslashni taqiqlaymiz:
      // /api/ - Backend API yo'llari
      // /private/ - Agar kelajakda shaxsiy kabinet yoki yopiq sahifalar bo'lsa
      // Eslatma: /_next/ papkasini bloklamang, chunki Google sahifani to'liq render qilish uchun stillar va skriptlarga muhtoj.
      disallow: ["/api/", "/private/", "/admin/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
