// app/about/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { 
  Users, 
  Heart, 
  Trophy, 
  Target, 
  MousePointerClick  
} from "lucide-react"

// Define team member structure
interface TeamMember {
  id: number
  name: string
  bio: string
  imageUrl?: string
  useIcon?: boolean
}

// Team members data
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Adalberto Marte",
    bio: "With over 10 years of experience in entertainment and events, Adalberto founded Impulse Rentals with the vision of creating unforgettable experiences for everyone.",
    imageUrl: "/images/about1.png"
  },
  {
    id: 2,
    name: "Valentina Holguin",
    bio: "Valentina is our boat expert, with nautical safety certification and unparalleled knowledge of our pontoons.",
    imageUrl: "/images/about3.png"
  },
  {
    id: 3,
    name: "Miguel Molina",
    bio: "Miguel's creativity has taken our foam parties to another level, creating unique environments for every occasion.",
    imageUrl: "/images/about2.png"
  }
]

// Company values
const companyValues = [
  {
    icon: Heart,
    title: "Passion",
    description: "We love what we do and put our heart into every experience we create."
  },
  {
    icon: Trophy,
    title: "Excellence",
    description: "We strive to exceed expectations in every aspect of our service."
  },
  {
    icon: Users,
    title: "Community",
    description: "We build lasting relationships with our customers, suppliers, and collaborators."
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We constantly look for new ways to improve and offer unique experiences."
  }
]

export default function AboutPage() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)

  return (
    <div className="relative min-h-screen bg-[#060404] pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24 overflow-hidden">
      {/* Background with static gradients - ajustados para ser responsivos */}
      <div className="absolute inset-0 z-0">
        {/* Light effects - más pequeños en móvil, más grandes en pantallas grandes */}
        <div className="absolute top-0 left-0 w-[250px] sm:w-[350px] md:w-[500px] lg:w-[600px] h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[100px] md:blur-[120px] lg:blur-[150px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[250px] sm:w-[350px] md:w-[500px] lg:w-[600px] h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[100px] md:blur-[120px] lg:blur-[150px] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] md:w-[650px] lg:w-[800px] h-[300px] sm:h-[500px] md:h-[650px] lg:h-[800px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[100px] sm:blur-[130px] md:blur-[150px] lg:blur-[180px] opacity-10"></div>
      </div>

      {/* Main content - padding ajustado para dispositivos */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - tamaños y espaciado responsivos */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bebas mb-6 sm:mb-8 relative inline-block">
            <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
              WHO WE ARE
            </span>
            {/* Title decoration - ajustado para ser proporcional al texto */}
            <div className="absolute -right-8 sm:-right-10 md:-right-12 lg:-right-16 -top-8 sm:-top-10 md:-top-12 lg:-top-16 w-16 sm:w-20 md:w-24 lg:w-32 h-16 sm:h-20 md:h-24 lg:h-32 bg-gradient-to-br from-[#ff0054] to-[#fbe40b] rounded-full opacity-20"></div>
            <div className="absolute -left-8 sm:-left-10 md:-left-12 lg:-left-16 -bottom-4 sm:-bottom-6 md:-bottom-7 lg:-bottom-8 w-12 sm:w-16 md:w-20 lg:w-24 h-12 sm:h-16 md:h-20 lg:h-24 bg-gradient-to-br from-[#fbe40b] to-[#ff0054] rounded-full opacity-20"></div>
          </h1>

          <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto relative">
            {/* Decorative lines - ajustados para diferentes tamaños */}
            <div className="absolute left-0 top-0 w-8 sm:w-12 md:w-16 h-1 bg-gradient-to-r from-[#ff0054] to-transparent"></div>
            <div className="absolute right-0 top-0 w-8 sm:w-12 md:w-16 h-1 bg-gradient-to-l from-[#ff0054] to-transparent"></div>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#fefefe]/80 leading-relaxed mb-6 sm:mb-8">
              Welcome to Impulse Rentals, your premier destination for all your outdoor entertainment needs! We are thrilled to offer an unbeatable combination of boat and bounce house rentals, ensuring that your next event or outing is filled with excitement and unforgettable memories.
            </p>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#fefefe]/80 leading-relaxed">
              What truly sets us apart from the competition is our passion for creating memorable experiences. Every moment is an opportunity for adventure and celebration. Whether planning a family outing, a corporate team-building event, or a community gathering, our boat and bounce house rentals will take your experience to the next level. Our goal is to exceed your expectations and leave you with memories that will be cherished for years.
            </p>
            
            {/* Decorative lines - ajustados para diferentes tamaños */}
            <div className="absolute left-0 bottom-0 w-8 sm:w-12 md:w-16 h-1 bg-gradient-to-r from-[#ff0054] to-transparent"></div>
            <div className="absolute right-0 bottom-0 w-8 sm:w-12 md:w-16 h-1 bg-gradient-to-l from-[#ff0054] to-transparent"></div>
          </div>
        </div>

        {/* Team section - ajustado el grid para que se apile correctamente en móvil */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bebas text-center mb-8 sm:mb-12 md:mb-16 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
            OUR TEAM
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-10 sm:mb-16 md:mb-20">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="relative group perspective"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className={`
                  transition-all duration-500 transform 
                  ${hoveredMember === member.id ? 'rotate-y-180' : 'rotate-y-0'}
                  relative h-[350px] sm:h-[400px] md:h-[450px] w-full rounded-2xl shadow-xl 
                  preserve-3d
                `}>
                  {/* Card front */}
                  <div className="absolute inset-0 backface-hidden">
                    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#060404] border-2 border-[#ff0054]/20 hover:border-[#ff0054] transition-colors duration-300">
                      {/* Background effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[#ff0054]/10 to-[#fbe40b]/10 opacity-50"></div>
                      
                      {/* Content */}
                      <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-6 text-center">
                        {/* Profile Image or Icon - tamaños ajustados para móvil */}
                        {member.useIcon ? (
                          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-[#ff0054] to-[#fbe40b] flex items-center justify-center mb-6 sm:mb-8 shadow-lg shadow-[#ff0054]/30 group-hover:shadow-[#ff0054]/50 transition-all duration-300 transform group-hover:scale-110">
                            <Users className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 text-[#060404]" />
                            
                            {/* Shine effect */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#fefefe]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                          </div>
                        ) : (
                          <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] rounded-xl overflow-hidden shadow-lg shadow-[#ff0054]/30 group-hover:shadow-[#ff0054]/50 transition-all duration-300 transform group-hover:scale-105 mb-6 sm:mb-8 border-2 border-[#ff0054]/30">
                            <Image
                              src={member.imageUrl || ""}
                              alt={member.name}
                              fill
                              className="object-cover object-center"
                              style={{ objectPosition: 'center top' }}
                            />
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fefefe]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                          </div>
                        )}
                        
                        <h3 className="text-2xl sm:text-3xl font-bebas text-[#fefefe] mb-2 group-hover:text-[#fbe40b] transition-colors duration-300">{member.name}</h3>
                        
                        {/* Flip text */}
                        <p className="text-[#fefefe]/70 text-xs sm:text-sm mt-2 sm:mt-4">
                          (Tap to view bio)
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card back (Bio) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <div className="relative h-full w-full rounded-2xl bg-[#060404] border-2 border-[#fbe40b]/20 hover:border-[#fbe40b] transition-colors duration-300 p-4 sm:p-6 flex flex-col items-center justify-center text-center">
                      {/* Diagonal background effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ff0054]/10 to-[#fbe40b]/10 opacity-50"></div>
                      
                      <div className="relative space-y-4 sm:space-y-6">
                        <h3 className="text-2xl sm:text-3xl font-bebas bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">{member.name}</h3>
                        <p className="text-[#fefefe]/90 text-base sm:text-lg leading-relaxed">{member.bio}</p>
                        
                        <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] mx-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values section - mejorado para móvil */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bebas text-center mb-8 sm:mb-12 md:mb-16 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
            OUR VALUES
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {companyValues.map((value, index) => (
              <div 
                key={index}
                className="relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] rounded-2xl transform transition-all duration-500 group-hover:scale-[1.02] z-0"></div>
                <div className="relative bg-[#060404] m-[2px] rounded-2xl p-4 sm:p-6 md:p-8 z-10 transition-transform duration-500 group-hover:translate-y-1 group-hover:translate-x-1">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                    <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#ff0054] to-[#fbe40b] flex items-center justify-center shadow-lg shadow-[#ff0054]/30 group-hover:shadow-[#ff0054]/50 transition-all duration-300">
                      <value.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#060404]" />
                    </div>
                    
                    <div className="text-center sm:text-left space-y-2 sm:space-y-4">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bebas bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">{value.title}</h3>
                      <p className="text-[#fefefe]/80 text-base sm:text-lg md:text-xl leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                  
                  {/* Card decoration */}
                  <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tl from-[#ff0054]/20 to-transparent rounded-tl-3xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact section - tamaños y espaciado ajustados */}
        <div className="relative max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl mx-auto">
          <div className="relative z-10 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] p-[2px] rounded-2xl shadow-xl">
            <div className="bg-[#060404] rounded-2xl p-6 sm:p-8 md:p-10 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bebas mb-4 sm:mb-6 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                Want to be part of our story?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-[#fefefe]/80 mb-6 sm:mb-8">
                Contact us and discover how we can create unforgettable moments together.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404] font-bebas text-lg sm:text-xl md:text-2xl px-6 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#ff0054]/50"
                asChild
              >
                <Link href="/contact" className="flex items-center gap-2 sm:gap-3">
                  CONTACT US
                  <MousePointerClick className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Decoration behind the button - ajustado para pantallas pequeñas */}
          <div className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 -right-4 sm:-right-6 md:-right-8 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-gradient-to-br from-[#ff0054] to-[#fbe40b] rounded-full opacity-20 blur-md sm:blur-lg -z-10"></div>
          <div className="absolute -top-4 sm:-top-6 md:-top-8 -left-4 sm:-left-6 md:-left-8 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 bg-gradient-to-br from-[#fbe40b] to-[#ff0054] rounded-full opacity-20 blur-md sm:blur-lg -z-10"></div>
        </div>
      </div>

      {/* Additional styles for animations y soporte para dispositivos táctiles */}
      <style jsx global>{`
        .perspective {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        /* Mejoras para dispositivos táctiles */
        @media (hover: none) {
          .group:active .group-hover\\:scale-105 {
            transform: scale(1.05);
          }
          .group:active .group-hover\\:scale-110 {
            transform: scale(1.1);
          }
          .group:active .group-hover\\:opacity-100 {
            opacity: 1;
          }
          .group:active .group-hover\\:translate-y-1 {
            transform: translateY(0.25rem) translateX(0.25rem);
          }
          .group:active .group-hover\\:shadow-\\[\\#ff0054\\]\\/50 {
            box-shadow: 0 10px 15px -3px rgba(255, 0, 84, 0.5), 0 4px 6px -4px rgba(255, 0, 84, 0.5);
          }
          .group:active .group-hover\\:text-\\[\\#fbe40b\\] {
            color: #fbe40b;
          }
          .group:active .group-hover\\:border-\\[\\#ff0054\\] {
            border-color: #ff0054;
          }
          .group:active .group-hover\\:border-\\[\\#fbe40b\\] {
            border-color: #fbe40b;
          }
        }
      `}</style>
    </div>
  )
}