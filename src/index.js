import { applyMiddleware } from 'redux'

const middleware = socket => store => next => action => {
  socket.emit(action.type, action)
  return next(action)
}

const listenForRemoteActions = (socket, remoteActionType, store) =>
  socket.on(remoteActionType, store.dispatch)

const enhancer = (socket, remoteActionType) => createStore => (...args) => {
  const store = createStore(...args, applyMiddleware(middleware(socket)))

  listenForRemoteActions(socket, remoteActionType, store)

  return store
}

export default enhancer
module.exports = enhancer
