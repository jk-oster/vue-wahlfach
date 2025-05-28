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