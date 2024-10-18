# Estrategias de Persistencia - TP 2024

Esta Api se desarrolla con el fin de que una empresa gestione y administre su inventario de computadoras y sus componentes, pueda guardar toda la informacion en una base de datos con el fin de agrupar las computadoras con sus componentes y asi mismo con los fabricantes correspondientes.

##Para iniciar con la utilizacion del mismo se deben realizar los siguientes pasos:

    1.Se debe descargar la Api para su uso.
    2.Ya descargado se debe abrir la carpeta en editor de codigo fuente.
    3.Es necesario la apertura de un terminal para instalar las librerias vinculadas a la Api.
    4.Ya iniciada la terminal, es necesario escrbir "npm i", con el fin de que intale todas las librerias necesarias.
    5.Por ultimo, se pone a correr la Api con el comando "npm run dev". Con eso ya tenemos corriendo y escuchando en el
      puerto 5000.

Esta Api esta preparada y pensada para correr en cualquier motor de base de datos, por mas que su desarrollo fue en SQLite, la misma es compatible con el motor de base de datos que la empresa quiera usar.


##La consideracion para tener en cuenta son:

- Un Producto puede tener muchos fabricantes, y un Fabricante puede fabricar muchos productos.
- Un Producto puede tener muchos componentes, y un Componente puede formar parte de varios productos.

Esto se demuestra en el siguiente esquema de entidad de relaciones:

![DER](DER.png)


##La forma de cargar, actualizar o eliminar fabricantes, preductos y componentes son:

|Verbo|Recurso|Status code|Descripción|
|-----|-------|-----------|-----------|
| GET   | /productos | 200 | Obtener todos los productos |
| GET   | /productos/:id | 200, 404 | Obtener un producto en particular |
| POST  | /productos | 201, 400 | Crear un producto |
| PUT   | /productos/:id | 200, 404 | Modificar los datos de un producto en particular |
| DELETE| /productos/:id | 200, 404, 500 | Borrar un producto en particular |
| POST  | /productos/:id/fabricantes | 201, 404, 400 | Crear la asociación de producto con 1 o N fabricantes |
| GET   | /productos/:id/fabricantes | 200, 404 | Obtener todos los fabricantes de un producto |
| POST  | /productos/:id/componentes | 201, 404, 400 | Crear la asociación de producto con 1 o N componentes |
| GET   | /productos/:id/componentes | 200, 404 | Obtener todos los componentes de un producto |
| GET   | /fabricantes | 200 | Obtener todos los fabricantes |
| GET   | /fabricantes/:id | 200, 404 | Obtener un fabricante en particular |
| POST  | /fabricantes | 201, 400 | Crear un fabricante |
| PUT   | /fabricantes/:id | 200, 404 | Modificar los datos de un fabricante en particular |
| DELETE| /fabricantes/:id | 200, 404, 500 | Borrar un fabricante en particular |
| GET   | /fabricantes/:id/productos | 200, 404 | Obtener todos los productos de un fabricante |
| GET   | /componentes | 200 | Obtener todos los componentes |
| GET   | /componentes/:id | 200, 404 | Obtener un componente en particular |
| POST  | /componentes | 201, 400 | Crear un componente |
| PUT   | /componentes/:id | 200, 404 | Modificar los datos de un componente en particular |
| DELETE| /componentes/:id | 200, 404, 500 | Borrar un componente en particular |
| GET   | /componentes/:id/productos | 200, 404 | Obtener todos los productos de un componente |


