// app/foamnoche/page.tsx
"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ShieldCheck, Sparkles, Clock } from "lucide-react"
import Image from "next/image"

export default function FoamNochePage() {
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

      {/* Main Hero Section - Ahora con imagen en lugar de video */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/fotofoamnoche.jpg"
            alt="Night Foam Party"
            fill
            className="object-cover brightness-100" // Aumentada la luminosidad
          />
        </div>
        <div className="absolute inset-0 bg-[#060404]/30 flex items-center justify-center"> {/* Reducida la opacidad del overlay */}
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bebas mb-6">
              <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                Night Foam Party
              </span>
              <br />
              <span className="text-[#fefefe]">
                Glow in the Dark!
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#fefefe]/90 leading-relaxed">
              Experience the magic of foam under the stars with our spectacular 
              night foam parties. LED lights and special effects create an 
              unforgettable nocturnal adventure!
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Video Card Section */}
          <div className="mb-24">
            <div className="jsx-f190bc1cb73f4c3a relative rounded-xl overflow-hidden border border-[#ff0054]/30 shadow-[0_0_30px_rgba(255,0,84,0.3)] bg-[#060404]/50 backdrop-blur-sm"> {/* Reducida la opacidad del fondo */}
              <div className="relative h-[600px]">
                <video
                  className="w-full h-full object-cover brightness-110" // Aumentada la luminosidad
                  muted
                  playsInline
                  loop
                  autoPlay
                >
                  <source src="/videos/foamnoch.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-8 text-center">
                <h2 className="text-5xl md:text-7xl font-bebas mb-6">
                  <span className="text-[#ff0054] animate-pulse">
                    GLOW IN THE DARK FOAM
                  </span>
                </h2>
                <p className="text-xl text-[#fefefe]/90 leading-relaxed max-w-4xl mx-auto">
                  Our night foam parties combine stunning LED lighting effects with our 
                  premium foam experience. Perfect for nightclubs, special events, and 
                  exclusive celebrations. Watch as the foam glows and transforms your 
                  night into a mesmerizing spectacle of lights and colors.
                </p>
              </div>
            </div>
          </div>

          {/* Features Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
            {/* Safety Card */}
            <div className="group">
              <div className="relative aspect-square rounded-full p-8bg-gradient-to-br from-[#ff0054] to-[#fbe40b]transform transition-all duration-500 group-hover:scale-105shadow-[0_0_30px_rgba(255,0,84,0.3)]group-hover:shadow-[0_0_50px_rgba(255,0,84,0.5)]">
                <div className="absolute inset-1 rounded-full bg-[#060404] flex items-center justify-center p-6before:absolute before:inset-0 before:rounded-full before:shadow-[inset_0_0_20px_rgba(255,0,84,0.3)]before:opacity-0 group-hover:before:opacity-100before:transition-opacity before:duration-500">
                  <div className="text-center space-y-4">
                    <ShieldCheck className="w-16 h-16 text-[#ff0054] mx-auto group-hover:animate-pulse" />
                    <h3 className="text-3xl font-bebas text-[#fefefe]group-hover:text-[#ff0054] transition-colors">
                      Night Safety
                    </h3>
                    <p className="text-[#fefefe]/80 text-lg">
                      Professional lighting and safety staff ensure a secure environment 
                      for your nighttime foam experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Clean Card */}
            <div className="group">
              <div className="relative aspect-square rounded-full p-8bg-gradient-to-br from-[#fbe40b] to-[#ff0054]transform transition-all duration-500 group-hover:scale-105shadow-[0_0_30px_rgba(251,228,11,0.3)]group-hover:shadow-[0_0_50px_rgba(251,228,11,0.5)]">
                <div className="absolute inset-1 rounded-full bg-[#060404] flex items-center justify-center p-6before:absolute before:inset-0 before:rounded-full before:shadow-[inset_0_0_20px_rgba(251,228,11,0.3)]before:opacity-0 group-hover:before:opacity-100before:transition-opacity before:duration-500">
                  <div className="text-center space-y-4">
                    <Sparkles className="w-16 h-16 text-[#fbe40b] mx-auto group-hover:animate-pulse" />
                    <h3 className="text-3xl font-bebas text-[#fefefe]group-hover:text-[#fbe40b] transition-colors">
                      LED Effects
                    </h3>
                    <p className="text-[#fefefe]/80 text-lg">
                      State-of-the-art LED system with professional lighting effects 
                      synchronized with the foam experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Duration Card */}
            <div className="group">
              <div className="relative aspect-square rounded-full p-8bg-gradient-to-br from-[#ff0054] to-[#fbe40b]transform transition-all duration-500 group-hover:scale-105shadow-[0_0_30px_rgba(255,0,84,0.3)]group-hover:shadow-[0_0_50px_rgba(255,0,84,0.5)]">
                <div className="absolute inset-1 rounded-full bg-[#060404] flex items-center justify-center p-6before:absolute before:inset-0 before:rounded-full before:shadow-[inset_0_0_20px_rgba(255,0,84,0.3)]before:opacity-0 group-hover:before:opacity-100before:transition-opacity before:duration-500">
                  <div className="text-center space-y-4">
                    <Clock className="w-16 h-16 text-[#ff0054] mx-auto group-hover:animate-pulse" />
                    <h3 className="text-3xl font-bebas text-[#fefefe]group-hover:text-[#ff0054] transition-colors">
                      All Night Long
                    </h3>
                    <p className="text-[#fefefe]/80 text-lg">
                      Non-stop foam and light show entertainment throughout your 
                      entire event. The party never stops!
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
              className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#fefefe] font-bebas text-2xl px-16 py-8 transform hover:scale-105 transition-all duration-300shadow-[0_0_30px_rgba(255,0,84,0.3)]hover:shadow-[0_0_50px_rgba(255,0,84,0.5)]"
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