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