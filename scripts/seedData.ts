/**
 * Datos de ejemplo para poblar Firestore (categorías + profesionales).
 * Editables libremente. Las fotos usan un servicio de avatares por semilla.
 */

export interface SeedCategory {
  name: string
  slug: string
  icon: string
  color: string
  order: number
  active: boolean
  description: string
}

export interface SeedProfessional {
  name: string
  slug: string
  categorySlug: string
  profession: string
  description: string
  phone: string
  whatsapp: string
  email: string
  photo: string
  gallery: string[]
  city: string
  zone: string
  services: string[]
  available: boolean
  verified: boolean
  featured: boolean
}

const avatar = (seed: string) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=dbeafe`

const work = (seed: string) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/600`

export const CATEGORIES: SeedCategory[] = [
  // --- Construcción y hogar ---
  { name: 'Electricistas', slug: 'electricistas', icon: 'Zap', color: 'amber', order: 1, active: true, description: 'Instalaciones y reparaciones' },
  { name: 'Plomeros', slug: 'plomeros', icon: 'Droplet', color: 'blue', order: 2, active: true, description: 'Agua, desagües y grifería' },
  { name: 'Gasistas', slug: 'gasistas', icon: 'Flame', color: 'red', order: 3, active: true, description: 'Matriculados y urgencias' },
  { name: 'Pintores', slug: 'pintores', icon: 'PaintRoller', color: 'green', order: 4, active: true, description: 'Interior y exterior' },
  { name: 'Albañiles', slug: 'albaniles', icon: 'HardHat', color: 'orange', order: 5, active: true, description: 'Refacciones y obras' },
  { name: 'Cerrajeros', slug: 'cerrajeros', icon: 'Key', color: 'indigo', order: 6, active: true, description: 'Aperturas 24hs' },
  { name: 'Carpinteros', slug: 'carpinteros', icon: 'Hammer', color: 'teal', order: 7, active: true, description: 'Muebles y aberturas a medida' },
  { name: 'Herreros', slug: 'herreros', icon: 'Anvil', color: 'purple', order: 8, active: true, description: 'Rejas, portones y soldadura' },
  { name: 'Techistas', slug: 'techistas', icon: 'Home', color: 'cyan', order: 9, active: true, description: 'Techos y membranas' },
  { name: 'Durlock y Cielorrasos', slug: 'durlock-cielorrasos', icon: 'Ruler', color: 'pink', order: 10, active: true, description: 'Placas y tabiques' },
  { name: 'Vidrieros', slug: 'vidrieros', icon: 'Frame', color: 'blue', order: 11, active: true, description: 'Vidrios y espejos' },
  { name: 'Colocación de Pisos', slug: 'colocacion-pisos', icon: 'Grid2x2', color: 'amber', order: 12, active: true, description: 'Porcelanato, flotante y parquet' },
  { name: 'Cortinas y Toldos', slug: 'cortinas-toldos', icon: 'Blinds', color: 'teal', order: 13, active: true, description: 'Instalación y reparación' },
  { name: 'Impermeabilización', slug: 'impermeabilizacion', icon: 'Droplets', color: 'indigo', order: 14, active: true, description: 'Techos y terrazas' },
  { name: 'Destapaciones', slug: 'destapaciones', icon: 'Toilet', color: 'orange', order: 15, active: true, description: 'Cloacas y cañerías' },
  { name: 'Piletas', slug: 'piletas', icon: 'Waves', color: 'cyan', order: 16, active: true, description: 'Construcción y mantenimiento' },

  // --- Reparaciones y técnicos ---
  { name: 'Aire Acondicionado', slug: 'aire-acondicionado', icon: 'Snowflake', color: 'blue', order: 17, active: true, description: 'Instalación y service' },
  { name: 'Refrigeración y Heladeras', slug: 'refrigeracion', icon: 'Refrigerator', color: 'teal', order: 18, active: true, description: 'Service de frío' },
  { name: 'Reparación de Lavarropas', slug: 'lavarropas', icon: 'WashingMachine', color: 'purple', order: 19, active: true, description: 'A domicilio' },
  { name: 'Técnico de PC', slug: 'tecnico-pc', icon: 'Laptop', color: 'indigo', order: 20, active: true, description: 'Notebooks y computadoras' },
  { name: 'Reparación de Celulares', slug: 'reparacion-celulares', icon: 'Smartphone', color: 'amber', order: 21, active: true, description: 'Pantallas y baterías' },
  { name: 'Electrodomésticos', slug: 'electrodomesticos', icon: 'Plug', color: 'red', order: 22, active: true, description: 'Service en general' },
  { name: 'Antenas y DirecTV', slug: 'antenas', icon: 'SatelliteDish', color: 'cyan', order: 23, active: true, description: 'Instalación y ajustes' },
  { name: 'Cámaras y Alarmas', slug: 'camaras-alarmas', icon: 'Cctv', color: 'indigo', order: 24, active: true, description: 'Seguridad y monitoreo' },
  { name: 'Tapiceros', slug: 'tapiceros', icon: 'Armchair', color: 'green', order: 25, active: true, description: 'Sillones y sillas' },

  // --- Automotor y traslados ---
  { name: 'Mecánicos', slug: 'mecanicos', icon: 'Wrench', color: 'blue', order: 26, active: true, description: 'Mecánica general' },
  { name: 'Gomería', slug: 'gomeria', icon: 'CircleDot', color: 'orange', order: 27, active: true, description: 'Cubiertas y balanceo' },
  { name: 'Chapa y Pintura', slug: 'chapa-pintura', icon: 'SprayCan', color: 'red', order: 28, active: true, description: 'Automotor' },
  { name: 'Remis y Chofer', slug: 'remis-chofer', icon: 'Car', color: 'teal', order: 29, active: true, description: 'Traslados particulares' },
  { name: 'Grúa y Auxilio', slug: 'grua-auxilio', icon: 'Truck', color: 'amber', order: 30, active: true, description: 'Auxilio mecánico 24hs' },
  { name: 'Fletes y Mudanzas', slug: 'mudanzas', icon: 'Package', color: 'indigo', order: 31, active: true, description: 'Traslados y embalaje' },

  // --- Belleza y estética ---
  { name: 'Peluqueros y Barberos', slug: 'peluqueros', icon: 'Scissors', color: 'purple', order: 32, active: true, description: 'Cortes y color' },
  { name: 'Manicura y Uñas', slug: 'manicura', icon: 'Hand', color: 'pink', order: 33, active: true, description: 'Esculpidas y semi' },
  { name: 'Depilación y Estética', slug: 'estetica', icon: 'Flower2', color: 'teal', order: 34, active: true, description: 'Cuidado personal' },
  { name: 'Maquilladoras', slug: 'maquilladoras', icon: 'Brush', color: 'red', order: 35, active: true, description: 'Eventos y social' },
  { name: 'Masajistas', slug: 'masajistas', icon: 'HandHeart', color: 'green', order: 36, active: true, description: 'Relax y descontracturante' },

  // --- Salud y cuidado ---
  { name: 'Enfermería a Domicilio', slug: 'enfermeria', icon: 'Stethoscope', color: 'blue', order: 37, active: true, description: 'Cuidados y curaciones' },
  { name: 'Cuidado de Adultos Mayores', slug: 'cuidado-adultos', icon: 'HeartPulse', color: 'cyan', order: 38, active: true, description: 'Acompañantes' },
  { name: 'Niñeras', slug: 'nineras', icon: 'Baby', color: 'amber', order: 39, active: true, description: 'Cuidado de niños' },
  { name: 'Kinesiólogos', slug: 'kinesiologos', icon: 'Bone', color: 'indigo', order: 40, active: true, description: 'Rehabilitación' },
  { name: 'Nutricionistas', slug: 'nutricionistas', icon: 'Salad', color: 'green', order: 41, active: true, description: 'Planes alimentarios' },
  { name: 'Psicólogos', slug: 'psicologos', icon: 'Brain', color: 'purple', order: 42, active: true, description: 'Terapia y acompañamiento' },

  // --- Mascotas ---
  { name: 'Veterinarios', slug: 'veterinarios', icon: 'PawPrint', color: 'red', order: 43, active: true, description: 'Atención a domicilio' },
  { name: 'Paseadores de Perros', slug: 'paseadores-perros', icon: 'Dog', color: 'amber', order: 44, active: true, description: 'Paseos y guardería' },
  { name: 'Peluquería Canina', slug: 'peluqueria-canina', icon: 'Bath', color: 'cyan', order: 45, active: true, description: 'Baño y corte de mascotas' },

  // --- Limpieza y jardín ---
  { name: 'Limpieza', slug: 'limpieza', icon: 'Sparkles', color: 'blue', order: 46, active: true, description: 'Hogar y oficinas' },
  { name: 'Limpieza de Tapizados', slug: 'limpieza-tapizados', icon: 'Sofa', color: 'teal', order: 47, active: true, description: 'Sillones y alfombras' },
  { name: 'Fumigación y Plagas', slug: 'fumigacion', icon: 'Bug', color: 'green', order: 48, active: true, description: 'Control y desinfección' },
  { name: 'Jardineros', slug: 'jardineros', icon: 'Sprout', color: 'green', order: 49, active: true, description: 'Parques y poda' },
  { name: 'Poda de Árboles', slug: 'poda-arboles', icon: 'TreePine', color: 'teal', order: 50, active: true, description: 'Altura y extracción' },

  // --- Eventos y gastronomía ---
  { name: 'Cocineros y Catering', slug: 'catering', icon: 'ChefHat', color: 'orange', order: 51, active: true, description: 'Eventos y viandas' },
  { name: 'Pastelería y Tortas', slug: 'pasteleria', icon: 'CakeSlice', color: 'pink', order: 52, active: true, description: 'Cumpleaños y eventos' },
  { name: 'Fotógrafos', slug: 'fotografos', icon: 'Camera', color: 'indigo', order: 53, active: true, description: 'Eventos y books' },
  { name: 'Filmación y Video', slug: 'filmacion', icon: 'Video', color: 'red', order: 54, active: true, description: 'Eventos sociales' },
  { name: 'DJ y Sonido', slug: 'dj-sonido', icon: 'Disc3', color: 'purple', order: 55, active: true, description: 'Fiestas y eventos' },
  { name: 'Animación Infantil', slug: 'animacion-infantil', icon: 'PartyPopper', color: 'amber', order: 56, active: true, description: 'Cumpleaños' },

  // --- Educación y profesionales ---
  { name: 'Profesores Particulares', slug: 'profesores', icon: 'GraduationCap', color: 'blue', order: 57, active: true, description: 'Apoyo escolar' },
  { name: 'Clases de Idiomas', slug: 'idiomas', icon: 'Languages', color: 'cyan', order: 58, active: true, description: 'Inglés, portugués y más' },
  { name: 'Profesores de Música', slug: 'profesores-musica', icon: 'Guitar', color: 'orange', order: 59, active: true, description: 'Instrumentos y canto' },
  { name: 'Personal Trainer', slug: 'personal-trainer', icon: 'Dumbbell', color: 'red', order: 60, active: true, description: 'Entrenamiento personalizado' },
  { name: 'Contadores', slug: 'contadores', icon: 'Calculator', color: 'indigo', order: 61, active: true, description: 'Impuestos y monotributo' },
  { name: 'Gestoría y Trámites', slug: 'gestoria', icon: 'FileText', color: 'teal', order: 62, active: true, description: 'Automotor y ANSES' },
  { name: 'Diseño Gráfico', slug: 'diseno-grafico', icon: 'Palette', color: 'pink', order: 63, active: true, description: 'Marca y redes' },

  // --- Oficios varios ---
  { name: 'Costura y Arreglos', slug: 'costura', icon: 'Shirt', color: 'purple', order: 64, active: true, description: 'Ropa y arreglos' },
  { name: 'Zapateros', slug: 'zapateros', icon: 'Footprints', color: 'amber', order: 65, active: true, description: 'Reparación de calzado' },
  { name: 'Relojería', slug: 'relojeria', icon: 'Watch', color: 'blue', order: 66, active: true, description: 'Pilas y reparaciones' },
]

const defaultSchedule = [
  { day: 1, label: 'Lunes', open: '08:00', close: '18:00' },
  { day: 2, label: 'Martes', open: '08:00', close: '18:00' },
  { day: 3, label: 'Miércoles', open: '08:00', close: '18:00' },
  { day: 4, label: 'Jueves', open: '08:00', close: '18:00' },
  { day: 5, label: 'Viernes', open: '08:00', close: '18:00' },
  { day: 6, label: 'Sábado', open: '09:00', close: '13:00' },
  { day: 0, label: 'Domingo', open: '', close: '', closed: true },
]

export const SCHEDULE = defaultSchedule

function mkPro(
  name: string,
  slug: string,
  categorySlug: string,
  profession: string,
  zone: string,
  services: string[],
  opts: Partial<SeedProfessional> = {},
): SeedProfessional {
  return {
    name,
    slug,
    categorySlug,
    profession,
    description: `Soy ${name}, ${profession.toLowerCase()} con más de 10 años de experiencia en el barrio de Belgrano. Trabajo prolijo, presupuestos sin cargo y garantía en todos mis servicios.`,
    phone: '541145678900',
    whatsapp: '5491145678900',
    email: `${slug}@gpsbelgrano.com`,
    photo: avatar(name),
    gallery: [work(slug + '1'), work(slug + '2'), work(slug + '3'), work(slug + '4')],
    city: 'Belgrano',
    zone,
    services,
    available: true,
    verified: true,
    featured: false,
    ...opts,
  }
}

/**
 * Profesionales de ejemplo: VACÍO a propósito.
 * El seed carga únicamente los rubros (categorías); los profesionales reales
 * se cargarán desde el panel de administración.
 *
 * Para agregar profesionales de ejemplo, usá el helper `mkPro`, por ej.:
 *   mkPro('Nombre Apellido', 'nombre-apellido', 'electricistas',
 *         'Electricista matriculado', 'Belgrano R', ['Tableros', 'Cableado'])
 */
export const PROFESSIONALS: SeedProfessional[] = []

// Referencia interna para que el helper y utilidades no queden sin uso.
void mkPro
void avatar
void work
