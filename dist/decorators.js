"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolymorphicParent = exports.PolymorphicChildren = void 0;
var constants_1 = require("./constants");
var polymorphicPropertyDecorator = function (options) { return function (target, propertyKey) {
    Reflect.defineMetadata(constants_1.POLYMORPHIC_OPTIONS, true, target);
    Reflect.defineMetadata(constants_1.POLYMORPHIC_OPTIONS + "::" + propertyKey, __assign({ propertyKey: propertyKey }, options), target);
}; };
exports.PolymorphicChildren = function (classType, options) {
    if (options === void 0) { options = {}; }
    return polymorphicPropertyDecorator(__assign({ type: 'children', classType: classType, hasMany: true, eager: true, cascade: true, deleteBeforeUpdate: false }, options));
};
exports.PolymorphicParent = function (classType, options) {
    if (options === void 0) { options = {}; }
    return polymorphicPropertyDecorator(__assign({ type: 'parent', classType: classType, hasMany: false, eager: true, cascade: true, deleteBeforeUpdate: false }, options));
};
//# sourceMappingURL=decorators.js.map