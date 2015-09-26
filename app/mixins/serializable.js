import ember from 'ember';
var Serializable;

Serializable = Ember.Mixin.create({
  serialize() {
    var key, result;
    result = {};
    for (key in $.extend(true, {}, this)) {
      if (key === 'isInstance' || key === 'isDestroyed' || key === 'isDestroying' || key === 'concatenatedProperties' || typeof this[key] === 'function') {
        continue;
      }
      result[key] = this[key];
    }
    return result;
  }
});

export default Serializable;
