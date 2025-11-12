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
    en: "Uzbek Culture | Rich Heritage and Traditions",
    uz: "O'zbek madaniyati | Boy meros va an'analar",
  };

  const descriptions = {
    en: "Discover the rich and unique culture of Uzbekistan - folk art, dance, painting, national cuisine and clothing.",
    uz: "O'zbekistonning boy va o'ziga xos madaniyatini kashf eting - xalq san'ati, raqs, rassomchilik, milliy oshxona va kiyim-kechak.",
  };

  return {
    title: titles[validLng] || titles.en,
    description: descriptions[validLng] || descriptions.en,
    keywords:
      validLng === "uz"
        ? "O'zbek madaniyati, xalq san'ati, milliy raqs, milliy taomlar, hunarmandchilik, do'ppi, osh"
        : "Uzbek culture, folk art, national dance, national cuisine, handicrafts, doppi, plov",
    openGraph: {
      title: titles[validLng] || titles.en,
      description: descriptions[validLng] || descriptions.en,
      type: "website",
      locale: validLng === "uz" ? "uz_UZ" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[validLng] || titles.en,
      description: descriptions[validLng] || descriptions.en,
    },
  };
}

export default async function UzbekCulturePage({ params }: PageProps) {
  const { lng } = await params;
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;
  const { t } = await useTranslation(validLng, "uzbekCulture");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-blue-700 to-blue-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
            {t("pageTitle")}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 max-w-3xl mx-auto opacity-90 px-2">
            {t("pageSubtitle")}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-8 sm:py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
              {t("introText")}
            </p>
          </div>
        </div>
      </section>

      {/* Folk Art and Music */}
      <section className="py-8 sm:py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 text-foreground">
              {t("folkArtTitle")}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-start mb-8 sm:mb-12">
              <div className="bg-card rounded-xl p-2 sm:p-4 border border-border">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Image
                    src="/uzbekistan/folk-music.jpg"
                    alt={t("folkArtTitle")}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {t("folkArtDescription1")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("folkArtDescription2")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("folkArtDescription3")}
                </p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-xl p-4 sm:p-8">
              <h3 className="text-2xl font-bold mb-4 sm:mb-6 text-foreground">
                {t("musicTypesTitle")}
              </h3>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t("musicTypesDescription1")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("musicTypesDescription2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dance */}
      <section className="py-8 sm:py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 text-foreground">
              {t("danceTitle")}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-start mb-8 sm:mb-12">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {t("danceDescription1")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("danceDescription2")}
                </p>
              </div>

              <div className="bg-card rounded-xl p-2 sm:p-4 border border-border">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Image
                    src="/uzbekistan/uzbek-dance.jpg"
                    alt={t("danceTitle")}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 sm:p-8 border border-border">
              <h3 className="text-2xl font-bold mb-4 sm:mb-6 text-foreground">
                {t("danceSchoolsTitle")}
              </h3>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t("danceSchoolsDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Painting and Arts */}
      <section className="py-8 sm:py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 text-foreground">
              {t("paintingTitle")}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-start">
              <div className="bg-card rounded-xl p-2 sm:p-4 border border-border">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Image
                    src="/uzbekistan/miniature-art.jpg"
                    alt={t("paintingTitle")}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {t("paintingDescription1")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("paintingDescription2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* National Clothing */}
      <section className="py-8 sm:py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 text-foreground">
              {t("clothingTitle")}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-start mb-8 sm:mb-12">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {t("clothingDescription1")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("clothingDescription2")}
                </p>

                <div className="bg-card rounded-xl p-3 sm:p-6 border border-border">
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {t("mensClothingTitle")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("mensClothingDescription")}
                  </p>
                </div>

                <div className="bg-card rounded-xl p-3 sm:p-6 border border-border">
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {t("womensClothingTitle")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("womensClothingDescription")}
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-xl p-2 sm:p-4 border border-border">
                <div className="aspect-3/4 bg-muted rounded-lg flex items-center justify-center">
                  <Image
                    src="/uzbekistan/national-clothing.jpg"
                    alt={t("clothingTitle")}
                    width={500}
                    height={700}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Doppi Section */}
            <div className="bg-card rounded-xl p-4 sm:p-8 border border-border">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-start">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">
                    {t("doppiTitle")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("doppiDescription1")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("doppiDescription2")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("doppiDescription3")}
                  </p>
                </div>

                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Image
                    src="/uzbekistan/doppi.jpg"
                    alt={t("doppiTitle")}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* National Cuisine */}
      <section className="py-8 sm:py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 text-foreground">
              {t("cuisineTitle")}
            </h2>

            <div className="mb-8 sm:mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
                {t("cuisineIntro")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
              {/* Plov */}
              <div className="bg-card rounded-xl overflow-hidden border border-border">
                <div className="aspect-video bg-muted">
                  <Image
                    src="/uzbekistan/plov.jpg"
                    alt="Osh (Plov)"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-3 sm:p-6">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    {t("plovTitle")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("plovDescription")}
                  </p>
                </div>
              </div>

              {/* Non */}
              <div className="bg-card rounded-xl overflow-hidden border border-border">
                <div className="aspect-video bg-muted">
                  <Image
                    src="/uzbekistan/non.jpg"
                    alt="Non"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-3 sm:p-6">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    {t("nonTitle")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("nonDescription")}
                  </p>
                </div>
              </div>

              {/* Halva */}
              <div className="bg-card rounded-xl overflow-hidden border border-border">
                <div className="aspect-video bg-muted">
                  <Image
                    src="/uzbekistan/halva.jpg"
                    alt="Xalva"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-3 sm:p-6">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    {t("halvaTitle")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("halvaDescription")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-xl p-4 sm:p-8">
              <h3 className="text-2xl font-bold mb-4 sm:mb-6 text-foreground">
                {t("otherDishesTitle")}
              </h3>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {t("otherDishesDescription1")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("otherDishesDescription2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Handicrafts */}
      <section className="py-8 sm:py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 text-foreground">
              {t("handicraftsTitle")}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-start mb-8 sm:mb-12">
              <div className="bg-card rounded-xl p-2 sm:p-4 border border-border">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Image
                    src="/uzbekistan/handicrafts.jpg"
                    alt={t("handicraftsTitle")}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {t("handicraftsDescription1")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("handicraftsDescription2")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("handicraftsDescription3")}
                </p>
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 sm:p-8 border border-border">
              <h3 className="text-2xl font-bold mb-4 sm:mb-6 text-foreground">
                {t("famousCraftsTitle")}
              </h3>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold text-lg">•</span>
                    <p className="text-muted-foreground">{t("craft1")}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold text-lg">•</span>
                    <p className="text-muted-foreground">{t("craft2")}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold text-lg">•</span>
                    <p className="text-muted-foreground">{t("craft3")}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold text-lg">•</span>
                    <p className="text-muted-foreground">{t("craft4")}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold text-lg">•</span>
                    <p className="text-muted-foreground">{t("craft5")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
