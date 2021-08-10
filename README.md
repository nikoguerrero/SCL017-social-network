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
Es una red social enfocada en el  apoyo y contención para personas que estan siendo afectadas por la crisis pandémica Covid-19. Sus principales usuarios son  personas que se encuentran solas, enfermas o con relaciones conflictivas provocadas por el encierro y el miedo a la incertidumbre. Compartiendo sus experiencias a traves de post de manera publica y obtener información, sentirse identificados y crear conexiones mas cercanas. 
Toda la informacion se actualiza de manera  inmediata: permite que los usuarios pueden estar en contacto desde cualquier parte del mundo en tiempo real.
Sin embargo, cada  o publicación solo puede contener 280 caracteres, siendo breve el consumo de informacion e eficiente. 
Para publicar, los usuarios pueden hacerlo desde sus cuentas a través de la web, podiendose registar con google o su corro electronico.
Cada usuario tiene un perfil unico, donde puede entregar información de su boigrafia, y sus interese y poderlos editar y actualizarlo en tiempo real. Así mismo puede visualizar solo sus publicaciones en  el perfil.
En las interacciones puede indicar un "like", por cada publicacion en el muro, tambien elimiar y editar el post creado por el usuario dandole manejo de sus publicaciones para crear una mejor satifaccion de experiencia.

## Interfaz
### Mobil
![Prototipo-inicial](./src/images/mobilFirst.png) 

### Desktop
<details>

![Prototipo-inicial](./src/images/LoginDesktop.png)
![Prototipo-inicial](./src/images/homeDesktop.png)  
![Prototipo-inicial](./src/images/perfilDesktop.png) 
![Prototipo-inicial](./src/images/editarPerfilDesktop.png)
</details>

## Prototipos
### 1. Justificación del Diseño
En el proceso del desarrollo de la pagina se itero en la experiencia de usario, brindando una pagina minimalista con colores que reflejan lo que los usuarios buscan en Bearhug. 

![Prototipo-inicial](./src/images/JustificacionDelDiseño.png)

Como resultado se definé una paleta de colores basada solo en 3 pricipales, y un logotipo que hace referencia a la esencia  de la red.

![Prototipo-inicial](./src/images/definicion.png)

### 2. Prototipos baja fidelidad:
<details>

![Prototipo-inicial](./src/images/diseñoBajaFidelidad.png)
</details>

### 3. Prototipo alta fidelidad:
![Prototipo-inicial](./src/images/DiseñoFigma.jpg)

[Prototipos en Figma](https://www.figma.com/proto/UAiGqTbsTUJqxgKLDGfsPS/Team-Yoyo---BearHug?node-id=258%3A68&scaling=scale-down&page-id=0%3A1)
## Historias de usuario
### 1. Quiero una aplicacion simple, donde pueda registrarne por correo o google, para crear conexiones.
````
CRITERIOS DE ACEPTACIÓN:
- Una sola pantalla que permita registro o inicio de sesion
- Conectar login con firebase
- Validar cuenta con firebase.
- Diseño mobil first

DEFINICIÓN DE TERMINADO
- Creacion de rutas.
- Html dinamico.
- Distribucion de elemento con Css Grid.
- Funciones de Firebase: Init, Register, Login(correo, google), Logout.
````
### 2. Quiero poder compartir mi situacion a través de post.
````
CRITERIOS DE ACEPTACIÓN:
- Una pantalla que permita visualizar el post.
- Una pantalla para crear publicaciones.
- Al publicar se debe validar que haya contenido en el input.
- Al recargar se debe verificar si el usuario esta logueado para mostrar el contenido.

DEFINICIÓN DE TERMINADO:
- Uso de funciones de Firebase (Firestore)
- Se sube data que el usuario ingresa a los post a la coleccion de Firestore.
- Uso de RealTimeListener.
- En escritorio el usario puede crear post desde la misma pantalla de home.
- En escritorio y movil contiene un modal para crear post.
- Se crea una condicion para exigir al usuario publicar con texto con un maximo de 280 caracterés.

````
### 3. Quiero poder eliminar, editar mis publicaciones y darle like a los post publicos.
````
CRITERIOS DE ACEPTACIÓN:
- Poder eliminar un post especifico. 
- Pedir confirmacion antes de eliminar un post.
- Poder editar mis post. 
- Poder dar y quitar like a una publicacion. Maximo una por usuario.

DEFINICIÓN DE TERMINADO:
- Añadir elementos de intetacción. 
- Agregar el ID del usuario conectado a la data de los post para poder comparar sus propios post.
- Aplicar la funcion upDate para editar los post.
- Crear funcion de like con un contador.

````
### 4. Quiero tener un perfil donde pueda tener informacion sobre mi y editarlo.
````
CRITERIOS DE ACEPTACIÓN:
- Crear una pantalla que contega un perfil. 
- Manipular la data y visualizar la data entregada por el usuario. 
- Se pueda visualizar imagen de perfil y nombre
- Boton menu perfil.
- Editar el perfil.

DEFINICIÓN DE TERMINADO:
- Ruta de perfil.
- Perfil reemplaza el template de post en el contenedor de feed.
- Crear una nueva coleccion con la data de los usuarios. 
- Diseño de modal para edición de la info de el usuario(nombre, foto, biografia y intereses).
- Aplicacion de funciones upDateProfile y upDate.
````
### 5. Quiero poder compartir imagenes en mis post 
````
CRITERIOS DE ACEPTACIÓN:
-  Subir imagenes al post.
-  Boton de cargar imagenes. 
-  La imagen se debe cargar al momento de compartir.
-  Publicar post sin fotos. 

DEFINICIÓN DE TERMINADO:
- Subir imagen a firebase storage.
- Bajar imagen del storage subirla a la coleccion de firestore.
- Limite de una foto por post.
- La imagen se carga al postear.
````
## Test de usabilidad

## Tecnologías
### El proyecto es creado con 

- HTML
- CSS
- JavaScript
- NodeJs
- Firebase


## Enlace
