import { applyMiddleware } from 'redux'

// take a socket and return a middleware that emits an event
// through the socket of type `action.type` and the entire action as payload
const middleware = socket => store => next => action => {
  // avoid emitting actions marked as dispatched from the server
  if ( !action.__remote__ ) socket.emit(action.type, action)
  return next(action)
}

// add an handler to the socket for the given remote action type and dispatch
// the payload action marking it as remote (in order to avoid re-dispatching)
const listenForRemoteActions = (socket, remoteActionType, store) => {
  socket.on(remoteActionType, action => {
    store.dispatch({ ...action, __remote__: true })
  })
}

// take a socket and a remote action type and return a redux store enhancer
const enhancer = (socket, remoteActionType) => createStore => (...args) => {
  const socketMiddleware = middleware(socket)
  const store = createStore(...args, applyMiddleware(socketMiddleware))

  listenForRemoteActions(socket, remoteActionType, store)

  return store
}

export default enhancer
module.exports = enhancer
