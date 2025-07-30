import { MailIcon, MapPinIcon, PhoneIcon, FacebookIcon, InstagramIcon, LinkedinIcon } from "lucide-react"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FooterProps {
    className?: string
}

export function Footer({ className }: FooterProps) {
    return (
        <footer className={`bg-neutral-900 text-neutral-200 pt-12 pb-6 px-4 md:px-8 ${className ?? ""}`}>
            <div className="max-w-8xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
                {/* Company Info */}
                <div className="flex-1 min-w-[220px]">
                    <h3 className="font-bold text-lg mb-2">NoLimitMarketing</h3>
                    <p className="mb-4 text-base text-neutral-400">
                        We help businesses achieve unlimited growth through strategic marketing solutions. Your success is our guarantee.
                    </p>
                    <address className="not-italic space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <MapPinIcon className="size-5" />
                            <span>3420 Woodside Lane, San Jose, CA,
                                United States, California</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <PhoneIcon className="size-5" />
                            <a href="tel:+16692499127" className="hover:underline">+1 669-249-9127</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <MailIcon className="size-5" />
                            <a href="mailto:maccruz@nolimitmarketing.us" className="hover:underline">maccruz@nolimitmarketing.us</a>
                        </div>
                    </address>
                </div>
                {/* Services */}
                <div className="flex-1 min-w-[180px]">
                    <h4 className="font-semibold mb-2">Our Services</h4>
                    <ul className="space-y-1 text-sm">
                        <li>Digital Marketing Strategy</li>
                        <li>Search Engine Optimization</li>
                        <li>Pay-Per-Click Advertising</li>
                        <li>Social Media Marketing</li>
                        <li>Content Marketing</li>
                        <li>Marketing Analytics</li>
                    </ul>
                </div>
                {/* Social Links */}
                <div className="flex-1 min-w-[180px]">
                    <h4 className="font-semibold mb-2">Follow Us</h4>
                    <div className="flex gap-4 mt-4">
                        <Button asChild variant="ghost" size="icon" className="hover:text-blue-500 transition-colors">
                            <a href="https://web.facebook.com/profile.php?id=61577015106018" aria-label="Facebook" target="_blank" rel="noopener">
                                <Facebook className="size-7" />
                            </a>
                        </Button>
                        <Button asChild variant="ghost" size="icon" className="hover:text-pink-500 transition-colors">
                            <a href="https://www.instagram.com/_nolimitmarketing/" aria-label="Instagram" target="_blank" rel="noopener">
                                <Instagram className="size-7" />
                            </a>
                        </Button>
                        {/* <Button asChild variant="outline" size="icon" className="hover:text-blue-400 transition-colors">
                            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener">
                                <Linkedin className="size-6" />
                            </a>
                        </Button> */}
                    </div>
                </div>
            </div>
            <hr className="my-8 border-neutral-700" />
            <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-neutral-400 gap-2">
                <span>© 2025 NoLimitMarketing. All rights reserved.</span>
                {/* <span>
                    Made with <span className="text-red-500">♥</span> for growing businesses
                </span> */}
            </div>
        </footer>
    )
}