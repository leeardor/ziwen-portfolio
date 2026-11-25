import Footer from "@/components/Footer";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col px-4 pb-8 pt-24 md:px-10 md:pb-10 md:pt-32">
      <HomeContent />
      <Footer />
    </main>
  );
}
