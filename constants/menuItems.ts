export type SubItem = {
  title: string;
  href: string;
  nestedItems?: { title: string; href: string }[];
};

export type MenuItem = {
  title: string;
  href?: string;
  subItems?: SubItem[];
  width?: string;
};

export const getMenuItems = (
  lng: string,
  t: (key: string) => string
): MenuItem[] => [
  {
    title: t("home"),
    href: `/${lng}`,
  },
  {
    title: t("uzbekistan"),
    subItems: [
      { title: t("generalInfo"), href: `/${lng}/uzbekistan` },
      { title: t("parliament"), href: "/page/2539" },
      { title: t("stateSymbols"), href: "/page/2540" },
      { title: t("nationalHolidays"), href: "/page/2542" },
      { title: t("uzbekCulture"), href: "/page/2543" },
      { title: t("tourismPotential"), href: "/page/2544" },
    ],
    width: "300px",
  },

  {
    title: t("president"),
    subItems: [
      { title: t("presidentTitle"), href: `/${lng}/president` },
      { title: t("news"), href: "https://president.uz/en" },
    ],
    width: "280px",
  },
  {
    title: t("relations"),
    subItems: [
      { title: t("economicCooperation"), href: "/page/357" },
      { title: t("politicalRelations"), href: "/page/358" },
      { title: t("culturalHumanitarianCooperation"), href: "/page/359" },
    ],
    width: "280px",
  },
  {
    title: t("investment"),
    subItems: [
      {
        title: t("investInUzbekistan"),
        href: "https://invest.gov.uz/uzipa/?lang=en",
      },
      {
        title: t("investmentPotential"),
        href: "https://invest.gov.uz/investor-taxonomy/potential/",
      },
      { title: t("investmentCooperation"), href: "/page/2536" },
    ],
    width: "320px",
  },
  {
    title: t("tourism"),
    subItems: [
      {
        title: t("welcomeToUzbekistan"),
        href: "https://uzbekistan.travel/en/",
      },
    ],
    width: "280px",
  },
  {
    title: t("consularServices"),
    subItems: [
      {
        title: t("infoForForeigners"),
        href: `/${lng}/info-for-foreigners`,
      },
      {
        title: t("returnCertificateProcedure"),
        href: `/${lng}/return-certificate-procedure`,
      },
      {
        title: t("temporaryConsularRegistration"),
        href: `/${lng}/temporary-consular-registration`,
      },
      {
        title: t("permanentConsularRegistration"),
        href: `/${lng}/permanent-consular-registration`,
      },
      {
        title: t("biometricPassportIssuance"),
        href: `/${lng}/biometric-passport-issuance`,
      },
      { title: t("documentRequestProcedure"), href: "/page/369" },
      {
        title: t("birthCertificatePaternity"),
        href: "/page/370",
      },
      { title: t("eVisaPortal"), href: "https://e-visa.gov.uz/main" },
    ],
    width: "350px",
  },

  {
    title: t("embassyMenu"),
    subItems: [
      { title: t("ambassador"), href: "/page/360" },
      { title: t("ambassadorMessage"), href: "/page/361" },
      {
        title: t("embassyTeam"),
        href: "/page/363",
        nestedItems: [
          {
            title: t("politicalCulturalDepartment"),
            href: "/page/political-cultural",
          },
          { title: t("tradeEconomicDepartment"), href: "/page/trade-economic" },
          { title: t("consularLegalDepartment"), href: "/page/consular-legal" },
        ],
      },
    ],
    width: "280px",
  },

  {
    title: t("newsAndAnnouncements"),
    href: "/news/index",
  },
];
