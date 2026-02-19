# Soluciones Jurídicas - Landing Page

Una página web moderna, elegante y responsiva diseñada para una firma de asesoría legal. El diseño está enfocado en transmitir autoridad, confianza y estatus a través de una paleta de colores premium (Azul Marino y Dorado) y animaciones fluidas.

## Características Principales

* **Diseño UI/UX Premium:** Interfaz de usuario sofisticada con tipografía clásica (`Playfair Display`) y una paleta de colores orientada al sector legal.
* **Animaciones y Efectos:** Implementación de *Scroll Reveal*, transiciones suaves y efectos *Hover* 3D en tarjetas y botones para una experiencia interactiva sin perder la formalidad.
* **Servicios Destacados:** * Eliminación de Reportes Negativos (Datacrédito, etc.).
  * Defensa ante cobros por objetos robados.
  * Impugnación de Fotodetecciones Arbitrarias.
  * Asesoría en Ley de Insolvencia Económica.
* **Integración con WhatsApp:** Botón flotante para contacto directo e inmediato con un asesor.
* **Secciones Dinámicas:**
  * **Jurisprudencia:** Casos de éxito respaldados por sentencias y contenido multimedia (YouTube).
  * **Testimonios & FAQ:** Áreas dedicadas a construir confianza y resolver dudas frecuentes de los usuarios.
* **Formulario de Contacto:** Validaciones en el cliente (JavaScript) y estructura lista para procesar en el servidor (PHP).

## Tecnologías Utilizadas

* **HTML5:** Estructura semántica del sitio.
* **CSS3:** Estilos personalizados, Flexbox, variables de color y animaciones *Keyframes*.
* **JavaScript (Vanilla):** Lógica del DOM, *Intersection Observer* para las animaciones al hacer scroll, validación de formularios y chatbot básico.
* **PHP:** Script base (`submit.php`) para la recepción de datos del formulario de contacto.

## 📂 Estructura del Proyecto

```text
/
├── index.html          # Estructura principal de la página
├── style.css           # Estilos, paleta premium y animaciones
├── script.js           # Lógica interactiva, Scroll Reveal y validaciones
├── submit.php          # Backend básico para recepción de correos
└── assets/             # (Imágenes: insolvencia.jpg, datacredito.jpg, WhatsApp_icon.png, etc.)