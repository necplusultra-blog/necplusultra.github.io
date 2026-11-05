# Nec plus ultra · sitio web

Sitio estático para GitHub Pages. **Todo lo que está escrito se puede editar** sin tocar código, desde el panel visual **Pages CMS** o modificando directamente los archivos de contenido en GitHub.

---

## 1. Publicar el sitio (una sola vez)

1. Cree un repositorio nuevo en GitHub (por ejemplo `necplusultra`).
2. Suba **todo el contenido de esta carpeta** a la raíz del repositorio (botón *Add file → Upload files*, arrastrando todas las carpetas y archivos).
   - **Importante:** el archivo `.pages.yml` (el que configura el panel) suele quedar fuera al arrastrar carpetas. Compruebe que aparezca en el repositorio; si no, súbalo aparte con *Add file → Upload files*.
3. En el repositorio, vaya a **Settings → Pages**. En *Build and deployment* elija **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guarde.
4. En uno o dos minutos el sitio estará en `https://SU-USUARIO.github.io/necplusultra/`.

> Si los estilos o las imágenes no cargan en esa dirección, abra `_config.yml`, quite el `#` delante de `baseurl:` y escriba el nombre del repositorio (`baseurl: "/necplusultra"`). Con un dominio propio o con un repositorio llamado `SU-USUARIO.github.io` no hace falta.

## 2. Activar el panel de edición (Pages CMS)

1. Entre en **https://app.pagescms.org** y pulse *Sign in with GitHub*.
2. Instale la aplicación de GitHub de Pages CMS en su cuenta y dele acceso al repositorio.
3. Abra el repositorio desde el panel. A la izquierda aparecerán los menús de edición.
4. Para que otras personas del grupo editen, invítelas como colaboradoras desde el propio panel o desde GitHub.

Cada vez que guarda un cambio, el panel lo registra en GitHub y el sitio se actualiza solo en uno o dos minutos.

## 3. Qué se edita en cada menú

| Menú del panel | Qué contiene |
|---|---|
| **Ensayos** | Los seis textos recuperados del blog. Cada uno tiene título, autor, fecha, etiquetas, resumen, imagen, PDF y el texto completo. Para **eliminar** uno, ábralo y pulse *Delete*; para crear otro, *Add an entry*. Marque **destacado** en el que quiera ver en grande en la portada. |
| **Libros** | *Revuelta, capital y praxis social* ya está cargado: suba ahí la **portada** y el **PDF**, y escriba la presentación o el índice. Se pueden agregar más libros. |
| **Textos del sitio** | Todos los demás textos: nombre, lema, menú, portada, presentación, cita, *Sobre el emblema*, títulos de sección y pie de página. Cada sección tiene un interruptor **Mostrar** para ocultarla sin borrar su contenido. |
| **Taller · audios** | Las sesiones del taller de *El Capital*. En cada una, suba el **mp3** en el campo *audio* y el reproductor lo reproducirá. Los títulos actuales son de muestra. |
| **Seminarios y convocatorias** | Actividades con fecha. La sección está **oculta** por ahora; actívela en *Textos del sitio → Sección Seminarios → Mostrar*. |

**Imágenes de los ensayos:** las imágenes originales del blog no venían en las páginas guardadas. Cada ensayo indica, en una línea de su archivo, el nombre de la imagen que tenía. Súbala desde el campo *Imagen* del ensayo.

**Notas al pie:** en el texto basta escribir `[1]`, `[2]`… y, al final, un párrafo que empiece con `[1]`, otro con `[2]`… El sitio convierte las llamadas en superíndices enlazados a la nota y cada nota en un enlace de vuelta al texto.

**Redes, correo y plataformas:** están vacíos y por eso no se muestran. Si los completa en *Textos del sitio*, aparecen solos en el pie de página.

**El símbolo:** en *Textos del sitio → Portada → Imagen* puede subir otra imagen y reemplazará al emblema. Si deja el campo vacío, vuelve el símbolo.

**Etiquetas:** las siete etiquetas están en `.pages.yml` (lista del campo *Etiquetas*) y en *Textos del sitio → Etiquetas* (que define los botones de filtro). Si quiere añadir o renombrar una, cámbiela en ambos lugares.

## 4. Estadísticas privadas (lecturas y descargas)

El sitio puede registrar, sin mostrarlo al público:

- **Lecturas:** cada visita a un ensayo, al libro o a la portada.
- **Lecturas completas:** cuando alguien llega al final de un ensayo tras al menos un minuto en la página.
- **Descargas:** cada descarga del PDF del libro y cada «Descargar en PDF» de un ensayo.

Para activarlas:

1. Cree una cuenta gratuita en **https://www.goatcounter.com/signup**. Como código elija, por ejemplo, `necplusultra`: su panel quedará en `necplusultra.goatcounter.com`.
2. En Pages CMS → *Textos del sitio*, escriba ese código en **Estadísticas privadas** y guarde.
3. Para ver las cifras, entre a su panel con su usuario y contraseña. Nadie más puede verlo, salvo que usted lo haga público en la configuración de GoatCounter (no lo haga).
4. Para que sus propias visitas no se cuenten, abra una vez el sitio agregando `#toggle-goatcounter` al final de la dirección, en cada navegador que use.

En el panel, las descargas aparecen como `descarga/...` y `pdf/...`, y las lecturas completas como `lectura-completa/...`.

## 5. Editar sin el panel

Todo el contenido está en archivos de texto legibles, que también se pueden editar en GitHub con el lápiz ✎:

```
_data/sitio.yml        textos generales del sitio
_data/podcast.yml      episodios
_data/seminarios.yml   actividades
_ensayos/*.md          un archivo por ensayo
_libros/*.md           un archivo por libro
assets/img/            imágenes y PDF
```

Las plantillas (`_layouts/`, `_includes/`, `index.html`), los estilos (`assets/css/estilos.css`) y el comportamiento (`assets/js/main.js`) solo hace falta tocarlos para cambiar el diseño.

## 6. Antes de presentarlo

- Suba las imágenes de los ensayos (el libro ya tiene portada y PDF).
- Reemplace las sesiones de muestra del taller por las reales, con sus audios.
- Revise las etiquetas asignadas a cada ensayo y el texto de la presentación: son una propuesta.
