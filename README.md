# react-native-identicon

The core of the project is a clone of the repository: [node-identicon](https://github.com/Ajido/node-identicon). I only made the library wrapper as a component in addition to using other alternate libraries such as: react-native-crypto and react-native-canvas

## Install

```bash
# TypeScript
npm install -g typescript
# Peer dependencies
npm install react-native-webview
npm install @types/node
npm install react-native-randombytes
npm install tradle/rn-nodeify --save-dev
# Hack some node modules. I recommend that you then put this inside the "postinstall" of the package.json
./node_modules/.bin/rn-nodeify --install 'stream,crypto,events,process' --hack
```

Running rn-nodeify generates a shim.js file in the root of the project. Import this file into the index.js:

```JSX
/**
 * @format
 */
import './shim' // ==> Import Here
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

```

```bash
# Install component
npm install react-native-identicon
npx pod-install ios
```

## Usage

```JSX
import React from 'react';
import Identicon from 'react-native-identicon';

const App = () => {
    return (
        <Identicon value={'test'} />
    )
}
```

Optional parameters

* style: object with container's styles
* size: default 45