# Node.js — Gestión de recursos mediante CLI

Proyecto correspondiente a la **primera entrega del curso de Node.js de Talento Tech**.

La consigna original propone consumir la API [Fake Store API](https://fakestoreapi.com/) mediante comandos ingresados desde la terminal, utilizando `process.argv` y los métodos HTTP `GET`, `POST` y `DELETE`.

En este proyecto se conserva esa funcionalidad, pero se incorpora además un **caso de estudio alternativo basado en el sistema de gestión de la clínica SaludTotal**, utilizado para explorar Node.js y preparar progresivamente el salto hacia Express.

## Uso

La aplicación interpreta comandos con la siguiente estructura:

```bash
npm run start <MÉTODO> <RECURSO> [ARGUMENTOS]
```

Por ejemplo:

```bash
npm run start GET products
npm run start GET products/15
npm run start POST products title:T-Shirt-Rex price:300 category:remeras
npm run start DELETE products/7
```

Estos comandos corresponden a las operaciones solicitadas por la entrega de Talento Tech y utilizan la **Fake Store API**.

## Caso de estudio: SaludTotal

Como alternativa al recurso `products`, el proyecto permite trabajar con recursos del sistema de la clínica:

```text
medicos
pacientes
turnos
resultados
especialidades
```

Los datos iniciales se encuentran en:

```text
data/datos.json
```

Por ejemplo, para consultar los médicos:

```bash
npm run start GET medicos
```

o un médico específico:

```bash
npm run start GET medicos/2
```

Los datos del proyecto se obtienen de forma asíncrona mediante `fetch`.

## Objetivo

El proyecto busca practicar:

* `process.argv`
* módulos de Node.js
* `fetch`
* `async` / `await`
* métodos HTTP
* JSON
* interpretación de comandos desde la terminal

El caso de SaludTotal funciona además como **caso de estudio satélite** para experimentar con la estructura de una API antes de incorporar Express.
