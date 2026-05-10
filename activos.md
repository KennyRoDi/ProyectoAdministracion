# Inventario y Clasificación de Activos - Proyecto Administración

Este documento identifica y clasifica los activos críticos del proyecto "Quecos Web - Proyecto Administración", divididos en datos, sistemas, usuarios e infraestructura.

## 1. Datos (Información)
Representan la información procesada, almacenada y transmitida por el sistema.

*   **Catálogo de Productos:** Información detallada de los platillos (ID, nombre, descripción, precio, categoría, disponibilidad e imagen).
*   **Datos de Clientes:** Información de contacto e identificación de los clientes registrados en la plataforma.
*   **Pedidos y Transacciones:** Historial de compras, estados de pedido, fechas y montos totales asociados a clientes.
*   **Credenciales de Usuario:** Usuarios, contraseñas (actualmente simuladas en mock) y roles de acceso.
*   **Multimedia:** Imágenes de productos almacenadas tanto localmente (`assets/images`) como de forma remota en la nube.

## 2. Sistemas (Software)
Componentes de software que permiten la operación del negocio.

*   **Frontend Administrativo y de Cliente:** Aplicación SPA desarrollada en React (Vite) que gestiona la interfaz de usuario para compras y administración.
*   **Backend API:** Servicio desarrollado en Django que actúa como puente entre la interfaz y la base de datos, gestionando la lógica de negocio y las validaciones.
*   **Sistema de Autenticación:** Lógica de control de acceso basada en roles (Admin/Customer) gestionada mediante React Context.
*   **Cliente de Base de Datos:** Integración con Supabase para la persistencia de datos en tiempo real.

## 3. Usuarios (Actores)
Personas que interactúan con los sistemas.

*   **Administrador (Admin):** Usuario con permisos totales para gestionar el inventario, actualizar disponibilidad de productos y supervisar pedidos. (Ejemplo: `Grettel`).
*   **Cliente (Customer):** Usuario final que navega por el menú, agrega productos al carrito y realiza pedidos. (Ejemplo: `Camila`).
*   **Visitante (Guest):** Usuario no autenticado con acceso limitado a la página de inicio y visualización del menú.

## 4. Infraestructura (Hardware y Servicios)
El soporte físico y lógico donde residen los sistemas y datos.

*   **Servidor de Base de Datos (Supabase):** Instancia de base de datos relacional (PostgreSQL) alojada en la nube.
*   **Almacenamiento de Objetos (Bucket Supabase):** Repositorio remoto (`ImgDjango`) para el almacenamiento de archivos de imagen de alta resolución.
*   **Entorno de Ejecución Backend:** Entorno Python con Django alojado localmente o en servidor de aplicaciones.
*   **Entorno de Ejecución Frontend:** Servidor de estáticos o node.js para servir la aplicación React.
*   **Red y Conectividad:** Protocolos HTTP/HTTPS para la comunicación entre el frontend, backend y los servicios de Supabase.

---
*Fecha de última actualización: 24 de marzo de 2026*
