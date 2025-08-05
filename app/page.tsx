import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar/navbar"
import { HeroSection } from "@/components/ui/dynamic-hero"
import MostOutOfYourMarketing from "@/components/ui/MostOutOfYourMarketing"
import { WhatMakesYourDifferent } from "@/components/WhatMakesYourDifferent"
import { WorldMapDemo } from "@/components/EmailSubscription"

export default function HomePage() {
  return (
    <>
      <div className="max-w-8xl mx-auto w-full">
        <Navbar />
      </div>
      <div className="h-screen">
        <HeroSection
          heading="More Growth. More Clients."
          tagline="Guaranteed!"
          buttonText="YES, I WANT THAT!"
        />
      </div>
      <MostOutOfYourMarketing />
      <WhatMakesYourDifferent />
      <WorldMapDemo />
      <Footer />
    </>
  )
}