"use client";

import { Menu, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getMenuItems } from "@/constants/menuItems";
import { useTranslation } from "@/i18n/client";
import { Language } from "@/i18n/settings";
import { cn } from "@/lib/utils";

import LanguageSwitcher from "./LanguageSwitcher";
import MobileNavAccordion from "./MobileNavAccordion";

type HeaderProps = {
  lng: Language;
};

export default function Header({ lng }: HeaderProps) {
  const { t } = useTranslation(lng, "header");
  const [isOpen, setIsOpen] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(false);

  useEffect(() => {
    if (isGrayscale) {
      document.body.classList.add("grayscale");
    } else {
      document.body.classList.remove("grayscale");
    }
    return () => {
      document.body.classList.remove("grayscale");
    };
  }, [isGrayscale]);

  const menuItems = getMenuItems(lng, t);

  const languages = [
    { code: "en", label: "English" },
    { code: "uz", label: "Oʻzbekcha" },
    { code: "ru", label: "Русский" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      {/* Top bar with logo and language selector */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and title */}
        <Link href={`/${lng}`} className="flex items-center gap-3">
          <Image
            src="/emblem_of_uzbekistan.svg"
            alt="Emblem of Uzbekistan"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <div className="hidden xl:block">
            <h1 className="text-sm xl:text-base 2xl:text-lg font-semibold leading-tight">
              {t("embassyTitle")}
            </h1>
            <p className="text-xs xl:text-sm 2xl:text-base text-muted-foreground">
              {t("embassySubtitle")}
            </p>
          </div>
        </Link>

        {/* Desktop language selector and mobile menu */}
        <div className="flex items-center gap-4">
          <div className="hidden xl:flex xl:items-center xl:gap-2">
            <LanguageSwitcher lng={lng} />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setIsGrayscale(!isGrayscale)}
                    className="p-2 hover:bg-accent rounded-md"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("colorblindMode")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="xl:hidden p-2 hover:bg-accent rounded-md">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] flex flex-col h-full"
            >
              <SheetHeader>
                <SheetTitle>
                  <Link
                    href={`/${lng}`}
                    className="flex items-center gap-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <Image
                      src="/emblem_of_uzbekistan.svg"
                      alt="Emblem of Uzbekistan"
                      width={32}
                      height={32}
                      className="h-8 w-8"
                    />
                    <div>
                      <h2 className="text-sm font-semibold">
                        {t("embassyShortTitle")}
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        {t("embassyShortSubtitle")}
                      </p>
                    </div>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto">
                <MobileNavAccordion
                  onLinkClick={() => setIsOpen(false)}
                  menuItems={menuItems}
                />
              </div>
              <SheetFooter>
                <div className="border-t border-border pt-3 flex items-center justify-around">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        const segments = window.location.pathname.split("/");
                        if (segments.length >= 2) {
                          segments[1] = lang.code;
                        } else {
                          segments[1] = lang.code;
                        }
                        const target = segments.join("/");
                        window.location.href = target;
                        setIsOpen(false);
                      }}
                      className={cn(
                        "text-base hover:underline",
                        lang.code === lng && "text-primary font-semibold"
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Navigation menu - Desktop only */}
      <div className="border-t hidden xl:block">
        <div className="container mx-auto px-4">
          <NavigationMenu className="mx-auto" viewport={false}>
            <NavigationMenuList>
              {menuItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  {item.href ? (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "cursor-pointer"
                        )}
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent
                        className={
                          index === menuItems.length - 1
                            ? "right-0 left-auto"
                            : ""
                        }
                      >
                        <ul
                          className="grid gap-2"
                          style={{ width: item.width || "280px" }}
                        >
                          {item.subItems?.map((sub, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={sub.href}
                                className="block text-sm p-2 rounded-md hover:bg-accent"
                              >
                                {sub.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
