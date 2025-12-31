import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GameShowcase from "@/components/GameShowcase";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <GameShowcase />
    </main>
  );
}
