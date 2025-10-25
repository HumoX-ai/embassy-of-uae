"use client";

import { Share2 } from "lucide-react";

import { Language } from "@/i18n/settings";

interface ShareButtonProps {
  title: string;
  excerpt: string;
  lng: Language;
}

export default function ShareButton({ title, excerpt, lng }: ShareButtonProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <button
      className="ml-auto items-center gap-2 hover:text-primary transition-colors hidden md:flex"
      onClick={handleShare}
    >
      <Share2 className="w-4 h-4" />
      <span className="hidden sm:inline">
        {lng === "uz" ? "Ulashish" : "Share"}
      </span>
    </button>
  );
}
