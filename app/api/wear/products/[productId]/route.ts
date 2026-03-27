// app/api/wear/products/[productId]/route.ts
import { NextResponse } from 'next/server';

const API_TOKEN = process.env.PRINTIFY_API_TOKEN;
const SHOP_ID = process.env.PRINTIFY_SHOP_ID;

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const segments = url.pathname.split('/');
        const productId = segments[segments.length - 1];

        if (!productId) {
            return NextResponse.json(
                { error: 'ID de producto no proporcionado' },
                { status: 400 }
            );
        }

        const response = await fetch(
            `https://api.printify.com/v1/shops/${SHOP_ID}/products/${productId}.json`,
            {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'User-Agent': 'Impulse Rentals Web App'
                },
                next: { revalidate: 300 }
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Error al obtener el producto.' },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching product from Printify:', error);
        return NextResponse.json(
            { error: 'Error al obtener el producto.' },
            { status: 500 }
        );
    }
}