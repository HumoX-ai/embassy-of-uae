import { Metadata } from "next";

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
    en: "National Holidays of Uzbekistan",
    uz: "O'zbekistonning milliy bayramlari",
  };

  const descriptions = {
    en: "Learn about the national holidays and celebrations of Uzbekistan",
    uz: "O'zbekistonning milliy bayramlari va tantanalari haqida ma'lumot oling",
  };

  return {
    title: titles[validLng] || titles.en,
    description: descriptions[validLng] || descriptions.en,
    keywords:
      validLng === "uz"
        ? "O'zbekiston, milliy bayramlar, Navro'z, Mustaqillik kuni, bayramlar"
        : "Uzbekistan, national holidays, Navruz, Independence Day, celebrations",
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

export default async function NationalHolidaysPage({ params }: PageProps) {
  const { lng } = await params;
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;
  const { t } = await useTranslation(validLng, "nationalHolidays");

  const holidays = [
    {
      date: t("defendersDayDate"),
      title: t("defendersDayTitle"),
      description: t("defendersDayDescription"),
    },
    {
      date: t("womensDayDate"),
      title: t("womensDayTitle"),
      description: t("womensDayDescription"),
    },
    {
      date: t("navruzDate"),
      title: t("navruzTitle"),
      description: t("navruzDescription"),
    },
    {
      date: t("memoryDayDate"),
      title: t("memoryDayTitle"),
      description: t("memoryDayDescription"),
    },
    {
      date: t("independenceDayDate"),
      title: t("independenceDayTitle"),
      description: t("independenceDayDescription"),
    },
    {
      date: t("teachersDayDate"),
      title: t("teachersDayTitle"),
      description: t("teachersDayDescription"),
    },
    {
      date: t("constitutionDayDate"),
      title: t("constitutionDayTitle"),
      description: t("constitutionDayDescription"),
    },
    {
      date: t("ramazanHayitDate"),
      title: t("ramazanHayitTitle"),
      description: t("ramazanHayitDescription"),
    },
    {
      date: t("qurbonHayitDate"),
      title: t("qurbonHayitTitle"),
      description: t("qurbonHayitDescription"),
    },
  ];

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
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t("introText")}
            </p>
          </div>
        </div>
      </section>

      {/* Holidays List */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            {holidays.map((holiday, index) => (
              <div
                key={index}
                className="group bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-border overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                      {holiday.title}
                    </h3>
                    <span className="text-sm md:text-base font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full w-fit">
                      {holiday.date}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-line">
                    {holiday.description}
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
