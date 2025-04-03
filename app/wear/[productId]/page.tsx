// app/wear/[productId]/page.tsx
"use client"

import { useEffect, useState } from 'react'
import ProductDetailPage from '@/components/custom/product-detail-page'

export default function ProductDetail() {
    const [productId, setProductId] = useState<string>('')

    useEffect(() => {
        // Extraer el productId de la URL
        if (typeof window !== 'undefined') {
            const pathSegments = window.location.pathname.split('/');
            const id = pathSegments[pathSegments.length - 1];
            setProductId(id);
        }
    }, [])

    if (!productId) {
        return <div>Loading...</div>
    }

    return <ProductDetailPage params={{ productId }} />
}