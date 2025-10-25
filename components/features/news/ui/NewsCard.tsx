import { Calendar, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Language } from "@/i18n/settings";
import { NewsItem } from "@/types/news";

interface NewsCardProps {
  news: NewsItem;
  lng: Language;
  featured?: boolean;
}

export default function NewsCard({
  news,
  lng,
  featured = false,
}: NewsCardProps) {
  const formattedDate = new Date(news.date).toLocaleDateString(
    lng === "uz" ? "uz-UZ" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  if (featured) {
    return (
      <Link
        href={`/${lng}/news/${news.id}`}
        className="group relative overflow-hidden rounded-xl bg-card hover:shadow-xl transition-all duration-300"
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-64 md:h-full overflow-hidden">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                {news.category}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="py-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </span>
                {news.readTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {news.readTime}
                  </span>
                )}
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                {news.title}
              </h3>

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                {news.excerpt}
              </p>
            </div>

            <div className="flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all">
              <span>{lng === "uz" ? "Batafsil" : "Read more"}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/${lng}/news/${news.id}`}
      className="group block overflow-hidden rounded-lg bg-card border border-border hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden hidden sm:block">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-block px-2.5 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
            {news.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </span>
          {news.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {news.readTime}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {news.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {news.excerpt}
        </p>

        <div className="flex items-center text-primary text-sm font-semibold group-hover:gap-2 gap-1 transition-all">
          <span>{lng === "uz" ? "Batafsil" : "Read more"}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
