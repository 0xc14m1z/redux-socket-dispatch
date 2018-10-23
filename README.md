# redux-socket-dispatch

The goal of this package is to:

1. send dispatched actions through a websocket so that they can be handled on a server;
2. locally dispatch remotely emitted actions.

## how to install

```
$ npm install --save redux-socket-dispatch
```

## how to use it

In order to dispatch an action through a websocket, pass the instance to the
store enhancer provided by the library.

```js
// ON THE CLIENT

import socketDispatchEnhancer from "redux-socket-dispatch"
// or const socketDispatchEnhancer = require("redux-socket-dispatch")

import openSocket from 'socket-io.client'
const socket = openSocket(process.env.ENDPOINT)

const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middlewares),
    socketDispatchEnhancer(socket, 'REMOTELY_EMITTED_EVENT')
  )
)

```

To dispatch through redux, actions sent via the websocket by the server, you
have to give the socket event name as the second argument of the store enhancer.

```js
// ON THE SERVER

const socket = require('socket.io').listen(process.env.PORT)

socket.on('connection', client => {
  const action = { type: 'CONNECTED' }
  client.emit('REMOTELY_EMITTED_EVENT', action)
})

```
