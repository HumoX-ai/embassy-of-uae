import {
  MapPin,
  Users,
  Calendar,
  Globe,
  Mountain,
  Landmark,
  GraduationCap,
  TrendingUp,
  Coins,
  Factory,
  Sparkles,
  Heart,
} from "lucide-react";
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
    en: "About Uzbekistan | General Information",
    uz: "O'zbekiston haqida | Umumiy ma'lumot",
  };

  const descriptions = {
    en: "Discover Uzbekistan - a country rich in history, culture, and natural beauty. Learn about the Heart of Central Asia.",
    uz: "O'zbekistonni kashf eting - tarix, madaniyat va tabiiy go'zallik bilan boy mamlakat. Markaziy Osiyoning yuragi haqida bilib oling.",
  };

  return {
    title: titles[validLng] || titles.en,
    description: descriptions[validLng] || descriptions.en,
    keywords:
      validLng === "uz"
        ? "O'zbekiston, Markaziy Osiyo, tarix, madaniyat, Buyuk Ipak Yo'li, Samarqand, Buxoro"
        : "Uzbekistan, Central Asia, history, culture, Silk Road, Samarkand, Bukhara",
    openGraph: {
      title: titles[validLng] || titles.en,
      description: descriptions[validLng] || descriptions.en,
      type: "website",
      locale: validLng === "uz" ? "uz_UZ" : "en_US",
      images: [
        {
          url: "/uzbekistan/uzbekistan.png",
          width: 1200,
          height: 630,
          alt:
            validLng === "uz"
              ? "O'zbekiston - Markaziy Osiyoning yuragi"
              : "Uzbekistan - Heart of Central Asia",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[validLng] || titles.en,
      description: descriptions[validLng] || descriptions.en,
      images: ["/uzbekistan/uzbekistan.png"],
    },
  };
}

export default async function UzbekistanPage({ params }: PageProps) {
  const { lng } = await params;
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;
  const { t } = await useTranslation(validLng, "uzbekistan");

  const stats = [
    {
      icon: MapPin,
      label: t("area"),
      value: t("areaValue"),
    },
    {
      icon: Users,
      label: t("population"),
      value: t("populationValue"),
    },
    {
      icon: Globe,
      label: t("capital"),
      value: t("capitalValue"),
    },
    {
      icon: Calendar,
      label: t("independence"),
      value: t("independenceValue"),
    },
  ];

  const features = [
    {
      icon: Landmark,
      title: t("richHistory"),
      description: t("richHistoryDesc"),
    },
    {
      icon: Mountain,
      title: t("naturalBeauty"),
      description: t("naturalBeautyDesc"),
    },
    {
      icon: Heart,
      title: t("hospitalityTitle"),
      description: t("hospitalityDesc"),
    },
    {
      icon: Sparkles,
      title: t("silkRoad"),
      description: t("silkRoadDesc"),
    },
    {
      icon: GraduationCap,
      title: t("education"),
      description: t("educationDesc"),
    },
    {
      icon: TrendingUp,
      title: t("economy"),
      description: t("economyDesc"),
    },
  ];

  const cities = [
    {
      name: t("tashkent"),
      description: t("tashkentDesc"),
      image: "/uzbekistan/tashkent.jpg",
    },
    {
      name: t("samarkand"),
      description: t("samarkandDesc"),
      image: "/uzbekistan/samarkand.webp",
    },
    {
      name: t("bukhara"),
      description: t("bukharaDesc"),
      image: "/uzbekistan/bukhara.png",
    },
    {
      name: t("khiva"),
      description: t("khivaDesc"),
      image: "/uzbekistan/khiva.jpg",
    },
  ];

  const economicSectors = [
    { icon: Factory, name: t("industry"), value: "23%" },
    { icon: Coins, name: t("agriculture"), value: "27%" },
    { icon: TrendingUp, name: t("services"), value: "50%" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/uzbekistan/uzbekistan.png')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-black/40 md:bg-black/50"></div>

        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
            {t("title")}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 max-w-3xl mx-auto opacity-90 px-2">
            {t("subtitle")}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto mt-8 md:mt-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card/10 backdrop-blur-md rounded-xl p-4 md:p-6 border border-border/20 hover:bg-card/20 transition-all duration-300 hover:scale-105"
              >
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3" />
                <div className="text-xl md:text-2xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-foreground">
              {t("introTitle")}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
              <p className="text-lg md:text-xl">{t("introParagraph1")}</p>
              <p className="text-lg md:text-xl">{t("introParagraph2")}</p>
              <p className="text-lg md:text-xl">{t("introParagraph3")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-foreground">
            {t("featuresTitle")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-border"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                <div className="inline-flex p-4 rounded-xl bg-primary text-primary-foreground mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-card-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historic Cities */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            {t("citiesTitle")}
          </h2>
          <p className="text-center text-muted-foreground mb-12 md:mb-16 max-w-2xl mx-auto text-sm md:text-base">
            {t("citiesSubtitle")}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {cities.map((city, index) => (
              <div
                key={index}
                className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-card-foreground group-hover:text-primary transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {city.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Economy Section */}
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6">
            {t("economyTitle")}
          </h2>
          <p className="text-center opacity-90 mb-12 md:mb-16 max-w-3xl mx-auto text-base md:text-lg">
            {t("economySubtitle")}
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {economicSectors.map((sector, index) => (
              <div
                key={index}
                className="bg-card/10 backdrop-blur-md rounded-2xl p-8 border border-border/20 text-center hover:bg-card/20 transition-all duration-300 hover:scale-105"
              >
                <sector.icon className="w-16 h-16 mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">{sector.value}</div>
                <div className="text-lg opacity-90">{sector.name}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-card/10 backdrop-blur-md rounded-2xl p-8 border border-border/20">
              <h3 className="text-2xl font-bold mb-4">
                {t("economicFactsTitle")}
              </h3>
              <ul className="space-y-3 opacity-90">
                <li className="flex items-start">
                  <span className="mr-3 mt-1">•</span>
                  <span>{t("economicFact1")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">•</span>
                  <span>{t("economicFact2")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">•</span>
                  <span>{t("economicFact3")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">•</span>
                  <span>{t("economicFact4")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-foreground">
            {t("cultureTitle")}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: t("cuisine"),
                description: t("cuisineDesc"),
                emoji: "🍲",
              },
              {
                title: t("crafts"),
                description: t("craftsDesc"),
                emoji: "🎨",
              },
              {
                title: t("music"),
                description: t("musicDesc"),
                emoji: "🎵",
              },
              {
                title: t("festivals"),
                description: t("festivalsDesc"),
                emoji: "🎉",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border"
              >
                <div className="text-5xl mb-4 text-center">{item.emoji}</div>
                <h3 className="text-xl font-bold mb-3 text-center text-card-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-center text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-foreground">
            {t("funFactsTitle")}
          </h2>
          <p className="text-center text-muted-foreground mb-12 md:mb-16 max-w-2xl mx-auto text-sm md:text-base">
            {t("funFactsSubtitle")}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { fact: t("funFact1"), icon: "🏛️" },
              { fact: t("funFact2"), icon: "🌍" },
              { fact: t("funFact3"), icon: "🏔️" },
              { fact: t("funFact4"), icon: "🍈" },
              { fact: t("funFact5"), icon: "📚" },
              { fact: t("funFact6"), icon: "☀️" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-muted/50 rounded-xl p-6 border-2 border-border hover:border-primary transition-all duration-300"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <p className="text-muted-foreground leading-relaxed">
                  {item.fact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
