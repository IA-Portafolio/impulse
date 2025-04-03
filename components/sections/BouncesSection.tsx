// components/sections/BouncesSection.tsx

"use client"

import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Volume2, VolumeX } from "lucide-react";

const BouncesSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [userPrefersMuted, setUserPrefersMuted] = useState(true);

  // Función para manejar cuando el usuario cambia el estado de silencio manualmente
  const toggleAudio = () => {
    const newMutedState = !isMuted;
    setUserPrefersMuted(newMutedState); // Recordar la preferencia del usuario

    if (videoRef.current) {
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let observer: IntersectionObserver | null = null;
    
    // Configurar el video cuando esté disponible
    if (videoRef.current) {
      // Asegurarnos de que el video empiece siempre en silencio
      videoRef.current.muted = true;
      setIsMuted(true);
      
      // Intentar iniciar la reproducción (importante en móviles)
      videoRef.current.play().catch(err => {
        console.warn("No se pudo iniciar la reproducción automática:", err);
      });
    }

    // Crear el observador de intersección si ambas referencias están disponibles
    if (sectionRef.current && videoRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const visiblePercentage = entry.intersectionRatio * 100;
          
          // Limpiar cualquier temporizador pendiente
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          
          if (entry.isIntersecting && visiblePercentage > 50) {
            // Solo cambiamos a sonido activado si el usuario no ha elegido silenciar manualmente
            timeoutId = setTimeout(() => {
              if (!userPrefersMuted && videoRef.current) {
                videoRef.current.muted = false;
                setIsMuted(false);
                console.log("Sonido activado automáticamente");
              }
            }, 1000); // Retrasamos la activación del sonido para evitar cambios rápidos
          } else {
            // Sección no visible o poco visible - silenciar
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
            }
          }
        },
        {
          // Múltiples umbrales para detección más precisa
          threshold: [0, 0.25, 0.5, 0.75, 1.0],
          // Ajustar el área de detección
          rootMargin: "-10% 0px"
        }
      );
      
      // Iniciar observación
      observer.observe(sectionRef.current);
    }
    
    // Limpieza
    return () => {
      if (observer) {
        observer.disconnect();
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [userPrefersMuted]); // Dependencia en userPrefersMuted para reaccionar a cambios en la preferencia del usuario

  return (
    <section 
      ref={sectionRef}
      id="bounce-house-section"
      className="relative min-h-screen bg-gradient-to-b from-[#060404] to-[#1a1a1a] overflow-hidden py-10 sm:py-16 md:py-20"
    >
      {/* Elementos decorativos del fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Burbujas animadas */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[#ff0054]/10 to-[#fbe40b]/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        
        {/* Efectos de luz */}
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[100px] md:blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[100px] md:blur-[128px] animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título principal */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-edo tracking-wider leading-tight inline-block">
            <span className="bg-gradient-to-r from-[#fbe40b] to-[#ff0054] text-transparent bg-clip-text">
              Ice Pops Mega Front Loader and Ninja House<br />Combo Bounce House
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Contenido de texto - Izquierda */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="bg-[#060404]/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 border border-[#ff0054]/20 h-auto md:h-[500px] lg:h-[600px] flex flex-col justify-between shadow-xl shadow-[#ff0054]/10">
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-acumin text-[#fefefe] leading-relaxed mb-4 sm:mb-6 md:mb-8">
                  Are you ready for an unforgettable time with our Ice Pops Mega Front Bounce House?
                </h3>
                
                <p className="text-lg sm:text-xl md:text-2xl text-[#fefefe]/80 leading-relaxed mb-6 sm:mb-8 md:mb-12">
                  The kids will love this one for sure, but so will the parents! This bounce house has 
                  a capacity of 12 persons, and can be converted to a wet bounce house slide.
                </p>
                
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <Sparkles className="text-[#fbe40b] h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                    <span className="text-[#fefefe]/80 text-base sm:text-lg md:text-xl">Bounce area with splash pad</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <Sparkles className="text-[#fbe40b] h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                    <span className="text-[#fefefe]/80 text-base sm:text-lg md:text-xl">Exciting climbing wall</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <Sparkles className="text-[#fbe40b] h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                    <span className="text-[#fefefe]/80 text-base sm:text-lg md:text-xl">6 ft. slide and tunnel</span>
                  </div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#fefefe] font-bebas text-xl sm:text-2xl md:text-3xl px-6 sm:px-10 md:px-16 py-4 sm:py-6 md:py-8 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#ff0054]/50 w-fit mx-auto mt-6 sm:mt-8 md:mt-0"
                asChild
              >
                <Link href="/bounce">Read More</Link>
              </Button>
            </div>
          </div>

          {/* Video Container - Derecha - CORREGIDO para eliminar espacios negros */}
          <div className="lg:col-span-5 relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 w-full h-full group">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-center"
              >
                <source src="/images/ninja-homepag.mp4" type="video/mp4" />
                <source src="/videos/Reel-bouncehouse.mp4" type="video/mp4" />
                Tu navegador no soporta el tag de video.
              </video>

              
              {/* Efecto de borde al hover */}
              <div className="absolute inset-0 border-2 border-transparent hover:border-[#ff0054] rounded-xl sm:rounded-2xl transition-colors duration-300"></div>
            </div>
          </div>
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
      `}</style>
    </section>
  );
};

export default BouncesSection;