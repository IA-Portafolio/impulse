// app/api/printify/products/route.ts
import { NextResponse } from 'next/server';

const API_TOKEN = process.env.PRINTIFY_API_TOKEN;
const SHOP_ID = process.env.PRINTIFY_SHOP_ID;

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page') || '1';
        const limit = searchParams.get('limit') || '20';

        const response = await fetch(
            `https://api.printify.com/v1/shops/${SHOP_ID}/products.json?page=${page}&limit=${limit}`,
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
                { error: 'Error al obtener productos.' },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching products from Printify:', error);
        return NextResponse.json(
            { error: 'Error al obtener productos.' },
            { status: 500 }
        );
    }
}