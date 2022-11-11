# Mi tienda - Proyecto Coder 

![](public/logo192.png)

Proyecto base de un e-comerce para aprender las bases de React - Coderhouse.

## Librerías utilizadas

-   [Firebase](https://firebase.google.com/)  
    Libreria utilizada para cargar un mock de productos desde la nube, conseguir ese mock y utilizarlo en el proyecto, tambien para cargar categorias dinámicas dentro del proyecto y para generar las ordenes de compra que devuelven un ID de compra al usuario.

-   [React-router-dom](https://github.com/remix-run/react-router)
    Utilizada para navegar entre las distintas rutas del sitio como por ejemplo "/" para ir al home, "/category/electronics" para ir a la category de electrónicos, etc.

## Funcionalidades del proyecto

-   El usuario puede navegar entre categorias y productos pre-cargados desde Firebase.
-   Si hay stock disponible se podrá ver en el detalle del de la carta del item y entrar en dicho detalle para saber su precio, stock, categoría.
-   El usuario puede comprar determinada cantidad de items y los mismos irán actualizando su stock en base a las compras en la base de datos de alojada en firestore.
-   Se pueden eliminar los items del carrito o elminiar el carrito entero.
-   Una vez completado el formulario la orden de compra es enviada a la base de datos y la misma devuelve el ID de la orden realizada.


### Pasos para correr el proyecto en local

1. Clonar el repositorio

```
git clone https://github.com/ViglianoG/ReactJS-Vigliano.git
```

2. Abrirlo en algún editor de código e instalar las dependencias

```
npm install 
```

3. Correr el proyecto en local

```
npm start
```