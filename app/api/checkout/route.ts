// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            amount,
            serviceId,
            serviceName,
            optionName,
            date,
            customerInfo
        } = body;

        // Validar los datos recibidos
        if (!amount || !serviceId || !serviceName || !optionName || !date || !customerInfo) {
            return NextResponse.json(
                { error: 'Faltan datos requeridos para crear el intent de pago' },
                { status: 400 }
            );
        }

        // Validar la información del cliente
        const { firstName, lastName, email, phone } = customerInfo;
        if (!firstName || !lastName || !email || !phone) {
            return NextResponse.json(
                { error: 'Información del cliente incompleta' },
                { status: 400 }
            );
        }

        // Crear o recuperar el cliente en Stripe
        const customerList = await stripe.customers.list({
            email,
            limit: 1,
        });

        let customerId: string;

        if (customerList.data.length > 0) {
            // Usar el cliente existente
            customerId = customerList.data[0].id;
        } else {
            // Crear un nuevo cliente
            const customer = await stripe.customers.create({
                email,
                name: `${firstName} ${lastName}`,
                phone,
                metadata: {
                    serviceId,
                },
            });
            customerId = customer.id;
        }

        // Crear un payment intent con Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // La cantidad en centavos
            currency: 'usd',
            customer: customerId,
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                serviceId,
                serviceName,
                optionName,
                bookingDate: new Date(date).toISOString(),
                customerName: `${firstName} ${lastName}`,
                customerEmail: email,
                customerPhone: phone,
            },
        });

        // Crear un registro previo en la base de datos
        const booking = await prisma.booking.create({
            data: {
                stripePaymentIntentId: paymentIntent.id,
                serviceId,
                serviceName,
                optionName,
                amount,
                bookingDate: new Date(date),
                status: 'pending',
                customer: {
                    create: {
                        firstName,
                        lastName,
                        email,
                        phone,
                    },
                },
            },
        });

        // Devolver el client secret del payment intent para continuar en el frontend
        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            bookingId: booking.id
        });
    } catch (error: any) {
        console.error('Error al crear el intent de pago:', error);
        return NextResponse.json(
            { error: 'Error al procesar el pago. Intente de nuevo.' },
            { status: 500 }
        );
    }
}