import Link from "next/link"
import { Wallet, Phone, Mail, Linkedin, Twitter, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div className="max-w-xl mb-8 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Do You Want to Explore our Investment Opportunities?
            </h2>
            <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-8 py-6 h-auto text-lg">
              <Link href="/signup">Create an account</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative overflow-hidden rounded-lg h-32 w-48 bg-slate-800">
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-slate-800/80">
                <p className="text-sm font-medium">The Edge</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg h-32 w-48 bg-slate-800">
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-slate-800/80">
                <p className="text-sm font-medium">Mediawan & Leonine Studios</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg h-32 w-48 bg-slate-800 hidden md:block">
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-slate-800/80">
                <p className="text-sm font-medium">Investment Showcase</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Column 1 */}
            <div>
              <h3 className="text-xl font-bold mb-6">Who we are</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/about" className="text-slate-300 hover:text-white">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/philosophy" className="text-slate-300 hover:text-white">
                    Investment Philosophy
                  </Link>
                </li>
                <li>
                  <Link href="/board" className="text-slate-300 hover:text-white">
                    Board Members
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-slate-300 hover:text-white">
                    Leadership Team
                  </Link>
                </li>
                <li>
                  <Link href="/locations" className="text-slate-300 hover:text-white">
                    Our Locations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-xl font-bold mb-6">What we do</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/offer" className="text-slate-300 hover:text-white">
                    What we offer
                  </Link>
                </li>
                <li>
                  <Link href="/solutions" className="text-slate-300 hover:text-white">
                    Our solutions
                  </Link>
                </li>
                <li>
                  <Link href="/platform" className="text-slate-300 hover:text-white">
                    Digital Platform
                  </Link>
                </li>
                <li>
                  <Link href="/offshore" className="text-slate-300 hover:text-white">
                    Access to Offshore Structuring
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-xl font-bold mb-6">Financial tools</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/tools" className="text-slate-300 hover:text-white">
                    Overview
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio-builder" className="text-slate-300 hover:text-white">
                    Portfolio Builder
                  </Link>
                </li>
                <li>
                  <Link href="/diversification-calculator" className="text-slate-300 hover:text-white">
                    Diversification Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/retirement-calculator" className="text-slate-300 hover:text-white">
                    Retirement Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/risk-profiler" className="text-slate-300 hover:text-white">
                    Risk Profiler
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="text-xl font-bold mb-6">Insights</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/insights" className="text-slate-300 hover:text-white">
                    Overview
                  </Link>
                </li>
                <li>
                  <Link href="/articles" className="text-slate-300 hover:text-white">
                    Articles
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-slate-300 hover:text-white">
                    Press Release
                  </Link>
                </li>
                <li>
                  <Link href="/knowledge-hub" className="text-slate-300 hover:text-white">
                    Knowledge Hub
                  </Link>
                </li>
                <li>
                  <Link href="/management-views" className="text-slate-300 hover:text-white">
                    Management Views
                  </Link>
                </li>
                <li>
                  <Link href="/white-papers" className="text-slate-300 hover:text-white">
                    White Paper
                  </Link>
                </li>
                <li>
                  <Link href="/webinars" className="text-slate-300 hover:text-white">
                    Webinars
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5 */}
            <div>
              <h3 className="text-xl font-bold mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="https://linkedin.com" className="text-slate-300 hover:text-white flex items-center">
                    <Linkedin className="h-5 w-5 mr-2" />
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com" className="text-slate-300 hover:text-white flex items-center">
                    <Twitter className="h-5 w-5 mr-2" />X
                  </Link>
                </li>
                <li>
                  <Link href="https://instagram.com" className="text-slate-300 hover:text-white flex items-center">
                    <Instagram className="h-5 w-5 mr-2" />
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="tel:+123456789" className="text-slate-300 hover:text-white flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Call
                  </Link>
                </li>
                <li>
                  <Link href="mailto:info@coin.com" className="text-slate-300 hover:text-white flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    Email
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Wallet className="h-6 w-6 mr-2" />
              <span className="font-bold text-lg">Coin</span>
            </div>
            <div className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} Coin. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
