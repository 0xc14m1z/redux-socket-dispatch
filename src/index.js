const middleware = socket => store => next => action => {
  socket.emit(action.type, action)
  return next(action)
}

export default middleware
module.exports = middleware
