// app/api/wear/orders/route.ts
import { NextResponse } from 'next/server';

const API_TOKEN = process.env.PRINTIFY_API_TOKEN;
const SHOP_ID = process.env.PRINTIFY_SHOP_ID;

interface LineItem {
    product_id: string;
    variant_id: number;
    quantity: number;
}

interface OrderData {
    external_id: string;
    label: string;
    line_items: LineItem[];
    shipping_method: number;
    send_shipping_notification: boolean;
    address_to: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        country: string;
        region: string;
        address1: string;
        address2?: string;
        city: string;
        zip: string;
    };
}

export async function POST(req: Request) {
    try {
        const orderData: OrderData = await req.json();

        // Validar datos de la orden
        if (!orderData.external_id || !orderData.line_items || !orderData.line_items.length || !orderData.address_to) {
            return NextResponse.json(
                { error: 'Datos de orden incompletos' },
                { status: 400 }
            );
        }

        // Verificar que haya al menos un artículo en la orden
        if (orderData.line_items.length === 0) {
            return NextResponse.json(
                { error: 'La orden debe contener al menos un artículo' },
                { status: 400 }
            );
        }

        // Validar información de dirección
        const {
            first_name,
            last_name,
            email,
            phone,
            country,
            region,
            address1,
            city,
            zip
        } = orderData.address_to;

        if (!first_name || !last_name || !email || !phone || !country || !region || !address1 || !city || !zip) {
            return NextResponse.json(
                { error: 'Información de dirección incompleta' },
                { status: 400 }
            );
        }

        // Realizar la solicitud a la API de Printify
        console.log('Enviando orden a Printify:', orderData);

        const response = await fetch(
            `https://api.printify.com/v1/shops/${SHOP_ID}/orders.json`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json',
                    'User-Agent': 'Impulse Rentals Web App'
                },
                body: JSON.stringify(orderData)
            }
        );

        // Procesar la respuesta
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error de Printify:', errorData);

            // Devolver un error más amigable para el usuario
            if (response.status === 401 || response.status === 403) {
                return NextResponse.json(
                    { error: 'Error de autenticación con Printify' },
                    { status: response.status }
                );
            } else if (response.status === 404) {
                return NextResponse.json(
                    { error: 'Recurso no encontrado en Printify' },
                    { status: 404 }
                );
            } else if (response.status === 422) {
                return NextResponse.json(
                    { error: 'Datos de la orden inválidos.' },
                    { status: 422 }
                );
            } else {
                return NextResponse.json(
                    { error: 'Error del servicio de impresión. Intente de nuevo.' },
                    { status: response.status }
                );
            }
        }

        // Devolver la respuesta exitosa
        const data = await response.json();

        // Guardar la orden en nuestra base de datos
        // Esto sería implementado en una aplicación real
        // await prisma.order.create({ data: { ... } })

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error al procesar la orden:', error);

        return NextResponse.json(
            { error: 'Error al procesar la orden. Intente de nuevo.' },
            { status: 500 }
        );
    }
}

// Endpoint para obtener información sobre una orden
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const orderId = searchParams.get('id');

        if (!orderId) {
            return NextResponse.json(
                { error: 'ID de orden no proporcionado' },
                { status: 400 }
            );
        }

        // Realizar la solicitud a la API de Printify
        const response = await fetch(
            `https://api.printify.com/v1/shops/${SHOP_ID}/orders/${orderId}.json`,
            {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'User-Agent': 'Impulse Rentals Web App'
                }
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: 'Error al obtener la información de la orden.' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error al obtener la información de la orden:', error);

        return NextResponse.json(
            { error: 'Error al obtener la información de la orden. Intente de nuevo.' },
            { status: 500 }
        );
    }
}