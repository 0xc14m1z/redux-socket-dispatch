# redux-socket-dispatch

Redux middleware that dispatches actions to a websocket.

## how to install

```
$ npm install --save redux-socket-dispatch
```

## how to use it

The goal of this package is to send dispatched actions through a websocket so
that they can be handled somehow on a server, and to locally dispatch remotely
emitted actions.

```js
import { socketDispatchEnhancer } from "redux-socket-dispatch"
// or const { socketDispatchEnhancer } = require("redux-socket-dispatch")

const enhancedCreateStore = compose(
  applyMiddleware(...middlewares),
  socketDispatchEnhancer(socket, 'REMOTELY_EMITTED_EVENT')
)(createStore)

const store = enhancedCreateStore(reducers)

```
