# Guía del Proyecto: Sistema de Administración Steak House

Este documento proporciona una guía completa para comprender, configurar y contribuir al **Sistema de Administración Steak House**.

---

## 1. Arquitectura del Proyecto

El proyecto está dividido en dos aplicaciones principales:

### **Backend_Admin (Django REST Framework)**
- **Propósito:** Actúa como el servidor API y puente entre el frontend y la base de datos Supabase.
- **Responsabilidades Clave:**
  - Gestión de datos de productos (operaciones CRUD).
  - Manejo de subida de imágenes a Supabase Storage.
  - Proveer endpoints para el frontend en `http://127.0.0.1:8000/api/`.
  - Gestión de base de datos usando SQLite (local) y Supabase (remoto).

### **Frontend_Admin (React + Vite)**
- **Propósito:** El panel de administración orientado al usuario y la página de inicio (landing page).
- **Responsabilidades Clave:**
  - Mostrar el menú de productos y la página de inicio.
  - Proveer una interfaz de Administrador para crear, editar y eliminar productos.
  - Manejo de enrutamiento del lado del cliente y estado (Carrito, Autenticación).
  - Estilos usando Tailwind CSS.

---

## 2. Requisitos Previos

- **Python 3.x** (para el Backend)
- **Node.js & pnpm** (para el Frontend)
- **Cuenta de Supabase** (para base de datos y almacenamiento)

---

## 3. Empezando (Guía de Instalación)

### **Paso 1: Configuración del Backend**

1.  Navega al directorio del backend:
    ```bash
    cd Backend_Admin
    ```
2.  Crea y activa un entorno virtual:
    - **En Linux/macOS:**
      ```bash
      python3 -m venv venv
      source venv/bin/activate
      ```
    - **En Windows (Command Prompt / PowerShell):**
      ```bash
      python -m venv venv
      venv\Scripts\activate
      ```
3.  Instala las dependencias:
    - **En Linux/macOS:**
      ```bash
      pip3 install django django-cors-headers djangorestframework supabase python-dotenv
      ```
    - **En Windows:**
      ```bash
      pip install django django-cors-headers djangorestframework supabase python-dotenv
      ```
4.  **Configuración del Entorno:**
    Crea un archivo llamado `.env` en la raíz de `Backend_Admin/` con el siguiente contenido:
    ```env
    SUPABASE_URL="tu_url_del_proyecto_supabase"
    SUPABASE_KEY="tu_anon_key_de_supabase"
    ```
5.  Inicia el servidor:
    - **En Linux/macOS:**
      ```bash
      python3 manage.py runserver
      ```
    - **En Windows:**
      ```bash
      python manage.py runserver
      ```
    La API estará disponible en `http://127.0.0.1:8000/`.

### **Paso 2: Configuración del Frontend**

1.  Abre una nueva terminal y navega al directorio del frontend:
    ```bash
    cd Frontend_Admin
    ```
2.  Instala las dependencias usando pnpm:
    ```bash
    pnpm install
    ```
3.  Inicia el servidor de desarrollo:
    ```bash
    pnpm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173/`.

---

## 4. Detalles de Conexión

### **Integración con Supabase**
El backend utiliza el cliente `supabase-py` para interactuar con tu instancia. Necesitas dos datos de tu panel de Supabase (**Project Settings > API**):
- **Project URL:** Se encuentra bajo Project URL.
- **Anon Key:** Se encuentra bajo Project API keys.

### **Configuración de CORS**
El Backend está configurado para aceptar peticiones de `http://localhost:5173`. Si cambias el puerto del frontend, debes actualizar `CORS_ALLOWED_ORIGINS` en `Backend_Admin/backend/settings.py`.

---

## 5. Resumen de la Estructura de Directorios

- `Backend_Admin/api/`: Contiene los modelos de Django, vistas (lógica) y el cliente de Supabase.
- `Frontend_Admin/src/pages/`: Contiene las vistas principales (Admin, Login, Landing, etc.).
- `Frontend_Admin/src/components/`: Componentes de interfaz de usuario (UI) reutilizables.
- `Frontend_Admin/src/context/`: Lógica de Autenticación y Carrito de Compras.

---

## 6. Contribuir

1.  Asegúrate de haber seguido los pasos de configuración anteriores.
2.  Verifica que el backend esté ejecutándose antes de probar características del frontend que requieran datos.
3.  Al agregar nuevos endpoints de API, recuerda registrarlos en `Backend_Admin/api/urls.py`.
4.  Los cambios de estilo deben realizarse usando las clases de utilidad de Tailwind o en `src/input.css`.
