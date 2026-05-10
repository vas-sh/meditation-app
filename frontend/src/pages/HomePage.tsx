import { Stack } from "@mui/material";
import BenefitsSection from "../components/home/BenefitsSection";
import CTASection from "../components/home/CTASection";
import HeroSection from "../components/home/HeroSection";
import HowItWorks from "../components/home/HowItWorks";
import MeditationTypes from "../components/home/MeditationTypes";
import AppContainer from "../components/ui/AppContainer";

export default function HomePage() {
  return (
    <AppContainer>
      <Stack spacing={{ xs: 7, md: 10 }}>
        <HeroSection />
        <BenefitsSection />
        <MeditationTypes />
        <HowItWorks />
        <CTASection />
      </Stack>
    </AppContainer>
  );
}
