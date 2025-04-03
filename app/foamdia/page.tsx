// app/foamdia/page.tsx
"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ShieldCheck, Sparkles, Clock } from "lucide-react"
import Image from "next/image"

export default function FoamDiaPage() {
  const mainVideoRef = useRef<HTMLVideoElement>(null)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const playVideo = () => {
      if (mainVideoRef.current) {
        mainVideoRef.current.play().catch(error => {
          console.error("Error playing video:", error)
        })
      }
    }

    playVideo()
    // Add visibility change listener
    document.addEventListener("visibilitychange", playVideo)

    return () => {
      document.removeEventListener("visibilitychange", playVideo)
    }
  }, [])

  // Generate random bubbles with higher opacity
  const bubbles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10
  }))

  return (
    <div className="relative min-h-screen bg-[#060404] overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute rounded-full opacity-40 mix-blend-screen animate-float"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              animationDelay: `${bubble.delay}s`,
              animationDuration: `${bubble.duration}s`,
              background: `radial-gradient(circle at 30% 30%, ${bubble.id % 2 ? '#ff0054' : '#fbe40b'}, transparent)`
            }}
          />
        ))}
      </div>

      {/* Main Video */}
      <div className="relative h-screen">
        <video
          ref={mainVideoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          loop
        >
          <source src="/videos/foamdia.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#060404]/50 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bebas mb-6">
              <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                Dive into the Ultimate
              </span>
              <br />
              <span className="text-[#fefefe]">
                Foam Experience!
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#fefefe]/90 leading-relaxed">
              Transform your event into an unforgettable adventure filled with laughter and excitement
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Color Foam Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative h-[600px] rounded-xl overflow-hidden">
              <Image
                src="/images/foamcolor.png"
                alt="Color Foam Party"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-5xl md:text-7xl font-bebas">
                <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                  COLOR FOAM PARTY
                </span>
              </h2>
              <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                Take your foam party to the next level with our vibrant color foam experience. 
                Create a spectacular rainbow of fun that will make your event truly unique and 
                memorable. Perfect for festivals, private parties, and special celebrations!
              </p>
            </div>
          </div>

          {/* Foam Pit Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative h-[600px] rounded-xl overflow-hidden">
              <Image
                src="/images/foampit.png"
                alt="Foam Pit"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              <div className="inline-block bg-[#ff0054]/20 rounded-lg px-4 py-2 mb-4">
                <span className="text-[#ff0054] font-bebas text-xl">NEW</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bebas">
                <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                  FOAM PIT
                </span>
              </h2>
              <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                Introducing our latest addition - the ultimate outdoor foam pit! 
                A specially designed pool that creates the perfect environment for 
                foam play. With enhanced safety features and optimal foam generation, 
                it&#39;s the perfect centerpiece for any outdoor event. Great for summer 
                parties, corporate events, and festivals!
              </p>
            </div>
          </div>

          {/* Features Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
            {/* Safety Card */}
            <div className="group">
              <div className="relative aspect-square rounded-full p-8bg-gradient-to-br from-[#ff0054] to-[#fbe40b]transform transition-all duration-500 group-hover:scale-105shadow-lg hover:shadow-[#ff0054]/50">
                <div className="absolute inset-1 rounded-full bg-[#060404] flex items-center justify-center p-6">
                  <div className="text-center space-y-4">
                    <ShieldCheck className="w-16 h-16 text-[#ff0054] mx-auto" />
                    <h3 className="text-3xl font-bebas text-[#fefefe]">Completely Safe</h3>
                    <p className="text-[#fefefe]/80 text-lg">
                      Our foam solution is biodegradable, non-toxic, non-staining, and hypoallergenic. 
                      Safe for kids, adults, pets, and plants!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Clean Card */}
            <div className="group">
              <div className="relative aspect-square rounded-full p-8bg-gradient-to-br from-[#fbe40b] to-[#ff0054]transform transition-all duration-500 group-hover:scale-105shadow-lg hover:shadow-[#fbe40b]/50">
                <div className="absolute inset-1 rounded-full bg-[#060404] flex items-center justify-center p-6">
                  <div className="text-center space-y-4">
                    <Sparkles className="w-16 h-16 text-[#fbe40b] mx-auto" />
                    <h3 className="text-3xl font-bebas text-[#fefefe]">Easy Clean Up</h3>
                    <p className="text-[#fefefe]/80 text-lg">
                      Our foam solution evaporates naturally, and we ensure to leave your space 
                      spotless after the party!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Duration Card */}
            <div className="group">
              <div className="relative aspect-square rounded-full p-8bg-gradient-to-br from-[#ff0054] to-[#fbe40b]transform transition-all duration-500 group-hover:scale-105shadow-lg hover:shadow-[#ff0054]/50">
                <div className="absolute inset-1 rounded-full bg-[#060404] flex items-center justify-center p-6">
                  <div className="text-center space-y-4">
                    <Clock className="w-16 h-16 text-[#ff0054] mx-auto" />
                    <h3 className="text-3xl font-bebas text-[#fefefe]">Long Lasting</h3>
                    <p className="text-[#fefefe]/80 text-lg">
                      Continuous foam supply throughout your event. We keep the fun going by 
                      replenishing as needed!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Book Now Button */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#fefefe] font-bebas text-2xl px-16 py-8 transform hover:scale-105 transition-all duration-300shadow-lg hover:shadow-[#ff0054]/50"
              asChild
            >
              <Link href="/book-now?service=foam">Book Now</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bubble Animation Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 0.4;
          }
          75% {
            transform: translateY(-100%) scale(1);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  )
}