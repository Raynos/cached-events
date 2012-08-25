var EventEmitter = require("events").EventEmitter
    , slice = Array.prototype.slice

module.exports = CachedEmitter

function CachedEmitter() {
    var ee = new EventEmitter()
        , _on = ee.on
        , _once = ee.once
        , _emit = ee.emit
        , cache = {}

    ee.on = on
    ee.addListener = on
    ee.once = once
    ee.emit = emit

    return ee

    function on(event, listener) {
        if (cache[event]) {
            listener.apply(ee, cache[event])
        }
        _on.apply(ee, arguments)
    }

    function once(event, listener) {
        if (cache[event]) {
            listener.apply(ee, cache[event])
        } else {
            _once.apply(ee, arguments)
        }
    }

    function emit(event) {
        var rest = slice.call(arguments, 1)

        cache[event] = rest

        _emit.apply(ee, arguments)
    }
}