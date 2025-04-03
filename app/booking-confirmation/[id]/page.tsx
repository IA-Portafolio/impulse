// app/booking-confirmation/[id]/page.tsx
"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Calendar, Phone, Mail, MapPin, Loader2 } from "lucide-react"
import Link from "next/link"

export default function BookingConfirmationPage() {
    const [bookingData, setBookingData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [bookingId, setBookingId] = useState<string>('')

    useEffect(() => {
        // Obtener el ID de la URL
        if (typeof window !== 'undefined') {
            const pathSegments = window.location.pathname.split('/');
            const id = pathSegments[pathSegments.length - 1];
            setBookingId(id);
        }

        // Try to retrieve booking data from localStorage
        const savedBooking = localStorage.getItem('lastBooking')
        if (savedBooking) {
            setBookingData(JSON.parse(savedBooking))
        } else {
            // If there's no data in localStorage, use simulated data
            setBookingData({
                id: bookingId,
                serviceName: "Booked Service",
                optionName: "Service Option",
                amount: 45000,
                date: new Date().toISOString(),
                customer: {
                    firstName: "Customer",
                    lastName: "Example",
                    email: "customer@example.com",
                    phone: "(123) 456-7890"
                },
                status: "confirmed"
            })
        }
        setLoading(false)
    }, [bookingId])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#060404] flex items-center justify-center py-12 sm:py-16 md:py-24 px-4">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-[#ff0054] mx-auto mb-4" />
                    <div className="text-[#fefefe] text-xl sm:text-2xl font-bebas">Loading confirmation...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#060404] py-12 sm:py-16 md:py-24 px-4">
            <div className="relative max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
                {/* Background effects */}
                <div className="absolute inset-0 overflow-hidden -z-10">
                    <div className="absolute top-0 left-0 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-[#ff0054] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse opacity-20"></div>
                    <div className="absolute bottom-0 right-0 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-[#fbe40b] rounded-full mix-blend-multiply filter blur-[150px] animate-pulse delay-700 opacity-20"></div>
                </div>

                <Card className="border-none bg-gradient-to-r from-[#ff0054]/5 to-[#fbe40b]/5 backdrop-blur-sm shadow-xl relative overflow-hidden">
                    {/* Decorative design - Corners with gradient */}
                    <div className="absolute top-0 left-0 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-[#ff0054] to-transparent rounded-br-3xl opacity-30"></div>
                    <div className="absolute bottom-0 right-0 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-tl from-[#fbe40b] to-transparent rounded-tl-3xl opacity-30"></div>

                    <CardHeader className="pb-2">
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                                <Check className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                            </div>
                            <CardTitle className="text-3xl sm:text-4xl font-bebas bg-gradient-to-r from-[#ff0054] to-[#fbe40b] text-transparent bg-clip-text text-center">
                                Booking Confirmed!
                            </CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent className="pb-6 sm:pb-8">
                        <div className="px-3 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8">
                            {/* Booking Number and Status */}
                            <div className="flex flex-col sm:flex-row justify-between items-center bg-white/5 p-3 sm:p-4 rounded-lg border border-[#ff0054]/20">
                                <div>
                                    <p className="text-[#fefefe]/60 text-xs sm:text-sm">Booking Number</p>
                                    <p className="text-[#fefefe] text-lg sm:text-xl font-medium">{bookingId}</p>
                                </div>
                                <div className="mt-2 sm:mt-0">
                                    <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                        Confirmed
                                    </span>
                                </div>
                            </div>

                            {/* Service Information */}
                            <div className="space-y-3 sm:space-y-4">
                                <h3 className="text-xl sm:text-2xl font-bebas text-[#fefefe]">Service Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div className="bg-white/5 p-3 sm:p-4 rounded-lg border border-[#ff0054]/20">
                                        <p className="text-[#fefefe]/60 text-xs sm:text-sm">Service</p>
                                        <p className="text-[#fefefe] text-sm sm:text-base font-medium">
                                            {bookingData?.serviceName || "Premium Service"}
                                        </p>
                                    </div>
                                    <div className="bg-white/5 p-3 sm:p-4 rounded-lg border border-[#ff0054]/20">
                                        <p className="text-[#fefefe]/60 text-xs sm:text-sm">Package</p>
                                        <p className="text-[#fefefe] text-sm sm:text-base font-medium">
                                            {bookingData?.optionName || "Standard Package"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="space-y-3 sm:space-y-4">
                                <h3 className="text-xl sm:text-2xl font-bebas text-[#fefefe]">Payment Information</h3>
                                <div className="bg-white/5 p-3 sm:p-4 rounded-lg border border-[#ff0054]/20">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-[#fefefe]/60 text-xs sm:text-sm">Total Amount</p>
                                            <p className="text-[#fbe40b] text-xl sm:text-2xl font-bold">
                                                ${((bookingData?.amount || 45000)/100).toFixed(2)} USD
                                            </p>
                                        </div>
                                        <div>
                                            <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                                Paid
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">
                                <Button
                                    className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#fefefe] flex-1 text-sm sm:text-base"
                                    asChild
                                >
                                    <Link href="/">
                                        Back to Home
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Contact Information */}
                <div className="mt-6 sm:mt-8 text-center text-[#fefefe]/60 text-xs sm:text-sm">
                    <p>If you have any questions about your booking, contact us at</p>
                    <p className="text-[#fefefe] mt-1">(862) 686-5129 or info@impulserentals.com</p>
                </div>
            </div>
        </div>
    )
}