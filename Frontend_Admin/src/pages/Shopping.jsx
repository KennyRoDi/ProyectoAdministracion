// src/pages/Shopping.jsx
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HeroSection, Card, Button } from '../components/ui/SharedComponents';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle, Clock, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ShoppingPage = () => {
    const { cartItems, updateQuantity, removeFromCart: removeItem } = useCart();
    const [isVisible, setIsVisible] = useState({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible((prev) => ({
                            ...prev,
                            [entry.target.id]: true,
                        }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.observe').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return (
        <div className="flex flex-col min-h-screen bg-neutral-950">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <HeroSection
                    badge="Tu Pedido"
                    title="Carrito de Compras"
                    subtitle={cartItems.length > 0
                        ? `${cartItems.length} ${cartItems.length === 1 ? 'artículo' : 'artículos'} en tu carrito`
                        : "Tu carrito está esperando ser llenado con deliciosos artículos"
                    }
                />

                {/* Main Content */}
                <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-neutral-950 to-neutral-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                        {cartItems.length === 0 ? (
                            /* Empty Cart State */
                            <div
                                id="empty-cart"
                                className="observe max-w-2xl mx-auto text-center"
                            >
                                <Card
                                    className={`p-12 md:p-16 transition-all duration-1000 ${isVisible['empty-cart']
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 translate-y-10'
                                    }`}
                                >
                                    {/* Icon */}
                                    <div className="w-24 h-24 mx-auto mb-8 bg-primary-500/10 border-2 border-primary-500/20 rounded-full flex items-center justify-center">
                                        <ShoppingBag className="w-12 h-12" style={{ color: '#b8812e' }} />
                                    </div>

                                    {/* Title */}
                                    <h2
                                        className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
                                        style={{ fontFamily: 'Georgia, serif' }}
                                    >
                                        Tu Carrito Está Vacío
                                    </h2>

                                    {/* Description */}
                                    <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
                                        Descubre nuestro menú cuidadosamente seleccionado y agrega tus platillos favoritos para comenzar
                                    </p>

                                    {/* CTA Button */}
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        /* CAMBIO: Agregado cursor-pointer */
                                        className="inline-flex items-center gap-2 cursor-pointer"
                                        onClick={() => window.location.href = '/menu'}
                                    >
                                        Explorar Nuestro Menú
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Card>
                            </div>
                        ) : (
                            /* Cart with Items */
                            <div
                                id="cart-content"
                                className="observe grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
                            >
                                {/* Cart Items List */}
                                <div
                                    className={`lg:col-span-2 space-y-4 transition-all duration-1000 ${isVisible['cart-content']
                                            ? 'opacity-100 translate-x-0'
                                            : 'opacity-0 -translate-x-10'
                                    }`}
                                >
                                    {/* Section Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                                            Artículos del Carrito
                                        </h2>
                                        <a
                                            href="/menu"
                                            /* CAMBIO: Agregado cursor-pointer explícito */
                                            className="text-primary-500 hover:text-white transition-colors text-sm font-medium inline-flex items-center gap-2 cursor-pointer"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Agregar Más
                                        </a>
                                    </div>

                                    {/* Cart Items */}
                                    {cartItems.map((item, index) => (
                                        <Card
                                            key={item.id}
                                            className="p-6 hover:border-primary-500/30 transition-all duration-300"
                                            style={{
                                                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                                            }}
                                        >
                                            <div className="flex flex-col sm:flex-row gap-6">
                                                {/* Product Image */}
                                                <div className="w-full sm:w-32 h-32 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg flex items-center justify-center flex-shrink-0 border border-neutral-700">
                                                    {item.img ? (
                                                        <img 
                                                            src={item.img} 
                                                            alt={item.name}
                                                            className="w-full h-full object-cover rounded-lg"
                                                        />
                                                    ) : (
                                                        <ShoppingBag className="w-12 h-12" style={{ color: '#b8812e' }} />
                                                    )}
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-1 min-w-0">
                                                    {/* Header */}
                                                    <div className="flex items-start justify-between gap-4 mb-3">
                                                        <div className="flex-1">
                                                            <h3 className="text-xl font-semibold text-white mb-1 tracking-tight">
                                                                {item.name}
                                                            </h3>
                                                            <p className="text-sm text-neutral-400 leading-relaxed">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            /* CAMBIO: Agregado cursor-pointer */
                                                            className="p-2 text-neutral-400 hover:text-error hover:bg-error/10 rounded-lg transition-all duration-200 cursor-pointer"
                                                            aria-label="Eliminar artículo"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>

                                                    {/* Quantity and Price */}
                                                    <div className="flex items-center justify-between">
                                                        {/* Quantity Controls */}
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                /* CAMBIO: Agregado cursor-pointer */
                                                                className="w-8 h-8 bg-neutral-800 hover:bg-primary-500 border border-neutral-700 hover:border-primary-500 rounded-lg flex items-center justify-center text-white transition-all duration-200 cursor-pointer"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </button>
                                                            <span className="text-white font-semibold w-8 text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                /* CAMBIO: Agregado cursor-pointer */
                                                                className="w-8 h-8 bg-neutral-800 hover:bg-primary-500 border border-neutral-700 hover:border-primary-500 rounded-lg flex items-center justify-center text-white transition-all duration-200 cursor-pointer"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </button>
                                                        </div>

                                                        {/* Price */}
                                                        <div className="text-right">
                                                            <p className="font-bold text-xl" style={{ color: '#b8812e' }}>
                                                                ₡{(item.price * item.quantity).toFixed(2)}
                                                            </p>
                                                            {item.quantity > 1 && (
                                                                <p className="text-neutral-500 text-xs">
                                                                    ₡{item.price.toFixed(2)} c/u
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>

                                {/* Order Summary Sidebar */}
                                <div
                                    className={`transition-all duration-1000 ${isVisible['cart-content']
                                            ? 'opacity-100 translate-x-0'
                                            : 'opacity-0 translate-x-10'
                                    }`}
                                >
                                    <div className="sticky top-28 space-y-6">
                                        {/* Summary Card */}
                                        <Card className="p-6">
                                            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">
                                                Resumen del Pedido
                                            </h2>

                                            {/* Price Breakdown */}
                                            <div className="space-y-4 mb-6">
                                                <div className="flex justify-between text-neutral-300">
                                                    <span>Subtotal</span>
                                                    <span className="font-semibold">₡{subtotal.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between text-neutral-300">
                                                    <span>Impuesto (8%)</span>
                                                    <span className="font-semibold">₡{tax.toFixed(2)}</span>
                                                </div>
                                                <div className="border-t border-neutral-700 pt-4">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-white text-lg font-bold">Total</span>
                                                        <span className="text-2xl font-bold" style={{ color: '#b8812e' }}>
                                                            ₡{total.toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Checkout Button */}
                                            <Button
                                                variant="primary"
                                                size="lg"
                                                /* CAMBIO: Agregado cursor-pointer */
                                                className="w-full mb-4 justify-center cursor-pointer bg-neutral-800 hover:bg-neutral-700"
                                                onClick={() => window.location.href = '/checkout'}
                                            >
                                                Proceder al Pago
                                                <ArrowRight className="w-5 h-5" />
                                            </Button>

                                            {/* Continue Shopping Button */}
                                            <Button
                                                variant="secondary"
                                                size="md"
                                                /* CAMBIO: Agregado cursor-pointer */
                                                className="w-full justify-center cursor-pointer"
                                                onClick={() => window.location.href = '/menu'}
                                            >
                                                Seguir Comprando
                                            </Button>
                                        </Card>

                                        {/* Additional Info Card */}
                                        <Card className="p-6">
                                            <h3 className="text-lg font-semibold text-white mb-4 tracking-tight">
                                                Información del Pedido
                                            </h3>
                                            <div className="space-y-4 text-sm">
                                                <div className="flex items-start gap-3">
                                                    <CheckCircle className="w-5 h-5" style={{ color: '#b8812e' }} />
                                                    <span className="text-neutral-300">Proceso de pago seguro</span>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <Clock className="w-5 h-5" style={{ color: '#b8812e' }} />
                                                    <span className="text-neutral-300">Preparación estimada: 45-60 minutos</span>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <CreditCard className="w-5 h-5" style={{ color: '#b8812e' }} />
                                                    <span className="text-neutral-300">Se aceptan todas las tarjetas principales</span>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default ShoppingPage;