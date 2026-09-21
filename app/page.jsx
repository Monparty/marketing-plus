import { BackToTop } from "@/components/back-to-top";
import { Clients } from "@/components/clients";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Process } from "@/components/process";
import { Services } from "@/components/services";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeToggle } from "@/components/theme-toggle";
import { Why } from "@/components/why";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <Work />
        <Why />
        <Process />
        <Clients />
        <Contact />
      </main>
      <SiteFooter />
      <BackToTop />
      <ThemeToggle />
    </div>
  );
}
