// components/sections/PontoonsSection.tsx

"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Info, X } from "lucide-react"; // Importamos iconos para la versión móvil

const PontoonsSection = () => {
  // Estados para controlar la visibilidad de la información en dispositivos móviles
  const [showSilverwaveInfo, setShowSilverwaveInfo] = useState(false);
  const [showQwestInfo, setShowQwestInfo] = useState(false);

  return (
    <section className="relative min-h-screen pb-20 md:pb-32 lg:pb-52 overflow-hidden">
      {/* Fondo con imagen */}
      <div className="absolute inset-0">
        <Image
          src="/images/atardecer-1.jpg"
          alt="Fondo atardecer"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        {/* Título principal - Responsivo */}
        <h2 className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bebas mb-12 md:mb-16 lg:mb-24 text-[#fefefe] leading-tight">
          DISCOVER OUR{' '}
          <span className="font-edo bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
            PONTOONS
          </span>
        </h2>

        {/* Grid responsivo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-24 lg:mb-32">
          {/* Silverwave Pontoon */}
          <div className="relative group z-30 mx-auto w-full max-w-md lg:max-w-full">
            {/* Versión Desktop de la tarjeta de información (solo visible en hover en pantallas grandes) */}
            <div className="hidden lg:block absolute top-[100%] left-[20%] right-[20%] w-[60%] opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] p-4 rounded-xl transition-all duration-300 shadow-xl transform translate-y-2 group-hover:translate-y-4 z-50 mt-4">
              <h4 className="text-[#060404] text-lg font-bebas mb-2">SILVERWAVE</h4>
              <ul className="text-[#060404] space-y-1 text-sm">
                <li>Capacity: Up to 12 Passengers</li>
                <li>Perfect for: Family gatherings, celebrations & water activities</li>
                <li>Features: Bluetooth Premium audio sound system, LED lighting package</li>
                <li>150HP Yamaha Engine for optimal performance</li>
                <li>Luxury trim package</li>
                <li>Superior handling & stability</li>
                <li>Easy to operate - great for beginners</li>
                <li>All safety equipment included</li>
              </ul>
            </div>

            {/* Versión Móvil de la tarjeta de información (aparece al hacer clic) */}
            {showSilverwaveInfo && (
              <div className="lg:hidden fixed inset-0 bg-[#060404]/90 p-4 z-50 overflow-auto">
                <div className="relative bg-gradient-to-r from-[#ff0054] to-[#fbe40b] p-1 rounded-xl max-w-lg mx-auto mt-16">
                  <div className="bg-[#fefefe] p-5 rounded-lg relative">
                    {/* Botón X en la esquina */}
                    <button 
                      onClick={() => setShowSilverwaveInfo(false)}
                      className="absolute top-2 right-2 text-[#060404] hover:text-[#ff0054] transition-colors"
                      aria-label="Cerrar información"
                    >
                      <X size={24} />
                    </button>
                    
                    <h4 className="text-[#060404] text-xl font-bebas mb-3">SILVERWAVE</h4>
                    <ul className="text-[#060404] space-y-2 text-sm">
                      <li>• Capacity: Up to 12 Passengers</li>
                      <li>• Perfect for: Family gatherings, celebrations & water activities</li>
                      <li>• Features: Bluetooth Premium audio sound system, LED lighting package</li>
                      <li>• 150HP Yamaha Engine for optimal performance</li>
                      <li>• Luxury trim package</li>
                      <li>• Superior handling & stability</li>
                      <li>• Easy to operate - great for beginners</li>
                      <li>• All safety equipment included</li>
                    </ul>
                    
                    {/* Botón grande de cerrar en la parte inferior */}
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={() => setShowSilverwaveInfo(false)}
                        className="bg-[#ff0054] hover:bg-[#fbe40b] text-[#fefefe] font-bebas 
                                  rounded-lg px-8 py-3 transition-colors duration-300 
                                  flex items-center justify-center gap-2"
                      >
                        <X size={20} />
                        CERRAR
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contenedor de imagen con altura responsiva */}
            <div className="h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 
                          rounded-xl overflow-hidden shadow-2xl cursor-pointer relative">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <Image
                  src="/images/silver-1c.jpg"
                  alt="Silverwave Pontoon"
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="absolute top-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-[#060404] 
                              text-2xl sm:text-3xl md:text-4xl font-bebas text-center 
                              transition-colors duration-300 group-hover:text-white">
                  Silverwave Pontoon
                </h3>
                
                {/* Botón de info solo visible en móvil */}
                <button
                  onClick={() => setShowSilverwaveInfo(true)}
                  className="lg:hidden absolute bottom-4 right-4 bg-[#ff0054] text-[#fefefe] p-2 rounded-full"
                >
                  <Info size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Qwest Pontoon */}
          <div className="relative group z-20 mx-auto w-full max-w-md lg:max-w-full">
            {/* Versión Desktop de la tarjeta de información (solo visible en hover en pantallas grandes) */}
            <div className="hidden lg:block absolute top-[100%] left-[20%] right-[20%] w-[60%] opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] p-4 rounded-xl transition-all duration-300 shadow-xl transform translate-y-2 group-hover:translate-y-4 z-50 mt-4">
              <h4 className="text-[#060404] text-lg font-bebas mb-2">QWEST</h4>
              <ul className="text-[#060404] space-y-1 text-sm">
                <li>Capacity: Up to 13 Passengers</li>
                <li>Perfect for: Family gatherings, celebrations & water activities</li>
                <li>Features: Bluetooth Premium audio sound system, LED lighting package</li>
                <li>150HP Yamaha Engine for optimal performance</li>
                <li>Luxury trim package</li>
                <li>Superior handling & stability</li>
                <li>Easy to operate - great for beginners</li>
                <li>All safety equipment included</li>
              </ul>
            </div>

            {/* Versión Móvil de la tarjeta de información (aparece al hacer clic) */}
            {showQwestInfo && (
              <div className="lg:hidden fixed inset-0 bg-[#060404]/90 p-4 z-50 overflow-auto">
                <div className="relative bg-gradient-to-r from-[#ff0054] to-[#fbe40b] p-1 rounded-xl max-w-lg mx-auto mt-16">
                  <div className="bg-[#fefefe] p-5 rounded-lg relative">
                    {/* Botón X en la esquina */}
                    <button 
                      onClick={() => setShowQwestInfo(false)}
                      className="absolute top-2 right-2 text-[#060404] hover:text-[#ff0054] transition-colors"
                      aria-label="Cerrar información"
                    >
                      <X size={24} />
                    </button>
                    
                    <h4 className="text-[#060404] text-xl font-bebas mb-3">QWEST</h4>
                    <ul className="text-[#060404] space-y-2 text-sm">
                      <li>• Capacity: Up to 13 Passengers</li>
                      <li>• Perfect for: Family gatherings, celebrations & water activities</li>
                      <li>• Features: Bluetooth Premium audio sound system, LED lighting package</li>
                      <li>• 150HP Yamaha Engine for optimal performance</li>
                      <li>• Luxury trim package</li>
                      <li>• Superior handling & stability</li>
                      <li>• Easy to operate - great for beginners</li>
                      <li>• All safety equipment included</li>
                    </ul>
                    
                    {/* Botón grande de cerrar en la parte inferior */}
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={() => setShowQwestInfo(false)}
                        className="bg-[#ff0054] hover:bg-[#fbe40b] text-[#fefefe] font-bebas 
                                  rounded-lg px-8 py-3 transition-colors duration-300 
                                  flex items-center justify-center gap-2"
                      >
                        <X size={20} />
                        CLOSE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contenedor de imagen con altura responsiva */}
            <div className="h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 
                          rounded-xl overflow-hidden shadow-2xl cursor-pointer">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <Image
                  src="/images/quest-c.jpg"
                  alt="Qwest Pontoon"
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="absolute top-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-[#060404] 
                              text-2xl sm:text-3xl md:text-4xl font-bebas text-center 
                              transition-colors duration-300 group-hover:text-white">
                  Qwest Pontoon
                </h3>
                
                {/* Botón de info solo visible en móvil */}
                <button
                  onClick={() => setShowQwestInfo(true)}
                  className="lg:hidden absolute bottom-4 right-4 bg-[#ff0054] text-[#fefefe] p-2 rounded-full"
                >
                  <Info size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botón movido debajo de las tarjetas - Con tamaño responsivo */}
        <div className="text-center pt-8 md:pt-12 relative z-10">
          <Button 
            className="bg-[#ff0054] text-[#fefefe] hover:bg-[#fbe40b] font-bebas 
                      text-xl sm:text-2xl md:text-3xl 
                      px-8 sm:px-12 md:px-16 
                      py-4 sm:py-6 md:py-8
                      transition-all duration-300 transform hover:scale-105"
            asChild
          >
            <Link href="/barco">Read More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PontoonsSection;