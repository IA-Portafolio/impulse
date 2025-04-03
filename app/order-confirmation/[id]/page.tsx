// app/order-confirmation/[id]/page.tsx
"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowRight, Loader2, Package } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
    const [orderData, setOrderData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [orderId, setOrderId] = useState<string>('')

    useEffect(() => {
        // Extraer el ID de la URL
        if (typeof window !== 'undefined') {
            const pathSegments = window.location.pathname.split('/');
            const id = pathSegments[pathSegments.length - 1];
            setOrderId(id);
            
            const fetchOrderData = async () => {
                try {
                    setLoading(true)
                    // Make a request to the API to get order details
                    const response = await fetch(`/api/wear/orders?id=${id}`)

                    if (!response.ok) {
                        throw new Error('Could not retrieve order information')
                    }

                    const data = await response.json()
                    setOrderData(data)
                } catch (error: any) {
                    console.error('Error loading order details:', error)
                    setError(error.message || 'Error loading order details')
                } finally {
                    setLoading(false)
                }
            }

            if (id) {
                fetchOrderData()
            }
        }
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#060404] flex items-center justify-center py-12 sm:py-16 md:py-24 px-4">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-[#ff0054] mx-auto mb-4" />
                    <div className="text-[#fefefe] text-xl sm:text-2xl font-bebas">Loading order details...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#060404] py-12 sm:py-16 md:py-24 px-4">
                <div className="max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
                    <Card className="bg-[#060404]/80 border border-[#ff0054]/30">
                        <CardHeader>
                            <CardTitle className="text-xl sm:text-2xl font-bebas text-[#fefefe]">Error</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[#fefefe]/70 mb-6">{error}</p>
                            <Button
                                className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404]"
                                asChild
                            >
                                <Link href="/">Back to Home</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#060404] py-12 sm:py-16 md:py-24 px-4">
            <div className="max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
                <Card className="bg-[#060404]/80 border border-[#ff0054]/30">
                    <CardHeader className="text-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                        </div>
                        <CardTitle className="text-2xl sm:text-3xl font-bebas text-[#fefefe]">Order Confirmed!</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-6 pt-4">
                        <div className="bg-[#fefefe]/5 p-3 sm:p-4 rounded-lg">
                            <p className="text-[#fefefe]/70 text-xs sm:text-sm">Order Number</p>
                            <p className="text-[#fefefe] font-medium text-base sm:text-lg">{orderId}</p>
                        </div>

                        <div className="flex items-center bg-[#fefefe]/5 p-3 sm:p-4 rounded-lg">
                            <Package className="h-6 w-6 sm:h-8 sm:w-8 text-[#ff0054] mr-3 sm:mr-4 flex-shrink-0" />
                            <div>
                                <h3 className="text-[#fefefe] font-medium text-sm sm:text-base">Order Status</h3>
                                <p className="text-[#fefefe]/70 text-xs sm:text-sm">Your order has been received and is being processed.</p>
                            </div>
                        </div>

                        {orderData && (
                            <div className="space-y-3 sm:space-y-4">
                                <h3 className="text-lg sm:text-xl font-bebas text-[#fefefe]">Order Details</h3>
                                {/* More order details would go here if available */}
                            </div>
                        )}

                        <div className="text-center space-y-4 pt-4 sm:pt-6">
                            <p className="text-[#fefefe]/70 text-xs sm:text-sm">
                                We have sent an email with your order confirmation. If you have any questions about your order, please contact us.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                                <Button
                                    variant="outline"
                                    className="border-[#fefefe]/20 text-[#fefefe] hover:bg-[#fefefe]/10 w-full sm:w-auto"
                                    asChild
                                >
                                    <Link href="/wear">Continue Shopping</Link>
                                </Button>

                                <Button
                                    className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404] w-full sm:w-auto"
                                    asChild
                                >
                                    <Link href="/">
                                        Back to Home
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}