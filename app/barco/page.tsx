// app/barco/page.tsx
"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Anchor, Speaker, Gauge, Users, Ship, Shield, Waves } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function BoatPage() {
  const mainVideoRef = useRef<HTMLVideoElement>(null)
  const gaviotasVideoRef = useRef<HTMLVideoElement>(null)
  const asadoVideoRef = useRef<HTMLVideoElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const videos = [mainVideoRef, gaviotasVideoRef, asadoVideoRef]
    
    videos.forEach(videoRef => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.error("Error playing video:", error)
        })
      }
    })
  }, [])

  const features = [
    {
      icon: Users,
      title: "Capacity",
      description: "Up to 12 passengers"
    },
    {
      icon: Speaker,
      title: "Audio System",
      description: "Premium Bluetooth sound system"
    },
    {
      icon: Gauge,
      title: "Engine",
      description: "Yamaha 150HP engine for optimal performance"
    },
    {
      icon: Ship,
      title: "Features",
      description: "LED lighting, luxury seating, double bimini"
    },
    {
      icon: Shield,
      title: "Safety",
      description: "All safety equipment included"
    },
    {
      icon: Anchor,
      title: "Handling",
      description: "Easy to operate - perfect for beginners"
    }
  ]

  return (
    <div className="relative min-h-screen bg-[#060404] overflow-hidden">
      {/* Ocean Background Image */}
      <div className="ocean-background">
        <div className="ocean-overlay"></div>
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
          <source src="/videos/fondo-page.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-[#060404]/50 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas text-center px-4 animate-fade-in">
            Let's Start a
            <span className="block bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text mt-4">
              New Adventure
            </span>
          </h1>
        </div>
      </div>

      {/* Horizontal Videos Section */}
      <div className="relative py-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Seagulls Card */}
            <div className="card-3d-container">
              <Card className="card-3d group">
                <div className="card-3d-content">
                  <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <video
                      ref={gaviotasVideoRef}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      muted
                      playsInline
                      loop
                    >
                      <source src="/videos/gaviotas.webm" type="video/webm" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060404] via-transparent to-transparent" />
                  </div>
                  <div className="p-8 space-y-4">
                    <h3 className="text-3xl font-bebas bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                      Spectacular Views
                    </h3>
                    <p className="text-xl text-[#fefefe]/80">
                      Imagine sailing while observing the most beautiful views that nature can offer. 
                      Our pontoons provide the perfect opportunity to connect with the natural environment.
                    </p>
                  </div>
                  <div className="card-shine"></div>
                </div>
              </Card>
            </div>

            {/* BBQ Card */}
            <div className="card-3d-container">
              <Card className="card-3d group">
                <div className="card-3d-content">
                  <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <video
                      ref={asadoVideoRef}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      muted
                      playsInline
                      loop
                    >
                      <source src="/videos/asado.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060404] via-transparent to-transparent" />
                  </div>
                  <div className="p-8 space-y-4">
                    <h3 className="text-3xl font-bebas bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                      The Best Culinary Experience
                    </h3>
                    <p className="text-xl text-[#fefefe]/80">
                      Can you imagine preparing a delicious BBQ while sailing? With our pontoons it's possible. 
                      Make your day on the water unforgettable!
                    </p>
                  </div>
                  <div className="card-shine"></div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-5xl md:text-6xl font-bebas mb-16">
            <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
              Premium Features
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="feature-card-container">
                <Card 
                  className="feature-card bg-[#060404]/40 backdrop-blur-md border-2 border-[#ff0054]/20 hover:border-[#ff0054]"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="feature-card-content p-8">
                    <div className="icon-container">
                      <feature.icon className="w-12 h-12 text-[#ff0054]" />
                    </div>
                    <h3 className="text-2xl font-bebas text-[#fefefe] mt-4 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[#fefefe]/80">
                      {feature.description}
                    </p>
                    {/* Eliminado el componente Waves */}
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Book Now Button at the bottom */}
          <div className="text-center mt-16">
          
<Button className="book-now-button bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#fefefe] font-bebas text-3xl px-16 py-8" asChild>
<Link href="/book-now?service=pontoons">BOOK NOW</Link>
</Button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ocean-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('/images/olas.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.4;
          pointer-events: none;
          z-index: 0;
        }

        .ocean-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(6,4,4,0.7) 0%, rgba(6,4,4,0.9) 100%);
        }

        .bubbles {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
          top: 0;
          left: 0;
        }

        .bubble {
          position: absolute;
          left: var(--position, 50%);
          bottom: -75%;
          display: block;
          width: var(--size, 20px);
          height: var(--size, 20px);
          border-radius: 50%;
          animation: float var(--time, 2s) var(--delay, 0s) ease-in infinite;
          background: radial-gradient(circle at center, 
            rgba(255,0,84,0.3) 0%, 
            rgba(251,228,11,0.1) 100%);
        }

        @keyframes float {
          0% { transform: translate(0, 100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(0, -100%); opacity: 0; }
        }

        .card-3d-container {
          perspective: 1500px;
          transform-style: preserve-3d;
        }

        .card-3d {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }

        .card-3d:hover {
          transform: rotateX(5deg) rotateY(5deg);
        }

        .card-3d-content {
          position: relative;
          background: rgba(6,4,4,0.8);
          backdrop-filter: blur(10px);
          border-radius: 1rem;
          overflow: hidden;
        }

        .card-shine {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            transparent 0%,
            rgba(255,0,84,0.1) 25%,
            transparent 50%,
            rgba(251,228,11,0.1) 75%,
            transparent 100%
          );
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .card-3d:hover .card-shine {
          opacity: 1;
        }

        .feature-card-container {
          perspective: 1000px;
        }

        .feature-card {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
        }

        .feature-card:hover {
          transform: translateY(-10px) rotateX(10deg);
        }

        .feature-card-content {
          position: relative;
          z-index: 1;
        }

        .icon-container {
          position: relative;
          display: inline-block;
          padding: 1rem;
          background: rgba(255,0,84,0.1);
          border-radius: 50%;
          transition: transform 0.3s ease;
        }

        .feature-card:hover .icon-container {
          transform: scale(1.2) translateZ(20px);
        }

        /* Eliminado el waves-icon */

        .book-now-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          border: none;
          transform-style: preserve-3d;
        }

        .book-now-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: 0.5s;
        }

        .book-now-button:hover::before {
          left: 100%;
        }

        .book-now-button:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 10px 20px rgba(255,0,84,0.3);
        }

        @keyframes shine {
          0% {
            background-position: -100px;
          }
          100% {
            background-position: 500px;
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ripple {
          0% {
            box-shadow: 0 0 0 0 rgba(255,0,84, 0.3),
                        0 0 0 1px rgba(255,0,84, 0.3),
                        0 0 0 3px rgba(255,0,84, 0.3),
                        0 0 0 5px rgba(255,0,84, 0.3);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255,0,84, 0.3),
                        0 0 0 6px rgba(255,0,84, 0.3),
                        0 0 0 12px rgba(255,0,84, 0.3),
                        0 0 0 18px rgba(255,0,84, 0);
          }
        }

        /* Estilos adicionales para mejor contraste y legibilidad */
        .feature-card {
          background: linear-gradient(
            135deg,
            rgba(6,4,4,0.9) 0%,
            rgba(6,4,4,0.8) 100%
          );
          backdrop-filter: blur(10px);
        }

        .feature-card:hover {
          background: linear-gradient(
            135deg,
            rgba(6,4,4,0.95) 0%,
            rgba(6,4,4,0.85) 100%
          );
        }

        .feature-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            135deg,
            transparent 0%,
            rgba(255,0,84,0.1) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .feature-card:hover::after {
          opacity: 1;
        }

        /* Mejoras en la navegación y accesibilidad */
        button:focus, a:focus {
          outline: 2px solid #ff0054;
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .bubble,
          .wave-pattern,
          .wave-pattern-2,
          .card-3d:hover,
          .feature-card:hover,
          .book-now-button:hover {
            animation: none;
            transition: none;
            transform: none;
          }
        }
      `}</style>
    </div>
  )
}