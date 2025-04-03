// components/navbar.tsx

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, MapPin, ShoppingCart } from "lucide-react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import CartButton from "@/components/custom/cart-button" // Importamos el componente CartButton

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: "Book Now", href: "/book-now" },
    { name: "Impulse Services", href: "/services" },
    { name: "Impulse Wear", href: "/wear" },
    { name: "Location", href: "/location", icon: MapPin },
    { name: "About Us", href: "/about" },
    { name: "FAQ", href: "/faq" },
  ]

  return (
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#fefefe] bg-[#fefefe]/40 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-28">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="relative w-16 h-16 md:w-24 md:h-24">
                  <Image
                      src="/logo-sin-texto.png"
                      alt="Impulse Rentals Logo"
                      fill
                      style={{ objectFit: 'contain' }}
                      priority
                  />
                </div>
              </Link>
            </div>

            {/* Navigation Items - Solo visible en pantallas grandes (lg) */}
            <div className="hidden lg:flex items-center justify-center flex-1 space-x-6 px-4">
              {navigation.map((item) => (
                  <Link
                      key={item.name}
                      href={item.href}
                      className={`whitespace-nowrap px-2 py-2 text-xl xl:text-2xl font-bebas tracking-wider transition-colors duration-200 ${
                          isScrolled
                              ? pathname === item.href
                                  ? "text-[#ff0054]"
                                  : "text-[#060404] hover:text-[#ff0054]"
                              : "text-[#fefefe] hover:text-[#ff0054]"
                      } ${item.icon ? "flex items-center gap-1" : ""}`}
                  >
                    {item.name}
                    {item.icon && <item.icon className="h-5 w-5 xl:h-6 xl:w-6" />}
                  </Link>
              ))}
              <Button
                  className={`${
                      isScrolled
                          ? 'bg-[#ff0054]'
                          : 'bg-transparent border-2 border-[#fefefe]'
                  } hover:bg-[#ff0054] hover:border-[#ff0054] text-[#fefefe] px-6 xl:px-10 text-xl xl:text-2xl font-bebas tracking-wider h-12 xl:h-14`}
                  asChild
              >
                <Link href="/contact">Contact</Link>
              </Button>
            </div>

            {/* CartButton y Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <div className={`${isScrolled ? 'text-[#ff0054]' : 'text-[#fefefe]'} hover:text-[#ff0054] transition-colors duration-200 relative`}>
                <CartButton />
              </div>

              {/* Menu Button para móviles y tablets */}
              <div className="lg:hidden">
                <button
                    className="p-2 rounded-md hover:bg-gray-100/10"
                    onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? (
                      <X className={`h-8 w-8 ${isScrolled ? 'text-[#ff0054]' : 'text-[#fefefe]'}`} />
                  ) : (
                      <Menu className={`h-8 w-8 ${isScrolled ? 'text-[#ff0054]' : 'text-[#fefefe]'}`} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Menú desplegable para móviles y tablets */}
          {isOpen && (
              <div className="lg:hidden bg-[#fefefe]/90 backdrop-blur-sm absolute w-full left-0 shadow-lg z-50 animate-in slide-in-from-top duration-300">
                <div className="px-4 pt-2 pb-3 space-y-4">
                  {navigation.map((item) => (
                      <Link
                          key={item.name}
                          href={item.href}
                          className={`block px-3 py-3 text-2xl font-bebas tracking-wider ${
                              pathname === item.href
                                  ? "text-[#ff0054]"
                                  : "text-[#060404] hover:text-[#ff0054]"
                          } ${item.icon ? "flex items-center gap-2" : ""}`}
                          onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                        {item.icon && <item.icon className="h-6 w-6" />}
                      </Link>
                  ))}
                  <Button
                      className="bg-[#ff0054] hover:bg-[#ff0054]/90 text-[#fefefe] w-full mt-4 text-2xl font-bebas tracking-wider h-14"
                      asChild
                  >
                    <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
                  </Button>
                </div>
              </div>
          )}
        </div>
      </nav>
  )
}