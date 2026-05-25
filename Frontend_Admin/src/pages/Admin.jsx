import { Menu, Calendar, Eye, EyeOff, Edit2, Trash2, Plus, X, Upload, Image as ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Custom Modal Component
const Modal = ({ isOpen, onClose, onConfirm, title, message, type = 'confirm' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fadeIn cursor-pointer"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl max-w-md w-full animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
          <h3 className="text-xl font-semibold text-white tracking-tight">
            {title}
          </h3>
          <button
            onClick={onClose}
            /* CAMBIO: Agregado cursor-pointer */
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-neutral-300 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-neutral-800">
          <button
            onClick={onClose}
            /* CAMBIO: Agregado cursor-pointer */
            className="
              flex-1 px-6 py-3 
              bg-transparent hover:bg-neutral-800 
              text-neutral-400 hover:text-white font-medium text-sm
              rounded-lg border border-neutral-700 hover:border-neutral-600
              transition-all duration-200 cursor-pointer
            "
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            /* CAMBIO: Agregado cursor-pointer */
            className="
              flex-1 px-6 py-3 
              bg-red-600 hover:bg-red-700
              text-white font-medium text-sm
              rounded-lg 
              transition-all duration-200
              shadow-lg shadow-red-600/25 cursor-pointer
            "
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [showItemForm, setShowItemForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });
  
  const [itemForm, setItemForm] = useState({
    nombre: '',
    tipo: 'Fuerte',
    precio: '',
    disponible: true,
    descripcion: '',
    img: null,
    imageFile: null
  });

  // Calendar Events State
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    type: 'special'
  });

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/productos/');
        if (response.ok) {
          const data = await response.json();
          
          const productosMapeados = data.map(item => ({
            id: item.idproducto,
            nombre: item.nombre,
            tipo: item.tipo,
            precio: parseFloat(item.precio),
            descripcion: item.descripcion,
            disponible: true,
            img: item.img || null
          }));

          setMenuItems(productosMapeados);
        }
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const tipos = ['Fuerte', 'Entrada', 'Ensalada', 'Postre', 'Bebida'];

  const handleItemFormChange = (e) => {
    const { name, value, checked, type } = e.target;
    setItemForm({
      ...itemForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setModalState({
          isOpen: true,
          title: 'Archivo Inválido',
          message: 'Por favor selecciona un archivo de imagen.',
          onConfirm: () => {},
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setModalState({
          isOpen: true,
          title: 'Archivo Muy Grande',
          message: 'La imagen debe ser menor a 5MB.',
          onConfirm: () => {},
        });
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setItemForm({
        ...itemForm,
        imageFile: file
      });
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return null;

    setUploadingImage(true);
    
    try {
      const formData = new FormData();
      formData.append('imagen', file);

      const response = await fetch('http://127.0.0.1:8000/api/subir_imagen/', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Image uploaded successfully:', data.url);
        return data.url;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al subir imagen');
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setModalState({
        isOpen: true,
        title: 'Error de Carga',
        message: `No se pudo cargar la imagen: ${error.message}`,
        onConfirm: () => {},
      });
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddItem = async () => {
    if (!itemForm.nombre || !itemForm.precio) {
      setModalState({
        isOpen: true,
        title: 'Información Faltante',
        message: 'Por favor completa los campos de nombre y precio.',
        onConfirm: () => {},
      });
      return;
    }

    const newId = Date.now().toString().slice(-9);
    
    try {
      // First, upload image if one was selected
      let imageUrl = null;
      if (itemForm.imageFile) {
        const formData = new FormData();
        formData.append('imagen', itemForm.imageFile);

        const uploadResponse = await fetch('http://127.0.0.1:8000/api/subir_imagen/', {
          method: 'POST',
          body: formData
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          imageUrl = uploadData.url;
          console.log('Image uploaded:', imageUrl);
        } else {
          const errorData = await uploadResponse.json();
          throw new Error(`Error al cargar imagen: ${errorData.error}`);
        }
      }

      // Then create product with image URL
      const productoParaEnviar = {
        idproducto: newId,
        nombre: itemForm.nombre,
        descripcion: itemForm.descripcion || "",
        precio: parseFloat(itemForm.precio),
        tipo: itemForm.tipo,
        img: imageUrl,
      };

      const response = await fetch('http://127.0.0.1:8000/api/crear_producto/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoParaEnviar)
      });

      if (response.ok) {
        const newItem = {
          id: parseInt(newId),
          nombre: itemForm.nombre,
          tipo: itemForm.tipo,
          precio: parseFloat(itemForm.precio),
          descripcion: itemForm.descripcion,
          disponible: itemForm.disponible,
          img: imageUrl
        };

        setMenuItems([...menuItems, newItem]);
        resetItemForm();
        
        setModalState({
          isOpen: true,
          title: 'Éxito',
          message: '¡Producto creado exitosamente!',
          onConfirm: () => {},
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear producto');
      }
    } catch (error) {
      console.error("Error:", error);
      setModalState({
        isOpen: true,
        title: 'Error',
        message: error.message || 'No se pudo guardar el producto.',
        onConfirm: () => {},
      });
    }
  };

  const handleUpdateItem = async () => {
    if (editingItem && itemForm.nombre && itemForm.precio) {
      try {
        let imageUrl = itemForm.img; // Keep existing image

        // If a new image file was selected, upload it first
        if (itemForm.imageFile) {
          const formData = new FormData();
          formData.append('imagen', itemForm.imageFile);

          const uploadResponse = await fetch('http://127.0.0.1:8000/api/subir_imagen/', {
            method: 'POST',
            body: formData
          });

          if (uploadResponse.ok) {
            const uploadData = await uploadResponse.json();
            imageUrl = uploadData.url;
            console.log('New image uploaded:', imageUrl);
          } else {
            const errorData = await uploadResponse.json();
            throw new Error(`Error al cargar imagen: ${errorData.error}`);
          }
        }

        // Now update the product in the database
        const updateData = {
          nombre: itemForm.nombre,
          descripcion: itemForm.descripcion,
          precio: parseFloat(itemForm.precio),
          tipo: itemForm.tipo,
          disponible: itemForm.disponible,
          img: imageUrl
        };

        const response = await fetch(`http://127.0.0.1:8000/api/actualizar_producto/${editingItem.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData)
        });

        if (response.ok) {
          // Update local state
          setMenuItems(
            menuItems.map(item =>
              item.id === editingItem.id
                ? { ...item, ...updateData }
                : item
            )
          );
          
          resetItemForm();
          
          setModalState({
            isOpen: true,
            title: 'Éxito',
            message: '¡Producto actualizado exitosamente!',
            onConfirm: () => {},
          });
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al actualizar producto');
        }

      } catch (error) {
        console.error("Error updating product:", error);
        setModalState({
          isOpen: true,
          title: 'Error de Actualización',
          message: error.message || 'No se pudo actualizar el producto.',
          onConfirm: () => {},
        });
      }
    }
  };

  const handleDeleteItem = async (id) => {
    setModalState({
      isOpen: true,
      title: 'Eliminar Producto',
      message: '¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.',
      onConfirm: async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/eliminar_producto/${id}/`, {
            method: 'DELETE',
          });

          if (response.ok) {
            setMenuItems(menuItems.filter(item => item.id !== id));
          } else {
            const errorData = await response.json();
            setModalState({
              isOpen: true,
              title: 'Error',
              message: `No se pudo eliminar: ${errorData.error || 'Error desconocido'}`,
              onConfirm: () => {},
            });
          }
        } catch (error) {
          console.error("Error al eliminar:", error);
          setModalState({
            isOpen: true,
            title: 'Error de Conexión',
            message: 'Error de conexión con el servidor.',
            onConfirm: () => {},
          });
        }
      },
    });
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setItemForm({
      nombre: item.nombre,
      tipo: item.tipo,
      precio: item.precio,
      disponible: item.disponible,
      descripcion: item.descripcion,
      img: item.img,
      imageFile: null
    });
    setImagePreview(item.img);
    setShowItemForm(true);
  };

  const toggleItemAvailability = async (id) => {
    const itemToUpdate = menuItems.find(item => item.id === id);
    if (!itemToUpdate) return;

    const nuevoEstado = !itemToUpdate.disponible;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/cambiar_estado/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ disponible: nuevoEstado })
      });

      if (response.ok) {
        setMenuItems(
          menuItems.map(item =>
            item.id === id ? { ...item, disponible: nuevoEstado } : item
          )
        );
      } else {
        console.error("Error al actualizar estado en el servidor");
        setModalState({
          isOpen: true,
          title: 'Error',
          message: 'No se pudo cambiar el estado.',
          onConfirm: () => {},
        });
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setModalState({
        isOpen: true,
        title: 'Error de Conexión',
        message: 'Error de conexión con el servidor.',
        onConfirm: () => {},
      });
    }
  };

  const resetItemForm = () => {
    setShowItemForm(false);
    setEditingItem(null);
    setImagePreview(null);
    setItemForm({
      nombre: '',
      tipo: 'Fuerte',
      precio: '',
      disponible: true,
      descripcion: '',
      img: null,
      imageFile: null
    });
  };

  // Calendar Event Handlers
  const handleEventFormChange = (e) => {
    const { name, value } = e.target;
    setEventForm({
      ...eventForm,
      [name]: value
    });
  };

  const handleAddEvent = () => {
    if (!eventForm.title || !eventForm.date || !eventForm.time) {
      setModalState({
        isOpen: true,
        title: 'Información Faltante',
        message: 'Por favor completa los campos de título, fecha y hora.',
        onConfirm: () => {},
      });
      return;
    }

    const newEvent = {
      id: Date.now(),
      ...eventForm
    };

    setCalendarEvents([...calendarEvents, newEvent]);
    resetEventForm();
  };

  const handleDeleteEvent = (id) => {
    setModalState({
      isOpen: true,
      title: 'Eliminar Evento',
      message: '¿Estás seguro de que quieres eliminar este evento?',
      onConfirm: () => {
        setCalendarEvents(calendarEvents.filter(event => event.id !== id));
      },
    });
  };

  const resetEventForm = () => {
    setShowEventForm(false);
    setEditingEvent(null);
    setEventForm({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      type: 'special'
    });
  };

  const tabs = [
    { id: 'menu', name: 'Gestión de Menú', icon: Menu },
    { id: 'calendar', name: 'Eventos del Calendario', icon: Calendar },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950">
      <Navbar />

      {/* Modal */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        onConfirm={modalState.onConfirm}
        title={modalState.title}
        message={modalState.message}
      />

      <main className="flex-grow pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-neutral-900 to-neutral-950 py-12 md:py-16 border-b border-neutral-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="w-16 h-1 bg-primary-500 mb-6 rounded-full" />
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-white"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Panel de Administración
              </h1>
              <p className="text-neutral-400 text-lg font-normal">
                Administra el menú y calendario de tu restaurante
              </p>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="sticky top-20 z-40 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex gap-2 py-4">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      /* CAMBIO: 
                         1. Agregado cursor-pointer
                         2. Agregado hover:bg-primary-600 para el estado activo
                      */
                      className={`
                        flex items-center gap-3 px-5 py-2.5 rounded-lg
                        font-medium text-sm tracking-wide
                        transition-all duration-200 cursor-pointer
                        ${
                          activeTab === tab.id
                            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25 hover:bg-primary-600'
                            : 'bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-800'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {activeTab === 'menu' && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Productos del Menú
                  </h2>
                  <button
                    onClick={() => setShowItemForm(!showItemForm)}
                    /* CAMBIO: Agregado cursor-pointer */
                    className="
                      inline-flex items-center gap-2 px-5 py-2.5
                      bg-neutral-800 hover:bg-neutral-700
                      text-white font-medium text-sm
                      rounded-lg shadow-lg shadow-primary-500/25
                      transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-950
                      active:scale-[0.98] cursor-pointer
                    "
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar Producto</span>
                  </button>
                </div>

                {/* Form */}
                {showItemForm && (
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl shadow-black/20 p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-white mb-6 tracking-tight">
                      {editingItem ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Image Upload */}
                      <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-medium text-neutral-300">
                          Imagen del Producto
                        </label>
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Image Preview */}
                          <div className="flex-shrink-0">
                            <div className="w-32 h-32 bg-neutral-800 border-2 border-dashed border-neutral-700 rounded-lg overflow-hidden flex items-center justify-center">
                              {imagePreview ? (
                                <img 
                                  src={imagePreview} 
                                  alt="Vista previa" 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <ImageIcon className="w-12 h-12 text-neutral-600" />
                              )}
                            </div>
                          </div>
                          
                          {/* Upload Button */}
                          <div className="flex-1 flex flex-col justify-center">
                            <label className="
                              inline-flex items-center justify-center gap-2 px-4 py-2.5
                              bg-neutral-800 hover:bg-neutral-700
                              border border-neutral-700 hover:border-neutral-600
                              text-neutral-300 hover:text-white
                              rounded-lg text-sm font-medium
                              transition-all duration-200
                              cursor-pointer
                            ">
                              <Upload className="w-4 h-4" />
                              <span>Elegir Imagen</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                              />
                            </label>
                            <p className="text-xs text-neutral-500 mt-2">
                              PNG, JPG hasta 5MB
                            </p>
                            {uploadingImage && (
                              <p className="text-xs text-primary-500 mt-1">
                                Subiendo...
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Name Field */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-neutral-300">
                          Nombre del Producto
                          <span className="text-accent-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          value={itemForm.nombre}
                          onChange={handleItemFormChange}
                          placeholder="ej., Filete Supremo"
                          className="
                            w-full px-4 py-3 
                            bg-neutral-900 
                            border border-neutral-800 
                            rounded-lg 
                            text-neutral-100 placeholder:text-neutral-500
                            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                            transition-all duration-200
                          "
                        />
                      </div>

                      {/* Type Field */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-neutral-300">
                          Categoría
                          <span className="text-accent-500 ml-1">*</span>
                        </label>
                        <select
                          name="tipo"
                          value={itemForm.tipo}
                          onChange={handleItemFormChange}
                          className="
                            w-full px-4 py-3 
                            bg-neutral-900 
                            border border-neutral-800 
                            rounded-lg 
                            text-neutral-100
                            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                            transition-all duration-200
                          "
                        >
                          {tipos.map((tipo) => (
                            <option key={tipo} value={tipo} className="bg-neutral-900">
                              {tipo}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Price Field */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-neutral-300">
                          Precio (CRC)
                          <span className="text-accent-500 ml-1">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">₡</span>
                          <input
                            type="number"
                            name="precio"
                            value={itemForm.precio}
                            onChange={handleItemFormChange}
                            step="0.01"
                            placeholder="0.00"
                            className="
                              w-full pl-8 pr-4 py-3 
                              bg-neutral-900 
                              border border-neutral-800 
                              rounded-lg 
                              text-neutral-100 placeholder:text-neutral-500
                              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                              transition-all duration-200
                            "
                          />
                        </div>
                      </div>

                      {/* Availability Toggle */}
                      <div className="flex items-center">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              name="disponible"
                              checked={itemForm.disponible}
                              onChange={handleItemFormChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-neutral-800 rounded-full peer-checked:bg-primary-500 transition-colors duration-200"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
                          </div>
                          <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
                            Disponible para ordenar
                          </span>
                        </label>
                      </div>

                      {/* Description Field */}
                      <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-medium text-neutral-300">
                          Descripción
                          <span className="text-accent-500 ml-1">*</span>
                        </label>
                        <textarea
                          name="descripcion"
                          value={itemForm.descripcion}
                          onChange={handleItemFormChange}
                          rows="3"
                          placeholder="Describe este producto del menú..."
                          className="
                            w-full px-4 py-3 
                            bg-neutral-900 
                            border border-neutral-800 
                            rounded-lg 
                            text-neutral-100 placeholder:text-neutral-500
                            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                            transition-all duration-200
                            resize-none
                          "
                        />
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                      <button
                        onClick={editingItem ? handleUpdateItem : handleAddItem}
                        disabled={uploadingImage}
                        /* CAMBIO: Agregado cursor-pointer */
                        className="
                          flex-1 px-6 py-3 
                          bg-neutral-800 hover:bg-neutral-700
                          disabled:bg-neutral-700 disabled:cursor-not-allowed
                          text-white font-medium text-sm
                          rounded-lg shadow-lg shadow-primary-500/25
                          transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900
                          active:scale-[0.98] cursor-pointer
                        "
                      >
                        {uploadingImage ? 'Subiendo...' : editingItem ? 'Actualizar Producto' : 'Crear Producto'}
                      </button>
                      <button
                        onClick={resetItemForm}
                        disabled={uploadingImage}
                        /* CAMBIO: Agregado cursor-pointer */
                        className="
                          flex-1 px-6 py-3 
                          bg-transparent hover:bg-neutral-800 
                          disabled:opacity-50 disabled:cursor-not-allowed
                          text-neutral-400 hover:text-white font-medium text-sm
                          rounded-lg border border-neutral-700 hover:border-neutral-600
                          transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-900
                          cursor-pointer
                        "
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                {/* Menu Items List */}
                <div className="grid grid-cols-1 gap-4">
                  {menuItems.length === 0 ? (
                    <div className="text-center py-16 bg-neutral-900 border border-dashed border-neutral-800 rounded-xl">
                      <Menu className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
                      <p className="text-neutral-400 text-lg font-medium">No hay productos en el menú</p>
                      <p className="text-neutral-500 text-sm mt-1">Agrega tu primer producto para comenzar</p>
                    </div>
                  ) : (
                    menuItems.map((item) => (
                      <div
                        key={item.id}
                        className="
                          bg-neutral-900 border border-neutral-800 
                          rounded-xl p-5 md:p-6
                          hover:border-neutral-700 hover:shadow-lg hover:shadow-black/10
                          transition-all duration-300
                        "
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          {/* Item Info */}
                          <div className="flex gap-4 flex-1">
                            {/* Image */}
                            {item.img && (
                              <div className="flex-shrink-0">
                                <img 
                                  src={item.img} 
                                  alt={item.nombre}
                                  className="w-20 h-20 object-cover rounded-lg border border-neutral-800"
                                />
                              </div>
                            )}
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <div>
                                  <h3 className="text-xl font-semibold text-white mb-1 tracking-tight">
                                    {item.nombre}
                                  </h3>
                                  <p className="text-sm text-neutral-400 leading-relaxed">
                                    {item.descripcion}
                                  </p>
                                </div>
                                <span className="text-2xl font-bold whitespace-nowrap" style={{ color: '#b8812e' }}>
                                  ₡{item.precio.toFixed(2)}
                                </span>
                              </div>
                              
                              {/* Tags */}
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="
                                  inline-flex items-center gap-1.5 px-3 py-1 
                                  bg-primary-500/10
                                  border border-primary-500/20
                                  rounded-full text-xs font-medium
                                " style={{ color: '#b8812e' }}>
                                  {item.tipo}
                                </span>
                                <span 
                                  className={`
                                    inline-flex items-center gap-1.5 px-3 py-1 
                                    rounded-full text-xs font-medium
                                    ${item.disponible 
                                      ? 'bg-success/10 border border-success/20' 
                                      : 'bg-error/10 border border-error/20'
                                    }
                                  `}
                                  style={{ color: item.disponible ? '#10b981' : '#ef4444' }}
                                >
                                  {item.disponible ? 'Disponible' : 'No Disponible'}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex md:flex-col gap-2">
                            <button
                              onClick={() => toggleItemAvailability(item.id)}
                              /* CAMBIO: Agregado cursor-pointer */
                              className="
                                flex-1 md:flex-none px-4 py-2 
                                bg-neutral-800 hover:bg-neutral-700
                                border border-neutral-700 hover:border-neutral-600
                                text-neutral-300 hover:text-white
                                rounded-lg text-sm font-medium
                                transition-all duration-200
                                inline-flex items-center justify-center gap-2 cursor-pointer
                              "
                              title="Alternar disponibilidad"
                            >
                              {item.disponible ? (
                                <Eye className="w-4 h-4" />
                              ) : (
                                <EyeOff className="w-4 h-4" />
                              )}
                            </button>

                            
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              /* CAMBIO: Agregado cursor-pointer */
                              className="
                                flex-1 md:flex-none px-4 py-2 
                                bg-neutral-800 hover:bg-neutral-700
                                border border-neutral-700 hover:border-error/30
                                text-neutral-300 hover:text-error
                                rounded-lg text-sm font-medium
                                transition-all duration-200
                                inline-flex items-center justify-center gap-2 cursor-pointer
                              "
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="hidden sm:inline">Eliminar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Eventos del Calendario
                  </h2>
                  <button
                    onClick={() => setShowEventForm(!showEventForm)}
                    /* CAMBIO: Agregado cursor-pointer */
                    className="
                      inline-flex items-center gap-2 px-5 py-2.5
                      bg-primary-500 hover:bg-primary-600
                      text-white font-medium text-sm
                      rounded-lg shadow-lg shadow-primary-500/25
                      transition-all duration-200
                      active:scale-[0.98] cursor-pointer
                    "
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar Evento</span>
                  </button>
                </div>

                {/* Event Form */}
                {showEventForm && (
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl shadow-black/20 p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-white mb-6 tracking-tight">
                      {editingEvent ? 'Editar Evento' : 'Agregar Nuevo Evento'}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Title */}
                      <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-medium text-neutral-300">
                          Título del Evento
                          <span className="text-accent-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={eventForm.title}
                          onChange={handleEventFormChange}
                          placeholder="ej., Noche de Maridaje de Vinos"
                          className="
                            w-full px-4 py-3 
                            bg-neutral-900 
                            border border-neutral-800 
                            rounded-lg 
                            text-neutral-100 placeholder:text-neutral-500
                            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                            transition-all duration-200
                          "
                        />
                      </div>

                      {/* Date */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-neutral-300">
                          Fecha
                          <span className="text-accent-500 ml-1">*</span>
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={eventForm.date}
                          onChange={handleEventFormChange}
                          className="
                            w-full px-4 py-3 
                            bg-neutral-900 
                            border border-neutral-800 
                            rounded-lg 
                            text-neutral-100
                            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                            transition-all duration-200
                          "
                        />
                      </div>

                      {/* Time */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-neutral-300">
                          Hora
                          <span className="text-accent-500 ml-1">*</span>
                        </label>
                        <input
                          type="time"
                          name="time"
                          value={eventForm.time}
                          onChange={handleEventFormChange}
                          className="
                            w-full px-4 py-3 
                            bg-neutral-900 
                            border border-neutral-800 
                            rounded-lg 
                            text-neutral-100
                            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                            transition-all duration-200
                          "
                        />
                      </div>

                      {/* Location */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-neutral-300">
                          Ubicación
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={eventForm.location}
                          onChange={handleEventFormChange}
                          placeholder="ej., Comedor Principal"
                          className="
                            w-full px-4 py-3 
                            bg-neutral-900 
                            border border-neutral-800 
                            rounded-lg 
                            text-neutral-100 placeholder:text-neutral-500
                            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                            transition-all duration-200
                          "
                        />
                      </div>

                      {/* Type */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-neutral-300">
                          Tipo de Evento
                        </label>
                        <select
                          name="type"
                          value={eventForm.type}
                          onChange={handleEventFormChange}
                          className="
                            w-full px-4 py-3 
                            bg-neutral-900 
                            border border-neutral-800 
                            rounded-lg 
                            text-neutral-100
                            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                            transition-all duration-200
                          "
                        >
                          <option value="special">Evento Especial</option>
                          <option value="reservation">Reservación</option>
                          <option value="private">Evento Privado</option>
                        </select>
                      </div>

                      {/* Description */}
                      <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-medium text-neutral-300">
                          Descripción
                        </label>
                        <textarea
                          name="description"
                          value={eventForm.description}
                          onChange={handleEventFormChange}
                          rows="3"
                          placeholder="Describe el evento..."
                          className="
                            w-full px-4 py-3 
                            bg-neutral-900 
                            border border-neutral-800 
                            rounded-lg 
                            text-neutral-100 placeholder:text-neutral-500
                            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                            transition-all duration-200
                            resize-none
                          "
                        />
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                      <button
                        onClick={handleAddEvent}
                        /* CAMBIO: Agregado cursor-pointer */
                        className="
                          flex-1 px-6 py-3 
                          bg-primary-500 hover:bg-primary-600
                          text-white font-medium text-sm
                          rounded-lg shadow-lg shadow-primary-500/25
                          transition-all duration-200
                          active:scale-[0.98] cursor-pointer
                        "
                      >
                        {editingEvent ? 'Actualizar Evento' : 'Crear Evento'}
                      </button>
                      <button
                        onClick={resetEventForm}
                        /* CAMBIO: Agregado cursor-pointer */
                        className="
                          flex-1 px-6 py-3 
                          bg-transparent hover:bg-neutral-800 
                          text-neutral-400 hover:text-white font-medium text-sm
                          rounded-lg border border-neutral-700 hover:border-neutral-600
                          transition-all duration-200 cursor-pointer
                        "
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                {/* Events List */}
                <div className="grid grid-cols-1 gap-4">
                  {calendarEvents.length === 0 ? (
                    <div className="text-center py-16 bg-neutral-900 border border-dashed border-neutral-800 rounded-xl">
                      <Calendar className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
                      <p className="text-neutral-400 text-lg font-medium">No hay eventos programados</p>
                      <p className="text-neutral-500 text-sm mt-1">Agrega tu primer evento para comenzar</p>
                    </div>
                  ) : (
                    calendarEvents.map((event) => (
                      <div
                        key={event.id}
                        className="
                          bg-neutral-900 border border-neutral-800 
                          rounded-xl p-5 md:p-6
                          hover:border-neutral-700 hover:shadow-lg hover:shadow-black/10
                          transition-all duration-300
                        "
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div>
                                <h3 className="text-xl font-semibold text-white mb-1 tracking-tight">
                                  {event.title}
                                </h3>
                                <p className="text-sm text-neutral-400">
                                  {event.date} a las {event.time}
                                </p>
                                {event.location && (
                                  <p className="text-sm text-neutral-500 mt-1">
                                    📍 {event.location}
                                  </p>
                                )}
                                {event.description && (
                                  <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                                    {event.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <span 
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded-full text-xs font-medium"
                              style={{ color: '#b8812e' }}
                            >
                              {event.type === 'special' ? 'Especial' : event.type === 'reservation' ? 'Reservación' : 'Privado'}
                            </span>
                          </div>

                          <div className="flex md:flex-col gap-2">
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              /* CAMBIO: Agregado cursor-pointer */
                              className="
                                flex-1 md:flex-none px-4 py-2 
                                bg-neutral-800 hover:bg-error/10
                                border border-neutral-700 hover:border-error/30
                                text-neutral-300 hover:text-error
                                rounded-lg text-sm font-medium
                                transition-all duration-200
                                inline-flex items-center justify-center gap-2 cursor-pointer
                              "
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="hidden sm:inline">Eliminar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminPage;