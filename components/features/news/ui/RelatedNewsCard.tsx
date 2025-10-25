import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Language } from "@/i18n/settings";
import { NewsItem } from "@/types/news";

interface RelatedNewsCardProps {
  news: NewsItem;
  lng: Language;
}

export default function RelatedNewsCard({ news, lng }: RelatedNewsCardProps) {
  const formattedDate = new Date(news.date).toLocaleDateString(
    lng === "uz" ? "uz-UZ" : "en-US",
    {
      month: "short",
      day: "numeric",
    }
  );

  return (
    <Link
      href={`/${lng}/news/${news.id}`}
      className="group block overflow-hidden rounded-lg bg-card border border-border hover:shadow-md transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Calendar className="w-3 h-3" />
          <span>{formattedDate}</span>
        </div>

        <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors leading-tight">
          {news.title}
        </h3>
      </div>
    </Link>
  );
}
