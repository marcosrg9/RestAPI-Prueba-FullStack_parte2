# Prueba para desarrollador FullStack (Parte 2)

### Resumen rápido

- [Documentación de la API](https://documenter.getpostman.com/view/11996689/TzeZDRxY)
- Comandos

```javascript
    npm start // Arranca el servidor.
    npm run debug // Arranca el servidor para depurar con Chrome.
```
- [Demostración de la App](https://rest-api-guadaltech-pt2.herokuapp.com/)


### Desarrollo de la prueba
La segunda parte de esta prueba consiste en crear una API Rest CRUD para una entidad (persona).
En este caso, mi deseo era realizarla lo más completa posible, accediendo y manipulando los datos mediante distintos métodos, en referencia tanto a HTTP como de arquitectura.

Esto quiere decir que, según el endpoint, el servidor buscará datos de una forma u otra.

Por ejemplo:

Para buscar un usuario concreto hay distintas formas, todas válidas.<br>
El endpoint `/api/` buscará un usuario, pero hace un filtrado por el tipo de campo.<br>Si coincide con el patrón de un Id de Mongo, realizará una consulta por Id. Si coincide con el patrón de un email, buscará por email. Si no coincide con ninguno de los anteriores, asume que es un nombre, por ende buscará por nombre. Este último método de búsqueda solo se aplica a las peticiones GET y HEAD.

De la misma forma, el servidor puede buscar de forma explícita mediante los siguientes endpoints:
- `/api/id/`
- `/api/email/`
- `/api/name/`

También está preparado para realizar consultas 'like' similar a las de SQL. Esto devolverá todos los documentos que contengan la consulta o parte de ella en algunos de los campos.

- `/api/match/`

Al igual que los id, email o nombre, puede filtrarse por el tipo de campo:

- `/api/match/email/`
- `/api/match/name/`

Estas consultas son preferibles porque tienen menor coste de procesamiento, la base de datos no tendrá que buscar en todos los campos donde algo coincide.

Todos los endpoints anteriores corresponden a métodos GET.<br>
El resto de métodos son más restrictivos, se debe ser explícito para manipular la información.

Para insertar un usuario, el método POST desde `/api/` hará el trabajo. El cuerpo debe contener el esquema de una persona:

```
{
    "nombre": String,
    "email": String
}
```

Si un usuario ya existe, el servidor responde con el estado 409 (Conflicto). Si se produce un error desconocido, responderá con un 500.



