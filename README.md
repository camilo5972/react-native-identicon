# react-native-identicon

The core of the project is a clone of the repository: [node-identicon](https://github.com/Ajido/node-identicon). I only made the library wrapper as a component in addition to using other alternate libraries such as: react-native-crypto and react-native-canvas

## Install

```bash
npm install -g typescript
npm install react-native-webview
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