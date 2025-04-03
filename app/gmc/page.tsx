// app/gmc/page.tsx

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Car, 
  Gauge, 
  Battery, 
  AlertCircle,
  Fuel 
} from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export default function GMCPage() {
  const [videoLoaded, setVideoLoaded] = useState({
    front: false,
    back: false,
    cargo: false
  });

  useEffect(() => {
    // Esta función se usa para verificar si los videos se han cargado
    const checkVideoLoaded = () => {
      const frontVideo = document.getElementById('frontVideo') as HTMLVideoElement;
      const backVideo = document.getElementById('backVideo') as HTMLVideoElement;
      const cargoVideo = document.getElementById('cargoVideo') as HTMLVideoElement;
      
      if (frontVideo) {
        frontVideo.onloadeddata = () => setVideoLoaded(prev => ({...prev, front: true}));
      }
      if (backVideo) {
        backVideo.onloadeddata = () => setVideoLoaded(prev => ({...prev, back: true}));
      }
      if (cargoVideo) {
        cargoVideo.onloadeddata = () => setVideoLoaded(prev => ({...prev, cargo: true}));
      }
    };
    
    checkVideoLoaded();
  }, []);

  const features = [
    {
      icon: Car,
      title: "Engine & Performance",
      specs: [
        "6.2L V8 Engine",
        "420 Horsepower",
        "AT4 4x4 System"
      ]
    },
    {
      icon: Gauge,
      title: "Transmission",
      specs: [
        "10-Speed Automatic Transmission",
        "All-Wheel Drive",
        "Adaptive Suspension"
      ]
    },
    {
      icon: Battery,
      title: "Technology",
      specs: [
        "10.2\" Touchscreen Display",
        "Apple CarPlay & Android Auto",
        "Bose Premium Sound System"
      ]
    },
    {
      icon: AlertCircle,
      title: "Safety",
      specs: [
        "Forward Collision Alert",
        "Lane Keep Assist",
        "360° Camera System"
      ]
    },
    {
      icon: Fuel,
      title: "Efficiency",
      specs: [
        "Dynamic Fuel Management",
        "Start/Stop Technology",
        "ECO Drive Mode"
      ]
    }
  ]

  return (
    <div className="relative min-h-screen bg-[#060404]">
      {/* Top videos section - adaptado para apilar en móvil con altura ajustada */}
      <div className="min-h-[50vh] sm:min-h-[70vh] md:min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
        {/* Left Video - con skeleton loader */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl h-[30vh] sm:h-[40vh] md:h-auto">
          {/* Skeleton loader */}
          {!videoLoaded.front && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#060404] to-[#121212] animate-pulse"></div>
          )}
          
          <video
            id="frontVideo"
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            loop
          >
            <source src="/videos/adelantegmc.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#060404]/40 flex items-center justify-center">
            <h2 className="text-[#fefefe] text-3xl sm:text-4xl md:text-6xl font-bebas text-center px-4">
              Experience 
              <span className="block bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text mt-2">
                Ultimate Control
              </span>
            </h2>
          </div>
        </div>

        {/* Right Video */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl h-[30vh] sm:h-[40vh] md:h-auto">
          {/* Skeleton loader */}
          {!videoLoaded.back && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#060404] to-[#121212] animate-pulse"></div>
          )}
          
          <video
            id="backVideo"
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            loop
          >
            <source src="/videos/atrasgmc.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#060404]/40 flex items-center justify-center">
            <h2 className="text-[#fefefe] text-3xl sm:text-4xl md:text-6xl font-bebas text-center px-4">
              Luxury Beyond
              <span className="block bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text mt-2">
                Expectations
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Technical Information Section */}
      <div className="relative py-12 sm:py-16 md:py-24">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/fondogmc.jpg"
            alt="GMC Background"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[#060404]/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bebas mb-8 sm:mb-12 md:mb-20">
            <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
              GMC YUKON AT4 XL
            </span>
          </h2>

          {/* Features Grid - ajustado para todos los tamaños de pantalla */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-20">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="group relative bg-gradient-to-br from-[#060404]/95 to-[#060404]/80 backdrop-blur-sm border-2 border-[#ff0054]/10 hover:border-[#ff0054]transition-all duration-500 rounded-xl shadow-lg hover:shadow-[#ff0054]/20p-4 sm:p-6"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff0054]/0 via-[#ff0054]/5 to-[#fbe40b]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-xl" />

                {/* Card content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 pb-2 sm:pb-4 border-b border-[#ff0054]/20">
                    <div className="bg-gradient-to-br from-[#ff0054] to-[#fbe40b] p-2 sm:p-3 rounded-lg">
                      <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#fefefe]" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bebas text-[#fefefe]">{feature.title}</h3>
                  </div>

                  {/* Specs */}
                  <ul className="space-y-2 sm:space-y-4">
                    {feature.specs.map((spec, i) => (
                      <li key={i} className="text-[#fefefe]/90 text-base sm:text-lg">
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>

          {/* Cargo Space Section - optimizado para móvil */}
          <div className="relative mb-10 sm:mb-12 md:mb-20">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-[#fefefe] text-center mb-6 sm:mb-8">Cargo Space</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="relative h-[200px] sm:h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl">
                {/* Skeleton loader */}
                {!videoLoaded.cargo && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#060404] to-[#121212] animate-pulse"></div>
                )}
                
                <video
                  id="cargoVideo"
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                  loop
                >
                  <source src="/videos/bgmc.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="space-y-4 sm:space-y-6 text-[#fefefe] p-2">
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-xl sm:text-2xl font-bebas">Maximum Cargo Capacity</p>
                  <ul className="space-y-2 sm:space-y-4 text-base sm:text-lg ml-4">
                    <li>Maximum cargo space: 144.7 cubic feet</li>
                    <li>Behind second row: 93.8 cubic feet</li>
                    <li>Behind third row: 41.5 cubic feet</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#fefefe] font-bebas text-lg sm:text-xl md:text-2xl px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-8transform hover:scale-105 transition-all duration-300shadow-lg hover:shadow-[#ff0054]/50"
              asChild
            >
             <Link href="/book-now?service=transport">Book Now</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Estilos para dispositivos táctiles */}
      <style jsx global>{`
        @media (hover: none) {
          .hover\\:scale-105:active {
            transform: scale(1.05);
          }
          .hover\\:border-\\[\\#ff0054\\]:active {
            border-color: #ff0054;
          }
          .hover\\:shadow-\\[\\#ff0054\\]\\/20:active {
            box-shadow: 0 10px 15px -3px rgba(255, 0, 84, 0.2), 0 4px 6px -4px rgba(255, 0, 84, 0.2);
          }
          .group:active .group-hover\\:opacity-100 {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}