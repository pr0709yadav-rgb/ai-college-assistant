import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/home/Hero";
import Features from "../../components/home/Features";
import Stats from "../../components/home/Stats";
import Testimonials from "../../components/home/Testimonials";
import FAQ from "../../components/home/FAQ";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
      <FAQ />
      <Footer />

    </>
  );
}

export default Home;