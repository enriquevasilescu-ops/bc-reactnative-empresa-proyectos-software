# App de Proyectos de Software

## Descripción

Aplicación móvil desarrollada con React Native, Expo y TypeScript para una empresa dedicada al desarrollo de proyectos de software.

La aplicación permite visualizar diferentes proyectos tecnológicos y realizar búsquedas en tiempo real.

## Dominio

El dominio seleccionado es una empresa de proyectos de software.

Cada proyecto contiene información como:

- Nombre del proyecto
- Cliente
- Tecnología utilizada
- Estado
- Equipo responsable

## Funcionalidades

La aplicación cuenta con:

- Lista de proyectos utilizando FlatList.
- 12 proyectos de ejemplo.
- Búsqueda en tiempo real mediante TextInput.
- Filtrado mediante useMemo.
- useCallback para renderItem.
- useCallback para el estado vacío.
- keyExtractor utilizando el id del proyecto.
- ItemSeparatorComponent para separar las tarjetas.
- KeyboardAvoidingView para evitar problemas con el teclado.
- Estado vacío cuando no existen resultados.
- Componente reutilizable ItemCard.
- TypeScript estricto sin utilizar any.
- Tema visual mediante COLORS, TYPOGRAPHY, SPACING y RADIUS.

## Diseño

Se utilizó un diseño oscuro relacionado con el entorno tecnológico y de desarrollo de software.

El color azul se utiliza como color de acento para representar tecnología, innovación y profesionalismo.

## Tecnologías

- React Native
- Expo
- TypeScript
- FlatList
- TextInput
- React Hooks

## Ejecución

Instalar las dependencias:

```bash
pnpm install