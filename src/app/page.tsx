import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import CoreProduct from '@/components/CoreProduct';
import Playground from '@/components/Playground';
import Examples from '@/components/Examples';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <CoreProduct />
        <Playground />
        <Examples />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
