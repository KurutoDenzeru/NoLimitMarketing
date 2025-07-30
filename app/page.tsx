import { Navbar } from "@/components/navbar/navbar"
import { HeroSection } from "@/components/ui/dynamic-hero"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto">
        
        <HeroSection
          heading="More Growth. More Clients."
          tagline="Guaranteed!"
          buttonText="Yes, I want that!"
        />
      </main>
    </>
  )
}