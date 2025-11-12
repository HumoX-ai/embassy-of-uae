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
    en: "Tourism Potential of Uzbekistan",
    uz: "O'zbekistonning turizm salohiyati",
  };

  const descriptions = {
    en: "Discover the tourism potential of Uzbekistan - historical monuments, unique climate, active tourism and hospitality.",
    uz: "O'zbekistonning turizm salohiyatini kashf eting - tarixiy yodgorliklar, noyob iqlim, aktiv turizm va mehmonnavozlik.",
  };

  return {
    title: titles[validLng] || titles.en,
    description: descriptions[validLng] || descriptions.en,
    keywords:
      validLng === "uz"
        ? "O'zbekiston turizm, Buyuk Ipak Yo'li, Samarqand, Buxoro, Xiva, tarixiy yodgorliklar"
        : "Uzbekistan tourism, Great Silk Road, Samarkand, Bukhara, Khiva, historical monuments",
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

export default async function TourismPotentialPage({ params }: PageProps) {
  const { lng } = await params;
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;
  const { t } = await useTranslation(validLng, "tourismPotential");

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
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t("introText1")}
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t("introText2")}
            </p>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-8 sm:py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 text-foreground">
              {t("heritageTitle")}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-start">
              <div className="bg-card rounded-xl p-2 sm:p-4 border border-border">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Image
                    src="/uzbekistan/heritage.jpg"
                    alt={t("heritageTitle")}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {t("heritageDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-8 sm:py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 text-foreground">
              {t("citiesTitle")}
            </h2>

            <div className="space-y-8 sm:space-y-16">
              {/* Tashkent */}
              <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-start">
                <div className="order-2 md:order-1 space-y-4 sm:space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {t("tashkentTitle")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("tashkentDescription1")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("tashkentDescription2")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("tashkentDescription3")}
                  </p>
                </div>

                <div className="order-1 md:order-2 bg-card rounded-xl p-2 sm:p-4 border border-border">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Image
                      src="/uzbekistan/tashkent-tourism.jpg"
                      alt={t("tashkentTitle")}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Samarkand */}
              <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-start">
                <div className="bg-card rounded-xl p-2 sm:p-4 border border-border">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Image
                      src="/uzbekistan/samarkand-tourism.jpg"
                      alt={t("samarkandTitle")}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {t("samarkandTitle")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("samarkandDescription1")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("samarkandDescription2")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("samarkandDescription3")}
                  </p>
                </div>
              </div>

              {/* Bukhara */}
              <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-start">
                <div className="order-2 md:order-1 space-y-4 sm:space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {t("bukharaTitle")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("bukharaDescription1")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("bukharaDescription2")}
                  </p>
                </div>

                <div className="order-1 md:order-2 bg-card rounded-xl p-2 sm:p-4 border border-border">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Image
                      src="/uzbekistan/bukhara-tourism.jpg"
                      alt={t("bukharaTitle")}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Khiva */}
              <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-start">
                <div className="bg-card rounded-xl p-2 sm:p-4 border border-border">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Image
                      src="/uzbekistan/khiva-tourism.jpg"
                      alt={t("khivaTitle")}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {t("khivaTitle")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("khivaDescription1")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("khivaDescription2")}
                  </p>
                </div>
              </div>

              {/* Termez */}
              <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-start">
                <div className="order-2 md:order-1 space-y-4 sm:space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {t("termezTitle")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("termezDescription1")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("termezDescription2")}
                  </p>
                </div>

                <div className="order-1 md:order-2 bg-card rounded-xl p-2 sm:p-4 border border-border">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Image
                      src="/uzbekistan/termez.jpg"
                      alt={t("termezTitle")}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Karakalpakstan */}
              <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-start">
                <div className="bg-card rounded-xl p-2 sm:p-4 border border-border">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Image
                      src="/uzbekistan/karakalpakstan.jpg"
                      alt={t("karakalpakstanTitle")}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {t("karakalpakstanTitle")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("karakalpakstanDescription1")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("karakalpakstanDescription2")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traditions and Bazaars */}
      <section className="py-8 sm:py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-12 mb-8 sm:mb-16">
              {/* Traditions */}
              <div className="bg-card rounded-xl p-2 sm:p-4 border border-border">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-foreground">
                  {t("traditionsTitle")}
                </h3>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <Image
                    src="/uzbekistan/traditions.jpg"
                    alt={t("traditionsTitle")}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t("traditionsDescription1")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("traditionsDescription2")}
                </p>
              </div>

              {/* Bazaars */}
              <div className="bg-card rounded-xl p-2 sm:p-4 border border-border">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-foreground">
                  {t("bazaarsTitle")}
                </h3>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <Image
                    src="/uzbekistan/bazaar.jpg"
                    alt={t("bazaarsTitle")}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t("bazaarsDescription1")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("bazaarsDescription2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Tourism */}
      <section className="py-8 sm:py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 text-foreground">
              {t("activeTourismTitle")}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {/* Trekking */}
              <div className="bg-card rounded-xl overflow-hidden border border-border">
                <div className="aspect-video bg-muted">
                  <Image
                    src="/uzbekistan/trekking.jpg"
                    alt={t("trekkingTitle")}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-3 sm:p-6">
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {t("trekkingTitle")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("trekkingDescription")}
                  </p>
                </div>
              </div>

              {/* Horse Riding */}
              <div className="bg-card rounded-xl overflow-hidden border border-border">
                <div className="aspect-video bg-muted">
                  <Image
                    src="/uzbekistan/horse-riding.jpg"
                    alt={t("horseRidingTitle")}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-3 sm:p-6">
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {t("horseRidingTitle")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("horseRidingDescription")}
                  </p>
                </div>
              </div>

              {/* Camel Safari */}
              <div className="bg-card rounded-xl overflow-hidden border border-border">
                <div className="aspect-video bg-muted">
                  <Image
                    src="/uzbekistan/camel-safari.jpg"
                    alt={t("camelSafariTitle")}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-3 sm:p-6">
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {t("camelSafariTitle")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("camelSafariDescription")}
                  </p>
                </div>
              </div>

              {/* Skiing */}
              <div className="bg-card rounded-xl overflow-hidden border border-border">
                <div className="aspect-video bg-muted">
                  <Image
                    src="/uzbekistan/skiing.jpg"
                    alt={t("skiingTitle")}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-3 sm:p-6">
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {t("skiingTitle")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("skiingDescription")}
                  </p>
                </div>
              </div>

              {/* Rafting */}
              <div className="bg-card rounded-xl overflow-hidden border border-border">
                <div className="aspect-video bg-muted">
                  <Image
                    src="/uzbekistan/rafting.jpg"
                    alt={t("raftingTitle")}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-3 sm:p-6">
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {t("raftingTitle")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("raftingDescription")}
                  </p>
                </div>
              </div>

              {/* Golf */}
              <div className="bg-card rounded-xl overflow-hidden border border-border">
                <div className="aspect-video bg-muted">
                  <Image
                    src="/uzbekistan/golf.jpg"
                    alt={t("golfTitle")}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-3 sm:p-6">
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {t("golfTitle")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("golfDescription")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels and Transport */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Hotels */}
              <div className="bg-card rounded-xl p-4 border border-border">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                  {t("hotelsTitle")}
                </h3>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-6">
                  <Image
                    src="/uzbekistan/hotels.jpg"
                    alt={t("hotelsTitle")}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t("hotelsDescription1")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("hotelsDescription2")}
                </p>
              </div>

              {/* Transport */}
              <div className="bg-card rounded-xl p-2 sm:p-4 border border-border">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-foreground">
                  {t("transportTitle")}
                </h3>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <Image
                    src="/uzbekistan/transport.jpg"
                    alt={t("transportTitle")}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t("transportDescription1")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("transportDescription2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Government Support */}
      <section className="py-8 sm:py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-12 text-foreground">
              {t("governmentTitle")}
            </h2>

            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                {t("governmentDescription1")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("governmentDescription2")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("governmentDescription3")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("governmentDescription4")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
