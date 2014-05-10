node-fidonet-outbound-lbox
=========================

[![Build Status](https://travis-ci.org/askovpen/node-fidonet-outbound-lbox.svg?branch=master)](https://travis-ci.org/askovpen/node-fidonet-outbound-lbox)

The **Fidonet Outbound LBOX parser** module is able to read LBOX Outbound

[![(npm package version)](https://nodei.co/npm/fidonet-outbound-lbox.png?downloads=true)](https://npmjs.org/package/fidonet-outbound-lbox)

## Using Fidonet Squish

When you `require()` the installed module, you get a constructor that uses the path to a Squish echo base as its parameter:

```js
var LBOX=require('fidonet-outbound-lbox');
var lbox=LBOX(path);
```

### read(callback)

Async read LBOX

### (object) files

object with files and address

