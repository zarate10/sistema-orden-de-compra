# SISTEMA ORDEN DE COMPRA

1. El usuario puede registrarse, cumpliendo con cierto requisitos, por ejemplo, el nombre de usuario no puede ser menor a cinco caracteres y la contraseña no puede ser menor a 8 caracteres. Para evitar SQL Injection, en la autenticación se evitaron caracteres especiales desde el lado del servidor. El usuario sólo podrá registrarse si responde un pequeño acertijo (de extrema facilidad, tiene como objeto no floodear el servidor). 

2. Una vez registrado, el usuario podrá loguearse, no así desloguearse. El deslogueo está contemplado en el cierre de la pestaña de forma automática. La sesión de los usuarios se almacena dentro de sessionStorage y está cifrada, por ende, es temporal. 

3. Para hacer administrador a un usuario, sólo es posible desde la base de datos, donde se tendrá que colocar la columna "admin" del usuario en "1". 

4. Tanto el usuario normal, como el usuario administrador podrán crear tickets de compra de coins mientras la cantidad a comprar no sea menor o igual a 0 o mayor a 10000.

5. En el inicio de sesión administrativo se podrán ver elementos de gestión, tales como "ver tickets" para administrar los tickets abiertos por los usuarios, "gestionar items" para agregar o eliminar items del modal de exhibición de productos y "crear boletas" que permitirá crear boletas de forma dinámica para ser pasadas a los usuarios con tickets open. 

6. Para evitar cualquier tipo de uso mal intencionado por parte del usuario, este sólo podrá subir el comprobante desde links de imgur, no está contemplada ninguna otra plataforma. 

7. Toda acción queda registrada en la base de datos. 
