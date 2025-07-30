import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar/navbar"
import { HeroSection } from "@/components/ui/dynamic-hero"

export default function HomePage() {
  return (
    <>
      <div className="max-w-8xl mx-auto w-full">
        <Navbar />
      </div>
      <HeroSection
        heading="More Growth. More Clients."
        tagline="Guaranteed!"
        buttonText="Yes, I want that!"
      />
      <Footer />
    </>
  )
}