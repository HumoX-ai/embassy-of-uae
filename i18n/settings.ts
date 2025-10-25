export const fallbackLng = "uz";
export const languages = ["uz", "en"] as const;
export const defaultNS = "common";

export type Language = (typeof languages)[number];

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
