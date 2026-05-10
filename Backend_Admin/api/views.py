from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .supabase_client import supabase  # import del cliente centralizado


# ============================
#  GET: Obtener todos los productos
# ============================
def productos_view(request):
    data = supabase.table("producto").select("*").execute()
    return JsonResponse(data.data, safe=False)


# ============================
#  GET: Obtener todos los clientes
# ============================
def clientes_view(request):
    data = supabase.table("cliente").select("*").execute()
    return JsonResponse(data.data, safe=False)


# ============================
#  GET: Obtener pedidos con join a cliente
# ============================
def pedidos_view(request):
    data = supabase.table("pedidos").select(
        "idpedido, preciototal, estado, fecha, cliente(*)"
    ).execute()
    return JsonResponse(data.data, safe=False)

# ============================
#  POST: Crear un nuevo producto
# ============================
@csrf_exempt
def crear_producto(request):
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    try:
        body = json.loads(request.body)

        nuevo_producto = {
            "idproducto": body.get("idproducto"),
            "nombre": body.get("nombre"),
            "descripcion": body.get("descripcion"),
            "precio": body.get("precio"),
            "tipo": body.get("tipo"),
            "disponible": body.get("disponible", True),
            "img": body.get("img")  # ← Add this line
        }

        result = supabase.table("producto").insert(nuevo_producto).execute()
        return JsonResponse(result.data, safe=False, status=201)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
    
# ============================
#  PUT: Actualizar imagen del producto
# ============================
@csrf_exempt
def actualizar_imagen(request, id_producto):
    if request.method != "PUT":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    try:
        body = json.loads(request.body)
        img_url = body.get("img")

        data = supabase.table("producto").update(
            {"img": img_url}
        ).eq("idproducto", id_producto).execute()
        
        return JsonResponse(data.data, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
    
# ============================
#  PUT: Cambiar disponibilidad (Toggle)
# ============================
@csrf_exempt
def cambiar_estado(request, id_producto):
    if request.method != "PUT":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    try:
        body = json.loads(request.body)
        nuevo_estado = body.get("disponible") # Esperamos un true o false
        
        print(f"DEBUG: Cambiando estado de producto {id_producto} a {nuevo_estado}")

        # Actualizamos en Supabase donde el idproducto coincida
        data = supabase.table("producto").update({"disponible": nuevo_estado}).eq("idproducto", id_producto).execute()
        
        print(f"DEBUG: Respuesta Supabase: {data.data}")
        
        return JsonResponse(data.data, safe=False)

    except Exception as e:
        print(f"DEBUG: Error en cambiar_estado: {str(e)}")
        return JsonResponse({"error": str(e)}, status=400)
# ============================
# ============================
#  DELETE: Eliminar un producto
# ============================
@csrf_exempt
def eliminar_producto(request, id_producto):
    if request.method != "DELETE":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    try:
        # Ejecutamos el delete en Supabase filtrando por id
        result = supabase.table("producto").delete().eq("idproducto", id_producto).execute()
        
        # Opcional: Verificar si se borró algo (result.data no estaría vacío)
        return JsonResponse({"mensaje": "Producto eliminado", "data": result.data}, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
    
@csrf_exempt
def subir_imagen(request):
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    try:
        # Debug logging
        print("FILES:", request.FILES)
        print("POST:", request.POST)
        
        if 'imagen' not in request.FILES:
            return JsonResponse({"error": "No se envió imagen"}, status=400)

        archivo = request.FILES['imagen']
        
        # Validate file type
        allowed_types = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg']
        if archivo.content_type not in allowed_types:
            return JsonResponse({"error": f"Tipo no permitido: {archivo.content_type}"}, status=400)
        
        # Validate file size (5MB)
        if archivo.size > 5 * 1024 * 1024:
            return JsonResponse({"error": "Archivo muy grande (máximo 5MB)"}, status=400)

        # Generate unique filename
        import uuid
        ext = archivo.name.split('.')[-1] if '.' in archivo.name else 'jpg'
        nombre_archivo = f"productos/{uuid.uuid4()}.{ext}"

        # Read file content
        file_content = archivo.read()

        # Upload to Supabase Storage (correct bucket name!)
        response = supabase.storage.from_("ImgDjango").upload(
            nombre_archivo,
            file_content,
            {
                "content-type": archivo.content_type,
                "upsert": "true"  # Overwrite if exists
            }
        )

        print(f"Upload response: {response}")  # Debug

        # Get public URL
        url_imagen = supabase.storage.from_("ImgDjango").get_public_url(nombre_archivo)
        
        print(f"Public URL: {url_imagen}")  # Debug

        return JsonResponse({"url": url_imagen}, status=201)

    except Exception as e:
        print(f"Error en subir_imagen: {str(e)}")
        import traceback
        traceback.print_exc()
        return JsonResponse({"error": str(e)}, status=400)
    
# ============================
#  PUT: Actualizar producto completo
# ============================
@csrf_exempt
def actualizar_producto(request, id_producto):
    if request.method != "PUT":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    try:
        body = json.loads(request.body)
        
        print(f"Actualizando producto {id_producto} con datos:", body)  # Debug
        
        # Build update data
        update_data = {}
        
        if body.get("nombre") is not None:
            update_data["nombre"] = body.get("nombre")
        if body.get("descripcion") is not None:
            update_data["descripcion"] = body.get("descripcion")
        if body.get("precio") is not None:
            update_data["precio"] = body.get("precio")
        if body.get("tipo") is not None:
            update_data["tipo"] = body.get("tipo")
        if body.get("disponible") is not None:
            update_data["disponible"] = body.get("disponible")
        if body.get("img") is not None:
            update_data["img"] = body.get("img")

        # Update in Supabase
        data = supabase.table("producto").update(update_data).eq("idproducto", id_producto).execute()
        
        print(f"Resultado de actualización:", data.data)  # Debug
        
        return JsonResponse(data.data, safe=False)

    except Exception as e:
        print(f"Error actualizando producto: {str(e)}")
        import traceback
        traceback.print_exc()
        return JsonResponse({"error": str(e)}, status=400)
# ============================