import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type MenuItem = {
  title: string;
  href?: string;
  subItems?: { title: string; href: string }[];
};

export default function MobileNavAccordion({
  onLinkClick,
  menuItems,
}: {
  onLinkClick: () => void;
  menuItems: MenuItem[];
}) {
  const pathname = usePathname();

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      onClick={onLinkClick}
      className={cn(
        "flex items-center px-5 py-3 transition-colors text-base hover:bg-accent hover:text-accent-foreground border-b",
        pathname === href && "bg-accent text-accent-foreground"
      )}
    >
      {label}
    </Link>
  );

  return (
    <div className="flex flex-col justify-between h-full">
      {/* MAIN LINKS */}
      <nav className="">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.href ? (
              <NavLink href={item.href} label={item.title} />
            ) : (
              <Accordion
                type="single"
                collapsible
                className="space-y-0 border-b rounded-none"
              >
                <AccordionItem value={`item-${index}`} className="border-b">
                  <AccordionTrigger className="flex items-center px-5 py-3 text-base hover:bg-accent hover:text-accent-foreground transition-colors hover:no-underline rounded-none">
                    <div className="flex items-center font-normal">
                      {item.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-2">
                    <div className="space-y-2 pl-6">
                      {item.subItems?.map((sub, subIndex) => (
                        <Link
                          key={subIndex}
                          href={sub.href}
                          onClick={onLinkClick}
                          className="block text-base text-muted-foreground hover:text-foreground"
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
