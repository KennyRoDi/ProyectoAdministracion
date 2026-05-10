
# Identificación y Clasificación de Activos en el Desarrollo de Software Seguro

Para identificar y clasificar estos elementos dentro del desarrollo de software seguro, se utilizan procesos estructurados como el modelado de amenazas y marcos de gestión de riesgos:

## 1. Identificación y clasificación de datos

### Identificación
Se realiza en las fases iniciales del diseño, donde se definen los datos que el sistema procesará, tales como información personal, financiera o de consumo. También se identifican como activos críticos, analizando las consecuencias de que dicha información se pierda, altere o filtre.

### Clasificación
* **Por sensibilidad:** Los datos se dividen en datos personales (nombre, teléfono), datos sensibles (PII, salud, ubicación), credenciales (contraseñas, tokens) e información financiera (tarjetas de crédito).
* **Por nivel legal (Costa Rica):** Según la **Ley 8968**, se clasifican para determinar el nivel de seguridad requerido (básico, medio o alto) dependiendo de si son de acceso restringido o sensibles.
* **Por estado:** Se clasifican en datos en reposo (almacenados) o en tránsito (comunicación) para aplicar el cifrado correspondiente.

---

## 2. Identificación y clasificación de usuarios

### Identificación
Se describen los actores que interactúan con el sistema, incluyendo clientes, administradores y terceros. En el diseño, también se identifican procesos automáticos y servicios internos que actúan como usuarios del sistema.

### Clasificación
* **Por roles (RBAC):** Se clasifican según el **Principio de Menor Privilegio**, asignando permisos estrictos basados en funciones específicas como "soporte", "cliente" o "administrador".
* **Por intención:** En las historias de abuso, se clasifica a los usuarios malintencionados o atacantes para modelar cómo intentarían dañar el sistema.
* **Por madurez:** Se distingue entre usuarios reales y entidades no humanas (servicios) que requieren distintos métodos de autenticación.

---

## 3. Identificación y clasificación de sistemas

### Identificación
Se define el objetivo del sistema y su naturaleza técnica, determinando si es una aplicación web, móvil o una API.

### Clasificación
* **Por nivel de impacto:** El marco **NIST RMF** clasifica los sistemas de información según su nivel de impacto en la organización.
* **Por cumplimiento:** Se clasifican según los estándares que deben seguir; por ejemplo, sistemas que manejan pagos deben cumplir con **PCI DSS**.
* **Por arquitectura:** Se categorizan en estructuras como microservicios, que permiten aislar fallos y mejorar la redundancia, o arquitecturas de capas para separar la lógica de negocio del acceso a datos.

---

## 4. Identificación y clasificación de la infraestructura

### Identificación
Se utilizan los **Diagramas de Flujo de Datos (DFD)** para identificar servidores, bases de datos y servicios externos. A través de la **Infraestructura como Código (IaC)**, se identifican y versionan componentes como contenedores y servicios en la nube antes del despliegue.

### Clasificación
* **Por entorno:** Se divide en infraestructura de desarrollo, *staging* y producción.
* **Por zona de confianza:** Se clasifican los componentes según sus límites de confianza (*trust boundaries*), separando la infraestructura perimetral (Firewalls, WAF) de los servidores internos y bases de datos.
* **Por criticidad:** Se identifica la infraestructura crítica nacional o empresarial que requiere lineamientos de seguridad superiores.