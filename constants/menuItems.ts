export type MenuItem = {
  title: string;
  href?: string;
  subItems?: { title: string; href: string }[];
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
    title: t("president"),
    subItems: [
      { title: t("presidentTitle"), href: `/${lng}/president` },
      { title: t("news"), href: "https://president.uz/en" },
    ],
    width: "280px",
  },
  {
    title: t("uzbekistan"),
    subItems: [
      { title: t("generalInfo"), href: "/page/2537" },
      { title: t("parliament"), href: "/page/2539" },
      { title: t("stateSymbols"), href: "/page/2540" },
      { title: t("nationalHolidays"), href: "/page/2542" },
      { title: t("uzbekCulture"), href: "/page/2543" },
      { title: t("tourismPotential"), href: "/page/2544" },
    ],
    width: "300px",
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
    title: t("relations"),
    subItems: [
      { title: t("economicCooperation"), href: "/page/357" },
      { title: t("politicalRelations"), href: "/page/358" },
      { title: t("culturalHumanitarianCooperation"), href: "/page/359" },
    ],
    width: "280px",
  },
  {
    title: t("embassyMenu"),
    subItems: [
      { title: t("ambassador"), href: "/page/360" },
      { title: t("ambassadorMessage"), href: "/page/361" },
      { title: t("aboutEmbassy"), href: "/page/362" },
      { title: t("embassyTeam"), href: "/page/363" },
    ],
    width: "280px",
  },
  {
    title: t("consularServices"),
    subItems: [
      {
        title: t("infoForForeigners"),
        href: "/page/2549",
      },
      {
        title: t("returnCertificateProcedure"),
        href: "/page/2550",
      },
      { title: t("temporaryConsularRegistration"), href: "/page/365" },
      { title: t("permanentConsularRegistration"), href: "/page/366" },
      { title: t("biometricPassportIssuance"), href: "/page/368" },
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
    title: t("newsAndAnnouncements"),
    href: "/news/index",
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
];
