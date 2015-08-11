# kv-array

Turn any collection into an array of {key, value} objects.

This is still a WIP. Works for Arrays, Objects, Maps, and Sets. Details
of what a 'key' means, and how to handle other iterators still up in
the air.

```javascript
  var kvArray = require('kv-array')
```

## API

### kvArray(item)

Returns an array of {key, value} objects.
