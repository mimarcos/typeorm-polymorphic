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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractPolymorphicRepository = void 0;
var typeorm_1 = require("typeorm");
var constants_1 = require("./constants");
var repository_token_exception_1 = require("./repository.token.exception");
var entityTypeColumn = function (options) {
    return options.entityTypeColumn || 'entityType';
};
var entityIdColumn = function (options) {
    return options.entityTypeId || 'entityId';
};
var PrimaryColumn = function (options) {
    return options.primaryColumn || 'id';
};
var AbstractPolymorphicRepository = /** @class */ (function (_super) {
    __extends(AbstractPolymorphicRepository, _super);
    function AbstractPolymorphicRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractPolymorphicRepository.prototype.getPolymorphicMetadata = function () {
        var _this = this;
        var keys = Reflect.getMetadataKeys(this.metadata.target['prototype']);
        if (!Array.isArray(keys)) {
            return [];
        }
        keys = keys.filter(function (key) {
            var parts = key.split('::');
            return parts[0] === constants_1.POLYMORPHIC_OPTIONS;
        });
        if (!keys) {
            return [];
        }
        return keys
            .map(function (key) {
            var data = Reflect.getMetadata(key, _this.metadata.target['prototype']);
            if (typeof data === 'object') {
                var classType = data.classType();
                return __assign(__assign({}, data), { classType: classType });
            }
        })
            .filter(function (val) { return typeof val !== 'undefined'; });
    };
    AbstractPolymorphicRepository.prototype.isPolymorph = function () {
        return Reflect.hasOwnMetadata(constants_1.POLYMORPHIC_OPTIONS, this.metadata.target['prototype']);
    };
    AbstractPolymorphicRepository.prototype.isChildren = function (options) {
        return options.type === 'children';
    };
    AbstractPolymorphicRepository.prototype.isParent = function (options) {
        return options.type === 'parent';
    };
    AbstractPolymorphicRepository.prototype.hydrateMany = function (entities) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(entities.map(function (ent) { return _this.hydrateOne(ent); }))];
            });
        });
    };
    AbstractPolymorphicRepository.prototype.hydrateOne = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            var metadata;
            return __generator(this, function (_a) {
                metadata = this.getPolymorphicMetadata();
                return [2 /*return*/, this.hydratePolymorphs(entity, metadata)];
            });
        });
    };
    AbstractPolymorphicRepository.prototype.hydratePolymorphs = function (entity, options) {
        return __awaiter(this, void 0, void 0, function () {
            var values;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(options.map(function (option) {
                            return _this.hydrateEntities(entity, option);
                        }))];
                    case 1:
                        values = _a.sent();
                        return [2 /*return*/, values.reduce(function (e, vals) {
                                var values = vals.type === 'parent' && Array.isArray(vals.values)
                                    ? vals.values.filter(function (v) { return typeof v !== 'undefined' && v !== null; })
                                    : vals.values;
                                e[vals.key] =
                                    vals.type === 'parent' && Array.isArray(values) ? values[0] : values; // TODO should be condition for !hasMany
                                return e;
                            }, entity)];
                }
            });
        });
    };
    AbstractPolymorphicRepository.prototype.hydrateEntities = function (entity, options) {
        return __awaiter(this, void 0, void 0, function () {
            var entityTypes, results;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entityTypes = options.type === 'parent'
                            ? [entity[entityTypeColumn(options)]]
                            : Array.isArray(options.classType)
                                ? options.classType
                                : [options.classType];
                        return [4 /*yield*/, Promise.all(entityTypes.map(function (type) {
                                return _this.findPolymorphs(entity, type, options);
                            }))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, {
                                key: options.propertyKey,
                                type: options.type,
                                values: (options.hasMany &&
                                    Array.isArray(results) &&
                                    results.length > 0 &&
                                    Array.isArray(results[0])
                                    ? results.reduce(function (resultEntities, entities) { return entities.concat.apply(entities, resultEntities); }, results)
                                    : results),
                            }];
                }
            });
        });
    };
    AbstractPolymorphicRepository.prototype.findPolymorphs = function (parent, entityType, options) {
        return __awaiter(this, void 0, void 0, function () {
            var repository;
            var _a;
            return __generator(this, function (_b) {
                repository = this.findRepository(entityType);
                return [2 /*return*/, repository[options.hasMany ? 'find' : 'findOne'](options.type === 'parent'
                        ? {
                            where: {
                                id: parent[entityIdColumn(options)],
                            },
                        }
                        : {
                            where: (_a = {},
                                _a[entityIdColumn(options)] = parent[PrimaryColumn(options)],
                                _a[entityTypeColumn(options)] = entityType,
                                _a),
                        })];
            });
        });
    };
    AbstractPolymorphicRepository.prototype.savePolymorhic = function (entity, options) {
        return __awaiter(this, void 0, void 0, function () {
            var entities;
            var _this = this;
            return __generator(this, function (_a) {
                entities = entity[options.propertyKey];
                if (!entities) {
                    return [2 /*return*/, undefined];
                }
                if (Array.isArray(entities)) {
                    return [2 /*return*/, Promise.all(entities.map(function (polymorph) {
                            polymorph[entityIdColumn(options)] = entity[entityIdColumn(options)];
                            polymorph[entityTypeColumn(options)] = _this.metadata.targetName;
                            return _this.manager.save(polymorph);
                        }))];
                }
                else {
                    entities[entityIdColumn(options)] = entity[entityIdColumn(options)];
                    entities[entityTypeColumn(options)] = this.metadata.targetName;
                    return [2 /*return*/, this.manager.save(entities)];
                }
                return [2 /*return*/];
            });
        });
    };
    AbstractPolymorphicRepository.prototype.savePolymorphs = function (entity, options) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(options.map(function (options) {
                            return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, _b;
                                var _c;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            if (!options.cascade) return [3 /*break*/, 2];
                                            _b = resolve;
                                            _c = {
                                                key: options.propertyKey
                                            };
                                            return [4 /*yield*/, this.savePolymorhic(entity, options)];
                                        case 1:
                                            _a = _b.apply(void 0, [(_c.entities = _d.sent(),
                                                    _c)]);
                                            return [3 /*break*/, 3];
                                        case 2:
                                            _a = resolve(undefined);
                                            _d.label = 3;
                                        case 3: return [2 /*return*/, _a];
                                    }
                                });
                            }); });
                        }))];
                    case 1:
                        results = _a.sent();
                        results.forEach(function (result) {
                            if (!result) {
                                return;
                            }
                            entity[result.key] = result.entities;
                        });
                        return [2 /*return*/, entity];
                }
            });
        });
    };
    AbstractPolymorphicRepository.prototype.deletePolymorphs = function (entity, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(options.map(function (option) {
                            return new Promise(function (resolve) {
                                if (!option.deleteBeforeUpdate) {
                                    return Promise.resolve();
                                }
                                var entityTypes = Array.isArray(option.classType)
                                    ? option.classType
                                    : [option.classType];
                                resolve(Promise.all(entityTypes.map(function (type) {
                                    var _a;
                                    var repository = _this.findRepository(type);
                                    repository.delete((_a = {},
                                        _a[entityTypeColumn(option)] = type,
                                        _a[entityIdColumn(option)] = entity[PrimaryColumn(option)],
                                        _a));
                                })));
                            });
                        }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AbstractPolymorphicRepository.prototype.findRepository = function (entityType) {
        var repositoryToken = this.resolveRepositoryToken(entityType);
        var repository = repositoryToken !== entityType
            ? this.manager.getCustomRepository(repositoryToken)
            : this.manager.getRepository(repositoryToken);
        if (!repository) {
            throw new repository_token_exception_1.RepositoryNotFoundException(repositoryToken);
        }
        return repository;
    };
    AbstractPolymorphicRepository.prototype.resolveRepositoryToken = function (token) {
        var tokens = typeorm_1.getMetadataArgsStorage().entityRepositories.filter(function (value) { return value.entity === token; });
        return tokens[0] ? tokens[0].target : token;
    };
    AbstractPolymorphicRepository.prototype.save = function (entityOrEntities, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, metadata, savedEntities, _d, _e, _f;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!!this.isPolymorph()) return [3 /*break*/, 11];
                        if (!(Array.isArray(entityOrEntities) && options)) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.save.call(this, entityOrEntities, options)];
                    case 1:
                        _a = _g.sent();
                        return [3 /*break*/, 10];
                    case 2:
                        if (!Array.isArray(entityOrEntities)) return [3 /*break*/, 4];
                        return [4 /*yield*/, _super.prototype.save.call(this, entityOrEntities)];
                    case 3:
                        _b = _g.sent();
                        return [3 /*break*/, 9];
                    case 4:
                        if (!options) return [3 /*break*/, 6];
                        return [4 /*yield*/, _super.prototype.save.call(this, entityOrEntities, options)];
                    case 5:
                        _c = _g.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, _super.prototype.save.call(this, entityOrEntities)];
                    case 7:
                        _c = _g.sent();
                        _g.label = 8;
                    case 8:
                        _b = _c;
                        _g.label = 9;
                    case 9:
                        _a = _b;
                        _g.label = 10;
                    case 10: return [2 /*return*/, _a];
                    case 11:
                        metadata = this.getPolymorphicMetadata();
                        // TODO find if it has a parent metadata
                        // TODO set the columns
                        metadata.map(function (options) {
                            if (_this.isParent(options)) {
                                (Array.isArray(entityOrEntities)
                                    ? entityOrEntities
                                    : [entityOrEntities]).map(function (entity) {
                                    var parent = entity[options.propertyKey];
                                    if (!parent || entity[entityIdColumn(options)] !== undefined) {
                                        return entity;
                                    }
                                    entity[entityIdColumn(options)] = parent[PrimaryColumn(options)];
                                    entity[entityTypeColumn(options)] = parent.constructor.name;
                                    return entity;
                                });
                            }
                        });
                        if (!(Array.isArray(entityOrEntities) && options)) return [3 /*break*/, 13];
                        return [4 /*yield*/, _super.prototype.save.call(this, entityOrEntities, options)];
                    case 12:
                        _d = _g.sent();
                        return [3 /*break*/, 21];
                    case 13:
                        if (!Array.isArray(entityOrEntities)) return [3 /*break*/, 15];
                        return [4 /*yield*/, _super.prototype.save.call(this, entityOrEntities)];
                    case 14:
                        _e = _g.sent();
                        return [3 /*break*/, 20];
                    case 15:
                        if (!options) return [3 /*break*/, 17];
                        return [4 /*yield*/, _super.prototype.save.call(this, entityOrEntities, options)];
                    case 16:
                        _f = _g.sent();
                        return [3 /*break*/, 19];
                    case 17: return [4 /*yield*/, _super.prototype.save.call(this, entityOrEntities)];
                    case 18:
                        _f = _g.sent();
                        _g.label = 19;
                    case 19:
                        _e = _f;
                        _g.label = 20;
                    case 20:
                        _d = _e;
                        _g.label = 21;
                    case 21:
                        savedEntities = _d;
                        return [2 /*return*/, savedEntities];
                }
            });
        });
    };
    AbstractPolymorphicRepository.prototype.find = function (optionsOrConditions) {
        return __awaiter(this, void 0, void 0, function () {
            var results, metadata;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.find.call(this, optionsOrConditions)];
                    case 1:
                        results = _a.sent();
                        if (!this.isPolymorph()) {
                            return [2 /*return*/, results];
                        }
                        metadata = this.getPolymorphicMetadata();
                        return [2 /*return*/, Promise.all(results.map(function (entity) { return _this.hydratePolymorphs(entity, metadata); }))];
                }
            });
        });
    };
    AbstractPolymorphicRepository.prototype.findOne = function (idOrOptionsOrConditions, optionsOrConditions) {
        return __awaiter(this, void 0, void 0, function () {
            var polymorphicMetadata, entity, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        polymorphicMetadata = this.getPolymorphicMetadata();
                        if (Object.keys(polymorphicMetadata).length === 0) {
                            return [2 /*return*/, idOrOptionsOrConditions &&
                                    (typeof idOrOptionsOrConditions === 'string' ||
                                        typeof idOrOptionsOrConditions === 'number' ||
                                        typeof idOrOptionsOrConditions === 'object') &&
                                    optionsOrConditions
                                    ? _super.prototype.findOne.call(this, idOrOptionsOrConditions, optionsOrConditions)
                                    : _super.prototype.findOne.call(this, idOrOptionsOrConditions)];
                        }
                        if (!(idOrOptionsOrConditions &&
                            (typeof idOrOptionsOrConditions === 'string' ||
                                typeof idOrOptionsOrConditions === 'number' ||
                                typeof idOrOptionsOrConditions === 'object') &&
                            optionsOrConditions)) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.findOne.call(this, idOrOptionsOrConditions, optionsOrConditions)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, _super.prototype.findOne.call(this, idOrOptionsOrConditions)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        entity = _a;
                        if (!entity) {
                            return [2 /*return*/, entity];
                        }
                        return [2 /*return*/, this.hydratePolymorphs(entity, polymorphicMetadata)];
                }
            });
        });
    };
    AbstractPolymorphicRepository.prototype.create = function (plainEntityLikeOrPlainEntityLikes) {
        var metadata = this.getPolymorphicMetadata();
        var entity = _super.prototype.create.call(this, plainEntityLikeOrPlainEntityLikes);
        if (!metadata) {
            return entity;
        }
        metadata.forEach(function (value) {
            entity[value.propertyKey] =
                plainEntityLikeOrPlainEntityLikes[value.propertyKey];
        });
        return entity;
    };
    return AbstractPolymorphicRepository;
}(typeorm_1.Repository));
exports.AbstractPolymorphicRepository = AbstractPolymorphicRepository;
//# sourceMappingURL=polymorphic.repository.js.map