"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryNotFoundException = exports.RepositoryTokenNotFoundException = void 0;
var RepositoryTokenNotFoundException = /** @class */ (function (_super) {
    __extends(RepositoryTokenNotFoundException, _super);
    function RepositoryTokenNotFoundException(classType) {
        return _super.call(this, "Repository token cannot be found for given classType [" + classType + "]") || this;
    }
    return RepositoryTokenNotFoundException;
}(Error));
exports.RepositoryTokenNotFoundException = RepositoryTokenNotFoundException;
var RepositoryNotFoundException = /** @class */ (function (_super) {
    __extends(RepositoryNotFoundException, _super);
    function RepositoryNotFoundException(token) {
        return _super.call(this, "Repository cannot be found for given token [" + token + "]") || this;
    }
    return RepositoryNotFoundException;
}(Error));
exports.RepositoryNotFoundException = RepositoryNotFoundException;
//# sourceMappingURL=repository.token.exception.js.map