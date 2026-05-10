# Project Walkthrough: Steak House Administration System

This document provides a comprehensive guide to understanding, setting up, and contributing to the **Steak House Administration System**.

---

## 1. Project Architecture

The project is divided into two main applications:

### **Backend_Admin (Django REST Framework)**
- **Purpose:** Acts as the API server and bridge between the frontend and the Supabase database.
- **Key Responsibilities:**
  - Managing product data (CRUD operations).
  - Handling image uploads to Supabase Storage.
  - Providing endpoints for the frontend at `http://127.0.0.1:8000/api/`.
  - Database management using SQLite (local) and Supabase (remote).

### **Frontend_Admin (React + Vite)**
- **Purpose:** The user-facing administration dashboard and landing page.
- **Key Responsibilities:**
  - Displaying the product menu and landing page.
  - Providing an Admin interface to create, edit, and delete products.
  - Handling client-side routing and state management (Cart, Auth).
  - Styling using Tailwind CSS.

---

## 2. Prerequisites

- **Python 3.x** (for the Backend)
- **Node.js & npm** (for the Frontend)
- **Supabase Account** (for database and storage)

---

## 3. Getting Started

### **Step 1: Backend Setup**

1.  Navigate to the backend directory:
    ```bash
    cd Backend_Admin
    ```
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3.  Install dependencies:
    ```bash
    pip install django django-cors-headers djangorestframework supabase python-dotenv
    ```
4.  **Environment Configuration:**
    Create a file named `.env` in the `Backend_Admin/` root:
    ```env
    SUPABASE_URL="your_supabase_project_url"
    SUPABASE_KEY="your_supabase_anon_key"
    ```
5.  Start the server:
    ```bash
    python manage.py runserver
    ```
    The API will be available at `http://127.0.0.1:8000/`.

### **Step 2: Frontend Setup**

1.  Navigate to the frontend directory:
    ```bash
    cd Frontend_Admin
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173/`.

---

## 4. Connection Details

### **Supabase Integration**
The backend uses the `supabase-py` client to interact with your instance. You need two pieces of information from your Supabase Dashboard (**Project Settings > API**):
- **Project URL:** Found under Project URL.
- **Anon Key:** Found under Project API keys.

### **CORS Configuration**
The Backend is configured to accept requests from `http://localhost:5173`. If you change the frontend port, you must update `CORS_ALLOWED_ORIGINS` in `Backend_Admin/backend/settings.py`.

---

## 5. Directory Structure Overview

- `Backend_Admin/api/`: Contains Django models, views (logic), and the Supabase client.
- `Frontend_Admin/src/pages/`: Contains the main views (Admin, Login, Landing, etc.).
- `Frontend_Admin/src/components/`: Reusable UI components.
- `Frontend_Admin/src/context/`: Authentication and Shopping Cart logic.

---

## 6. Contributing

1.  Ensure you have followed the setup steps above.
2.  Verify that the backend is running before testing frontend features that require data.
3.  When adding new API endpoints, remember to register them in `Backend_Admin/api/urls.py`.
4.  Style changes should be made using Tailwind utility classes or in `src/input.css`.
