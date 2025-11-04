import { MapPin, Users, Calendar, Globe } from "lucide-react";
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

  // Validate that lng is a supported language
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
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Uzbekistan.svg/1200px-Flag_of_Uzbekistan.svg.png",
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
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Uzbekistan.svg/1200px-Flag_of_Uzbekistan.svg.png",
      ],
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

  const cities = [
    {
      name: t("tashkent"),
      description: t("tashkentDesc"),
      image: "/uzbekistan/tashkent.jpg",
    },
    {
      name: t("samarkand"),
      description: t("samarkandDesc"),
      image: "/uzbekistan/samarkand.jpg",
    },
    {
      name: t("bukhara"),
      description: t("bukharaDesc"),
      image: "/uzbekistan/bukhara.jpg",
    },
    {
      name: t("khiva"),
      description: t("khivaDesc"),
      image: "/uzbekistan/khiva.jpg",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/uzbekistan/uzbekistan.jpg')] bg-cover bg-top"></div>
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
                    unoptimized
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
    </div>
  );
}
