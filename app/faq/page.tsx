// app/faq/page.tsx
"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FAQPage() {
  const [expandedPontoon, setExpandedPontoon] = useState<number | null>(null);
  const [expandedFoam, setExpandedFoam] = useState<number | null>(null);

  // FAQs para Pontoon
  const pontoonFaqs = [
    {
      question: "What are the payment options?",
      answer: "We accept Zelle, Cash App, Venmo or Cash. for stripe."
    },
    {
      question: "How many passengers can I bring on my Pontoon experience?",
      answer: "You can only bring up to 11 passengers onboard. New Borns/Toddlers count as a passenger."
    },
    {
      question: "Are there Life Jackets on the Pontoon?",
      answer: "Yes! 12 life jackets are conveniently located under the seats. We also include several youth life jackets. If you have any specific request do not hesitate to contact us immediately to see if we can accommodate."
    },
    {
      question: "Do I have to pay for gas?",
      answer: "No! Never! Our rental prices include gas fees giving you peace of mind and one less thing to worry about."
    },
    {
      question: "Does the Pontoon include a grill?",
      answer: "Yes! We also include propane in our all inclusive pricing. Bring your food and grilling skills onboard. Please practice caution around the grill so no one gets burned. Impulse Rentals is not responsible for inappropriate or careless use of equipment."
    },
    {
      question: "Does the Pontoon have a radio & speakers?",
      answer: "Yes! The Pontoon comes with a Bluetooth radio that can easily be connected to so you can enjoy your tunes while on the lake."
    },
    {
      question: "Is gratuity suggested for our captain?",
      answer: "We guarantee an amazing time and exceptional service! If you think so too, gratuities for your captain are always welcomed once your reservation is complete :)"
    },
    {
      question: "Do you offer referral incentives?",
      answer: "We offer a special reward for referrals! Have a friend or family member who wants to ride the waves? Fantastic! Refer them to Impulse Rentals and receive $25 off your next booking with us, after the completion of the booking; 4 hour minimum."
    }
  ];

  // FAQs para Foam Party
  const foamFaqs = [
    {
      question: "What are the payment options?",
      answer: "We accept Zelle, Cash App, Venmo or Cash.for stripe"
    },
    {
      question: "What is a Foam Party?",
      answer: "It's whatever you want it to be! It can be as simple as filling an area with foam and letting kids jump around and play in it or as involved as creating a dance club vibe with lights, music, and, of course, foam! All you need is foam and people looking to have fun!"
    },
    {
      question: "Is the Foam Slippery?",
      answer: "Foam is about as slippery as water, so it's possible to slip if you're on long grass or a smooth, glossy surface such as tile. To prevent slipping, some guests like to wear water shoes. We also recommend guests avoid running in foamy areas."
    },
    {
      question: "Is your Foam safe?",
      answer: "Yes! Our standard foam solution is biodegradable, non-toxic, non-staining, and hypoallergenic. It is entirely safe for kids, adults, pets (yes, dogs love foam, too!), and even plants! While kids will be OK playing in the bubbles, we have found that some of them like to wear goggles."
    },
    {
      question: "What do you need from me?",
      answer: "We require a $100 deposit to secure the time frame and book your event. Once the event is booked and we show up on site, we will need power (2 outlets), water (1 hose bib per cannon), an area free of clutter to get setup (We don't want people tripping on stuff in the foam!), and people (or animals) ready to have fun!"
    },
    {
      question: "How hard is it to clean up?",
      answer: "It's really NOT! While our foam solution and water will evaporate on its own, we do like to hose down the area before we leave."
    },
    {
      question: "How long does the Foam last?",
      answer: "When left alone, foam can last several hours. However, once guests interact with it, the bubbles start to pop and break up. The more people play in the foam, the quicker it will dissolve. Don't worry though, we are there to replace it as needed!"
    },
    {
      question: "How much space does a FOAM PARTY require?",
      answer: "That is really up to you. We require an area of about 6 x 6 to setup the foam cannon. While we generally suggest about a 20 foot x 20 foot area, we can make the 'foam pit' as large or small as you would like!"
    }
  ];

  // Función para alternar la visibilidad en dispositivos móviles
  const togglePontoon = (index: number) => {
    setExpandedPontoon(expandedPontoon === index ? null : index);
  };

  const toggleFoam = (index: number) => {
    setExpandedFoam(expandedFoam === index ? null : index);
  };

  return (
    <div className="min-h-screen relative py-16 sm:py-20 md:py-24">
      {/* Fondo con gradiente y efectos */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff0054]/20 to-[#fbe40b]/20">
        {/* Efectos de luz - Ajustados para diferentes tamaños de pantalla */}
        <div className="absolute top-0 left-0 w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[50px] sm:blur-[100px] md:blur-[150px] animate-pulse opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[50px] sm:blur-[100px] md:blur-[150px] animate-pulse delay-700 opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[50px] sm:blur-[100px] md:blur-[150px] animate-pulse delay-1000 opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pontoon FAQ Section */}
        <div className="mb-12 sm:mb-16 md:mb-24">
          <h1 className="text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bebas mb-8 sm:mb-12 md:mb-16">
            <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
              Pontoon FAQ
            </span>
          </h1>

          <Card className="bg-[#060404]/95 backdrop-blur-sm border-[#ff0054]/20 p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 md:space-y-12">
            {pontoonFaqs.map((faq, index) => (
              <div key={`pontoon-${index}`} className="space-y-3 sm:space-y-4 md:space-y-6">
                {/* Versión móvil con toggle */}
                <div 
                  className="flex md:hidden items-start justify-between cursor-pointer"
                  onClick={() => togglePontoon(index)}
                >
                  <h3 className="text-xl sm:text-2xl font-bebas text-[#ff0054] pr-4">{faq.question}</h3>
                  {expandedPontoon === index ? (
                    <ChevronUp className="flex-shrink-0 w-6 h-6 text-[#ff0054]" />
                  ) : (
                    <ChevronDown className="flex-shrink-0 w-6 h-6 text-[#ff0054]" />
                  )}
                </div>
                
                {/* Versión móvil expandible */}
                {expandedPontoon === index && (
                  <div className="md:hidden">
                    <p className="text-base sm:text-lg text-[#fefefe]/90 leading-relaxed ml-2 border-l-2 border-[#ff0054]/20 pl-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
                
                {/* Versión desktop siempre visible */}
                <div className="hidden md:block">
                  <h3 className="text-3xl font-bebas text-[#ff0054]">{faq.question}</h3>
                  <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Foam Party FAQ Section */}
        <div className="mb-12 sm:mb-16 md:mb-24">
          <h1 className="text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bebas mb-8 sm:mb-12 md:mb-16">
            <span className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text">
              Foam Party FAQ
            </span>
          </h1>

          <Card className="bg-[#060404]/95 backdrop-blur-sm border-[#ff0054]/20 p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 md:space-y-12">
            {foamFaqs.map((faq, index) => (
              <div key={`foam-${index}`} className="space-y-3 sm:space-y-4 md:space-y-6">
                {/* Versión móvil con toggle */}
                <div 
                  className="flex md:hidden items-start justify-between cursor-pointer"
                  onClick={() => toggleFoam(index)}
                >
                  <h3 className="text-xl sm:text-2xl font-bebas text-[#ff0054] pr-4">{faq.question}</h3>
                  {expandedFoam === index ? (
                    <ChevronUp className="flex-shrink-0 w-6 h-6 text-[#ff0054]" />
                  ) : (
                    <ChevronDown className="flex-shrink-0 w-6 h-6 text-[#ff0054]" />
                  )}
                </div>
                
                {/* Versión móvil expandible */}
                {expandedFoam === index && (
                  <div className="md:hidden">
                    <p className="text-base sm:text-lg text-[#fefefe]/90 leading-relaxed ml-2 border-l-2 border-[#ff0054]/20 pl-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
                
                {/* Versión desktop siempre visible */}
                <div className="hidden md:block">
                  <h3 className="text-3xl font-bebas text-[#ff0054]">{faq.question}</h3>
                  <p className="text-xl text-[#fefefe]/90 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Botón Book Now */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] 
                     text-[#fefefe] font-bebas text-xl sm:text-2xl md:text-3xl 
                     px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-8 
                     transform hover:scale-105 transition-all duration-300
                     shadow-lg hover:shadow-[#ff0054]/50"
            asChild
          >
            <Link href="/book-now">Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}