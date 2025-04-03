// app/api/wear/products/[productId]/route.ts
import { NextResponse } from 'next/server';

// Asegurar que la ruta sea dinámica
export const dynamic = 'force-dynamic';

// Almacenar variables de entorno seguras para producción
const API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6IjIxMDFiZmUyYzU2NjhlNjgxMTNjMmFhNGY0YjkzMjFkN2E4ZGI0ZTMwZmMzYzVmNTczZWU1N2NkYzU2YTFlMGRiM2IxOWQ5NDllYmE4NmFiIiwiaWF0IjoxNzQwMjY5MDU1Ljk5MDQ1NCwibmJmIjoxNzQwMjY5MDU1Ljk5MDQ1NywiZXhwIjoxNzcxODA1MDU1Ljk3NDc5Miwic3ViIjoiMTA5MTMzMzAiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIiwidXNlci5pbmZvIl19.AVooeLzDiGre0JFGufX7PPjYif9LGg8DWHQH9Y_7n6kYNLbwaHONCiDYxuXrivTU3DTJU81u7cDNtLDNDP0';
const SHOP_ID = '5981437';

// En un entorno real, obtendrías estos valores de variables de entorno:
// const API_TOKEN = process.env.PRINTIFY_API_TOKEN;
// const SHOP_ID = process.env.PRINTIFY_SHOP_ID;

// Versión simplificada que evita el problema de tipos
export async function GET(req: Request) {
    try {
        // Extraer el productId de la URL
        const url = new URL(req.url);
        const segments = url.pathname.split('/');
        const productId = segments[segments.length - 1];

        if (!productId) {
            return NextResponse.json(
                { error: 'ID de producto no proporcionado' },
                { status: 400 }
            );
        }

        // Realizar la solicitud a la API de Printify
        const response = await fetch(
            `https://api.printify.com/v1/shops/${SHOP_ID}/products/${productId}.json`,
            {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'User-Agent': 'Impulse Rentals Web App'
                },
                cache: 'no-store'
            }
        );

        if (!response.ok) {
            // Si la API de Printify devuelve un error, lo propagamos
            const errorData = await response.json();
            return NextResponse.json({ error: errorData }, { status: response.status });
        }

        const data = await response.json();

        // Devolver los datos al cliente
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching product from Printify:', error);
        return NextResponse.json(
            { error: 'Error al obtener el producto de Printify' },
            { status: 500 }
        );
    }
}