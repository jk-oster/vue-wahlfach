# lesson1

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

Open the frontend through the link provided in the command output (usually [https://loaclhost:5173/](https://loaclhost:5173/)).

Download `pocketbase.exe` from [pocketbase.io](https://pocketbase.io/docs/) and copy it 
to the project folder. Run the following command to start pocketbase:

```sh
./pocketbase.exe serve
```

Create a user (email + password) in the `users` pocket base collection 
and log in with this test-user in the frontend.

### Compile and Minify for Production

```sh
npm run build
```

### Project Overview

- The entrypoint for the application is the ``src/main.js`` file.
  - This file initializes the Vue Applications
  - The root Vue component is the ``src/App.vue`` file.
    - This file usually shows the content of ``<RouterView>`` -> the content of the current page the user is on
    - New navigate able pages can be added by creating View Components in the ``src/views`` folder
    - Each navigable View needs to be added as a route to the router in ``src/router/index.js``
  - Data processing and business logic should be encapsulated in [composable]()
    - composable always start with the naming convention ``use<Xxxxx>.js``
    - composable need to `return` the functionality they need to share across the application
    - composable manage reactive state that needs to be accessed or changed across different components
    - ...