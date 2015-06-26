// Creates a getter function. Useful for mapping over arrays.
// Example use:
//
//   var records = [{ score: 1 }, { score: 50 }, ...]
//   var scores  = users.map(getProp('score'))
//
window.getProp = function (propName) {
  return function (obj) { return obj[propName] }
}

// Merges several objects together.
// Example use:
//
//   var alice  = { name: 'alice', hobby: 'reading' }
//   var updates = { hobby: 'programming' }
//   merge(alice, aliceFromServer)
//   alice //=> { name: 'alice', hobby: 'programming' }
//
window.merge = function (target) {
  var sources = Array.prototype.slice.call(arguments, 1)
  for (var i=0; i < sources.length; i++) {
    var source = sources[i]
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) target[prop] = source[prop]
    }
  }
  return target
}
