import { Organization, WithContext } from "schema-dts";

export function getOrganizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Embassy of the Republic of Uzbekistan in United Arab Emirates",
    alternateName:
      "O'zbekiston Respublikasining Birlashgan Arab Amirliklaridagi Elchixonasi",
    url: "https://uzembassy.ae",
    logo: "https://uzembassy.ae/emblem_of_uzbekistan.ico",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["English", "Uzbek"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "AE",
      addressLocality: "Abu Dhabi",
    },
    sameAs: [
      // Ijtimoiy tarmoq havolalarini bu yerga qo'shing
    ],
  };
}

export function getWebsiteSchema(): WithContext<any> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Embassy of Uzbekistan in UAE",
    url: "https://uzembassy.ae",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://uzembassy.ae/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}
