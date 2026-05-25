// src/pages/Checkout.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HeroSection, Card, Input, Button } from '../components/ui/SharedComponents';
import {
    CreditCard,
    MapPin,
    User,
    Phone,
    Mail,
    Calendar,
    Lock,
    ShoppingBag,
    CheckCircle,
    ArrowLeft
} from 'lucide-react';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cartItems, totalItems } = useCart();
    const { user } = useAuth();

    const [isProcessing, setIsProcessing] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    // Redirect if cart is empty
    useEffect(() => {
        if (cartItems.length === 0 && !orderPlaced) {
            navigate('/shopping');
        }
    }, [cartItems, orderPlaced, navigate]);

    // Form state with pre-filled user data
    const [formData, setFormData] = useState({
        // Personal Information (auto-filled from user)
        fullName: user?.name || '',
        email: user?.email || `${user?.username}@example.com`,
        phone: '',

        // Delivery Address
        street: '',
        city: '',
        state: '',
        zipCode: '',

        // Payment Information
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',

        // Additional Options
        deliveryType: 'delivery',
        specialInstructions: '',
        saveInfo: false
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Personal Information
        if (!formData.fullName.trim()) newErrors.fullName = 'El nombre completo es requerido';
        if (!formData.email.trim()) newErrors.email = 'El correo electrónico es requerido';
        if (!formData.phone.trim()) newErrors.phone = 'El número de teléfono es requerido';

        // Delivery Address (only if delivery selected)
        if (formData.deliveryType === 'delivery') {
            if (!formData.street.trim()) newErrors.street = 'La dirección es requerida';
            if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';
            if (!formData.state.trim()) newErrors.state = 'El estado es requerido';
            if (!formData.zipCode.trim()) newErrors.zipCode = 'El código postal es requerido';
        }

        // Payment Information
        if (!formData.cardNumber.trim()) {
            newErrors.cardNumber = 'El número de tarjeta es requerido';
        } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
            newErrors.cardNumber = 'Número de tarjeta inválido';
        }

        if (!formData.cardName.trim()) newErrors.cardName = 'El nombre del titular es requerido';

        if (!formData.expiryDate.trim()) {
            newErrors.expiryDate = 'La fecha de vencimiento es requerida';
        } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
            newErrors.expiryDate = 'Formato: MM/AA';
        }

        if (!formData.cvv.trim()) {
            newErrors.cvv = 'El CVV es requerido';
        } else if (!/^\d{3,4}$/.test(formData.cvv)) {
            newErrors.cvv = 'CVV inválido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsProcessing(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsProcessing(false);
        setOrderPlaced(true);
    };

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const deliveryFee = formData.deliveryType === 'delivery' ? 5.99 : 0;
    const total = subtotal + tax + deliveryFee;

    // Success State
    if (orderPlaced) {
        return (
            <div className="flex flex-col min-h-screen bg-neutral-950">
                <Navbar />
                <main className="flex-grow pt-20 flex items-center justify-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
                        <Card className="p-8 md:p-12 text-center">
                            {/* Success Icon */}
                            <div className="w-20 h-20 bg-success/10 border-2 border-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-success" />
                            </div>

                            {/* Success Message */}
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                ¡Pedido Realizado con Éxito!
                            </h1>
                            <p className="text-neutral-400 text-lg mb-8">
                                Gracias por tu pedido. Te enviaremos un correo de confirmación en breve.
                            </p>

                            {/* Order Details */}
                            <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6 mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-neutral-400">Total del Pedido</span>
                                    <span className="text-2xl font-bold" style={{ color: '#b8812e' }}>
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-400">{formData.deliveryType === 'delivery' ? 'Entrega' : 'Recogida'} Estimada</span>
                                    <span className="text-white font-semibold">45-60 minutos</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="flex-1 justify-center"
                                    onClick={() => navigate('/')}
                                >
                                    Volver al Inicio
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="flex-1 justify-center"
                                    onClick={() => navigate('/menu')}
                                >
                                    Seguir Comprando
                                </Button>
                            </div>
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
                    badge="Último Paso"
                    title="Finalizar Compra"
                    subtitle="Completa tu pedido y disfruta de nuestros mejores platillos"
                />

                {/* Checkout Form */}
                <section className="relative py-16 md:py-24 bg-gradient-to-b from-neutral-950 to-neutral-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Left Column - Forms */}
                                <div className="lg:col-span-2 space-y-6">

                                    {/* Personal Information */}
                                    <Card className="p-6 md:p-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-primary-500/10 border border-primary-500/20 rounded-lg flex items-center justify-center">
                                                <User className="w-5 h-5 text-primary-500" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-white tracking-tight">
                                                Información Personal
                                            </h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input
                                                label="Nombre Completo"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                error={errors.fullName}
                                                required
                                                placeholder="Juan Pérez"
                                            />
                                            <Input
                                                label="Correo Electrónico"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                error={errors.email}
                                                required
                                                placeholder="juan@ejemplo.com"
                                            />
                                            <div className="md:col-span-2">
                                                <Input
                                                    label="Número de Teléfono"
                                                    name="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    error={errors.phone}
                                                    required
                                                    placeholder="(555) 123-4567"
                                                />
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Delivery Options */}
                                    <Card className="p-6 md:p-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-primary-500/10 border border-primary-500/20 rounded-lg flex items-center justify-center">
                                                <MapPin className="w-5 h-5 text-primary-500" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-white tracking-tight">
                                                Opciones de Entrega
                                            </h2>
                                        </div>

                                        {/* Delivery Type Toggle */}
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, deliveryType: 'delivery' }))}
                                                className={`p-4 rounded-lg border-2 transition-all duration-200 ${formData.deliveryType === 'delivery'
                                                        ? 'border-primary-500 bg-primary-500/10'
                                                        : 'border-neutral-700 hover:border-neutral-600'
                                                    }`}
                                            >
                                                <p className="text-white font-semibold mb-1">Entrega a Domicilio</p>
                                                <p className="text-neutral-400 text-sm">45-60 minutos</p>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, deliveryType: 'pickup' }))}
                                                className={`p-4 rounded-lg border-2 transition-all duration-200 ${formData.deliveryType === 'pickup'
                                                        ? 'border-primary-500 bg-primary-500/10'
                                                        : 'border-neutral-700 hover:border-neutral-600'
                                                    }`}
                                            >
                                                <p className="text-white font-semibold mb-1">Recoger en Tienda</p>
                                                <p className="text-neutral-400 text-sm">30-45 minutos</p>
                                            </button>
                                        </div>

                                        {/* Address Fields (only show if delivery) */}
                                        {formData.deliveryType === 'delivery' && (
                                            <div className="grid grid-cols-1 gap-6">
                                                <Input
                                                    label="Dirección"
                                                    name="street"
                                                    value={formData.street}
                                                    onChange={handleChange}
                                                    error={errors.street}
                                                    required
                                                    placeholder="Av. Principal 123, Depto. 4B"
                                                />
                                                <div className="grid grid-cols-2 gap-6">
                                                    <Input
                                                        label="Ciudad"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleChange}
                                                        error={errors.city}
                                                        required
                                                        placeholder="Ciudad de México"
                                                    />
                                                    <Input
                                                        label="Estado"
                                                        name="state"
                                                        value={formData.state}
                                                        onChange={handleChange}
                                                        error={errors.state}
                                                        required
                                                        placeholder="CDMX"
                                                    />
                                                </div>
                                                <Input
                                                    label="Código Postal"
                                                    name="zipCode"
                                                    value={formData.zipCode}
                                                    onChange={handleChange}
                                                    error={errors.zipCode}
                                                    required
                                                    placeholder="01000"
                                                />
                                            </div>
                                        )}

                                        {/* Special Instructions */}
                                        <div className="mt-6">
                                            <label className="block text-sm font-medium text-neutral-300 mb-2">
                                                Instrucciones Especiales (Opcional)
                                            </label>
                                            <textarea
                                                name="specialInstructions"
                                                value={formData.specialInstructions}
                                                onChange={handleChange}
                                                rows="3"
                                                placeholder="Agrega cualquier solicitud especial o instrucciones de entrega..."
                                                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                                            />
                                        </div>
                                    </Card>

                                    {/* Payment Information */}
                                    <Card className="p-6 md:p-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-primary-500/10 border border-primary-500/20 rounded-lg flex items-center justify-center">
                                                <CreditCard className="w-5 h-5 text-primary-500" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-white tracking-tight">
                                                Información de Pago
                                            </h2>
                                        </div>

                                        <div className="space-y-6">
                                            <Input
                                                label="Número de Tarjeta"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleChange}
                                                error={errors.cardNumber}
                                                required
                                                placeholder="1234 5678 9012 3456"
                                                maxLength="19"
                                            />
                                            <Input
                                                label="Nombre del Titular"
                                                name="cardName"
                                                value={formData.cardName}
                                                onChange={handleChange}
                                                error={errors.cardName}
                                                required
                                                placeholder="JUAN PÉREZ"
                                            />
                                            <div className="grid grid-cols-2 gap-6">
                                                <Input
                                                    label="Fecha de Vencimiento"
                                                    name="expiryDate"
                                                    value={formData.expiryDate}
                                                    onChange={handleChange}
                                                    error={errors.expiryDate}
                                                    required
                                                    placeholder="MM/AA"
                                                    maxLength="5"
                                                />
                                                <Input
                                                    label="CVV"
                                                    name="cvv"
                                                    value={formData.cvv}
                                                    onChange={handleChange}
                                                    error={errors.cvv}
                                                    required
                                                    placeholder="123"
                                                    maxLength="4"
                                                />
                                            </div>

                                            {/* Security Notice */}
                                            <div className="flex items-start gap-3 p-4 bg-neutral-800 border border-neutral-700 rounded-lg">
                                                <Lock className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                                                <div className="flex-1">
                                                    <p className="text-white text-sm font-semibold mb-1">
                                                        Pago Seguro
                                                    </p>
                                                    <p className="text-neutral-400 text-xs">
                                                        Tu información de pago está encriptada y segura. Nunca almacenamos los detalles de tu tarjeta.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                {/* Right Column - Order Summary */}
                                <div>
                                    <div className="sticky top-28 space-y-6">
                                        <Card className="p-6">
                                            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">
                                                Resumen del Pedido
                                            </h2>

                                            {/* Cart Items */}
                                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                                {cartItems.map(item => (
                                                    <div key={item.id} className="flex gap-3">
                                                        <div className="w-16 h-16 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <ShoppingBag className="w-6 h-6" style={{ color: '#b8812e' }} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-white text-sm font-semibold truncate">
                                                                {item.name}
                                                            </h4>
                                                            <p className="text-neutral-400 text-xs">
                                                                Cant: {item.quantity}
                                                            </p>
                                                            <p className="text-primary-500 text-sm font-semibold">
                                                                ${(item.price * item.quantity).toFixed(2)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Price Breakdown */}
                                            <div className="space-y-3 py-4 border-t border-neutral-800">
                                                <div className="flex justify-between text-neutral-300">
                                                    <span>Subtotal</span>
                                                    <span>${subtotal.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between text-neutral-300">
                                                    <span>Impuestos (8%)</span>
                                                    <span>${tax.toFixed(2)}</span>
                                                </div>
                                                {formData.deliveryType === 'delivery' && (
                                                    <div className="flex justify-between text-neutral-300">
                                                        <span>Costo de Envío</span>
                                                        <span>${deliveryFee.toFixed(2)}</span>
                                                    </div>
                                                )}
                                                <div className="border-t border-neutral-700 pt-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-white text-lg font-bold">Total</span>
                                                        <span className="text-2xl font-bold" style={{ color: '#b8812e' }}>
                                                            ${total.toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                variant="primary"
                                                size="lg"
                                                className="w-full justify-center"
                                                disabled={isProcessing}
                                            >
                                                {isProcessing ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                        Procesando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Lock className="w-5 h-5" />
                                                        Realizar Pedido
                                                    </>
                                                )}
                                            </Button>

                                            <button
                                                type="button"
                                                onClick={() => navigate('/shopping')}
                                                className="w-full mt-3 px-6 py-3 text-neutral-400 hover:text-white transition-colors text-sm font-medium inline-flex items-center justify-center gap-2"
                                            >
                                                <ArrowLeft className="w-4 h-4" />
                                                Volver al Carrito
                                            </button>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default CheckoutPage;