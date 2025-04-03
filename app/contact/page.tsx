// app/contact/page.tsx
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
import { Mail, Send, Sparkles, Phone } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log("Form submitted:", formState)
    alert("Thank you for contacting us! We'll get back to you soon.")
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 relative bg-[#060404] overflow-hidden">
      {/* Background effects - ajustados para diferentes tamaños de pantalla */}
      <div className="absolute inset-0">
        {/* Burbujas animadas - reducidas en número para dispositivos móviles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-[#ff0054]/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 30}px`,
              height: `${Math.random() * 100 + 30}px`,
              animation: `float ${Math.random() * 8 + 4}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
              background: `linear-gradient(45deg, rgba(255,0,84,0.05), rgba(251,228,11,0.05))`
            }}
          />
        ))}
        
        {/* Efectos de luz - más pequeños en dispositivos móviles */}
        <div className="absolute top-0 left-0 w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[100px] md:blur-[150px] animate-pulse opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[80px] sm:blur-[100px] md:blur-[150px] animate-pulse delay-700 opacity-20"></div>
      </div>

      <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl mx-auto px-4">
        {/* Tarjeta de formulario */}
        <Card className="bg-gradient-to-br from-[#060404]/80 to-[#060404]/95 backdrop-blur-sm border-2 border-[#fbe40b]/20 hover:border-[#fbe40b]/50 transition-all duration-500 shadow-xl sm:shadow-2xl hover:shadow-[0_0_15px_rgba(251,228,11,0.2)] sm:hover:shadow-[0_0_30px_rgba(251,228,11,0.3)] overflow-hidden relative">
          {/* Efectos de brillo en las esquinas */}
          <div className="absolute top-0 left-0 w-10 sm:w-16 h-10 sm:h-16 bg-gradient-to-br from-[#ff0054] to-transparent opacity-50 blur-md rounded-br-full"></div>
          <div className="absolute bottom-0 right-0 w-10 sm:w-16 h-10 sm:h-16 bg-gradient-to-tl from-[#fbe40b] to-transparent opacity-50 blur-md rounded-tl-full"></div>
          
          <CardHeader className="border-b border-[#ff0054]/20 pb-4 sm:pb-6 px-4 sm:px-6">
            <div className="flex flex-col items-center text-center mb-1 sm:mb-2">
              <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bebas mb-1 sm:mb-2 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text flex items-center gap-1 sm:gap-2">
                <Sparkles className="text-[#fbe40b] h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                CONTACT US
                <Sparkles className="text-[#ff0054] h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
              </CardTitle>
              <CardDescription className="text-[#fefefe]/60 text-sm sm:text-base md:text-lg max-w-xl">
                Complete the form and we&#39;ll get back to you soon to discuss your needs.
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="pt-4 sm:pt-6 md:pt-8 px-4 sm:px-6">
            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              {/* Nombre y apellido - apilados en móvil, en línea en tablet y más grandes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <Label className="text-[#fefefe] font-bebas text-base sm:text-lg" htmlFor="firstName">
                    FIRST NAME
                  </Label>
                  <div className="relative">
                    <Input 
                      id="firstName"
                      name="firstName"
                      value={formState.firstName}
                      onChange={handleChange}
                      className="bg-[#fefefe] border-2 border-[#060404]/10 text-[#060404] focus:border-[#ff0054] hover:border-[#ff0054]/50 transition-colors duration-200 pl-8 sm:pl-10 h-9 sm:h-10"
                      placeholder="Your first name"
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-[#ff0054] to-[#fbe40b] rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1 sm:space-y-2">
                  <Label className="text-[#fefefe] font-bebas text-base sm:text-lg" htmlFor="lastName">
                    LAST NAME
                  </Label>
                  <div className="relative">
                    <Input 
                      id="lastName"
                      name="lastName"
                      value={formState.lastName}
                      onChange={handleChange}
                      className="bg-[#fefefe] border-2 border-[#060404]/10 text-[#060404] focus:border-[#ff0054] hover:border-[#ff0054]/50 transition-colors duration-200 pl-8 sm:pl-10 h-9 sm:h-10"
                      placeholder="Your last name"
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-[#fbe40b] to-[#ff0054] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1 sm:space-y-2">
                <Label className="text-[#fefefe] font-bebas text-base sm:text-lg" htmlFor="email">
                  EMAIL
                </Label>
                <div className="relative">
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="bg-[#fefefe] border-2 border-[#060404]/10 text-[#060404] focus:border-[#ff0054] hover:border-[#ff0054]/50 transition-colors duration-200 pl-8 sm:pl-10 h-9 sm:h-10"
                    placeholder="your@email.com"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-[#ff0054]" />
                  </div>
                </div>
              </div>

              {/* Teléfono */}
              <div className="space-y-1 sm:space-y-2">
                <Label className="text-[#fefefe] font-bebas text-base sm:text-lg" htmlFor="phone">
                  PHONE
                </Label>
                <div className="relative">
                  <Input 
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={handleChange}
                    className="bg-[#fefefe] border-2 border-[#060404]/10 text-[#060404] focus:border-[#ff0054] hover:border-[#ff0054]/50 transition-colors duration-200 pl-8 sm:pl-10 h-9 sm:h-10"
                    placeholder="Your phone number"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-[#ff0054]" />
                  </div>
                </div>
              </div>

              {/* Servicio */}
              <div className="space-y-1 sm:space-y-2">
                <Label className="text-[#fefefe] font-bebas text-base sm:text-lg" htmlFor="service">
                  SERVICE YOU WANT
                </Label>
                <div className="relative">
                  <Input 
                    id="service"
                    name="service"
                    value={formState.service}
                    onChange={handleChange}
                    className="bg-[#fefefe] border-2 border-[#060404]/10 text-[#060404] focus:border-[#ff0054] hover:border-[#ff0054]/50 transition-colors duration-200 pl-8 sm:pl-10 h-9 sm:h-10"
                    placeholder="Write the service you're interested in"
                  />
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                    <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#ff0054]" />
                  </div>
                </div>
              </div>

              {/* Mensaje - ajustado para altura móvil vs desktop */}
              <div className="space-y-1 sm:space-y-2">
                <Label className="text-[#fefefe] font-bebas text-base sm:text-lg" htmlFor="message">
                  MESSAGE
                </Label>
                <Textarea 
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  className="bg-[#fefefe] border-2 border-[#060404]/10 text-[#060404] focus:border-[#ff0054] hover:border-[#ff0054]/50 transition-colors duration-200 min-h-[80px] sm:min-h-[100px] md:min-h-[120px]"
                  placeholder="Write your message here..."
                  required
                />
              </div>

              {/* Botón de envío - tamaño ajustado para dispositivos */}
              <div>
                <Button 
                  type="submit"
                  className="w-full relative overflow-hidden groupbg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404] font-bebas text-lg sm:text-xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6transform hover:scale-105 transition-all duration-300shadow-md sm:shadow-lg hover:shadow-[#ff0054]/50 border-none"
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[150%] transition-transform duration-700"></span>
                  SEND MESSAGE
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 inline-block" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Estilos de animación */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px); sm:translateY(-15px); md:translateY(-20px) scale(1.05); sm:scale(1.08); md:scale(1.1);
          }
        }
        
        /* Mejoras para dispositivos táctiles */
        @media (hover: none) {
          .hover\\:scale-105:active {
            transform: scale(1.05);
          }
          .hover\\:shadow-\\[\\#ff0054\\]\\/50:active {
            box-shadow: 0 10px 15px -3px rgba(255, 0, 84, 0.5), 0 4px 6px -4px rgba(255, 0, 84, 0.5);
          }
          .hover\\:border-\\[\\#fbe40b\\]\\/50:active {
            border-color: rgba(251, 228, 11, 0.5);
          }
          .hover\\:border-\\[\\#ff0054\\]\\/50:active {
            border-color: rgba(255, 0, 84, 0.5);
          }
        }
      `}</style>
    </div>
  )
}