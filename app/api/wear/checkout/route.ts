// app/api/wear/checkout/route.ts
import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { amount, shippingInfo, lineItems } = body;

        if (!amount || !shippingInfo || !lineItems || !lineItems.length) {
            return NextResponse.json(
                { error: 'Datos incompletos para procesar el pago.' },
                { status: 400 }
            );
        }

        const { firstName, lastName, email, phone } = shippingInfo;
        if (!firstName || !lastName || !email || !phone) {
            return NextResponse.json(
                { error: 'Información del cliente incompleta.' },
                { status: 400 }
            );
        }

        // Find or create customer in Stripe
        const customerList = await stripe.customers.list({
            email,
            limit: 1,
        });

        let customerId: string;

        if (customerList.data.length > 0) {
            customerId = customerList.data[0].id;
        } else {
            const customer = await stripe.customers.create({
                email,
                name: `${firstName} ${lastName}`,
                phone,
            });
            customerId = customer.id;
        }

        // Create PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            customer: customerId,
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                type: 'wear_order',
                customerEmail: email,
                customerName: `${firstName} ${lastName}`,
                lineItems: JSON.stringify(lineItems.map((item: any) => ({
                    product_id: item.product_id,
                    variant_id: item.variant_id,
                    quantity: item.quantity,
                }))),
                shippingAddress: JSON.stringify({
                    first_name: shippingInfo.firstName,
                    last_name: shippingInfo.lastName,
                    email: shippingInfo.email,
                    phone: shippingInfo.phone,
                    country: shippingInfo.country,
                    region: shippingInfo.region,
                    address1: shippingInfo.address1,
                    address2: shippingInfo.address2 || '',
                    city: shippingInfo.city,
                    zip: shippingInfo.zip,
                }),
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error: any) {
        console.error('Error creating wear checkout:', error);
        return NextResponse.json(
            { error: 'Error al procesar el pago. Intente de nuevo.' },
            { status: 500 }
        );
    }
}
