import { Navbar } from "@/components/navbar/navbar"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Add your homepage content here */}
      </main>
    </div>
  )
}