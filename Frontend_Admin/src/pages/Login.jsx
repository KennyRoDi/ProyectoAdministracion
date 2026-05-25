// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, Input, Button, HeroSection } from '../components/ui/SharedComponents';
import { LogIn, Loader2, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(formData.username, formData.password);
        setIsLoading(false);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-neutral-950">
            <Navbar />

            <main className="flex-grow">
                <HeroSection
                    backgroundImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
                    badge="Bienvenido de Vuelta"
                    title="Iniciar Sesión"
                    subtitle="Accede a tu cuenta para gestionar tus pedidos"
                />

                <section className="relative py-16 md:py-24 bg-gradient-to-b from-neutral-950 to-neutral-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
                        <Card className="p-8 md:p-12">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-primary-500/10 border-2 border-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <LogIn className="w-8 h-8 text-primary-500" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                                    Iniciar Sesión
                                </h2>
                                <p className="text-neutral-400 text-sm">
                                    Ingresa tus credenciales para continuar
                                </p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-error/10 border border-error/30 rounded-lg">
                                    <p className="text-error text-sm">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Input
                                    label="Usuario"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Ingresa tu nombre de usuario"
                                    required
                                />

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-neutral-300">
                                        Contraseña
                                        <span className="text-accent-500 ml-1">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Ingresa tu contraseña"
                                            required
                                            className="w-full px-4 py-3 pr-12 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            /* CAMBIO: Agregado cursor-pointer */
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    /* CAMBIO: Agregado cursor-pointer */
                                    className="w-full justify-center cursor-pointer"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Iniciando sesión...
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="w-5 h-5" />
                                            Iniciar Sesión
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Card>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default LoginPage;