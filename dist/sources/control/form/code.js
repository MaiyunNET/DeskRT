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
Object.defineProperty(exports, "__esModule", { value: true });
exports.props = {
    "icon": {
        "default": "",
    },
    "title": {
        "default": "title"
    },
    "min": {
        "default": true
    },
    "max": {
        "default": true
    },
    "close": {
        "default": true
    },
    "stateMax": {
        "default": false
    },
    "stateMin": {
        "default": false
    },
    "focus": {
        "default": false
    },
    "width": {
        "default": 300
    },
    "height": {
        "default": 200
    },
    "left": {
        "default": -1
    },
    "top": {
        "default": -1
    },
    "zIndex": {
        "default": -1
    },
    "minWidth": {
        "default": 200
    },
    "minHeight": {
        "default": 100
    },
    "resize": {
        "default": true
    },
    "border": {
        "default": "normal"
    },
    "background": {
        "default": undefined
    },
    "padding": {
        "default": undefined
    }
};
exports.data = {
    "stateMaxData": false,
    "stateMinData": false,
    "stateAbs": false,
    "iconData": undefined,
    "widthData": 300,
    "heightData": 200,
    "leftData": 0,
    "topData": 0,
    "zIndexData": 0,
    "historyLocation": {
        "width": 0,
        "height": 0,
        "left": 0,
        "top": 0
    },
    "maskFor": undefined,
    "maskFrom": undefined,
    "flashTimer": undefined
};
exports.watch = {
    "icon": {
        handler: function () {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var first, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            first = false;
                            if (this.iconData === undefined) {
                                first = true;
                            }
                            if (!(this.icon === "")) return [3, 1];
                            this.iconData = "";
                            return [3, 3];
                        case 1:
                            _b = this;
                            return [4, this.getDataUrl(this.icon)];
                        case 2:
                            _b.iconData = (_a = _c.sent()) !== null && _a !== void 0 ? _a : "";
                            _c.label = 3;
                        case 3:
                            if (!first) {
                                ClickGo.trigger("formIconChanged", this.taskId, this.formId, { "icon": this.iconData });
                            }
                            return [2];
                    }
                });
            });
        },
        "immediate": true
    },
    "title": function () {
        ClickGo.trigger("formTitleChanged", this.taskId, this.formId, { "title": this.title });
    },
    "stateMin": function () {
        this.minMethod();
    },
    "stateMax": function () {
        this.maxMethod();
    },
    "width": function () {
        this.widthData = parseInt(this.width);
    },
    "height": function () {
        this.heightData = parseInt(this.height);
    },
    "left": function () {
        this.leftData = parseInt(this.left);
    },
    "top": function () {
        this.topData = parseInt(this.top);
    },
    "zIndex": function () {
        this.zIndexData = parseInt(this.zIndex);
    }
};
exports.methods = {
    moveMethod: function (e) {
        var _this = this;
        if (e instanceof MouseEvent && ClickGo.hasTouch) {
            return;
        }
        var el = e.currentTarget;
        var dataHasDbl = el.getAttribute("data-has-dbl");
        if (!dataHasDbl) {
            el.setAttribute("data-has-dbl", "yes");
            el.addEventListener("dblclick", function () {
                if (_this.stateAbs) {
                    _this.maxVMethod(true);
                }
                else {
                    _this.maxMethod();
                }
            });
        }
        var isBorder = "";
        ClickGo.bindMove(e, {
            "start": function (x, y) {
                if (_this.stateMaxData) {
                    _this.$emit("max", event, 0, _this.historyLocation);
                    _this.stateMaxData = false;
                    _this.$emit("update:stateMax", false);
                    var olx = x - _this.leftData;
                    var orx = _this.leftData + _this.widthData - x;
                    var w2 = _this.historyLocation.width / 2;
                    if (olx <= w2) {
                        _this.leftData = x - olx;
                    }
                    else if (orx <= w2) {
                        _this.leftData = x - (_this.historyLocation.width - orx);
                    }
                    else {
                        _this.leftData = x - w2;
                    }
                    _this.$emit("update:left", _this.leftData);
                    var oty = y - _this.topData;
                    var oby = _this.topData + _this.heightData - y;
                    var h2 = _this.historyLocation.height / 2;
                    if (oty <= h2) {
                        _this.topData = y - oty;
                    }
                    else if (oby <= h2) {
                        _this.topData = y - (_this.historyLocation.height - oby);
                    }
                    else {
                        _this.topData = y - h2;
                    }
                    _this.$emit("update:top", _this.topData);
                    _this.widthData = _this.historyLocation.width;
                    _this.$emit("update:width", _this.historyLocation.width);
                    _this.heightData = _this.historyLocation.height;
                    _this.$emit("update:height", _this.historyLocation.height);
                }
                else if (_this.stateAbs) {
                    _this.stateAbs = false;
                    var olx = x - _this.leftData;
                    var orx = _this.leftData + _this.widthData - x;
                    var w2 = _this.historyLocation.width / 2;
                    if (olx <= w2) {
                        _this.leftData = x - olx;
                    }
                    else if (orx <= w2) {
                        _this.leftData = x - (_this.historyLocation.width - orx);
                    }
                    else {
                        _this.leftData = x - w2;
                    }
                    _this.$emit("update:left", _this.leftData);
                    var oty = y - _this.topData;
                    var oby = _this.topData + _this.heightData - y;
                    var h2 = _this.historyLocation.height / 2;
                    if (oty <= h2) {
                        _this.topData = y - oty;
                    }
                    else if (oby <= h2) {
                        _this.topData = y - (_this.historyLocation.height - oby);
                    }
                    else {
                        _this.topData = y - h2;
                    }
                    _this.$emit("update:top", _this.topData);
                    _this.widthData = _this.historyLocation.width;
                    _this.$emit("update:width", _this.historyLocation.width);
                    _this.heightData = _this.historyLocation.height;
                    _this.$emit("update:height", _this.historyLocation.height);
                }
                else if (!_this.stateMinData) {
                    _this.historyLocation = {
                        "width": _this.widthData,
                        "height": _this.heightData,
                        "left": _this.leftData,
                        "top": _this.topData
                    };
                }
            },
            "move": function (ox, oy, x, y, border) {
                _this.leftData += ox;
                _this.$emit("update:left", _this.leftData);
                _this.topData += oy;
                _this.$emit("update:top", _this.topData);
                if (border !== "") {
                    if ((border === "t" && _this.max) || (border !== "t" && _this.resize)) {
                        if (isBorder === "") {
                            isBorder = border;
                            ClickGo.showCircular(x, y);
                            ClickGo.showRectangle(x, y, border);
                        }
                        else {
                            isBorder = border;
                            ClickGo.moveRectangle(border);
                        }
                    }
                    else {
                        if (isBorder !== "") {
                            isBorder = "";
                            ClickGo.hideRectangle();
                        }
                    }
                }
                else {
                    if (isBorder !== "") {
                        isBorder = "";
                        ClickGo.hideRectangle();
                    }
                }
            },
            "end": function () {
                if (isBorder !== "") {
                    if (isBorder === "t") {
                        if (_this.max) {
                            _this.widthData = _this.historyLocation.width;
                            _this.heightData = _this.historyLocation.height;
                            _this.leftData = _this.historyLocation.left;
                            _this.topData = _this.historyLocation.top;
                            _this.maxMethod();
                        }
                    }
                    else {
                        if (_this.resize) {
                            if (_this.stateMinData) {
                                if (!_this.minMethod()) {
                                    ClickGo.hideRectangle();
                                    return;
                                }
                            }
                            _this.stateAbs = true;
                            var pos = ClickGo.getPositionByBorderDir(isBorder);
                            _this.widthData = pos.width;
                            _this.$emit("update:width", _this.widthData);
                            _this.heightData = pos.height;
                            _this.$emit("update:height", _this.heightData);
                            _this.leftData = pos.left;
                            _this.$emit("update:left", _this.leftData);
                            _this.topData = pos.top;
                            _this.$emit("update:top", _this.topData);
                        }
                    }
                    ClickGo.hideRectangle();
                }
            }
        });
    },
    minMethod: function () {
        var event = {
            "go": true,
            preventDefault: function () {
                this.go = false;
            },
            "ds": false,
            disableShape: function () {
                this.ds = false;
            }
        };
        if (this.stateMaxData) {
            if (this.maxMethod() === false) {
                return false;
            }
        }
        if (this.stateAbs) {
            this.stateAbs = false;
            this.widthData = this.historyLocation.width;
            this.heightData = this.historyLocation.height;
            this.leftData = this.historyLocation.left;
            this.$emit("update:left", this.leftData);
            this.topData = this.historyLocation.top;
            this.$emit("update:top", this.topData);
        }
        if (!this.stateMinData) {
            this.$emit("min", event, 1, {});
            if (event.go) {
                this.historyLocation = {
                    "width": this.widthData,
                    "height": this.heightData,
                    "left": this.leftData,
                    "top": this.topData
                };
                this.stateMinData = true;
                this.$emit("update:stateMin", true);
                this.$el.classList.add("cg-state-min");
                if (!event.ds) {
                    this.$el.style.height = "auto";
                    this.heightData = this.$el.offsetHeight;
                    this.$emit("update:height", this.$el.offsetHeight);
                    if (this.border !== "thin") {
                        this.widthData = 200;
                        this.$emit("update:width", 200);
                    }
                    else {
                        this.widthData = 150;
                        this.$emit("update:width", 150);
                    }
                }
            }
            else {
                return false;
            }
        }
        else {
            this.$emit("min", event, 0, this.historyLocation);
            if (event.go) {
                this.stateMinData = false;
                this.$emit("update:stateMin", false);
                this.$el.classList.remove("cg-state-min");
                if (!event.ds) {
                    this.heightData = this.historyLocation.height;
                    this.$emit("update:height", this.historyLocation.height);
                    this.widthData = this.historyLocation.width;
                    this.$emit("update:width", this.historyLocation.width);
                }
            }
            else {
                return false;
            }
        }
        ClickGo.trigger("formStateMinChanged", this.taskId, this.formId, { "state": this.stateMinData });
        return true;
    },
    maxVMethod: function (dbl) {
        if (this.stateAbs) {
            this.stateAbs = false;
            this.topData = this.historyLocation.top;
            this.$emit("update:top", this.topData);
            this.heightData = this.historyLocation.height;
            this.$emit("update:height", this.heightData);
            if (dbl) {
                this.leftData = this.historyLocation.left;
                this.$emit("update:top", this.leftData);
                this.widthData = this.historyLocation.width;
                this.$emit("update:width", this.widthData);
            }
        }
        else {
            this.stateAbs = true;
            this.historyLocation = {
                "width": this.widthData,
                "height": this.heightData,
                "left": this.leftData,
                "top": this.topData
            };
            this.topData = ClickGo.getTop();
            this.$emit("update:top", this.topData);
            this.heightData = ClickGo.getHeight();
            this.$emit("update:height", this.heightData);
        }
    },
    maxMethod: function () {
        if (this.stateMinData) {
            if (this.minMethod() === false) {
                return false;
            }
        }
        var event = {
            "go": true,
            preventDefault: function () {
                this.go = false;
            },
            "ds": false,
            disableShape: function () {
                this.ds = false;
            }
        };
        if (!this.stateMaxData) {
            this.$emit("max", event, 1, {});
            if (event.go) {
                if (this.stateAbs) {
                    this.stateAbs = false;
                }
                else {
                    this.historyLocation = {
                        "width": this.widthData,
                        "height": this.heightData,
                        "left": this.leftData,
                        "top": this.topData
                    };
                }
                this.stateMaxData = true;
                this.$emit("update:stateMax", true);
                if (!event.ds) {
                    this.leftData = ClickGo.getLeft();
                    this.$emit("update:left", this.leftData);
                    this.topData = ClickGo.getTop();
                    this.$emit("update:top", this.topData);
                    this.widthData = ClickGo.getWidth();
                    this.$emit("update:width", this.widthData);
                    this.heightData = ClickGo.getHeight();
                    this.$emit("update:height", this.heightData);
                }
            }
            else {
                return false;
            }
        }
        else {
            this.$emit("max", event, 0, this.historyLocation);
            if (event.go) {
                this.stateMaxData = false;
                this.$emit("update:stateMax", false);
                if (!event.ds) {
                    this.leftData = this.historyLocation.left;
                    this.$emit("update:left", this.historyLocation.left);
                    this.topData = this.historyLocation.top;
                    this.$emit("update:top", this.historyLocation.top);
                    this.widthData = this.historyLocation.width;
                    this.$emit("update:width", this.historyLocation.width);
                    this.heightData = this.historyLocation.height;
                    this.$emit("update:height", this.historyLocation.height);
                }
            }
            else {
                return false;
            }
        }
        ClickGo.trigger("formStateMaxChanged", this.taskId, this.formId, { "state": this.stateMaxData });
        return true;
    },
    closeMethod: function () {
        var event = {
            go: true,
            preventDefault: function () {
                this.go = false;
            }
        };
        this.$emit("close", event);
        if (event.go) {
            ClickGo.removeForm(this.formId);
        }
    },
    resizeMethod: function (e, dir) {
        var _this = this;
        if (e instanceof MouseEvent && ClickGo.hasTouch) {
            return;
        }
        var isBorder = "";
        var top = this.topData;
        var height = this.heightData;
        if (dir !== "l" && dir !== "r") {
            if (this.stateAbs) {
                if (dir === "lt" || dir === "t" || dir === "tr") {
                    height = this.historyLocation.top + this.historyLocation.height;
                }
                else {
                    top = this.historyLocation.top;
                    height = ClickGo.getHeight() - top;
                }
            }
            else {
                this.historyLocation = {
                    "width": this.widthData,
                    "height": this.heightData,
                    "left": this.leftData,
                    "top": this.topData
                };
            }
        }
        ClickGo.bindResize(e, {
            "left": this.leftData,
            "top": top,
            "width": this.widthData,
            "height": height,
            "minWidth": parseInt(this.minWidth),
            "minHeight": parseInt(this.minHeight),
            "dir": dir,
            "start": function () {
                if (dir === "l" || dir === "r") {
                    return;
                }
                if (_this.stateAbs) {
                    _this.stateAbs = false;
                }
            },
            "move": function (left, top, width, height, x, y, border) {
                _this.leftData = left;
                _this.$emit("update:left", left);
                _this.topData = top;
                _this.$emit("update:top", top);
                _this.widthData = width;
                _this.$emit("update:width", width);
                _this.heightData = height;
                _this.$emit("update:height", height);
                if (border !== "") {
                    if (((dir === "lt" || dir === "t" || dir === "tr") && (border === "lt" || border === "t" || border === "tr")) ||
                        ((dir === "bl" || dir === "b" || dir === "rb") && (border === "bl" || border === "b" || border === "rb"))) {
                        if (isBorder === "") {
                            isBorder = border;
                            ClickGo.showCircular(x, y);
                            ClickGo.showRectangle(x, y, {
                                "left": left,
                                "width": width
                            });
                        }
                        else {
                            isBorder = border;
                            ClickGo.moveRectangle({
                                "left": left,
                                "width": width
                            });
                        }
                    }
                    else {
                        if (isBorder !== "") {
                            isBorder = "";
                            ClickGo.hideRectangle();
                        }
                    }
                }
                else {
                    if (isBorder !== "") {
                        isBorder = "";
                        ClickGo.hideRectangle();
                    }
                }
            },
            "end": function () {
                if (isBorder !== "") {
                    if (isBorder !== "l" && isBorder !== "r") {
                        _this.stateAbs = true;
                        _this.heightData = ClickGo.getHeight();
                        _this.$emit("update:height", _this.heightData);
                        _this.topData = ClickGo.getTop();
                        _this.$emit("update:top", _this.topData);
                    }
                    ClickGo.hideRectangle();
                }
            }
        });
    },
    maskDown: function (e) {
        if (e instanceof MouseEvent && ClickGo.hasTouch) {
            return;
        }
        if (typeof this.maskFor !== "number") {
            return;
        }
        if (!ClickGo.taskList[this.taskId].formList[this.maskFor]) {
            return;
        }
        e.stopPropagation();
        ClickGo.taskList[this.taskId].formList[this.maskFor].vue.flash();
    },
    setPropData: function (name, val, mode) {
        if (mode === void 0) { mode = ""; }
        if (this[name + "Data"] === undefined || this[name] === undefined) {
            return;
        }
        if (mode === "") {
            this[name + "Data"] = val;
        }
        else if (mode === "+") {
            this[name + "Data"] += val;
        }
        else {
            this[name + "Data"] -= val;
        }
        this.$emit("update:" + name, this[name + "Data"]);
    }
};
exports.mounted = function () {
    this.widthData = parseInt(this.width);
    this.heightData = parseInt(this.height);
    this.zIndexData = parseInt(this.zIndex);
    var stateMax = (typeof this.stateMax === "string") ? ((this.stateMax === "true") ? true : false) : this.stateMax;
    if (stateMax) {
        this.leftData = (ClickGo.getWidth() - this.widthData) / 2;
        this.topData = (ClickGo.getHeight() - this.heightData) / 2;
        this.maxMethod();
    }
};
