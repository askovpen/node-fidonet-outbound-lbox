node-fidonet-outbound-lbox
=========================

[![Build Status](https://travis-ci.org/askovpen/node-fidonet-outbound-lbox.svg?branch=master)](https://travis-ci.org/askovpen/node-fidonet-outbound-lbox)

The **Fidonet Outbound LBOX parser** module is able to read LBOX Outbound

[![(npm package version)](https://nodei.co/npm/fidonet-outbound-lbox.png?downloads=true)](https://npmjs.org/package/fidonet-outbound-lbox)

## Using Fidonet Outbound LBOX parser

When you `require()` the installed module, you get a constructor that uses the path to an LBOX as its parameter:

```js
var LBOX=require('fidonet-outbound-lbox');
var lbox=LBOX(path);
```

The construncted object has the following method:

### read(callback)

Asynchronously reads LBOX and populates the object's `.files` property.

That property is also an object where each key corresponds to a Fidonet address and its value is an array of objects describing indivudual files.

Each object describing a file has at least the following properties:

* `file` — the file's name

* `size` — the file's size (in bytes)

* `type` — the string `'lbox'` to identify the origin's type
