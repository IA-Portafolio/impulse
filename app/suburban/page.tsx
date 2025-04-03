// app/suburban/page.tsx
"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Car, 
  Battery, 
  ArrowRight,
  Star,
  Sparkles,
  Info
} from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export default function SuburbanPage() {
  const firstVideoRef = useRef<HTMLVideoElement>(null)
  const secondVideoRef = useRef<HTMLVideoElement>(null)
  const [isInViewport, setIsInViewport] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activePoint, setActivePoint] = useState<number | null>(null)

  // Highlight points for interactive effect
  const [highlightedPoint, setHighlightedPoint] = useState<number | null>(null)
  
  // Highlighted features for interactive points - reduced to 4
  const highlightedFeatures = [
    { 
      id: 1, 
      title: "Premium Grille", 
      description: "Bold chrome grille design with signature Chevrolet pattern that emphasizes luxury and strength"
    },
    { 
      id: 2, 
      title: "LED Lighting System", 
      description: "Premium LED lighting system with distinctive signature that illuminates the road ahead with clarity"
    },
    { 
      id: 3, 
      title: "22-inch Premium Wheels", 
      description: "Exquisite 22-inch premium wheels with exclusive design that enhance the vehicle's presence"
    },
    { 
      id: 4, 
      title: "Elegant Chrome Accents", 
      description: "Sophisticated chrome accents that highlight the vehicle's refined lines and luxury status"
    }
  ]

  // Feature cards data from homepage
  const featureCards = [
    {
      title: "Performance & Power",
      icon: Car,
      description: "Experience the powerful V8 engine delivering exceptional performance with 355 horsepower and responsive handling. The Suburban offers the perfect balance of power and efficiency for both city driving and off-road adventures."
    },
    {
      title: "Luxurious Interior",
      icon: Star,
      description: "Immerse yourself in premium comfort with leather seating for up to 8 passengers, panoramic sunroof, and advanced climate control. Every journey becomes a first-class experience with exceptional attention to detail."
    },
    {
      title: "Advanced Technology",
      icon: Battery,
      description: "Stay connected with a 10.2-inch touchscreen infotainment system, wireless charging, and premium Bose® sound system. The Suburban incorporates cutting-edge technology to enhance both safety and entertainment."
    }
  ]

  // Effect to handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Check on initial load
    checkMobile()
    
    // Add listener for window resize
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Effect to control video playback
  useEffect(() => {
    const handleScroll = () => {
      const secondVideoElement = secondVideoRef.current
      if (!secondVideoElement) return
      
      const rect = secondVideoElement.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0
      
      setIsInViewport(isVisible)
      
      if (isVisible && secondVideoElement.paused) {
        secondVideoElement.play().catch(console.error)
      }
    }

    // Play first video automatically
    if (firstVideoRef.current) {
      firstVideoRef.current.play().catch(console.error)
    }

    window.addEventListener('scroll', handleScroll)
    
    // Check on page load
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Toggle feature point for mobile
  const toggleFeaturePoint = (id: number) => {
    if (activePoint === id) {
      setActivePoint(null)
    } else {
      setActivePoint(id)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#060404]">
      {/* First Section - Interior Video */}
      <div className="relative h-[70vh] sm:h-[80vh] md:h-screen">
        <video
          ref={firstVideoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          loop
        >
          <source src="/images/sub/suburban-dentro.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#060404]/40 flex items-center justify-center">
          <div className="text-center max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-4">
            <h2 className="text-[#fefefe] text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bebas mb-4 sm:mb-6">
              Experience{" "}
              <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                Sublime Elegance
              </span>
              <br />
              Maximum Comfort
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#fefefe]/90 max-w-xs sm:max-w-md md:max-w-xl mx-auto">
              When luxury meets versatility, the new Chevrolet Suburban is born.
              An unparalleled driving experience that redefines the concept of luxury SUV.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Highlights Section - Responsive version */}
      <div className="relative py-12 sm:py-16 md:py-24 bg-[#060404]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bebas mb-8 sm:mb-12">
            <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
              Discover Excellence
            </span>
          </h2>
          
          {/* Mobile version - separate image and features list */}
          <div className="md:hidden space-y-8 mt-8">
            {/* Centered image */}
            <div className="relative w-full h-[250px] sm:h-[350px] mx-auto border-2 border-[#ff0054]/20 rounded-xl overflow-hidden">
              <Image
                src="/images/sub/frente1.png"
                alt="Chevrolet Suburban 2025"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw"
              />
            </div>
            
            {/* List of features as accordion */}
            <div className="space-y-4">
              {highlightedFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="border border-[#ff0054]/30 rounded-lg overflow-hidden bg-[#060404]/60 backdrop-blur-sm"
                >
                  <button
                    onClick={() => toggleFeaturePoint(feature.id)}
                    className="w-full p-4 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#fbe40b] flex items-center justify-center">
                        <span className="text-[#060404] font-bold">{feature.id}</span>
                      </div>
                      <h4 className="font-bebas text-xl text-[#fefefe]">{feature.title}</h4>
                    </div>
                    <Info className={`w-5 h-5 text-[#ff0054] transition-transform duration-300 ${activePoint === feature.id ? 'rotate-180' : 'rotate-0'}`} />
                  </button>
                  
                  {activePoint === feature.id && (
                    <div className="p-4 pt-0 border-t border-[#ff0054]/20">
                      <p className="text-[#fefefe]/80 text-sm">{feature.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop version - interactive points with tooltips */}
          <div className="relative hidden md:flex h-[400px] lg:h-[600px] mt-12 mb-24">
            {/* Left side interactive points */}
            <div className="w-1/4 flex flex-col justify-center space-y-24">
              {highlightedFeatures.slice(0, 2).map((feature) => (
                <div
                  key={feature.id}
                  className={`cursor-pointer transition-all duration-300 z-20 ${
                    highlightedPoint === feature.id ? 'scale-110' : 'scale-100'
                  }`}
                  onMouseEnter={() => setHighlightedPoint(feature.id)}
                  onMouseLeave={() => setHighlightedPoint(null)}
                >
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center${highlightedPoint === feature.id ? 'bg-[#ff0054]' : 'bg-[#fbe40b]'}transition-all duration-500animate-pulserelative`}>
                      <span className="text-[#060404] font-bold text-xl">{feature.id}</span>
                      <span className="absolute -top-1 -right-1 bg-[#060404] text-[#fefefe] p-1 rounded-full">
                        <Sparkles className="w-3 h-3" />
                      </span>
                    </div>
                    
                    {/* Tooltip with information */}
                    <div className={`ml-4 w-56 p-4 rounded-lg shadow-xl${highlightedPoint === feature.id ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-2'}transition-all duration-300bg-gradient-to-br from-[#ff0054] to-[#fbe40b]text-[#060404]`}>
                      <h4 className="font-bebas text-xl mb-1">{feature.title}</h4>
                      <p className="text-sm font-medium">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Base vehicle image */}
            <div className="w-2/4 relative border-2 border-[#ff0054]/20 rounded-xl overflow-hidden">
              <Image
                src="/images/sub/frente1.png"
                alt="Chevrolet Suburban 2025"
                fill
                className="object-contain"
                sizes="(min-width: 768px) 50vw"
              />
            </div>
            
            {/* Right side interactive points */}
            <div className="w-1/4 flex flex-col justify-center space-y-24">
              {highlightedFeatures.slice(2, 4).map((feature) => (
                <div
                  key={feature.id}
                  className={`cursor-pointer transition-all duration-300 z-20 ${
                    highlightedPoint === feature.id ? 'scale-110' : 'scale-100'
                  }`}
                  onMouseEnter={() => setHighlightedPoint(feature.id)}
                  onMouseLeave={() => setHighlightedPoint(null)}
                >
                  <div className="flex items-center justify-end">
                    {/* Tooltip with information */}
                    <div className={`mr-4 w-56 p-4 rounded-lg shadow-xl${highlightedPoint === feature.id ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-2'}transition-all duration-300bg-gradient-to-br from-[#ff0054] to-[#fbe40b]text-[#060404]`}>
                      <h4 className="font-bebas text-xl mb-1">{feature.title}</h4>
                      <p className="text-sm font-medium">{feature.description}</p>
                    </div>
                    
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center${highlightedPoint === feature.id ? 'bg-[#ff0054]' : 'bg-[#fbe40b]'}transition-all duration-500animate-pulserelative`}>
                      <span className="text-[#060404] font-bold text-xl">{feature.id}</span>
                      <span className="absolute -top-1 -left-1 bg-[#060404] text-[#fefefe] p-1 rounded-full">
                        <Sparkles className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards Section - made responsive */}
      <div className="relative py-12 sm:py-16 md:py-24 bg-[#060404]">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[50px] sm:blur-[80px] md:blur-[128px] animate-pulse opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[50px] sm:blur-[80px] md:blur-[128px] animate-pulse delay-700 opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bebas mb-10 sm:mb-16 md:mb-20">
            <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">Features</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">{featureCards.map((card, index) => (
              <div 
                key={index}
                className={`relative overflow-hidden rounded-xl group${index === 1 && !isMobile ? 'md:transform md:scale-110 md:z-10' : ''}${isMobile ? 'h-auto' : 'h-auto'}`}
              >
                <div className={`absolute inset-0${index === 1 ? 'bg-gradient-to-br from-[#ff0054] to-[#fbe40b] opacity-50' : 'bg-gradient-to-br from-[#ff0054]/20 to-[#fbe40b]/20 opacity-50'}group-hover:opacity-80 transition-opacity duration-500`}></div>
                
                {index === 1 && (
                  <div className="absolute top-0 right-0 p-2 bg-[#fbe40b] text-[#060404] font-bebas text-lg rounded-bl-lg z-20">FEATURED</div>)}
                
                <div className={`relative z-10 p-6 sm:p-8${index === 1 ? 'border-2 border-[#ff0054]' : 'border border-[#ff0054]/30'} rounded-xl backdrop-blur-sm bg-[#060404]/70 h-full flex flex-col`}>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-[#fefefe]">{card.title}</h3>
                    <div className={`p-2 sm:p-3 ${index === 1 ? 'bg-[#fbe40b]' : 'bg-[#ff0054]'} rounded-full`}>
                      <card.icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 ${index === 1 ? 'text-[#060404]' : 'text-[#fefefe]'}`} />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <p className={`${index === 1 ? 'text-[#fefefe]' : 'text-[#fefefe]/90'} leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl`}>
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Video Section */}
      <div className="relative h-[70vh] sm:h-[80vh] md:h-screen">
        <video
          ref={secondVideoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          loop
        >
          <source src="/images/sub/suburban-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#060404]/40 flex flex-col items-center justify-center px-4">
          <h2 className="text-[#fefefe] text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bebas text-center mb-8 sm:mb-12">Dominate the{" "}
            <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">Road</span>
            <br />
            With Elegance
          </h2>

          {/* Book Now Button - responsive */}
          <Button 
            size="lg" 
            className="relative overflow-hidden groupbg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#fefefe] font-bebas text-lg sm:text-xl md:text-2xl lg:text-3xl px-6 sm:px-10 md:px-16 lg:px-20 py-4 sm:py-6 md:py-8 lg:py-10transform hover:scale-105 transition-all duration-500shadow-lg hover:shadow-[#ff0054]/50"
            asChild
          >
            <Link href="/book-now?service=transport" className="flex items-center gap-2 sm:gap-4">
  BOOK NOW
  <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 transform group-hover:translate-x-2 transition-transform duration-300" />
</Link>
          </Button>
        </div>
      </div>

      {/* Estilos para animaciones */}
      <style jsx global>{`
        @keyframes pulse-point {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
        }

        .animate-pulse-point {
          animation: pulse-point 2s ease-in-out infinite;
        }
        
        /* Soporte para dispositivos táctiles */
        @media (hover: none) {
          .hover\\:scale-105:active {
            transform: scale(1.05);
          }
          .group:active .group-hover\\:opacity-80 {
            opacity: 0.8;
          }
          .group:active .group-hover\\:translate-x-2 {
            transform: translateX(0.5rem);
          }
        }
      `}</style>
    </div>
  )
}