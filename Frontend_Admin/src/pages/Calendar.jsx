// src/pages/Calendar.jsx
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HeroSection, SectionHeader, Card, Badge } from '../components/ui/SharedComponents';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
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

    // Example event - single event for demonstration
    const exampleEvent = {
        12: [
            {
                title: "Noche de Cortes premium con Vinos",
                time: "7:00 PM - 10:00 PM",
                description: "Únete a nosotros para una cena exclusiva de maridaje con la selección curada de nuestro sommelier",
                location: "Salón Comedor Principal",
                type: "especial"
            }
        ]
    };

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const currentMonth = monthNames[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();

    // Generate calendar days
    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const hasEvent = (day) => exampleEvent[day];

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
        setSelectedDate(null);
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
        setSelectedDate(null);
    };

    return (
        <div className="flex flex-col min-h-screen bg-neutral-950">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <HeroSection
                    backgroundImage="https://wallpaperaccess.com/full/11177792.jpg"
                    badge="Eventos y Agenda"
                    title="Calendario"
                    subtitle="Mantente actualizado con nuestros eventos exclusivos y experiencias gastronómicas especiales"
                />

                {/* Calendar Section */}
                <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-neutral-950 to-neutral-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        
                        <div
                            id="calendar-section"
                            className="observe grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
                        >
                            {/* Calendar Grid */}
                            <div
                                className={`lg:col-span-2 transition-all duration-1000 ${
                                    isVisible['calendar-section']
                                        ? 'opacity-100 translate-x-0'
                                        : 'opacity-0 -translate-x-10'
                                }`}
                            >
                                <Card className="p-6 md:p-8">
                                    {/* Calendar Header */}
                                    <div className="flex items-center justify-between mb-8">
                                        <button
                                            onClick={goToPreviousMonth}
                                            /* CAMBIO: Agregado cursor-pointer */
                                            className="p-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 rounded-lg transition-all duration-200 group cursor-pointer"
                                            aria-label="Mes anterior"
                                        >
                                            <svg
                                                className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>

                                        <h2
                                            className="text-2xl md:text-3xl font-bold text-white tracking-tight"
                                            style={{ fontFamily: 'Georgia, serif' }}
                                        >
                                            {currentMonth} {currentYear}
                                        </h2>

                                        <button
                                            onClick={goToNextMonth}
                                            /* CAMBIO: Agregado cursor-pointer */
                                            className="p-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 rounded-lg transition-all duration-200 group cursor-pointer"
                                            aria-label="Mes siguiente"
                                        >
                                            <svg
                                                className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Day Labels */}
                                    <div className="grid grid-cols-7 gap-2 mb-4">
                                        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                                            <div
                                                key={day}
                                                className="text-center text-xs md:text-sm font-semibold py-2 uppercase tracking-wider"
                                                style={{ color: '#b8812e' }}
                                            >
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Calendar Grid */}
                                    <div className="grid grid-cols-7 gap-2">
                                        {days.map((day, index) => {
                                            const hasEventOnDay = day && hasEvent(day);
                                            const isSelected = selectedDate === day;

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => day && setSelectedDate(day)}
                                                    disabled={!day}
                                                    /* CAMBIO: La lógica original ya incluía cursor-pointer condicionalmente, se mantiene correcta */
                                                    className={`
                                                        aspect-square flex flex-col items-center justify-center
                                                        rounded-lg transition-all duration-300
                                                        ${day ? 'cursor-pointer' : 'cursor-default'}
                                                        ${!day ? 'bg-transparent' : ''}
                                                        ${day && !isSelected && !hasEventOnDay ? 'bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 hover:text-white' : ''}
                                                        ${hasEventOnDay && !isSelected ? 'bg-primary-500/10 border-2 border-primary-500/30 text-white hover:bg-primary-500/20' : ''}
                                                        ${isSelected ? 'bg-primary-500 border-2 border-primary-500 text-white shadow-lg shadow-primary-500/25' : ''}
                                                    `}
                                                >
                                                    {day && (
                                                        <>
                                                            <span className="text-sm md:text-base font-semibold" style={{ color: isSelected ? '#ffffff' : '#b8812e' }}>
                                                                {day}
                                                            </span>
                                                            {hasEventOnDay && (
                                                                <div className="flex space-x-1 mt-1">
                                                                    <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-primary-500'}`} />
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </Card>
                            </div>

                            {/* Event Details Sidebar */}
                            <div
                                className={`space-y-6 transition-all duration-1000 ${
                                    isVisible['calendar-section']
                                        ? 'opacity-100 translate-x-0'
                                        : 'opacity-0 translate-x-10'
                                }`}
                            >
                                {/* Event Legend */}
                                <Card className="p-6">
                                    <h3 className="text-xl font-semibold text-white mb-4 tracking-tight">
                                        Leyenda de Eventos
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-4 h-4 rounded border-2" style={{ backgroundColor: 'rgba(184, 129, 46, 0.2)', borderColor: 'rgba(184, 129, 46, 0.3)' }} />
                                            <span className="text-sm text-neutral-300">Evento Especial</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-4 h-4 rounded border-2" style={{ backgroundColor: '#b8812e', borderColor: '#b8812e' }} />
                                            <span className="text-sm text-neutral-300">Fecha Seleccionada</span>
                                        </div>
                                    </div>
                                </Card>

                                {/* Selected Date Event Details */}
                                {selectedDate && exampleEvent[selectedDate] ? (
                                    <Card className="p-6 border-primary-500/30 animate-fadeIn">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3
                                                className="text-xl font-bold text-white tracking-tight"
                                                style={{ fontFamily: 'Georgia, serif' }}
                                            >
                                                {currentMonth} {selectedDate}
                                            </h3>
                                            <button
                                                onClick={() => setSelectedDate(null)}
                                                /* CAMBIO: Agregado cursor-pointer */
                                                className="text-neutral-400 hover:text-white transition-colors p-1 cursor-pointer"
                                                aria-label="Cerrar detalles del evento"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            {exampleEvent[selectedDate].map((event, index) => (
                                                <div key={index} className="space-y-3">
                                                    <div className="flex items-start gap-2">
                                                        <div className="w-1 h-full bg-primary-500 rounded-full" />
                                                        <div className="flex-1">
                                                            <Badge variant="primary" className="mb-3">
                                                                {event.type}
                                                            </Badge>
                                                            <h4 className="text-lg font-semibold text-white mb-2">
                                                                {event.title}
                                                            </h4>
                                                            <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
                                                                {event.description}
                                                            </p>

                                                            {/* Event Info */}
                                                            <div className="space-y-2">
                                                                <div className="flex items-center gap-2 text-sm text-neutral-400">
                                                                    <Clock className="w-4 h-4 text-primary-500" />
                                                                    <span>{event.time}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-sm text-neutral-400">
                                                                    <MapPin className="w-4 h-4 text-primary-500" />
                                                                    <span>{event.location}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                ) : (
                                    /* Upcoming Events Preview */
                                    <Card className="p-6">
                                        <h3 className="text-xl font-semibold text-white mb-4 tracking-tight">
                                            Próximos Eventos
                                        </h3>
                                        <div className="space-y-4">
                                            {Object.entries(exampleEvent).map(([day, dayEvents]) => (
                                                <button
                                                    key={day}
                                                    onClick={() => setSelectedDate(parseInt(day))}
                                                    /* CAMBIO: Agregado cursor-pointer */
                                                    className="w-full text-left p-4 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-primary-500/30 rounded-lg transition-all duration-300 group cursor-pointer"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-12 h-12 bg-primary-500/10 border border-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
                                                            <CalendarIcon className="w-6 h-6 text-primary-500" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: '#b8812e' }}>
                                                                {currentMonth} {day}
                                                            </p>
                                                            <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-primary-500 transition-colors">
                                                                {dayEvents[0].title}
                                                            </h4>
                                                            <p className="text-xs text-neutral-400">
                                                                {dayEvents[0].time}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out both;
                }
            `}</style>
        </div>
    );
};

export default CalendarPage;