var has = Object.prototype.hasOwnProperty
var canBeMap = typeof Map === 'function'
var hasSymbol = typeof Symbol === 'function'

reduce.reduced = Reduced

function Reduced (val) {
  if (!(this instanceof Reduced)) return new Reduced(val)
  this.val = val
}

module.exports = kv

function kv (stuff) {
  return reduce(stuff, function (acc, keyValue) {
    acc.push(keyValue)
    return acc
  }, [])
}

function reduce (stuff, fn, acc) {
  if (!stuff) return acc
  if (canBeMap && stuff instanceof Map) {
    return kvMap(stuff, fn, acc)
  }
  if (hasSymbol && Symbol.iterator && stuff[Symbol.iterator]) {
    return kvIt(stuff[Symbol.iterator](), fn, acc)
  }
  return kvObj(stuff, fn, acc)
}

function kvObj (obj, fn, acc) {
  var first = true;
  var next = acc
  for (var i in obj) {
    if (has.call(obj, i)) {
     if (first) {
       first = false
       if (typeof next === 'undefined') {
         next = { key: i, value: obj[i] }
         continue
       }
     }
     next = fn(next, { key: i, value: obj[i] })
     if (next instanceof Reduced) return next.val
    }
  }
  return next
}

function kvIt (it, fn, acc) {
  var inserted = 0
  var step = null
  var next = acc
  var first = true
  while (true) {
    step = it.next()
    if (step.done) break;
    if (first) {
      first = false
      if (typeof next === 'undefined') {
        next = { key: '' + inserted++, value: step.value}
        continue
      }
    }
    next = fn(next, { key: '' + inserted++, value: step.value})
    if (next instanceof Reduced) return next.val
  }
  return next
}

function kvMap (map, fn, acc) {
  var step = null
  var next = acc
  var first = true
  var it = map[Symbol.iterator]()
  while (true) {
    step = it.next()
    if (step.done) break;
    if (first) {
      first = false
      if (typeof next === 'undefined') {
        next = { key: step.value[0], value: step.value[1]}
        continue
      }
    }
    next = fn(next, { key: step.value[0], value: step.value[1]})
    if (next instanceof Reduced) return next.val
  }
  return next
}
