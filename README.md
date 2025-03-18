Actualmente desplegado en: 

https://gse.zeabur.app/

Backend Repo:

https://github.com/JuanCordero99/IoTpruebas

Aplicación móvil repo:

https://github.com/JuanCordero99/app-gse

Es un sistema de gestión escolar, esta orientado a administradores. Realizando las operaciones CRUD
para los perfiles, en este caso: alumnos y docentes. Empleando como almacentamiento MySQL. 

Ademas de visualizar las gráficas orientadas a datos de un dispositivo IoT que obtiene los datos através de
MongoDB.

Los endpoints todos estan desplegandos en el Backend con Java Spring Boot, este obtiene ambas conexiones a ambas
bases de datos, obteniendo los datos de MongoDB y MySQL. 

Se empleo una arquitectura MVC para el backend.

MongoDB recive los datos del prototipo IoT, MySQL es el encargado de realizar las diferentes operaciones CRUD.
