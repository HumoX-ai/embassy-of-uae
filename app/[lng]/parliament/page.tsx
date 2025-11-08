import { Metadata } from "next";
import Image from "next/image";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

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
    en: "Parliament — Uzbekistan",
    uz: "Oliy Majlis — O'zbekiston",
  };

  const descriptions = {
    en: "Official information about the structure, powers and legislative initiative of the Oliy Majlis (Parliament) of Uzbekistan.",
    uz: "O'zbekiston Respublikasi Oliy Majlisi (Parlament) tuzilishi, vakolatlari va qonunchilik tashabbusi haqida rasmiy ma'lumot.",
  };

  return {
    title: titles[validLng] || titles.en,
    description: descriptions[validLng] || descriptions.en,
    keywords:
      validLng === "uz"
        ? "O'zbekiston, Parlament, Oliy Majlis, qonunchilik, vakolatlar, Senat, Qonunchilik palatasi"
        : "Uzbekistan, Parliament, Oliy Majlis, legislation, powers, Senate, Legislative Chamber",
    openGraph: {
      title: titles[validLng] || titles.en,
      description: descriptions[validLng] || descriptions.en,
      type: "website",
      locale: validLng === "uz" ? "uz_UZ" : "en_US",
      images: [
        {
          url: "/oliy_majlis.jpg",
          width: 1200,
          height: 630,
          alt:
            validLng === "uz"
              ? "O'zbekiston Oliy Majlisi"
              : "Parliament of Uzbekistan",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[validLng] || titles.en,
      description: descriptions[validLng] || descriptions.en,
      images: ["/oliy_majlis.jpg"],
    },
  };
}

export default async function ParliamentPage({ params }: PageProps) {
  const { lng } = await params;
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;
  const { t } = await useTranslation(validLng, "parliament");

  const sections = [
    { id: "overview", title: t("title") },
    { id: "structure", title: t("structureTitle") },
    { id: "joint", title: t("jointPowersTitle") },
    { id: "chamber", title: t("chamberPowersTitle") },
    { id: "senate", title: t("senatePowersTitle") },
    { id: "initiative", title: t("initiativeTitle") },
  ];

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-4 gap-8 items-start">
        <div className="md:col-span-3">
          {/* Hero */}
          <section className="rounded-2xl overflow-hidden shadow-lg mb-8 border border-border">
            <div className="relative h-56 md:h-72 bg-muted">
              <Image
                src="/oliy_majlis.jpg"
                alt={t("title")}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/40"></div>
              <div className="relative z-10 p-6 md:p-10 text-white">
                <h1 className="text-2xl md:text-4xl font-bold mb-2">
                  {t("title")}
                </h1>
                <p className="text-sm md:text-base max-w-2xl opacity-90">
                  {t("subtitle")}
                </p>
              </div>
            </div>
          </section>

          {/* Content sections */}
          <article className="prose prose-lg max-w-none text-foreground">
            <section id="overview" className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">{t("title")}</h2>
              <p className="leading-relaxed">{t("intro")}</p>
            </section>

            <section id="structure" className="mb-8">
              <h3 className="text-xl font-semibold mb-3">
                {t("structureTitle")}
              </h3>
              <p className="leading-relaxed">{t("structureParagraph1")}</p>
            </section>

            <section id="joint" className="mb-8">
              <h3 className="text-xl font-semibold mb-4">
                {t("jointPowersTitle")}
              </h3>
              <Accordion type="single" collapsible defaultValue="p1">
                <AccordionItem value="p1">
                  <AccordionTrigger>{t("jointPowersTitle")}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {t("jointPowers")
                        .split("\n")
                        .map((it, idx) => (
                          <li key={idx}>{it}</li>
                        ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section id="chamber" className="mb-8">
              <h3 className="text-xl font-semibold mb-3">
                {t("chamberPowersTitle")}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {t("chamberPowers")
                  .split("\n")
                  .map((it, idx) => (
                    <div key={idx} className="p-4 border rounded-lg bg-card/30">
                      <div className="text-sm leading-relaxed">{it}</div>
                    </div>
                  ))}
              </div>
            </section>

            <section id="senate" className="mb-8">
              <h3 className="text-xl font-semibold mb-3">
                {t("senatePowersTitle")}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {t("senatePowers")
                  .split("\n")
                  .map((it, idx) => (
                    <div key={idx} className="p-4 border rounded-lg bg-card/30">
                      <div className="text-sm leading-relaxed">{it}</div>
                    </div>
                  ))}
              </div>
            </section>

            <section id="initiative" className="mb-8">
              <h3 className="text-xl font-semibold mb-3">
                {t("initiativeTitle")}
              </h3>
              <p className="leading-relaxed">{t("initiativeText")}</p>
            </section>
          </article>
        </div>

        {/* Side navigation */}
        <aside className="hidden md:block">
          <nav className="sticky top-24 space-y-4">
            <div className="p-4 border rounded-lg bg-muted/40">
              <h4 className="font-semibold mb-3">{t("title")}</h4>
              <ul className="space-y-2 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="hover:underline">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </aside>
      </div>
    </div>
  );
}
