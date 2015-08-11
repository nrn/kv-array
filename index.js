var has = Object.prototype.hasOwnProperty
var canBeSet = typeof Set === 'function'
var canBeMap = typeof Map === 'function'

module.exports = kv

function kv (stuff) {
  if (canBeSet && stuff instanceof Set) {
    return kvSet(stuff)
  }
  if (canBeMap && stuff instanceof Map) {
    return kvMap(stuff)
  }
  return kvObj(stuff)
}

function kvObj (obj) {
  var arr = []
  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push({key: i, value: obj[i]})
    }
  }
  return arr
}

function kvSet (set) {
  var arr = []
  var inserted = 0
  set.forEach(function (value) {
    arr.push({key: ''+inserted++, value: value})
  })
  return arr
}

function kvMap (map) {
  var arr = []
  map.forEach(function (value, key) {
    arr.push({key: key, value: value})
  })
  return arr
}
