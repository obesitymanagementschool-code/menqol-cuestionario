# 🌸 Cuestionario MENQOL

Cuestionario interactivo de **Calidad de Vida Específica de la Menopausia** (MENQOL) — una herramienta web para evaluar el impacto de los síntomas menopáusicos en la calidad de vida.

## ✨ Características

- **29 preguntas** organizadas en 4 dominios: Vasomotor, Psicosocial, Físico y Sexual
- **Diseño mobile-first** optimizado para uso en smartphones
- **Sistema No/Sí** con escala de intensidad 1-10 para cada síntoma
- **Ayuda contextual** con panel explicativo para cada pregunta (botón ?)
- **Validación**: no se puede avanzar sin puntuar los síntomas marcados como presentes
- **Resultados visuales** con puntuación global, barras por dominio y detalle de síntomas
- **Imprimible** para llevar a consulta médica
- Recoge **edad y peso** opcionales para contextualizar

## 🚀 Despliegue rápido

### Opción 1: GitHub Pages (recomendado)

1. Crea un repositorio en GitHub llamado `menqol-cuestionario`
2. Sube todos los archivos del proyecto
3. Ve a **Settings → Pages → Source** y selecciona **GitHub Actions**
4. El workflow se ejecuta automáticamente con cada push a `main`
5. Tu app estará en: `https://TU-USUARIO.github.io/menqol-cuestionario/`

### Opción 2: Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173/menqol-cuestionario/` en tu navegador.

### Build de producción

```bash
npm run build
```

Los archivos estáticos se generan en la carpeta `dist/`.

## 📁 Estructura

```
menqol-cuestionario/
├── .github/workflows/deploy.yml  ← Deploy automático a GitHub Pages
├── index.html                     ← Punto de entrada HTML
├── package.json
├── vite.config.js                 ← Config con base path para GH Pages
├── src/
│   ├── main.jsx                   ← Punto de entrada React
│   ├── App.jsx                    ← Componente principal
│   ├── data.js                    ← Datos de los 29 ítems MENQOL
│   └── styles.css                 ← Estilos globales
└── README.md
```

## ⚠️ Nota importante

> Si el nombre de tu repositorio en GitHub es **diferente** a `menqol-cuestionario`, 
> debes actualizar el campo `base` en `vite.config.js` con el nombre correcto:
> ```js
> base: '/TU-NOMBRE-DE-REPO/'
> ```

## 📋 Basado en

[MENQOL (Menopause-Specific Quality of Life Questionnaire)](https://eprovide.mapi-trust.org/instruments/menopause-specific-quality-of-life-questionnaire) — Hilditch et al., 1996.

Esta herramienta es **orientativa** y no sustituye una consulta médica profesional.

## 📄 Licencia

MIT
