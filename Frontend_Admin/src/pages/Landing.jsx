// src/pages/Landing.jsx
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight, Award, Flame, Users } from 'lucide-react';

const LandingPage = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: Award,
            title: 'Calidad Premium',
            description: 'Los mejores cortes de proveedores de confianza',
        },
        {
            icon: Flame,
            title: 'Preparación Experta',
            description: 'Elaborado por profesionales culinarios experimentados',
        },
        {
            icon: Users,
            title: 'Servicio Excepcional',
            description: 'Dedicados a tu completa satisfacción',
        },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-neutral-950">
            <Navbar />

            {/* Hero Section - Enhanced */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Background Image with Parallax - No blur */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-fixed transition-transform duration-75"
                    style={{
                        backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/034/467/747/non_2x/red-meat-steaks-fresh-raw-beef-steaks-on-dark-counter-table-top-view-text-copy-space-view-from-above-spices-herbs-seasoning-for-cooking-grilling-on-black-wooden-background-generative-ai-free-photo.jpg')`,
                        transform: `translateY(${scrollY * 0.5}px)`,
                    }}
                />

                {/* Darker Overlay - Removed backdrop-blur */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-neutral-950/80 to-black/90" />

                {/* Remove or reduce Grain Texture opacity if desired */}
                <div
                    className="absolute inset-0 opacity-3"
                    style={{
                        backgroundImage:
                            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'4.5\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                    }}
                />

                {/* Content with High Z-Index */}
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    {/* CAMBIOS AQUÍ PARA CENTRAR:
                        1. mx-auto: Centra el bloque horizontalmente.
                        2. text-center: Centra el texto dentro del bloque.
                        3. flex flex-col items-center: Alinea elementos flex (como la línea y el badge) al centro.
                    */}
                    <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                        {/* Accent Line */}
                        <div className="w-16 h-1 bg-primary-500 mb-6 rounded-full" />

                        {/* Badge */}
                        <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold tracking-widest uppercase text-primary-500 bg-primary-500/10 border border-primary-500/20 rounded-full backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
                            Experiencia Auténtica
                        </span>

                        {/* Main Heading */}
                        <h1
                            className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none mb-8 tracking-tight drop-shadow-2xl"
                            style={{ fontFamily: 'Georgia, serif' }}
                        >
                            Donde el Fuego
                            <span className="block text-primary-500 mt-2">
                                Alcanza la Perfección
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-neutral-300 text-xl sm:text-2xl mb-10 font-normal max-w-2xl leading-relaxed drop-shadow-lg">
                            Descubre los mejores cortes, preparados con maestría y
                            servidos con pasión
                        </p>

                        {/* CTA Buttons */}
                        {/* CAMBIO: justify-center para centrar los botones horizontalmente */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/menu"
                                className="
                                group inline-flex items-center justify-center gap-3 px-8 py-4
                                bg-primary-500 hover:bg-primary-600
                                text-white font-medium text-base
                                rounded-lg shadow-lg shadow-primary-500/25
                                transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-950
                                active:scale-[0.98] cursor-pointer
                                "
                            >
                                Explorar Menú
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>

                            <a
                                href="/calendar"
                                className="
                                group inline-flex items-center justify-center gap-3 px-8 py-4
                                bg-transparent hover:bg-neutral-800
                                text-neutral-300 hover:text-white font-medium text-base
                                rounded-lg border border-neutral-700 hover:border-neutral-600
                                tansition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-950
                                cursor-pointer
                                "
                            >
                                Ver Eventos
                            </a>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-neutral-700 rounded-full flex justify-center p-2">
                        <div className="w-1 h-3 bg-neutral-500 rounded-full animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Features Section - Refined */}
            <section className="relative bg-gradient-to-b from-neutral-950 to-neutral-900 py-24 sm:py-32 border-t border-neutral-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="
                    group relative text-center p-8 
                    bg-neutral-900 
                    border border-neutral-800 
                    rounded-2xl 
                    hover:border-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/10
                    transition-all duration-300
                    hover:-translate-y-2
                    "
                                >
                                    {/* Glow Effect on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:to-primary-500/0 rounded-2xl transition-all duration-300 pointer-events-none" />

                                    {/* Icon */}
                                    <div className="relative w-16 h-16 mx-auto mb-6 bg-primary-500/10 border border-neutral-400 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-500/20 transition-all duration-300">
                                        <Icon className="w-8 h-8" style={{ color: '#b8812e' }} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-white text-lg font-semibold mb-3 tracking-tight">
                                        {feature.title}
                                    </h3>

                                    <p className="text-neutral-400 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />

            <style>{`
        @keyframes scroll {
        0%, 100% { transform: translateY(0); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(20px); opacity: 0; }
        }

        .animate-scroll {
        animation: scroll 2s ease-in-out infinite;
        }
    `}</style>
        </div>
    );
};

export default LandingPage;