// app/api/webhook/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import stripe from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

// Esta función procesa los webhooks de Stripe
export async function POST(req: Request) {
    const body = await req.text();
    // Await a la función headers() para obtener el objeto ReadonlyHeaders
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
        return NextResponse.json(
            { error: 'Falta firma de webhook o clave secreta' },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        // Verificar que el evento viene realmente de Stripe
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err: any) {
        console.error(`Error al verificar webhook: ${err.message}`);
        return NextResponse.json(
            { error: 'Error de verificación del webhook.' },
            { status: 400 }
        );
    }

    // Manejar diferentes tipos de eventos
    try {
        switch (event.type) {
            case 'payment_intent.succeeded':
                await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
                break;
            case 'payment_intent.payment_failed':
                await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
                break;
            case 'customer.created':
                // Podrías manejar la creación de nuevos clientes aquí
                break;
            default:
                console.log(`Evento no manejado: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Error al procesar webhook:', error);
        return NextResponse.json(
            { error: 'Error al procesar webhook' },
            { status: 500 }
        );
    }
}

// Función para manejar pagos exitosos
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
    console.log('Payment intent succeeded:', paymentIntent.id);

    try {
        // Actualizar el estado de la reserva en la base de datos
        await prisma.booking.update({
            where: {
                stripePaymentIntentId: paymentIntent.id,
            },
            data: {
                status: 'confirmed',
                confirmedAt: new Date(),
            },
        });

        // Aquí podrías añadir lógica adicional como:
        // - Enviar email de confirmación
        // - Notificar al personal
        // - Actualizar inventario
        // - etc.
    } catch (error) {
        console.error('Error al actualizar la reserva:', error);
        throw error;
    }
}

// Función para manejar pagos fallidos
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
    console.log('Payment intent failed:', paymentIntent.id);

    try {
        // Actualizar el estado de la reserva en la base de datos
        await prisma.booking.update({
            where: {
                stripePaymentIntentId: paymentIntent.id,
            },
            data: {
                status: 'failed',
                failedAt: new Date(),
                failureReason: paymentIntent.last_payment_error?.message || 'Unknown error',
            },
        });

        // Aquí podrías añadir lógica adicional como:
        // - Enviar email de notificación sobre el fallo
        // - Liberar la fecha reservada temporalmente
        // - etc.
    } catch (error) {
        console.error('Error al actualizar la reserva fallida:', error);
        throw error;
    }
}