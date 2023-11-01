const Maybe = function(val) {
    this.__value = val
}

Maybe.prototype.of = function(val) { return new Maybe(val) }
// const maybe = Maybe.prototype.of.call(val)

Maybe.prototype.isNothing = function() {
    return (this.__value === null || this.__value === undefined)
}

export default Maybe