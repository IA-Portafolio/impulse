// app/services/page.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { MousePointerClick } from "lucide-react"
import { useState } from "react"
import { X } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function ServicesPage() {
  const [selectedPontoon, setSelectedPontoon] = useState<string | null>(null)
  return (

    <div className="min-h-screen bg-[#060404] relative overflow-hidden">
      {/* Efectos de fondo mejorados */}
      <div className="absolute inset-0">
        {/* Líneas diagonales animadas */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[1px] w-[200%] bg-gradient-to-r from-transparent via-[#ff0054] to-transparent transform -translate-x-full animate-slide" style={{top: `${i * 20}%`, animationDelay: `${i * 0.5}s`, transform: `rotate(${35}deg) translateX(-50%)`}}/>
          ))}
        </div>

        {/* Burbujas animadas con bordes */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-[#ff0054]/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
              background: `linear-gradient(45deg, rgba(255,0,84,0.05), rgba(251,228,11,0.05))`
            }}
          />
        ))}
        
        {/* Efectos de luz mejorados */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse delay-700 opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse delay-1000 opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[130px] animate-pulse delay-500 opacity-25"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-center text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bebas mb-8 md:mb-16 bg-gradient-to-r from-[#fbe40b] to-[#ff0054] text-transparent bg-clip-text">
          Impulse Services
        </h1>

        <div className="space-y-12 md:space-y-24">
          {/* Pontoons - Tarjeta Interactiva */}
<Card className="bg-[#fefefe]/5 backdrop-blur-sm border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300">
  <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bebas mb-4 sm:mb-6 md:mb-8 text-center">
      <span className="bg-gradient-to-r from-[#fbe40b] to-[#ff0054] text-transparent bg-clip-text">
        Pontoon Rentals
      </span>
    </h2>
    <div className="grid md:grid-cols-2 gap-6 md:gap-12">
      {/* Imagen o Selector de Pontoons */}
      <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
        {selectedPontoon ? (
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full">
            <Carousel className="w-full h-full">
              <CarouselContent>
                {selectedPontoon === "silverwave" ? (
                  // Silverwave Carousel Items
                  <>
                    <CarouselItem>
                      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                        <Image
                          src="/images/silver-1.jpg"
                          alt="Silverwave Pontoon"
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    </CarouselItem>
                    
                  </>
                ) : (
                  // Qwest Carousel Items
                  <>
                    <CarouselItem>
                      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                        <Image
                          src="/images/quest-c.jpg"
                          alt="Qwest Pontoon"
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    </CarouselItem>
                   
                  </>
                )}
              </CarouselContent>
              <CarouselPrevious className="text-[#fefefe] bg-[#ff0054]/50 hover:bg-[#ff0054]" />
              <CarouselNext className="text-[#fefefe] bg-[#ff0054]/50 hover:bg-[#ff0054]" />
            </Carousel>
            
            <Button
              onClick={() => setSelectedPontoon(null)}
              className="absolute top-4 right-4 bg-[#060404]/80 hover:bg-[#060404] border border-[#ff0054] text-[#fefefe] rounded-full p-2transition-all duration-300" size="icon" variant="outline">
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-4 sm:space-y-6 md:space-y-8 bg-[#060404]/50 rounded-lg p-4 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bebas text-[#fefefe] text-center">
              Click to View Images
            </h3>
            
            <div className="space-y-4 sm:space-y-6 w-full">
              <Button 
                onClick={() => setSelectedPontoon("silverwave")}
                className="w-full bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] 
                         text-[#060404] font-bebas text-lg sm:text-xl md:text-2xl py-4 sm:py-6 md:py-8 
                         transition-all duration-300 shadow-lg"
              >
                Silverwave Pontoon
              </Button>
              
              <Button 
                onClick={() => setSelectedPontoon("qwest")}
                className="w-full bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] 
                         text-[#060404] font-bebas text-lg sm:text-xl md:text-2xl py-4 sm:py-6 md:py-8 
                         transition-all duration-300 shadow-lg"
              >
                Qwest Pontoon
              </Button>
            </div>
            
            <div className="p-4 sm:p-6 border border-[#ff0054]/30 rounded-lg bg-[#060404]/80 max-w-md mx-auto mt-4 sm:mt-8">
              <p className="text-base sm:text-lg text-[#fefefe]/80 text-center italic">
                "Experience the ultimate water adventure with our premium pontoon boats equipped with all the features you need for a perfect day on the water."
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        {/* Título de Precios */}
        <div className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] p-[1px] rounded-lg">
          <div className="bg-[#060404] rounded-lg p-3 sm:p-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bebas text-[#fefefe] text-center">Pontoon Rental Prices</h3>
          </div>
        </div>

        {/* Lista de Precios en una sola tarjeta */}
        <div className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] p-[1px] rounded-lg">
          <div className="bg-[#060404] rounded-lg p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-8">
              {/* Columna izquierda */}
              <div className="space-y-2 sm:space-y-4">
                <div className="text-center space-y-1">
                  <p className="text-base sm:text-lg md:text-xl text-[#fefefe] font-bebas">2 Hours</p>
                  <p className="text-lg sm:text-xl md:text-2xl text-[#fbe40b] font-bebas">$300</p>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-base sm:text-lg md:text-xl text-[#fefefe] font-bebas">3 Hours</p>
                  <p className="text-lg sm:text-xl md:text-2xl text-[#fbe40b] font-bebas">$375</p>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-base sm:text-lg md:text-xl text-[#fefefe] font-bebas">4 Hours</p>
                  <p className="text-lg sm:text-xl md:text-2xl text-[#fbe40b] font-bebas">$475</p>
                </div>
              </div>
              
              {/* Columna derecha */}
              <div className="space-y-2 sm:space-y-4">
                <div className="text-center space-y-1">
                  <p className="text-base sm:text-lg md:text-xl text-[#fefefe] font-bebas">6 Hours</p>
                  <p className="text-lg sm:text-xl md:text-2xl text-[#fbe40b] font-bebas">$650</p>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-base sm:text-lg md:text-xl text-[#fefefe] font-bebas">8 Hours</p>
                  <p className="text-lg sm:text-xl md:text-2xl text-[#fbe40b] font-bebas">$850</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Botón antes de Sunset Cruise */}
    <div className="flex justify-center pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8">
      <div className="relative overflow-hidden rounded-lg p-[2px] bg-gradient-to-r from-[#ff0054] to-[#fbe40b] transition-all duration-300 shadow-[0_0_15px_rgba(255,0,84,0.5)] w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px]">
        <Button 
          className="w-full bg-[#060404] hover:bg-[#060404]/90 text-[#fefefe] text-xl sm:text-2xl md:text-3xl px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 transition-transform duration-300 font-bebas relative z-10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#ff0054] before:to-[#fbe40b] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:-z-10 flex items-center justify-center gap-2 sm:gap-3 hover:scale-[1.02]"
          asChild
        >
          <Link href="/barco">
            MORE ABOUT PONTOONS
            <MousePointerClick className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Link>
        </Button>
      </div>
    </div>

    {/* Sunset Cruise */}
    <div className="relative h-[200px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden">
      <Image
        src="/images/atardecer-1.jpg"
        alt="Sunset Cruise"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#060404]/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-[#ff0054] mb-2 sm:mb-4">Special Service</h3>
        <p className="text-xl sm:text-2xl md:text-3xl text-[#fefefe] font-bebas mb-1 sm:mb-2">2 Hour Sunset Cruise w/Captain</p>
        <p className="text-3xl sm:text-4xl md:text-5xl text-[#fbe40b] font-bebas">$399</p>
      </div>
    </div>
  </div>
</Card>
 {/* Car Services */}
<Card id="car-services" className="bg-[#fefefe]/5 backdrop-blur-sm border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300 max-w-[85vw] mx-auto rounded-2xl">
  <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
    <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden">
      <video
        className="w-full h-full object-cover rounded-xl"
        autoPlay
        muted
        playsInline
        loop
      >
        <source src="/videos/1.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bebas mb-4 md:mb-6">
        <span className="bg-gradient-to-r from-[#fbe40b] to-[#ff0054] text-transparent bg-clip-text">
          Car Services
        </span>
      </h2>
      <div className="grid grid-cols-1 gap-3 md:gap-4">
        {/* Botón GMC */}
        <div className="relative overflow-hidden rounded-lg p-[2px] bg-gradient-to-r from-[#ff0054] to-[#fbe40b] transition-all duration-300 shadow-[0_0_15px_rgba(255,0,84,0.5)]">
          <Button 
            className="w-full bg-[#060404] hover:bg-[#060404]/90 text-[#fefefe] text-lg sm:text-xl md:text-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-6 md:py-8 transition-transform duration-300 font-bebas relative z-10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#ff0054] before:to-[#fbe40b] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:-z-10 flex items-center justify-center gap-2 sm:gap-3"
            asChild
          >
            <Link href="/gmc">
              GMC Yukon AT4 XL
              <MousePointerClick className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </Link>
          </Button>
        </div>

        {/* Botón Suburban */}
        <div className="relative overflow-hidden rounded-lg p-[2px] bg-gradient-to-r from-[#ff0054] to-[#fbe40b] transition-all duration-300 shadow-[0_0_15px_rgba(255,0,84,0.5)]">
          <Button 
            className="w-full bg-[#060404] hover:bg-[#060404]/90 text-[#fefefe] text-lg sm:text-xl md:text-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-6 md:py-8 transition-transform duration-300 font-bebas relative z-10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#ff0054] before:to-[#fbe40b] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:-z-10 flex items-center justify-center gap-2 sm:gap-3"
            asChild
          >
            <Link href="/suburban">
              Chevrolet Suburban
              <MousePointerClick className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </Link>
          </Button>
        </div>

      </div>
      <p className="text-base sm:text-lg md:text-xl text-[#fefefe]/80">
        Our premium SUVs redefine luxury transportation. With their spacious interiors, 
        state-of-the-art entertainment systems, and comfortable seating, they are the ideal 
        choice for a variety of occasions. Whether it's a special event, a corporate gathering, 
        an airport transfer, or a luxurious travel experience, our SUVs are designed to meet your needs.
      </p>
      
      {/* Nuevos botones de precios con fondo blanco y texto negro */}
      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 pt-4 sm:pt-6">
        <Button 
          className="bg-[#fefefe] border-3 border-[#ff0054] text-[#060404] hover:bg-[#fefefe]/90 text-lg sm:text-xl md:text-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 font-bebas transition-all duration-300 shadow-md min-w-[180px] sm:min-w-[200px] md:min-w-[220px]"
          disabled
        >
          Price per hour $75
        </Button>
        
        <Button 
          className="bg-[#fefefe] border-3 border-[#fbe40b] text-[#060404] hover:bg-[#fefefe]/90 text-lg sm:text-xl md:text-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 font-bebas transition-all duration-300 shadow-md min-w-[180px] sm:min-w-[200px] md:min-w-[220px]"
          disabled
        >
          Trip to the airport $149
        </Button>
      </div>
    </div>
  </div>
</Card>

         {/* Bounce Houses */}
<Card className="bg-[#fefefe]/5 backdrop-blur-sm border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300">
  <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bebas">
      <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
        BOUNCE HOUSES
      </span>
    </h2>
    
    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#fefefe]/80 leading-relaxed w-full">
      At Impulse Rentals, safety is our top priority. All our bounce houses undergo rigorous safety 
      inspections and are thoroughly cleaned and sanitized before each use. Our professional team 
      handles setup and takedown, ensuring a worry-free experience for your special event.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
      {/* Ice Pops Mega Front Loader */}
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        <h4 className="text-xl sm:text-2xl md:text-3xl font-bebas text-center">
          <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
            Ice Pops Mega Front Loader
          </span>
        </h4>
        <div className="relative h-[250px] sm:h-[300px] md:h-[400px]">
          <Image
            src="/images/bounce-houses.png"
            alt="Ice Pops Mega Front Loader"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Ninja Bounce House */}
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        <h4 className="text-xl sm:text-2xl md:text-3xl font-bebas text-center">
          <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
            Ninja Bounce House
          </span>
        </h4>
        <div className="relative h-[250px] sm:h-[300px] md:h-[400px]">
          <Image
            src="/images/ninja-1.png"
            alt="Ninja Bounce House"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </div>

    {/* Precio y botón */}
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 pt-6 border-t border-[#ff0054]/20">
      <p className="text-xl sm:text-2xl md:text-3xl text-center">
        <span className="text-[#fbe40b]">8 Hours:</span> 
        <span className="text-[#ff0054] font-bebas ml-2">$200</span>
      </p>

      <div className="relative overflow-hidden rounded-lg p-[2px] bg-gradient-to-r from-[#ff0054] to-[#fbe40b] transition-all duration-300 shadow-[0_0_15px_rgba(255,0,84,0.5)]">
        <Button 
          className="w-full bg-[#060404] hover:bg-[#060404]/90 text-[#fefefe] text-lg sm:text-xl md:text-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-6 md:py-8 transition-transform duration-300 font-bebas relative z-10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#ff0054] before:to-[#fbe40b] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:-z-10 flex items-center justify-center gap-2 sm:gap-3"
          asChild
        >
          <Link href="/bounce">
            BOUNCE HOUSES
            <MousePointerClick className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Link>
        </Button>
      </div>
    </div>
  </div>
</Card>

          

          {/* Foam Party */}
<Card id="foam-party-section" className="bg-[#fefefe]/5 backdrop-blur-sm border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300">
  <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bebas">
      <span className="bg-gradient-to-r from-[#fbe40b] to-[#ff0054] text-transparent bg-clip-text">
        Foam Party Packages
      </span>
    </h2>
    
    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#fefefe]/80 leading-relaxed w-full">
      Immerse yourself in an unforgettable, interactive experience with our exhilarating foam party services! Our foam parties transform any event into a vibrant, bubbly wonderland where guests of all ages can dance, laugh, and play in mountains of fluffy foam. Our state-of-the-art foam machines create a magical atmosphere filled with cascading bubbles and pulsating music, encouraging everyone to join in the fun. Perfect for birthdays, festivals, and corporate events, our foam parties promise non-stop fun and an incredible photo backdrop. Get ready to make a splash and create lasting memories with our foam party extravaganza!
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
      {/* Columna Izquierda - Foam Party */}
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        <div className="space-y-4 sm:space-y-6">
          <div className="relative h-[250px] sm:h-[300px] md:h-[400px]">
            <Image
              src="/images/foam-party.png"
              alt="Foam Party"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="relative overflow-hidden rounded-lg p-[2px] bg-gradient-to-r from-[#ff0054] to-[#fbe40b] transition-all duration-300 shadow-[0_0_15px_rgba(255,0,84,0.5)]">
            <Button 
              className="w-full bg-[#060404] hover:bg-[#060404]/90 text-[#fefefe] text-lg sm:text-xl md:text-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 transition-transform duration-300 font-bebas relative z-10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#ff0054] before:to-[#fbe40b] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:-z-10 flex items-center justify-center gap-2 sm:gap-3"
              asChild
            >
              <Link href="/foamdia">
                Foam Party
                <MousePointerClick className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-base sm:text-lg md:text-xl text-[#fefefe]">Foam Party Package <span className="text-[#ff0054]">$315</span></p>
          <p className="text-base sm:text-lg md:text-xl text-[#fefefe]">Color Foam Party Package <span className="text-[#ff0054]">$420</span></p>
        </div>
      </div>

      {/* Columna Central - Glow Foam */}
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        <div className="space-y-4 sm:space-y-6">
          <div className="relative h-[250px] sm:h-[300px] md:h-[400px]">
            <Image
              src="/images/foam-night.jpg"
              alt="Glow Foam Party"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="relative overflow-hidden rounded-lg p-[2px] bg-gradient-to-r from-[#ff0054] to-[#fbe40b] transition-all duration-300 shadow-[0_0_15px_rgba(255,0,84,0.5)]">
            <Button 
              className="w-full bg-[#060404] hover:bg-[#060404]/90 text-[#fefefe] text-lg sm:text-xl md:text-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 transition-transform duration-300 font-bebas relative z-10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#ff0054] before:to-[#fbe40b] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:-z-10 flex items-center justify-center gap-2 sm:gap-3"
              asChild
            >
              <Link href="/foamnoche">
                Glow in the Dark Foam Party
                <MousePointerClick className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </Link>
            </Button>
          </div>
        </div>
        <div>
          <p className="text-base sm:text-lg md:text-xl text-[#fefefe]">Glow in the Dark Foam Party Package <span className="text-[#ff0054]">$445</span></p>
        </div>
      </div>

     {/* Columna Derecha - FoamPit */}
<div className="space-y-4 sm:space-y-6 md:space-y-8">
  <div className="space-y-4 sm:space-y-6">
    <div className="relative h-[250px] sm:h-[300px] md:h-[400px]">
      <Image
        src="/images/foampit.png"
        alt="Foam Pit"
        fill
        className="object-cover rounded-lg"
      />
    </div>
    <div className="flex justify-center">
      <div className="w-[220px] relative overflow-hidden rounded-lg p-[2px] bg-gradient-to-r from-[#ff0054] to-[#fbe40b] shadow-[0_0_15px_rgba(255,0,84,0.5)]">
        <div className="w-full bg-[#060404] text-[#fefefe] text-lg sm:text-xl md:text-2xl px-6 py-4 font-bebas relative z-10 flex items-center justify-center">
          FoamPit
        </div>
      </div>
    </div>
  </div>
  <div>
    <p className="text-base sm:text-lg md:text-xl text-[#fefefe]">Foam Pit Package <span className="text-[#ff0054]">$315</span></p>
  </div>
</div>
    </div>
  </div>
</Card>

{/* DJ Services */}
<Card className="bg-[#fefefe]/5 backdrop-blur-sm border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300">
  <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
    <div className="relative h-[250px] sm:h-[350px] md:h-[500px] md:order-1 order-2">
      <Image
        src="/images/dj-services.png"
        alt="DJ Services"
        fill
        className="object-cover rounded-lg"
      />
    </div>
    <div className="space-y-4 sm:space-y-6 md:space-y-8 md:order-2 order-1">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bebas mb-3 sm:mb-4 md:mb-6">
        <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
          DJ SERVICES
        </span>
      </h2>
      
      <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-[#fefefe]/80 leading-relaxed">
        Transform your event with our professional DJ services. Whether it's a wedding, 
        corporate event, or private party, our experienced DJs will keep your guests 
        entertained with the perfect mix of music.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {/* Botón Book Now */}
        <div className="relative overflow-hidden rounded-lg p-[2px] bg-gradient-to-r from-[#ff0054] to-[#fbe40b] transition-all duration-300 shadow-[0_0_15px_rgba(255,0,84,0.5)]">
          <Button 
            className="w-full bg-[#060404] hover:bg-[#060404]/90 text-[#fefefe] text-lg sm:text-xl md:text-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-6 md:py-8 transition-transform duration-300 font-bebas relative z-10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#ff0054] before:to-[#fbe40b] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:-z-10 flex items-center justify-center gap-2 sm:gap-3"
            asChild
          >
            <Link href="/book-now?service=dj">
  BOOK NOW
  <MousePointerClick className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
</Link>
          </Button>
        </div>

        {/* Botón Contact */}
        <Button 
          className="w-full bg-[#060404] border-2 border-[#fbe40b] hover:bg-[#fbe40b]/10 
                   text-[#fbe40b] text-lg sm:text-xl md:text-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-6 md:py-8 
                   transition-all duration-300 font-bebas
                   flex items-center justify-center gap-2 sm:gap-3"
          asChild
        >
          <Link href="/contact">
            CONTACT
            <MousePointerClick className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Link>
        </Button>
      </div>
    </div>
  </div>
</Card>
        </div>
      </div>

      {/* Estilos para la animación de burbujas */}
       <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
        }

        @keyframes slide {
          0% {
            transform: rotate(35deg) translateX(-100%);
          }
          100% {
            transform: rotate(35deg) translateX(100%);
          }
        }

        .animate-slide {
          animation: slide 8s linear infinite;
        }

        /* Media queries para mejorar la responsividad */
        @media (max-width: 640px) {
          .bubbles {
            display: none;
          }
          
          .ocean-background {
            opacity: 0.2;
          }
        }
        
        /* Optimizaciones para dispositivos con animaciones reducidas */
        @media (prefers-reduced-motion: reduce) {
          .animate-slide,
          .animate-float,
          .animate-pulse {
            animation: none;
          }
          
          .transition-all,
          .transition-transform,
          .transition-opacity,
          .transition-colors {
            transition: none;
          }
        }
      `}</style>
    </div>
  )
}

