'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = prefixNamespace;

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _utils = require('./utils');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prefix(obj, namespace, type) {
  return (0, _keys2.default)(obj).reduce(function (memo, key) {
    (0, _warning2.default)(key.indexOf('' + namespace + _constants.NAMESPACE_SEP) !== 0, '[prefixNamespace]: ' + type + ' ' + key + ' should not be prefixed with namespace ' + namespace);
    var newKey = '' + namespace + _constants.NAMESPACE_SEP + key;
    memo[newKey] = obj[key];
    return memo;
  }, {});
}

function deepClone(target){
  let clone = {};
  if (!target || typeof target !== 'object') {
      return target;
  }
  if (Array.isArray(target)) {
      clone = target.map(item => deepClone(item));
      return clone;
  }
  for (let key in target) {
      if (target.hasOwnProperty(key)) {
          clone[key] = deepClone(target[key]);
      }
  }
  return clone;
};

function prefixNamespace(model) {
  const dvamodel = deepClone(model);
  const {
    namespace,
    reducers,
    effects,
  } = dvamodel;

  if (reducers) {
    if (Array.isArray(reducers)) {
      dvamodel.reducers[0] = prefix(reducers[0], namespace, 'reducer');
    } else {
      dvamodel.reducers = prefix(reducers, namespace, 'reducer');
    }
  }
  if (effects) {
    dvamodel.effects = prefix(effects, namespace, 'effect');
  }
  return dvamodel;
}
module.exports = exports['default'];