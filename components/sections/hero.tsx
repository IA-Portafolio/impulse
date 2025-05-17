// components/sections/hero.tsx

"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function Hero() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [videosLoaded, setVideosLoaded] = useState(false)
  const [isTextTransitioning, setIsTextTransitioning] = useState(false)
  const firstVideoRef = useRef<HTMLVideoElement>(null)
  const secondVideoRef = useRef<HTMLVideoElement>(null)
  const isTransitioning = useRef(false)

  const videos = [
    {
      src: "/videos/portada1.mp4",
      titleLine1: "CREATING",
      titleLine2: "UNFORGETTABLE MOMENTS"
    },
    {
      src: "/videos/video-foam-nocturno.mp4",
      titleLine1: "FUN",
      titleLine2: "FOR EVERYONE"
    }
  ]

  const startVideoTransition = (currentRef: HTMLVideoElement, nextRef: HTMLVideoElement, nextIndex: number) => {
    if (!isTransitioning.current) {
      isTransitioning.current = true
      
      // Iniciar transición del texto
      setIsTextTransitioning(true)
      
      // Preparar el siguiente video
      nextRef.currentTime = 0
      nextRef.play().catch(console.error)
      
      // Transición suave del video actual al siguiente
      nextRef.style.opacity = '0'
      setTimeout(() => {
        nextRef.style.opacity = '1'
      }, 50)

      // Transición suave del video actual
      setTimeout(() => {
        currentRef.style.opacity = '0'
        setTimeout(() => {
          currentRef.pause()
          currentRef.currentTime = 0
          setCurrentVideo(nextIndex)
          setIsTextTransitioning(false)
          isTransitioning.current = false
        }, 1000)
      }, 1000)
    }
  }

  useEffect(() => {
    const firstVideo = firstVideoRef.current
    const secondVideo = secondVideoRef.current

    if (firstVideo && secondVideo) {
      // Esperar a que ambos videos estén cargados
      const handleCanPlay = () => {
        if (firstVideo.readyState >= 3 && secondVideo.readyState >= 3) {
          setVideosLoaded(true)
          firstVideo.play().catch(console.error)
        }
      }

      firstVideo.addEventListener('canplay', handleCanPlay)
      secondVideo.addEventListener('canplay', handleCanPlay)

      // Monitorear el tiempo del primer video
      const checkFirstVideoTime = () => {
        if (firstVideo && secondVideo && firstVideo.currentTime >= firstVideo.duration - 1.5) {
          startVideoTransition(firstVideo, secondVideo, 1)
        }
      }

      // Monitorear el tiempo del segundo video
      const checkSecondVideoTime = () => {
        if (firstVideo && secondVideo && secondVideo.currentTime >= secondVideo.duration - 1.5) {
          startVideoTransition(secondVideo, firstVideo, 0)
        }
      }

      firstVideo.addEventListener('timeupdate', checkFirstVideoTime)
      secondVideo.addEventListener('timeupdate', checkSecondVideoTime)

      return () => {
        firstVideo.removeEventListener('canplay', handleCanPlay)
        secondVideo.removeEventListener('canplay', handleCanPlay)
        firstVideo.removeEventListener('timeupdate', checkFirstVideoTime)
        secondVideo.removeEventListener('timeupdate', checkSecondVideoTime)
      }
    }
  }, [])

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Videos */}
      <div className="absolute inset-0">
        <video 
          ref={firstVideoRef}
          muted 
          playsInline
          preload="auto"
          className="absolute w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: videosLoaded ? 1 : 0 }}
        >
          <source src={videos[0].src} type="video/mp4" />
        </video>

        <video 
          ref={secondVideoRef}
          muted 
          playsInline
          preload="auto"
          className="absolute w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: 0 }}
        >
          <source src={videos[1].src} type="video/mp4" />
        </video>
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#060404]/40" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-[#fefefe]">
        {/* Logo - Responsive size adjustments */}
        <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[350px] lg:h-[350px] mb-4 sm:mb-6 md:mb-8 relative">
          <Image
            src="/logo.png"
            alt="Impulse Rentals Logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        
        {/* Títulos - Responsive font sizes with transition */}
        <div className="flex flex-col items-center space-y-0 sm:space-y-1 mb-4 sm:mb-6 md:mb-8">
          <h2 
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-edo transition-opacity duration-1000 ${
              isTextTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ 
              background: `linear-gradient(to right, #ff0054, #fbe40b)`, 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              letterSpacing: '0.05em', 
              padding: '0 0.5rem' 
            }}
          >
            {videos[currentVideo].titleLine1}
          </h2>
          <h2 
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-edo transition-opacity duration-1000 ${
              isTextTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ 
              background: `linear-gradient(to right, #ff0054, #fbe40b)`, 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              letterSpacing: '0.05em', 
              padding: '0 0.5rem' 
            }}
          >
            {videos[currentVideo].titleLine2}
          </h2>
        </div>
        
        {/* Botones - Responsive layout and sizing */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full max-w-xs sm:max-w-md mx-auto justify-center">
          <Button 
            size="lg" 
            className="bg-[#ff0054] hover:bg-[#ff0054]/90 font-acumin text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 w-full sm:w-auto"
            asChild
          >
            <Link href="/services">Explore Services</Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-[#fbe40b] text-[#fbe40b] hover:bg-[#fbe40b]/10 font-acumin text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 w-full sm:w-auto"
            asChild
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>

      <style jsx>{`
        .transition-opacity {
          transition: opacity 2s ease-in-out;
        }
      `}</style>
    </section>
  )
}