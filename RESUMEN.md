# Resumen del Proyecto: Administración de Restaurante (QuecosWeb - Steak House)

Este proyecto es una plataforma web integral diseñada para la gestión de un restaurante tipo *Steak House*. Combina una interfaz pública para clientes con un panel administrativo robusto para la gestión del inventario y operaciones.

## 👥 Actores
1.  **Cliente (Usuario Final):**
    *   Navega por la página principal (Landing).
    *   Consulta la historia y detalles del restaurante (About).
    *   Visualiza el menú de productos categorizados.
    *   Gestiona un carrito de compras.
    *   Realiza pedidos a través de una pasarela de pago (Checkout).
    *   Consulta el calendario de eventos especiales.
2.  **Administrador:**
    *   Gestiona el catálogo de productos (Crear, Leer, Actualizar, Eliminar - CRUD).
    *   Controla la disponibilidad de productos en tiempo real.
    *   Administra imágenes de productos mediante integración con almacenamiento en la nube.
    *   Supervisa pedidos y datos de clientes.

## 🎯 Alcance
*   **Gestión de Catálogo:** Administración dinámica de platos, descripciones, precios y categorías.
*   **Sistema de Pedidos:** Proceso completo desde la selección del producto hasta la confirmación de compra.
*   **Presencia Digital:** Secciones informativas, de contacto y de eventos para fidelización de clientes.
*   **Infraestructura en la Nube:** Sincronización de datos y archivos multimedia en tiempo real.

## 🛠️ Tecnologías
*   **Frontend:**
    *   **React 19:** Biblioteca principal para la interfaz de usuario.
    *   **Vite:** Herramienta de construcción y servidor de desarrollo rápido.
    *   **Tailwind CSS 4:** Framework de utilidades CSS para un diseño moderno y responsive.
    *   **React Router 7:** Gestión de rutas y navegación.
    *   **Lucide React / React Icons:** Conjunto de iconos vectoriales.
*   **Backend:**
    *   **Django:** Framework de Python utilizado como capa intermedia (Proxy API) para lógica de negocio y seguridad.
*   **Base de Datos y Almacenamiento:**
    *   **Supabase (PostgreSQL):** Base de datos relacional para productos, clientes y pedidos.
    *   **Supabase Storage:** Almacenamiento de imágenes de los productos del menú.

## 🌍 Contexto de Uso
La aplicación está orientada a ser el núcleo digital de un restaurante físico que desea expandir su alcance mediante pedidos en línea y automatizar la gestión de su inventario. Proporciona una experiencia de usuario fluida y estética, alineada con la identidad visual de un restaurante de cortes de carne de alta calidad.
