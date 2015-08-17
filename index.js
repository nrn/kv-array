var has = Object.prototype.hasOwnProperty
var canBeMap = typeof Map === 'function'
var hasSymbol = typeof Symbol === 'function'

module.exports = kv

function kv (stuff) {
  if (!stuff) return []
  if (canBeMap && stuff instanceof Map) {
    return kvMap(stuff)
  }
  if (hasSymbol && Symbol.iterator && stuff[Symbol.iterator]) {
    return kvIt(stuff[Symbol.iterator]())
  }
  return kvObj(stuff)
}

function kvObj (obj) {
  var kvArray = []
  for (var i in obj) {
    if (has.call(obj, i)) {
      kvArray.push({ key: i, value: obj[i] })
    }
  }
  return kvArray
}

function kvIt (it) {
  var kvArray = []
  var inserted = 0
  var next = null
  while (true) {
    next = it.next()
    if (next.done) break;
    kvArray.push({ key: '' + inserted++, value: next.value})
  }
  return kvArray
}

function kvMap (map) {
  var kvArray = []
  map.forEach(function (value, key) {
    kvArray.push({ key: key, value: value })
  })
  return kvArray
}
