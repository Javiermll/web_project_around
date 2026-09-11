# Around The U.S. — Red Social de Fotos

> 📌 Este repositorio documenta una etapa temprana del proyecto "Around The U.S." durante el bootcamp TripleTen. La versión final, con backend propio y desplegada en producción, vive en [web_project_api_full](https://github.com/Javiermll/web_project_api_full).

Aplicación web interactiva de una red social de fotografías donde los usuarios pueden ver, publicar, dar like y eliminar tarjetas de lugares, además de editar su perfil y avatar. Desarrollada como proyecto de formación en el bootcamp TripleTen.

## Descripcion / Objetivo

SPA (Single Page Application) que conecta con una API REST real para gestionar tarjetas de lugares fotográficos y el perfil del usuario, aplicando Programación Orientada a Objetos (POO) con JavaScript vanilla.

## Tecnologias y herramientas

- HTML5
- CSS3 con Flexbox y BEM
- JavaScript ES6+ (clases, módulos ES, Promises, `fetch`)
- Programación Orientada a Objetos (POO) — clases reutilizables
- Fetch API para consumo de API REST
- API REST de TripleTen (`around-api.es.tripleten-services.com`)
- Git / GitHub para control de versiones

## Funcionalidades principales

- **Consumo de API REST:** carga inicial de perfil y tarjetas con `Promise.all`, sincronización en tiempo real con 6 endpoints (GET, POST, PATCH, PUT, DELETE).
- **Gestion de tarjetas:** crear nuevas tarjetas con nombre e imagen, eliminar las propias con modal de confirmación, dar/quitar like con actualización de contador en la interfaz.
- **Edicion de perfil y avatar:** modales para actualizar nombre, descripción y foto de perfil vía PATCH a la API.
- **Validacion de formularios:** clase `FormValidator` que valida en tiempo real todos los formularios, habilitando/deshabilitando el botón de envío.
- **Arquitectura OOP:** 9 clases con responsabilidad única: `Api`, `Card`, `Section`, `UserInfo`, `Popup`, `PopupWithForm`, `PopupWithImage`, `PopupWithConfirmation`, `FormValidator`.

## Rol

Proyecto individual: arquitectura completa de clases JS, integración con API REST, manejo de eventos y estilos CSS.

## Resultado / Impacto

- 9 clases JavaScript implementadas con principio de responsabilidad única (SRP).
- 7 operaciones de API integradas: cargar perfil, cargar tarjetas, editar perfil, editar avatar, crear tarjeta, eliminar tarjeta, dar/quitar like.
- Validación en tiempo real en todos los formularios modales de la aplicación.
- Aplicación totalmente funcional sin frameworks de UI, usando sólo JavaScript vanilla y POO.

## Repositorio

- GitHub: https://github.com/Javiermll/web_project_around
