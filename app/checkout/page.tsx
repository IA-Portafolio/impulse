// app/checkout/page.tsx
"use client"

import { useState, useMemo } from "react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ShoppingCart, CreditCard, Truck, Check, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// Define checkout steps
enum CheckoutStep {
    SHIPPING_INFO = 0,
    PAYMENT = 1,
    CONFIRMATION = 2
}

// Interface for shipping information
interface ShippingInfo {
    firstName: string
    lastName: string
    email: string
    phone: string
    address1: string
    address2: string
    city: string
    region: string
    zip: string
    country: string
}

export default function CheckoutPage() {
    const { items, totalAmount, clearCart } = useCart()
    const { toast } = useToast()
    const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.SHIPPING_INFO)
    const [isProcessing, setIsProcessing] = useState(false)
    const [orderId, setOrderId] = useState<string | null>(null)
    const [clientSecret, setClientSecret] = useState<string | null>(null)
    const [paymentError, setPaymentError] = useState<string | null>(null)

    // State for shipping information
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        region: '',
        zip: '',
        country: 'US', // Default to United States
    })

    // Function to check if can proceed to next step
    const canProceedToNextStep = () => {
        if (currentStep === CheckoutStep.SHIPPING_INFO) {
            const { firstName, lastName, email, phone, address1, city, region, zip, country } = shippingInfo
            return firstName && lastName && email && phone && address1 && city && region && zip && country
        }
        return true
    }

    // Function to handle input changes in the form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setShippingInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // Function to advance to the next step
    const goToNextStep = async () => {
        if (currentStep === CheckoutStep.SHIPPING_INFO) {
            // Create PaymentIntent before showing payment step
            try {
                setIsProcessing(true)
                setPaymentError(null)

                const lineItems = items.map(item => ({
                    product_id: item.productId,
                    variant_id: item.variantId,
                    quantity: item.quantity,
                }))

                const response = await fetch('/api/wear/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: totalAmount,
                        shippingInfo,
                        lineItems,
                    }),
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.error || 'Error creating payment')
                }

                const data = await response.json()
                setClientSecret(data.clientSecret)
                setCurrentStep(CheckoutStep.PAYMENT)
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } catch (error: any) {
                toast({
                    title: "Error",
                    description: error.message || "Could not initialize payment. Please try again.",
                    variant: "destructive",
                })
            } finally {
                setIsProcessing(false)
            }
        } else if (currentStep < CheckoutStep.CONFIRMATION) {
            setCurrentStep(prev => prev + 1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    // Function to go back to the previous step
    const goToPreviousStep = () => {
        if (currentStep > CheckoutStep.SHIPPING_INFO) {
            setCurrentStep(prev => prev - 1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    // Called after Stripe payment succeeds — create Printify order
    const handlePaymentSuccess = async () => {
        try {
            const lineItems = items.map(item => ({
                product_id: item.productId,
                variant_id: item.variantId,
                quantity: item.quantity,
            }))

            const orderData = {
                external_id: `order-${Date.now()}`,
                label: `ORDER-${Math.floor(Math.random() * 10000)}`,
                line_items: lineItems,
                shipping_method: 1,
                send_shipping_notification: false,
                address_to: {
                    first_name: shippingInfo.firstName,
                    last_name: shippingInfo.lastName,
                    email: shippingInfo.email,
                    phone: shippingInfo.phone,
                    country: shippingInfo.country,
                    region: shippingInfo.region,
                    address1: shippingInfo.address1,
                    address2: shippingInfo.address2,
                    city: shippingInfo.city,
                    zip: shippingInfo.zip,
                },
            }

            const response = await fetch('/api/wear/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            })

            if (response.ok) {
                const data = await response.json()
                setOrderId(data.id || `ORD-${Date.now()}`)
            } else {
                setOrderId(`ORD-${Date.now()}`)
            }
        } catch {
            setOrderId(`ORD-${Date.now()}`)
        }

        clearCart()
        setCurrentStep(CheckoutStep.CONFIRMATION)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Check if there are products in the cart
    if (items.length === 0 && currentStep !== CheckoutStep.CONFIRMATION) {
        return (
            <div className="min-h-screen bg-[#060404] py-16 sm:py-20 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-[60vh]">
                    <ShoppingCart className="h-12 w-12 md:h-16 md:w-16 text-[#ff0054]/50 mb-4" />
                    <h1 className="text-2xl sm:text-3xl font-bebas text-[#fefefe] mb-4 sm:mb-6 text-center">Your cart is empty</h1>
                    <p className="text-base sm:text-lg text-[#fefefe]/70 mb-6 sm:mb-8 text-center">
                        There are no products in your cart to process checkout.
                    </p>
                    <Button
                        className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#fefefe]"
                        asChild
                    >
                        <Link href="/wear">Explore Products</Link>
                    </Button>
                </div>
            </div>
        )
    }

    // Format price
    const formatPrice = (price: number) => `$${(price / 100).toFixed(2)}`

    return (
        <div className="min-h-screen bg-[#060404] py-16 sm:py-20 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bebas mb-8 sm:mb-12 bg-gradient-to-r from-[#fbe40b] to-[#ff0054] text-transparent bg-clip-text">
                    {currentStep === CheckoutStep.SHIPPING_INFO && "Shipping Information"}
                    {currentStep === CheckoutStep.PAYMENT && "Complete Payment"}
                    {currentStep === CheckoutStep.CONFIRMATION && "Order Confirmed!"}
                </h1>

                {/* Progress bar */}
                {currentStep !== CheckoutStep.CONFIRMATION && (
                    <div className="max-w-3xl mx-auto mb-8 sm:mb-10">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full h-1 bg-[#fefefe]/10"></div>
                            </div>
                            <div className="relative flex justify-between">
                                <div className="flex flex-col items-center">
                                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                                        currentStep >= CheckoutStep.SHIPPING_INFO
                                            ? 'bg-[#ff0054] text-[#fefefe]'
                                            : 'bg-[#fefefe]/20 text-[#fefefe]/50'
                                    }`}>
                                        {currentStep > CheckoutStep.SHIPPING_INFO ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : '1'}
                                    </div>
                                    <span className={`mt-2 text-xs ${
                                        currentStep >= CheckoutStep.SHIPPING_INFO ? 'text-[#fefefe]' : 'text-[#fefefe]/50'
                                    }`}>Shipping</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                                        currentStep >= CheckoutStep.PAYMENT
                                            ? 'bg-[#ff0054] text-[#fefefe]'
                                            : 'bg-[#fefefe]/20 text-[#fefefe]/50'
                                    }`}>
                                        {currentStep > CheckoutStep.PAYMENT ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : '2'}
                                    </div>
                                    <span className={`mt-2 text-xs ${
                                        currentStep >= CheckoutStep.PAYMENT ? 'text-[#fefefe]' : 'text-[#fefefe]/50'
                                    }`}>Payment</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                                        currentStep >= CheckoutStep.CONFIRMATION
                                            ? 'bg-[#ff0054] text-[#fefefe]'
                                            : 'bg-[#fefefe]/20 text-[#fefefe]/50'
                                    }`}>
                                        {currentStep > CheckoutStep.CONFIRMATION ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : '3'}
                                    </div>
                                    <span className={`mt-2 text-xs ${
                                        currentStep >= CheckoutStep.CONFIRMATION ? 'text-[#fefefe]' : 'text-[#fefefe]/50'
                                    }`}>Confirmation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                    {/* Checkout form */}
                    <div className="md:col-span-7">
                        {/* Step 1: Shipping Information */}
                        {currentStep === CheckoutStep.SHIPPING_INFO && (
                            <Card className="bg-[#060404]/80 border border-[#ff0054]/30">
                                <CardHeader className="px-4 sm:px-6">
                                    <CardTitle className="flex items-center text-xl sm:text-2xl font-bebas text-[#fefefe]">
                                        <Truck className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-[#ff0054]" />
                                        Shipping Address
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName" className="text-[#fefefe]">First Name</Label>
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                value={shippingInfo.firstName}
                                                onChange={handleInputChange}
                                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                                placeholder="Your first name"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName" className="text-[#fefefe]">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                value={shippingInfo.lastName}
                                                onChange={handleInputChange}
                                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                                placeholder="Your last name"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-[#fefefe]">Email</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={shippingInfo.email}
                                                onChange={handleInputChange}
                                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                                placeholder="you@example.com"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-[#fefefe]">Phone</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={shippingInfo.phone}
                                                onChange={handleInputChange}
                                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                                placeholder="Your phone number"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address1" className="text-[#fefefe]">Address</Label>
                                        <Input
                                            id="address1"
                                            name="address1"
                                            value={shippingInfo.address1}
                                            onChange={handleInputChange}
                                            className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                            placeholder="Street address"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address2" className="text-[#fefefe]">Apartment, suite, etc. (optional)</Label>
                                        <Input
                                            id="address2"
                                            name="address2"
                                            value={shippingInfo.address2}
                                            onChange={handleInputChange}
                                            className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                            placeholder="Additional address information"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city" className="text-[#fefefe]">City</Label>
                                            <Input
                                                id="city"
                                                name="city"
                                                value={shippingInfo.city}
                                                onChange={handleInputChange}
                                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                                placeholder="Your city"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="region" className="text-[#fefefe]">State/Province</Label>
                                            <Input
                                                id="region"
                                                name="region"
                                                value={shippingInfo.region}
                                                onChange={handleInputChange}
                                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                                placeholder="State or province"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="zip" className="text-[#fefefe]">Zip/Postal Code</Label>
                                            <Input
                                                id="zip"
                                                name="zip"
                                                value={shippingInfo.zip}
                                                onChange={handleInputChange}
                                                className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404]"
                                                placeholder="Postal code"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="country" className="text-[#fefefe]">Country</Label>
                                            <select
                                                id="country"
                                                name="country"
                                                value={shippingInfo.country}
                                                onChange={handleInputChange}
                                                className="w-full h-10 rounded-md border border-[#ff0054]/20 bg-[#fefefe] px-3 py-2 text-[#060404]"
                                                required
                                            >
                                                <option value="US">United States</option>
                                                <option value="MX">Mexico</option>
                                                <option value="CA">Canada</option>
                                                <option value="ES">Spain</option>
                                                {/* Add more countries as needed */}
                                            </select>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="justify-end border-t border-[#ff0054]/20 pt-4 px-4 sm:px-6">
                                    <Button
                                        onClick={goToNextStep}
                                        disabled={!canProceedToNextStep() || isProcessing}
                                        className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404] px-4 sm:px-6"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Preparing payment...
                                            </>
                                        ) : (
                                            "Continue"
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>
                        )}

                        {/* Step 2: Payment with Stripe Elements */}
                        {currentStep === CheckoutStep.PAYMENT && clientSecret && (
                            <Elements
                                stripe={stripePromise}
                                options={{
                                    clientSecret,
                                    appearance: {
                                        theme: 'stripe' as const,
                                        variables: {
                                            colorPrimary: '#ff0054',
                                            colorBackground: '#ffffff',
                                            colorText: '#060404',
                                            fontFamily: 'system-ui, sans-serif',
                                            borderRadius: '8px',
                                        },
                                    },
                                }}
                            >
                                <WearPaymentForm
                                    totalAmount={totalAmount}
                                    formatPrice={formatPrice}
                                    onSuccess={handlePaymentSuccess}
                                    onBack={goToPreviousStep}
                                />
                            </Elements>
                        )}

                        {/* Step 3: Confirmation */}
                        {currentStep === CheckoutStep.CONFIRMATION && (
                            <Card className="bg-[#060404]/80 border border-[#ff0054]/30">
                                <CardContent className="pt-6 pb-8 px-4 sm:px-6">
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                            <Check className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-bebas text-[#fefefe] mb-2">Thank you for your purchase!</h2>
                                        <p className="text-[#fefefe]/70 mb-6">
                                            Your order has been received and is being processed.
                                        </p>

                                        <div className="bg-[#fefefe]/5 p-4 rounded-lg w-full mb-6">
                                            <p className="text-[#fefefe]/70 text-sm">Order Number</p>
                                            <p className="text-[#fefefe] font-medium text-lg">{orderId}</p>
                                        </div>

                                        <p className="text-[#fefefe]/70 text-sm mb-8">
                                            We've sent an email with order confirmation to{' '}
                                            <span className="text-[#fefefe]">{shippingInfo.email}</span>
                                        </p>

                                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                            <Button
                                                className="bg-[#fefefe]/10 hover:bg-[#fefefe]/20 text-[#fefefe]"
                                                asChild
                                            >
                                                <Link href="/wear">Continue Shopping</Link>
                                            </Button>

                                            <Button
                                                className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404]"
                                                asChild
                                            >
                                                <Link href="/">Return to Home</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Cart summary */}
                    {currentStep !== CheckoutStep.CONFIRMATION && (
                        <div className="md:col-span-5">
                            <Card className="bg-[#060404]/80 border border-[#ff0054]/30 sticky top-20 sm:top-24 md:top-32">
                                <CardHeader className="px-4 sm:px-6">
                                    <CardTitle className="flex items-center text-xl sm:text-2xl font-bebas text-[#fefefe]">
                                        <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-[#ff0054]" />
                                        Order Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                                    {/* Product list */}
                                    <div className="space-y-3 sm:space-y-4 max-h-72 overflow-y-auto pr-2">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex gap-3 sm:gap-4 py-2 sm:py-3">
                                                <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded overflow-hidden border border-[#ff0054]/20 flex-shrink-0">
                                                    <Image
                                                        src={item.image || "/logo.png"}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-[#fefefe] font-medium truncate text-sm sm:text-base">{item.title}</h4>
                                                    {(item.size || item.color) && (
                                                        <p className="text-[#fefefe]/60 text-xs sm:text-sm">
                                                            {item.size && `Size: ${item.size}`}
                                                            {item.size && item.color && ' | '}
                                                            {item.color && `Color: ${item.color}`}
                                                        </p>
                                                    )}
                                                    <div className="flex justify-between mt-1">
                                                        <span className="text-[#fefefe]/60 text-xs sm:text-sm">Qty: {item.quantity}</span>
                                                        <span className="text-[#fbe40b] text-sm sm:text-base">{formatPrice(item.price * item.quantity)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Separator className="bg-[#ff0054]/20" />

                                    {/* Totals */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-[#fefefe]/70 text-sm">Subtotal</span>
                                            <span className="text-[#fefefe] text-sm sm:text-base">{formatPrice(totalAmount)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[#fefefe]/70 text-sm">Shipping</span>
                                            <span className="text-[#fefefe] text-sm sm:text-base">Calculated at next step</span>
                                        </div>
                                        <Separator className="bg-[#ff0054]/20" />
                                        <div className="flex justify-between">
                                            <span className="text-[#fefefe] font-medium text-sm sm:text-base">Total</span>
                                            <span className="text-lg sm:text-xl font-bold text-[#fbe40b]">{formatPrice(totalAmount)}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// Stripe payment form component used within Elements provider
function WearPaymentForm({
    totalAmount,
    formatPrice,
    onSuccess,
    onBack,
}: {
    totalAmount: number
    formatPrice: (price: number) => string
    onSuccess: () => void
    onBack: () => void
}) {
    const stripe = useStripe()
    const elements = useElements()
    const [isProcessing, setIsProcessing] = useState(false)
    const [paymentMessage, setPaymentMessage] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) return

        setIsProcessing(true)
        setPaymentMessage(null)

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/order-confirmation`,
            },
            redirect: 'if_required',
        })

        if (error) {
            setPaymentMessage(error.message || "An error occurred with your payment.")
            setIsProcessing(false)
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            onSuccess()
        } else {
            setPaymentMessage("Unexpected payment status. Please contact support.")
            setIsProcessing(false)
        }
    }

    return (
        <Card className="bg-[#060404]/80 border border-[#ff0054]/30">
            <CardHeader className="px-4 sm:px-6">
                <CardTitle className="flex items-center text-xl sm:text-2xl font-bebas text-[#fefefe]">
                    <CreditCard className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-[#ff0054]" />
                    Payment Information
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                <form id="wear-payment-form" onSubmit={handleSubmit}>
                    <div className="bg-[#fefefe] rounded-lg p-4 sm:p-6">
                        <PaymentElement />
                    </div>
                </form>

                {paymentMessage && (
                    <div className="p-3 rounded-md text-sm bg-red-50 text-red-700">
                        {paymentMessage}
                    </div>
                )}

                <div className="flex items-center p-4 bg-[#fefefe]/5 rounded-lg">
                    <div className="flex-1">
                        <h3 className="text-[#fefefe] font-medium">Total to pay</h3>
                        <p className="text-[#fefefe]/70 text-sm">Includes shipping and taxes</p>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-[#fbe40b]">{formatPrice(totalAmount)}</span>
                </div>
            </CardContent>
            <CardFooter className="justify-between border-t border-[#ff0054]/20 pt-4 px-4 sm:px-6">
                <Button
                    onClick={onBack}
                    variant="outline"
                    className="border-[#fefefe]/50 text-[#fefefe] hover:bg-[#fefefe]/10"
                    disabled={isProcessing}
                >
                    <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Back
                </Button>
                <Button
                    type="submit"
                    form="wear-payment-form"
                    disabled={isProcessing || !stripe || !elements}
                    className="bg-gradient-to-r from-[#ff0054] to-[#fbe40b] hover:from-[#fbe40b] hover:to-[#ff0054] text-[#060404]"
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        "Complete Purchase"
                    )}
                </Button>
            </CardFooter>
        </Card>
    )
}