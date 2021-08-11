# BEARHUG

## Índice

* [BearHug](#BearHug)
* [Interfaz](#interfaz)
* [Prototipos](#prototipos)
* [Historias de usuario](#historias-de-usuario)
* [Test de usabilidad](#test-de-usabilidad)
* [Tecnologías](#tecnologias)
* [Enlace](#enlace)

## BearHug 
Es una red social enfocada en el apoyo y contención para personas afectadas por la crisis pandémica del COVID-19. 
Sus principales usuarios son personas que se encuentran solas, enfermas o con relaciones conflictivas provocadas por el encierro y el miedo a la incertidumbre. 
Y que deseen compartir sus experiencias a través de conversaciones, en donde puedan sentirse identificados y crear conexiones más cercanas.

Toda la informacion se actualiza de manera inmediata: permite que los usuarios pueden estar en contacto desde cualquier parte del mundo en tiempo real.
Cada publicación puede contener un máximo de 280 caracteres, siendo breve y eficiente el consumo de información. 
Para publicar, los usuarios pueden registrarse mediante correo electrónico y contraseña, o a través de Google.
Cada usuario tiene un perfil único, donde puede entregar información personal en los recuadross "biografía" e "intereses", los que puede editar cuando se desee. En esta misma sección el usuario puede visualizar sus propios posts.

Respecto a las interacciones, se pueden otorgar "likes" (máximo 1 por usuario) por cada publicación en el muro, tambien eliminar y editar los posts creados por el mismo, ayudando a crear una mejor experiencia.

## Interfaz
### Móvil
![Prototipo-inicial](./src/images/mobilFirst.png) 

### Escritorio
<details>

![Prototipo-inicial](./src/images/LoginDesktop.png)
![Prototipo-inicial](./src/images/homeDesktop.png)  
![Prototipo-inicial](./src/images/perfilDesktop.png) 
![Prototipo-inicial](./src/images/editarPerfilDesktop.png)
</details>

## Prototipos
### 1. Justificación del diseño
En el proceso del desarrollo de la página se pensó en la experiencia del público objetivo, brindando una página minimalista con colores que reflejen lo que esperamos los usuarios busquen en BearHug. 

![Prototipo-inicial](./src/images/JustificacionDelDiseño.png)

Como resultado se definió una paleta basada en 3 colores pricipales, y un logotipo que hace referencia a la esencia de la red: el abrazo de un oso.

![Prototipo-inicial](./src/images/definicion.png)

### 2. Prototipos baja fidelidad:
<details>

![Prototipo-inicial](./src/images/diseñoBajaFidelidad.png)
</details>

### 3. Prototipo alta fidelidad:
![Prototipo-inicial](./src/images/DiseñoFigma.jpg)

[Prototipos en Figma](https://www.figma.com/proto/UAiGqTbsTUJqxgKLDGfsPS/Team-Yoyo---BearHug?node-id=258%3A68&scaling=scale-down&page-id=0%3A1)
## Historias de usuario
### 1. Quiero una aplicación simple, donde pueda registrarme por correo o Google, para crear conexiones.
````
CRITERIOS DE ACEPTACIÓN:
- Una sola pantalla que permita registro o inicio de sesión.
- Conectar login con Firebase.
- Validar cuenta con Firebase.
- Diseño mobile first.

DEFINICIÓN DE TERMINADO
- Creación de rutas.
- Html dinámico.
- Distribucion de elemento con Css Grid.
- Funciones de Firebase: Init, Register, Login(correo, google), Logout.
````
### 2. Quiero poder compartir mi situacion a través de posts.
````
CRITERIOS DE ACEPTACIÓN:
- Una pantalla que permita visualizar los posts.
- Una pantalla para crear publicaciones.
- Al publicar se debe validar que haya contenido en el input.
- Al recargar se debe verificar si el usuario está logueado para mostrar el contenido.

DEFINICIÓN DE TERMINADO:
- Uso de funciones de Firebase.
- Creación de colección 'post' en Firestore Database.
- Se sube data que el usuario ingresa a los post a la colección de Firestore.
- Uso de RealTimeListener.
- En escritorio el usuario puede crear posts desde la misma pantalla de home.
- Escritorio y móvil contienen un modal para crear posts. En móvil ocupa toda la pantalla.
- Se crea una condición para exigir al usuario publicar con texto con un máximo de 280 caracteres.

````
### 3. Quiero poder eliminar y editar mis publicaciones, y darle like a los posts de otras personas.
````
CRITERIOS DE ACEPTACIÓN:
- Poder eliminar un post específico. 
- Pedir confirmación antes de eliminar un post.
- Poder editar posts del propio usuario. 
- Poder dar y quitar like a una publicación. Máximo uno por usuario.

DEFINICIÓN DE TERMINADO:
- Añadir elementos (botones) de interacción. 
- Subir a la colección de 'post' el ID del usuario conectado. 
- Implementar una condición que compara el ID del usuario conectado con la ID de los posts publicados.
- Aplicación de método update de Firebase para actualizar los posts editados.
- Crear función y animación de like. Incluye un contador.

````
### 4. Quiero tener un perfil donde pueda tener informacion sobre mi y editarlo.
````
CRITERIOS DE ACEPTACIÓN:
- Crear una pantalla que contenga un perfil. 
- Manipular visualizar la data entregada por el usuario. 
- Visualizar imagen y nombre de usuario.
- Modal para editar perfil.
- Botón que actualice el perfil.

DEFINICIÓN DE TERMINADO:
- Ruta de perfil.
- Perfil reemplaza el template de posts en el contenedor de feed.
- Crear una nueva colección con la data de los usuarios. 
- Diseño de modal para edición de la información del usuario (nombre, foto, biografia y intereses).
- Aplicación de métodos updateProfile y update.
````
### 5. Quiero poder compartir imágenes en mis posts.
````
CRITERIOS DE ACEPTACIÓN:
-  Subir imágenes al post.
-  Botón de cargar imágenes. 
-  La imagen se debe cargar al momento de compartir.
-  Se debe permitir publicar posts sin fotos. 

DEFINICIÓN DE TERMINADO:
- Subir imagen a Firebase Storage.
- Bajar imagen del storage y subirla a la colección de Firestore.
- Límite de una foto por post.
- La imagen se carga al postear.
````
## Test de usabilidad

Se implementaron tres tests de usabilidad durante este proyecto:

|<sub> HISTORIA DE USUARIO 	|<sub>EDAD USUARIO 	|<sub> FUNCIONALIDAD 	|<sub>DISEÑO 	|<sub>EXPERIENCIA DE USUARIO	</sub>|
|---	|---	|---	|--- |---	|
|<sub>H.U. 1	| <sub>32 años |   <sub>En desktop, la página no permite apretar "enter" e ingresar o registrarse, según corresponda. En desktop y mobile se debe hacer clic o touch justo en la palabra "ingresar" o "registrar" para que se genere la acción. Esto es particularmente incómodo en celular.   	|  <sub>Diseño limpio. Buena tipografía. Buen funcionamiento de los inputs. 	|  <sub>Web intuitiva. Es claro lo que se debe hacer en cada ventana.  Le gusta el mensaje que indica que un correo fue enviado para validar la cuenta creada. De esa forma puede saber que efectivamente se ha registrado.	|
|   <sub>H.U. 2 Y 3	|  <sub>26 años  	|   <sub>En desktop, el campo para publicar no está bien delimitado, al eliminar no muestra mensaje de confirmación por si se arrepiente |  <sub>Buena distribución de elementos. Diseño minimalista y con estilo fresco y actual. Se confunde el botón de publicar con el de editar.	|   <sub>Buena experiencia, aunque corregiría los detalles mencionados para mejorar la experiencia. |
|<sub>H.U. 4 Y 5	|  <sub>30 años  |  <sub>Página intuitiva.	Tanto en móvil como en computador es cómodo de usar.	|   <sub>Buenos colores. Le agrada la animación de dar "like", aunque le molesta que el contador aparezca en color cuando no se ha dado un like todavia. Le agrada que se pueda postear directamente en pantalla y a través de un modal, pues incentiva a compartir (postear). |   <sub>	Muy buena. Le agrada poder subir imágenes a los posts, así como editar su propio perfil. Le gustaría que se implementaran los comentarios.|
  
Gracias a estos, se pudieron realizar algunas mejoras a la funcionalidad y diseño, así como dejar otras para el futuro.

## Tecnologías
### El proyecto está creado con:

- HTML
- CSS
- JavaScript
- NodeJs
- Firebase


## Enlace
  
  https://nikoguerrero.github.io/SCL017-social-network/
