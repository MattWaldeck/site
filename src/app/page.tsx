import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { Stats } from "@/components/Stats";
import { Banner } from "@/components/Banner";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Premises } from "@/components/Premises";
import { RoadSection } from "@/components/RoadSection";
import { Routes } from "@/components/Routes";
import { WhyChoose } from "@/components/WhyChoose";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <main id="top">
        <Hero />
        <Ticker />
        <Stats />
        <Banner />
        <Services />
        <WhyChoose />
        <About />
        <Premises />
        <RoadSection />
        <Routes />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
