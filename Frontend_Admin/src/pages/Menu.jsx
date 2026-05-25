// src/pages/Menu.jsx
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useMenuData } from '../hooks/useMenuData';
import { useCart } from '../context/CartContext';
import {
    HeroSection,
    Card,
    Badge,
    Button,
} from '../components/ui/SharedComponents';
import { ShoppingCart, Plus, Loader2 } from 'lucide-react';

const categories = [
    { id: 'steaks', name: 'Cortes' },
    { id: 'appetizers', name: 'Entradas' },
    { id: 'sides', name: 'Acompañamientos' },
    { id: 'desserts', name: 'Postres' },
    { id: 'drinks', name: 'Bebidas' },
];

const MenuPage = () => {
    const [activeCategory, setActiveCategory] = useState('steaks');
    const [isVisible, setIsVisible] = useState({});
    const { menuItems, loading, error } = useMenuData();
    const { addToCart } = useCart();

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

        // Small delay to ensure elements are in DOM
        const timeoutId = setTimeout(() => {
            document.querySelectorAll('.observe').forEach((el) => {
                observer.observe(el);
            });
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, [menuItems]);

    // Debug: Log menuItems to see what's being received
    useEffect(() => {
        console.log('Menu Items:', menuItems);
        console.log('Active Category:', activeCategory);
        console.log(
            'Items in Active Category:',
            menuItems[activeCategory]
        );
    }, [menuItems, activeCategory]);

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-neutral-950">
                <Navbar />
                <main className="flex-grow flex items-center justify-center pt-20">
                    <div className="text-center">
                        <Loader2 className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
                        <h2 className="text-white text-2xl font-light">
                            Cargando menú...
                        </h2>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col min-h-screen bg-neutral-950">
                <Navbar />
                <main className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-20">
                    <div className="max-w-2xl">
                        <Card className="p-8 md:p-12">
                            <div className="w-16 h-16 bg-error/10 border-2 border-error/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg
                                    className="w-8 h-8 text-error"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h2 className="text-error text-3xl font-bold mb-4">
                                Error al Cargar el Menú
                            </h2>
                            <p className="text-neutral-400 mb-6">{error}</p>
                            <p className="text-neutral-500 text-sm">
                                Asegúrate de que la API de Django esté ejecutándose en:{' '}
                                <code className="text-primary-500 bg-neutral-800 px-2 py-1 rounded">
                                    http://127.0.0.1:8000
                                </code>
                            </p>
                        </Card>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-neutral-950">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <HeroSection
                    backgroundImage="https://images.unsplash.com/photo-1544025162-d76694265947?w=1920&q=80"
                    badge="Excelencia Culinaria"
                    title="Nuestro Menú"
                    subtitle="Descubre nuestra selección cuidadosamente curada de platillos premium"
                />

                {/* Category Filter - Sticky */}
                <section className="sticky top-20 z-40 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex overflow-x-auto gap-2 py-4 scrollbar-hide">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        /* CAMBIOS AQUÍ:
                                           1. Agregado 'cursor-pointer'
                                           2. Agregado 'hover:bg-primary-600' al estado activo
                                           3. El estado inactivo ya tenía 'hover:bg-neutral-800'
                                        */
                                        className={`
                      flex items-center gap-2 px-6 py-3 
                      rounded-lg whitespace-nowrap
                      font-medium text-sm tracking-wider uppercase
                      transition-all duration-200 cursor-pointer
                      ${activeCategory === category.id
                                                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25 hover:bg-primary-600'
                                                : 'bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-600'
                                            }
                    `}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Menu Items */}
                <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-neutral-950 to-neutral-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <div
                            id="menu-items"
                            className="observe grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                        >
                            {menuItems[activeCategory] &&
                                menuItems[activeCategory].length > 0 ? (
                                menuItems[activeCategory].map((item, index) => (
                                    <Card
                                        key={item.id}
                                        hover
                                        className={`
                                        p-6 md:p-8 transition-all duration-700
                                        ${isVisible['menu-items']
                                                ? 'opacity-100 translate-y-0'
                                                : 'opacity-100 translate-y-0'
                                            }
                    `}
                                        style={{
                                            animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                                        }}
                                    >
                                        {/* Add Image Section */}
                                        {item.img && (
                                            <div className="mb-4 rounded-lg overflow-hidden aspect-video bg-neutral-800">
                                                <img
                                                    src={item.img}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                    onError={(e) => {
                                                        // Fallback if image fails to load
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {/* Item Header */}
                                        <div className="flex justify-between items-start gap-4 mb-4">
                                            <div className="flex-1 text-left" style={{ textAlign: 'left' }}>
                                                <h3
                                                    className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight"
                                                    style={{ fontFamily: 'Georgia, serif', textAlign: 'left' }}
                                                >
                                                    {item.name}
                                                </h3>
                                            </div>
                                            <div className="text-2xl font-bold" style={{ color: '#b8812e' }}>
                                                {typeof item.price === 'string' && item.price.includes('₡') 
                                                    ? item.price 
                                                    : `₡${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}`}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6 text-left" style={{ textAlign: 'left' }}>
                                            {item.description}
                                        </p>

                                        {/* Footer with Badge and Button */}
                                        <div className="flex items-center justify-between gap-4">
                                            {/* Availability Badge */}
                                            <Badge
                                                variant={item.available ? 'success' : 'error'}
                                            >
                                                {item.available ? 'Disponible' : 'No Disponible'}
                                            </Badge>

                                            {/* Add to Cart Button */}
                                            {item.available && (
                                                /* CAMBIOS AQUÍ:
                                                   1. Agregado 'cursor-pointer'
                                                   2. Agregado 'hover:bg-primary-600' para cambiar color
                                                   3. Agregado 'transition-colors'
                                                */
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    onClick={() => addToCart(item)}
                                                    className="group cursor-pointer bg-neutral-800 hover:bg-neutral-700 transition-colors"
                                                >
                                                    <ShoppingCart className="w-4 h-4" />
                                                    <span className="hidden sm:inline">
                                                        Agregar al Carrito
                                                    </span>
                                                    <Plus className="w-4 h-4 sm:hidden" />
                                                </Button>
                                            )}
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <div className="md:col-span-2">
                                    <Card className="p-12 text-center">
                                        <div className="w-16 h-16 bg-neutral-800 border-2 border-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg
                                                className="w-8 h-8 text-neutral-600"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">
                                            No Hay Artículos Disponibles
                                        </h3>
                                        <p className="text-neutral-400">
                                            Actualmente no hay artículos en esta categoría.
                                        </p>
                                    </Card>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
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

export default MenuPage;