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
    <div className="relative min-h-screen">
      {/* Left side pattern */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-[url('/pattern.png')] bg-repeat-y pointer-events-none z-0 hidden md:block"></div>
      {/* Right side pattern */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-[url('/pattern.png')] bg-repeat-y pointer-events-none z-0 hidden md:block"></div>
      <div className="relative">
        <Header lng={validLng} />
        <main className="flex-1">{children}</main>
        <Footer lng={validLng} />
      </div>
    </div>
  );
}
