# IndoYoga — Website

Sitio web premium para **IndoYoga**, escuela de Ashtanga Yoga fundada por Kike Fay en Gualeguaychú, Entre Ríos, Argentina.

---

## Estructura del proyecto

```
indoyoga-website/
├── index.html                    # Página principal
├── css/
│   └── styles.css                # Estilos completos
├── js/
│   └── main.js                   # Lógica, animaciones e interacciones
├── assets/
│   └── images/
│       └── kike-fay-founder.jpeg # Foto del fundador
└── README.md
```

## Stack técnico

- **HTML5** semántico
- **CSS3** con custom properties, animations, clip-path, backdrop-filter
- **JavaScript** vanilla (sin dependencias externas)
- **Google Fonts**: Cormorant Garamond + Outfit

## Características

### Diseño
- Paleta premium: ivory, cream, terracotta, ink, sage
- Tipografía display serif + body sans-serif
- Grain/noise overlay para materialidad
- SVG wave transitions entre secciones
- Responsive design (mobile-first breakpoints: 600px, 900px)

### Animaciones y micro-interacciones
- **Page loader** cinemático con barra de progreso
- **Smooth scroll con inercia** (estilo Lenis) — se desactiva en mobile
- **Hero title reveal** letra por letra con rotación 3D
- **Custom cursor** con estados hover y click
- **Scroll-triggered reveals** escalonados por sección
- **Parallax** en la imagen del founder y orbs del hero
- **Counters animados** para horas de formación (300hs / 200hs)
- **Divisores animados** que se dibujan al entrar en viewport
- **Botones con fill animado** de izquierda a derecha
- **Nav links** con underline deslizante

### Secciones
1. **Hero** — Nombre con separación tipográfica Indo/Yoga + tagline
2. **Clases** — Horarios y valores mensuales (Febrero 2026)
3. **Quote** — Interludio emocional con frase de Kike Fay
4. **Formación** — Dos programas: Ashtanga Yoga 300hs y Yoga Dinámico 200hs
5. **Founder** — Bio de Kike Fay con parallax en imagen
6. **Contacto** — WhatsApp, email, Instagram, ubicación

## Despliegue

Sitio estático. Se puede servir desde cualquier hosting:

```bash
# Servidor local rápido
npx serve .

# O con Python
python3 -m http.server 8000
```

## Pendientes de integración

- [ ] Logo oficial de IndoYoga (reemplazar placeholder "IY" en nav)
- [ ] Fotos adicionales del estudio y clases
- [ ] Verificar handle de Instagram (@indoyoga)
- [ ] Dominio y hosting definitivo

## Tipografías

| Uso | Fuente | Peso |
|-----|--------|------|
| Display / Títulos | Cormorant Garamond | 300, 400, 500 italic |
| Body / UI | Outfit | 200, 300, 400, 500 |

## Paleta de colores

| Nombre | Hex | Uso |
|--------|-----|-----|
| Ink | `#1a1612` | Texto principal, fondos oscuros |
| Terracotta | `#b8704a` | Acentos, CTA, highlights |
| Cream | `#f3ede5` | Fondos alternos |
| Ivory | `#faf7f3` | Fondo principal |
| Sage | `#7a8c6e` | Badges secundarios |
| Warm Stone | `#b8a892` | Texto terciario |

---

Proyecto desarrollado con enfoque premium, sin dependencias externas, optimizado para performance y accesibilidad.
