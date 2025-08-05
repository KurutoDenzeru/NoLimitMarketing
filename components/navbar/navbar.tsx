import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Infinity } from "lucide-react"
import { SidebarProvider, Sidebar, SidebarTrigger } from "@/components/ui/sidebar"

interface NavbarLink {
  label: string
  href: string
}

const NAV_LINKS: NavbarLink[] = [
  { label: "Home", href: "/" },
  { label: "Free Marketing Analysis", href: "/analysis" },
  { label: "Blogs", href: "/blogs" },
  { label: "Newsletter", href: "/newsletter" },
]

function Navbar() {
  return (
    <SidebarProvider>
      <nav className="w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto w-full flex h-16 items-center justify-between px-12 ">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-2 select-none">
            <Image src="/loop.png" alt="Logo" width={36} height={36} />
            {/* <Infinity className="size-7 text-primary" /> */}
            <span className="font-bold text-lg tracking-tight text-primary">No Limit Marketing</span>
          </Link>
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2 rounded-md text-md font-medium text-muted-foreground hover:text-red-500 hover:bg-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <SidebarTrigger
              aria-label="Open menu"
              className="p-2 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <span className="sr-only">Open menu</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </SidebarTrigger>
          </div>
        </div>
        {/* Mobile Sidebar Content */}
        <Sidebar side="right" variant="floating" collapsible="offcanvas" className="md:hidden">
          <nav className="flex flex-col gap-2 p-4">
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-red-400 hover:bg-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </Sidebar>
      </nav>
    </SidebarProvider>
  )
}

export { Navbar }
