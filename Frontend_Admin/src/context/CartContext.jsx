import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // Intentamos leer del localStorage para no perder datos al recargar
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem('my-cart');
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });

    // Guardamos en localStorage cada vez que cambia el carrito
    useEffect(() => {
        localStorage.setItem('my-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Lógica para agregar (si ya existe, suma cantidad)
    const addToCart = (product) => {
        setCartItems(prev => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            // Aseguramos precio numérico
            const priceNum = typeof product.price === 'string' ? parseFloat(product.price.replace('$', '')) : product.price;
            return [...prev, { ...product, price: priceNum, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => setCartItems(prev => prev.filter(item => item.id !== id));
    
    const updateQuantity = (id, val) => {
        if (val < 1) return;
        setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: val } : item));
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalItems }}>
            {children}
        </CartContext.Provider>
    );
};