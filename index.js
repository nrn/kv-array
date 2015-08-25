var reduce = require('universal-reduce')

module.exports = kv

function kv (stuff) {
  return reduce(stuff, function (acc, value, key) {
    acc.push({key: key, value: value})
    return acc
  }, [])
}

