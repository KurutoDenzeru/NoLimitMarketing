import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar/navbar"
import { HeroSection } from "@/components/ui/dynamic-hero"
import { CTA } from "@/components/ui/call-to-action"
import MostOutOfYourMarketing from "@/components/ui/MostOutOfYourMarketing"
import { WhatMakesYourDifferent } from "@/components/WhatMakesYourDifferent"

export default function HomePage() {
  return (
    <>
      <div className="max-w-8xl mx-auto w-full">
        <Navbar />
      </div>
      <div className="h-screen flex flex-col">
        <HeroSection
          heading="More Growth. More Clients."
          tagline="Guaranteed!"
          buttonText="Yes, I want that!"
        />
        <CTA />
      </div>
      <MostOutOfYourMarketing />
      <WhatMakesYourDifferent />
      <Footer />
    </>
  )
}