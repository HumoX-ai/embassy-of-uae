import { Metadata } from "next";
import Image from "next/image";

import { useTranslation } from "@/i18n";
import { Language, languages, fallbackLng } from "@/i18n/settings";

type PageProps = {
  params: Promise<{ lng: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lng } = await params;

  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;

  const titles = {
    en: "State Symbols of the Republic of Uzbekistan",
    uz: "O'zbekiston Respublikasi Davlat Ramzlari",
  };

  const descriptions = {
    en: "Learn about the State Emblem, Flag, and Anthem of the Republic of Uzbekistan - symbols of independence and sovereignty.",
    uz: "O'zbekiston Respublikasining Davlat Gerbi, Bayrog'i va Madhiyasi - mustaqillik va suverenitet ramzlari haqida ma'lumot.",
  };

  return {
    title: titles[validLng] || titles.en,
    description: descriptions[validLng] || descriptions.en,
    keywords:
      validLng === "uz"
        ? "O'zbekiston davlat ramzlari, gerb, bayroq, madhiya, mustaqillik"
        : "Uzbekistan state symbols, emblem, flag, anthem, independence",
    openGraph: {
      title: titles[validLng] || titles.en,
      description: descriptions[validLng] || descriptions.en,
      type: "website",
      locale: validLng === "uz" ? "uz_UZ" : "en_US",
    },
  };
}

export default async function StateSymbolsPage({ params }: PageProps) {
  const { lng } = await params;
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;
  const { t } = await useTranslation(validLng, "stateSymbols");

  const emblemColorsList = t("emblemColorsList", {
    returnObjects: true,
  }) as string[];

  const anthemLyrics = t("anthemLyrics", {
    returnObjects: true,
  }) as string[];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-blue-700 to-blue-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
            {t("title")}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 max-w-3xl mx-auto opacity-90 px-2">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* State Emblem Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              {t("emblemTitle")}
            </h2>

            <div className="text-center mb-8">
              <p className="text-sm md:text-base text-muted-foreground">
                {t("emblemDate")}
              </p>
              <p className="text-sm md:text-base text-muted-foreground italic">
                {t("emblemLaw")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
              <div className="bg-card rounded-lg p-8 border border-border">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Image
                    src="/emblem_of_uzbekistan.png"
                    alt={t("emblem")}
                    width={400}
                    height={400}
                    className="object-contain w-full h-full p-8"
                    unoptimized
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {t("emblemDescription1")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("emblemDescription2")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("emblemDescription3")}
                  </p>
                </div>

                <div className="bg-muted rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {t("emblemColors")}
                  </h3>
                  <ul className="space-y-2">
                    {emblemColorsList.map((color, index) => (
                      <li
                        key={index}
                        className="text-sm md:text-base text-muted-foreground flex items-start"
                      >
                        <span className="mr-2 mt-1.5">•</span>
                        <span>{color}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State Flag Section */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              {t("flagTitle")}
            </h2>

            <div className="text-center mb-8">
              <p className="text-sm md:text-base text-muted-foreground">
                {t("flagDate")}
              </p>
              <p className="text-sm md:text-base text-muted-foreground italic">
                {t("flagLaw")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="order-2 md:order-1 space-y-6">
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {t("flagDescription1")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("flagDescription2")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("flagDescription3")}
                  </p>
                </div>
              </div>

              <div className="order-1 md:order-2 bg-card rounded-lg p-8 border border-border">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Image
                    src="/flag_of_uzbekistan.png"
                    alt={t("flag")}
                    width={600}
                    height={400}
                    className="object-contain w-full h-full p-4"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State Anthem Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              {t("anthemTitle")}
            </h2>

            <div className="text-center mb-8">
              <p className="text-sm md:text-base text-muted-foreground">
                {t("anthemDate")}
              </p>
              <p className="text-sm md:text-base text-muted-foreground italic">
                {t("anthemLaw")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="bg-card rounded-lg p-8 border border-border">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-6">
                  <Image
                    src="/anthem_of_uzbekistan.png"
                    alt={t("anthem")}
                    width={400}
                    height={300}
                    className="object-contain w-full h-full p-4 lg:p-8"
                    unoptimized
                  />
                </div>

                <div className="space-y-4">
                  <div className="prose max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {t("anthemDescription1")}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {t("anthemDescription2")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-8">
                <div className="mb-6 text-center">
                  <p className="text-sm font-semibold text-foreground">
                    {t("anthemComposer")}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {t("anthemLyricist")}
                  </p>
                </div>

                <div className="space-y-2 font-serif">
                  {anthemLyrics.map((line, index) => (
                    <p
                      key={index}
                      className={`text-sm md:text-base ${
                        line === ""
                          ? "h-4"
                          : line.includes("Naqarot") || line.includes("Chorus")
                          ? "font-bold text-foreground mt-4"
                          : "text-muted-foreground"
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patriotic Message */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              {t("respectTitle")}
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {validLng === "uz"
                ? "O'zbekiston Respublikasi davlat ramzlari - bizning mustaqilligimiz, suverenitetimiz va milliy g'ururimizning timsoli. Ularni hurmat qilish va himoya qilish har bir O'zbekiston fuqarosining muqaddas burchidir."
                : "The state symbols of the Republic of Uzbekistan are the embodiment of our independence, sovereignty and national pride. Respecting and protecting them is a sacred duty of every citizen of Uzbekistan."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
