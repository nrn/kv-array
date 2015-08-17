# kv-array

Turn any kind of collection into an array of {key, value} objects. Supports
everything from objects to iterators, and works in any environment.

For Objects or Maps it gives you each own property key and value in the order
they happen to iterate in. For Sets, Maps, Arguments objects, Generators and
Strings the key will the index (or incremental number in the order in which
it's encountered) as a *string*. Anything it can't figure out how to iterate over
becomes an empty array.

This allows you to use all of your normal array techniques to iterate over 
anything that can be seen as a collection.
Eliminates awkward iteration of objects
`Object.keys(obj).map(function (key) { var value = obj[key] })`
and special casing for Map's odd { value: [ key, value] } iteration.
As a library author you don't have to worry about what kind of input your user
gives you to iterate over, you can handle it the same way.

```javascript
  var kvArray = require('kv-array')
```

WARNING: Exhausts all iterables given to it to create finite arrays from them,
given an infinite iterable this will take infinite time, and infinite memory.
Crashing your program. Only for use with finite collections!

## API

### kvArray(item)

Returns an array of {key, value} objects.

