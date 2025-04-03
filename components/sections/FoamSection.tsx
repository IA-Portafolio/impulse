// components/sections/FoamSection.tsx

"use client"

import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";

const FoamSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  // Función para manejar cuando el usuario cambia el estado de silencio manualmente
  const toggleAudio = () => {
    setUserInteracted(true);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    
    // Configurar el video cuando esté disponible
    if (videoRef.current) {
      // Iniciar siempre en silencio (requisito de navegadores)
      videoRef.current.muted = true;
      setIsMuted(true);
      
      // Intentar iniciar la reproducción
      videoRef.current.play().catch(err => {
        console.warn("No se pudo iniciar la reproducción automática:", err);
      });
    }

    // Crear el observador de intersección
    if (sectionRef.current && videoRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          
          if (entry.isIntersecting) {
            // La sección está visible
            if (!userInteracted && videoRef.current) {
              // Si el usuario no ha interactuado manualmente, activamos el audio
              // Pequeño retraso para asegurar que la sección está realmente en vista
              setTimeout(() => {
                if (videoRef.current) {
                  try {
                    videoRef.current.muted = false;
                    setIsMuted(false);
                  } catch (e) {
                    console.error("Error al activar audio:", e);
                  }
                }
              }, 300);
            }
          } else {
            // La sección no está visible, silenciamos el video
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
            }
          }
        },
        {
          threshold: 0.5, // Cuando al menos el 50% de la sección es visible
        }
      );
      
      // Iniciar observación
      observer.observe(sectionRef.current);
    }
    
    // Silenciar al cambiar de página
    const handleRouteChange = () => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    };

    window.addEventListener('beforeunload', handleRouteChange);
    
    // Limpieza
    return () => {
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener('beforeunload', handleRouteChange);
    };
  }, [userInteracted]);

  return (
    <section 
      ref={sectionRef}
      id="foam-party-section"
      className="relative bg-[#060404] overflow-hidden py-12 sm:py-16 md:py-20"
    >
      {/* Fondo con imagen opaca */}
      <div className="absolute inset-0">
        <Image
          src="/images/fondo-espuma.jpg"
          alt="Fondo Foam Party"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#060404]/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Título con gradiente */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-edo mb-4 sm:mb-6 md:mb-8 text-center">
          <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
            FOAM PARTY
          </span>
        </h2>

        {/* Frase corta */}
        <p className="text-[#fefefe] text-xl sm:text-2xl md:text-3xl font-acumin mb-6 sm:mb-8 md:mb-12 text-center">
          Dive Into The Foam Magic
        </p>

        {/* Contenedor del video - Altura reducida en móviles */}
        <div className="relative w-full max-w-6xl h-[200px] sm:h-[300px] md:h-[400px] rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8 md:mb-12 transform hover:scale-105 transition-transform duration-500 shadow-[0_0_30px_rgba(255,0,84,0.3)]">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/FOAMPARTY.webm" type="video/webm" />
            <source src="/videos/FOAMPARTY.mp4" type="video/mp4" />
            Tu navegador no soporta el tag de video.
          </video>
          
          {/* Botón de control de audio */}
          <Button
            onClick={toggleAudio}
            className="absolute bottom-4 right-4 z-30 bg-[#060404]/70 hover:bg-[#060404] 
                     border-2 border-[#ff0054] text-[#fefefe] rounded-full p-3
                     transition-all duration-300 hover:scale-110"
            size="icon"
            variant="outline"
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted ? (
              <VolumeX className="h-6 w-6 text-[#ff0054]" />
            ) : (
              <Volume2 className="h-6 w-6 text-[#ff0054]" />
            )}
          </Button>
          
          {/* Efecto de borde al hover */}
          <div className="absolute inset-0 border-2 border-transparent 
                         hover:border-[#ff0054] rounded-xl sm:rounded-2xl transition-colors 
                         duration-300"></div>
        </div>

        {/* Botón */}
        <Button 
          size="lg" 
          className="bg-[#ff0054] hover:bg-[#ff0054]/90 text-[#fefefe] font-bebas 
                   text-xl sm:text-2xl md:text-3xl 
                   px-8 sm:px-12 md:px-16 
                   py-4 sm:py-6 md:py-8 
                   transform hover:scale-105 transition-all duration-300
                   shadow-md hover:shadow-lg"
          asChild
        >
          <Link href="/services#foam-party-section">Read More</Link>
        </Button>
      </div>

      {/* Efectos de degradado superior e inferior */}
      <div className="absolute bottom-0 left-0 w-full h-16 sm:h-20 md:h-24 bg-gradient-to-t from-[#060404] to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-16 sm:h-20 md:h-24 bg-gradient-to-b from-[#060404] to-transparent"></div>
    </section>
  );
};

export default FoamSection;