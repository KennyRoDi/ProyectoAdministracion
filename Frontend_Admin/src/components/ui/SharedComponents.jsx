// src/components/ui/SharedComponents.jsx
import React from 'react';

// Reusable Button Component
export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles = `
    inline-flex items-center justify-center gap-2 
    font-medium rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950
    active:scale-[0.98]
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

    const variants = {
        primary: `
      bg-primary-500 hover:bg-primary-600
      text-white
      shadow-lg shadow-primary-500/25
      focus:ring-primary-500
    `,
        secondary: `
      bg-transparent hover:bg-neutral-800
      text-neutral-300 hover:text-white
      border border-neutral-700 hover:border-neutral-600
      focus:ring-neutral-500
    `,
        ghost: `
      bg-transparent hover:bg-neutral-800
      text-neutral-400 hover:text-white
      focus:ring-neutral-500
    `,
        danger: `
      bg-error/10 hover:bg-error/20
      text-error hover:text-white
      border border-error/30 hover:border-error/50
      focus:ring-error
    `,
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

// Reusable Card Component
export const Card = ({ children, className = '', hover = false, ...props }) => {
    const baseStyles = `
    bg-neutral-900 
    border border-neutral-800 
    rounded-xl 
    transition-all duration-300
  `;

    const hoverStyles = hover
        ? 'hover:border-neutral-700 hover:shadow-lg hover:shadow-black/10 hover:-translate-y-1'
        : '';

    return (
        <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
            {children}
        </div>
    );
};

// Reusable Section Header
export const SectionHeader = ({
    badge,
    title,
    description,
    centered = true,
}) => {
    return (
        <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
            {badge && (
                <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase text-primary-500 bg-primary-500/10 border border-primary-500/20 rounded-full">
                    {badge}
                </span>
            )}

            <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
                style={{ fontFamily: 'Georgia, serif' }}
            >
                {title}
            </h2>

            {description && (
                <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                    {description}
                </p>
            )}
        </div>
    );
};

// Reusable Hero Section
export const HeroSection = ({
    backgroundImage,
    badge,
    title,
    subtitle,
    children,
}) => {
    return (
        <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center bg-cover bg-center text-white">
            {/* Background - Remove blur and make darker */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />

            {/* Darker Overlay - Removed backdrop-blur */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-neutral-950/85 to-black/95" />
            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="w-16 h-1 bg-primary-500 mx-auto mb-6 rounded-full" />

                {badge && (
                    <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-widest uppercase text-primary-500 bg-primary-500/10 border border-primary-500/20 rounded-full">
                        {badge}
                    </span>
                )}

                <h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-2xl"
                    style={{ fontFamily: 'Georgia, serif' }}
                >
                    {title}
                </h1>

                {subtitle && (
                    <p className="text-xl md:text-2xl lg:text-3xl font-light max-w-3xl mx-auto leading-relaxed text-neutral-300 drop-shadow-lg">
                        {subtitle}
                    </p>
                )}

                {children}
            </div>
        </section>
    );
};

// Reusable Input Component
export const Input = ({
    label,
    error,
    required,
    className = '',
    ...props
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-neutral-300">
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                </label>
            )}
            <input
                className={`
          w-full px-4 py-3 
          bg-neutral-900 
          border ${error ? 'border-error' : 'border-neutral-800'}
          rounded-lg 
          text-neutral-100 placeholder:text-neutral-500
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
                {...props}
            />
            {error && <p className="text-error text-sm">{error}</p>}
        </div>
    );
};

// Reusable Badge Component
export const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: 'bg-neutral-800 text-neutral-300 border-neutral-700',
        primary: 'bg-primary-500/10 text-primary-500 border-primary-500/20',
        success: 'bg-success/10 border-success/20',
        error: 'bg-error/10 border-error/20',
    };

    const colors = {
        default: undefined,
        primary: '#b8812e',
        success: '#10b981',
        error: '#ef4444',
    };

    return (
        <span
            className={`
      inline-flex items-center gap-1.5 px-3 py-1
      text-xs font-medium
      border rounded-full
      ${variants[variant]}
      ${className}
    `}
            style={{ color: colors[variant] }}
        >
            {children}
        </span>
    );
};