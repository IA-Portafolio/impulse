// components/sections/services.tsx

"use client"

import React from 'react';

// ============================================================================
// LUXURY TRANSPORT / PREMIUM LUXURY FLEET - CÓDIGO COMENTADO PARA USO FUTURO
// ============================================================================
// import React, { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import Image from "next/image";
// import { Car, Users, Gauge, Star, Activity, Shield } from 'lucide-react';
//
// const LuxuryTransport = () => {
//   // Estado para controlar el índice de la imagen actual para cada vehículo
//   const [currentImageIndex, setCurrentImageIndex] = useState({
//     yukon: 0,
//     suburban: 0
//   });
//
//   // Arrays con las rutas de las imágenes para cada vehículo
//   const yukonImages = [
//     '/images/Gmc/1.jpg',
//     '/images/Gmc/2.jpg',
//     '/images/Gmc/3.jpg',
//     '/images/Gmc/4.png'
//   ];
//
//   const suburbanImages = [
//     '/images/sub/frente.png',
//     '/images/sub/frente1.png',
//     '/images/sub/lado1.png',
//     '/images/sub/lado2.png'
//   ];
//
//   // Efecto para cambiar automáticamente las imágenes
//   useEffect(() => {
//     const intervals = {
//       yukon: setInterval(() => {
//         setCurrentImageIndex(prev => ({
//           ...prev,
//           yukon: (prev.yukon + 1) % yukonImages.length
//         }));
//       }, 3000),
//       suburban: setInterval(() => {
//         setCurrentImageIndex(prev => ({
//           ...prev,
//           suburban: (prev.suburban + 1) % suburbanImages.length
//         }));
//       }, 3000)
//     };
//
//     // Limpieza de los intervalos
//     return () => {
//       Object.values(intervals).forEach(clearInterval);
//     };
//   }, []);
//
//   // Características/features de cada vehículo
//   const features = {
//     yukon: [
//       { icon: Car, text: "Powerful 6.2L V8 Engine" },
//       { icon: Users, text: "max 6 passengers" },
//       { icon: Gauge, text: "420 Horsepower" },
//       { icon: Star, text: "Premium Entertainment System" },
//       { icon: Shield, text: "Advanced Safety Features" },
//       { icon: Activity, text: "Premium Off-Road Package" }
//     ],
//     suburban: [
//       { icon: Car, text: "Robust 5.3L V8 Engine" },
//       { icon: Users, text: "max 6 passengers" },
//       { icon: Gauge, text: "355 Horsepower" },
//       { icon: Star, text: "Premium Sound System" },
//       { icon: Shield, text: "Enhanced Safety Suite" },
//       { icon: Activity, text: "Magnetic Ride Control" }
//     ]
//   };
//
//   // Función para renderizar cada tarjeta de vehículo
//   const renderVehicleCard = (title: string, images: string[], currentImage: number, features: any) => (
//     <div className="group mb-12 md:mb-24">
//       <div className="bg-gradient-to-br from-[#060404]/80 to-[#060404]/40 backdrop-blur-sm rounded-xl p-4 md:p-8
//                     transform transition-all duration-500 hover:scale-[1.02]
//                     border border-[#ff0054]/10 hover:border-[#ff0054]/30
//                     shadow-lg hover:shadow-[#ff0054]/20
//                     relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-[#ff0054]/0 via-[#ff0054]/5 to-[#fbe40b]/0
//                       opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
//
//         <h2 className="text-3xl md:text-4xl font-bebas text-[#fefefe] text-center mb-4 md:mb-8 relative">
//           {title}
//         </h2>
//
//         <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
//           <div className="flex-1">
//             <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden
//                           shadow-[0_0_20px_rgba(255,0,84,0.1)]
//                           group-hover:shadow-[0_0_30px_rgba(255,0,84,0.2)]
//                           transition-all duration-500">
//               {images.map((img, index) => (
//                 <div
//                   key={img}
//                   className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 transform ${
//                     currentImage === index
//                       ? 'opacity-100 scale-100'
//                       : 'opacity-0 scale-110'
//                   }`}
//                 >
//                   <div className="relative w-full h-full transform transition-transform duration-700
//                                 group-hover:scale-110">
//                     <Image
//                       src={img}
//                       alt={`${title} ${index + 1}`}
//                       fill
//                       style={{ objectFit: 'cover' }}
//                       priority
//                     />
//                   </div>
//                 </div>
//               ))}
//
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
//                 {images.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`h-2 w-2 rounded-full transition-all duration-300 ${
//                       currentImage === index
//                         ? 'w-6 bg-[#fbe40b]'
//                         : 'bg-[#fefefe]/50'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//
//           <div className="flex-1 flex flex-col justify-center mt-6 lg:mt-0">
//             <div className="grid grid-cols-1 gap-4 md:gap-6">
//               {features.map((feature: any, index: number) => (
//                 <div key={index} className="flex items-center space-x-4 text-[#fefefe]/80 group-hover:text-[#fefefe] transition-colors duration-300 bg-[#060404]/50 p-3 md:p-4 rounded-lg">
//                   <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-[#ff0054] flex-shrink-0" />
//                   <span className="text-base md:text-lg">{feature.text}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
//
//   return (
//     <section className="relative min-h-screen bg-[#060404] overflow-hidden py-12 md:py-24">
//       <div className="absolute inset-0">
//         <Image
//           src="/images/fondo-camionetas.jpg"
//           alt="Fondo Camionetas"
//           fill
//           className="object-cover opacity-20"
//         />
//         <div className="absolute inset-0 bg-[#060404]/60" />
//       </div>
//
//       <div className="relative mb-10 md:mb-20">
//         <h1 className="text-center text-4xl sm:text-5xl md:text-7xl font-bebas tracking-wider leading-tight px-4">
//           <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
//             Premium Luxury Fleet
//           </span>
//         </h1>
//       </div>
//
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {renderVehicleCard("GMC Yukon AT4 XL", yukonImages, currentImageIndex.yukon, features.yukon)}
//         {renderVehicleCard("Chevrolet Suburban", suburbanImages, currentImageIndex.suburban, features.suburban)}
//
//         <div className="text-center mt-12 md:mt-24 space-y-6 md:space-y-10">
//           <h3 className="text-2xl sm:text-3xl md:text-5xl font-acumin text-[#fefefe]">
//             Experience Luxury Car
//           </h3>
//
//           <Button
//             size="lg"
//             className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054]
//                      text-[#fefefe] font-bebas text-xl md:text-2xl px-8 md:px-12 py-6 md:py-8
//                      transform hover:scale-105 transition-all duration-300
//                      shadow-lg hover:shadow-[#ff0054]/50 max-w-full"
//             asChild
//           >
//             <Link href="/services#car-services">Read More</Link>
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };
// ============================================================================
// FIN DEL CÓDIGO COMENTADO DE LUXURY TRANSPORT
// ============================================================================

// Componente vacío que no renderiza nada (el código original está arriba comentado)
const LuxuryTransport = () => {
  return null;
};

export default LuxuryTransport;
