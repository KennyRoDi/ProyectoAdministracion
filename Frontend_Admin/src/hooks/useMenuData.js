// src/hooks/useMenuData.js

import { useState, useEffect } from 'react';

// 1. Mapeo de categorías: API -> Frontend
const CATEGORY_MAP = {
    'Fuerte': 'steaks',
    'Entrada': 'appetizers',
    'Ensalada': 'sides',
    'Postre': 'desserts',
    'Bebida': 'drinks',
};

// 2. Función para transformar los datos de la API
const transformData = (apiData) => {
    const groupedItems = {
        steaks: [],
        appetizers: [],
        sides: [],
        desserts: [],
        drinks: []
    };

    for (const item of apiData) {
        const frontendCategory = CATEGORY_MAP[item.tipo];

        if (frontendCategory) {
            const newItem = {
                id: item.idproducto,
                name: item.nombre,
                description: item.descripcion,
                price: `${item.precio}`,
                available: item.disponible,
                img: item.img || null,  // ← Add this line
            };

            groupedItems[frontendCategory].push(newItem);
        }
    }

    return groupedItems;
};

// 3. Este es el Hook Personalizado
export const useMenuData = () => {
    // Todos los estados que teníamos antes, ahora viven aquí
    const [menuItems, setMenuItems] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // El useEffect que hace la llamada, también vive aquí
    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/productos/');

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const data = await response.json();
                console.log('Raw API Data:', data);
                console.log('Sample item tipo:', data[0]?.tipo);

                const transformed = transformData(data);
                console.log('Transformed Data:', transformed);

                setMenuItems(transformed);

            } catch (e) {
                setError(e.message);
                console.error("Error al cargar el menú:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuData();
    }, []); // El array vacío [] significa que esto se ejecuta 1 sola vez

    // 4. El hook devuelve los estados para que el componente los use
    return { menuItems, loading, error };
};