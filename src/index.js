import { createStore, applyMiddleware } from 'redux'

const middleware = socket => store => next => action => {
  socket.emit(action.type, action)
  return next(action)
}

const listenForRemoteActions = (socket, remoteActionType) => store =>
  socket.on(remoteActionType, action => store.dispatch(action))

const enhancer = (socket, remoteActionType) => createStore => (...args) => {
  const store = createStore(...args, applyMiddleware(middleware(socket)))

  listenForRemoteActions(socket, remoteActionType)

  return store
}

const reduxSocketDispatch = {
  socketDispatchMiddleware: middleware,
  socketDispatchEnhancer: enhancer
}

export default reduxSocketDispatch
module.exports = reduxSocketDispatch
