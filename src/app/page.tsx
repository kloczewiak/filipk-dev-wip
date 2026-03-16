import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import { PetProvider } from "@/components/pet/PetContext";
import Pet from "@/components/pet/Pet";

export default function Home() {
  return (
    <PetProvider>
      <Pet />
      <Navbar />
      <main>
        <Hero />
        <div id="about">
          <About />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
    </PetProvider>
  );
}
