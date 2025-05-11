import Header from "../shared/header";
import Footer from "../shared/footer";

import HeroSection from "./hero/heroSection";
import Taskboard from "../taskBoard/taskBoard";

export default function Home() {
  return (
    <>
      <Header />
      <div>
        <HeroSection />
        <Taskboard />
      </div>
      <Footer />
    </>
  );
}
