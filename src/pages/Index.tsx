import AudioPlayer from "@/components/AudioPlayer";
import IntroSection from "@/components/IntroSection";
import GallerySection from "@/components/GallerySection";
import ProposalSection from "@/components/ProposalSection";
import FilmGrain from "@/components/FilmGrain";

const Index = () => {
  return (
    <main className="relative overflow-x-hidden">
      {/* Film grain overlay for cinematic effect */}
      <FilmGrain />
      
      {/* Floating audio player */}
      <AudioPlayer />
      
      {/* Section 1: Intro */}
      <IntroSection />
      
      {/* Section 2: Gallery */}
      <GallerySection />
      
      {/* Section 3: Proposal */}
      <ProposalSection />
    </main>
  );
};

export default Index;
