

### **Especificación de Requerimientos de Seguridad (RS)**

#### **RS-01: Autenticación de Endpoints CRUD**
* [cite_start]**Descripción:** El sistema debe requerir autenticación válida (token JWT o sesión) en todos los endpoints CRUD sobre productos, clientes y pedidos[cite: 43].
* **Métrica:** 100% de los endpoints protegidos; [cite_start]0 accesibles sin un token válido[cite: 43].
* [cite_start]**Verificación:** Las solicitudes realizadas sin token deben retornar códigos de estado HTTP 401 (Unauthorized) o 403 (Forbidden)[cite: 43].

#### **RS-02: Validación y Sanitización de Entradas**
* **Descripción:** El sistema DEBE validar todos los datos de entrada (tipo, formato, longitud) con serializers antes de procesarlos. [cite_start]Las imágenes deben ser validadas por su tipo MIME real[cite: 43].
* **Métrica:** 100% de los campos validados; [cite_start]0 datos sin sanitizar deben llegar a la base de datos de Supabase[cite: 43].
* [cite_start]**Verificación:** Los payloads malformados deben ser rechazados con un código HTTP 400 (Bad Request)[cite: 43].

#### **RS-03: Configuración Segura del Entorno**
* [cite_start]**Descripción:** El sistema DEBE ejecutarse con `DEBUG=False`, la `SECRET_KEY` almacenada en variables de entorno, `ALLOWED_HOSTS` configurado y los headers de seguridad habilitados[cite: 43].
* **Métrica:** 0 secretos expuestos en el código fuente; [cite_start]0 headers de seguridad faltantes en el entorno de producción[cite: 43].
* [cite_start]**Verificación:** Realizar un escaneo con herramientas como *trufflehog* y análisis de los headers HTTP de respuesta[cite: 43].

#### **RS-04: Registro de Auditoría (Logging)**
* **Descripción:** El sistema debe registrar automáticamente cada operación CRUD sobre productos, clientes y pedidos, incluyendo: ID del administrador, tipo de operación, tabla afectada, timestamp UTC e IP de origen. [cite_start]Los registros deben ser de solo escritura para el rol que los genera[cite: 43].
* **Métrica:** 100% de las operaciones mutantes registradas; [cite_start]0 logs editables por el rol anónimo[cite: 43].
* [cite_start]**Verificación:** Ejecutar operaciones POST/PUT/DELETE y verificar la entrada en la tabla de auditoría; intentar borrar un log con clave anónima debe retornar HTTP 403[cite: 43].

#### **RS-05: Gestión de Secretos y RLS**
* **Descripción:** El sistema no debe contener valores por defecto de `SUPABASE_KEY` ni `SUPABASE_URL` en el código fuente. [cite_start]Row Level Security (RLS) debe estar activo en todas las tablas, denegando el acceso con rol anónimo salvo políticas explícitas[cite: 43].
* **Métrica:** 0 claves JWT en el código ni en el historial de Git; [cite_start]0 tablas sin la política RLS activa[cite: 43].
* [cite_start]**Verificación:** Ejecutar `grep -r "eyJ"` en el repositorio para confirmar que no hay resultados; una solicitud directa a Supabase con clave anónima debe retornar HTTP 401 o un array vacío[cite: 43].

#### **RS-06: Autenticación Robusta vs. MOCK_USERS**
* [cite_start]**Descripción:** El sistema debe reemplazar el mecanismo `MOCK_USERS` por autenticación real con contraseñas hasheadas (bcrypt/Argon2), tokens de sesión firmados por el servidor y validación de rol en el backend[cite: 43].
* **Métrica:** 0 credenciales en texto plano en el código o historial; [cite_start]0 endpoints de mutación accesibles sin un token válido[cite: 43].
* [cite_start]**Verificación:** Realizar un `git log --all -p` buscando "admin123" o "MOCK_USERS"; la autenticación con credenciales inválidas debe retornar HTTP 401[cite: 43].

#### **RS-07: Validación Estructural de Archivos**
* [cite_start]**Descripción:** El sistema DEBE validar estrictamente el contenido real de las imágenes subidas mediante la inspección de sus firmas ("Magic Bytes"), no dependiendo exclusivamente del encabezado `Content-Type`[cite: 43].
* **Métrica:** 100% de los archivos verificados estructuralmente; [cite_start]0 scripts o adjuntos maliciosos subidos con éxito[cite: 43].
* [cite_start]**Verificación:** Intentar cargar un script de código renombrado a `.jpg` en el endpoint de carga; el sistema debe rechazarlo con un HTTP 400[cite: 43].

#### **RS-08: Manejo Seguro de Excepciones**
* [cite_start]**Descripción:** El sistema DEBE implementar un manejador global de excepciones que capture los errores del backend sin exponer la traza (stack trace) ni mensajes originales de la capa de datos al cliente[cite: 43].
* [cite_start]**Métrica:** 0 mensajes de error de la base de datos u ORM expuestos en las respuestas HTTP[cite: 43].
* [cite_start]**Verificación:** Enviar un valor malformado en un campo al actualizar un producto y verificar que la respuesta sea un error genérico manejado (ej. "Datos inválidos")[cite: 43].

#### **RS-09: Validación Exhaustiva de JSON**
* [cite_start]**Descripción:** El sistema DEBE realizar una validación de entrada exhaustiva (tipo, longitud, campos esperados) en el backend antes de procesar el JSON en peticiones PUT y POST[cite: 43].
* [cite_start]**Métrica:** 100% de los endpoints validando y sanitizando los campos de entrada explícitamente[cite: 43].
* [cite_start]**Verificación:** Enviar cargas JSON con campos no esperados o nulos al API; el sistema debe validarlos y descartarlos de forma segura[cite: 43].

---

[cite_start]**Nota:** Los requerimientos **RS-10**, **RS-11** y **RS-12** están reservados en el documento original para futuras definiciones del equipo[cite: 43].

