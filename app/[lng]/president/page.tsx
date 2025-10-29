import { Metadata } from "next";
import Image from "next/image";

import { Language, languages, fallbackLng } from "@/i18n/settings";

type PageProps = {
  params: Promise<{ lng: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lng } = await params;

  // Validate that lng is a supported language
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;

  const titles = {
    en: "President Shavkat Mirziyoyev | Embassy of Uzbekistan in UAE",
    uz: "Prezident Shavkat Mirziyoyev | O'zbekiston Elchixonasi BAA",
  };

  const descriptions = {
    en: "Biography and official information about Shavkat Mirziyoyev, President of the Republic of Uzbekistan. Learn about his career, achievements, and leadership.",
    uz: "O'zbekiston Respublikasi Prezidenti Shavkat Mirziyoyevning tarjimai holi va rasmiy ma'lumotlari. Uning faoliyati, yutuqlari va rahbarligi haqida bilib oling.",
  };

  return {
    title: titles[validLng] || titles.en,
    description: descriptions[validLng] || descriptions.en,
    keywords:
      validLng === "uz"
        ? "Shavkat Mirziyoyev, O'zbekiston prezidenti, tarjimai hol, rahbar, diplomatik"
        : "Shavkat Mirziyoyev, Uzbekistan president, biography, leader, diplomatic",
    openGraph: {
      title: titles[validLng] || titles.en,
      description: descriptions[validLng] || descriptions.en,
      type: "profile",
      locale: validLng === "uz" ? "uz_UZ" : "en_US",
      images: [
        {
          url: "https://upload.wikimedia.org/wikipedia/commons/5/54/Shavkat_Mirziyoyev_official_portrait.jpg",
          width: 400,
          height: 600,
          alt: "President Shavkat Mirziyoyev",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[validLng] || titles.en,
      description: descriptions[validLng] || descriptions.en,
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/5/54/Shavkat_Mirziyoyev_official_portrait.jpg",
      ],
    },
  };
}

export default async function PresidentPage({ params }: PageProps) {
  const { lng } = await params;
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;

  const presidentContent = {
    en: {
      title: "President of the Republic of Uzbekistan",
      name: "Shavkat Mirziyoyev",
      biography: `
        <p>Shavkat Mirziyoyev was born on July 24, 1957 in Zaamin District of Jizzakh Region to a family of doctors. He is an Uzbek by nationality, with higher education. In 1981 he graduated from the Tashkent Institute of Engineers of Irrigation and Mechanization of Agriculture and earned a degree in mechanical engineering. He holds a Ph.D. in Technical Sciences, Associate Professor.</p>

        <p>Shavkat Mirziyoyev started his career in 1981 at the Tashkent Institute of Engineers of Irrigation and Mechanization of Agriculture, where he served as a junior research fellow, senior lecturer, associate professor, and the vice rector for academic affairs.</p>

        <p>In 1990 he was elected deputy of the Supreme Council of the republic. He served as Chairman of the Credentials Committee.</p>

        <p>In 1992 Shavkat Mirziyoyev was appointed khokim (governor) of Mirzo Ulugbek District of the city of Tashkent. In 1996-2001 he served as khokim of Jizzakh Region, in 2001-2003 - khokim of Samarkand Region, and made a great contribution to the socio-economic development of the aforementioned district and the regions.</p>

        <p>While working in the executive branch and at the same time as deputy of the Oliy Majlis of the Republic of Uzbekistan in 1995-2003, he has actively and fruitfully participated in the elaboration and adoption of important legislative acts on political and socio-economic development of the country and implementation of democratic reforms.</p>

        <p>Shavkat Mirziyoyev was approved as the Prime Minister of the Republic of Uzbekistan in 2003, and three times (in 2005, 2010 and 2015) was approved again in his post by both Chambers of the Oliy Majlis.</p>

        <p>From the early years of our Motherland's Independence Shavkat Mirziyoyev earned a high trust of the first President of Uzbekistan Islam Karimov, by selflessly working as his colleague and close associate.</p>

        <p>As head of the Government, he has shown tremendous abilities and outstanding leadership in implementation of wide-ranging socio-economic reforms, modernization and improvement of the country, realization of major and unique projects, development and protection of private property, radical increase in the share of small business and private enterprise in the economy and consolidation of their legal security.</p>

        <p>In his activities Shavkat Mirziyoyev attached a special significance to economic development on the industrial basis, improvement of the country's exporting potential, cardinal transformation of the agricultural sector, especially the extensive advancement of farming enterprise, profound processing of agricultural products, provision for food security of the nation and the guaranteed supply of goods to the population at reasonable prices.</p>

        <p>In order to drastically uplift the living and working conditions of people, Shavkat Mirziyoyev took effective measures for large-scale construction and improvement works in all regions of the country, to improve the quality of public services, integrated development of cities and districts, including the remote rural areas.</p>

        <p>In his activities, along with socio-economic dimension, a significant emphasis is placed – as a priority focus – on the progress of education, science and healthcare in accordance with modern requirements, creation of conditions necessary for the formation of healthy and comprehensively advanced younger generation, protection of motherhood and childhood.</p>

        <p>He has paid much attention to further enhancement of the credibility of the unique institution of self-government – makhalla, other social organizations, consistent consolidation of their role in the community through broad involvement in the process of democratic reforms, as well as the preservation and enrichment of national spiritual values.</p>

        <p>Along with this, in addressing the economic and social issues Shavkat Mirziyoyev directly supervised the efforts to build up comprehensive mutually beneficial cooperation with other countries, international organizations and financial institutions, as well as important agreements that serve the national interests and economic development of the country.</p>

        <p>On September 8, 2016, on the basis of a joint resolution of the Legislative Chamber (Lower House) and Senate of the Oliy Majlis (parliament) of Uzbekistan adopted at the joint session, Prime Minister Shavkat Mirziyoyev was temporarily assigned the duties and powers of the President of the Republic of Uzbekistan.</p>

        <p>On October 19, 2016 the Movement of Entrepreneurs and Businessmen — Liberal- Democratic Party of Uzbekistan (UzLiDeP) during its Eighths Convention in Tashkent nominated the member of Political Council of the Party Shavkat Mirziyoyev as its candidate for the presidential elections.</p>

        <p>Shavkat Mirziyoyev was elected President of the Republic of Uzbekistan with 88,61 percent of the vote based on the results of the presidential elections that took place on December 4, 2016. Shavkat Mirziyoyev officially assumed the post of the President of the Republic of Uzbekistan on December 14, 2016.</p>

        <p>Shavkat Mirziyoyev is married; with two daughters, one son and five grandchildren. His spouse, Z.M. Mirziyoyeva, has a qualification of an engineer-economist. At present, she is a housewife.</p>

        <p>In recognition of many years of productive work in the Government and management, enormous contribution to the development of the country, improvement of the people's welfare, Shavkat Mirziyoyev was awarded the Order "Mekhnat Shukhrati" ('Glory of Labor') and "Fidokorona Khizmatlari Uchun" ('For a Selfless Service').</p>
      `,
    },
    uz: {
      title: "O'zbekiston Respublikasi Prezidenti",
      name: "Shavkat Mirziyoyev",
      biography: `
        <p>Shavkat Mirziyoyev 1957 yil 24 iyulda Jizzax viloyati Zomin tumani shifokorlar oilasida tug'ilgan. Millati o'zbek, oliy ma'lumotli. 1981 yilda Toshkent irrigatsiya va mexanizatsiyalash muhandislari institutini tamomlagan va mexanika muhandisi mutaxassisligi bo'yicha diplom olgan. Texnika fanlari nomzodi, dotsent ilmiy darajasiga ega.</p>

        <p>Shavkat Mirziyoyev o'z faoliyatini 1981 yilda Toshkent irrigatsiya va mexanizatsiyalash muhandislari institutida boshlagan, u yerda kichik ilmiy xodim, katta o'qituvchi, dotsent va ilmiy ishlar bo'yicha prorektor lavozimlarida ishlagan.</p>

        <p>1990 yilda respublika Oliy Kengashining deputati etib saylangan. Mandat komissiyasi raisi lavozimida ishlagan.</p>

        <p>1992 yilda Shavkat Mirziyoyev Toshkent shahri Mirzo Ulug'bek tumani hokimi etib tayinlangan. 1996-2001 yillarda Jizzax viloyati hokimi, 2001-2003 yillarda Samarqand viloyati hokimi lavozimlarida ishlagan va yuqorida zikr etilgan tuman hamda viloyatlarning ijtimoiy-iqtisodiy rivojlanishiga katta hissa qo'shgan.</p>

        <p>Ijroiya hokimiyatida ishlab, bir vaqtning o'zida 1995-2003 yillarda O'zbekiston Respublikasi Oliy Majlisining deputati sifatida u mamlakatning siyosiy va ijtimoiy-iqtisodiy rivojlanishi, demokratik islohotlar amalga oshirilishi bo'yicha muhim qonun hujjatlarining ishlab chiqilishi va qabul qilinishida faol va samarali ishtirok etgan.</p>

        <p>Shavkat Mirziyoyev 2003 yilda O'zbekiston Respublikasi Bosh vaziri etib tasdiqlangan va uch marta (2005, 2010 va 2015 yillarda) Oliy Majlisning ikkala palatasi tomonidan o'z lavozimida qayta tasdiqlangan.</p>

        <p>Vatan mustaqilligining dastlabki yillaridan Shavkat Mirziyoyev birinchi Prezident Islom Karimovning yuqori ishonchini qozongan, o'zini uning hamkori va yaqin sherigi sifatida fidokorona ishlagan.</p>

        <p>Hukumat rahbari sifatida u mamlakatda keng ko'lamli ijtimoiy-iqtisodiy islohotlar, modernizatsiya va takomillashtirish, yirik va noyob loyihalarni amalga oshirish, xususiy mulkni rivojlantirish va himoya qilish, kichik biznes va xususiy tadbirkorlik ulushini iqtisodiyotda keskin oshirish va ularning huquqiy himoyasini mustahkamlashda ulkan qobiliyatlar va ajoyib rahbarlik ko'rsatgan.</p>

        <p>O'z faoliyatida Shavkat Mirziyoyev iqtisodiyotning sanoat asosida rivojlanishiga, mamlakat eksport salohiyatini oshirishga, qishloq xo'jaligi sohasini tubdan o'zgartirishga, ayniqsa fermer xo'jaliklarini kengaytirishga, qishloq xo'jaligi mahsulotlarini chuqur qayta ishlashga, xalqning oziq-ovqat xavfsizligini ta'minlashga va aholiga arzon narxlarda tovarlar yetkazib berishni kafolatlashga alohida ahamiyat bergan.</p>

        <p>Odamlarning yashash va mehnat qilish sharoitlarini tubdan yaxshilash uchun Shavkat Mirziyoyev mamlakatning barcha hududlarida keng ko'lamli qurilish va obodonlashtirish ishlari, jamoat xizmatlarining sifatini oshirish, shahar va tumanlarni kompleks rivojlantirish, shu jumladan olis qishloq joylarini rivojlantirish bo'yicha samarali chora-tadbirlarni ko'rgan.</p>

        <p>Uning faoliyatida ijtimoiy-iqtisodiy yo'nalish bilan bir qatorda ta'lim, fan va sog'liqni saqlash sohasining zamonaviy talablar darajasida rivojlanishiga, sog'lom va har tomonlama rivojlangan yosh avlodni shakllantirish uchun zarur shart-sharoitlar yaratishga, onalik va bolalikni himoya qilishga katta e'tibor qaratilgan.</p>

        <p>U o'zini o'zi boshqarishning noyob instituti - mahallaning obro'sini yanada oshirishga, boshqa jamoat tashkilotlarining rolini demokratik islohotlar jarayoniga keng jalb etish orqali jamiyatda mustahkamlashga, shuningdek, milliy ma'naviy qadriyatlarni saqlash va boyitishga katta e'tibor bergan.</p>

        <p>Shu bilan birga, iqtisodiy va ijtimoiy muammolarni hal qilishda Shavkat Mirziyoyev boshqa davlatlar, xalqaro tashkilotlar va moliya institutlari bilan o'zaro foydali hamkorlikni kengaytirish, mamlakatning milliy manfaatlariga va iqtisodiy rivojlanishiga xizmat qiluvchi muhim kelishuvlarni imzolash bo'yicha sa'y-harakatlarni bevosita rahbarlik qilgan.</p>

        <p>2016 yil 8 sentyabrda O'zbekiston Respublikasi Oliy Majlisining Qonunchilik palatasi va Senati qo'shma majlisida qabul qilingan qo'shma qaror asosida Bosh vazir Shavkat Mirziyoyev O'zbekiston Respublikasi Prezidentining vazifalari va vakolatlari vaqtincha yuklatildi.</p>

        <p>2016 yil 19 oktyabrda Toshkentda bo'lib o'tgan O'zbekiston Tadbirkorlar va Ishbilarmonlar Harakati - O'zbekiston Liberal-Demokratik Partiyasining (O'zLiDeP) Sakkizinchi qurultoyida partiya Siyosiy Kengashi a'zosi Shavkat Mirziyoyev prezidentlik saylovlariga partiyaning nomzodi sifatida ko'rsatildi.</p>

        <p>Shavkat Mirziyoyev 2016 yil 4 dekabrda bo'lib o'tgan prezidentlik saylovlari natijalariga ko'ra ovozlarning 88,61 foizini olib, O'zbekiston Respublikasi Prezidenti etib saylandi. Shavkat Mirziyoyev 2016 yil 14 dekabrda O'zbekiston Respublikasi Prezidenti lavozimini rasman egalladi.</p>

        <p>Shavkat Mirziyoyev uylangan, ikki qizi, bir o'g'li va besh nabirasi bor. Uning rafiqasi Z.M. Mirziyoyeva muhandis-iqtisodchi mutaxassisligiga ega. Hozirda u uy bekasi.</p>

        <p>Hukumat va boshqaruvda ko'p yillik samarali mehnati, mamlakat rivojlanishiga, xalq farovonligini oshirishga qo'shgan ulkan hissasi uchun Shavkat Mirziyoyev "Mehnat shuhrati" va "Fidokorona xizmatlari uchun" ordenlari bilan taqdirlangan.</p>
      `,
    },
  };

  const content = presidentContent[validLng] || presidentContent.en;

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-[url('/bg.svg')] bg-contain bg-center py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {content.title}
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary">
              {content.name}
            </h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
            {/* President Image */}
            <div className="lg:sticky lg:top-8">
              <div className="relative w-full max-w-sm mx-auto lg:mx-0">
                <div className="relative aspect-3/4 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/5/54/Shavkat_Mirziyoyev_official_portrait.jpg"
                    alt={content.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full -z-10"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/5 rounded-full -z-10"></div>
              </div>
            </div>

            {/* Biography Content */}
            <div className="max-w-4xl">
              <div className="bg-card rounded-xl shadow-lg border p-6 md:p-8">
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:font-bold prose-headings:text-foreground prose-headings:tracking-tight
                    prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:mt-12 prose-h1:mb-6 prose-h1:leading-tight
                    prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:leading-tight prose-h2:border-b prose-h2:border-border prose-h2:pb-2
                    prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:leading-tight prose-h3:text-primary
                    prose-h4:text-lg prose-h4:md:text-xl prose-h4:mt-6 prose-h4:mb-3 prose-h4:font-semibold
                    prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base prose-p:md:text-lg
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:transition-colors
                    prose-strong:text-foreground prose-strong:font-bold prose-strong:bg-primary/10 prose-strong:px-2 prose-strong:py-1 prose-strong:rounded-md prose-strong:-mx-2 prose-strong:border prose-strong:border-primary/20 prose-strong:shadow-sm prose-strong:backdrop-blur-sm
                    prose-ul:my-8 prose-ul:space-y-4 prose-ul:pl-0
                    prose-ol:my-8 prose-ol:space-y-4 prose-ol:pl-0
                    prose-li:text-foreground prose-li:leading-relaxed prose-li:text-base prose-li:md:text-lg prose-li:relative prose-li:pl-10 prose-li:py-2 prose-li:bg-slate-50/50 prose-li:dark:bg-slate-800/50 prose-li:rounded-lg prose-li:border-l-4 prose-li:border-primary/30 prose-li:transition-colors hover:prose-li:bg-primary/5 hover:prose-li:border-primary/50
                    prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-2 prose-li:before:top-4 prose-li:before:w-3 prose-li:before:h-3 prose-li:before:bg-primary prose-li:before:rounded-full prose-li:before:shadow-md prose-li:before:ring-2 prose-li:before:ring-primary/20 prose-li:before:ring-offset-2 prose-li:before:ring-offset-white prose-li:before:dark:ring-offset-slate-900
                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-linear-to-r prose-blockquote:from-primary/5 prose-blockquote:to-primary/10 prose-blockquote:backdrop-blur-sm
                    prose-blockquote:pl-8 prose-blockquote:pr-6 prose-blockquote:py-6 prose-blockquote:my-8 prose-blockquote:rounded-r-lg prose-blockquote:shadow-lg prose-blockquote:relative
                    prose-blockquote:text-foreground prose-blockquote:font-medium prose-blockquote:not-italic
                    prose-code:bg-slate-100 prose-code:dark:bg-slate-800 prose-code:px-3 prose-code:py-1.5 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-slate-200 prose-code:dark:border-slate-700 prose-code:font-medium prose-code:shadow-sm prose-code:backdrop-blur-sm
                    prose-pre:bg-slate-50 prose-pre:dark:bg-slate-900 prose-pre:border prose-pre:border-slate-200 prose-pre:dark:border-slate-700 prose-pre:rounded-lg prose-pre:shadow-lg prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:text-sm prose-pre:my-8 prose-pre:backdrop-blur-sm
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-slate-200 prose-img:dark:border-slate-700 prose-img:transition-transform hover:prose-img:scale-105 prose-img:mx-auto prose-img:block
                    prose-hr:border-0 prose-hr:h-px prose-hr:bg-linear-to-r prose-hr:from-transparent prose-hr:via-border prose-hr:to-transparent prose-hr:my-12
                    prose-table:shadow-lg prose-table:border prose-table:border-slate-200 prose-table:dark:border-slate-700 prose-table:rounded-lg prose-table:overflow-hidden prose-table:my-8
                    prose-th:bg-slate-50 prose-th:dark:bg-slate-800 prose-th:border prose-th:border-slate-200 prose-th:dark:border-slate-700 prose-th:px-6 prose-th:py-4 prose-th:text-left prose-th:font-semibold prose-th:text-slate-900 prose-th:dark:text-slate-100
                    prose-td:border prose-td:border-slate-200 prose-td:dark:border-slate-700 prose-td:px-6 prose-td:py-4 prose-td:text-slate-700 prose-td:dark:text-slate-300"
                  dangerouslySetInnerHTML={{ __html: content.biography }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
