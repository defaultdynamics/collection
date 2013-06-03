
/**
 * Module dependencies.
 */

var Emitter = require('emitter')
  , Enumerable = require('enumerable');

/**
 * Expose `Collection`.
 */

module.exports = Collection;

/**
 * Initialize a new collection with the given `models`.
 *
 * @param {Array} models
 * @api public
 */

function Collection(models) {
  this.models = models || [];
}

/**
 * Mixin emitter.
 */

Emitter(Collection.prototype);

/**
 * Mixin enumerable.
 */

Enumerable(Collection.prototype);

/**
 * Iterator implementation.
 */

Collection.prototype.__iterate__ = function(){
  var self = this;
  return {
    length: function(){ return self.length() },
    get: function(i){ return self.models[i] }
  }
};

/**
 * Return the collection length.
 *
 * @return {Number}
 * @api public
 */

Collection.prototype.length = function(){
  return this.models.length;
};

/**
 * Add `model` to the collection and return the index.
 *
 * @param {Object} model
 * @return {Number}
 * @api public
 */

Collection.prototype.add =
Collection.prototype.push = function(model){
  var length = this.models.push(model);
  this.emit('add', model);
  return length;
};

/**
 * Remove `model` from the collection.
 *
 * @param {Object} model
 * @api public
 */

Collection.prototype.remove = function(model){
  var i = this.indexOf(model);
  if (~i) {
    this.models.splice(i, 1);
    this.emit('remove', model);
  }
  return !! ~i;
};
