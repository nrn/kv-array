var test = require('tape')
var kv = require('./index.js')

test('kv', function (t) {
  t.same(kv({foo: 'bar'}), [{key: 'foo', value:'bar'}], 'simple object')

  ;(function () {
    t.same(kv(arguments),
      [{key: '0', value:1}
      ,{key: '1', value:2}
      ,{key: '2', value:3}
      ], 'arguments object')
  })(1,2,3)

  function fn () {}
  fn.a = 'a'
  fn.b = 'b'
  t.same(kv(fn),
    [{key: 'a', value:'a'}
    ,{key: 'b', value:'b'}
    ], 'fn properties')

  t.same(kv(null), [], 'null')
  t.same(kv(undefined), [], 'undefined')
  t.same(kv(123), [], 'num')
  t.same(kv('asdf'),
    [{key: '0', value:'a'}
    ,{key: '1', value:'s'}
    ,{key: '2', value:'d'}
    ,{key: '3', value:'f'}
    ], 'string')

  t.same(kv([1,2,3]),
    [{key: '0', value:1}
    ,{key: '1', value:2}
    ,{key: '2', value:3}
    ], 'array')

  if (typeof Symbol === 'function') {
    t.same(kv(new Set([1,2,'a'])),
      [{key: '0', value:1}
      ,{key: '1', value:2}
      ,{key: '2', value:'a'}
      ], 'Set object')

    var map = new Map()
    map.set('a', 1)
    map.set('b', 2)
    t.same(kv(map),
      [{key: 'a', value:1}
      ,{key: 'b', value:2}
      ], 'Map object')

    t.same(kv(map.keys()),
      [{key: '0', value:'a'}
      ,{key: '1', value:'b'}
      ], 'Iterator')
  }

  t.end()
})

