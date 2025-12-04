import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { languages, Language, fallbackLng } from "@/i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = await params;

  // Validate that lng is a supported language
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;

  return (
    <>
      <Header lng={validLng} />
      <main className="flex-1">{children}</main>
      <Footer lng={validLng} />
    </>
  );
}
