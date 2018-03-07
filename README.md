# Vilaippattiyal

![Vilaippattiyal](https://github.com/jaganathanb/vilaippattiyal/blob/dev/resources/icons/256x256.png "Vilaippattiyal")

Vilaippattiyal is open source desktop application for manaing invoices, clients and quotations for businesses with better country based tax calculation support.

## Technology

Vilaippattiyal uses a couple of open source projects:

* [Electron] - Uses Javascript to build desktop appliation on cross platform
* [ReactJS] - Controls how html should be rendered
* [Redux] - Awesome state management library for react
* [Material UI] - Great UI boilerplate for modern web apps
* [Webpack] - Powerfull module bundler
* [sqlite3] - Relational Database Management System embedded with the app

## Installation

Vilaippattiyal requires [Node.js](https://nodejs.org/) v7+ for development.
Install all the dependencies.
If you use, [yarn](https://yarnpkg.com/)

```sh
git clone https://github.com/jaganathanb/vilaippattiyal.git
cd vilaippattiyal
yarn install
```

or [npm](https://nodejs.org/en/)

```sh
git clone https://github.com/jaganathanb/vilaippattiyal.git
cd vilaippattiyal
npm install
```

Once the installation is done, install the native dependencies.

```sh
cd src
yarn install
```

For better understanding on what is native denpendencies in this app, please look at [this](https://github.com/chentsulin/electron-react-boilerplate/wiki/Module-Structure----Two-package.json-Structure) page

## Development

Want to contribute? Great!

Vilaippattiyal uses Webpack with React HMR for fast development.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run these commands.

```sh
yarn run build
yarn run dev
```

## License

MIT © [Jaganathan B](https://github.com/jaganathanb)

> Originally based on the [chentsulin/electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)
> MIT © [C. T. Lin](https://github.com/chentsulin)
>
> [Electron](http://electron.atom.io/) application boilerplate based on [React](https://facebook.github.io/react/), [Redux](https://github.com/reactjs/redux), [React Router](https://github.com/reactjs/react-router), [Webpack](http://webpack.github.io/docs/), [React Transform HMR](https://github.com/gaearon/react-transform-hmr) for rapid application development
