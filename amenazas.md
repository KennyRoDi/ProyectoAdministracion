# Análisis de Amenazas - Proyecto Administración

Este documento detalla las amenazas identificadas tras el análisis de seguridad del código del frontend y backend, clasificadas según el modelo STRIDE.

| Amenaza | Categoría STRIDE | Riesgo | Probabilidad | Impacto |
| :--- | :--- | :--- | :--- | :--- |
| **Secuestro de sesión mediante XSS por almacenamiento en LocalStorage:** El `AuthContext.jsx` guarda el objeto de usuario (incluyendo roles) en `localStorage`. Un script malicioso inyectado podría robar estas credenciales o manipular el rol para escalar privilegios localmente. | Information Disclosure / Tampering | Alto | Media | Alta |
| **Manipulación de lógica de negocio en cliente (Client-side Bypass):** El frontend decide qué mostrar basándose en `isAdmin()`. Un usuario malintencionado puede modificar el estado de React o el objeto en `localStorage` para habilitar botones de edición/borrado que el backend podría procesar si no valida el rol en cada petición. | Tampering | Crítico | Alta | Muy Alta |
| **Denegación de Servicio (DoS) por carga de archivos sin restricción de cuota:** El endpoint `subir_imagen` en `views.py` permite subir archivos de hasta 5MB a Supabase. Sin un sistema de cuotas por usuario o rate-limiting, un atacante podría saturar el almacenamiento remoto o agotar los recursos del servidor enviando múltiples peticiones binarias. | Denial of Service | Medio | Baja | Media |

---
*Fecha de generación: 24 de marzo de 2026*
