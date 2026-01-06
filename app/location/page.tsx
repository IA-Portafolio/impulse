// app/location/page.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { MapPin, Phone, Mail, Clock, MousePointerClick } from "lucide-react"
import Image from "next/image"

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-[#060404] pt-32 pb-16 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        {/* Diagonal lines */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[1px] w-[200%] bg-gradient-to-r from-transparent via-[#ff0054] to-transparent transform -translate-x-full animate-slide"
            style={{
              top: `${i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `rotate(${35}deg) translateX(-50%)`
            }}
          />
        ))}

        {/* Animated bubbles */}
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

        {/* Light effects */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse delay-700 opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bebas mb-4">
            <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
              Find Us Here
            </span>
          </h1>
          <p className="text-xl text-[#fefefe]/80">
            Experience All Our Services in Dallas, Texas
          </p>
        </div>

        {/* Main container for information and form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Information and Carousel */}
          <div className="space-y-8">
            {/* Image Carousel */}
            <Card className="bg-[#060404] border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300 group shadow-lg">
              <CardContent className="p-6">
                <div className="relative aspect-video h-64 md:h-80 w-full">
                  <Image
                    src="/images/location.jpg"
                    alt="Location"
                    fill
                    className="object-cover rounded-lg object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="bg-[#060404] border-2 border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300 shadow-lg">
                <CardContent className="p-4 md:p-6 flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-[#ff0054] to-[#fbe40b] p-3 rounded-lg flex-shrink-0">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-[#fefefe]" />
                  </div>
                  <div>
                    <p className="text-[#fefefe] font-semibold text-sm md:text-base">Little Elm, Texas</p>
                    <p className="text-[#fefefe]/60 text-xs md:text-sm">Main Location</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#060404] border-2 border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300 shadow-lg">
                <CardContent className="p-4 md:p-6 flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-[#ff0054] to-[#fbe40b] p-3 rounded-lg flex-shrink-0">
                    <Phone className="h-5 w-5 md:h-6 md:w-6 text-[#fefefe]" />
                  </div>
                  <div>
                    <p className="text-[#fefefe] font-semibold text-sm md:text-base">(862)686-5129</p>
                    <p className="text-[#fefefe]/60 text-xs md:text-sm">Call Us</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#060404] border-2 border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300 shadow-lg">
                <CardContent className="p-4 md:p-6 flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-[#ff0054] to-[#fbe40b] p-3 rounded-lg flex-shrink-0">
                    <Mail className="h-5 w-5 md:h-6 md:w-6 text-[#fefefe]" />
                  </div>
                  <div>
                    <p className="text-[#fefefe] font-semibold text-sm md:text-base overflow-hidden text-ellipsis">impulsexperience.com</p>
                    <p className="text-[#fefefe]/60 text-xs md:text-sm">Email Us</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#060404] border-2 border-[#ff0054]/20 hover:border-[#ff0054] transition-all duration-300 shadow-lg">
                <CardContent className="p-4 md:p-6 flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-[#ff0054] to-[#fbe40b] p-3 rounded-lg flex-shrink-0">
                    <Clock className="h-5 w-5 md:h-6 md:w-6 text-[#fefefe]" />
                  </div>
                  <div>
                    <p className="text-[#fefefe] font-semibold text-sm md:text-base">24/7</p>
                    <p className="text-[#fefefe]/60 text-xs md:text-sm">Operating Hours</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-[#060404] border-2 border-[#fbe40b]/50 hover:border-[#fbe40b] transition-all duration-300 
                        shadow-[0_0_15px_rgba(251,228,11,0.3)] hover:shadow-[0_0_20px_rgba(251,228,11,0.4)] group">
            <CardHeader className="border-b border-[#ff0054]/20 pb-6">
              <div className="flex flex-col items-center text-center mb-2">
                <CardTitle className="text-3xl md:text-4xl font-bebas mb-2 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
                  Get in Touch
                </CardTitle>
                <CardDescription className="text-[#fefefe]/60 text-sm md:text-base">
                  Fill out the form and we'll get back to you
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <form className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[#fefefe] font-semibold text-sm md:text-base">First Name</Label>
                    <Input 
                      className="bg-[#fefefe] border-2 border-[#fbe40b]/20 text-[#060404] 
                               focus:border-[#fbe40b] hover:border-[#fbe40b]/50 
                               transition-colors duration-200 placeholder:text-[#060404]/40"
                      placeholder="Your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#fefefe] font-semibold text-sm md:text-base">Last Name</Label>
                    <Input 
                      className="bg-[#fefefe] border-2 border-[#fbe40b]/20 text-[#060404] 
                               focus:border-[#fbe40b] hover:border-[#fbe40b]/50 
                               transition-colors duration-200 placeholder:text-[#060404]/40"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#fefefe] font-semibold text-sm md:text-base">Email</Label>
                  <Input 
                    type="email"
                    className="bg-[#fefefe] border-2 border-[#fbe40b]/20 text-[#060404] 
                             focus:border-[#fbe40b] hover:border-[#fbe40b]/50 
                             transition-colors duration-200 placeholder:text-[#060404]/40"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#fefefe] font-semibold text-sm md:text-base">Phone</Label>
                  <Input 
                    type="tel"
                    className="bg-[#fefefe] border-2 border-[#fbe40b]/20 text-[#060404] 
                             focus:border-[#fbe40b] hover:border-[#fbe40b]/50 
                             transition-colors duration-200 placeholder:text-[#060404]/40"
                    placeholder="Your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#fefefe] font-semibold text-sm md:text-base">Service of Interest</Label>
                  <select
                    defaultValue=""
                    className="w-full bg-[#fefefe] border-2 border-[#fbe40b]/20 text-[#060404] rounded-md px-3 py-2 focus:outline-none focus:border-[#fbe40b] hover:border-[#fbe40b]/50 transition-colors duration-200"
                  >
                    <option value="" disabled className="text-[#060404]/40">Select a service</option>
                    <option value="boats">Pontoons</option>
                    <option value="bounce">Bounce Houses</option>
                    {/* <option value="cars">Luxury Transport</option> - COMENTADO */}
                    <option value="foam">Foam Party</option>
                    <option value="dj">DJ Services</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#fefefe] font-semibold text-sm md:text-base">Message</Label>
                  <Textarea 
                    className="bg-[#fefefe] border-2 border-[#fbe40b]/20 text-[#060404] 
                             focus:border-[#fbe40b] hover:border-[#fbe40b]/50 
                             transition-colors duration-200 min-h-[100px] placeholder:text-[#060404]/40"
                    placeholder="Type your message here..."
                  />
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#fefefe] 
                           transform hover:scale-105 transition-all duration-300 shadow-lg text-sm md:text-base"
                  size="lg"
                >
                  Send Message
                  <MousePointerClick className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <div className="w-full">
          <h2 className="text-3xl md:text-4xl font-bebas mb-6 md:mb-8 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
            Visit Us
          </h2>
          <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg hover:shadow-[#ff0054]/50 transition-all duration-300 border-2 border-[#ff0054]/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3342.225069843596!2d-96.95203012332979!3d33.15727717287121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c37330ec1bfd3%3A0x4b555d8445f52d8e!2s1101%20W%20Eldorado%20Pkwy%2C%20Little%20Elm%2C%20TX%2075068%2C%20EE.%20UU.!5e0!3m2!1ses!2ses!4v1708985786779!5m2!1ses!2ses"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-4 text-center text-[#fefefe]/70 text-sm md:text-base">
            <p>1101 W Eldorado Pkwy, Little Elm, TX 75068, United States</p>
          </div>
        </div>
      </div>

      {/* Styles for animations */}
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

        @media (max-width: 640px) {
          .animate-slide {
            animation-duration: 12s;
          }
        }
      `}</style>
    </div>
  )
}