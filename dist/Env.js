"use strict";
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
exports.__esModule = true;
var Commander_1 = require("./Commander");
var utils_1 = require("./utils");
var Env = /** @class */ (function () {
    function Env(instanceId, requester) {
        this.commander = null;
        this.requester = null;
        this.commander = new Commander_1["default"](instanceId);
        this.requester = requester;
    }
    Env.prototype.step = function (action) {
        return __awaiter(this, void 0, void 0, function () {
            var cmd, strStep;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cmd = this.commander.make('step', { action: action });
                        return [4 /*yield*/, this.requester.request(cmd)];
                    case 1:
                        strStep = _a.sent();
                        return [2 /*return*/, utils_1.toObj(strStep)];
                }
            });
        });
    };
    Env.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cmd, strState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cmd = this.commander.make('reset');
                        return [4 /*yield*/, this.requester.request(cmd)];
                    case 1:
                        strState = _a.sent();
                        return [2 /*return*/, utils_1.toObj(strState)];
                }
            });
        });
    };
    Env.prototype.observation_space = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cmd, strObsSpace;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cmd = this.commander.make('observation_space');
                        return [4 /*yield*/, this.requester.request(cmd)];
                    case 1:
                        strObsSpace = _a.sent();
                        return [2 /*return*/, utils_1.toObj(strObsSpace)];
                }
            });
        });
    };
    Env.prototype.action_space = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cmd, strActSpace;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cmd = this.commander.make('action_space');
                        return [4 /*yield*/, this.requester.request(cmd)];
                    case 1:
                        strActSpace = _a.sent();
                        return [2 /*return*/, utils_1.toObj(strActSpace)];
                }
            });
        });
    };
    Env.prototype.action_sample = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cmd, strAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cmd = this.commander.make('action_sample');
                        return [4 /*yield*/, this.requester.request(cmd)];
                    case 1:
                        strAction = _a.sent();
                        return [2 /*return*/, utils_1.toObj(strAction)];
                }
            });
        });
    };
    Env.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cmd, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cmd = this.commander.make('close');
                        return [4 /*yield*/, this.requester.request(cmd)];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, utils_1.toObj(resp)];
                }
            });
        });
    };
    return Env;
}());
exports["default"] = Env;
