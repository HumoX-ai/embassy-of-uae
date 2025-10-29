"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useTranslation } from "@/i18n/client";
import { Language } from "@/i18n/settings";

type FooterProps = {
  lng: Language;
};

export default function Footer({ lng }: FooterProps) {
  const { t } = useTranslation(lng, "footer");

  return (
    <footer className="bg-[url('/bg.svg')] bg-contain bg-center bg-muted/30 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Embassy Info */}
          <div className="flex flex-col">
            <Image
              src="/emblem_of_uzbekistan.svg"
              alt="Emblem of Uzbekistan"
              width={64}
              height={64}
              className="h-16 w-16 mb-4 drop-shadow-md"
            />
            <h3 className="text-xl font-bold leading-tight">
              {t("titleMain")}
              <br />
              <span className="text-xl font-bold leading-tight">
                {t("titleSub")}
              </span>
            </h3>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t("contactInfo")}</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary shrink-0" />
                <span className="text-sm">{t("telephone")}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary shrink-0" />
                <Link
                  href={`mailto:${t("email")}`}
                  className="text-sm hover:underline text-primary"
                >
                  {t("email")}
                </Link>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">{t("address")}</span>
              </div>
            </div>
          </div>

          {/* Working Hours & Help */}
          <div>
            <h4 className="font-semibold text-lg mb-4">
              {t("workingHoursTitle")}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-primary shrink-0" />
                <span className="text-sm">{t("workingHours")}</span>
              </div>
              <p className="text-sm text-muted-foreground">{t("dayOff")}</p>
              <div className="mt-6 pt-4 border-t">
                <h5 className="font-medium mb-2">{t("helpLineTitle")}</h5>
                <p className="text-sm">{t("helpLine")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
