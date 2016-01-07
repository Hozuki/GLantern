(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/25.
 */
var WebGLRenderer_1 = require("./webgl/WebGLRenderer");
var Stage_1 = require("./flash/display/Stage");
var _util_1 = require("./_util/_util");
var FlashEvent_1 = require("./flash/events/FlashEvent");
var GLantern = (function () {
    function GLantern() {
        this._isRunning = false;
        this._renderer = null;
        this._stage = null;
        this._isInitialized = false;
        this._attachedUpdateFunction = null;
    }
    GLantern.prototype.initialize = function (width, height, options) {
        if (options === void 0) { options = WebGLRenderer_1.WebGLRenderer.DEFAULT_OPTIONS; }
        if (this._isInitialized) {
            return;
        }
        this._renderer = new WebGLRenderer_1.WebGLRenderer(width, height, options);
        this._stage = new Stage_1.Stage(this._renderer);
        this._isInitialized = true;
    };
    GLantern.prototype.dispose = function () {
        if (!this._isInitialized) {
            return;
        }
        this._stage.dispose();
        this._renderer.dispose();
        this._stage = null;
        this._renderer = null;
        this._isInitialized = false;
    };
    GLantern.prototype.startAnimation = function () {
        if (!this._isInitialized) {
            return;
        }
        this._isRunning = true;
        _util_1._util.requestAnimationFrame(this.__mainLoop.bind(this));
    };
    GLantern.prototype.stopAnimation = function () {
        if (!this._isInitialized) {
            return;
        }
        this._isRunning = false;
    };
    GLantern.prototype.clear = function () {
        this._renderer.clear();
    };
    GLantern.prototype.runOneFrame = function () {
        if (!this._isInitialized) {
            return;
        }
        this._stage.dispatchEvent(FlashEvent_1.FlashEvent.create(FlashEvent_1.FlashEvent.ENTER_FRAME));
        if (this._attachedUpdateFunction !== null && this._attachedUpdateFunction instanceof Function) {
            this._attachedUpdateFunction();
        }
        this._stage.update();
        this._stage.render(this._renderer);
        this._renderer.present();
    };
    Object.defineProperty(GLantern.prototype, "stage", {
        get: function () {
            return this._stage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLantern.prototype, "renderer", {
        get: function () {
            return this._renderer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLantern.prototype, "view", {
        get: function () {
            return this._isInitialized ? this._renderer.view : null;
        },
        enumerable: true,
        configurable: true
    });
    GLantern.prototype.attachUpdateFunction = function (func) {
        this._attachedUpdateFunction = func;
    };
    GLantern.prototype.__mainLoop = function (time) {
        if (!this._isRunning || !this._isInitialized) {
            return;
        }
        this.runOneFrame();
        _util_1._util.requestAnimationFrame(this.__mainLoop.bind(this));
    };
    return GLantern;
})();
exports.GLantern = GLantern;



},{"./_util/_util":5,"./flash/display/Stage":45,"./flash/events/FlashEvent":53,"./webgl/WebGLRenderer":101}],2:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var ApplicationError = (function () {
    function ApplicationError(message) {
        if (message === void 0) { message = ""; }
        this._message = null;
        this._message = message;
    }
    Object.defineProperty(ApplicationError.prototype, "message", {
        get: function () {
            return this._message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationError.prototype, "name", {
        get: function () {
            return "ApplicationError";
        },
        enumerable: true,
        configurable: true
    });
    return ApplicationError;
})();
exports.ApplicationError = ApplicationError;



},{}],3:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ApplicationError_1 = require("./ApplicationError");
var ArgumentError = (function (_super) {
    __extends(ArgumentError, _super);
    function ArgumentError(message, argument) {
        if (message === void 0) { message = "Argument error"; }
        if (argument === void 0) { argument = null; }
        _super.call(this, message);
        this._argument = null;
        this._argument = argument;
    }
    Object.defineProperty(ArgumentError.prototype, "argument", {
        get: function () {
            return this._argument;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ArgumentError.prototype, "name", {
        get: function () {
            return "ArgumentError";
        },
        enumerable: true,
        configurable: true
    });
    return ArgumentError;
})(ApplicationError_1.ApplicationError);
exports.ArgumentError = ArgumentError;



},{"./ApplicationError":2}],4:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ApplicationError_1 = require("./ApplicationError");
var NotImplementedError = (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError(message) {
        if (message === void 0) { message = "Not implemented"; }
        _super.call(this, message);
    }
    Object.defineProperty(NotImplementedError.prototype, "name", {
        get: function () {
            return "NotImplementedError";
        },
        enumerable: true,
        configurable: true
    });
    return NotImplementedError;
})(ApplicationError_1.ApplicationError);
exports.NotImplementedError = NotImplementedError;



},{"./ApplicationError":2}],5:[function(require,module,exports){
(function (global){
/**
 * Created by MIC on 2015/11/17.
 */
var $global = global || window;
/**
 * The class providing utility functions.
 */
var _util = (function () {
    function _util() {
    }
    /**
     * Check whether a value is {@link undefined} or {@link null}.
     * @param value {*} The value to check.
     * @returns {Boolean} True if the value is {@link undefined} or {@link null}, and false otherwise.
     */
    _util.isUndefinedOrNull = function (value) {
        return value === undefined || value === null;
    };
    /**
     * Check whether a value is {@link undefined}.
     * @param value {*} The value to check.
     * @returns {Boolean} True if the value is {@link undefined}, and false otherwise.
     */
    _util.isUndefined = function (value) {
        return value === undefined;
    };
    /**
     * Limit a number inside a range specified by min and max (both are reachable).
     * @param v {Number} The number to limit.
     * @param min {Number} The lower bound. Numbers strictly less than this bound will be set to the value.
     * @param max {Number} The upper bound. Numbers strictly greater than this bound will be set to this value.
     * @returns {Number} The limited value. If the original number is inside the specified range, it will not be
     * altered. Otherwise, it will be either min or max.
     */
    _util.limitInto = function (v, min, max) {
        v < min && (v = min);
        v > max && (v = max);
        return v;
    };
    /**
     * Check whether a number is inside a range specified min a max (both are unreachable).
     * @param v {Number} The number to check.
     * @param min {Number} The lower bound.
     * @param max {Number} The upper bound.
     * @returns {Boolean} True if the number to check is strictly greater than min and strictly less than max, and
     * false otherwise.
     */
    _util.isValueBetweenNotEquals = function (v, min, max) {
        return min < v && v < max;
    };
    /**
     * Generate a string based on the template, and provided values. This function acts similarly to the String.Format()
     * function in CLR.
     * @param format {String} The template string.
     * @param replaceWithArray {*[]} The value array to provide values for formatting.
     * @example
     * var person = { name: "John Doe", age: 20 };
     * console.log(_util.formatString("{0}'s age is {1}.", person.name, person.age);
     * @returns {String} The generated string, with valid placeholders replaced by values matched.
     */
    _util.formatString = function (format) {
        var replaceWithArray = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            replaceWithArray[_i - 1] = arguments[_i];
        }
        var replaceWithArrayIsNull = _util.isUndefinedOrNull(replaceWithArray);
        var replaceWithArrayLength = replaceWithArrayIsNull ? -1 : replaceWithArray.length;
        function __stringFormatter(matched) {
            var indexString = matched.substring(1, matched.length - 1);
            var indexValue = parseInt(indexString);
            if (!replaceWithArrayIsNull && (0 <= indexValue && indexValue < replaceWithArrayLength)) {
                if (replaceWithArray[indexValue] === undefined) {
                    return "undefined";
                }
                else if (replaceWithArray[indexValue] === null) {
                    return "null";
                }
                else {
                    return replaceWithArray[indexValue].toString();
                }
            }
            else {
                return matched;
            }
        }
        var regex = /{[\d]+}/g;
        return format.replace(regex, __stringFormatter);
    };
    /**
     * Deeply clones an object. The cloned object has the exactly same values but no connection with the original one.
     * @param sourceObject {*} The object to be cloned.
     * @returns {*} The copy of original object.
     */
    _util.deepClone = function (sourceObject) {
        if (sourceObject === undefined || sourceObject === null || sourceObject === true || sourceObject === false) {
            return sourceObject;
        }
        if (typeof sourceObject === "string" || typeof sourceObject === "number") {
            return sourceObject;
        }
        /* Arrays */
        if (Array.isArray(sourceObject)) {
            var tmpArray = [];
            for (var i = 0; i < sourceObject.length; ++i) {
                tmpArray.push(_util.deepClone(sourceObject[i]));
            }
            return tmpArray;
        }
        /* ES6 classes. Chrome has implemented a part of them so they must be considered. */
        if ($global.Map !== undefined && sourceObject instanceof Map) {
            var newMap = new Map();
            sourceObject.forEach(function (v, k) {
                newMap.set(k, v);
            });
            return newMap;
        }
        if ($global.Set !== undefined && sourceObject instanceof Set) {
            var newSet = new Set();
            sourceObject.forEach(function (v) {
                newSet.add(v);
            });
            return newSet;
        }
        /* Classic ES5 functions. */
        if (sourceObject instanceof Function || typeof sourceObject === "function") {
            var fn = (function () {
                return function () {
                    return sourceObject.apply(this, arguments);
                };
            })();
            fn.prototype = sourceObject.prototype;
            for (var key in sourceObject) {
                if (sourceObject.hasOwnProperty(key)) {
                    fn[key] = sourceObject[key];
                }
            }
            return fn;
        }
        /* Classic ES5 objects. */
        if (sourceObject instanceof Object || typeof sourceObject === "object") {
            var newObject = Object.create(null);
            for (var key in sourceObject) {
                if (sourceObject.hasOwnProperty(key)) {
                    newObject[key] = _util.deepClone(sourceObject[key]);
                }
            }
            return newObject;
        }
        return undefined;
    };
    /**
     * Test whether a positive number is a power of 2.
     * @param positiveNumber {Number} The positive number to test.
     * @returns {Boolean} True if the number is a power of 2, and false otherwise.
     */
    _util.isPowerOfTwo = function (positiveNumber) {
        var num = positiveNumber | 0;
        if (num != positiveNumber || isNaN(num) || !isFinite(num)) {
            return false;
        }
        else {
            return num > 0 && (num & (num - 1)) === 0;
        }
    };
    /**
     * Calculate the smallest power of 2 which is greater than or equals the given positive number.
     * @param positiveNumber {Number} The positive number as the basis.
     * @returns {Number} The smallest power of 2 which is greater than or equals the given positive number
     */
    _util.power2Roundup = function (positiveNumber) {
        if (positiveNumber < 0)
            return 0;
        --positiveNumber;
        positiveNumber |= positiveNumber >>> 1;
        positiveNumber |= positiveNumber >>> 2;
        positiveNumber |= positiveNumber >>> 4;
        positiveNumber |= positiveNumber >>> 8;
        positiveNumber |= positiveNumber >>> 16;
        return positiveNumber + 1;
    };
    /**
     * Prints out a message with a stack trace.
     * @param message {String} The message to print.
     * @param [extra] {*} Extra information.
     */
    _util.trace = function (message, extra) {
        if (extra !== undefined) {
            console.info(message, extra);
        }
        else {
            console.info(message);
        }
        console.trace();
    };
    _util.requestAnimationFrame = function (f) {
        return window.requestAnimationFrame(f);
    };
    _util.cancelAnimationFrame = function (handle) {
        window.cancelAnimationFrame(handle);
    };
    _util.colorToCssSharp = function (color) {
        color |= 0;
        return "#" + _util.padLeft(color.toString(16), 6, "0");
    };
    _util.colorToCssRgba = function (color) {
        color |= 0;
        var a = (color >> 24) & 0xff;
        var r = (color >> 16) & 0xff;
        var g = (color >> 8) & 0xff;
        var b = color & 0xff;
        return "rgba(" + [r, g, b, a].join(",") + ")";
    };
    _util.padLeft = function (str, targetLength, padWith) {
        while (str.length < targetLength) {
            str = padWith + str;
        }
        if (str.length > targetLength) {
            str = str.substring(str.length - targetLength, str.length - 1);
        }
        return str;
    };
    return _util;
})();
exports._util = _util;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],6:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./_util"));
__export(require("./ApplicationError"));
__export(require("./ArgumentError"));
__export(require("./NotImplementedError"));



},{"./ApplicationError":2,"./ArgumentError":3,"./NotImplementedError":4,"./_util":5}],7:[function(require,module,exports){
(function (global){
/**
 * Created by MIC on 2015/12/4.
 */
/*
 Prepare to run in browsers.
 In browsers, we must find the "window" object as global object in highest priority,
 instead of Node's "global" object.
 */
(function ($global) {
    ($global).GLantern = require("./index");
})(window || self || global || {});



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./index":84}],8:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
var transitions = require("./transitions/index");
exports.transitions = transitions;



},{"./transitions/index":25}],9:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcher_1 = require("../../flash/events/EventDispatcher");
var NotImplementedError_1 = require("../../_util/NotImplementedError");
var Tween = (function (_super) {
    __extends(Tween, _super);
    function Tween(obj, prop, func, begin, finish, duration, useSeconds) {
        if (useSeconds === void 0) { useSeconds = false; }
        _super.call(this);
        this.begin = NaN;
        this.duration = 5;
        this.finish = 5;
        this.FPS = 60;
        this.func = null;
        this.isPlaying = false;
        this.looping = false;
        this.obj = null;
        this.position = 0;
        this.prop = null;
        this.time = 0;
        this.useSeconds = false;
        this.obj = obj;
        this.prop = prop;
        this.func = func;
        this.begin = begin;
        this.finish = finish;
        this.duration = duration;
        this.useSeconds = useSeconds;
    }
    Tween.prototype.continueTo = function (finish, duration) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.fforward = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.nextFrame = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.prevFrame = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.resume = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.rewind = function (t) {
        if (t === void 0) { t = 0; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.start = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.stop = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Tween.prototype.yoyo = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    return Tween;
})(EventDispatcher_1.EventDispatcher);
exports.Tween = Tween;



},{"../../_util/NotImplementedError":4,"../../flash/events/EventDispatcher":52}],10:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FlashEvent_1 = require("../../flash/events/FlashEvent");
var NotImplementedError_1 = require("../../_util/NotImplementedError");
var TweenEvent = (function (_super) {
    __extends(TweenEvent, _super);
    function TweenEvent(type, time, position, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
        this._position = NaN;
        this._time = NaN;
        this._position = position;
        this._time = time;
    }
    TweenEvent.prototype.clone = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Object.defineProperty(TweenEvent, "MOTION_CHANGE", {
        get: function () {
            return 'motionChange';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TweenEvent, "MOTION_FINISH", {
        get: function () {
            return 'motionFinish';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TweenEvent, "MOTION_LOOP", {
        get: function () {
            return 'motionLoop';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TweenEvent, "MOTION_RESUME", {
        get: function () {
            return 'motionResume';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TweenEvent, "MOTION_START", {
        get: function () {
            return 'motionStart';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TweenEvent, "MOTION_STOP", {
        get: function () {
            return 'motionStop';
        },
        enumerable: true,
        configurable: true
    });
    return TweenEvent;
})(FlashEvent_1.FlashEvent);
exports.TweenEvent = TweenEvent;



},{"../../_util/NotImplementedError":4,"../../flash/events/FlashEvent":53}],11:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
var Back = (function () {
    function Back() {
    }
    Back.easeIn = function (t, b, c, d, s) {
        if (s === void 0) { s = 0; }
        //if (typeof s == "undefined") s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    };
    Back.easeInOut = function (t, b, c, d, s) {
        if (s === void 0) { s = 0; }
        //if (typeof s == "undefined") s = 1.70158;
        if ((t /= d / 2) < 1) {
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        }
        else {
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    };
    Back.easeOut = function (t, b, c, d, s) {
        if (s === void 0) { s = 0; }
        //if (typeof s == "undefined") s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    };
    return Back;
})();
exports.Back = Back;



},{}],12:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
var Bounce = (function () {
    function Bounce() {
    }
    Bounce.easeIn = function (t, b, c, d) {
        return c - Bounce.easeOut(d - t, 0, c, d) + b;
    };
    Bounce.easeInOut = function (t, b, c, d) {
        if (t < d / 2) {
            return Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
        }
        else {
            return Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    };
    Bounce.easeOut = function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        }
        else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        }
        else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        }
        else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    };
    return Bounce;
})();
exports.Bounce = Bounce;



},{}],13:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
var Circular = (function () {
    function Circular() {
    }
    Circular.easeIn = function (t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    };
    Circular.easeInOut = function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        }
        else {
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    };
    Circular.easeOut = function (t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    };
    return Circular;
})();
exports.Circular = Circular;



},{}],14:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
var Cubic = (function () {
    function Cubic() {
    }
    Cubic.easeIn = function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    };
    Cubic.easeInOut = function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t + b;
        }
        else {
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    };
    Cubic.easeOut = function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    };
    return Cubic;
})();
exports.Cubic = Cubic;



},{}],15:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
var Elastic = (function () {
    function Elastic() {
    }
    Elastic.easeIn = function (t, b, c, d, a, p) {
        if (a === void 0) { a = 0; }
        if (p === void 0) { p = 0; }
        var s;
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        //if (typeof p == "undefined") p = d * .3;
        if (!a || a < Math.abs(c)) {
            s = p / 4;
            a = c;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    };
    Elastic.easeInOut = function (t, b, c, d, a, p) {
        if (a === void 0) { a = 0; }
        if (p === void 0) { p = 0; }
        var s;
        if (t == 0)
            return b;
        if ((t /= d / 2) == 2)
            return b + c;
        //if (typeof p == "undefined") p = d * (.3 * 1.5);
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1)
            return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    };
    Elastic.easeOut = function (t, b, c, d, a, p) {
        if (a === void 0) { a = 0; }
        if (p === void 0) { p = 0; }
        var s;
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        //if (typeof p == "undefined") p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    };
    return Elastic;
})();
exports.Elastic = Elastic;



},{}],16:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
var Exponential = (function () {
    function Exponential() {
    }
    Exponential.easeIn = function (t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    };
    Exponential.easeInOut = function (t, b, c, d) {
        if (t == 0)
            return b;
        if (t == d)
            return b + c;
        if ((t /= d / 2) < 1)
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };
    Exponential.easeOut = function (t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    };
    return Exponential;
})();
exports.Exponential = Exponential;



},{}],17:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
var None = (function () {
    function None() {
    }
    None.easeIn = function (t, b, c, d) {
        return c * t / d + b;
    };
    None.easeInOut = function (t, b, c, d) {
        return c * t / d + b;
    };
    None.easeNone = function (t, b, c, d) {
        return t < d ? b : b + c;
    };
    None.easeOut = function (t, b, c, d) {
        return c * t / d + b;
    };
    return None;
})();
exports.None = None;



},{}],18:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
var Quadratic = (function () {
    function Quadratic() {
    }
    Quadratic.easeIn = function (t, b, c, d) {
        return c * (t /= d) * t + b;
    };
    Quadratic.easeInOut = function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        else {
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    };
    Quadratic.easeOut = function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    };
    return Quadratic;
})();
exports.Quadratic = Quadratic;



},{}],19:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
var Quartic = (function () {
    function Quartic() {
    }
    Quartic.easeIn = function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    };
    Quartic.easeInOut = function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t + b;
        }
        else {
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    };
    Quartic.easeOut = function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };
    return Quartic;
})();
exports.Quartic = Quartic;



},{}],20:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
var Quintic = (function () {
    function Quintic() {
    }
    Quintic.easeIn = function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    };
    Quintic.easeInOut = function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t * t + b;
        }
        else {
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
    };
    Quintic.easeOut = function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    };
    return Quintic;
})();
exports.Quintic = Quintic;



},{}],21:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
var NotImplementedError_1 = require("../../../_util/NotImplementedError");
var Regular = (function () {
    function Regular() {
    }
    Regular.easeIn = function (t, b, c, d) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Regular.easeInOut = function (t, b, c, d) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Regular.easeOut = function (t, b, c, d) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    return Regular;
})();
exports.Regular = Regular;



},{"../../../_util/NotImplementedError":4}],22:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
var Sine = (function () {
    function Sine() {
    }
    Sine.easeIn = function (t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    };
    Sine.easeInOut = function (t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    };
    Sine.easeOut = function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    };
    return Sine;
})();
exports.Sine = Sine;



},{}],23:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
var NotImplementedError_1 = require("../../../_util/NotImplementedError");
var Strong = (function () {
    function Strong() {
    }
    Strong.easeIn = function (t, b, c, d) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Strong.easeInOut = function (t, b, c, d) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Strong.easeOut = function (t, b, c, d) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    return Strong;
})();
exports.Strong = Strong;



},{"../../../_util/NotImplementedError":4}],24:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./Back"));
__export(require("./Bounce"));
__export(require("./Circular"));
__export(require("./Cubic"));
__export(require("./Elastic"));
__export(require("./Exponential"));
__export(require("./None"));
__export(require("./Quadratic"));
__export(require("./Quartic"));
__export(require("./Quintic"));
__export(require("./Regular"));
__export(require("./Sine"));
__export(require("./Strong"));



},{"./Back":11,"./Bounce":12,"./Circular":13,"./Cubic":14,"./Elastic":15,"./Exponential":16,"./None":17,"./Quadratic":18,"./Quartic":19,"./Quintic":20,"./Regular":21,"./Sine":22,"./Strong":23}],25:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var easing = require("./easing/index");
exports.easing = easing;
__export(require("./Tween"));
__export(require("./TweenEvent"));



},{"./Tween":9,"./TweenEvent":10,"./easing/index":24}],26:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObject_1 = require("./DisplayObject");
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
    }
    return Bitmap;
})(DisplayObject_1.DisplayObject);
exports.Bitmap = Bitmap;



},{"./DisplayObject":32}],27:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var BitmapData = (function () {
    function BitmapData() {
    }
    return BitmapData;
})();
exports.BitmapData = BitmapData;



},{}],28:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var BlendMode = (function () {
    function BlendMode() {
    }
    Object.defineProperty(BlendMode, "ADD", {
        get: function () {
            return "add";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "ALPHA", {
        get: function () {
            return "alpha";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "DARKEN", {
        get: function () {
            return "darken";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "DIFFERENCE", {
        get: function () {
            return "difference";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "ERASE", {
        get: function () {
            return "erase";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "HARDLIGHT", {
        get: function () {
            return "hardlight";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "INVERT", {
        get: function () {
            return "invert";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "LAYER", {
        get: function () {
            return "layer";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "LIGHTEN", {
        get: function () {
            return "lighten";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "MULTIPLY", {
        get: function () {
            return "multiply";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "NORMAL", {
        get: function () {
            return "normal";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "OVERLAY", {
        get: function () {
            return "overlay";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "SCREEN", {
        get: function () {
            return "screen";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "SHADER", {
        get: function () {
            return "shader";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlendMode, "SUBTRACT", {
        get: function () {
            return "subtract";
        },
        enumerable: true,
        configurable: true
    });
    return BlendMode;
})();
exports.BlendMode = BlendMode;



},{}],29:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var CapsStyle = (function () {
    function CapsStyle() {
    }
    Object.defineProperty(CapsStyle, "NONE", {
        get: function () {
            return "none";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CapsStyle, "ROUND", {
        get: function () {
            return "round";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CapsStyle, "SQUARE", {
        get: function () {
            return "square";
        },
        enumerable: true,
        configurable: true
    });
    return CapsStyle;
})();
exports.CapsStyle = CapsStyle;



},{}],30:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var ColorCorrection = (function () {
    function ColorCorrection() {
    }
    Object.defineProperty(ColorCorrection, "DEFAULT", {
        get: function () {
            return 'default';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorCorrection, "OFF", {
        get: function () {
            return 'off';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorCorrection, "ON", {
        get: function () {
            return 'on';
        },
        enumerable: true,
        configurable: true
    });
    return ColorCorrection;
})();
exports.ColorCorrection = ColorCorrection;



},{}],31:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var ColorCorrectionSupport = (function () {
    function ColorCorrectionSupport() {
    }
    Object.defineProperty(ColorCorrectionSupport, "DEFAULT_OFF", {
        get: function () {
            return 'defaultOff';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorCorrectionSupport, "DEFAULT_ON", {
        get: function () {
            return 'defaultOn';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorCorrectionSupport, "UNSUPPORTED", {
        get: function () {
            return 'unsupported';
        },
        enumerable: true,
        configurable: true
    });
    return ColorCorrectionSupport;
})();
exports.ColorCorrectionSupport = ColorCorrectionSupport;



},{}],32:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Transform_1 = require("../geom/Transform");
var NotImplementedError_1 = require("../../_util/NotImplementedError");
var EventDispatcher_1 = require("../events/EventDispatcher");
var _util_1 = require("../../_util/_util");
var BlendMode_1 = require("./BlendMode");
var DisplayObject = (function (_super) {
    __extends(DisplayObject, _super);
    function DisplayObject(root, parent) {
        _super.call(this);
        this.blendMode = BlendMode_1.BlendMode.NORMAL;
        this.enabled = true;
        this.mask = null;
        this.visible = true;
        this._parent = null;
        this._root = null;
        this._name = "";
        this._rotation = 0;
        this._rotationX = 0;
        this._rotationY = 0;
        this._rotationZ = 0;
        this._scaleX = 1;
        this._scaleY = 1;
        this._scaleZ = 1;
        this._stage = null;
        this._height = 0;
        this._width = 0;
        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._childIndex = -1;
        this._alpha = 1;
        this._filters = null;
        this._transform = null;
        this._rawRenderTarget = null;
        this._filteredRenderTarget = null;
        this._isRoot = false;
        this._root = root;
        this._stage = root;
        this._parent = parent;
        this._filters = [];
        this._transform = new Transform_1.Transform();
        if (root !== null) {
            this._rawRenderTarget = root.worldRenderer.createRenderTarget();
        }
        this._isRoot = root === null;
    }
    Object.defineProperty(DisplayObject.prototype, "alpha", {
        get: function () {
            return this._alpha;
        },
        set: function (v) {
            this._alpha = _util_1._util.limitInto(v, 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "cacheAsBitmap", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "childIndex", {
        get: function () {
            return this._childIndex;
        },
        // DO NOT call manually
        set: function (v) {
            this._childIndex = v;
        },
        enumerable: true,
        configurable: true
    });
    DisplayObject.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._root.worldRenderer.releaseRenderTarget(this._rawRenderTarget);
        this.filters = [];
    };
    Object.defineProperty(DisplayObject.prototype, "filters", {
        get: function () {
            return this._filters.slice();
        },
        set: function (v) {
            var i;
            var hasFiltersBefore = this.__shouldProcessFilters();
            if (hasFiltersBefore) {
                for (i = 0; i < this._filters.length; ++i) {
                    this._filters[i].notifyRemoved();
                }
            }
            this._filters = v;
            var hasFiltersNow = this.__shouldProcessFilters();
            if (hasFiltersNow) {
                for (i = 0; i < this._filters.length; ++i) {
                    this._filters[i].notifyAdded();
                }
            }
            if (hasFiltersBefore !== hasFiltersNow) {
                // Update filtered RenderTarget2D state.
                if (hasFiltersBefore) {
                    this._filteredRenderTarget.dispose();
                    this._filteredRenderTarget = null;
                }
                else if (hasFiltersNow) {
                    this._filteredRenderTarget = this._root.worldRenderer.createRenderTarget();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (v) {
            this._height = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "mouseX", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "mouseY", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (v) {
            this._name = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "root", {
        get: function () {
            return this._root;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "rotation", {
        get: function () {
            return this._rotation;
        },
        set: function (v) {
            while (v < -180) {
                v += 360;
            }
            while (v > 180) {
                v -= 360;
            }
            this._rotation = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "rotationX", {
        get: function () {
            return this._rotationX;
        },
        set: function (v) {
            while (v < -180) {
                v += 360;
            }
            while (v > 180) {
                v -= 360;
            }
            this._rotationX = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "rotationY", {
        get: function () {
            return this._rotationY;
        },
        set: function (v) {
            while (v < -180) {
                v += 360;
            }
            while (v > 180) {
                v -= 360;
            }
            this._rotationY = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "rotationZ", {
        get: function () {
            return this._rotationZ;
        },
        set: function (v) {
            while (v < -180) {
                v += 360;
            }
            while (v > 180) {
                v -= 360;
            }
            this._rotationZ = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "stage", {
        get: function () {
            return this._stage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "transform", {
        get: function () {
            return this._transform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (v) {
            this._width = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (v) {
            this._x = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (v) {
            this._y = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObject.prototype, "z", {
        get: function () {
            return this._z;
        },
        set: function (v) {
            this._z = v;
        },
        enumerable: true,
        configurable: true
    });
    DisplayObject.prototype.getBounds = function (targetCoordinateSpace) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    DisplayObject.prototype.getRect = function (targetCoordinateSpace) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    DisplayObject.prototype.update = function () {
        if (this.enabled) {
            this.__update();
        }
    };
    DisplayObject.prototype.render = function (renderer) {
        if (this.visible && this.alpha > 0) {
            this.__preprocess(renderer);
            this.__render(renderer);
            this.__postprocess(renderer);
        }
        else {
        }
    };
    Object.defineProperty(DisplayObject.prototype, "outputRenderTarget", {
        get: function () {
            return this.__shouldProcessFilters() ? this._filteredRenderTarget : this._rawRenderTarget;
        },
        enumerable: true,
        configurable: true
    });
    DisplayObject.prototype.__preprocess = function (renderer) {
        var _this = this;
        this.outputRenderTarget.clear();
        var manager = renderer.shaderManager;
        this.__selectShader(manager);
        this.transform.matrix3D.setTransformTo(this.x, this.y, this.z);
        manager.currentShader.changeValue("uTransformMatrix", function (u) {
            u.value = _this.transform.matrix3D.toArray();
        });
        manager.currentShader.changeValue("uAlpha", function (u) {
            u.value = _this.alpha;
        });
        manager.currentShader.syncUniforms();
        renderer.setBlendMode(this.blendMode);
    };
    DisplayObject.prototype.__postprocess = function (renderer) {
        if (this.__shouldProcessFilters()) {
            var filterManager = renderer.filterManager;
            filterManager.pushFilterGroup(this.filters);
            filterManager.processFilters(renderer, this._rawRenderTarget, this._filteredRenderTarget, true);
            filterManager.popFilterGroup();
        }
    };
    DisplayObject.prototype.__shouldProcessFilters = function () {
        return this._filters !== null && this._filters.length > 0;
    };
    return DisplayObject;
})(EventDispatcher_1.EventDispatcher);
exports.DisplayObject = DisplayObject;



},{"../../_util/NotImplementedError":4,"../../_util/_util":5,"../events/EventDispatcher":52,"../geom/Transform":67,"./BlendMode":28}],33:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InteractiveObject_1 = require("./InteractiveObject");
var NotImplementedError_1 = require("../../_util/NotImplementedError");
var ShaderID_1 = require("../../webgl/ShaderID");
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer(root, parent) {
        _super.call(this, root, parent);
        this.mouseChildren = true;
        this.tabChildren = true;
        this._children = null;
        this._children = [];
    }
    Object.defineProperty(DisplayObjectContainer.prototype, "numChildren", {
        get: function () {
            return this._children.length;
        },
        enumerable: true,
        configurable: true
    });
    DisplayObjectContainer.prototype.addChild = function (child) {
        if (this._children.indexOf(child) < 0) {
            this._children.push(child);
        }
        child.childIndex = this._children.length - 1;
        return child;
    };
    DisplayObjectContainer.prototype.addChildAt = function (child, index) {
        if (this._children.indexOf(child) < 0) {
            if (index === 0) {
                this._children.unshift(child);
            }
            else if (index === this._children.length - 1) {
                this._children.push(child);
            }
            else {
                this._children = this._children.slice(0, index - 1).concat(child).concat(this._children.slice(index, this._children.length - 1));
            }
        }
        child.childIndex = index;
        return child;
    };
    DisplayObjectContainer.prototype.areInaccessibleObjectsUnderPoint = function (point) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    DisplayObjectContainer.prototype.contains = function (child) {
        var result = false;
        for (var i = 0; i < this._children.length; ++i) {
            if (this._children[i] === child) {
                return true;
            }
            if (this._children[i] instanceof DisplayObjectContainer) {
                result = this._children[i].contains(child);
                if (result) {
                    return true;
                }
            }
        }
        return false;
    };
    DisplayObjectContainer.prototype.getChildAt = function (index) {
        if (index < 0 || index > this._children.length - 1) {
            return null;
        }
        else {
            return this._children[index];
        }
    };
    DisplayObjectContainer.prototype.getChildByName = function (name) {
        if (this._children.length === 0) {
            return null;
        }
        var result = null;
        for (var i = 0; i < this._children.length; ++i) {
            if (this._children[i].name === name) {
                return this._children[i];
            }
            if (this._children[i] instanceof DisplayObjectContainer) {
                result = this._children[i].getChildByName(name);
                if (result !== null) {
                    return result;
                }
            }
        }
        return null;
    };
    DisplayObjectContainer.prototype.getChildIndex = function (child) {
        return this._children.indexOf(child);
    };
    DisplayObjectContainer.prototype.getObjectsUnderPoint = function (point) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    DisplayObjectContainer.prototype.removeChild = function (child) {
        var childIndex = this._children.indexOf(child);
        if (childIndex >= 0) {
            return this.removeChildAt(childIndex);
        }
        else {
            return null;
        }
    };
    DisplayObjectContainer.prototype.removeChildAt = function (index) {
        if (index < 0 || index >= this.numChildren) {
            return null;
        }
        var child = this._children[index];
        for (var i = index + 1; i < this._children.length; i++) {
            this._children[i].childIndex++;
        }
        this._children.splice(index, 1);
        return child;
    };
    DisplayObjectContainer.prototype.setChildIndex = function (child, index) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    DisplayObjectContainer.prototype.swapChildren = function (child1, child2) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    DisplayObjectContainer.prototype.swapChildrenAt = function (index1, index2) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Object.defineProperty(DisplayObjectContainer.prototype, "width", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayObjectContainer.prototype, "height", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    DisplayObjectContainer.prototype.dispatchEvent = function (event, data) {
        var r = _super.prototype.dispatchEvent.call(this, event, data);
        for (var i = 0; i < this._children.length; i++) {
            this._children[i].dispatchEvent(event, data);
        }
        return r;
    };
    DisplayObjectContainer.prototype.update = function () {
        if (this.enabled) {
            _super.prototype.update.call(this);
            for (var i = 0; i < this._children.length; ++i) {
                this._children[i].update();
            }
        }
    };
    DisplayObjectContainer.prototype.render = function (renderer) {
        if (this.visible && this.alpha > 0) {
            this.__preprocess(renderer);
            this.__render(renderer);
            for (var i = 0; i < this._children.length; ++i) {
                var child = this._children[i];
                child.render(renderer);
                renderer.copyRenderTargetContent(child.outputRenderTarget, this._rawRenderTarget, false);
            }
            this.__postprocess(renderer);
        }
        else {
        }
    };
    DisplayObjectContainer.prototype.__selectShader = function (shaderManager) {
        shaderManager.selectShader(ShaderID_1.ShaderID.REPLICATE);
    };
    return DisplayObjectContainer;
})(InteractiveObject_1.InteractiveObject);
exports.DisplayObjectContainer = DisplayObjectContainer;



},{"../../_util/NotImplementedError":4,"../../webgl/ShaderID":96,"./InteractiveObject":38}],34:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var GradientType = (function () {
    function GradientType() {
    }
    Object.defineProperty(GradientType, "LINEAR", {
        get: function () {
            return "linear";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GradientType, "RADIAL", {
        get: function () {
            return "radial";
        },
        enumerable: true,
        configurable: true
    });
    return GradientType;
})();
exports.GradientType = GradientType;



},{}],35:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var NotImplementedError_1 = require("../../_util/NotImplementedError");
var SpreadMethod_1 = require("./SpreadMethod");
var InterpolationMethod_1 = require("./InterpolationMethod");
var GraphicsPathWinding_1 = require("./GraphicsPathWinding");
var GraphicsPathCommand_1 = require("./GraphicsPathCommand");
var _util_1 = require("../../_util/_util");
var TriangleCulling_1 = require("./TriangleCulling");
var LineScaleMode_1 = require("./LineScaleMode");
var BrushType_1 = require("../../webgl/graphics/BrushType");
var SolidStrokeRenderer_1 = require("../../webgl/graphics/SolidStrokeRenderer");
var SolidFillRenderer_1 = require("../../webgl/graphics/SolidFillRenderer");
var Graphics = (function () {
    function Graphics(attachTo, renderer) {
        this._displayObject = null;
        this._isFilling = false;
        this._renderer = null;
        this._bufferTarget = null;
        this._isDirty = true;
        this._shouldUpdateRenderTarget = false;
        this._lineType = BrushType_1.BrushType.SOLID;
        this._lineWidth = 1;
        this._lineAlpha = 1;
        this._lineColor = 0;
        this._currentX = 0;
        this._currentY = 0;
        this._lastPathStartX = 0;
        this._lastPathStartY = 0;
        this._currentStrokeRenderer = null;
        this._currentFillRenderer = null;
        this._strokeRenderers = null;
        this._fillRenderers = null;
        this._displayObject = attachTo;
        this._renderer = renderer;
        this._isDirty = true;
        this._strokeRenderers = [];
        this._fillRenderers = [];
        this._bufferTarget = renderer.createRenderTarget();
        this.__updateCurrentPoint(0, 0);
        this.__resetStyles();
        this.clear();
    }
    Graphics.prototype.beginBitmapFill = function (bitmap, matrix, repeat, smooth) {
        if (matrix === void 0) { matrix = null; }
        if (repeat === void 0) { repeat = false; }
        if (smooth === void 0) { smooth = false; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Graphics.prototype.beginFill = function (color, alpha) {
        if (alpha === void 0) { alpha = 1.0; }
        if (this._isFilling) {
            this.endFill();
        }
        if (!this._isFilling) {
            this._isFilling = true;
            this._currentStrokeRenderer = this.__createStrokeRendererWithCurrentSettings();
            this._strokeRenderers.push(this._currentStrokeRenderer);
            this._currentFillRenderer = new SolidFillRenderer_1.SolidFillRenderer(this, this._currentX, this._currentY, color, alpha);
            this._currentFillRenderer.beginIndex = this._strokeRenderers.length - 1;
        }
    };
    Graphics.prototype.beginGradientFill = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
        if (matrix === void 0) { matrix = null; }
        if (spreadMethod === void 0) { spreadMethod = SpreadMethod_1.SpreadMethod.PAD; }
        if (interpolationMethod === void 0) { interpolationMethod = InterpolationMethod_1.InterpolationMethod.RGB; }
        if (focalPointRatio === void 0) { focalPointRatio = 0; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Graphics.prototype.beginShaderFill = function (shader, matrix) {
        if (matrix === void 0) { matrix = null; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Graphics.prototype.clear = function () {
        var i;
        if (this._strokeRenderers !== null) {
            for (i = 0; i < this._strokeRenderers.length; ++i) {
                this._strokeRenderers[i].dispose();
                this._isDirty = true;
            }
        }
        if (this._fillRenderers !== null) {
            for (i = 0; i < this._fillRenderers.length; ++i) {
                this._fillRenderers[i].dispose();
                this._isDirty = true;
            }
        }
        if (this._currentFillRenderer !== null) {
            this._currentFillRenderer.dispose();
            this._isDirty = true;
        }
        while (this._strokeRenderers.length > 0) {
            this._strokeRenderers.pop();
            this._isDirty = true;
        }
        while (this._fillRenderers.length > 0) {
            this._fillRenderers.pop();
            this._isDirty = true;
        }
        // create stroke and fill renderers according to current state
        // and push them into the stack
        this._currentFillRenderer = null;
        this._currentStrokeRenderer = this.__createStrokeRendererWithCurrentSettings();
        this._strokeRenderers.push(this._currentStrokeRenderer);
        this._isFilling = false;
    };
    Graphics.prototype.copyFrom = function (sourceGraphics) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Graphics.prototype.curveTo = function (controlX, controlY, anchorX, anchorY) {
        if (this._isFilling) {
            this._currentFillRenderer.curveTo(controlX, controlY, anchorX, anchorY);
        }
        this._currentStrokeRenderer.curveTo(controlX, controlY, anchorX, anchorY);
        this.__updateCurrentPoint(anchorX, anchorY);
        this._isDirty = true;
    };
    Graphics.prototype.drawCircle = function (x, y, radius) {
        if (this._isFilling) {
            this._currentFillRenderer.drawCircle(x, y, radius);
        }
        this._currentStrokeRenderer.drawCircle(x, y, radius);
        this.__updateCurrentPoint(x, y);
        this.__updateLastPathStartPoint(x + radius, y);
        this._isDirty = true;
    };
    Graphics.prototype.drawEllipse = function (x, y, width, height) {
        if (this._isFilling) {
            this._currentFillRenderer.drawEllipse(x, y, width, height);
        }
        this._currentStrokeRenderer.drawEllipse(x, y, width, height);
        this.__updateCurrentPoint(x + width, y + height / 2);
        this.__updateLastPathStartPoint(x + width, y + height / 2);
        this._isDirty = true;
    };
    Graphics.prototype.drawGraphicsData = function (graphicsData) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    /**
     *
     * @param commands
     * @param data
     * @param winding
     * @param checkCommands Bulletproof
     */
    Graphics.prototype.drawPath = function (commands, data, winding, checkCommands) {
        if (winding === void 0) { winding = GraphicsPathWinding_1.GraphicsPathWinding.EVEN_ODD; }
        if (checkCommands === void 0) { checkCommands = true; }
        if (checkCommands && !__checkPathCommands(commands, data)) {
            return;
        }
        var commandLength = commands.length;
        var j = 0;
        var isInFill = this._isFilling;
        var sr = this._currentStrokeRenderer;
        var fr = this._currentFillRenderer;
        var newX, newY;
        for (var i = 0; i < commandLength; ++i) {
            switch (commands[i]) {
                case GraphicsPathCommand_1.GraphicsPathCommand.CUBIC_CURVE_TO:
                    if (isInFill) {
                        fr.bezierCurveTo(data[j], data[j + 1], data[j + 2], data[j + 3], data[j + 4], data[j + 5]);
                    }
                    sr.bezierCurveTo(data[j], data[j + 1], data[j + 2], data[j + 3], data[j + 4], data[j + 5]);
                    newX = data[j + 4];
                    newY = data[j + 5];
                    j += 6;
                    break;
                case GraphicsPathCommand_1.GraphicsPathCommand.CURVE_TO:
                    if (isInFill) {
                        fr.curveTo(data[j], data[j + 1], data[j + 2], data[j + 3]);
                    }
                    sr.curveTo(data[j], data[j + 1], data[j + 2], data[j + 3]);
                    newX = data[j + 2];
                    newY = data[j + 3];
                    j += 4;
                    break;
                case GraphicsPathCommand_1.GraphicsPathCommand.LINE_TO:
                    if (isInFill) {
                        fr.lineTo(data[j], data[j + 1]);
                    }
                    sr.lineTo(data[j], data[j + 1]);
                    newX = data[j];
                    newY = data[j + 1];
                    j += 2;
                    break;
                case GraphicsPathCommand_1.GraphicsPathCommand.MOVE_TO:
                    if (isInFill) {
                        fr.moveTo(data[j], data[j + 1]);
                    }
                    sr.moveTo(data[j], data[j + 1]);
                    newX = data[j];
                    newY = data[j + 1];
                    j += 2;
                    break;
                case GraphicsPathCommand_1.GraphicsPathCommand.NO_OP:
                    break;
                case GraphicsPathCommand_1.GraphicsPathCommand.WIDE_LINE_TO:
                    if (isInFill) {
                        fr.lineTo(data[j + 2], data[j + 3]);
                    }
                    sr.lineTo(data[j + 2], data[j + 3]);
                    newX = data[j + 2];
                    newY = data[j + 3];
                    j += 4;
                    break;
                case GraphicsPathCommand_1.GraphicsPathCommand.WIDE_MOVE_TO:
                    if (isInFill) {
                        fr.moveTo(data[j + 2], data[j + 3]);
                    }
                    sr.moveTo(data[j + 2], data[j + 3]);
                    newX = data[j + 2];
                    newY = data[j + 3];
                    j += 4;
                    break;
                default:
                    break;
            }
        }
        if (commandLength > 0) {
            this.__updateCurrentPoint(newX, newY);
        }
        this._isDirty = true;
    };
    Graphics.prototype.drawRect = function (x, y, width, height) {
        if (this._isFilling) {
            this._currentFillRenderer.drawRect(x, y, width, height);
        }
        this._currentStrokeRenderer.drawRect(x, y, width, height);
        this.__updateCurrentPoint(x, y);
        this.__updateLastPathStartPoint(x, y);
        this._isDirty = true;
    };
    Graphics.prototype.drawRoundRect = function (x, y, width, height, ellipseWidth, ellipseHeight) {
        if (ellipseHeight === void 0) { ellipseHeight = NaN; }
        if (isNaN(ellipseHeight)) {
            ellipseHeight = ellipseWidth;
        }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Graphics.prototype.drawTriangles = function (vectors, indices, uvtData, culling) {
        if (indices === void 0) { indices = null; }
        if (uvtData === void 0) { uvtData = null; }
        if (culling === void 0) { culling = TriangleCulling_1.TriangleCulling.NONE; }
        // jabbany, mostly
        if (indices === null) {
            indices = [];
            for (var i = 0; i < vectors.length; i += 2) {
                indices.push(i / 2);
            }
        }
        else {
            indices = indices.slice(0);
        }
        if (indices.length % 3 !== 0) {
            _util_1._util.trace("Graphics.drawTriangles malformed indices count. Must be multiple of 3.", "err");
            return;
        }
        /** Do culling of triangles here to lessen work later **/
        if (culling !== TriangleCulling_1.TriangleCulling.NONE) {
            for (var i = 0; i < indices.length / 3; i++) {
                var ux = vectors[2 * indices[i * 3 + 1]] - vectors[2 * indices[i * 3]], uy = vectors[2 * indices[i * 3 + 1] + 1] - vectors[2 * indices[i * 3] + 1], vx = vectors[2 * indices[i * 3 + 2]] - vectors[2 * indices[i * 3 + 1]], vy = vectors[2 * indices[i * 3 + 2] + 1] - vectors[2 * indices[i * 3 + 1] + 1];
                var zcomp = ux * vy - vx * uy;
                if (zcomp < 0 && culling === TriangleCulling_1.TriangleCulling.POSITIVE ||
                    zcomp > 0 && culling === TriangleCulling_1.TriangleCulling.NEGATIVE) {
                    /** Remove the indices. Leave the vertices. **/
                    indices.splice(i * 3, 3);
                    i--;
                }
            }
        }
        var commands = [], data = [];
        for (var i = 0; i < indices.length / 3; i++) {
            var a = indices[3 * i], b = indices[3 * i + 1], c = indices[3 * i + 2];
            var ax = vectors[2 * a], ay = vectors[2 * a + 1];
            var bx = vectors[2 * b], by = vectors[2 * b + 1];
            var cx = vectors[2 * c], cy = vectors[2 * c + 1];
            commands.push(1, 2, 2, 2);
            data.push(ax, ay, bx, by, cx, cy, ax, ay);
        }
        // TODO: Can be optimized by using native WebGL
        this.drawPath(commands, data, void (0), false);
    };
    Graphics.prototype.endFill = function () {
        if (this._isFilling) {
            this._isFilling = false;
            this._currentFillRenderer.endIndex = this._strokeRenderers.length - 1;
            this._currentFillRenderer.closePath();
            this._currentStrokeRenderer.closePath();
            this._fillRenderers.push(this._currentFillRenderer);
            if (this._currentFillRenderer.hasDrawnAnything) {
                this._isDirty = true;
            }
            this._currentFillRenderer = null;
        }
    };
    Graphics.prototype.lineBitmapStyle = function (bitmap, matrix, repeat, smooth) {
        if (matrix === void 0) { matrix = null; }
        if (repeat === void 0) { repeat = true; }
        if (smooth === void 0) { smooth = false; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Graphics.prototype.lineGradientStyle = function (type, colors, alphas, ratios, matrix, spreadMethod, interpolationMethod, focalPointRatio) {
        if (matrix === void 0) { matrix = null; }
        if (spreadMethod === void 0) { spreadMethod = SpreadMethod_1.SpreadMethod.PAD; }
        if (interpolationMethod === void 0) { interpolationMethod = InterpolationMethod_1.InterpolationMethod.RGB; }
        if (focalPointRatio === void 0) { focalPointRatio = 0; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Graphics.prototype.lineShaderStyle = function (shader, matrix) {
        if (matrix === void 0) { matrix = null; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Graphics.prototype.lineStyle = function (thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit) {
        if (thickness === void 0) { thickness = NaN; }
        if (color === void 0) { color = 0; }
        if (alpha === void 0) { alpha = 1.0; }
        if (pixelHinting === void 0) { pixelHinting = false; }
        if (scaleMode === void 0) { scaleMode = LineScaleMode_1.LineScaleMode.NORMAL; }
        if (caps === void 0) { caps = null; }
        if (joints === void 0) { joints = null; }
        if (miterLimit === void 0) { miterLimit = 3; }
        if (this._lineType !== BrushType_1.BrushType.SOLID || this._lineWidth !== thickness || this._lineColor !== color || this._lineAlpha !== alpha) {
            this._lineType = BrushType_1.BrushType.SOLID;
            if (!isNaN(thickness)) {
                this._lineWidth = thickness;
            }
            this._lineColor = color;
            this._lineAlpha = alpha;
            this._currentStrokeRenderer = new SolidStrokeRenderer_1.SolidStrokeRenderer(this, this._lastPathStartX, this._lastPathStartY, this._currentX, this._currentY, thickness, color, alpha);
            this._strokeRenderers.push(this._currentStrokeRenderer);
        }
    };
    Graphics.prototype.lineTo = function (x, y) {
        if (this._isFilling) {
            this._currentFillRenderer.lineTo(x, y);
        }
        this._currentStrokeRenderer.lineTo(x, y);
        this.__updateCurrentPoint(x, y);
        this._isDirty = true;
    };
    Graphics.prototype.moveTo = function (x, y) {
        if (this._isFilling) {
            this._currentFillRenderer.moveTo(x, y);
        }
        this._currentStrokeRenderer.moveTo(x, y);
        this.__updateCurrentPoint(x, y);
        this.__updateLastPathStartPoint(x, y);
        this._isDirty = true;
    };
    Graphics.prototype.update = function () {
        if (this._isDirty) {
            var j = 0, fillLen = this._fillRenderers.length;
            for (var i = 0; i < this._strokeRenderers.length; ++i) {
                if (j < fillLen && i === this._fillRenderers[j].beginIndex) {
                    this._fillRenderers[j].update();
                    j++;
                }
                this._strokeRenderers[i].update();
            }
            this._shouldUpdateRenderTarget = true;
        }
        this._isDirty = false;
    };
    Graphics.prototype.render = function (renderer, target, clearOutput) {
        var j = 0, fillLen = this._fillRenderers.length;
        // TODO: Extend texture copy shader.
        // When _shouldUpdateRenderTarget and _bufferTarget are enabled, content of Graphics
        // is cached so that rendering performance is improved but transforms and alpha changes
        // are not reflected. To fix this behavior, consider extending the replicate shader to
        // support state changes.
        if (true || this._shouldUpdateRenderTarget) {
            this._bufferTarget.clear();
            for (var i = 0; i < this._strokeRenderers.length; ++i) {
                if (j < fillLen && i === this._fillRenderers[j].beginIndex) {
                    this._fillRenderers[j].render(renderer, this._bufferTarget);
                    j++;
                }
                this._strokeRenderers[i].render(renderer, this._bufferTarget);
            }
            this._shouldUpdateRenderTarget = false;
        }
        renderer.copyRenderTargetContent(this._bufferTarget, target, clearOutput);
    };
    Graphics.prototype.dispose = function () {
        this.clear();
        this._strokeRenderers.pop();
        this._currentStrokeRenderer.dispose();
        this._currentStrokeRenderer = null;
        this._bufferTarget.dispose();
        this._bufferTarget = null;
    };
    Object.defineProperty(Graphics.prototype, "renderer", {
        get: function () {
            return this._renderer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Graphics.prototype, "isFilling", {
        get: function () {
            return this._isFilling;
        },
        enumerable: true,
        configurable: true
    });
    Graphics.prototype.__createStrokeRendererWithCurrentSettings = function () {
        switch (this._lineType) {
            case BrushType_1.BrushType.SOLID:
                return new SolidStrokeRenderer_1.SolidStrokeRenderer(this, this._lastPathStartX, this._lastPathStartY, this._currentX, this._currentY, this._lineWidth, this._lineColor, this._lineAlpha);
                break;
            default:
                throw new NotImplementedError_1.NotImplementedError();
        }
    };
    Graphics.prototype.__updateCurrentPoint = function (x, y) {
        this._currentX = x;
        this._currentY = y;
    };
    Graphics.prototype.__updateLastPathStartPoint = function (x, y) {
        this._lastPathStartX = x;
        this._lastPathStartY = y;
    };
    Graphics.prototype.__resetStyles = function () {
        this._lineType = BrushType_1.BrushType.SOLID;
        this._lineWidth = 1;
        this._lineColor = 0x000000;
        this._lineAlpha = 1;
    };
    return Graphics;
})();
exports.Graphics = Graphics;
function __checkPathCommands(commands, data) {
    if (commands === null || data === null || data.length % 2 !== 0) {
        return false;
    }
    var commandLength = commands.length;
    var dataLength = data.length;
    for (var i = 0; i < commandLength; i++) {
        switch (commands[i]) {
            case GraphicsPathCommand_1.GraphicsPathCommand.CUBIC_CURVE_TO:
                dataLength -= 2 * 3;
                if (dataLength < 0) {
                    return false;
                }
                break;
            case GraphicsPathCommand_1.GraphicsPathCommand.CURVE_TO:
                dataLength -= 2 * 2;
                if (dataLength < 0) {
                    return false;
                }
                break;
            case GraphicsPathCommand_1.GraphicsPathCommand.LINE_TO:
                dataLength -= 2 * 1;
                if (dataLength < 0) {
                    return false;
                }
                break;
            case GraphicsPathCommand_1.GraphicsPathCommand.MOVE_TO:
                dataLength -= 2 * 1;
                if (dataLength < 0) {
                    return false;
                }
                break;
            case GraphicsPathCommand_1.GraphicsPathCommand.NO_OP:
                break;
            case GraphicsPathCommand_1.GraphicsPathCommand.WIDE_LINE_TO:
                dataLength -= 2 * 2;
                if (dataLength < 0) {
                    return false;
                }
                break;
            case GraphicsPathCommand_1.GraphicsPathCommand.WIDE_MOVE_TO:
                dataLength -= 2 * 2;
                if (dataLength < 0) {
                    return false;
                }
                break;
            default:
                return false;
        }
    }
    return true;
}



},{"../../_util/NotImplementedError":4,"../../_util/_util":5,"../../webgl/graphics/BrushType":110,"../../webgl/graphics/SolidFillRenderer":114,"../../webgl/graphics/SolidStrokeRenderer":115,"./GraphicsPathCommand":36,"./GraphicsPathWinding":37,"./InterpolationMethod":39,"./LineScaleMode":41,"./SpreadMethod":44,"./TriangleCulling":50}],36:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var GraphicsPathCommand = (function () {
    function GraphicsPathCommand() {
    }
    Object.defineProperty(GraphicsPathCommand, "CUBIC_CURVE_TO", {
        get: function () {
            return 6;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsPathCommand, "CURVE_TO", {
        get: function () {
            return 3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsPathCommand, "LINE_TO", {
        get: function () {
            return 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsPathCommand, "MOVE_TO", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsPathCommand, "NO_OP", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsPathCommand, "WIDE_LINE_TO", {
        get: function () {
            return 5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsPathCommand, "WIDE_MOVE_TO", {
        get: function () {
            return 4;
        },
        enumerable: true,
        configurable: true
    });
    return GraphicsPathCommand;
})();
exports.GraphicsPathCommand = GraphicsPathCommand;



},{}],37:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var GraphicsPathWinding = (function () {
    function GraphicsPathWinding() {
    }
    Object.defineProperty(GraphicsPathWinding, "EVEN_ODD", {
        get: function () {
            return "evenOdd";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphicsPathWinding, "NON_ZERO", {
        get: function () {
            return "nonZero";
        },
        enumerable: true,
        configurable: true
    });
    return GraphicsPathWinding;
})();
exports.GraphicsPathWinding = GraphicsPathWinding;



},{}],38:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObject_1 = require("./DisplayObject");
var InteractiveObject = (function (_super) {
    __extends(InteractiveObject, _super);
    function InteractiveObject(root, parent) {
        _super.call(this, root, parent);
        this.doubleClickEnabled = true;
        this.focusRect = true;
        this.mouseEnabled = true;
        this.needsSoftKeyboard = false;
        this.tabEnabled = true;
        this.tabIndex = -1;
    }
    return InteractiveObject;
})(DisplayObject_1.DisplayObject);
exports.InteractiveObject = InteractiveObject;



},{"./DisplayObject":32}],39:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var InterpolationMethod = (function () {
    function InterpolationMethod() {
    }
    Object.defineProperty(InterpolationMethod, "LINEAR_RGB", {
        get: function () {
            return 'linearRGB';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InterpolationMethod, "RGB", {
        get: function () {
            return 'rgb';
        },
        enumerable: true,
        configurable: true
    });
    return InterpolationMethod;
})();
exports.InterpolationMethod = InterpolationMethod;



},{}],40:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var JointStyle = (function () {
    function JointStyle() {
    }
    Object.defineProperty(JointStyle, "BEVEL", {
        get: function () {
            return "bevel";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JointStyle, "MITER", {
        get: function () {
            return "miter";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JointStyle, "ROUND", {
        get: function () {
            return "round";
        },
        enumerable: true,
        configurable: true
    });
    return JointStyle;
})();
exports.JointStyle = JointStyle;



},{}],41:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var LineScaleMode = (function () {
    function LineScaleMode() {
    }
    Object.defineProperty(LineScaleMode, "HORIZONTAL", {
        get: function () {
            return "horizontal";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineScaleMode, "NONE", {
        get: function () {
            return "none";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineScaleMode, "NORMAL", {
        get: function () {
            return "normal";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineScaleMode, "VERTICAL", {
        get: function () {
            return "vertical";
        },
        enumerable: true,
        configurable: true
    });
    return LineScaleMode;
})();
exports.LineScaleMode = LineScaleMode;



},{}],42:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var Shader = (function () {
    function Shader() {
    }
    return Shader;
})();
exports.Shader = Shader;



},{}],43:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObject_1 = require("./DisplayObject");
var Graphics_1 = require("./Graphics");
var ShaderID_1 = require("../../webgl/ShaderID");
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape(root, parent) {
        _super.call(this, root, parent);
        this._graphics = null;
        this._graphics = new Graphics_1.Graphics(this, root.worldRenderer);
    }
    Shape.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._graphics.dispose();
        this._graphics = null;
    };
    Object.defineProperty(Shape.prototype, "graphics", {
        get: function () {
            return this._graphics;
        },
        enumerable: true,
        configurable: true
    });
    Shape.prototype.__update = function () {
        this._graphics.update();
    };
    Shape.prototype.__render = function (renderer) {
        this._graphics.render(renderer, this._rawRenderTarget, true);
    };
    Shape.prototype.__selectShader = function (shaderManager) {
        shaderManager.selectShader(ShaderID_1.ShaderID.PRIMITIVE);
    };
    return Shape;
})(DisplayObject_1.DisplayObject);
exports.Shape = Shape;



},{"../../webgl/ShaderID":96,"./DisplayObject":32,"./Graphics":35}],44:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var SpreadMethod = (function () {
    function SpreadMethod() {
    }
    Object.defineProperty(SpreadMethod, "PAD", {
        get: function () {
            return "pad";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpreadMethod, "REFLECT", {
        get: function () {
            return "reflect";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpreadMethod, "REPEAT", {
        get: function () {
            return "repeat";
        },
        enumerable: true,
        configurable: true
    });
    return SpreadMethod;
})();
exports.SpreadMethod = SpreadMethod;



},{}],45:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ColorCorrectionSupport_1 = require("./ColorCorrectionSupport");
var NotImplementedError_1 = require("../../_util/NotImplementedError");
var StageScaleMode_1 = require("./StageScaleMode");
var StageQuality_1 = require("./StageQuality");
var StageDisplayState_1 = require("./StageDisplayState");
var ColorCorrection_1 = require("./ColorCorrection");
var StageAlign_1 = require("./StageAlign");
var DisplayObjectContainer_1 = require("./DisplayObjectContainer");
var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage(renderer) {
        _super.call(this, null, null);
        this.align = StageAlign_1.StageAlign.TOP_LEFT;
        this.color = 0x000000;
        this.colorCorrection = ColorCorrection_1.ColorCorrection.DEFAULT;
        this.displayState = StageDisplayState_1.StageDisplayState.NORMAL;
        this.focus = null;
        this.frameRate = 60;
        this.fullScreenSourceRect = null;
        this.mouseChildren = true;
        this.quality = StageQuality_1.StageQuality.HIGH;
        this.scaleMode = StageScaleMode_1.StageScaleMode.NO_SCALE;
        this.showDefaultContextMenu = true;
        this.tabChildren = true;
        this._allowFullScreen = true;
        this._allowFullScreenInteractive = true;
        this._colorCorrectionSupport = ColorCorrectionSupport_1.ColorCorrectionSupport.DEFAULT_OFF;
        this._stageHeight = 0;
        this._stageWidth = 0;
        this._worldRenderer = null;
        this._root = this;
        this._worldRenderer = renderer;
        this._rawRenderTarget = renderer.createRenderTarget();
        this.resize(renderer.view.width, renderer.view.height);
    }
    Object.defineProperty(Stage.prototype, "allowFullScreen", {
        get: function () {
            return this._allowFullScreen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "allowFullScreenInteractive", {
        get: function () {
            return this._allowFullScreenInteractive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "colorCorrectionSupport", {
        get: function () {
            return this._colorCorrectionSupport;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "fullScreenHeight", {
        get: function () {
            return screen.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "fullScreenWidth", {
        get: function () {
            return screen.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "softKeyboardRect", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "stageHeight", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "stageWidth", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        set: function (v) {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "x", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "y", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Stage.prototype.invalidate = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Stage.prototype.isFocusInaccessible = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Object.defineProperty(Stage.prototype, "worldRenderer", {
        get: function () {
            return this._worldRenderer;
        },
        enumerable: true,
        configurable: true
    });
    Stage.prototype.resize = function (width, height) {
        this._width = width;
        this._height = height;
        // TODO: Fully implement this
    };
    Stage.prototype.render = function (renderer) {
        _super.prototype.render.call(this, renderer);
        // Copy it to the screen target.
        //throw new NotImplementedError();
        renderer.copyRenderTargetContent(this.outputRenderTarget, renderer.inputTarget, true);
    };
    Stage.prototype.__render = function (renderer) {
        this._rawRenderTarget.clear();
    };
    Stage.prototype.__update = function () {
    };
    return Stage;
})(DisplayObjectContainer_1.DisplayObjectContainer);
exports.Stage = Stage;



},{"../../_util/NotImplementedError":4,"./ColorCorrection":30,"./ColorCorrectionSupport":31,"./DisplayObjectContainer":33,"./StageAlign":46,"./StageDisplayState":47,"./StageQuality":48,"./StageScaleMode":49}],46:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var StageAlign = (function () {
    function StageAlign() {
    }
    Object.defineProperty(StageAlign, "BOTTOM", {
        get: function () {
            return 'B';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageAlign, "BOTTOM_LEFT", {
        get: function () {
            return 'BL';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageAlign, "BOTTOM_RIGHT", {
        get: function () {
            return 'BR';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageAlign, "LEFT", {
        get: function () {
            return 'L';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageAlign, "RIGHT", {
        get: function () {
            return 'R';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageAlign, "TOP", {
        get: function () {
            return 'T';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageAlign, "TOP_LEFT", {
        get: function () {
            return 'TL';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageAlign, "TOP_RIGHT", {
        get: function () {
            return 'TR';
        },
        enumerable: true,
        configurable: true
    });
    return StageAlign;
})();
exports.StageAlign = StageAlign;



},{}],47:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var StageDisplayState = (function () {
    function StageDisplayState() {
    }
    Object.defineProperty(StageDisplayState, "FULL_SCREEN", {
        get: function () {
            return 'fullScreen';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageDisplayState, "FULL_SCREEN_INTERACTIVE", {
        get: function () {
            return 'fullScreenInteractive';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageDisplayState, "NORMAL", {
        get: function () {
            return 'normal';
        },
        enumerable: true,
        configurable: true
    });
    return StageDisplayState;
})();
exports.StageDisplayState = StageDisplayState;



},{}],48:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var StageQuality = (function () {
    function StageQuality() {
    }
    Object.defineProperty(StageQuality, "BEST", {
        get: function () {
            return 'best';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageQuality, "HIGH", {
        get: function () {
            return 'high';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageQuality, "LOW", {
        get: function () {
            return 'low';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageQuality, "MEDIUM", {
        get: function () {
            return 'medium';
        },
        enumerable: true,
        configurable: true
    });
    return StageQuality;
})();
exports.StageQuality = StageQuality;



},{}],49:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var StageScaleMode = (function () {
    function StageScaleMode() {
    }
    Object.defineProperty(StageScaleMode, "EXACT_FIT", {
        get: function () {
            return 'exactFit';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageScaleMode, "NO_BORDER", {
        get: function () {
            return 'noBorder';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageScaleMode, "NO_SCALE", {
        get: function () {
            return 'noScale';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageScaleMode, "SHOW_ALL", {
        get: function () {
            return 'showAll';
        },
        enumerable: true,
        configurable: true
    });
    return StageScaleMode;
})();
exports.StageScaleMode = StageScaleMode;



},{}],50:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var TriangleCulling = (function () {
    function TriangleCulling() {
    }
    Object.defineProperty(TriangleCulling, "NEGATIVE", {
        get: function () {
            return "negative";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleCulling, "NONE", {
        get: function () {
            return "none";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriangleCulling, "POSITIVE", {
        get: function () {
            return "positive";
        },
        enumerable: true,
        configurable: true
    });
    return TriangleCulling;
})();
exports.TriangleCulling = TriangleCulling;



},{}],51:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./Bitmap"));
__export(require("./BitmapData"));
__export(require("./BlendMode"));
__export(require("./CapsStyle"));
__export(require("./ColorCorrection"));
__export(require("./ColorCorrectionSupport"));
__export(require("./DisplayObject"));
__export(require("./DisplayObjectContainer"));
__export(require("./GradientType"));
__export(require("./Graphics"));
__export(require("./GraphicsPathCommand"));
__export(require("./GraphicsPathWinding"));
__export(require("./InteractiveObject"));
__export(require("./InterpolationMethod"));
__export(require("./JointStyle"));
__export(require("./LineScaleMode"));
__export(require("./Shader"));
__export(require("./Shape"));
__export(require("./SpreadMethod"));
__export(require("./Stage"));
__export(require("./StageAlign"));
__export(require("./StageDisplayState"));
__export(require("./StageQuality"));
__export(require("./StageScaleMode"));
__export(require("./TriangleCulling"));



},{"./Bitmap":26,"./BitmapData":27,"./BlendMode":28,"./CapsStyle":29,"./ColorCorrection":30,"./ColorCorrectionSupport":31,"./DisplayObject":32,"./DisplayObjectContainer":33,"./GradientType":34,"./Graphics":35,"./GraphicsPathCommand":36,"./GraphicsPathWinding":37,"./InteractiveObject":38,"./InterpolationMethod":39,"./JointStyle":40,"./LineScaleMode":41,"./Shader":42,"./Shape":43,"./SpreadMethod":44,"./Stage":45,"./StageAlign":46,"./StageDisplayState":47,"./StageQuality":48,"./StageScaleMode":49,"./TriangleCulling":50}],52:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var _util_1 = require("../../_util/_util");
var EventDispatcher = (function () {
    function EventDispatcher() {
        this._listeners = null;
        this._listeners = new Map();
    }
    EventDispatcher.prototype.addEventListener = function (type, listener, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        // jabbany
        if (!this._listeners.has(type)) {
            this._listeners.set(type, []);
        }
        this._listeners.get(type).push(listener);
    };
    EventDispatcher.prototype.dispatchEvent = function (event, data) {
        // jabbany
        if (this._listeners.has(event.type) && this._listeners.get(event.type) !== null) {
            var arr = this._listeners.get(event.type);
            for (var i = 0; i < arr.length; ++i) {
                try {
                    arr[i].call(null, data);
                }
                catch (ex) {
                    if (ex.hasOwnProperty("stack")) {
                        _util_1._util.trace(ex.stack.toString(), "dispatchEvent: error");
                    }
                    else {
                        _util_1._util.trace(ex.toString(), "dispatchEvent: error");
                    }
                }
            }
            return true;
        }
        else {
            return false;
        }
    };
    EventDispatcher.prototype.removeEventListener = function (type, listener, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        // jabbany
        if (!this._listeners.has(type) || this._listeners.get(type).length === 0) {
            return;
        }
        var index = this._listeners.get(type).indexOf(listener);
        if (index >= 0) {
            this._listeners.get(type).splice(index, 1);
        }
    };
    EventDispatcher.prototype.hasEventListener = function (type) {
        return this._listeners.has(type);
    };
    EventDispatcher.prototype.willTrigger = function (type) {
        return this.hasEventListener(type) && this._listeners.get(type).length > 0;
    };
    EventDispatcher.prototype.dispose = function () {
        this._listeners.forEach(function (listeners) {
            while (listeners.length > 0) {
                listeners.pop();
            }
        });
        this._listeners.clear();
    };
    return EventDispatcher;
})();
exports.EventDispatcher = EventDispatcher;



},{"../../_util/_util":5}],53:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/21.
 */
var FlashEvent = (function () {
    function FlashEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        this.bubbles = false;
        this.cancelBubble = false;
        this.cancelable = false;
        this.currentTarget = null;
        this.defaultPrevented = false;
        this.eventPhase = -1;
        this.isTrusted = true;
        this.returnValue = false;
        this.srcElement = null;
        this.target = null;
        this.timeStamp = 0;
        this.type = null;
        this.AT_TARGET = 2;
        this.BUBBLING_PHASE = 0;
        this.CAPTURING_PHASE = 1;
        this.type = type;
        this.bubbles = bubbles;
        this.cancelable = cancelable;
    }
    FlashEvent.prototype.initEvent = function (eventTypeArg, canBubbleArg, cancelableArg) {
    };
    FlashEvent.prototype.preventDefault = function () {
    };
    FlashEvent.prototype.stopImmediatePropagation = function () {
    };
    FlashEvent.prototype.stopPropagation = function () {
    };
    FlashEvent.create = function (type) {
        var ev = new FlashEvent(type, false, false);
        ev.timeStamp = Date.now();
        return ev;
    };
    Object.defineProperty(FlashEvent, "ENTER_FRAME", {
        get: function () {
            return "enterFrame";
        },
        enumerable: true,
        configurable: true
    });
    return FlashEvent;
})();
exports.FlashEvent = FlashEvent;



},{}],54:[function(require,module,exports){
/**
 * Created by MIC on 2016/1/7.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NotImplementedError_1 = require("../../_util/NotImplementedError");
var FlashEvent_1 = require("./FlashEvent");
var TimerEvent = (function (_super) {
    __extends(TimerEvent, _super);
    function TimerEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    Object.defineProperty(TimerEvent, "TIMER", {
        get: function () {
            return 'timer';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimerEvent, "TIMER_COMPLETE", {
        get: function () {
            return 'timerComplete';
        },
        enumerable: true,
        configurable: true
    });
    TimerEvent.prototype.updateAfterEvent = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TimerEvent.prototype.clone = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    return TimerEvent;
})(FlashEvent_1.FlashEvent);
exports.TimerEvent = TimerEvent;



},{"../../_util/NotImplementedError":4,"./FlashEvent":53}],55:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./EventDispatcher"));
var FlashEvent_1 = require("./FlashEvent");
exports.Event = FlashEvent_1.FlashEvent;
__export(require("./TimerEvent"));



},{"./EventDispatcher":52,"./FlashEvent":53,"./TimerEvent":54}],56:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/30.
 */
var BitmapFilterQuality = (function () {
    function BitmapFilterQuality() {
    }
    Object.defineProperty(BitmapFilterQuality, "HIGH", {
        get: function () {
            return 3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitmapFilterQuality, "LOW", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitmapFilterQuality, "MEDIUM", {
        get: function () {
            return 2;
        },
        enumerable: true,
        configurable: true
    });
    return BitmapFilterQuality;
})();
exports.BitmapFilterQuality = BitmapFilterQuality;



},{}],57:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/30.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Blur2Filter_1 = require("../../webgl/filters/Blur2Filter");
var BitmapFilterQuality_1 = require("./BitmapFilterQuality");
/**
 * Derive from {@link BlurFilter} for better performance, or {@link Blur2Filter} for better quality.
 */
var BlurFilter = (function (_super) {
    __extends(BlurFilter, _super);
    function BlurFilter(filterManager, blurX, blurY, quality) {
        if (blurX === void 0) { blurX = 4.0; }
        if (blurY === void 0) { blurY = 4.0; }
        if (quality === void 0) { quality = BitmapFilterQuality_1.BitmapFilterQuality.LOW; }
        _super.call(this, filterManager);
        this.blurX = blurX;
        this.blurY = blurY;
        this.quality = quality;
    }
    Object.defineProperty(BlurFilter.prototype, "blurX", {
        get: function () {
            return this.strengthX;
        },
        set: function (v) {
            this.strengthX = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlurFilter.prototype, "blurY", {
        get: function () {
            return this.strengthY;
        },
        set: function (v) {
            this.strengthY = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlurFilter.prototype, "quality", {
        get: function () {
            return this.pass;
        },
        set: function (v) {
            this.pass = v;
        },
        enumerable: true,
        configurable: true
    });
    BlurFilter.prototype.clone = function () {
        return new BlurFilter(this._filterManager, this.blurX, this.blurY, this.quality);
    };
    return BlurFilter;
})(Blur2Filter_1.Blur2Filter);
exports.BlurFilter = BlurFilter;



},{"../../webgl/filters/Blur2Filter":103,"./BitmapFilterQuality":56}],58:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/30.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GlowFilter_1 = require("../../webgl/filters/GlowFilter");
var BitmapFilterQuality_1 = require("./BitmapFilterQuality");
var _util_1 = require("../../_util/_util");
var GlowFilter = (function (_super) {
    __extends(GlowFilter, _super);
    function GlowFilter(filterManager, color, alpha, blurX, blurY, strength, quality, inner, knockout) {
        if (color === void 0) { color = 0xff0000; }
        if (alpha === void 0) { alpha = 1.0; }
        if (blurX === void 0) { blurX = 6.0; }
        if (blurY === void 0) { blurY = 6.0; }
        if (strength === void 0) { strength = 2; }
        if (quality === void 0) { quality = BitmapFilterQuality_1.BitmapFilterQuality.LOW; }
        if (inner === void 0) { inner = false; }
        if (knockout === void 0) { knockout = false; }
        _super.call(this, filterManager);
        this.inner = false;
        this.knockout = false;
        this.strength = 2;
        this._color = 0x000000;
        this._alpha = 1;
        this.color = color;
        this.alpha = _util_1._util.limitInto(alpha, 0, 1);
        this.blurX = blurX;
        this.blurY = blurY;
        this.strength = strength;
        this.quality = quality;
        this.inner = inner;
        this.knockout = knockout;
    }
    Object.defineProperty(GlowFilter.prototype, "alpha", {
        get: function () {
            return this._alpha;
        },
        set: function (v) {
            var b = v !== this.alpha;
            this._alpha = v;
            if (b) {
                this.__updateColorMatrix();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlowFilter.prototype, "blurX", {
        get: function () {
            return this.strengthX;
        },
        set: function (v) {
            this.strengthX = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlowFilter.prototype, "blurY", {
        get: function () {
            return this.strengthY;
        },
        set: function (v) {
            this.strengthY = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlowFilter.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (v) {
            v |= 0;
            var b = v !== this._color;
            this._color = v;
            if (b) {
                this.__updateColorMatrix();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlowFilter.prototype, "quality", {
        get: function () {
            return this.pass;
        },
        set: function (v) {
            this.pass = v;
        },
        enumerable: true,
        configurable: true
    });
    GlowFilter.prototype.clone = function () {
        return new GlowFilter(this._filterManager, this.color, this.alpha, this.blurX, this.blurY, this.strength, this.quality, this.inner, this.knockout);
    };
    GlowFilter.prototype.__updateColorMatrix = function () {
        var r = ((this._color >>> 16) & 0xff) / 0xff;
        var g = ((this._color >>> 8) & 0xff) / 0xff;
        var b = (this._color & 0xff) / 0xff;
        var a = this._alpha;
        var cm = [
            0, 0, 0, r, 0,
            0, 0, 0, g, 0,
            0, 0, 0, b, 0,
            0, 0, 0, a, 0
        ];
        this.setColorMatrix(cm);
    };
    return GlowFilter;
})(GlowFilter_1.GlowFilter);
exports.GlowFilter = GlowFilter;



},{"../../_util/_util":5,"../../webgl/filters/GlowFilter":108,"./BitmapFilterQuality":56}],59:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/30.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./BitmapFilterQuality"));
__export(require("./BlurFilter"));
__export(require("./GlowFilter"));



},{"./BitmapFilterQuality":56,"./BlurFilter":57,"./GlowFilter":58}],60:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var _util_1 = require("../../_util/_util");
var NotImplementedError_1 = require("../../_util/NotImplementedError");
var ColorTransform = (function () {
    function ColorTransform(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
        if (redMultiplier === void 0) { redMultiplier = 1; }
        if (greenMultiplier === void 0) { greenMultiplier = 1; }
        if (blueMultiplier === void 0) { blueMultiplier = 1; }
        if (alphaMultiplier === void 0) { alphaMultiplier = 1; }
        if (redOffset === void 0) { redOffset = 0; }
        if (greenOffset === void 0) { greenOffset = 0; }
        if (blueOffset === void 0) { blueOffset = 0; }
        if (alphaOffset === void 0) { alphaOffset = 0; }
        this.color = 0;
        this._alphaMultiplier = 1;
        this._alphaOffset = 0;
        this._redMultiplier = 1;
        this._redOffset = 0;
        this._greenMultiplier = 1;
        this._greenOffset = 0;
        this._blueMultiplier = 1;
        this._blueOffset = 0;
        this.redMultiplier = redMultiplier;
        this.greenMultiplier = greenMultiplier;
        this.blueMultiplier = blueMultiplier;
        this.alphaMultiplier = alphaMultiplier;
        this.redOffset = redOffset;
        this.greenOffset = greenOffset;
        this.blueOffset = blueOffset;
        this.alphaOffset = alphaOffset;
    }
    Object.defineProperty(ColorTransform.prototype, "alphaMultiplier", {
        get: function () {
            return this._alphaMultiplier;
        },
        set: function (v) {
            this._alphaMultiplier = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "alphaOffset", {
        get: function () {
            return this._alphaOffset;
        },
        set: function (v) {
            this._alphaOffset = _util_1._util.limitInto(v, -1, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "redMultiplier", {
        get: function () {
            return this._redMultiplier;
        },
        set: function (v) {
            this._redMultiplier = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "redOffset", {
        get: function () {
            return this._redOffset;
        },
        set: function (v) {
            this._redOffset = _util_1._util.limitInto(v, -1, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "greenMultiplier", {
        get: function () {
            return this._greenMultiplier;
        },
        set: function (v) {
            this._greenMultiplier = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "greenOffset", {
        get: function () {
            return this._greenOffset;
        },
        set: function (v) {
            this._greenOffset = _util_1._util.limitInto(v, -1, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "blueMultiplier", {
        get: function () {
            return this._blueMultiplier;
        },
        set: function (v) {
            this._blueMultiplier = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorTransform.prototype, "blueOffset", {
        get: function () {
            return this._blueOffset;
        },
        set: function (v) {
            this._blueOffset = _util_1._util.limitInto(v, -1, 1);
        },
        enumerable: true,
        configurable: true
    });
    ColorTransform.prototype.concat = function (second) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    return ColorTransform;
})();
exports.ColorTransform = ColorTransform;



},{"../../_util/NotImplementedError":4,"../../_util/_util":5}],61:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var Point_1 = require("./Point");
var _util_1 = require("../../_util/_util");
var NotImplementedError_1 = require("../../_util/NotImplementedError");
var Matrix = (function () {
    function Matrix(a, b, c, d, tx, ty) {
        if (a === void 0) { a = 1; }
        if (b === void 0) { b = 0; }
        if (c === void 0) { c = 1; }
        if (d === void 0) { d = 1; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        this._data = [a, c, tx, b, d, ty, 0, 0, 1];
    }
    Object.defineProperty(Matrix.prototype, "a", {
        get: function () {
            return this._data[0];
        },
        set: function (v) {
            this._data[0] = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "b", {
        get: function () {
            return this._data[3];
        },
        set: function (v) {
            this._data[3] = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "c", {
        get: function () {
            return this._data[1];
        },
        set: function (v) {
            this._data[1] = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "d", {
        get: function () {
            return this._data[4];
        },
        set: function (v) {
            this._data[4] = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "tx", {
        get: function () {
            return this._data[2];
        },
        set: function (v) {
            this._data[2] = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "ty", {
        get: function () {
            return this._data[5];
        },
        set: function (v) {
            this._data[5] = v;
        },
        enumerable: true,
        configurable: true
    });
    Matrix.prototype.clone = function () {
        return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
    };
    Matrix.prototype.concat = function (m) {
        this._data = Matrix.dotProduct(this._data, m._data);
    };
    Matrix.prototype.copyColumnFrom = function (column, vector3D) {
        if (column < 0 || column > 2) {
            throw new RangeError('Column must be 0, 1, or 2.');
        }
        this._data[column * 3] = vector3D.x;
        this._data[1 + column * 3] = vector3D.y;
        this._data[2 + column * 3] = vector3D.z;
    };
    Matrix.prototype.copyColumnTo = function (column, vector3D) {
        if (column < 0 || column > 2) {
            throw new RangeError('Column must be 0, 1, or 2.');
        }
        vector3D.x = this._data[column * 3];
        vector3D.y = this._data[1 + column * 3];
        vector3D.z = this._data[2 + column * 3];
    };
    Matrix.prototype.copyFrom = function (sourceMatrix) {
        this._data = sourceMatrix._data.slice();
    };
    Matrix.prototype.copyRowFrom = function (row, vector3D) {
        if (row < 0 || row > 2) {
            throw new RangeError('Row must be 0, 1, or 2.');
        }
        this._data[row] = vector3D.x;
        this._data[row + 3] = vector3D.y;
        this._data[row + 6] = vector3D.z;
    };
    Matrix.prototype.copyRowTo = function (row, vector3D) {
        if (row < 0 || row > 2) {
            throw new RangeError('Column must be 0, 1, or 2.');
        }
        vector3D.x = this._data[row];
        vector3D.y = this._data[3 + row];
        vector3D.z = this._data[6 + row];
    };
    Matrix.prototype.createBox = function (scaleX, scaleY, rotation, tx, ty) {
        if (rotation === void 0) { rotation = 0; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        this.identity();
        this.rotate(rotation);
        this.scale(scaleX, scaleY);
        this.translate(tx, ty);
    };
    Matrix.prototype.createGradientBox = function (width, height, rotation, tx, ty) {
        if (rotation === void 0) { rotation = 0; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        this.createBox(width, height, rotation, tx, ty);
    };
    Matrix.prototype.deltaTransformPoint = function (point) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Matrix.prototype.identity = function () {
        this._data = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    };
    Matrix.prototype.invert = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Matrix.prototype.rotate = function (angle) {
        this._data = Matrix.dotProduct(this._data, [
            Math.cos(angle), -Math.sin(angle), 0,
            Math.sin(angle), Math.cos(angle), 0,
            0, 0, 1
        ]);
    };
    Matrix.prototype.scale = function (sx, sy) {
        this._data = Matrix.dotProduct(this._data, [
            sx, 0, 0,
            0, sy, 0,
            0, 0, 1
        ]);
    };
    Matrix.prototype.skew = function (skewX, skewY) {
        this._data = Matrix.dotProduct(this._data, [
            0, Math.tan(skewX), 0,
            Math.tan(skewY), 0, 0,
            0, 0, 1
        ]);
    };
    Matrix.prototype.setTo = function (aa, ba, ca, da, txa, tya) {
        this._data = [aa, ca, txa, ba, da, tya, 0, 0, 1];
    };
    Matrix.prototype.toString = function () {
        return _util_1._util.formatString("[{0} {1} 0\r\n{2} {3} 0\r\n{4} {5} 1]", this.a, this.b, this.c, this.d, this.tx, this.ty);
    };
    Matrix.prototype.transformPoint = function (point) {
        // 由于 Flash 所用的矩阵是转置过的，所以这里变成了行×行
        //var pointVector = [point.x, point.y, 1];
        //var x = pointVector[0] * this._data[0] + pointVector[1] * this._data[1] + pointVector[2] * this._data[2];
        //var y = pointVector[0] * this._data[3] + pointVector[1] * this._data[4] + pointVector[2] * this._data[5];
        //return new Point(x, y);
        return new Point_1.Point(point.x * this._data[0] + point.y * this._data[1] + this._data[2], point.x * this._data[3] + point.y * this._data[4] + this._data[5]);
    };
    Matrix.prototype.translate = function (dx, dy) {
        this.tx += dx;
        this.ty += dy;
    };
    Matrix.dotProduct = function (a, b) {
        if (b.length != 9) {
            throw new Error('Matrix dot product requires a 3x3 matrix.');
        }
        var result = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    result[i * 3 + j] += a[i * 3 + k] * b[k * 3 + j];
                }
            }
        }
        return result;
    };
    return Matrix;
})();
exports.Matrix = Matrix;



},{"../../_util/NotImplementedError":4,"../../_util/_util":5,"./Point":65}],62:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var Vector3D_1 = require("./Vector3D");
var ArgumentError_1 = require("../../_util/ArgumentError");
var NotImplementedError_1 = require("../../_util/NotImplementedError");
var Orientation3D_1 = require("./Orientation3D");
var ApplicationError_1 = require("../../_util/ApplicationError");
var _util_1 = require("../../_util/_util");
var Matrix3D = (function () {
    function Matrix3D(v) {
        if (v === void 0) { v = null; }
        this.position = null;
        this._data = null;
        if (v === null || v.length <= 0) {
            v = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
        }
        this.rawData = v;
    }
    Object.defineProperty(Matrix3D.prototype, "determinant", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix3D.prototype, "rawData", {
        get: function () {
            return this._data;
        },
        set: function (v) {
            if (v.length < 16) {
                throw new Error("Data length of Matrix3D must be no less than 16.");
            }
            this._data = v.slice();
        },
        enumerable: true,
        configurable: true
    });
    Matrix3D.prototype.append = function (lhs) {
        this._data = Matrix3D.dotProduct(lhs._data, this._data);
    };
    Matrix3D.prototype.appendRotation = function (degrees, axis, pivotPoint) {
        if (pivotPoint === void 0) { pivotPoint = null; }
        if (pivotPoint !== null) {
            this.appendTranslation(pivotPoint.x, pivotPoint.y, pivotPoint.z);
        }
        this._data = Matrix3D.dotProduct(Matrix3D.getRotationMatrix(degrees * Math.PI / 180, axis), this._data);
        if (pivotPoint !== null) {
            this.appendTranslation(-pivotPoint.x, -pivotPoint.y, -pivotPoint.z);
        }
    };
    Matrix3D.prototype.appendScale = function (xScale, yScale, zScale) {
        this._data = Matrix3D.dotProduct([
            xScale, 0, 0, 0,
            0, yScale, 0, 0,
            0, 0, zScale, 0,
            0, 0, 0, 1
        ], this._data);
    };
    Matrix3D.prototype.appendTranslation = function (x, y, z) {
        this._data = Matrix3D.dotProduct([
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1
        ], this._data);
    };
    Matrix3D.prototype.clone = function () {
        var m = new Matrix3D(this.rawData);
        m.position = this.position !== null ? this.position.clone() : null;
        return m;
    };
    Matrix3D.prototype.copyColumnFrom = function (column, vector3D) {
        if (column < 0 || column > 3) {
            throw new RangeError("Column must be 0, 1, 2 or 3.");
        }
        this._data[column * 4] = vector3D.x;
        this._data[column * 4 + 1] = vector3D.y;
        this._data[column * 4 + 2] = vector3D.z;
        this._data[column * 4 + 3] = vector3D.w;
    };
    Matrix3D.prototype.copyColumnTo = function (column, vector3D) {
        if (column < 0 || column > 3) {
            throw new RangeError("Column must be 0, 1, 2 or 3.");
        }
        vector3D.x = this._data[column * 4];
        vector3D.y = this._data[column * 4 + 1];
        vector3D.z = this._data[column * 4 + 2];
        vector3D.w = this._data[column * 4 + 3];
    };
    Matrix3D.prototype.copyFrom = function (sourceMatrix3D) {
        this.position = sourceMatrix3D.position !== null ? sourceMatrix3D.position.clone() : null;
        this.rawData = sourceMatrix3D.rawData;
    };
    Matrix3D.prototype.copyRawDataFrom = function (vector, index, transpose) {
        if (index === void 0) { index = 0; }
        if (transpose === void 0) { transpose = false; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Matrix3D.prototype.copyRawDataTo = function (vector, index, transpose) {
        if (index === void 0) { index = 0; }
        if (transpose === void 0) { transpose = false; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Matrix3D.prototype.copyRowFrom = function (row, vector3D) {
        if (row < 0 || row > 3) {
            throw new RangeError("Row must be 0, 1, 2 or 3.");
        }
        this._data[row] = vector3D.x;
        this._data[row + 4] = vector3D.y;
        this._data[row + 8] = vector3D.z;
        this._data[row + 12] = vector3D.w;
    };
    Matrix3D.prototype.copyRowTo = function (row, vector3D) {
        if (row < 0 || row > 3) {
            throw new RangeError("Row must be 0, 1, 2 or 3.");
        }
        vector3D.x = this._data[row];
        vector3D.y = this._data[row + 4];
        vector3D.z = this._data[row + 8];
        vector3D.w = this._data[row + 12];
    };
    Matrix3D.prototype.copyToMatrix3D = function (dest) {
        dest.position = this.position !== null ? this.position.clone() : null;
        dest.rawData = this.rawData;
    };
    Matrix3D.prototype.decompose = function (orientationStyle) {
        if (orientationStyle === void 0) { orientationStyle = Orientation3D_1.Orientation3D.EULER_ANGLES; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Matrix3D.prototype.deltaTransformVector = function (v) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Matrix3D.prototype.identity = function () {
        this._data = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    };
    Matrix3D.interpolate = function (thisMat, toMat, percent) {
        percent = _util_1._util.limitInto(percent, 0, 1);
        var data = [];
        for (var i = 0; i < 16; i++) {
            data.push(thisMat._data[i] * (1 - percent) + toMat._data[i] * percent);
        }
        return new Matrix3D(data);
    };
    Matrix3D.prototype.interpolateTo = function (toMat, percent) {
        return Matrix3D.interpolate(this, toMat, percent);
    };
    Matrix3D.prototype.invert = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Matrix3D.prototype.pointAt = function (pos, at, up) {
        if (at === void 0) { at = Vector3D_1.Vector3D.ORIGIN; }
        if (up === void 0) { up = Vector3D_1.Vector3D.Z_AXIS; }
        var fx = at.x - pos.x;
        var fy = at.y - pos.y;
        var fz = at.z - pos.z;
        var rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
        fx *= rlf;
        fy *= rlf;
        fz *= rlf;
        var sx = fy * up.z - fz * up.y;
        var sy = fz * up.x - fx * up.z;
        var sz = fx * up.y - fy * up.x;
        var rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
        sx *= rls;
        sy *= rls;
        sz *= rls;
        var ux = sy * fz - sz * fy;
        var uy = sz * fx - sx * fz;
        var uz = sx * fy - sy * fx;
        var d = this._data;
        d[0] = sx;
        d[1] = sy;
        d[2] = sz;
        d[3] = 0;
        d[4] = ux;
        d[5] = uy;
        d[6] = uz;
        d[7] = 0;
        d[8] = -fx;
        d[9] = -fy;
        d[10] = -fz;
        d[11] = 0;
        d[12] = 0;
        d[13] = 0;
        d[14] = 0;
        d[15] = 1;
        // translate(-pos.x, -pos.y, -pos.z)
        var x = -pos.x, y = -pos.y, z = -pos.z;
        d[3] += d[0] * x + d[1] * y + d[2] * z;
        d[7] += d[4] * x + d[5] * y + d[6] * z;
        d[11] += d[8] * x + d[9] * y + d[10] * z;
        d[15] += d[12] * x + d[13] * y + d[14] * z;
    };
    Matrix3D.prototype.prepend = function (rhs) {
        this._data = Matrix3D.dotProduct(this._data, rhs._data);
    };
    Matrix3D.prototype.prependRotation = function (degrees, axis, pivotPoint) {
        if (pivotPoint === void 0) { pivotPoint = null; }
        if (pivotPoint !== null) {
            this.prependTranslation(pivotPoint.x, pivotPoint.y, pivotPoint.z);
        }
        this._data = Matrix3D.dotProduct(this._data, Matrix3D.getRotationMatrix(degrees * Math.PI / 180, axis));
        if (pivotPoint !== null) {
            this.prependTranslation(-pivotPoint.x, -pivotPoint.y, -pivotPoint.z);
        }
    };
    Matrix3D.prototype.prependScale = function (xScale, yScale, zScale) {
        this._data = Matrix3D.dotProduct(this._data, [
            xScale, 0, 0, 0,
            0, yScale, 0, 0,
            0, 0, zScale, 0,
            0, 0, 0, 1
        ]);
    };
    Matrix3D.prototype.prependTranslation = function (x, y, z) {
        this._data = Matrix3D.dotProduct(this._data, [
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1
        ]);
    };
    Matrix3D.prototype.recompose = function (components, orientationStyle) {
        if (orientationStyle === void 0) { orientationStyle = Orientation3D_1.Orientation3D.EULER_ANGLES; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Matrix3D.prototype.transformVector = function (v) {
        var x = this._data[0] * v.x + this._data[1] * v.y + this._data[2] * v.z + this._data[3] * v.w;
        var y = this._data[4] * v.x + this._data[5] * v.y + this._data[6] * v.z + this._data[7] * v.w;
        var z = this._data[8] * v.x + this._data[9] * v.y + this._data[10] * v.z + this._data[11] * v.w;
        var w = this._data[12] * v.x + this._data[13] * v.y + this._data[14] * v.z + this._data[15] * v.w;
        return new Vector3D_1.Vector3D(x, y, z, w);
    };
    Matrix3D.prototype.transformVectors = function (vin, vout) {
        if (vin.length % 3 !== 0) {
            throw new ApplicationError_1.ApplicationError("Matrix3D.transformVectors needs 2 arrays, size of the input array must be multiple of 3.");
        }
        for (var i = 0; i < vin.length / 3; i++) {
            var x = vin[i * 3], y = vin[i * 3 + 1], z = vin[i * 3 + 2];
            var rx = this._data[0] * x + this._data[1] * y + this._data[2] * z;
            var ry = this._data[4] * x + this._data[5] * y + this._data[6] * z;
            var rz = this._data[8] * x + this._data[9] * y + this._data[10] * z;
            vout.push(rx, ry, rz);
        }
    };
    Matrix3D.prototype.transpose = function () {
        var d = this._data;
        this._data = [
            d[0], d[4], d[8], d[12],
            d[1], d[5], d[9], d[13],
            d[2], d[6], d[10], d[14],
            d[3], d[7], d[11], d[15]
        ];
    };
    Matrix3D.prototype.setTransformTo = function (x, y, z) {
        var d = this._data;
        d[3] = x;
        d[7] = y;
        d[11] = z;
    };
    Matrix3D.prototype.toArray = function () {
        var d = this._data;
        // Matrix3D is stored in row-major order, while WebGL is in column-major order.
        return new Float32Array([
            d[0], d[4], d[8], d[12],
            d[1], d[5], d[9], d[13],
            d[2], d[6], d[10], d[14],
            d[3], d[7], d[11], d[15]
        ]);
    };
    Matrix3D.prototype.setOrthographicProjection = function (left, right, top, bottom, near, far) {
        if (left === right || top === bottom || near === far) {
            throw new ArgumentError_1.ArgumentError("Null frustum");
        }
        var rw = 1 / (right - left);
        var rh = 1 / (top - bottom);
        var rd = 1 / (far - near);
        var d = this._data;
        d[0] = 2 * rw;
        d[1] = 0;
        d[2] = 0;
        d[3] = -(left + right) * rw;
        d[4] = 0;
        d[5] = 2 * rh;
        d[6] = 0;
        d[7] = -(top + bottom) * rh;
        d[8] = 0;
        d[9] = 0;
        d[10] = -2 * rd;
        d[11] = -(near + far) * rd;
        d[12] = 0;
        d[13] = 0;
        d[14] = 0;
        d[15] = 1;
    };
    Matrix3D.prototype.setPerspectiveProjection = function (fov, aspect, near, far) {
        if (near === far || aspect === 0) {
            throw new ArgumentError_1.ArgumentError("Null frustum");
        }
        if (near <= 0) {
            throw new ArgumentError_1.ArgumentError("near <= 0");
        }
        if (far <= 0) {
            throw new ArgumentError_1.ArgumentError("far <= 0");
        }
        fov = Math.PI / 2 * fov / 180;
        var s = Math.sin(fov);
        if (s === 0) {
            throw new ArgumentError_1.ArgumentError("Null frustum");
        }
        var rd = 1 / (far - near);
        var ct = Math.cos(fov) / s;
        var d = this._data;
        d[0] = ct / aspect;
        d[1] = 0;
        d[2] = 0;
        d[3] = 0;
        d[4] = 0;
        d[5] = ct;
        d[6] = 0;
        d[7] = 0;
        d[8] = 0;
        d[9] = 0;
        d[10] = -(far + near) * rd;
        d[11] = -2 * near * far * rd;
        d[12] = 0;
        d[13] = 0;
        d[14] = -1;
        d[15] = 0;
    };
    Matrix3D.dotProduct = function (a, b) {
        if (a.length !== 16 || b.length !== 16) {
            throw new Error("Matrix3D dot product needs a array of 16 elements.");
        }
        var res = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                for (var k = 0; k < 4; k++) {
                    res[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
                }
            }
        }
        return res;
    };
    Matrix3D.getRotationMatrix = function (angle, axis) {
        // jabbany
        var sT = Math.sin(angle), cT = Math.cos(angle);
        return [
            cT + axis.x * axis.x * (1 - cT), axis.x * axis.y * (1 - cT) - axis.z * sT, axis.x * axis.z * (1 - cT) + axis.y * sT, 0,
            axis.x * axis.y * (1 - cT) + axis.z * sT, cT + axis.y * axis.y * (1 - cT), axis.y * axis.z * (1 - cT) - axis.x * sT, 0,
            axis.z * axis.x * (1 - cT) - axis.y * sT, axis.z * axis.y * (1 - cT) + axis.x * sT, cT + axis.z * axis.z * (1 - cT), 0,
            0, 0, 0, 1
        ];
    };
    return Matrix3D;
})();
exports.Matrix3D = Matrix3D;



},{"../../_util/ApplicationError":2,"../../_util/ArgumentError":3,"../../_util/NotImplementedError":4,"../../_util/_util":5,"./Orientation3D":63,"./Vector3D":68}],63:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var Orientation3D = (function () {
    function Orientation3D() {
    }
    Object.defineProperty(Orientation3D, "AXIS_ANGLE", {
        get: function () {
            return "axisAngle";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Orientation3D, "EULER_ANGLES", {
        get: function () {
            return "eulerAngles";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Orientation3D, "QUATERNION", {
        get: function () {
            return "quaternion";
        },
        enumerable: true,
        configurable: true
    });
    return Orientation3D;
})();
exports.Orientation3D = Orientation3D;



},{}],64:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var NotImplementedError_1 = require("../../_util/NotImplementedError");
var Point_1 = require("./Point");
var _util_1 = require("../../_util/_util");
var PerspectiveProjection = (function () {
    function PerspectiveProjection() {
        this.focalLength = 10;
        this.projectionCenter = null;
        this._fieldOfView = 90;
        this.projectionCenter = new Point_1.Point();
    }
    Object.defineProperty(PerspectiveProjection.prototype, "fieldOfView", {
        get: function () {
            return this._fieldOfView;
        },
        set: function (v) {
            this._fieldOfView = _util_1._util.limitInto(v, 0, 180);
        },
        enumerable: true,
        configurable: true
    });
    PerspectiveProjection.prototype.toMatrix3D = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    return PerspectiveProjection;
})();
exports.PerspectiveProjection = PerspectiveProjection;



},{"../../_util/NotImplementedError":4,"../../_util/_util":5,"./Point":65}],65:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var _util_1 = require("../../_util/_util");
var Point = (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    Point.prototype.add = function (v) {
        return new Point(this.x + v.x, this.y + v.y);
    };
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    Point.prototype.copyFrom = function (sourcePoint) {
        this.x = sourcePoint.x;
        this.y = sourcePoint.y;
    };
    Point.distance = function (pt1, pt2) {
        return Math.sqrt((pt1.x - pt2.x) * (pt1.x - pt2.x) + (pt1.y - pt2.y) * (pt1.y - pt2.y));
    };
    Point.prototype.equals = function (toCompare) {
        return this.x === toCompare.x && this.y === toCompare.y;
    };
    Point.interpolate = function (pt1, pt2, f) {
        f = _util_1._util.limitInto(f, 0, 1);
        return new Point(pt1.x * f + pt2.x * (1 - f), pt1.y * f + pt2.y * (1 - f));
    };
    Object.defineProperty(Point.prototype, "length", {
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        enumerable: true,
        configurable: true
    });
    Point.prototype.normalize = function (thickness) {
        var len = this.length;
        if (len > 0) {
            this.x *= thickness / len;
            this.y *= thickness / len;
        }
    };
    Point.prototype.offset = function (dx, dy) {
        this.x += dx;
        this.y += dy;
    };
    Point.polar = function (len, angle) {
        return new Point(len * Math.cos(angle), len * Math.sin(angle));
    };
    Point.prototype.setTo = function (xa, ya) {
        this.x = xa;
        this.y = ya;
    };
    Point.prototype.subtract = function (v) {
        return new Point(this.x - v.x, this.y - v.y);
    };
    Point.prototype.toString = function () {
        return _util_1._util.formatString("(X={0}, y={1})", this.x, this.y);
    };
    return Point;
})();
exports.Point = Point;



},{"../../_util/_util":5}],66:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var Point_1 = require("./Point");
var _util_1 = require("../../_util/_util");
var Rectangle = (function () {
    function Rectangle(x, y, width, height) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        this._x = 0;
        this._y = 0;
        this._w = 0;
        this._h = 0;
        this._x = x >= 0 ? x : 0;
        this._y = y >= 0 ? y : 0;
        this._w = width >= 0 ? width : 0;
        this._h = height >= 0 ? height : 0;
    }
    Object.defineProperty(Rectangle.prototype, "bottom", {
        get: function () {
            return this._y + this._h;
        },
        set: function (v) {
            if (v < this._y) {
                v = this._y;
            }
            this._h = v - this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "bottomRight", {
        get: function () {
            return new Point_1.Point(this._x + this._w, this._y + this._h);
        },
        set: function (v) {
            this.right = v.x;
            this.bottom = v.y;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.clone = function () {
        return new Rectangle(this._x, this._y, this._w, this._h);
    };
    Rectangle.prototype.contains = function (x, y) {
        return this.left <= x && x <= this.right && this.top <= y && y <= this.bottom;
    };
    Rectangle.prototype.containsPoint = function (point) {
        return this.contains(point.x, point.y);
    };
    Rectangle.prototype.containsRect = function (rect) {
        return this.containsPoint(rect.topLeft) && this.containsPoint(rect.bottomRight);
    };
    Rectangle.prototype.copyFrom = function (sourceRect) {
        this._x = sourceRect._x;
        this._y = sourceRect._y;
        this._w = sourceRect._w;
        this._h = sourceRect._h;
    };
    Rectangle.prototype.equals = function (toCompare) {
        return this._x == toCompare._x && this._y == toCompare._y && this._w == toCompare._w && this._h == toCompare._h;
    };
    Object.defineProperty(Rectangle.prototype, "height", {
        get: function () {
            return this._h;
        },
        set: function (v) {
            this._h = v >= 0 ? v : 0;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.inflate = function (dx, dy) {
        // TODO: bug when dx or dy is less than 0
        this.x -= dx;
        this.width += dx + dx;
        this.y -= dy;
        this.height += dy + dy;
    };
    Rectangle.prototype.inflatePoint = function (point) {
        this.inflate(point.x, point.y);
    };
    Rectangle.prototype.intersection = function (toIntersect) {
        var x;
        var y;
        var w;
        var h;
        var rect1;
        var rect2;
        if (this.left < toIntersect.left) {
            rect1 = this;
            rect2 = toIntersect;
        }
        else {
            rect1 = toIntersect;
            rect2 = this;
        }
        if (rect1.right < rect2.left) {
            return new Rectangle(); // Does not intersect
        }
        else {
            x = rect2.left;
            w = Math.min(rect1.right, rect2.right) - x;
        }
        if (this.top < toIntersect.top) {
            rect1 = this;
            rect2 = toIntersect;
        }
        else {
            rect1 = toIntersect;
            rect2 = this;
        }
        if (rect1.bottom < rect2.top) {
            return new Rectangle(); // Does not intersect
        }
        else {
            y = rect2.top;
            h = Math.min(rect1.bottom, rect2.bottom) - y;
        }
        return new Rectangle(x, y, w, h);
    };
    Rectangle.prototype.intersects = function (toIntersect) {
        var rect1;
        var rect2;
        if (this.left < toIntersect.left) {
            rect1 = this;
            rect2 = toIntersect;
        }
        else {
            rect1 = toIntersect;
            rect2 = this;
        }
        if (rect1.right < rect2.left) {
            return false;
        }
        if (this.top < toIntersect.top) {
            rect1 = this;
            rect2 = toIntersect;
        }
        else {
            rect1 = toIntersect;
            rect2 = this;
        }
        return rect1.bottom >= rect2.top;
    };
    Rectangle.prototype.isEmpty = function () {
        return this._w <= 0 || this._h <= 0;
    };
    Object.defineProperty(Rectangle.prototype, "left", {
        get: function () {
            return this._x;
        },
        set: function (v) {
            this._x = v >= 0 ? v : 0;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.offset = function (dx, dy) {
        this.x += dx;
        this.y += dy;
    };
    Rectangle.prototype.offsetPoint = function (point) {
        this.offset(point.x, point.y);
    };
    Object.defineProperty(Rectangle.prototype, "right", {
        get: function () {
            return this._x + this._w;
        },
        set: function (v) {
            if (v < this._x) {
                v = this._x;
            }
            this._w = v - this._x;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.setEmpty = function () {
        this._x = this._y = this._w = this._h = 0;
    };
    Rectangle.prototype.setTo = function (xa, ya, widtha, heighta) {
        this.x = xa;
        this.y = ya;
        this.width = widtha;
        this.height = heighta;
    };
    Object.defineProperty(Rectangle.prototype, "size", {
        get: function () {
            return new Point_1.Point(this._w, this._h);
        },
        set: function (v) {
            this._w = v.x;
            this._h = v.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "top", {
        get: function () {
            return this._y;
        },
        set: function (v) {
            if (v > this._y + this._h) {
                v = this._y + this._h;
            }
            this._h = this._y + this._h - v;
            this._y = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "topLeft", {
        get: function () {
            return new Point_1.Point(this._x, this._y);
        },
        set: function (v) {
            this.left = v.x;
            this.top = v.y;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.toString = function () {
        return _util_1._util.formatString('{x={0}, y={1}, w={2}, h={3}}', this.x, this.y, this.width, this.height);
    };
    Rectangle.prototype.union = function (toUnion) {
        var x = Math.min(this.x, toUnion.x);
        var y = Math.min(this.y, toUnion.y);
        var r = Math.max(this.right, toUnion.right);
        var b = Math.max(this.bottom, toUnion.bottom);
        return new Rectangle(x, y, r - x, b - y);
    };
    Object.defineProperty(Rectangle.prototype, "width", {
        get: function () {
            return this._w;
        },
        set: function (v) {
            this._w = v >= 0 ? v : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (v) {
            this._x = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (v) {
            this._y = v;
        },
        enumerable: true,
        configurable: true
    });
    return Rectangle;
})();
exports.Rectangle = Rectangle;



},{"../../_util/_util":5,"./Point":65}],67:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var NotImplementedError_1 = require("../../_util/NotImplementedError");
var Matrix3D_1 = require("./Matrix3D");
var ColorTransform_1 = require("./ColorTransform");
var Matrix_1 = require("./Matrix");
var PerspectiveProjection_1 = require("./PerspectiveProjection");
var Transform = (function () {
    function Transform() {
        this.colorTransform = null;
        this.matrix = null;
        this.matrix3D = null;
        this.perspectiveProjection = null;
        this._pixelBounds = null;
        this.matrix = new Matrix_1.Matrix();
        this.matrix3D = new Matrix3D_1.Matrix3D();
        this.colorTransform = new ColorTransform_1.ColorTransform();
        this.perspectiveProjection = new PerspectiveProjection_1.PerspectiveProjection();
    }
    Object.defineProperty(Transform.prototype, "concatenatedColorTransform", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "concatenatedMatrix", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "pixelBounds", {
        get: function () {
            return this._pixelBounds;
        },
        enumerable: true,
        configurable: true
    });
    Transform.prototype.getRelativeMatrix3D = function (relativeTo) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    return Transform;
})();
exports.Transform = Transform;



},{"../../_util/NotImplementedError":4,"./ColorTransform":60,"./Matrix":61,"./Matrix3D":62,"./PerspectiveProjection":64}],68:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var _util_1 = require("../../_util/_util");
var Vector3D = (function () {
    function Vector3D(x, y, z, w) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (w === void 0) { w = 0; }
        this.w = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    Object.defineProperty(Vector3D, "X_AXIS", {
        get: function () {
            return new Vector3D(1, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3D, "Y_AXIS", {
        get: function () {
            return new Vector3D(0, 1, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3D, "Z_AXIS", {
        get: function () {
            return new Vector3D(0, 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3D, "ORIGIN", {
        get: function () {
            return new Vector3D(0, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3D.prototype, "length", {
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3D.prototype, "lengthSquared", {
        get: function () {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        },
        enumerable: true,
        configurable: true
    });
    Vector3D.prototype.add = function (a) {
        return new Vector3D(this.x + a.x, this.y + a.y, this.z + a.z, this.w);
    };
    Vector3D.angleBetween = function (a, b) {
        var mulNom = a.x * b.x + a.y * b.y + a.z * b.z;
        var den = a.length * b.length;
        var val = Math.sqrt(mulNom * mulNom / den);
        return Math.acos(val);
    };
    Vector3D.prototype.clone = function () {
        return new Vector3D(this.x, this.y, this.z, this.w);
    };
    Vector3D.prototype.copyFrom = function (a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = a.w;
    };
    Vector3D.prototype.crossProduct = function (a) {
        var i = this.y * a.z - this.z * a.y;
        var j = this.z * a.x - this.x * a.z;
        var k = this.x * a.y - this.y * a.x;
        return new Vector3D(i, j, k, this.w);
    };
    Vector3D.prototype.decrementBy = function (a) {
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
    };
    Vector3D.distance = function (pt1, pt2) {
        return Math.sqrt((pt1.x - pt2.x) * (pt1.x - pt2.x) + (pt1.y - pt2.y) * (pt1.y - pt2.y) + (pt1.z - pt2.z) * (pt1.z - pt2.z));
    };
    Vector3D.prototype.dotProduct = function (a) {
        return this.x * a.x + this.y * a.y + this.z * a.z;
    };
    Vector3D.prototype.equals = function (toCompare, allFour) {
        if (allFour === void 0) { allFour = false; }
        return this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.y && !(allFour && this.w != toCompare.w);
    };
    Vector3D.prototype.incrementBy = function (a) {
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
    };
    Vector3D.prototype.nearEquals = function (toCompare, tolerance, allFour) {
        if (allFour === void 0) { allFour = false; }
        return _util_1._util.isValueBetweenNotEquals(this.x, toCompare.x - tolerance, toCompare.x + tolerance) &&
            _util_1._util.isValueBetweenNotEquals(this.y, toCompare.y - tolerance, toCompare.y + tolerance) &&
            _util_1._util.isValueBetweenNotEquals(this.z, toCompare.z - tolerance, toCompare.z + tolerance) && !(allFour && !_util_1._util.isValueBetweenNotEquals(this.w, toCompare.w - tolerance, toCompare.w + tolerance));
    };
    Vector3D.prototype.negate = function () {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
    };
    Vector3D.prototype.normalize = function () {
        var len = this.length;
        if (len > 0) {
            this.x /= len;
            this.y /= len;
            this.z /= len;
        }
        return len;
    };
    Vector3D.prototype.project = function () {
        if (this.w != null && this.w != 0) {
            this.x /= this.w;
            this.y /= this.w;
            this.z /= this.w;
        }
    };
    Vector3D.prototype.scaleBy = function (s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
    };
    Vector3D.prototype.setTo = function (xa, ya, za) {
        this.x = xa;
        this.y = ya;
        this.z = za;
    };
    Vector3D.prototype.subtract = function (a) {
        return new Vector3D(this.x - a.x, this.y - a.y, this.z - a.z, this.w);
    };
    Vector3D.prototype.toString = function () {
        return _util_1._util.formatString("[x={0}, y={1}, z={2}, w={3}]", this.x, this.y, this.z, this.w);
    };
    return Vector3D;
})();
exports.Vector3D = Vector3D;



},{"../../_util/_util":5}],69:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./ColorTransform"));
__export(require("./Matrix"));
__export(require("./Matrix3D"));
__export(require("./Orientation3D"));
__export(require("./PerspectiveProjection"));
__export(require("./Point"));
__export(require("./Rectangle"));
__export(require("./Transform"));
__export(require("./Vector3D"));



},{"./ColorTransform":60,"./Matrix":61,"./Matrix3D":62,"./Orientation3D":63,"./PerspectiveProjection":64,"./Point":65,"./Rectangle":66,"./Transform":67,"./Vector3D":68}],70:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var display = require("./display/index");
exports.display = display;
var events = require("./events/index");
exports.events = events;
var geom = require("./geom/index");
exports.geom = geom;
var filters = require("./filters/index");
exports.filters = filters;
var text = require("./text/index");
exports.text = text;
var utils = require("./utils/index");
exports.utils = utils;



},{"./display/index":51,"./events/index":55,"./filters/index":59,"./geom/index":69,"./text/index":81,"./utils/index":83}],71:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
var AntiAliasType = (function () {
    function AntiAliasType() {
    }
    Object.defineProperty(AntiAliasType, "ADVANCED", {
        get: function () {
            return "advanced";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AntiAliasType, "NORMAL", {
        get: function () {
            return "normal";
        },
        enumerable: true,
        configurable: true
    });
    return AntiAliasType;
})();
exports.AntiAliasType = AntiAliasType;



},{}],72:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
var GridFitType = (function () {
    function GridFitType() {
    }
    Object.defineProperty(GridFitType, "NONE", {
        get: function () {
            return "none";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridFitType, "PIXEL", {
        get: function () {
            return "pixel";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridFitType, "SUBPIXEL", {
        get: function () {
            return "subpixel";
        },
        enumerable: true,
        configurable: true
    });
    return GridFitType;
})();
exports.GridFitType = GridFitType;



},{}],73:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NotImplementedError_1 = require("../../_util/NotImplementedError");
var EventDispatcher_1 = require("../events/EventDispatcher");
var StyleSheet = (function (_super) {
    __extends(StyleSheet, _super);
    function StyleSheet() {
        _super.call(this);
        throw new NotImplementedError_1.NotImplementedError();
    }
    StyleSheet.prototype.clear = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    StyleSheet.prototype.getStyle = function (styleName) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    StyleSheet.prototype.parseCSS = function (cssText) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    StyleSheet.prototype.setStyle = function (styleName, styleObject) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    StyleSheet.prototype.transform = function (formatObject) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    StyleSheet.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        throw new NotImplementedError_1.NotImplementedError();
    };
    Object.defineProperty(StyleSheet.prototype, "styleNames", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    return StyleSheet;
})(EventDispatcher_1.EventDispatcher);
exports.StyleSheet = StyleSheet;



},{"../../_util/NotImplementedError":4,"../events/EventDispatcher":52}],74:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InteractiveObject_1 = require("../display/InteractiveObject");
var AntiAliasType_1 = require("./AntiAliasType");
var TextFieldAutoSize_1 = require("./TextFieldAutoSize");
var TextFormat_1 = require("./TextFormat");
var GridFitType_1 = require("./GridFitType");
var NotImplementedError_1 = require("../../_util/NotImplementedError");
var TextInteractionMode_1 = require("./TextInteractionMode");
var TextFieldType_1 = require("./TextFieldType");
var ShaderID_1 = require("../../webgl/ShaderID");
var RenderHelper_1 = require("../../webgl/RenderHelper");
var _util_1 = require("../../_util/_util");
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField(root, parent) {
        _super.call(this, root, parent);
        this.alwaysShowSelection = false;
        this.antiAliasType = AntiAliasType_1.AntiAliasType.NORMAL;
        this.autoSize = TextFieldAutoSize_1.TextFieldAutoSize.NONE;
        this.condenseWhite = false;
        this.displayAsPassword = false;
        this.embedFonts = false;
        this.gridFitType = GridFitType_1.GridFitType.PIXEL;
        this.htmlText = null;
        this.maxChars = 0;
        this.mouseWheelEnabled = true;
        this.multiline = true;
        this.restrict = null;
        this.scrollH = 0;
        this.scrollV = 1;
        this.selectable = true;
        this.sharpness = 0;
        this.styleSheet = null;
        /**
         * When set to true, outline color will not change when setting {@link textColor}, enabling drawing a
         * colorful outline. The default value is false.
         * Non-standard extension.
         * @type {Boolean}
         */
        this.customOutlineEnabled = false;
        this.textInteractionMode = TextInteractionMode_1.TextInteractionMode.NORMAL;
        this.type = TextFieldType_1.TextFieldType.DYNAMIC;
        this.useRichTextClipboard = false;
        this.wordWrap = false;
        this._textFormatChangedHandler = null;
        this._defaultTextFormat = null;
        this._isContentChanged = true;
        this._canvasTarget = null;
        this._canvas = null;
        this._context2D = null;
        this._text = null;
        this._background = false;
        this._backgroundColor = 0xffffff;
        this._border = false;
        this._borderColor = 0x000000;
        this._textColor = 0x000000;
        this._textOutlineColor = 0x000000;
        this._thickness = 0;
        if (root !== null) {
            this._canvasTarget = this.__createCanvasTarget(root.worldRenderer);
        }
        this._textFormatChangedHandler = this.__textFormatChanged.bind(this);
        this.defaultTextFormat = new TextFormat_1.TextFormat();
    }
    TextField.prototype.appendText = function (newText) {
        this.text += newText;
    };
    Object.defineProperty(TextField.prototype, "background", {
        get: function () {
            return this._background;
        },
        set: function (v) {
            var b = v !== this._background;
            if (b) {
                this._background = v;
                this._isContentChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "backgroundColor", {
        get: function () {
            return this._backgroundColor;
        },
        set: function (v) {
            var b = v !== this._backgroundColor;
            if (b) {
                this._backgroundColor = v;
                this._isContentChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "border", {
        get: function () {
            return this._border;
        },
        set: function (v) {
            var b = v !== this._border;
            if (b) {
                this._border = v;
                this._isContentChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "borderColor", {
        get: function () {
            return this._borderColor;
        },
        set: function (v) {
            var b = v !== this._borderColor;
            if (b) {
                this._borderColor = v;
                this._isContentChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "bottomScrollV", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "caretIndex", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "defaultTextFormat", {
        get: function () {
            return this._defaultTextFormat;
        },
        set: function (v) {
            if (this._defaultTextFormat !== null) {
                this._defaultTextFormat.removeEventListener(TextFormat_1.TextFormat.TEXT_FORMAT_CHANGE, this._textFormatChangedHandler);
            }
            this._defaultTextFormat = !_util_1._util.isUndefinedOrNull(v) ? v : new TextFormat_1.TextFormat();
            this._defaultTextFormat.addEventListener(TextFormat_1.TextFormat.TEXT_FORMAT_CHANGE, this._textFormatChangedHandler);
        },
        enumerable: true,
        configurable: true
    });
    TextField.prototype.getCharBoundaries = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getCharIndexAtPoint = function (x, y) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getFirstCharInParagraph = function (charIndex) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getImageReference = function (id) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getLineIndexAtPoint = function (x, y) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getLineIndexOfChar = function (charIndex) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getLineLength = function (lineIndex) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getLineMetrics = function (lineIndex) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getLineOffset = function (lineIndex) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getLineText = function (lineIndex) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getParagraphLength = function (charIndex) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.getTextFormat = function (beginIndex, endIndex) {
        if (beginIndex === void 0) { beginIndex = -1; }
        if (endIndex === void 0) { endIndex = -1; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.isFontCompatible = function (fontName, fontStyle) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.replaceSelectedText = function (value) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.replaceText = function (beginIndex, endIndex, newText) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.setSelection = function (beginIndex, endIndex) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    TextField.prototype.setTextFormat = function (format, beginIndex, endIndex) {
        if (beginIndex === void 0) { beginIndex = -1; }
        if (endIndex === void 0) { endIndex = -1; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    Object.defineProperty(TextField.prototype, "length", {
        get: function () {
            return !_util_1._util.isUndefinedOrNull(this.text) ? this.text.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "maxScrollH", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "maxScrollV", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "numLines", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "selectionBeginIndex", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "selectionEndIndex", {
        get: function () {
            throw new NotImplementedError_1.NotImplementedError();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (v) {
            var b = this._text !== v;
            if (b) {
                this._text = v;
                this._isContentChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textColor", {
        get: function () {
            return this.defaultTextFormat.color;
        },
        set: function (v) {
            var b = this.defaultTextFormat.color !== v;
            this.defaultTextFormat.color = v;
            if (b && !this.customOutlineEnabled) {
                this.textOutlineColor = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textOutlineColor", {
        /**
         * Non-standard extension.
         * @returns {Number}
         */
        get: function () {
            return this._textOutlineColor;
        },
        /**
         * Non-standard extension.
         * @param v {Number}
         */
        set: function (v) {
            var b = this._textOutlineColor !== v;
            if (b) {
                this._textOutlineColor = v;
                this._isContentChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textHeight", {
        get: function () {
            // TODO: This only works under single line circumstances.
            var height = this.defaultTextFormat.size * 1.5;
            if (this.thickness > 0) {
                height += this.thickness * 2;
            }
            return height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "textWidth", {
        get: function () {
            // TODO: This only works under single line circumstances.
            var metrics = this._context2D.measureText(this.text);
            var width = metrics.width;
            if (this.thickness > 0) {
                width += this.thickness * 2;
            }
            return width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextField.prototype, "thickness", {
        get: function () {
            return this._thickness;
        },
        set: function (v) {
            var b = this._thickness !== v;
            if (b) {
                this._thickness = v;
                this._isContentChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    TextField.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        // TODO: WARNING: HACK!
        var renderer = this.root.worldRenderer;
        renderer.releaseRenderTarget(this._canvasTarget);
        this._canvasTarget = null;
        this._canvas = null;
        this._context2D = null;
    };
    TextField.prototype.__update = function () {
        if (!this._isContentChanged) {
            return;
        }
        //var canvas = this._canvas;
        //var context = this._context2D;
        //context.font = this.__getStyleString();
        //var metrics:TextMetrics = context.measureText(this.text);
        //canvas.height = this.defaultTextFormat.size * 1.15;
        //canvas.width = metrics.width;
        this._canvasTarget.updateImageSize();
        this.__updateCanvasTextStyle(this._context2D);
        this.__drawTextElements(this._context2D);
        this._isContentChanged = false;
    };
    TextField.prototype.__render = function (renderer) {
        if (this.visible && this.alpha > 0 && this.text !== null && this.text.length > 0) {
            this._canvasTarget.updateImageContent();
            RenderHelper_1.RenderHelper.copyImageContent(renderer, this._canvasTarget, this._rawRenderTarget, false, false, this.transform.matrix3D, this.alpha, true);
        }
        else {
            this._rawRenderTarget.clear();
        }
    };
    TextField.prototype.__selectShader = function (shaderManager) {
        shaderManager.selectShader(ShaderID_1.ShaderID.COPY_IMAGE);
    };
    TextField.prototype.__createCanvasTarget = function (renderer) {
        if (this._canvas === null) {
            var canvas = window.document.createElement("canvas");
            canvas.width = renderer.view.width;
            canvas.height = renderer.view.height;
            this._canvas = canvas;
            this._context2D = canvas.getContext("2d");
        }
        return renderer.createRenderTarget(this._canvas);
    };
    TextField.prototype.__updateCanvasTextStyle = function (context2D) {
        var fontStyles = [];
        if (this.defaultTextFormat.bold) {
            fontStyles.push("bold");
        }
        if (this.defaultTextFormat.italic) {
            fontStyles.push("italic");
        }
        fontStyles.push(this.defaultTextFormat.size.toString() + "pt");
        fontStyles.push("\"" + this.defaultTextFormat.font + "\"");
        context2D.font = fontStyles.join(" ");
    };
    TextField.prototype.__drawTextElements = function (context2D) {
        var baseX = this.thickness;
        var baseY = this.thickness;
        var borderThickness = 1;
        context2D.clearRect(0, 0, this._canvas.width, this._canvas.height);
        if (this.background) {
            context2D.fillStyle = _util_1._util.colorToCssSharp(this.backgroundColor);
            context2D.fillRect(0, 0, this.textWidth + borderThickness * 2, this.textHeight + borderThickness * 2);
        }
        context2D.fillStyle = _util_1._util.colorToCssSharp(this.textColor);
        context2D.fillText(this.text, baseX + borderThickness, this.textHeight * 0.75 + borderThickness);
        if (this.thickness > 0) {
            context2D.lineWidth = this.thickness;
            context2D.strokeStyle = _util_1._util.colorToCssSharp(this.textOutlineColor);
            context2D.strokeText(this.text, baseX + borderThickness, this.textHeight * 0.75 + borderThickness);
        }
        if (this.border) {
            context2D.lineWidth = 1;
            context2D.strokeStyle = _util_1._util.colorToCssSharp(this.borderColor);
            context2D.strokeRect(borderThickness, borderThickness, this.textWidth + borderThickness * 2, this.textHeight + borderThickness * 2);
        }
    };
    TextField.prototype.__textFormatChanged = function () {
        this._isContentChanged = true;
    };
    return TextField;
})(InteractiveObject_1.InteractiveObject);
exports.TextField = TextField;



},{"../../_util/NotImplementedError":4,"../../_util/_util":5,"../../webgl/RenderHelper":93,"../../webgl/ShaderID":96,"../display/InteractiveObject":38,"./AntiAliasType":71,"./GridFitType":72,"./TextFieldAutoSize":75,"./TextFieldType":76,"./TextFormat":77,"./TextInteractionMode":79}],75:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
var TextFieldAutoSize = (function () {
    function TextFieldAutoSize() {
    }
    Object.defineProperty(TextFieldAutoSize, "CENTER", {
        get: function () {
            return "center";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFieldAutoSize, "LEFT", {
        get: function () {
            return "left";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFieldAutoSize, "NONE", {
        get: function () {
            return "none";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFieldAutoSize, "RIGHT", {
        get: function () {
            return "right";
        },
        enumerable: true,
        configurable: true
    });
    return TextFieldAutoSize;
})();
exports.TextFieldAutoSize = TextFieldAutoSize;



},{}],76:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
var TextFieldType = (function () {
    function TextFieldType() {
    }
    Object.defineProperty(TextFieldType, "DYNAMIC", {
        get: function () {
            return "dynamic";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFieldType, "INPUT", {
        get: function () {
            return "input";
        },
        enumerable: true,
        configurable: true
    });
    return TextFieldType;
})();
exports.TextFieldType = TextFieldType;



},{}],77:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var os = require("os");
var TextFormatAlign_1 = require("./TextFormatAlign");
var EventDispatcher_1 = require("../events/EventDispatcher");
var _util_1 = require("../../_util/_util");
var FlashEvent_1 = require("../events/FlashEvent");
var TextFormat = (function (_super) {
    __extends(TextFormat, _super);
    function TextFormat(font, size, color, bold, italic, underline, url, target, align, leftMargin, rightMargin, indent, leading) {
        if (font === void 0) { font = null; }
        if (size === void 0) { size = 12; }
        if (color === void 0) { color = 0x000000; }
        if (bold === void 0) { bold = false; }
        if (italic === void 0) { italic = false; }
        if (underline === void 0) { underline = false; }
        if (url === void 0) { url = null; }
        if (target === void 0) { target = null; }
        if (align === void 0) { align = TextFormatAlign_1.TextFormatAlign.LEFT; }
        if (leftMargin === void 0) { leftMargin = 0; }
        if (rightMargin === void 0) { rightMargin = 0; }
        if (indent === void 0) { indent = 0; }
        if (leading === void 0) { leading = 0; }
        _super.call(this);
        this._align = TextFormatAlign_1.TextFormatAlign.LEFT;
        this._blockIndent = 0;
        this._bold = false;
        this._bullet = false;
        this._color = 0x000000;
        this._font = null;
        this._indent = 0;
        this._italic = false;
        this._kerning = false;
        this._leading = 0;
        this._leftMargin = 0;
        this._letterSpacing = 0;
        this._rightMargin = 0;
        this._size = 12;
        this._tabStops = [];
        this._target = null;
        this._underline = false;
        this._url = null;
        if (font === null) {
            this.font = os.type().toLowerCase().indexOf("osx") >= 0 ? "Times" : "Times New Roman";
        }
        else {
            this.font = font;
        }
        this.size = size;
        this.color = color;
        this.bold = bold;
        this.italic = italic;
        this.underline = underline;
        this.url = url;
        this.target = target;
        this.align = align;
        this.leftMargin = leftMargin;
        this.rightMargin = rightMargin;
        this.indent = indent;
        this.leading = leading;
    }
    Object.defineProperty(TextFormat, "TEXT_FORMAT_CHANGE", {
        get: function () {
            return "textFormatChange";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "align", {
        get: function () {
            return this._align;
        },
        set: function (v) {
            var b = this._align !== v;
            if (b) {
                this._align = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "blockIndent", {
        get: function () {
            return this._blockIndent;
        },
        set: function (v) {
            var b = this._blockIndent !== v;
            if (b) {
                this._blockIndent = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "bold", {
        get: function () {
            return this._bold;
        },
        set: function (v) {
            var b = this._bold !== v;
            if (b) {
                this._bold = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "bullet", {
        get: function () {
            return this._bullet;
        },
        set: function (v) {
            var b = this._bullet !== v;
            if (b) {
                this._bullet = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (v) {
            var b = this._color !== v;
            if (b) {
                this._color = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "font", {
        get: function () {
            return this._font;
        },
        set: function (v) {
            var b = this._font !== v;
            if (b) {
                this._font = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "indent", {
        get: function () {
            return this._indent;
        },
        set: function (v) {
            var b = this._indent !== v;
            if (b) {
                this._indent = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "italic", {
        get: function () {
            return this._italic;
        },
        set: function (v) {
            var b = this._italic !== v;
            if (b) {
                this._italic = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "kerning", {
        get: function () {
            return this._kerning;
        },
        set: function (v) {
            var b = this._kerning !== v;
            if (b) {
                this._kerning = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "leading", {
        get: function () {
            return this._indent;
        },
        set: function (v) {
            var b = this._leading !== v;
            if (b) {
                this._leading = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "leftMargin", {
        get: function () {
            return this._leftMargin;
        },
        set: function (v) {
            var b = this._leftMargin !== v;
            if (b) {
                this._leftMargin = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "letterSpacing", {
        get: function () {
            return this._letterSpacing;
        },
        set: function (v) {
            var b = this._letterSpacing !== v;
            if (b) {
                this._letterSpacing = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "rightMargin", {
        get: function () {
            return this._rightMargin;
        },
        set: function (v) {
            var b = this._rightMargin !== v;
            if (b) {
                this._rightMargin = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (v) {
            var b = this._size !== v;
            if (b) {
                this._size = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "tabStops", {
        get: function () {
            return this._tabStops;
        },
        set: function (v) {
            if (_util_1._util.isUndefinedOrNull(v)) {
                v = [];
            }
            var b = false;
            if (!b) {
                b = this._tabStops.length !== v.length;
            }
            if (!b) {
                for (var i = 0; i < v.length; ++i) {
                    if (this._tabStops[i] !== v[i]) {
                        b = true;
                        break;
                    }
                }
            }
            if (b) {
                this._tabStops = v.slice();
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "target", {
        get: function () {
            return this._target;
        },
        set: function (v) {
            var b = this._target !== v;
            if (b) {
                this._target = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "underline", {
        get: function () {
            return this._underline;
        },
        set: function (v) {
            var b = this._underline !== v;
            if (b) {
                this._underline = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormat.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (v) {
            var b = this._url !== v;
            if (b) {
                this._url = v;
                this.__raiseChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    TextFormat.prototype.__raiseChange = function () {
        var ev = FlashEvent_1.FlashEvent.create(TextFormat.TEXT_FORMAT_CHANGE);
        this.dispatchEvent(ev);
    };
    return TextFormat;
})(EventDispatcher_1.EventDispatcher);
exports.TextFormat = TextFormat;



},{"../../_util/_util":5,"../events/EventDispatcher":52,"../events/FlashEvent":53,"./TextFormatAlign":78,"os":129}],78:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
var TextFormatAlign = (function () {
    function TextFormatAlign() {
    }
    Object.defineProperty(TextFormatAlign, "CENTER", {
        get: function () {
            return "center";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormatAlign, "END", {
        get: function () {
            return "end";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormatAlign, "JUSTIFY", {
        get: function () {
            return "justify";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormatAlign, "LEFT", {
        get: function () {
            return "left";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormatAlign, "RIGHT", {
        get: function () {
            return "right";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextFormatAlign, "START", {
        get: function () {
            return "start";
        },
        enumerable: true,
        configurable: true
    });
    return TextFormatAlign;
})();
exports.TextFormatAlign = TextFormatAlign;



},{}],79:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
var TextInteractionMode = (function () {
    function TextInteractionMode() {
    }
    Object.defineProperty(TextInteractionMode, "NORMAL", {
        get: function () {
            return "normal";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInteractionMode, "SELECTION", {
        get: function () {
            return "selection";
        },
        enumerable: true,
        configurable: true
    });
    return TextInteractionMode;
})();
exports.TextInteractionMode = TextInteractionMode;



},{}],80:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
var TextLineMetrics = (function () {
    function TextLineMetrics(x, width, height, ascent, descent, leading) {
        this.ascent = 0;
        this.descent = 0;
        this.height = 0;
        this.leading = 0;
        this.width = 0;
        this.x = 0;
        this.x = x;
        this.width = width;
        this.height = height;
        this.ascent = ascent;
        this.descent = descent;
        this.leading = leading;
    }
    return TextLineMetrics;
})();
exports.TextLineMetrics = TextLineMetrics;



},{}],81:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./AntiAliasType"));
__export(require("./GridFitType"));
__export(require("./StyleSheet"));
__export(require("./TextField"));
__export(require("./TextFieldAutoSize"));
__export(require("./TextFieldType"));
__export(require("./TextFormat"));
__export(require("./TextFormatAlign"));
__export(require("./TextInteractionMode"));
__export(require("./TextLineMetrics"));



},{"./AntiAliasType":71,"./GridFitType":72,"./StyleSheet":73,"./TextField":74,"./TextFieldAutoSize":75,"./TextFieldType":76,"./TextFormat":77,"./TextFormatAlign":78,"./TextInteractionMode":79,"./TextLineMetrics":80}],82:[function(require,module,exports){
/**
 * Created by MIC on 2016/1/7.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcher_1 = require("../events/EventDispatcher");
var TimerEvent_1 = require("../events/TimerEvent");
var Timer = (function (_super) {
    __extends(Timer, _super);
    function Timer(delay, repeatCount) {
        if (repeatCount === void 0) { repeatCount = 0; }
        _super.call(this);
        this.enabled = true;
        this._currentCount = 0;
        this._delay = 1000;
        this._repeatCount = 0;
        this._running = false;
        this._handle = 0;
        this.delay = delay;
        this.repeatCount = repeatCount;
        this.start();
    }
    Object.defineProperty(Timer.prototype, "currentCount", {
        get: function () {
            return this._currentCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timer.prototype, "delay", {
        get: function () {
            return this._delay;
        },
        set: function (v) {
            v = Math.floor(v);
            this._delay = v >= 0 ? v : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timer.prototype, "repeatCount", {
        get: function () {
            return this._repeatCount;
        },
        set: function (v) {
            v = Math.floor(v);
            this._repeatCount = v >= 0 ? v : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timer.prototype, "running", {
        get: function () {
            return this._running;
        },
        enumerable: true,
        configurable: true
    });
    Timer.prototype.reset = function () {
        if (this.running) {
            window.clearInterval(this._handle);
            this._handle = 0;
            this._running = false;
            this._currentCount = 0;
        }
    };
    Timer.prototype.start = function () {
        if (!this.running && (this.currentCount < this.repeatCount || this.repeatCount === 0)) {
            this._handle = window.setInterval(this.__timerCallback.bind(this), this.delay);
            this._running = true;
        }
    };
    Timer.prototype.stop = function () {
        if (this.running) {
            window.clearInterval(this._handle);
            this._handle = 0;
            this._running = false;
        }
    };
    Timer.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.reset();
    };
    Timer.prototype.__timerCallback = function () {
        if (this.enabled) {
            this._currentCount++;
            if (this.repeatCount > 0 && this.currentCount > this.repeatCount) {
                this.stop();
                this.__raiseTimerCompleteEvent();
            }
            else {
                this.__raiseTimerEvent();
            }
        }
    };
    Timer.prototype.__raiseTimerEvent = function () {
        var ev = new TimerEvent_1.TimerEvent(TimerEvent_1.TimerEvent.TIMER);
        ev.timeStamp = Date.now();
        this.dispatchEvent(ev);
    };
    Timer.prototype.__raiseTimerCompleteEvent = function () {
        var ev = new TimerEvent_1.TimerEvent(TimerEvent_1.TimerEvent.TIMER_COMPLETE);
        ev.timeStamp = Date.now();
        this.dispatchEvent(ev);
    };
    return Timer;
})(EventDispatcher_1.EventDispatcher);
exports.Timer = Timer;



},{"../events/EventDispatcher":52,"../events/TimerEvent":54}],83:[function(require,module,exports){
/**
 * Created by MIC on 2016/1/7.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./Timer"));



},{"./Timer":82}],84:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var _util = require("./_util/index");
exports._util = _util;
var flash = require("./flash/index");
exports.flash = flash;
var webgl = require("./webgl/index");
exports.webgl = webgl;
var fl = require("./fl/index");
exports.fl = fl;
var mx = require("./mx/index");
exports.mx = mx;
var GLantern_1 = require("./GLantern");
exports.GLantern = GLantern_1.GLantern;
function injectToGlobal($this) {
    $this["_util"] = _util;
    $this["flash"] = flash;
    $this["webgl"] = webgl;
    $this["fl"] = fl;
    $this["mx"] = mx;
}
exports.injectToGlobal = injectToGlobal;



},{"./GLantern":1,"./_util/index":6,"./fl/index":8,"./flash/index":70,"./mx/index":87,"./webgl/index":117}],85:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObjectContainer_1 = require("../../flash/display/DisplayObjectContainer");
var NotImplementedError_1 = require("../../_util/NotImplementedError");
var Canvas = (function (_super) {
    __extends(Canvas, _super);
    function Canvas(root, parent) {
        _super.call(this, root, parent);
    }
    Canvas.prototype.__update = function () {
        throw new NotImplementedError_1.NotImplementedError();
    };
    Canvas.prototype.__render = function (renderer) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    return Canvas;
})(DisplayObjectContainer_1.DisplayObjectContainer);
exports.Canvas = Canvas;



},{"../../_util/NotImplementedError":4,"../../flash/display/DisplayObjectContainer":33}],86:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./Canvas"));



},{"./Canvas":85}],87:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/26.
 */
var containers = require("./containers/index");
exports.containers = containers;



},{"./containers/index":86}],88:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var AttributeCache = (function () {
    function AttributeCache() {
        this.name = null;
        this.value = undefined;
        this.location = -1;
    }
    return AttributeCache;
})();
exports.AttributeCache = AttributeCache;



},{}],89:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var FilterBase = (function () {
    function FilterBase(manager) {
        this._filterManager = null;
        this._referenceCount = 0;
        this._filterManager = manager;
    }
    /**
     * Called when it is added to a {@link DisplayObject.filters} array.
     * Notice that it may be called multiple times, but a filter should only be initialized once
     * if its output buffer is null.
     */
    FilterBase.prototype.notifyAdded = function () {
        if (this._referenceCount <= 0) {
            this.__initialize();
        }
        this._referenceCount++;
    };
    /**
     * Called when it is removed from a {@link DisplayObject.filters} array.
     * Notice that it may be called multiple times, but should do nothing if its output is already null.
     */
    FilterBase.prototype.notifyRemoved = function () {
        this._referenceCount--;
        if (this._referenceCount <= 0) {
            this.__dispose();
        }
    };
    FilterBase.prototype.dispose = function () {
        this.__dispose();
    };
    FilterBase.prototype.initialize = function () {
        this.__initialize();
    };
    FilterBase.prototype.__initialize = function () {
    };
    FilterBase.prototype.__dispose = function () {
    };
    return FilterBase;
})();
exports.FilterBase = FilterBase;



},{}],90:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/17.
 */
var FilterManager = (function () {
    function FilterManager(renderer) {
        this._tempTarget = null;
        this._renderer = null;
        this._filterGroups = null;
        this._renderer = renderer;
        this._filterGroups = [];
        this._tempTarget = renderer.createRenderTarget();
    }
    FilterManager.prototype.dispose = function () {
        this._renderer.releaseRenderTarget(this._tempTarget);
        this.clearFilterGroups();
        this._tempTarget = null;
        this._filterGroups = null;
        this._renderer = null;
    };
    FilterManager.prototype.clearFilterGroups = function () {
        var filterGroup;
        var filterGroups = this._filterGroups;
        if (filterGroups.length > 0) {
            for (var i = 0; i < filterGroups.length; ++i) {
                filterGroup = filterGroups[i];
                while (filterGroup.length > 0) {
                    filterGroup.pop();
                }
            }
        }
        while (filterGroups.length > 0) {
            filterGroups.pop();
        }
    };
    FilterManager.prototype.pushFilterGroup = function (group) {
        this._filterGroups.push(group.slice());
    };
    FilterManager.prototype.popFilterGroup = function () {
        return this.hasFilterGroups ? this._filterGroups.pop() : null;
    };
    Object.defineProperty(FilterManager.prototype, "hasFilterGroups", {
        get: function () {
            return this._filterGroups.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterManager.prototype, "renderer", {
        get: function () {
            return this._renderer;
        },
        enumerable: true,
        configurable: true
    });
    FilterManager.prototype.processFilters = function (renderer, input, output, clearOutput) {
        if (input === output) {
            console.warn("Filter alert: input and output are the same, processing aborted.");
            return;
        }
        // 处理时仅最后一层有效，因为都是渲染到缓冲区上的，这一层渲染完后会作为源传给下一层
        if (this.hasFilterGroups) {
            var filterGroup = this._filterGroups[this._filterGroups.length - 1];
            var filter;
            var t1 = input, t2 = this._tempTarget;
            t2.clear();
            var t;
            for (var i = 0; i < filterGroup.length; i++) {
                filter = filterGroup[i];
                if (filter !== null) {
                    filter.process(renderer, t1, t2, true);
                    t = t1;
                    t1 = t2;
                    t2 = t;
                }
            }
            renderer.copyRenderTargetContent(t1, output, clearOutput);
        }
    };
    return FilterManager;
})();
exports.FilterManager = FilterManager;



},{}],91:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var Values = {};
var FragmentShaders = (function () {
    function FragmentShaders() {
    }
    Object.defineProperty(FragmentShaders, "buffered", {
        get: function () {
            return Values.buffered;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FragmentShaders, "blur", {
        get: function () {
            return Values.blur;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FragmentShaders, "primitive", {
        get: function () {
            return Values.primitive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FragmentShaders, "colorTransform", {
        get: function () {
            return Values.colorTransform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FragmentShaders, "fxaa", {
        get: function () {
            return Values.fxaa;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FragmentShaders, "blur2", {
        get: function () {
            return Values.blur2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FragmentShaders, "copyImage", {
        get: function () {
            return Values.copyImage;
        },
        enumerable: true,
        configurable: true
    });
    return FragmentShaders;
})();
exports.FragmentShaders = FragmentShaders;
Values.buffered = [
    "precision mediump float;",
    "",
    "uniform sampler2D uSampler;",
    "",
    "varying vec2 vTextureCoord;",
    "",
    "void main() {",
    "    gl_FragColor = texture2D(uSampler, vTextureCoord);",
    "}"
].join("\n");
Values.blur = [
    "precision lowp float;",
    "",
    "varying vec2 vTextureCoord;",
    "varying vec2 vBlurTexCoords[6];",
    "",
    "uniform sampler2D uSampler;",
    "",
    "void main()",
    "{",
    "   gl_FragColor = vec4(0.0);",
    "   ",
    "   gl_FragColor += texture2D(uSampler, vBlurTexCoords[0]) * 0.004431848411938341;",
    "   gl_FragColor += texture2D(uSampler, vBlurTexCoords[1]) * 0.05399096651318985;",
    "   gl_FragColor += texture2D(uSampler, vBlurTexCoords[2]) * 0.2419707245191454;",
    "   gl_FragColor += texture2D(uSampler, vTextureCoord    ) * 0.3989422804014327;",
    "   gl_FragColor += texture2D(uSampler, vBlurTexCoords[3]) * 0.2419707245191454;",
    "   gl_FragColor += texture2D(uSampler, vBlurTexCoords[4]) * 0.05399096651318985;",
    "   gl_FragColor += texture2D(uSampler, vBlurTexCoords[5]) * 0.004431848411938341;",
    "}"
].join("\n");
Values.primitive = [
    "precision mediump float;",
    "",
    "uniform float uAlpha;",
    "",
    "varying vec4 vVertexColor;",
    "",
    "void main() {",
    "   gl_FragColor = vVertexColor * uAlpha;",
    "}"
].join("\n");
Values.colorTransform = [
    "precision mediump float;",
    "",
    "varying vec2 vTextureCoord;",
    "uniform sampler2D uSampler;",
    "uniform float uColorMatrix[25];",
    "",
    "void main(void)",
    "{",
    "   vec4 c = texture2D(uSampler, vTextureCoord);",
    "   ",
    "   gl_FragColor.r =  (uColorMatrix[0] * c.r);",
    "   gl_FragColor.r += (uColorMatrix[1] * c.g);",
    "   gl_FragColor.r += (uColorMatrix[2] * c.b);",
    "   gl_FragColor.r += (uColorMatrix[3] * c.a);",
    "   gl_FragColor.r +=  uColorMatrix[4];",
    "   ",
    "   gl_FragColor.g =  (uColorMatrix[5] * c.r);",
    "   gl_FragColor.g += (uColorMatrix[6] * c.g);",
    "   gl_FragColor.g += (uColorMatrix[7] * c.b);",
    "   gl_FragColor.g += (uColorMatrix[8] * c.a);",
    "   gl_FragColor.g +=  uColorMatrix[9];",
    "   ",
    "   gl_FragColor.b =  (uColorMatrix[10] * c.r);",
    "   gl_FragColor.b += (uColorMatrix[11] * c.g);",
    "   gl_FragColor.b += (uColorMatrix[12] * c.b);",
    "   gl_FragColor.b += (uColorMatrix[13] * c.a);",
    "   gl_FragColor.b +=  uColorMatrix[14];",
    "   ",
    "   gl_FragColor.a =  (uColorMatrix[15] * c.r);",
    "   gl_FragColor.a += (uColorMatrix[16] * c.g);",
    "   gl_FragColor.a += (uColorMatrix[17] * c.b);",
    "   gl_FragColor.a += (uColorMatrix[18] * c.a);",
    "   gl_FragColor.a +=  uColorMatrix[19];",
    "}"
].join("\n");
// For the full license, please refer to shaders/glsl/fxaa.frag
Values.fxaa = [
    "precision lowp float;",
    "",
    "#ifndef FXAA_REDUCE_MIN",
    "#define FXAA_REDUCE_MIN   (1.0/ 128.0)",
    "#endif",
    "#ifndef FXAA_REDUCE_MUL",
    "#define FXAA_REDUCE_MUL   (1.0 / 8.0)",
    "#endif",
    "#ifndef FXAA_SPAN_MAX",
    "#define FXAA_SPAN_MAX     8.0",
    "#endif",
    "",
    "vec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,",
    "vec2 v_rgbNW, vec2 v_rgbNE,",
    "vec2 v_rgbSW, vec2 v_rgbSE,",
    "vec2 v_rgbM) {",
    "vec4 color;",
    "mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);",
    "vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;",
    "vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;",
    "vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;",
    "vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;",
    "vec4 texColor = texture2D(tex, v_rgbM);",
    "vec3 rgbM  = texColor.xyz;",
    "vec3 luma = vec3(0.299, 0.587, 0.114);",
    "float lumaNW = dot(rgbNW, luma);",
    "float lumaNE = dot(rgbNE, luma);",
    "float lumaSW = dot(rgbSW, luma);",
    "float lumaSE = dot(rgbSE, luma);",
    "float lumaM  = dot(rgbM,  luma);",
    "float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));",
    "float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));",
    "",
    "mediump vec2 dir;",
    "dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));",
    "dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));",
    "",
    "float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *",
    "    (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);",
    "",
    "float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);",
    "dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),",
    "        max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),",
    "            dir * rcpDirMin)) * inverseVP;",
    "",
    "vec3 rgbA = 0.5 * (",
    "    texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +",
    "    texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);",
    "vec3 rgbB = rgbA * 0.5 + 0.25 * (",
    "    texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +",
    "    texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);",
    "",
    "float lumaB = dot(rgbB, luma);",
    "if ((lumaB < lumaMin) || (lumaB > lumaMax))",
    "    color = vec4(rgbA, texColor.a);",
    "else",
    "    color = vec4(rgbB, texColor.a);",
    "return color;",
    "}",
    "",
    "varying vec2 vTextureCoord;",
    "varying vec2 vResolution;",
    "",
    "varying vec2 v_rgbNW;",
    "varying vec2 v_rgbNE;",
    "varying vec2 v_rgbSW;",
    "varying vec2 v_rgbSE;",
    "varying vec2 v_rgbM;",
    "",
    "uniform sampler2D uSampler;",
    "",
    "void main() {",
    "    gl_FragColor = fxaa(uSampler, vTextureCoord * vResolution, vResolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);",
    "}"
].join("\n");
Values.blur2 = [
    "precision lowp float;",
    "",
    "uniform sampler2D uSampler;",
    "",
    "uniform float uResolution;",
    "uniform float uStrength;",
    "uniform vec2 uBlurDirection;",
    "",
    "varying vec2 vTextureCoord;",
    "",
    "float offset[3];",
    "float weight[3];",
    "",
    "void main()",
    "{",
    "    offset[0] = 0.0; offset[1] = 1.3846153846; offset[2] = 3.2307692308;",
    "    weight[0] = 0.2270270270; weight[1] = 0.3162162162; weight[2] = 0.0702702703;",
    "    gl_FragColor = texture2D(uSampler, vec2(vTextureCoord)) * weight[0];",
    "    float xDir = uBlurDirection.x / sqrt(uBlurDirection.x * uBlurDirection.x + uBlurDirection.y * uBlurDirection.y);",
    "    float yDir = uBlurDirection.y / sqrt(uBlurDirection.x * uBlurDirection.x + uBlurDirection.y * uBlurDirection.y);",
    "    for (int i = 1; i < 3; i++)",
    "    {",
    "        gl_FragColor += texture2D(uSampler, (vec2(vTextureCoord) + vec2(offset[i] * xDir, offset[i] * yDir) * uStrength / uResolution)) * weight[i];",
    "        gl_FragColor += texture2D(uSampler, (vec2(vTextureCoord) - vec2(offset[i] * xDir, offset[i] * yDir) * uStrength / uResolution)) * weight[i];",
    "    }",
    "}"
].join("\n");
Values.copyImage = [
    "precision mediump float;",
    "",
    "uniform sampler2D uSampler;",
    "uniform float uAlpha;",
    "",
    "varying vec2 vTextureCoord;",
    "",
    "void main() {",
    "    gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;",
    "}"
].join("\n");



},{}],92:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var _util_1 = require("../_util/_util");
var gl = this.WebGLRenderingContext || window.WebGLRenderingContext;
var PackedArrayBuffer = (function () {
    function PackedArrayBuffer() {
        this._glc = null;
        this._isDirty = true;
        this._bufferType = 0;
        this._elementGLType = 0;
        this._webglBuffer = null;
        this._array = null;
        this._arrayType = null;
        this._typedArray = null;
    }
    PackedArrayBuffer.create = function (context, data, elementGLType, bufferType) {
        var T = PackedArrayBuffer.getTypedArrayType(elementGLType);
        if (T === null) {
            console.warn("Failed to create typed array whose elements are of WebGL type 0x" + elementGLType.toString(16));
            return null;
        }
        var wab = new PackedArrayBuffer();
        wab._glc = context;
        wab._elementGLType = elementGLType;
        wab._webglBuffer = context.createBuffer();
        if (wab._webglBuffer == null) {
            console.warn("Failed to create WebGL buffer.");
            return null;
        }
        wab._arrayType = T;
        wab._bufferType = bufferType;
        wab.setNewData(data);
        wab.becomeDirty();
        wab.syncBufferData();
        return wab;
    };
    Object.defineProperty(PackedArrayBuffer.prototype, "webglBuffer", {
        get: function () {
            return this._webglBuffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PackedArrayBuffer.prototype, "elementSize", {
        get: function () {
            return this._typedArray.BYTES_PER_ELEMENT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PackedArrayBuffer.prototype, "elementCount", {
        get: function () {
            return this._typedArray.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PackedArrayBuffer.prototype, "elementGLType", {
        get: function () {
            return this._elementGLType;
        },
        enumerable: true,
        configurable: true
    });
    PackedArrayBuffer.prototype.setNewData = function (data) {
        if (_util_1._util.isUndefinedOrNull(data)) {
            this._array = [];
        }
        else {
            this._array = data.slice();
        }
    };
    PackedArrayBuffer.prototype.becomeDirty = function () {
        this._isDirty = true;
    };
    PackedArrayBuffer.prototype.syncBufferData = function () {
        if (this._isDirty) {
            var T = this._arrayType;
            this._typedArray = new T(this._array);
            this._isDirty = false;
        }
        this._glc.bindBuffer(this._bufferType, this._webglBuffer);
        // DANGER! In complex scenes, bufferData() transfers large amount of data.
        // Improper optimization does harm on performance.
        this._glc.bufferData(this._bufferType, this._typedArray, gl.DYNAMIC_DRAW);
    };
    PackedArrayBuffer.prototype.dispose = function () {
        this._glc.deleteBuffer(this._webglBuffer);
        this._array = null;
        this._typedArray = null;
        this._webglBuffer = null;
        this._glc = null;
    };
    PackedArrayBuffer.getTypedArrayType = function (glType) {
        switch (glType) {
            case gl.FLOAT:
                return Float32Array;
            case gl.UNSIGNED_SHORT:
                return Uint16Array;
            case gl.UNSIGNED_INT:
                return Uint32Array;
            case gl.UNSIGNED_BYTE:
                return Uint8Array;
            case gl.INT:
                return Int32Array;
            case gl.SHORT:
                return Int16Array;
            case gl.BYTE:
                return Int8Array;
            default:
                return null;
        }
    };
    return PackedArrayBuffer;
})();
exports.PackedArrayBuffer = PackedArrayBuffer;



},{"../_util/_util":5}],93:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var RenderTarget2D_1 = require("./RenderTarget2D");
var PackedArrayBuffer_1 = require("./PackedArrayBuffer");
var ShaderID_1 = require("./ShaderID");
var _util_1 = require("../_util/_util");
var gl = this.WebGLRenderingContext || window.WebGLRenderingContext;
var RenderHelper = (function () {
    function RenderHelper() {
    }
    RenderHelper.renderPrimitives = function (renderer, renderTo, vertices, colors, indices, clearOutput) {
        renderer.shaderManager.selectShader(ShaderID_1.ShaderID.PRIMITIVE);
        var shader = renderer.shaderManager.currentShader;
        var glc = renderer.context;
        var attributeLocation;
        renderTo.activate();
        vertices.syncBufferData();
        attributeLocation = shader.getAttributeLocation("aVertexPosition");
        glc.vertexAttribPointer(attributeLocation, 3, vertices.elementGLType, false, vertices.elementSize * 3, 0);
        glc.enableVertexAttribArray(attributeLocation);
        colors.syncBufferData();
        attributeLocation = shader.getAttributeLocation("aVertexColor");
        glc.vertexAttribPointer(attributeLocation, 4, colors.elementGLType, false, colors.elementSize * 4, 0);
        glc.enableVertexAttribArray(attributeLocation);
        indices.syncBufferData();
        if (clearOutput) {
            renderTo.clear();
        }
        glc.viewport(0, 0, renderTo.originalWidth, renderTo.originalHeight);
        glc.drawElements(gl.TRIANGLES, indices.elementCount, indices.elementGLType, 0);
    };
    RenderHelper.copyTargetContent = function (renderer, source, destination, flipX, flipY, clearOutput) {
        RenderHelper.renderBuffered(renderer, source, destination, ShaderID_1.ShaderID.REPLICATE, clearOutput, function (r) {
            var shader = r.shaderManager.currentShader;
            shader.setFlipX(flipX);
            shader.setFlipY(flipY);
            if (flipX || flipY) {
                shader.setOriginalSize([destination.originalWidth, destination.originalHeight]);
                shader.setFitSize([destination.fitWidth, destination.fitHeight]);
            }
        });
    };
    RenderHelper.copyImageContent = function (renderer, source, destination, flipX, flipY, transform, alpha, clearOutput) {
        RenderHelper.renderBuffered(renderer, source, destination, ShaderID_1.ShaderID.COPY_IMAGE, clearOutput, function (r) {
            var shader = r.shaderManager.currentShader;
            shader.setFlipX(flipX);
            shader.setFlipY(flipY);
            shader.setAlpha(alpha);
            shader.setTransform(transform);
            if (flipX || flipY) {
                shader.setOriginalSize([destination.originalWidth, destination.originalHeight]);
                shader.setFitSize([destination.fitWidth, destination.fitHeight]);
            }
        });
    };
    RenderHelper.renderImage = function (renderer, source, destination, clearOutput) {
        RenderHelper.renderBuffered(renderer, source, destination, ShaderID_1.ShaderID.COPY_IMAGE, clearOutput, function (r) {
            var shader = r.shaderManager.currentShader;
            shader.setFlipX(false);
            shader.setFlipY(false);
        });
    };
    RenderHelper.renderBuffered = function (renderer, source, destination, shaderID, clearOutput, shaderInit) {
        if (!__checkRenderTargets(source, destination)) {
            return;
        }
        var glc = renderer.context;
        renderer.shaderManager.selectShader(shaderID);
        shaderInit(renderer);
        var shader = renderer.shaderManager.currentShader;
        // Target must have a 'uSampler' sample2D uniform
        shader.setTexture(source.texture);
        shader.syncUniforms();
        if (RenderHelper._glVertexPositionBuffer === null) {
            var vertexPositions = [
                0, source.fitHeight, 0,
                source.fitWidth, source.fitHeight, 0,
                0, 0, 0,
                source.fitWidth, 0, 0
            ];
            RenderHelper._glVertexPositionBuffer = PackedArrayBuffer_1.PackedArrayBuffer.create(glc, vertexPositions, gl.FLOAT, gl.ARRAY_BUFFER);
        }
        var attributeLocation;
        attributeLocation = shader.getAttributeLocation("aVertexPosition");
        if (attributeLocation >= 0) {
            var glVertexPositionBuffer = RenderHelper._glVertexPositionBuffer;
            glVertexPositionBuffer.syncBufferData();
            glc.vertexAttribPointer(attributeLocation, 3, glVertexPositionBuffer.elementGLType, false, glVertexPositionBuffer.elementSize * 3, 0);
            glc.enableVertexAttribArray(attributeLocation);
        }
        // Some shaders, e.g. the blur-2 shader, has no texture coordinates.
        attributeLocation = shader.getAttributeLocation("aTextureCoord");
        if (attributeLocation >= 0) {
            var textureCoords = RenderTarget2D_1.RenderTarget2D.textureCoords;
            textureCoords.syncBufferData();
            glc.vertexAttribPointer(attributeLocation, 2, textureCoords.elementGLType, false, textureCoords.elementSize * 2, 0);
            glc.enableVertexAttribArray(attributeLocation);
        }
        var textureIndices = RenderTarget2D_1.RenderTarget2D.textureIndices;
        textureIndices.syncBufferData();
        destination.activate();
        if (clearOutput) {
            destination.clear();
        }
        glc.viewport(0, 0, destination.originalWidth, destination.originalHeight);
        glc.enable(gl.SCISSOR_TEST);
        glc.scissor(0, 0, source.originalWidth, source.originalHeight);
        glc.drawElements(gl.TRIANGLES, textureIndices.elementCount, textureIndices.elementGLType, 0);
        glc.disable(gl.SCISSOR_TEST);
    };
    // Be careful! Manually dispose it when the whole module is finalizing.
    RenderHelper._glVertexPositionBuffer = null;
    return RenderHelper;
})();
exports.RenderHelper = RenderHelper;
function __checkRenderTargets(source, destination) {
    if (_util_1._util.isUndefinedOrNull(source)) {
        console.warn("Cannot render a null RenderTarget2D onto another RenderTarget2D.");
        return false;
    }
    if (source.texture === null) {
        console.warn("Cannot use a RenderTarget2D without texture-based frame buffer to render onto another RenderTarget2D.");
        return false;
    }
    if (source.isRoot) {
        console.warn("Cannot use a root RenderTarget2D as source.");
        return false;
    }
    if (source === destination) {
        console.warn("Source and destination must not be the same RenderTarget2D.");
        return false;
    }
    return true;
}



},{"../_util/_util":5,"./PackedArrayBuffer":92,"./RenderTarget2D":94,"./ShaderID":96}],94:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/17.
 */
var _util_1 = require("../_util/_util");
var PackedArrayBuffer_1 = require("./PackedArrayBuffer");
var gl = this.WebGLRenderingContext || window.WebGLRenderingContext;
var isInitializedStatically = false;
/**
 * Represents a 2D render target based on WebGL texture.
 */
var RenderTarget2D = (function () {
    /**
     * Instantiates a new {@link RenderTarget2D}.
     * @param renderer {WebGLRenderer} The {@link WebGLRenderer} used to create this new {@link RenderTarget2D}.
     * @param [image] {ImageData|HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} The initial image or image-related
     * HTML element. See {@link RenderTarget2D.image} for more information. The default value is null.
     * @param [isRoot] {Boolean} Declares whether the {@link RenderTarget2D} is a root for display. See {@link RenderTarget2D.isRoot}
     * for more information. The default value is false.
     * @implements {IDisposable}
     */
    function RenderTarget2D(renderer, image, isRoot) {
        if (image === void 0) { image = null; }
        if (isRoot === void 0) { isRoot = false; }
        this._glc = null;
        this._renderer = null;
        this._frameBuffer = null;
        this._depthBuffer = null;
        this._texture = null;
        this._originalWidth = 0;
        this._originalHeight = 0;
        this._fitWidth = 0;
        this._fitHeight = 0;
        this._image = null;
        this._isRoot = false;
        if (!isInitializedStatically) {
            initStaticFields(renderer.context);
        }
        this._renderer = renderer;
        this.__initialize(renderer.context, renderer.view.width, renderer.view.height, image, isRoot);
    }
    /**
     * Disposes the {@link RenderTarget2D} and related resources.
     */
    RenderTarget2D.prototype.dispose = function () {
        var glc = this._glc;
        glc.deleteTexture(this._texture);
        glc.deleteFramebuffer(this._frameBuffer);
        glc.deleteRenderbuffer(this._depthBuffer);
        this._texture = null;
        this._frameBuffer = null;
        this._depthBuffer = null;
        this._glc = null;
        this._renderer = null;
    };
    Object.defineProperty(RenderTarget2D.prototype, "originalWidth", {
        /**
         * Returns the original width of the {@link RenderTarget2D}.
         * Old WebGL contexts restrict the width and height of textures to being a power of 2. However, users may want to
         * create custom-sized {@link RenderTarget2D}s, which requires the targets using various sizes of "textures".
         * Creating textures width and height different from power of 2 is not allowed in these cases, so textures slightly
         * larger than needed with width and height being power of 2 is created.
         * Therefore, the original size is the size requested, and the fit size is the real size of texture. During rendering,
         * the original size is used for presenting, and the fit size is used for manipulation.
         * @see {@link RenderTarget2D.originalHeight}
         * @see {@link RenderTarget2D.fitWidth}
         * @see {@link RenderTarget2D.fitHeight}
         * @returns {Number} The original width of the {@link RenderTarget2D}.
         */
        get: function () {
            return this._originalWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTarget2D.prototype, "originalHeight", {
        /**
         * Returns the original height of the {@link RenderTarget2D}. See {@link RenderTarget2D.originalWidth} for more information.
         * @see {@link RenderTarget2D.originalWidth}
         * @see {@link RenderTarget2D.fitWidth}
         * @see {@link RenderTarget2D.fitHeight}
         * @returns {number}
         */
        get: function () {
            return this._originalHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTarget2D.prototype, "fitWidth", {
        /**
         * Returns the fit width of the {@link RenderTarget2D}. See {@link RenderTarget2D.originalWidth} for more information.
         * @see {@link RenderTarget2D.originalWidth}
         * @see {@link RenderTarget2D.originalHeight}
         * @see {@link RenderTarget2D.fitHeight}
         * @returns {Number} The fit width of the {@link RenderTarget2D}.
         */
        get: function () {
            return this._fitWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTarget2D.prototype, "fitHeight", {
        /**
         * Returns the fit height of the {@link RenderTarget2D}. See {@link RenderTarget2D.originalWidth} for more information.
         * @see {@link RenderTarget2D.originalWidth}
         * @see {@link RenderTarget2D.originalHeight}
         * @see {@link RenderTarget2D.fitHeight}
         * @returns {number}
         */
        get: function () {
            return this._fitHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTarget2D.prototype, "texture", {
        /**
         * Returns the underlying {@link WebGLTexture} of the {@link RenderTarget2D}. May be null if the target is a root target.
         * @returns {WebGLTexture} The underlying texture.
         */
        get: function () {
            return this._texture;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTarget2D.prototype, "image", {
        /**
         * The content used to create the {@link RenderTarget2D}. It is useful for importing external images, or dynamically
         * rendering image sequences from {@link HTMLVideoElement}s. Null means this is a blank {@link RenderTarget2D}.
         * @returns {ImageData|HTMLCanvasElement|HTMLImageElement|HTMLVideoElement}
         */
        get: function () {
            return this._image;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTarget2D.prototype, "isRoot", {
        /**
         * Returns whether the {@link RenderTarget2D} is a root for display. A root {@link RenderTarget2D}
         * has no underlying textures and renders directly to the output buffer (i.e. the &lt;canvas&gt; attached to the
         * {@link WebGLRenderer}. So they must be used as final render target, not buffers.
         * @returns {Boolean} True if the {@link RenderTarget2D} is a root target, and false otherwise.
         */
        get: function () {
            return this._isRoot;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Activates the {@link RenderTarget2D}, and all the rendering after the activation will be done on this target.
     */
    RenderTarget2D.prototype.activate = function () {
        var glc = this._glc;
        glc.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
    };
    /**
     * Clears the content on the {@link RenderTarget2D}.
     */
    RenderTarget2D.prototype.clear = function () {
        this.activate();
        var glc = this._glc;
        glc.viewport(0, 0, this._fitWidth, this._fitHeight);
        glc.clearColor(0, 0, 0, 0);
        glc.clearDepth(0);
        glc.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };
    /**
     * Resizes the {@link RenderTarget2D}. Note that currently this function is only a wrapper for the internal one, and
     * public calls are experimental.
     * @param newWidth {Number} The new width, in pixels.
     * @param newHeight {Number} The new height, in pixels.
     */
    RenderTarget2D.prototype.resize = function (newWidth, newHeight) {
        this.__resize(newWidth, newHeight, true);
    };
    /**
     * Update the content of this {@link RenderTarget2D} if the source is a {@link HTMLCanvasElement},
     * {@link HTMLImageElement}, {@link HTMLVideoElement}, or {@link ImageData}. This operation will retrieve
     * current image (a snapshot if it is a dynamic canvas or image sequence) and draw it on this
     * {@link RenderTarget2D}.
     */
    RenderTarget2D.prototype.updateImageContent = function () {
        var image = this._image;
        if (this._texture === null || image === null) {
            return;
        }
        var glc = this._glc;
        glc.bindTexture(gl.TEXTURE_2D, this._texture);
        glc.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        glc.bindTexture(gl.TEXTURE_2D, null);
    };
    /**
     * Update image size to fit the whole scene.
     */
    RenderTarget2D.prototype.updateImageSize = function () {
        var image = this._image;
        if (this._texture === null || image === null) {
            return;
        }
        // TODO: Maybe this operation should not be done on each update call.
        // Find a way to optimize, for example, freeze the size when created, or implement a draw call
        // flexible enough to handle all sort of sizes.
        try {
            image.width = _util_1._util.power2Roundup(image.width);
            image.height = _util_1._util.power2Roundup(image.height);
        }
        catch (ex) {
        }
        this._originalWidth = this._fitWidth = image.width;
        this._originalHeight = this._fitHeight = image.height;
    };
    /**
     * Initializes the {@link RenderTarget2D}.
     * @param glc {WebGLRenderingContext} The {@link WebGLRenderingContext} used to manipulate the {@link RenderTarget2D}.
     * @param width {Number} The new width, in pixels.
     * @param height {Number} The new height, in pixels.
     * @param image {ImageData|HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} See {@link RenderTarget2D.constructor}
     * for more information.
     * @param isRoot {Boolean} See {@link RenderTarget2D.isRoot} for more information.
     * @private
     */
    RenderTarget2D.prototype.__initialize = function (glc, width, height, image, isRoot) {
        this._glc = glc;
        this._isRoot = isRoot;
        this._image = image;
        function error(message) {
            glc.deleteFramebuffer(this._frameBuffer);
            glc.deleteRenderbuffer(this._depthBuffer);
            glc.deleteTexture(this._texture);
            console.warn(message);
        }
        if (!isRoot) {
            this._frameBuffer = glc.createFramebuffer();
            if (this._frameBuffer === null) {
                return error("Failed to create the frame buffer.");
            }
            this._depthBuffer = glc.createRenderbuffer();
            if (this._depthBuffer === null) {
                return error("Failed to create the depth buffer.");
            }
            this._texture = glc.createTexture();
            if (this._texture === null) {
                return error("Failed to create the underlying texture.");
            }
        }
        this.__resize(width, height, false);
        if (!isRoot) {
            glc.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
            glc.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture, 0);
            glc.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._depthBuffer);
            var status = glc.checkFramebufferStatus(gl.FRAMEBUFFER);
            if (status !== gl.FRAMEBUFFER_COMPLETE) {
                return error("Frame buffer is not complete: code 0x" + status.toString(16));
            }
        }
        glc.bindRenderbuffer(gl.RENDERBUFFER, null);
        glc.bindTexture(gl.TEXTURE_2D, null);
        glc.bindFramebuffer(gl.FRAMEBUFFER, null);
    };
    /**
     * Resizes the {@link RenderTarget2D}.
     * @param newWidth {Number} The new width, in pixels.
     * @param newHeight {Number} The new height, in pixels.
     * @param unbind {Boolean} Whether should unbind the texture after resizing or not. Unbinding is not required during
     * initialization, but should be done during custom resizing.
     * @private
     */
    RenderTarget2D.prototype.__resize = function (newWidth, newHeight, unbind) {
        var glc = this._glc;
        var image = this._image;
        var isRoot = this._isRoot;
        var texture = this._texture;
        if (image === null) {
            newWidth |= 0;
            newHeight |= 0;
            this._originalWidth = newWidth;
            this._originalHeight = newHeight;
            if (!_util_1._util.isPowerOfTwo(newWidth)) {
                newWidth = _util_1._util.power2Roundup(newWidth);
            }
            if (!_util_1._util.isPowerOfTwo(newHeight)) {
                newHeight = _util_1._util.power2Roundup(newHeight);
            }
            this._fitWidth = newWidth;
            this._fitHeight = newHeight;
        }
        else {
            // TODO: WARNING: Not tested, may also need to round-up to power of 2.
            newWidth = this._originalWidth = this._fitWidth = image.width;
            newHeight = this._originalHeight = this._fitHeight = image.height;
        }
        if (texture !== null) {
            glc.bindTexture(gl.TEXTURE_2D, this._texture);
            glc.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            glc.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            glc.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            glc.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }
        if (image !== null) {
            // We flip the whole image vertically during the last stage, drawing to the screen.
            // So there is no need to flip the images here - all the contents in child RenderTarget2Ds
            // are vertically mirrored, and they will be transformed in one at last.
            //glc.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            if (texture !== null) {
                glc.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            }
        }
        else {
            glc.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            if (texture !== null) {
                glc.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, newWidth, newHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            }
        }
        if (!isRoot) {
            glc.bindRenderbuffer(gl.RENDERBUFFER, this._depthBuffer);
            glc.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, newWidth, newHeight);
        }
        if (unbind) {
            glc.bindRenderbuffer(gl.RENDERBUFFER, null);
            glc.bindTexture(gl.TEXTURE_2D, null);
        }
    };
    RenderTarget2D.textureCoords = null;
    RenderTarget2D.textureIndices = null;
    return RenderTarget2D;
})();
exports.RenderTarget2D = RenderTarget2D;
function initStaticFields(glc) {
    if (isInitializedStatically) {
        return;
    }
    var textureCoords = [
        0, 1,
        1, 1,
        0, 0,
        1, 0
    ];
    var textureIndices = [
        0, 1, 2,
        1, 2, 3
    ];
    RenderTarget2D.textureCoords = PackedArrayBuffer_1.PackedArrayBuffer.create(glc, textureCoords, gl.FLOAT, gl.ARRAY_BUFFER);
    RenderTarget2D.textureIndices = PackedArrayBuffer_1.PackedArrayBuffer.create(glc, textureIndices, gl.UNSIGNED_SHORT, gl.ELEMENT_ARRAY_BUFFER);
    isInitializedStatically = true;
}



},{"../_util/_util":5,"./PackedArrayBuffer":92}],95:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var VertexShaders_1 = require("./VertexShaders");
var FragmentShaders_1 = require("./FragmentShaders");
var WebGLDataType_1 = require("./WebGLDataType");
var _util_1 = require("../_util/_util");
var gl = this.WebGLRenderingContext || window.WebGLRenderingContext;
var ShaderBase = (function () {
    function ShaderBase(manager, vertexSource, fragmentSource, uniforms, attributes) {
        this._shaderManager = null;
        this._vertexSource = null;
        this._fragmentSource = null;
        this._vertexShader = null;
        this._fragmentShader = null;
        this._program = null;
        this._uniforms = null;
        this._attributes = null;
        this._id = -1;
        this._glc = null;
        this._shaderManager = manager;
        this._vertexSource = vertexSource;
        this._fragmentSource = fragmentSource;
        this._id = manager.getNextAvailableID();
        this.__initialize(manager.context, vertexSource, fragmentSource);
        this.select();
        if (_util_1._util.isUndefinedOrNull(uniforms) || _util_1._util.isUndefinedOrNull(attributes)) {
            this._uniforms = new Map();
            this._attributes = new Map();
            this.__localInit(manager, this._uniforms, this._attributes);
        }
        else {
            this._uniforms = uniforms;
            this._attributes = attributes;
        }
        this.__cacheUniformLocations();
        this.__cacheAttributeLocations();
        this.syncUniforms();
    }
    Object.defineProperty(ShaderBase.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    ShaderBase.prototype.dispose = function () {
        var glc = this._glc;
        glc.deleteProgram(this._program);
        glc.deleteShader(this._vertexShader);
        glc.deleteShader(this._fragmentShader);
        this._glc = null;
        this._uniforms = null;
        this._attributes = null;
        this._vertexShader = null;
        this._fragmentShader = null;
        this._vertexSource = null;
        this._fragmentSource = null;
        this._shaderManager = null;
    };
    ShaderBase.prototype.syncUniforms = function () {
        var _this = this;
        this._uniforms.forEach(function (v) {
            _this.__syncUniform(v);
        });
    };
    ShaderBase.prototype.changeValue = function (name, callback) {
        var uniform = this._uniforms.get(name);
        if (uniform !== undefined && uniform !== null) {
            callback(uniform);
        }
    };
    ShaderBase.prototype.select = function () {
        this._glc.useProgram(this._program);
    };
    ShaderBase.prototype.getUniformLocation = function (name) {
        return this._program !== null ? this._glc.getUniformLocation(this._program, name) : null;
    };
    ShaderBase.prototype.getAttributeLocation = function (name) {
        return this._program !== null ? this._glc.getAttribLocation(this._program, name) : -1;
    };
    Object.defineProperty(ShaderBase.prototype, "vertexSource", {
        get: function () {
            return this._vertexSource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderBase.prototype, "fragmentSource", {
        get: function () {
            return this._fragmentSource;
        },
        enumerable: true,
        configurable: true
    });
    ShaderBase.prototype.__initialize = function (glc, vertexSource, fragmentSource) {
        this._glc = glc;
        function error(message, extra) {
            if (this._vertexShader !== null) {
                glc.deleteShader(this._vertexShader);
            }
            if (this._fragmentShader !== null) {
                glc.deleteShader(this._fragmentShader);
            }
            if (this._program !== null) {
                glc.deleteProgram(this._program);
            }
            this._vertexShader = this._fragmentShader = this._program = null;
            if (message !== undefined && message !== null) {
                if (extra !== undefined) {
                    console.warn(message, extra);
                }
                else {
                    console.warn(message);
                }
            }
        }
        this._vertexShader = createShaderFromSource(glc, vertexSource, gl.VERTEX_SHADER);
        this._fragmentShader = createShaderFromSource(glc, fragmentSource, gl.FRAGMENT_SHADER);
        if (this._vertexShader === null || this._fragmentShader === null) {
            return error("Vertex shader or fragment shader is null.");
        }
        this._program = glc.createProgram();
        if (this._program === null) {
            return error("Failed to create program.");
        }
        glc.attachShader(this._program, this._vertexShader);
        glc.attachShader(this._program, this._fragmentShader);
        glc.linkProgram(this._program);
        var isLinked = glc.getProgramParameter(this._program, gl.LINK_STATUS);
        if (!isLinked) {
            var errorLog = glc.getProgramInfoLog(this._program);
            return error("Failed to link program: ", errorLog);
        }
    };
    ShaderBase.prototype.__syncUniform = function (uniform) {
        var location = uniform.location;
        var value = uniform.value;
        var glc = this._glc;
        /**
         * @type {Number}
         */
        var i = 0;
        /**
         * @type {Number}
         */
        var il = 0;
        switch (uniform.type) {
            case WebGLDataType_1.WebGLDataType.UBool:
                glc.uniform1i(location, value ? 1 : 0);
                break;
            case WebGLDataType_1.WebGLDataType.U1I:
                glc.uniform1i(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.U1F:
                glc.uniform1f(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.U2F:
                glc.uniform2f(location, value[0], value[1]);
                break;
            case WebGLDataType_1.WebGLDataType.U3F:
                glc.uniform3f(location, value[0], value[1], value[2]);
                break;
            case WebGLDataType_1.WebGLDataType.U4F:
                glc.uniform4f(location, value[0], value[1], value[2], value[3]);
                break;
            case WebGLDataType_1.WebGLDataType.UV2:
                glc.uniform2f(location, value.x, value.y);
                break;
            case WebGLDataType_1.WebGLDataType.UV3:
                glc.uniform3f(location, value.x, value.y, value.z);
                break;
            case WebGLDataType_1.WebGLDataType.UV4:
                glc.uniform4f(location, value.x, value.y, value.z, value.w);
                break;
            case WebGLDataType_1.WebGLDataType.U1IV:
                glc.uniform1iv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.U2IV:
                glc.uniform2iv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.U3IV:
                glc.uniform3iv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.U4IV:
                glc.uniform4iv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.U1FV:
                glc.uniform1fv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.U2FV:
                glc.uniform2fv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.U3FV:
                glc.uniform3fv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.U4FV:
                glc.uniform4fv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.UMat2:
                glc.uniformMatrix2fv(location, uniform.transpose, value);
                break;
            case WebGLDataType_1.WebGLDataType.UMat3:
                glc.uniformMatrix3fv(location, uniform.transpose, value);
                break;
            case WebGLDataType_1.WebGLDataType.UMat4:
                glc.uniformMatrix4fv(location, uniform.transpose, value);
                break;
            case WebGLDataType_1.WebGLDataType.UIV:
                glc.uniform3iv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.UFV:
                glc.uniform3fv(location, value);
                break;
            case WebGLDataType_1.WebGLDataType.UV2V:
                if (!uniform.array) {
                    uniform.array = new Float32Array(2 * value.length);
                }
                for (i = 0, il = value.length; i < il; i++) {
                    uniform.array[i * 2] = value[i].x;
                    uniform.array[i * 2 + 1] = value[i].y;
                }
                glc.uniform2fv(location, uniform.array);
                break;
            case WebGLDataType_1.WebGLDataType.UV3V:
                if (!uniform.array) {
                    uniform.array = new Float32Array(3 * value.length);
                }
                for (i = 0, il = value.length; i < il; i++) {
                    uniform.array[i * 3] = value[i].x;
                    uniform.array[i * 3 + 1] = value[i].y;
                    uniform.array[i * 3 + 2] = value[i].z;
                }
                glc.uniform2fv(location, uniform.array);
                break;
            case WebGLDataType_1.WebGLDataType.UV4V:
                if (!uniform.array) {
                    uniform.array = new Float32Array(4 * value.length);
                }
                for (i = 0, il = value.length; i < il; i++) {
                    uniform.array[i * 4] = value[i].x;
                    uniform.array[i * 4 + 1] = value[i].y;
                    uniform.array[i * 4 + 2] = value[i].z;
                    uniform.array[i * 4 + 3] = value[i].w;
                }
                glc.uniform2fv(location, uniform.array);
                break;
            case WebGLDataType_1.WebGLDataType.USampler2D:
                glc.activeTexture(gl["TEXTURE" + value.toString()]);
                glc.bindTexture(gl.TEXTURE_2D, uniform.texture);
                glc.uniform1i(location, value);
                break;
            default:
                console.warn("Uniform [" + uniform.name + "]: unknown format " + uniform.type);
                break;
        }
    };
    ShaderBase.prototype.__cacheUniformLocations = function () {
        var glc = this._glc;
        var program = this._program;
        this._uniforms.forEach(function (v, k) {
            v.location = glc.getUniformLocation(program, k);
        });
    };
    ShaderBase.prototype.__cacheAttributeLocations = function () {
        var glc = this._glc;
        var program = this._program;
        this._attributes.forEach(function (v, k) {
            v.location = glc.getAttribLocation(program, k);
        });
    };
    ShaderBase.prototype.__localInit = function (manager, uniforms, attributes) {
    };
    ShaderBase.SHADER_CLASS_NAME = "ShaderBase";
    ShaderBase.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.buffered;
    ShaderBase.VERTEX_SOURCE = VertexShaders_1.VertexShaders.buffered;
    return ShaderBase;
})();
exports.ShaderBase = ShaderBase;
function createShaderFromSource(glc, source, type) {
    var shader = glc.createShader(type);
    if (shader === null) {
        console.warn("Cannot create shader.");
        return null;
    }
    glc.shaderSource(shader, source);
    glc.compileShader(shader);
    var isCompiled = glc.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!isCompiled) {
        var error = glc.getShaderInfoLog(shader);
        console.warn("Failed to load shader: " + error);
        glc.deleteShader(shader);
        return null;
    }
    return shader;
}



},{"../_util/_util":5,"./FragmentShaders":91,"./VertexShaders":99,"./WebGLDataType":100}],96:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var ShaderID = (function () {
    function ShaderID() {
    }
    Object.defineProperty(ShaderID, "PRIMITIVE", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderID, "BLUR_X", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderID, "BLUR_Y", {
        get: function () {
            return 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderID, "REPLICATE", {
        get: function () {
            return 3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderID, "COLOR_TRANSFORM", {
        get: function () {
            return 4;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderID, "FXAA", {
        get: function () {
            return 5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderID, "BLUR2", {
        get: function () {
            return 6;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderID, "COPY_IMAGE", {
        get: function () {
            return 7;
        },
        enumerable: true,
        configurable: true
    });
    return ShaderID;
})();
exports.ShaderID = ShaderID;



},{}],97:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/17.
 */
var PrimitiveShader_1 = require("./shaders/PrimitiveShader");
var BlurXShader_1 = require("./shaders/BlurXShader");
var BlurYShader_1 = require("./shaders/BlurYShader");
var ReplicateShader_1 = require("./shaders/ReplicateShader");
var ColorTransformShader_1 = require("./shaders/ColorTransformShader");
var FxaaShader_1 = require("./shaders/FxaaShader");
var Blur2Shader_1 = require("./shaders/Blur2Shader");
var CopyImageShader_1 = require("./shaders/CopyImageShader");
var ShaderManager = (function () {
    function ShaderManager(renderer) {
        this._renderer = null;
        this._shaders = null;
        this._currentShader = null;
        this._renderer = renderer;
        this._shaders = [];
        this.__insertShaders();
    }
    ShaderManager.prototype.dispose = function () {
        for (var i = 0; i < this._shaders.length; ++i) {
            this._shaders[i].dispose();
        }
        this._currentShader = null;
        this._renderer = null;
        this._shaders = null;
    };
    ShaderManager.prototype.getNextAvailableID = function () {
        return this._shaders.length;
    };
    ShaderManager.prototype.loadShader = function (shaderName, uniforms, attributes) {
        var returnID = -1;
        try {
            var SHADER_CLASS = require("./shaders/" + shaderName + "Shader");
            var shaderClassName = SHADER_CLASS.SHADER_CLASS_NAME;
            var shader = null;
            shader = new SHADER_CLASS(this, SHADER_CLASS.VERTEX_SOURCE, SHADER_CLASS.FRAGMENT_SOURCE, uniforms, attributes);
            this._shaders.push(shader);
            returnID = shader.id;
        }
        catch (e) {
        }
        return returnID;
    };
    ShaderManager.prototype.selectShader = function (id) {
        var shader = this.__getShader(id);
        if (shader !== null) {
            shader.select();
            this._currentShader = shader;
        }
    };
    Object.defineProperty(ShaderManager.prototype, "currentShader", {
        get: function () {
            return this._currentShader;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderManager.prototype, "context", {
        get: function () {
            return this._renderer.context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderManager.prototype, "renderer", {
        get: function () {
            return this._renderer;
        },
        enumerable: true,
        configurable: true
    });
    ShaderManager.prototype.__getShader = function (id) {
        var shader = null;
        try {
            shader = this._shaders[id];
        }
        catch (e) {
        }
        return shader;
    };
    ShaderManager.prototype.__insertShaders = function () {
        var shaderList = this._shaders;
        shaderList.push(new PrimitiveShader_1.PrimitiveShader(this));
        shaderList.push(new BlurXShader_1.BlurXShader(this));
        shaderList.push(new BlurYShader_1.BlurYShader(this));
        shaderList.push(new ReplicateShader_1.ReplicateShader(this));
        shaderList.push(new ColorTransformShader_1.ColorTransformShader(this));
        shaderList.push(new FxaaShader_1.FxaaShader(this));
        shaderList.push(new Blur2Shader_1.Blur2Shader(this));
        shaderList.push(new CopyImageShader_1.CopyImageShader(this));
    };
    return ShaderManager;
})();
exports.ShaderManager = ShaderManager;



},{"./shaders/Blur2Shader":118,"./shaders/BlurXShader":119,"./shaders/BlurYShader":120,"./shaders/ColorTransformShader":122,"./shaders/CopyImageShader":123,"./shaders/FxaaShader":124,"./shaders/PrimitiveShader":125,"./shaders/ReplicateShader":126}],98:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/17.
 */
var WebGLDataType_1 = require("./WebGLDataType");
var UniformCache = (function () {
    function UniformCache() {
        this.name = null;
        this.type = WebGLDataType_1.WebGLDataType.UUnknown;
        this.location = null;
        this.value = undefined;
        this.transpose = false;
        this.array = null;
        this.texture = null;
    }
    return UniformCache;
})();
exports.UniformCache = UniformCache;



},{"./WebGLDataType":100}],99:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var Values = {};
var VertexShaders = (function () {
    function VertexShaders() {
    }
    Object.defineProperty(VertexShaders, "buffered", {
        get: function () {
            return Values.buffered;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexShaders, "blurX", {
        get: function () {
            return Values.blurX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexShaders, "blurY", {
        get: function () {
            return Values.blurY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexShaders, "primitive", {
        get: function () {
            return Values.primitive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexShaders, "replicate", {
        get: function () {
            return Values.replicate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexShaders, "fxaa", {
        get: function () {
            return Values.fxaa;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexShaders, "blur2", {
        get: function () {
            return Values.blur2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexShaders, "copyImage", {
        get: function () {
            return Values.copyImage;
        },
        enumerable: true,
        configurable: true
    });
    return VertexShaders;
})();
exports.VertexShaders = VertexShaders;
Values.buffered = [
    "attribute vec3 aVertexPosition;",
    "attribute vec2 aTextureCoord;",
    "",
    "uniform mat4 uProjectionMatrix;",
    "",
    "varying vec2 vTextureCoord;",
    "",
    "void main() {",
    "   gl_Position = uProjectionMatrix * vec4(aVertexPosition.xyz, 1.0);",
    "   vTextureCoord = aTextureCoord;",
    "}"
].join("\n");
Values.blurX = [
    "precision mediump float;",
    "",
    "attribute vec3 aVertexPosition;",
    "attribute vec2 aTextureCoord;",
    "",
    "uniform float uStrength;",
    "uniform mat4 uProjectionMatrix;",
    "",
    "varying vec2 vTextureCoord;",
    "varying vec2 vBlurTexCoords[6];",
    "",
    "void main()",
    "{",
    "    gl_Position = uProjectionMatrix * vec4(aVertexPosition.xyz, 1.0);",
    "    vTextureCoord = aTextureCoord;",
    "",
    "    vBlurTexCoords[0] = aTextureCoord + vec2(-0.012 * uStrength, 0.0);",
    "    vBlurTexCoords[1] = aTextureCoord + vec2(-0.008 * uStrength, 0.0);",
    "    vBlurTexCoords[2] = aTextureCoord + vec2(-0.004 * uStrength, 0.0);",
    "    vBlurTexCoords[3] = aTextureCoord + vec2( 0.004 * uStrength, 0.0);",
    "    vBlurTexCoords[4] = aTextureCoord + vec2( 0.008 * uStrength, 0.0);",
    "    vBlurTexCoords[5] = aTextureCoord + vec2( 0.012 * uStrength, 0.0);",
    "}"
].join("\n");
Values.blurY = [
    "precision mediump float;",
    "",
    "attribute vec3 aVertexPosition;",
    "attribute vec2 aTextureCoord;",
    "",
    "uniform float uStrength;",
    "uniform mat4 uProjectionMatrix;",
    "",
    "varying vec2 vTextureCoord;",
    "varying vec2 vBlurTexCoords[6];",
    "",
    "void main()",
    "{",
    "    gl_Position = uProjectionMatrix * vec4(aVertexPosition.xyz, 1.0);",
    "    vTextureCoord = aTextureCoord;",
    "",
    "    vBlurTexCoords[0] = aTextureCoord + vec2(0.0, -0.012 * uStrength);",
    "    vBlurTexCoords[1] = aTextureCoord + vec2(0.0, -0.008 * uStrength);",
    "    vBlurTexCoords[2] = aTextureCoord + vec2(0.0, -0.004 * uStrength);",
    "    vBlurTexCoords[3] = aTextureCoord + vec2(0.0,  0.004 * uStrength);",
    "    vBlurTexCoords[4] = aTextureCoord + vec2(0.0,  0.008 * uStrength);",
    "    vBlurTexCoords[5] = aTextureCoord + vec2(0.0,  0.012 * uStrength);",
    "}"
].join("\n");
Values.primitive = [
    "precision mediump float;",
    "",
    "attribute vec3 aVertexPosition;",
    "attribute vec4 aVertexColor;",
    "",
    "uniform mat4 uProjectionMatrix;",
    "uniform mat4 uTransformMatrix;",
    "",
    "varying vec4 vVertexColor;",
    "",
    "void main() {",
    "   gl_Position = uProjectionMatrix * uTransformMatrix * vec4(aVertexPosition.xyz, 1.0);",
    "   vVertexColor = aVertexColor;",
    "}"
].join("\n");
Values.replicate = [
    "attribute vec3 aVertexPosition;",
    "attribute vec2 aTextureCoord;",
    "",
    "uniform mat4 uProjectionMatrix;",
    "uniform vec2 uOriginalSize;",
    "uniform vec2 uFitSize;",
    "uniform bool uFlipX;",
    "uniform bool uFlipY;",
    "",
    "varying vec2 vTextureCoord;",
    "",
    "void main() {",
    "    vec3 newVertexPostion = aVertexPosition;",
    "   vec2 newTextureCoord = aTextureCoord;",
    "   if (uFlipX) {",
    "       newTextureCoord.x = 1.0 - newTextureCoord.x;",
    "       newVertexPostion.x -= (uFitSize - uOriginalSize).x;",
    "   }",
    "   if (uFlipY) {",
    "       newTextureCoord.y = 1.0 - newTextureCoord.y;",
    "       newVertexPostion.y -= (uFitSize - uOriginalSize).y;",
    "   }",
    "   gl_Position = uProjectionMatrix * vec4(newVertexPostion.xyz, 1.0);",
    "   vTextureCoord = newTextureCoord;",
    "}"
].join("\n");
// For the full license, please refer to shaders/glsl/fxaa.vert
Values.fxaa = [
    "precision mediump float;",
    "",
    "attribute vec3 aVertexPosition;",
    "attribute vec2 aTextureCoord;",
    "",
    "uniform mat4 uProjectionMatrix;",
    "uniform vec2 uResolution;",
    "",
    "varying vec2 vTextureCoord;",
    "varying vec2 vResolution;",
    "",
    "varying vec2 v_rgbNW;",
    "varying vec2 v_rgbNE;",
    "varying vec2 v_rgbSW;",
    "varying vec2 v_rgbSE;",
    "varying vec2 v_rgbM;",
    "",
    "void texcoords(vec2 fragCoord, vec2 resolution,",
    "   out vec2 v_rgbNW, out vec2 v_rgbNE,",
    "   out vec2 v_rgbSW, out vec2 v_rgbSE,",
    "   out vec2 v_rgbM) {",
    "   vec2 inverseVP = 1.0 / resolution.xy;",
    "   v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;",
    "   v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;",
    "   v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;",
    "   v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;",
    "   v_rgbM = vec2(fragCoord * inverseVP);",
    "}",
    "",
    "void main() {",
    "   gl_Position = uProjectionMatrix * vec4(aVertexPosition, 1.0);",
    "   vTextureCoord = aTextureCoord;",
    "   vResolution = uResolution;",
    "   ",
    "   texcoords(aTextureCoord * uResolution, uResolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);",
    "}"
].join("\n");
Values.blur2 = [
    "precision mediump float;",
    "",
    "attribute vec3 aVertexPosition;",
    "attribute vec2 aTextureCoord;",
    "",
    "uniform mat4 uProjectionMatrix;",
    "",
    "varying vec2 vTextureCoord;",
    "",
    "void main()",
    "{",
    "    gl_Position = uProjectionMatrix * vec4(aVertexPosition.xyz, 1.0);",
    "    vTextureCoord = aTextureCoord;",
    "}"
].join("\n");
Values.copyImage = [
    "attribute vec3 aVertexPosition;",
    "attribute vec2 aTextureCoord;",
    "",
    "uniform mat4 uProjectionMatrix;",
    "uniform mat4 uTransformMatrix;",
    "uniform vec2 uOriginalSize;",
    "uniform vec2 uFitSize;",
    "uniform bool uFlipX;",
    "uniform bool uFlipY;",
    "",
    "varying vec2 vTextureCoord;",
    "",
    "void main() {",
    "    vec3 newVertexPostion = aVertexPosition;",
    "    vec2 newTextureCoord = aTextureCoord;",
    "    if (uFlipX) {",
    "        newTextureCoord.x = 1.0 - newTextureCoord.x;",
    "        newVertexPostion.x -= (uFitSize - uOriginalSize).x;",
    "    }",
    "    if (uFlipY) {",
    "        newTextureCoord.y = 1.0 - newTextureCoord.y;",
    "        newVertexPostion.y -= (uFitSize - uOriginalSize).y;",
    "    }",
    "    gl_Position = uProjectionMatrix * uTransformMatrix * vec4(newVertexPostion.xyz, 1.0);",
    "    vTextureCoord = newTextureCoord;",
    "}"
].join("\n");



},{}],100:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/17.
 */
(function (WebGLDataType) {
    WebGLDataType[WebGLDataType["UUnknown"] = 0] = "UUnknown";
    WebGLDataType[WebGLDataType["UBool"] = 1] = "UBool";
    WebGLDataType[WebGLDataType["U1I"] = 2] = "U1I";
    WebGLDataType[WebGLDataType["U1F"] = 3] = "U1F";
    WebGLDataType[WebGLDataType["U2F"] = 4] = "U2F";
    WebGLDataType[WebGLDataType["U3F"] = 5] = "U3F";
    WebGLDataType[WebGLDataType["U4F"] = 6] = "U4F";
    WebGLDataType[WebGLDataType["UV2"] = 7] = "UV2";
    WebGLDataType[WebGLDataType["UV3"] = 8] = "UV3";
    WebGLDataType[WebGLDataType["UV4"] = 9] = "UV4";
    WebGLDataType[WebGLDataType["U1IV"] = 10] = "U1IV";
    WebGLDataType[WebGLDataType["U2IV"] = 11] = "U2IV";
    WebGLDataType[WebGLDataType["U3IV"] = 12] = "U3IV";
    WebGLDataType[WebGLDataType["U4IV"] = 13] = "U4IV";
    WebGLDataType[WebGLDataType["U1FV"] = 14] = "U1FV";
    WebGLDataType[WebGLDataType["U2FV"] = 15] = "U2FV";
    WebGLDataType[WebGLDataType["U3FV"] = 16] = "U3FV";
    WebGLDataType[WebGLDataType["U4FV"] = 17] = "U4FV";
    WebGLDataType[WebGLDataType["UMat2"] = 18] = "UMat2";
    WebGLDataType[WebGLDataType["UMat3"] = 19] = "UMat3";
    WebGLDataType[WebGLDataType["UMat4"] = 20] = "UMat4";
    WebGLDataType[WebGLDataType["UIV"] = 21] = "UIV";
    WebGLDataType[WebGLDataType["UFV"] = 22] = "UFV";
    WebGLDataType[WebGLDataType["UV2V"] = 23] = "UV2V";
    WebGLDataType[WebGLDataType["UV3V"] = 24] = "UV3V";
    WebGLDataType[WebGLDataType["UV4V"] = 25] = "UV4V";
    WebGLDataType[WebGLDataType["USampler2D"] = 26] = "USampler2D";
})(exports.WebGLDataType || (exports.WebGLDataType = {}));
var WebGLDataType = exports.WebGLDataType;



},{}],101:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/17.
 */
var libtess = require("libtess");
var ShaderManager_1 = require("./ShaderManager");
var FilterManager_1 = require("./FilterManager");
var RenderTarget2D_1 = require("./RenderTarget2D");
var WebGLUtils_1 = require("./WebGLUtils");
var _util_1 = require("../_util/_util");
var RenderHelper_1 = require("./RenderHelper");
var BlendMode_1 = require("../flash/display/BlendMode");
var gl = this.WebGLRenderingContext || window.WebGLRenderingContext;
/**
 * The WebGL renderer, main provider of the rendering services.
 */
var WebGLRenderer = (function () {
    /**
     * Instantiates a new {@link WebGLRenderer}.
     * @param width {Number} The width for presentation of the renderer.
     * @param height {Number} The height for presentation of the renderer.
     * @param options {RendererOptions} Options for initializing the newly created {@link WebGLRenderer}.
     * @implements {IDisposable}
     */
    function WebGLRenderer(width, height, options) {
        this._currentRenderTarget = null;
        this._currentBlendMode = null;
        this._inputTarget = null;
        this._screenTarget = null;
        this._filterManager = null;
        this._shaderManager = null;
        this._tessellator = null;
        this._context = null;
        this._options = null;
        this._isInitialized = false;
        this.__initialize(width, height, options);
    }
    /**
     * Clear the screen.
     */
    WebGLRenderer.prototype.clear = function () {
        if (this._screenTarget !== null) {
            this._screenTarget.clear();
        }
    };
    /**
     * Disposes the {@link WebGLRenderer} and related resources.
     */
    WebGLRenderer.prototype.dispose = function () {
        if (this._isInitialized) {
            this._inputTarget.dispose();
            this._screenTarget.dispose();
            this._filterManager.dispose();
            this._shaderManager.dispose();
            this._filterManager = null;
            this._shaderManager = null;
            this._inputTarget = null;
            this._screenTarget = null;
            this._context = null;
            if (this._view.parentNode !== null && this._view.parentNode !== undefined) {
                this._view.parentNode.removeChild(this._view);
            }
            this._view = null;
        }
    };
    /**
     * Switches current render target to a specified {@link RenderTarget2D}.
     * @param [target] {RenderTarget2D} The {@link RenderTarget2D} that will be used. Null means using the default first-time
     * render target of the {@link WebGLRenderer}. The default value is null.
     */
    WebGLRenderer.prototype.setRenderTarget = function (target) {
        if (target === void 0) { target = null; }
        if (_util_1._util.isUndefinedOrNull(target)) {
            this._currentRenderTarget = this._inputTarget;
        }
        else {
            this._currentRenderTarget = target;
        }
        this._currentRenderTarget.activate();
    };
    Object.defineProperty(WebGLRenderer.prototype, "currentRenderTarget", {
        /**
         * Returns current render target of the {@link WebGLRenderer}.
         * @returns {RenderTarget2D} Current render target of the {@link WebGLRenderer}.
         */
        get: function () {
            return this._currentRenderTarget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "view", {
        /**
         * Returns the output &lt;canvas&gt; for displaying the contents rendered.
         * @returns {HTMLCanvasElement} The output &lt;canvas&gt;.
         */
        get: function () {
            return this._view;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "context", {
        /**
         * Returns the {@link WebGLRenderingContext} attached to the {@link WebGLRenderer}.
         * @returns {WebGLRenderingContext} The {@link WebGLRenderingContext} attached to the {@link WebGLRenderer}.
         */
        get: function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "shaderManager", {
        /**
         * Returns the {@link ShaderManager} used by the {@link WebGLRenderer}.
         * @returns {ShaderManager} The {@link ShaderManager} used by the {@link WebGLRenderer}.
         */
        get: function () {
            return this._shaderManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "filterManager", {
        /**
         * Returns the {@link FilterManager} used by the {@link WebGLRenderer}.
         * @returns {FilterManager} The {@link FilterManager} used by the {@link WebGLRenderer}.
         */
        get: function () {
            return this._filterManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "tessellator", {
        /**
         * Returns the tessellator used by the {@link WebGLRenderer}.
         * @returns {libtess.GluTesselator} The tessellator used by the {@link WebGLRenderer}.
         */
        get: function () {
            return this._tessellator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "inputTarget", {
        /**
         * Returns the first-time render target of the {@link WebGLRenderer}. Contents are all rendered to this target. Then,
         * the contents on this target are copied to {@link WebGLRenderer.screenTarget} for postprocessing.
         * @returns {RenderTarget2D} The first-time render target of the {@link WebGLRenderer}.
         */
        get: function () {
            return this._inputTarget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebGLRenderer.prototype, "screenTarget", {
        /**
         * Returns the final output of the {@link WebGLRenderer}. This target is always a root render target, which directly
         * renders to the attached &lt;canvas&gt;. If FXAA is enabled, the copying process from {@link WebGLRenderer.inputTarget}
         * to this target performs a FXAA filtering. If not, it is a simple replicating process.
         * @returns {RenderTarget2D} The output of the {@link WebGLRenderer}.
         */
        get: function () {
            return this._screenTarget;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new {@link RenderTarget2D} as a buffer. {@link RenderTarget2D}s should be only instanted through this
     * factory method, and be released using {@link WebGLRenderer.releaseRenderTarget}.
     * @param [image] {ImageData|HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} See {@link RenderTarget2D.image}
     * for more information.
     * @returns {RenderTarget2D} The created {@link RenderTarget2D}.
     */
    WebGLRenderer.prototype.createRenderTarget = function (image) {
        if (image === void 0) { image = null; }
        return new RenderTarget2D_1.RenderTarget2D(this, image, false);
    };
    /**
     * Creates a new {@link RenderTarget2D} as an output to the screen. {@link RenderTarget2D}s should be only instanted
     * through this factory method, and be released using {@link WebGLRenderer.releaseRenderTarget}.
     * @param [image] {ImageData|HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} See {@link RenderTarget2D.image}
     * for more information.
     * @returns {RenderTarget2D} The created {@link RenderTarget2D}.
     */
    WebGLRenderer.prototype.createRootRenderTarget = function (image) {
        if (image === void 0) { image = null; }
        return new RenderTarget2D_1.RenderTarget2D(this, image, true);
    };
    /**
     * Releases a {@link RenderTarget2D} created by the {@link WebGLRenderer}.
     * @param target {RenderTarget2D} The {@link RenderTarget2D} to be released.
     */
    WebGLRenderer.prototype.releaseRenderTarget = function (target) {
        if (target !== null && target !== undefined) {
            target.dispose();
        }
    };
    /**
     * Performs a simple copying from the source {@link RenderTarget2D} to the destination {@link RenderTarget2D}.
     * @param source {RenderTarget2D} The source of contents.
     * @param destination {RenderTarget2D} The destination to which the contents are copyied.
     * @param clearOutput {Boolean} Whether to clear the contents of the destination before copying or not.
     */
    WebGLRenderer.prototype.copyRenderTargetContent = function (source, destination, clearOutput) {
        RenderHelper_1.RenderHelper.copyTargetContent(this, source, destination, false, false, clearOutput);
    };
    /**
     * Performs an extended copying from the source {@link RenderTarget2D} to the destination {@link RenderTarget2D}.
     * @param source {RenderTarget2D} The source of contents.
     * @param destination {RenderTarget2D} The destination to which the contents are copyied.
     * @param flipX {Boolean} Whether to flip the contents horizontally during copying or not.
     * @param flipY {Boolean} Whether to flip the contents vertically during copying or not.
     * @param clearOutput {Boolean} Whether to clear the contents of the destination before copying or not.
     */
    WebGLRenderer.prototype.copyRenderTargetContentEx = function (source, destination, flipX, flipY, clearOutput) {
        RenderHelper_1.RenderHelper.copyTargetContent(this, source, destination, flipX, flipY, clearOutput);
    };
    /**
     * Presents the final composition result.
     */
    WebGLRenderer.prototype.present = function () {
        this.copyRenderTargetContentEx(this._inputTarget, this._screenTarget, false, true, true);
    };
    /**
     * Set current blend mode. Blend modes affects how the visual contents are rendered.
     * @param blendMode {String} See {@link BlendMode} for more information.
     * @see {@link BlendMode}
     */
    WebGLRenderer.prototype.setBlendMode = function (blendMode) {
        if (!this._isInitialized) {
            return;
        }
        if (this._currentBlendMode === blendMode) {
            return;
        }
        var config = BMS[blendMode] || BMS[BlendMode_1.BlendMode.NORMAL];
        var glc = this._context;
        if (config[0] >= 0) {
            glc.blendEquation(gl.FUNC_ADD);
        }
        else {
            glc.blendEquation(gl.FUNC_SUBTRACT);
        }
        glc.blendFunc(config[1], config[2]);
        this._currentBlendMode = blendMode;
    };
    /**
     * Initializes the newly created {@link WebGLRenderer}.
     * @param width {Number} The width, in pixels.
     * @param height {Number} The height, in pixels.
     * @param options {RendererOptions} Initialization options.
     * @private
     */
    WebGLRenderer.prototype.__initialize = function (width, height, options) {
        if (this._isInitialized) {
            return;
        }
        this._isInitialized = true;
        this._options = _util_1._util.deepClone(options);
        var canvas = window.document.createElement("canvas");
        canvas.className = "glantern-view";
        canvas.width = width;
        canvas.height = height;
        var attributes = Object.create(null);
        attributes.alpha = options.transparent;
        attributes.antialias = options.antialias;
        attributes.premultipliedAlpha = true;
        attributes.depth = false;
        this._context = WebGLUtils_1.WebGLUtils.setupWebGL(canvas, attributes);
        this._view = canvas;
        var glc = this._context;
        glc.disable(gl.DEPTH_TEST);
        glc.disable(gl.CULL_FACE);
        glc.enable(gl.BLEND);
        this.setBlendMode(BlendMode_1.BlendMode.NORMAL);
        /*
         if (options.antialias) {
         // If anti-alias is on, then we need to draw the "screen" to a FXAA buffer
         this._receiveTarget = this.createRenderTarget(); // MSAA zoomFactor = 2
         this._screenTarget = this.createRootRenderTarget(); // MSAA zoomFactor = 1
         } else {
         // If anti-alias is off, then we will output to the screen, directly.
         this._receiveTarget = this.createRootRenderTarget();
         }
         */
        this._inputTarget = this.createRenderTarget();
        this._screenTarget = this.createRootRenderTarget();
        canvas.addEventListener("webglcontextlost", this.onContextLost.bind(this));
        canvas.addEventListener("webglcontextrestored", this.onContextRestored.bind(this));
        this._tessellator = new libtess.GluTesselator();
        this._shaderManager = new ShaderManager_1.ShaderManager(this);
        this._filterManager = new FilterManager_1.FilterManager(this);
        this.setRenderTarget(null);
        this.__initializeTessellator();
    };
    /**
     * Initializes the tessellator.
     * @private
     */
    WebGLRenderer.prototype.__initializeTessellator = function () {
        var tess = this._tessellator;
        tess.gluTessCallback(libtess.gluEnum.GLU_TESS_VERTEX_DATA, function (data, polyVertArray) {
            polyVertArray[polyVertArray.length - 1].push(data[0], data[1], data[2]);
        });
        tess.gluTessCallback(libtess.gluEnum.GLU_TESS_BEGIN_DATA, function (type, vertexArrays) {
            if (type !== libtess.primitiveType.GL_TRIANGLES) {
                console.warn('{TESS} expected TRIANGLES but got type: ' + type);
            }
            vertexArrays.push([]);
        });
        tess.gluTessCallback(libtess.gluEnum.GLU_TESS_ERROR, function (errorCode) {
            console.warn('{TESS} error number: ', errorCode);
        });
        tess.gluTessCallback(libtess.gluEnum.GLU_TESS_COMBINE, function (coords, data, weight) {
            return [coords[0], coords[1], coords[2]];
        });
        tess.gluTessCallback(libtess.gluEnum.GLU_TESS_EDGE_FLAG, function (flag) {
            // Do nothing
        });
    };
    /**
     * The event handler for handling the lost of active {@link WebGLRenderingContext}.
     * @param ev {Event} Event parameters.
     */
    WebGLRenderer.prototype.onContextLost = function (ev) {
    };
    /**
     * The event handler for handling the restoration of active {@link WebGLRenderingContext}.
     * @param ev {Event} Event parameters.
     */
    WebGLRenderer.prototype.onContextRestored = function (ev) {
    };
    /**
     * The default {@link RendererOptions} for instantiating a {@link WebGLRenderer}.
     * @type {RendererOptions}
     */
    WebGLRenderer.DEFAULT_OPTIONS = {
        antialias: false,
        depth: false,
        transparent: true
    };
    return WebGLRenderer;
})();
exports.WebGLRenderer = WebGLRenderer;
var BMS = Object.create(null);
BMS[BlendMode_1.BlendMode.ADD] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.ALPHA] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.DARKEN] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.DIFFERENCE] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.ERASE] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.HARDLIGHT] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.INVERT] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.LAYER] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.LIGHTEN] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.MULTIPLY] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.NORMAL] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.OVERLAY] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.SCREEN] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.SHADER] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
BMS[BlendMode_1.BlendMode.SUBTRACT] = [1, gl.ONE, gl.ONE_MINUS_SRC_ALPHA];



},{"../_util/_util":5,"../flash/display/BlendMode":28,"./FilterManager":90,"./RenderHelper":93,"./RenderTarget2D":94,"./ShaderManager":97,"./WebGLUtils":102,"libtess":128}],102:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/13.
 */
/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var gl = this.WebGLRenderingContext || window.WebGLRenderingContext;
var WebGLUtils = (function () {
    function WebGLUtils() {
    }
    WebGLUtils.setupWebGL = function (canvas, optionalAttributes) {
        function showLink(str) {
            var failHtml = makeFailHtml(str);
            console.error(failHtml);
            var container = canvas.parentElement;
            if (container) {
                container.innerHTML = failHtml;
            }
        }
        if (gl === undefined) {
            showLink(GET_A_WEBGL_BROWSER);
            return null;
        }
        var context = create3DContext(canvas, optionalAttributes);
        if (context == null) {
            showLink(OTHER_PROBLEM);
        }
        return context;
    };
    return WebGLUtils;
})();
exports.WebGLUtils = WebGLUtils;
function makeFailHtml(message) {
    return '' +
        '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
        '<td align="center">' +
        '<div style="display: table-cell; vertical-align: middle;">' +
        '<div style="">' + message + '</div>' +
        '</div>' +
        '</td></tr></table>';
}
function create3DContext(canvas, optionalAttributes) {
    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    var context = null;
    for (var i = 0; i < names.length; ++i) {
        try {
            context = canvas.getContext(names[i], optionalAttributes);
        }
        catch (e) {
        }
        if (context) {
            break;
        }
    }
    return context;
}
var GET_A_WEBGL_BROWSER = '' +
    'This page requires a browser that supports WebGL.<br/>' +
    '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';
var OTHER_PROBLEM = '' +
    "It doesn't appear your computer can support WebGL.<br/>" +
    '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';



},{}],103:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/22.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _util_1 = require("../../_util/_util");
var FilterBase_1 = require("../FilterBase");
var RenderHelper_1 = require("../RenderHelper");
var ShaderID_1 = require("../ShaderID");
var Blur2Filter = (function (_super) {
    __extends(Blur2Filter, _super);
    function Blur2Filter(manager) {
        _super.call(this, manager);
        this._tempTarget = null;
        this._strengthX = 5;
        this._strengthY = 5;
        this._pass = 1;
        this._tempTarget = manager.renderer.createRenderTarget();
    }
    Object.defineProperty(Blur2Filter.prototype, "strengthX", {
        get: function () {
            return this._strengthX;
        },
        set: function (v) {
            if (v < 0) {
                v = 1;
            }
            this._strengthX = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blur2Filter.prototype, "strengthY", {
        get: function () {
            return this._strengthY;
        },
        set: function (v) {
            if (v < 0) {
                v = 1;
            }
            this._strengthY = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Blur2Filter.prototype, "pass", {
        get: function () {
            return this._pass;
        },
        set: function (v) {
            v = _util_1._util.limitInto(v, 1, 3) | 0;
            this._pass = v;
        },
        enumerable: true,
        configurable: true
    });
    Blur2Filter.prototype.process = function (renderer, input, output, clearOutput) {
        var _this = this;
        // Larger value makes image smoother, darker (or less contrastive), but greatly improves efficiency.
        var passCoeff = 3;
        // See http://rastergrid.com/blog/2010/09/efficient-gaussian-blur-with-linear-sampling/
        var t1 = input, t2 = this._tempTarget;
        t2.clear();
        var t;
        for (var i = 0; i < this.pass * passCoeff; ++i) {
            RenderHelper_1.RenderHelper.renderBuffered(renderer, t1, t2, ShaderID_1.ShaderID.BLUR2, true, function (renderer) {
                var shader = renderer.shaderManager.currentShader;
                shader.setStrength(_this.strengthX / 4 / _this.pass / (t1.fitWidth / t1.originalWidth));
                shader.setResolution(input.fitWidth);
                shader.setBlurDirection([1.0, 0.0]);
            });
            t = t1;
            t1 = t2;
            t2 = t;
        }
        for (var i = 0; i < this.pass * passCoeff; ++i) {
            RenderHelper_1.RenderHelper.renderBuffered(renderer, t1, t2, ShaderID_1.ShaderID.BLUR2, true, function (renderer) {
                var shader = renderer.shaderManager.currentShader;
                shader.setStrength(_this.strengthY / 4 / _this.pass / (t1.fitWidth / t1.originalWidth));
                shader.setResolution(input.fitHeight);
                shader.setBlurDirection([0.0, 1.0]);
            });
            t = t1;
            t1 = t2;
            t2 = t;
        }
        renderer.copyRenderTargetContent(t1, output, clearOutput);
    };
    Blur2Filter.prototype.__initialize = function () {
        this._tempTarget = this._filterManager.renderer.createRenderTarget();
    };
    Blur2Filter.prototype.__dispose = function () {
        this._filterManager.renderer.releaseRenderTarget(this._tempTarget);
        this._tempTarget = null;
    };
    return Blur2Filter;
})(FilterBase_1.FilterBase);
exports.Blur2Filter = Blur2Filter;



},{"../../_util/_util":5,"../FilterBase":89,"../RenderHelper":93,"../ShaderID":96}],104:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BlurYFilter_1 = require("./BlurYFilter");
var BlurXFilter_1 = require("./BlurXFilter");
var _util_1 = require("../../_util/_util");
var FilterBase_1 = require("../FilterBase");
var BlurFilter = (function (_super) {
    __extends(BlurFilter, _super);
    function BlurFilter(manager) {
        _super.call(this, manager);
        this._tempTarget = null;
        this._strengthX = 5;
        this._strengthY = 5;
        this._pass = 1;
        this._blurXFilter = null;
        this._blurYFilter = null;
    }
    Object.defineProperty(BlurFilter.prototype, "strengthX", {
        get: function () {
            return this._strengthX;
        },
        set: function (v) {
            if (v < 0) {
                v = 1;
            }
            this._strengthX = v;
            if (this._blurXFilter !== null) {
                this._blurXFilter.strength = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlurFilter.prototype, "strengthY", {
        get: function () {
            return this._strengthY;
        },
        set: function (v) {
            if (v < 0) {
                v = 1;
            }
            this._strengthY = v;
            if (this._blurYFilter !== null) {
                this._blurYFilter.strength = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlurFilter.prototype, "pass", {
        get: function () {
            return this._pass;
        },
        set: function (v) {
            v = _util_1._util.limitInto(v, 1, 3) | 0;
            this._pass = v;
            if (this._blurXFilter !== null) {
                this._blurXFilter.pass = v;
            }
            if (this._blurYFilter !== null) {
                this._blurYFilter.pass = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    BlurFilter.prototype.process = function (renderer, input, output, clearOutput) {
        this._blurXFilter.process(renderer, input, this._tempTarget, true);
        this._blurYFilter.process(renderer, this._tempTarget, output, clearOutput);
    };
    BlurFilter.prototype.__initialize = function () {
        this._blurXFilter = new BlurXFilter_1.BlurXFilter(this._filterManager);
        this._blurYFilter = new BlurYFilter_1.BlurYFilter(this._filterManager);
        this._blurXFilter.initialize();
        this._blurYFilter.initialize();
        this._blurXFilter.strength = this.strengthX;
        this._blurYFilter.strength = this.strengthY;
        this._blurXFilter.pass = this.pass;
        this._blurYFilter.pass = this.pass;
        this._tempTarget = this._filterManager.renderer.createRenderTarget();
    };
    BlurFilter.prototype.__dispose = function () {
        this._filterManager.renderer.releaseRenderTarget(this._tempTarget);
        this._tempTarget = null;
        this._blurXFilter.dispose();
        this._blurYFilter.dispose();
        this._blurXFilter = this._blurYFilter = null;
    };
    return BlurFilter;
})(FilterBase_1.FilterBase);
exports.BlurFilter = BlurFilter;



},{"../../_util/_util":5,"../FilterBase":89,"./BlurXFilter":105,"./BlurYFilter":106}],105:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _util_1 = require("../../_util/_util");
var FilterBase_1 = require("../FilterBase");
var ShaderID_1 = require("../ShaderID");
var RenderHelper_1 = require("../RenderHelper");
var BlurXFilter = (function (_super) {
    __extends(BlurXFilter, _super);
    function BlurXFilter(manager) {
        _super.call(this, manager);
        this._strength = 5;
        this._pass = 1;
        this._tempTarget = null;
    }
    Object.defineProperty(BlurXFilter.prototype, "strength", {
        get: function () {
            return this._strength;
        },
        set: function (v) {
            if (v < 0) {
                v = 1;
            }
            this._strength = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlurXFilter.prototype, "pass", {
        get: function () {
            return this._pass;
        },
        set: function (v) {
            v = _util_1._util.limitInto(v, 1, 3) | 0;
            this._pass = v;
        },
        enumerable: true,
        configurable: true
    });
    BlurXFilter.prototype.process = function (renderer, input, output, clearOutput) {
        var _this = this;
        // Larger value makes image smoother, darker (or less contrastive), but greatly improves efficiency.
        var passCoeff = 3;
        var t1 = input, t2 = this._tempTarget;
        t2.clear();
        var t;
        for (var i = 0; i < passCoeff * this.pass; ++i) {
            RenderHelper_1.RenderHelper.renderBuffered(renderer, t1, t2, ShaderID_1.ShaderID.BLUR_X, true, function (renderer) {
                var shader = renderer.shaderManager.currentShader;
                shader.setStrength(_this.strength / 4 / _this.pass / (t1.fitWidth / t1.originalWidth));
            });
            t = t1;
            t1 = t2;
            t2 = t;
        }
        renderer.copyRenderTargetContent(t1, output, clearOutput);
    };
    BlurXFilter.prototype.__initialize = function () {
        this._tempTarget = this._filterManager.renderer.createRenderTarget();
    };
    BlurXFilter.prototype.__dispose = function () {
        this._filterManager.renderer.releaseRenderTarget(this._tempTarget);
        this._tempTarget = null;
    };
    return BlurXFilter;
})(FilterBase_1.FilterBase);
exports.BlurXFilter = BlurXFilter;



},{"../../_util/_util":5,"../FilterBase":89,"../RenderHelper":93,"../ShaderID":96}],106:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _util_1 = require("../../_util/_util");
var FilterBase_1 = require("../FilterBase");
var ShaderID_1 = require("../ShaderID");
var RenderHelper_1 = require("../RenderHelper");
var BlurYFilter = (function (_super) {
    __extends(BlurYFilter, _super);
    function BlurYFilter(manager) {
        _super.call(this, manager);
        this._strength = 5;
        this._pass = 1;
        this._tempTarget = null;
    }
    Object.defineProperty(BlurYFilter.prototype, "strength", {
        get: function () {
            return this._strength;
        },
        set: function (v) {
            if (v < 0) {
                v = 1;
            }
            this._strength = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlurYFilter.prototype, "pass", {
        get: function () {
            return this._pass;
        },
        set: function (v) {
            v = _util_1._util.limitInto(v, 1, 3) | 0;
            this._pass = v;
        },
        enumerable: true,
        configurable: true
    });
    BlurYFilter.prototype.process = function (renderer, input, output, clearOutput) {
        var _this = this;
        // Larger value makes image smoother, darker (or less contrastive), but greatly improves efficiency.
        var passCoeff = 3;
        var t1 = input, t2 = this._tempTarget;
        t2.clear();
        var t;
        for (var i = 0; i < passCoeff * this.pass; ++i) {
            RenderHelper_1.RenderHelper.renderBuffered(renderer, t1, t2, ShaderID_1.ShaderID.BLUR_Y, true, function (renderer) {
                var shader = renderer.shaderManager.currentShader;
                shader.setStrength(_this.strength / 4 / _this.pass / (t1.fitWidth / t1.originalWidth));
            });
            t = t1;
            t1 = t2;
            t2 = t;
        }
        renderer.copyRenderTargetContent(t1, output, clearOutput);
    };
    BlurYFilter.prototype.__initialize = function () {
        this._tempTarget = this._filterManager.renderer.createRenderTarget();
    };
    BlurYFilter.prototype.__dispose = function () {
        this._filterManager.renderer.releaseRenderTarget(this._tempTarget);
        this._tempTarget = null;
    };
    return BlurYFilter;
})(FilterBase_1.FilterBase);
exports.BlurYFilter = BlurYFilter;



},{"../../_util/_util":5,"../FilterBase":89,"../RenderHelper":93,"../ShaderID":96}],107:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FilterBase_1 = require("../FilterBase");
var RenderHelper_1 = require("../RenderHelper");
var ShaderID_1 = require("../ShaderID");
var ColorTransformFilter = (function (_super) {
    __extends(ColorTransformFilter, _super);
    function ColorTransformFilter(manager) {
        _super.call(this, manager);
        this._colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
    }
    ColorTransformFilter.prototype.setColorMatrix = function (r4c5) {
        this._colorMatrix = r4c5.slice();
    };
    ColorTransformFilter.prototype.process = function (renderer, input, output, clearOutput) {
        var _this = this;
        RenderHelper_1.RenderHelper.renderBuffered(renderer, input, output, ShaderID_1.ShaderID.COLOR_TRANSFORM, clearOutput, function (renderer) {
            var shader = renderer.shaderManager.currentShader;
            shader.setColorMatrix(_this._colorMatrix);
        });
    };
    return ColorTransformFilter;
})(FilterBase_1.FilterBase);
exports.ColorTransformFilter = ColorTransformFilter;



},{"../FilterBase":89,"../RenderHelper":93,"../ShaderID":96}],108:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ColorTransformFilter_1 = require("./ColorTransformFilter");
var _util_1 = require("../../_util/_util");
var FilterBase_1 = require("../FilterBase");
var Blur2Filter_1 = require("./Blur2Filter");
var GlowFilter = (function (_super) {
    __extends(GlowFilter, _super);
    function GlowFilter(manager) {
        _super.call(this, manager);
        this._strengthX = 5;
        this._strengthY = 5;
        this._pass = 1;
        this._colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        /**
         * Use {@link BlurFilter} for better performance, or {@link Blur2Filter} for better quality.
         * @type {RenderTarget2D}
         * @private
         */
        this._blurFilter = null;
        this._colorTransformFilter = null;
        this._tempOriginalTarget = null;
        this._tempColorTransformedTarget = null;
    }
    Object.defineProperty(GlowFilter.prototype, "strengthX", {
        get: function () {
            return this._strengthX;
        },
        set: function (v) {
            if (v < 0) {
                v = 1;
            }
            this._strengthX = v;
            if (this._blurFilter !== null) {
                this._blurFilter.strengthX = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlowFilter.prototype, "strengthY", {
        get: function () {
            return this._strengthY;
        },
        set: function (v) {
            if (v < 0) {
                v = 1;
            }
            this._strengthY = v;
            if (this._blurFilter !== null) {
                this._blurFilter.strengthY = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlowFilter.prototype, "pass", {
        get: function () {
            return this._pass;
        },
        set: function (v) {
            v = _util_1._util.limitInto(v, 1, 3) | 0;
            this._pass = v;
            if (this._blurFilter !== null) {
                this._blurFilter.pass = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    GlowFilter.prototype.setColorMatrix = function (r4c5) {
        if (this._colorTransformFilter !== null) {
            this._colorTransformFilter.setColorMatrix(r4c5);
        }
        this._colorMatrix = r4c5.slice();
    };
    GlowFilter.prototype.process = function (renderer, input, output, clearOutput) {
        renderer.copyRenderTargetContent(input, this._tempOriginalTarget, true);
        this._colorTransformFilter.process(renderer, input, this._tempColorTransformedTarget, clearOutput);
        this._blurFilter.process(renderer, this._tempColorTransformedTarget, output, false);
        renderer.copyRenderTargetContent(this._tempOriginalTarget, output, false);
    };
    GlowFilter.prototype.__initialize = function () {
        this._blurFilter = new Blur2Filter_1.Blur2Filter(this._filterManager);
        this._colorTransformFilter = new ColorTransformFilter_1.ColorTransformFilter(this._filterManager);
        this._blurFilter.initialize();
        this._colorTransformFilter.initialize();
        this._blurFilter.strengthX = this.strengthX;
        this._blurFilter.strengthY = this.strengthY;
        this._blurFilter.pass = this.pass;
        this._colorTransformFilter.setColorMatrix(this._colorMatrix);
        this._tempOriginalTarget = this._filterManager.renderer.createRenderTarget();
        this._tempColorTransformedTarget = this._filterManager.renderer.createRenderTarget();
    };
    GlowFilter.prototype.__dispose = function () {
        this._blurFilter.dispose();
        this._colorTransformFilter.dispose();
        this._blurFilter = this._colorTransformFilter = null;
        this._filterManager.renderer.releaseRenderTarget(this._tempOriginalTarget);
        this._filterManager.renderer.releaseRenderTarget(this._tempColorTransformedTarget);
        this._tempOriginalTarget = this._tempColorTransformedTarget = null;
    };
    return GlowFilter;
})(FilterBase_1.FilterBase);
exports.GlowFilter = GlowFilter;



},{"../../_util/_util":5,"../FilterBase":89,"./Blur2Filter":103,"./ColorTransformFilter":107}],109:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./BlurFilter"));
__export(require("./BlurXFilter"));
__export(require("./BlurYFilter"));
__export(require("./ColorTransformFilter"));
__export(require("./GlowFilter"));
__export(require("./Blur2Filter"));



},{"./Blur2Filter":103,"./BlurFilter":104,"./BlurXFilter":105,"./BlurYFilter":106,"./ColorTransformFilter":107,"./GlowFilter":108}],110:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
(function (BrushType) {
    BrushType[BrushType["SOLID"] = 0] = "SOLID";
    BrushType[BrushType["GRADIENT"] = 1] = "GRADIENT";
    BrushType[BrushType["BITMAP"] = 2] = "BITMAP";
    BrushType[BrushType["SHADER"] = 3] = "SHADER";
})(exports.BrushType || (exports.BrushType = {}));
var BrushType = exports.BrushType;



},{}],111:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GraphicsDataRendererBase_1 = require("./GraphicsDataRendererBase");
var FillRendererBase = (function (_super) {
    __extends(FillRendererBase, _super);
    function FillRendererBase(graphics, currentX, currentY) {
        _super.call(this, graphics, currentX, currentY, currentX, currentY);
        // Use to track the relative rendering order, based on stroke renderers' orders
        this.beginIndex = -1;
        this.endIndex = -1;
        // See libtess.js Degenerate Hourglass test.
        this._contours = null;
        this._startingNewContour = true;
        this._contours = [[]];
        this.beginIndex = -1;
        this.endIndex = -1;
        this._hasDrawnAnything = false;
        this._startingNewContour = true;
    }
    FillRendererBase.prototype.moveTo = function (x, y) {
        // Consider the code sample:
        // g.beginFill(0xff0000, 1);
        // g.lineStyle(1, 0xffffff);
        // g.moveTo(100, 100);
        // Flash closes the path before each moveTo() call
        this.closePath();
        if (this._hasDrawnAnything) {
            if (this._currentX !== x || this._currentY !== y) {
                this._startingNewContour = true;
            }
        }
        else {
            this._startingNewContour = true;
        }
        this._currentX = x;
        this._currentY = y;
        this._lastPathStartX = x;
        this._lastPathStartY = y;
    };
    FillRendererBase.prototype.getContourForClosedShapes = function () {
        var currentContour;
        if (this._hasDrawnAnything) {
            currentContour = [];
            this._contours.push(currentContour);
            this._startingNewContour = false;
        }
        else {
            currentContour = this._contours[0];
        }
        return currentContour;
    };
    FillRendererBase.prototype.getContourForLines = function () {
        var currentContour;
        if (this._hasDrawnAnything) {
            if (this._startingNewContour) {
                currentContour = [];
                this._contours.push(currentContour);
                this._startingNewContour = false;
            }
            else {
                currentContour = this._contours[this._contours.length - 1];
            }
        }
        else {
            currentContour = this._contours[0];
        }
        return currentContour;
    };
    return FillRendererBase;
})(GraphicsDataRendererBase_1.GraphicsDataRendererBase);
exports.FillRendererBase = FillRendererBase;



},{"./GraphicsDataRendererBase":113}],112:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
exports.CURVE_ACCURACY = 20;
exports.STD_Z = 0;



},{}],113:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var NotImplementedError_1 = require("../../_util/NotImplementedError");
var PackedArrayBuffer_1 = require("../PackedArrayBuffer");
var gl = this.WebGLRenderingContext || window.WebGLRenderingContext;
var GraphicsDataRendererBase = (function () {
    function GraphicsDataRendererBase(graphics, lastPathStartX, lastPathStartY, currentX, currentY) {
        this._graphics = null;
        this._glc = null;
        this._isDirty = true;
        // Local points buffer, format: X, Y, Z(=STD_Z)
        this._vertices = null;
        // Colors of points, format: R, G, B, A
        this._colors = null;
        // Local indices (for points) buffer
        this._indices = null;
        this._vertexBuffer = null;
        this._colorBuffer = null;
        this._indexBuffer = null;
        this._currentX = 0;
        this._currentY = 0;
        this._hasDrawnAnything = false;
        this._lastPathStartX = 0;
        this._lastPathStartY = 0;
        this._graphics = graphics;
        this._glc = graphics.renderer.context;
        this.__initializeBuffers();
        this._hasDrawnAnything = false;
        this._lastPathStartX = lastPathStartX;
        this._lastPathStartY = lastPathStartY;
        this.moveTo(currentX, currentY);
        this._isDirty = true;
    }
    GraphicsDataRendererBase.prototype.bezierCurveTo = function (cx1, cy1, cx2, cy2, x, y) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    GraphicsDataRendererBase.prototype.closePath = function () {
        // TODO: Consider the sample
        // g.beginFill(0xff0000); g.drawRect(100, 100, 100, 100); g.lineStyle(0xff0000, 1);
        // g.lineTo(400, 100); g.lineTo(200, 300); g.endFill();
        if (this._hasDrawnAnything && (this._currentX != this._lastPathStartX || this._currentY != this._lastPathStartY)) {
            this.lineTo(this._lastPathStartX, this._lastPathStartY);
        }
    };
    GraphicsDataRendererBase.prototype.curveTo = function (cx, cy, x, y) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    GraphicsDataRendererBase.prototype.drawCircle = function (x, y, radius) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    GraphicsDataRendererBase.prototype.drawEllipse = function (x, y, width, height) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    GraphicsDataRendererBase.prototype.drawRect = function (x, y, width, height) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    GraphicsDataRendererBase.prototype.drawRoundRect = function (x, y, width, height, ellipseWidth, ellipseHeight) {
        if (ellipseHeight === void 0) { ellipseHeight = NaN; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    GraphicsDataRendererBase.prototype.lineTo = function (x, y) {
        throw new NotImplementedError_1.NotImplementedError();
    };
    GraphicsDataRendererBase.prototype.moveTo = function (x, y) {
        // Multiple movements are combined into one, which will be flushed at each
        // IGraphicsDataRenderer call that draws concrete elements
        throw new NotImplementedError_1.NotImplementedError();
    };
    GraphicsDataRendererBase.prototype.update = function () {
        // check whether to update the typed buffer
        this.__syncBuffers();
    };
    GraphicsDataRendererBase.prototype.render = function (renderer, target) {
        console.warn("Do not call GraphicsDataRendererBase.render().");
    };
    GraphicsDataRendererBase.prototype.dispose = function () {
        this._vertexBuffer.dispose();
        this._colorBuffer.dispose();
        this._indexBuffer.dispose();
        this._vertexBuffer = this._colorBuffer = this._indexBuffer = null;
        this._vertices = this._colors = this._indices = null;
        this._glc = null;
    };
    GraphicsDataRendererBase.prototype.becomeDirty = function () {
        this._isDirty = true;
    };
    Object.defineProperty(GraphicsDataRendererBase.prototype, "hasDrawnAnything", {
        get: function () {
            return this._hasDrawnAnything;
        },
        enumerable: true,
        configurable: true
    });
    GraphicsDataRendererBase.prototype.__initializeBuffers = function () {
        this._vertices = [];
        this._colors = [];
        this._indices = [];
        this._vertexBuffer = PackedArrayBuffer_1.PackedArrayBuffer.create(this._glc, this._vertices, gl.FLOAT, gl.ARRAY_BUFFER);
        this._colorBuffer = PackedArrayBuffer_1.PackedArrayBuffer.create(this._glc, this._colors, gl.FLOAT, gl.ARRAY_BUFFER);
        this._indexBuffer = PackedArrayBuffer_1.PackedArrayBuffer.create(this._glc, this._indices, gl.UNSIGNED_SHORT, gl.ELEMENT_ARRAY_BUFFER);
    };
    GraphicsDataRendererBase.prototype.__syncBuffers = function () {
        if (this._isDirty) {
            // When the array buffers become dirty, their values will be updated automatically
            // at next draw call.
            this._vertexBuffer.setNewData(this._vertices);
            this._vertexBuffer.becomeDirty();
            this._colorBuffer.setNewData(this._colors);
            this._colorBuffer.becomeDirty();
            this._indexBuffer.setNewData(this._indices);
            this._indexBuffer.becomeDirty();
            this._isDirty = false;
        }
    };
    return GraphicsDataRendererBase;
})();
exports.GraphicsDataRendererBase = GraphicsDataRendererBase;



},{"../../_util/NotImplementedError":4,"../PackedArrayBuffer":92}],114:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var libtess = require("libtess");
var FillRendererBase_1 = require("./FillRendererBase");
var _util_1 = require("../../_util/_util");
var GRAPHICS_CONST_1 = require("./GRAPHICS_CONST");
var NotImplementedError_1 = require("../../_util/NotImplementedError");
var RenderHelper_1 = require("../RenderHelper");
var SolidFillRenderer = (function (_super) {
    __extends(SolidFillRenderer, _super);
    function SolidFillRenderer(graphics, startX, startY, color, alpha) {
        _super.call(this, graphics, startX, startY);
        this._r = 0;
        this._g = 0;
        this._b = 0;
        this._a = 1;
        this._a = _util_1._util.limitInto(alpha, 0, 1);
        this._r = ((color >>> 16) & 0xff) / 0xff;
        this._g = ((color >>> 8) & 0xff) / 0xff;
        this._b = (color & 0xff) / 0xff;
    }
    SolidFillRenderer.prototype.bezierCurveTo = function (cx1, cy1, cx2, cy2, x, y) {
        this._isDirty = true;
        var currentContour = this.getContourForLines();
        if (!this._hasDrawnAnything || this._startingNewContour) {
            currentContour.push(this._currentX, this._currentY, GRAPHICS_CONST_1.STD_Z);
        }
        var dt1, dt2, dt3;
        var t2, t3;
        var fromX = this._currentX, fromY = this._currentY;
        var xa, ya;
        var j;
        for (var i = 1; i <= GRAPHICS_CONST_1.CURVE_ACCURACY; i++) {
            j = i / GRAPHICS_CONST_1.CURVE_ACCURACY;
            dt1 = 1 - j;
            dt2 = dt1 * dt1;
            dt3 = dt2 * dt1;
            t2 = j * j;
            t3 = t2 * j;
            xa = dt3 * fromX + 3 * dt2 * j * cx1 + 3 * dt1 * t2 * cx2 + t3 * x;
            ya = dt3 * fromY + 3 * dt2 * j * cy1 + 3 * dt1 * t2 * cy2 + t3 * y;
            currentContour.push(xa, ya, GRAPHICS_CONST_1.STD_Z);
        }
        this._currentX = x;
        this._currentY = y;
        this._hasDrawnAnything = true;
        this._startingNewContour = false;
    };
    SolidFillRenderer.prototype.curveTo = function (cx, cy, x, y) {
        this._isDirty = true;
        var currentContour = this.getContourForLines();
        if (!this._hasDrawnAnything || this._startingNewContour) {
            currentContour.push(this._currentX, this._currentY, GRAPHICS_CONST_1.STD_Z);
        }
        var j;
        var fromX = this._currentX, fromY = this._currentY;
        var xa, ya;
        for (var i = 1; i <= GRAPHICS_CONST_1.CURVE_ACCURACY; i++) {
            j = i / GRAPHICS_CONST_1.CURVE_ACCURACY;
            xa = fromX + (cx - fromX) * j;
            ya = fromY + (cy - fromY) * j;
            xa = xa + (cx + (x - cx) * j - xa) * j;
            ya = ya + (cy + (y - cy) * j - ya) * j;
            currentContour.push(xa, ya, GRAPHICS_CONST_1.STD_Z);
        }
        this._currentX = x;
        this._currentY = y;
        this._hasDrawnAnything = true;
        this._startingNewContour = false;
    };
    SolidFillRenderer.prototype.drawCircle = function (x, y, radius) {
        this._isDirty = true;
        this.moveTo(x, y);
        var currentContour = this.getContourForClosedShapes();
        var thetaNext;
        var thetaBegin;
        var x2, y2;
        var halfPi = Math.PI / 2;
        currentContour.push(this._currentX + radius, this._currentY, GRAPHICS_CONST_1.STD_Z);
        thetaBegin = 0;
        // Draw 4 segments of arcs, [-PI, -PI/2] [-PI/2, 0] [0, PI/2] [PI/2 PI]
        for (var k = 0; k < 4; k++) {
            for (var i = 1; i <= GRAPHICS_CONST_1.CURVE_ACCURACY; i++) {
                thetaNext = thetaBegin - i / GRAPHICS_CONST_1.CURVE_ACCURACY * halfPi;
                x2 = x + radius * Math.cos(thetaNext);
                y2 = y + radius * Math.sin(thetaNext);
                currentContour.push(x2, y2, GRAPHICS_CONST_1.STD_Z);
            }
            thetaBegin -= halfPi;
        }
        this._currentX = x + radius;
        this._currentY = y;
        this._lastPathStartX = x + radius;
        this._lastPathStartY = y;
        this._hasDrawnAnything = true;
        this._startingNewContour = false;
    };
    SolidFillRenderer.prototype.drawEllipse = function (x, y, width, height) {
        this._isDirty = true;
        this.moveTo(x, y + height / 2);
        var currentContour = this.getContourForClosedShapes();
        var thetaNext;
        var thetaBegin;
        var centerX = x + width / 2, centerY = y + height / 2;
        var x2, y2;
        var halfPi = Math.PI / 2;
        currentContour.push(this._currentX, this._currentY, GRAPHICS_CONST_1.STD_Z);
        thetaBegin = Math.PI;
        // Draw 4 segments of arcs, [-PI, -PI/2] [-PI/2, 0] [0, PI/2] [PI/2 PI]
        // Brute, huh? Luckily there are 20 segments per PI/2...
        for (var k = 0; k < 4; k++) {
            for (var i = 1; i <= GRAPHICS_CONST_1.CURVE_ACCURACY; i++) {
                thetaNext = thetaBegin - i / GRAPHICS_CONST_1.CURVE_ACCURACY * halfPi;
                x2 = centerX + width / 2 * Math.cos(thetaNext);
                y2 = centerY + height / 2 * Math.sin(thetaNext);
                currentContour.push(x2, y2, GRAPHICS_CONST_1.STD_Z);
            }
            thetaBegin -= halfPi;
        }
        this._currentX = x + width;
        this._currentY = y + height / 2;
        this._lastPathStartX = x + width;
        this._lastPathStartY = y + height / 2;
        this._hasDrawnAnything = true;
        this._startingNewContour = false;
    };
    SolidFillRenderer.prototype.drawRect = function (x, y, width, height) {
        this._isDirty = true;
        this.moveTo(x, y);
        // Create a new contour and draw a independent rectangle, should not use lineTo().
        var currentContour = this.getContourForClosedShapes();
        currentContour.push(x, y, GRAPHICS_CONST_1.STD_Z);
        currentContour.push(x + width, y, GRAPHICS_CONST_1.STD_Z);
        currentContour.push(x + width, y + height, GRAPHICS_CONST_1.STD_Z);
        currentContour.push(x, y + height, GRAPHICS_CONST_1.STD_Z);
        this._currentX = x;
        this._currentY = y;
        this._hasDrawnAnything = true;
        this._startingNewContour = false;
    };
    SolidFillRenderer.prototype.drawRoundRect = function (x, y, width, height, ellipseWidth, ellipseHeight) {
        if (ellipseHeight === void 0) { ellipseHeight = NaN; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    SolidFillRenderer.prototype.lineTo = function (x, y) {
        this._isDirty = true;
        var currentContour = this.getContourForLines();
        if (!this._hasDrawnAnything || this._startingNewContour) {
            currentContour.push(this._currentX, this._currentY, GRAPHICS_CONST_1.STD_Z);
        }
        currentContour.push(x, y, GRAPHICS_CONST_1.STD_Z);
        this._currentX = x;
        this._currentY = y;
        this._hasDrawnAnything = true;
        this._startingNewContour = false;
    };
    SolidFillRenderer.prototype.update = function () {
        if (this._isDirty) {
            // Triangulate first
            var tess = this._graphics.renderer.tessellator;
            tess.gluTessProperty(libtess.gluEnum.GLU_TESS_WINDING_RULE, libtess.windingRule.GLU_TESS_WINDING_ODD);
            tess.gluTessNormal(0, 0, 1);
            var resultArray = [];
            tess.gluTessBeginPolygon(resultArray);
            var contour;
            for (var i = 0; i < this._contours.length; i++) {
                contour = this._contours[i];
                if (contour.length > 0) {
                    tess.gluTessBeginContour();
                    for (var j = 0; j < contour.length; j += 3) {
                        var coords = [contour[j], contour[j + 1], contour[j + 2]];
                        tess.gluTessVertex(coords, coords);
                    }
                    tess.gluTessEndContour();
                }
            }
            tess.gluTessEndPolygon();
            this._vertices = [];
            this._colors = [];
            this._indices = [];
            var colors = this._colors;
            var indices = this._indices;
            var vertices = this._vertices;
            j = 0;
            var tempArray;
            for (var i = 0; i < resultArray.length; i++) {
                tempArray = resultArray[i];
                for (var j = 0; j < tempArray.length; j++) {
                    vertices.push(tempArray[j]);
                }
            }
            j = 0;
            for (var i = 0; i < vertices.length; i += 3) {
                colors.push(this._r * this._a, this._g * this._a, this._b * this._a, this._a);
                indices.push(j);
                j++;
            }
        }
        // Then update buffers
        _super.prototype.update.call(this);
    };
    SolidFillRenderer.prototype.render = function (renderer, target) {
        if (this._vertices.length > 0) {
            //primitiveTarget.renderPrimitives(this._vertexBuffer, this._colorBuffer, this._indexBuffer, false);
            RenderHelper_1.RenderHelper.renderPrimitives(renderer, target, this._vertexBuffer, this._colorBuffer, this._indexBuffer, false);
        }
    };
    return SolidFillRenderer;
})(FillRendererBase_1.FillRendererBase);
exports.SolidFillRenderer = SolidFillRenderer;



},{"../../_util/NotImplementedError":4,"../../_util/_util":5,"../RenderHelper":93,"./FillRendererBase":111,"./GRAPHICS_CONST":112,"libtess":128}],115:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NotImplementedError_1 = require("../../_util/NotImplementedError");
var _util_1 = require("../../_util/_util");
var StrokeRendererBase_1 = require("./StrokeRendererBase");
var GRAPHICS_CONST_1 = require("./GRAPHICS_CONST");
var RenderHelper_1 = require("../RenderHelper");
var SolidStrokeRenderer = (function (_super) {
    __extends(SolidStrokeRenderer, _super);
    function SolidStrokeRenderer(graphics, lastPathStartX, lastPathStartY, currentX, currentY, lineWidth, color, alpha) {
        _super.call(this, graphics, lastPathStartX, lastPathStartY, currentX, currentY);
        this._r = 0;
        this._g = 0;
        this._b = 0;
        this._a = 1;
        this._w = 1;
        this._a = _util_1._util.limitInto(alpha, 0, 1);
        this._r = ((color >>> 16) & 0xff) / 0xff;
        this._g = ((color >>> 8) & 0xff) / 0xff;
        this._b = (color & 0xff) / 0xff;
        this._w = lineWidth;
    }
    SolidStrokeRenderer.prototype.bezierCurveTo = function (cx1, cy1, cx2, cy2, x, y) {
        if (this._w > 0) {
            this._isDirty = true;
            var dt1, dt2, dt3;
            var t2, t3;
            var fromX = this._currentX, fromY = this._currentY;
            var xa, ya;
            var j;
            for (var i = 1; i <= GRAPHICS_CONST_1.CURVE_ACCURACY; i++) {
                j = i / GRAPHICS_CONST_1.CURVE_ACCURACY;
                dt1 = 1 - j;
                dt2 = dt1 * dt1;
                dt3 = dt2 * dt1;
                t2 = j * j;
                t3 = t2 * j;
                xa = dt3 * fromX + 3 * dt2 * j * cx1 + 3 * dt1 * t2 * cx2 + t3 * x;
                ya = dt3 * fromY + 3 * dt2 * j * cy1 + 3 * dt1 * t2 * cy2 + t3 * y;
                this.lineTo(xa, ya);
            }
        }
        this._currentX = x;
        this._currentY = y;
    };
    SolidStrokeRenderer.prototype.curveTo = function (cx, cy, x, y) {
        if (this._w > 0) {
            this._isDirty = true;
            var j;
            var fromX = this._currentX, fromY = this._currentY;
            var xa, ya;
            for (var i = 1; i <= GRAPHICS_CONST_1.CURVE_ACCURACY; i++) {
                j = i / GRAPHICS_CONST_1.CURVE_ACCURACY;
                xa = fromX + (cx - fromX) * j;
                ya = fromY + (cy - fromY) * j;
                xa = xa + (cx + (x - cx) * j - xa) * j;
                ya = ya + (cy + (y - cy) * j - ya) * j;
                this.lineTo(xa, ya);
            }
        }
        this._currentX = x;
        this._currentY = y;
    };
    SolidStrokeRenderer.prototype.drawCircle = function (x, y, radius) {
        this.moveTo(x - radius, y);
        if (this._w > 0) {
            this._isDirty = true;
            var thetaNext;
            var thetaBegin;
            var x2, y2;
            var halfPi = Math.PI / 2;
            thetaBegin = Math.PI;
            // Draw 4 segments of arcs, [-PI, -PI/2] [-PI/2, 0] [0, PI/2] [PI/2 PI]
            for (var k = 0; k < 4; k++) {
                for (var i = 1; i <= GRAPHICS_CONST_1.CURVE_ACCURACY; i++) {
                    thetaNext = thetaBegin - i / GRAPHICS_CONST_1.CURVE_ACCURACY * halfPi;
                    x2 = x + radius * Math.cos(thetaNext);
                    y2 = y + radius * Math.sin(thetaNext);
                    this.lineTo(x2, y2);
                }
                thetaBegin -= halfPi;
            }
        }
        this._currentX = x + radius;
        this._currentY = y;
        this._lastPathStartX = x + radius;
        this._lastPathStartY = y;
    };
    SolidStrokeRenderer.prototype.drawEllipse = function (x, y, width, height) {
        this.moveTo(x, y + height / 2);
        if (this._w > 0) {
            this._isDirty = true;
            var thetaNext;
            var thetaBegin;
            var centerX = x + width / 2, centerY = y + height / 2;
            var x2, y2;
            var halfPi = Math.PI / 2;
            thetaBegin = Math.PI;
            // Draw 4 segments of arcs, [-PI, -PI/2] [-PI/2, 0] [0, PI/2] [PI/2 PI]
            // Brute, huh? Luckily there are 20 segments per PI/2...
            for (var k = 0; k < 4; k++) {
                for (var i = 1; i <= GRAPHICS_CONST_1.CURVE_ACCURACY; i++) {
                    thetaNext = thetaBegin - i / GRAPHICS_CONST_1.CURVE_ACCURACY * halfPi;
                    x2 = centerX + width / 2 * Math.cos(thetaNext);
                    y2 = centerY + height / 2 * Math.sin(thetaNext);
                    this.lineTo(x2, y2);
                }
                thetaBegin -= halfPi;
            }
        }
        this._currentX = x + width;
        this._currentY = y + height / 2;
        this._lastPathStartX = x + width;
        this._lastPathStartY = y + height / 2;
    };
    SolidStrokeRenderer.prototype.drawRect = function (x, y, width, height) {
        this._isDirty = true;
        this.moveTo(x, y);
        this.lineTo(x, y + height);
        this.lineTo(x + width, y + height);
        this.lineTo(x + width, y);
        this.lineTo(x, y);
    };
    SolidStrokeRenderer.prototype.drawRoundRect = function (x, y, width, height, ellipseWidth, ellipseHeight) {
        if (ellipseHeight === void 0) { ellipseHeight = NaN; }
        throw new NotImplementedError_1.NotImplementedError();
    };
    SolidStrokeRenderer.prototype.lineTo = function (x, y) {
        if (this._w > 0) {
            this._isDirty = true;
            var vertices = this.__getSimLineVertices(this._currentX, this._currentY, x, y, GRAPHICS_CONST_1.STD_Z, this._w);
            if (vertices.length > 0) {
                // Generated 4 vertices, matching with 6 indices (2 triangles)
                var cur = this._vertices.length / 3;
                for (var i = 0; i < 12; i++) {
                    this._vertices.push(vertices[i]);
                }
                for (var i = 0; i < 4; i++) {
                    this._colors.push(this._r * this._a, this._g * this._a, this._b * this._a, this._a);
                }
                this._indices.push(cur, cur + 1, cur + 2, cur + 1, cur + 2, cur + 3);
                this._hasDrawnAnything = true;
            }
        }
        this._currentX = x;
        this._currentY = y;
    };
    SolidStrokeRenderer.prototype.render = function (renderer, target) {
        if (this._vertices.length > 0) {
            //primitiveTarget.renderPrimitives(this._vertexBuffer, this._colorBuffer, this._indexBuffer, false);
            RenderHelper_1.RenderHelper.renderPrimitives(renderer, target, this._vertexBuffer, this._colorBuffer, this._indexBuffer, false);
        }
    };
    return SolidStrokeRenderer;
})(StrokeRendererBase_1.StrokeRendererBase);
exports.SolidStrokeRenderer = SolidStrokeRenderer;



},{"../../_util/NotImplementedError":4,"../../_util/_util":5,"../RenderHelper":93,"./GRAPHICS_CONST":112,"./StrokeRendererBase":116}],116:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GraphicsDataRendererBase_1 = require("./GraphicsDataRendererBase");
var StrokeRendererBase = (function (_super) {
    __extends(StrokeRendererBase, _super);
    function StrokeRendererBase(graphics, lastPathStartX, lastPathStartY, currentX, currentY) {
        _super.call(this, graphics, lastPathStartX, lastPathStartY, currentX, currentY);
        this._lineVerticesStorage = null;
        this._lineVerticesStorage = [[0, 0], [0, 0], [0, 0], [0, 0]];
    }
    StrokeRendererBase.prototype.moveTo = function (x, y) {
        // This action seems weird...
        if (this._graphics.isFilling) {
            this.closePath();
        }
        this._currentX = x;
        this._currentY = y;
        this._lastPathStartX = x;
        this._lastPathStartY = y;
    };
    StrokeRendererBase.prototype.__getSimLineVertices = function (x1, y1, x2, y2, z, width) {
        if (width < 0) {
            return [];
        }
        var halfWidth = width / 2;
        var vert1 = this._lineVerticesStorage[0], vert2 = this._lineVerticesStorage[1], vert3 = this._lineVerticesStorage[2], vert4 = this._lineVerticesStorage[3];
        if (x1 === x2) {
            vert1[0] = x1 - halfWidth;
            vert1[1] = y1 > y2 ? y1 + halfWidth : y1 - halfWidth;
            vert2[0] = x1 + halfWidth;
            vert2[1] = y1 > y2 ? y1 + halfWidth : y1 - halfWidth;
            vert3[0] = x2 - halfWidth;
            vert3[1] = y1 > y2 ? y2 - halfWidth : y2 + halfWidth;
            vert4[0] = x2 + halfWidth;
            vert4[1] = y1 > y2 ? y2 - halfWidth : y2 + halfWidth;
        }
        else {
            var slope = (y2 - y1) / (x2 - x1);
            var ct = 1 / Math.sqrt(1 + slope * slope);
            var st = Math.sqrt(1 - ct * ct);
            // dx/dy: additional length considering the line width perpendicular to the line itself
            var dx = halfWidth * st;
            var dy = halfWidth * ct;
            // dtx/dty: additional length considering the line width at end points
            var dtx = dy;
            var dty = dx;
            // move the line to their new end points
            if (x1 > x2) {
                x1 += dtx;
                x2 -= dtx;
            }
            else {
                x1 -= dtx;
                x2 += dtx;
            }
            if (y1 > y2) {
                y1 += dty;
                y2 -= dty;
            }
            else {
                y1 -= dty;
                y2 += dty;
            }
            // and calculate simulating rectangle
            vert1[0] = x1 - dx;
            vert2[0] = x1 + dx;
            vert3[0] = x2 - dx;
            vert4[0] = x2 + dx;
            if (slope >= 0) {
                vert1[1] = y1 + dy;
                vert2[1] = y1 - dy;
                vert3[1] = y2 + dy;
                vert4[1] = y2 - dy;
            }
            else {
                vert1[1] = y1 - dy;
                vert2[1] = y1 + dy;
                vert3[1] = y2 - dy;
                vert4[1] = y2 + dy;
            }
        }
        return [
            vert1[0], vert1[1], z, vert2[0], vert2[1], z,
            vert3[0], vert3[1], z, vert4[0], vert4[1], z
        ];
    };
    return StrokeRendererBase;
})(GraphicsDataRendererBase_1.GraphicsDataRendererBase);
exports.StrokeRendererBase = StrokeRendererBase;



},{"./GraphicsDataRendererBase":113}],117:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./AttributeCache"));
__export(require("./FilterBase"));
__export(require("./FilterManager"));
__export(require("./FragmentShaders"));
__export(require("./PackedArrayBuffer"));
__export(require("./RenderHelper"));
__export(require("./RenderTarget2D"));
__export(require("./ShaderBase"));
__export(require("./ShaderID"));
__export(require("./ShaderManager"));
__export(require("./UniformCache"));
__export(require("./VertexShaders"));
__export(require("./WebGLDataType"));
__export(require("./WebGLRenderer"));
__export(require("./WebGLUtils"));
var filters = require("./filters/index");
exports.filters = filters;
var shaders = require("./shaders/index");
exports.shaders = shaders;



},{"./AttributeCache":88,"./FilterBase":89,"./FilterManager":90,"./FragmentShaders":91,"./PackedArrayBuffer":92,"./RenderHelper":93,"./RenderTarget2D":94,"./ShaderBase":95,"./ShaderID":96,"./ShaderManager":97,"./UniformCache":98,"./VertexShaders":99,"./WebGLDataType":100,"./WebGLRenderer":101,"./WebGLUtils":102,"./filters/index":109,"./shaders/index":127}],118:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/22.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UniformCache_1 = require("../UniformCache");
var VertexShaders_1 = require("../VertexShaders");
var FragmentShaders_1 = require("../FragmentShaders");
var BufferedShader_1 = require("./BufferedShader");
var WebGLDataType_1 = require("../WebGLDataType");
var Blur2Shader = (function (_super) {
    __extends(Blur2Shader, _super);
    function Blur2Shader(manager) {
        _super.call(this, manager, Blur2Shader.VERTEX_SOURCE, Blur2Shader.FRAGMENT_SOURCE);
    }
    Blur2Shader.prototype.setStrength = function (strength) {
        if (strength < 0) {
            strength = 1;
        }
        this._uniforms.get("uStrength").value = strength;
    };
    Blur2Shader.prototype.getStrength = function () {
        return this._uniforms.get("uStrength").value;
    };
    Blur2Shader.prototype.setResolution = function (resolution) {
        if (resolution < 0) {
            resolution = 1;
        }
        this._uniforms.get("uResolution").value = resolution;
    };
    Blur2Shader.prototype.setBlurDirection = function (direction) {
        this._uniforms.get("uBlurDirection").value = [direction[0], direction[1]];
    };
    Blur2Shader.prototype.__localInit = function (manager, uniforms, attributes) {
        _super.prototype.__localInit.call(this, manager, uniforms, attributes);
        var u;
        u = new UniformCache_1.UniformCache();
        u.name = "uStrength";
        u.type = WebGLDataType_1.WebGLDataType.U1F;
        u.value = 5;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uResolution";
        u.type = WebGLDataType_1.WebGLDataType.U1F;
        u.value = 1;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uBlurDirection";
        u.type = WebGLDataType_1.WebGLDataType.U2F;
        u.value = [1.0, 0.0];
        uniforms.set(u.name, u);
    };
    Blur2Shader.SHADER_CLASS_NAME = "Blur2Shader";
    Blur2Shader.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.blur2;
    Blur2Shader.VERTEX_SOURCE = VertexShaders_1.VertexShaders.blur2;
    return Blur2Shader;
})(BufferedShader_1.BufferedShader);
exports.Blur2Shader = Blur2Shader;



},{"../FragmentShaders":91,"../UniformCache":98,"../VertexShaders":99,"../WebGLDataType":100,"./BufferedShader":121}],119:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UniformCache_1 = require("../UniformCache");
var VertexShaders_1 = require("../VertexShaders");
var FragmentShaders_1 = require("../FragmentShaders");
var BufferedShader_1 = require("./BufferedShader");
var WebGLDataType_1 = require("../WebGLDataType");
var BlurXShader = (function (_super) {
    __extends(BlurXShader, _super);
    function BlurXShader(manager) {
        _super.call(this, manager, BlurXShader.VERTEX_SOURCE, BlurXShader.FRAGMENT_SOURCE);
    }
    BlurXShader.prototype.setStrength = function (strength) {
        if (strength < 0) {
            strength = 1;
        }
        this._uniforms.get("uStrength").value = strength;
    };
    BlurXShader.prototype.getStrength = function () {
        return this._uniforms.get("uStrength").value;
    };
    BlurXShader.prototype.__localInit = function (manager, uniforms, attributes) {
        _super.prototype.__localInit.call(this, manager, uniforms, attributes);
        var u;
        u = new UniformCache_1.UniformCache();
        u.name = "uStrength";
        u.type = WebGLDataType_1.WebGLDataType.U1F;
        u.value = 5;
        uniforms.set(u.name, u);
    };
    BlurXShader.SHADER_CLASS_NAME = "BlurXShader";
    BlurXShader.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.blur;
    BlurXShader.VERTEX_SOURCE = VertexShaders_1.VertexShaders.blurX;
    return BlurXShader;
})(BufferedShader_1.BufferedShader);
exports.BlurXShader = BlurXShader;



},{"../FragmentShaders":91,"../UniformCache":98,"../VertexShaders":99,"../WebGLDataType":100,"./BufferedShader":121}],120:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UniformCache_1 = require("../UniformCache");
var VertexShaders_1 = require("../VertexShaders");
var FragmentShaders_1 = require("../FragmentShaders");
var BufferedShader_1 = require("./BufferedShader");
var WebGLDataType_1 = require("../WebGLDataType");
var BlurYShader = (function (_super) {
    __extends(BlurYShader, _super);
    function BlurYShader(manager) {
        _super.call(this, manager, BlurYShader.VERTEX_SOURCE, BlurYShader.FRAGMENT_SOURCE);
    }
    BlurYShader.prototype.setStrength = function (strength) {
        if (strength < 0) {
            strength = 1;
        }
        this._uniforms.get("uStrength").value = strength;
    };
    BlurYShader.prototype.getStrength = function () {
        return this._uniforms.get("uStrength").value;
    };
    BlurYShader.prototype.__localInit = function (manager, uniforms, attributes) {
        _super.prototype.__localInit.call(this, manager, uniforms, attributes);
        var u;
        u = new UniformCache_1.UniformCache();
        u.name = "uStrength";
        u.type = WebGLDataType_1.WebGLDataType.U1F;
        u.value = 5;
        uniforms.set(u.name, u);
    };
    BlurYShader.SHADER_CLASS_NAME = "BlurYShader";
    BlurYShader.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.blur;
    BlurYShader.VERTEX_SOURCE = VertexShaders_1.VertexShaders.blurY;
    return BlurYShader;
})(BufferedShader_1.BufferedShader);
exports.BlurYShader = BlurYShader;



},{"../FragmentShaders":91,"../UniformCache":98,"../VertexShaders":99,"../WebGLDataType":100,"./BufferedShader":121}],121:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Matrix3D_1 = require("../../flash/geom/Matrix3D");
var UniformCache_1 = require("../UniformCache");
var VertexShaders_1 = require("../VertexShaders");
var FragmentShaders_1 = require("../FragmentShaders");
var ShaderBase_1 = require("../ShaderBase");
var WebGLDataType_1 = require("../WebGLDataType");
var BufferedShader = (function (_super) {
    __extends(BufferedShader, _super);
    function BufferedShader(manager, vertexSource, fragmentSource) {
        _super.call(this, manager, vertexSource, fragmentSource, null, null);
    }
    BufferedShader.prototype.setTexture = function (texture) {
        // Must contains a "uSampler" uniform.
        this._uniforms.get("uSampler").texture = texture;
    };
    BufferedShader.prototype.__localInit = function (manager, uniforms, attributes) {
        _super.prototype.__localInit.call(this, manager, uniforms, attributes);
        var u;
        var projectionMatrix = new Matrix3D_1.Matrix3D();
        var w = manager.renderer.view.width;
        var h = manager.renderer.view.height;
        projectionMatrix.setOrthographicProjection(0, w, h, 0, -1000, 1000);
        u = new UniformCache_1.UniformCache();
        u.name = "uSampler";
        u.type = WebGLDataType_1.WebGLDataType.USampler2D;
        u.value = 0;
        u.texture = null;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uProjectionMatrix";
        u.type = WebGLDataType_1.WebGLDataType.UMat4;
        u.value = projectionMatrix.toArray();
        u.transpose = false;
        uniforms.set(u.name, u);
    };
    BufferedShader.SHADER_CLASS_NAME = "BufferedShader";
    BufferedShader.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.buffered;
    BufferedShader.VERTEX_SOURCE = VertexShaders_1.VertexShaders.buffered;
    return BufferedShader;
})(ShaderBase_1.ShaderBase);
exports.BufferedShader = BufferedShader;



},{"../../flash/geom/Matrix3D":62,"../FragmentShaders":91,"../ShaderBase":95,"../UniformCache":98,"../VertexShaders":99,"../WebGLDataType":100}],122:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UniformCache_1 = require("../UniformCache");
var VertexShaders_1 = require("../VertexShaders");
var FragmentShaders_1 = require("../FragmentShaders");
var BufferedShader_1 = require("./BufferedShader");
var WebGLDataType_1 = require("../WebGLDataType");
var ColorTransformShader = (function (_super) {
    __extends(ColorTransformShader, _super);
    function ColorTransformShader(manager) {
        _super.call(this, manager, ColorTransformShader.VERTEX_SOURCE, ColorTransformShader.FRAGMENT_SOURCE);
    }
    ColorTransformShader.prototype.setColorMatrix = function (r4c5) {
        if (r4c5.length < 20) {
            console.warn("ColorTransformShader.setColorMatrix needs a 4x5 matrix.");
            return;
        }
        this._uniforms.get("uColorMatrix").value = r4c5.slice();
    };
    ColorTransformShader.prototype.__localInit = function (manager, uniforms, attributes) {
        _super.prototype.__localInit.call(this, manager, uniforms, attributes);
        var u;
        var defaultColorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        u = new UniformCache_1.UniformCache();
        u.name = "uColorMatrix";
        u.type = WebGLDataType_1.WebGLDataType.U1FV;
        u.value = defaultColorMatrix;
        uniforms.set(u.name, u);
    };
    ColorTransformShader.SHADER_CLASS_NAME = "ColorTransformShader";
    ColorTransformShader.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.colorTransform;
    ColorTransformShader.VERTEX_SOURCE = VertexShaders_1.VertexShaders.buffered;
    return ColorTransformShader;
})(BufferedShader_1.BufferedShader);
exports.ColorTransformShader = ColorTransformShader;



},{"../FragmentShaders":91,"../UniformCache":98,"../VertexShaders":99,"../WebGLDataType":100,"./BufferedShader":121}],123:[function(require,module,exports){
/**
 * Created by MIC on 2015/12/23.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UniformCache_1 = require("../UniformCache");
var VertexShaders_1 = require("../VertexShaders");
var FragmentShaders_1 = require("../FragmentShaders");
var BufferedShader_1 = require("./BufferedShader");
var WebGLDataType_1 = require("../WebGLDataType");
var Matrix3D_1 = require("../../flash/geom/Matrix3D");
var CopyImageShader = (function (_super) {
    __extends(CopyImageShader, _super);
    function CopyImageShader(manager) {
        _super.call(this, manager, CopyImageShader.VERTEX_SOURCE, CopyImageShader.FRAGMENT_SOURCE);
    }
    CopyImageShader.prototype.setFlipX = function (flip) {
        this._uniforms.get("uFlipX").value = flip;
    };
    CopyImageShader.prototype.setFlipY = function (flip) {
        this._uniforms.get("uFlipY").value = flip;
    };
    CopyImageShader.prototype.setOriginalSize = function (xy) {
        this._uniforms.get("uOriginalSize").value = xy.slice();
    };
    CopyImageShader.prototype.setFitSize = function (xy) {
        this._uniforms.get("uFitSize").value = xy.slice();
    };
    CopyImageShader.prototype.setAlpha = function (alpha) {
        this._uniforms.get("uAlpha").value = alpha;
    };
    CopyImageShader.prototype.setTransform = function (matrix) {
        this._uniforms.get("uTransformMatrix").value = matrix.toArray();
    };
    CopyImageShader.prototype.__localInit = function (manager, uniforms, attributes) {
        _super.prototype.__localInit.call(this, manager, uniforms, attributes);
        var u;
        var transformMatrix = new Matrix3D_1.Matrix3D();
        transformMatrix.identity();
        u = new UniformCache_1.UniformCache();
        u.name = "uFlipX";
        u.type = WebGLDataType_1.WebGLDataType.UBool;
        u.value = false;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uFlipY";
        u.type = WebGLDataType_1.WebGLDataType.UBool;
        u.value = false;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uOriginalSize";
        u.type = WebGLDataType_1.WebGLDataType.U2F;
        u.value = [0, 0];
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uFitSize";
        u.type = WebGLDataType_1.WebGLDataType.U2F;
        u.value = [0, 0];
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uTransformMatrix";
        u.type = WebGLDataType_1.WebGLDataType.UMat4;
        u.value = transformMatrix.toArray();
        u.transpose = false;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uAlpha";
        u.type = WebGLDataType_1.WebGLDataType.U1F;
        u.value = 1;
        uniforms.set(u.name, u);
    };
    CopyImageShader.SHADER_CLASS_NAME = "CopyImageShader";
    CopyImageShader.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.copyImage;
    CopyImageShader.VERTEX_SOURCE = VertexShaders_1.VertexShaders.copyImage;
    return CopyImageShader;
})(BufferedShader_1.BufferedShader);
exports.CopyImageShader = CopyImageShader;



},{"../../flash/geom/Matrix3D":62,"../FragmentShaders":91,"../UniformCache":98,"../VertexShaders":99,"../WebGLDataType":100,"./BufferedShader":121}],124:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UniformCache_1 = require("../UniformCache");
var VertexShaders_1 = require("../VertexShaders");
var FragmentShaders_1 = require("../FragmentShaders");
var BufferedShader_1 = require("./BufferedShader");
var WebGLDataType_1 = require("../WebGLDataType");
var FxaaShader = (function (_super) {
    __extends(FxaaShader, _super);
    function FxaaShader(manager) {
        _super.call(this, manager, FxaaShader.VERTEX_SOURCE, FxaaShader.FRAGMENT_SOURCE);
    }
    FxaaShader.prototype.setResolutionXY = function (xy) {
        this._uniforms.get("uResolution").value = xy.slice();
    };
    FxaaShader.prototype.__localInit = function (manager, uniforms, attributes) {
        _super.prototype.__localInit.call(this, manager, uniforms, attributes);
        var u;
        u = new UniformCache_1.UniformCache();
        u.name = "uResolution";
        u.type = WebGLDataType_1.WebGLDataType.U2F;
        u.value = [1, 1];
        uniforms.set(u.name, u);
    };
    FxaaShader.SHADER_CLASS_NAME = "FxaaShader";
    FxaaShader.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.fxaa;
    FxaaShader.VERTEX_SOURCE = VertexShaders_1.VertexShaders.fxaa;
    return FxaaShader;
})(BufferedShader_1.BufferedShader);
exports.FxaaShader = FxaaShader;



},{"../FragmentShaders":91,"../UniformCache":98,"../VertexShaders":99,"../WebGLDataType":100,"./BufferedShader":121}],125:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Matrix3D_1 = require("../../flash/geom/Matrix3D");
var UniformCache_1 = require("../UniformCache");
var VertexShaders_1 = require("../VertexShaders");
var FragmentShaders_1 = require("../FragmentShaders");
var ShaderBase_1 = require("../ShaderBase");
var WebGLDataType_1 = require("../WebGLDataType");
var PrimitiveShader = (function (_super) {
    __extends(PrimitiveShader, _super);
    function PrimitiveShader(manager) {
        _super.call(this, manager, PrimitiveShader.VERTEX_SOURCE, PrimitiveShader.FRAGMENT_SOURCE, null, null);
    }
    PrimitiveShader.prototype.setProjection = function (matrix) {
        this._uniforms.get("uProjectionMatrix").value = matrix.toArray();
    };
    PrimitiveShader.prototype.setTransform = function (matrix) {
        this._uniforms.get("uTransformMatrix").value = matrix.toArray();
    };
    PrimitiveShader.prototype.__localInit = function (manager, uniforms, attributes) {
        _super.prototype.__localInit.call(this, manager, uniforms, attributes);
        var u;
        var transformMatrix = new Matrix3D_1.Matrix3D();
        var projectionMatrix = new Matrix3D_1.Matrix3D();
        var w = manager.renderer.view.width;
        var h = manager.renderer.view.height;
        projectionMatrix.setOrthographicProjection(0, w, h, 0, -1000, 1000);
        u = new UniformCache_1.UniformCache();
        u.name = "uProjectionMatrix";
        u.type = WebGLDataType_1.WebGLDataType.UMat4;
        u.value = projectionMatrix.toArray();
        u.transpose = false;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uTransformMatrix";
        u.type = WebGLDataType_1.WebGLDataType.UMat4;
        u.value = transformMatrix.toArray();
        u.transpose = false;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uAlpha";
        u.type = WebGLDataType_1.WebGLDataType.U1F;
        u.value = 1;
        uniforms.set(u.name, u);
    };
    PrimitiveShader.SHADER_CLASS_NAME = "PrimitiveShader";
    PrimitiveShader.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.primitive;
    PrimitiveShader.VERTEX_SOURCE = VertexShaders_1.VertexShaders.primitive;
    return PrimitiveShader;
})(ShaderBase_1.ShaderBase);
exports.PrimitiveShader = PrimitiveShader;



},{"../../flash/geom/Matrix3D":62,"../FragmentShaders":91,"../ShaderBase":95,"../UniformCache":98,"../VertexShaders":99,"../WebGLDataType":100}],126:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/18.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UniformCache_1 = require("../UniformCache");
var VertexShaders_1 = require("../VertexShaders");
var FragmentShaders_1 = require("../FragmentShaders");
var BufferedShader_1 = require("./BufferedShader");
var WebGLDataType_1 = require("../WebGLDataType");
var ReplicateShader = (function (_super) {
    __extends(ReplicateShader, _super);
    function ReplicateShader(manager) {
        _super.call(this, manager, ReplicateShader.VERTEX_SOURCE, ReplicateShader.FRAGMENT_SOURCE);
    }
    ReplicateShader.prototype.setFlipX = function (flip) {
        this._uniforms.get("uFlipX").value = flip;
    };
    ReplicateShader.prototype.setFlipY = function (flip) {
        this._uniforms.get("uFlipY").value = flip;
    };
    ReplicateShader.prototype.setOriginalSize = function (xy) {
        this._uniforms.get("uOriginalSize").value = xy.slice();
    };
    ReplicateShader.prototype.setFitSize = function (xy) {
        this._uniforms.get("uFitSize").value = xy.slice();
    };
    ReplicateShader.prototype.__localInit = function (manager, uniforms, attributes) {
        _super.prototype.__localInit.call(this, manager, uniforms, attributes);
        var u;
        u = new UniformCache_1.UniformCache();
        u.name = "uFlipX";
        u.type = WebGLDataType_1.WebGLDataType.UBool;
        u.value = false;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uFlipY";
        u.type = WebGLDataType_1.WebGLDataType.UBool;
        u.value = false;
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uOriginalSize";
        u.type = WebGLDataType_1.WebGLDataType.U2F;
        u.value = [0, 0];
        uniforms.set(u.name, u);
        u = new UniformCache_1.UniformCache();
        u.name = "uFitSize";
        u.type = WebGLDataType_1.WebGLDataType.U2F;
        u.value = [0, 0];
        uniforms.set(u.name, u);
    };
    ReplicateShader.SHADER_CLASS_NAME = "ReplicateShader";
    ReplicateShader.FRAGMENT_SOURCE = FragmentShaders_1.FragmentShaders.buffered;
    ReplicateShader.VERTEX_SOURCE = VertexShaders_1.VertexShaders.replicate;
    return ReplicateShader;
})(BufferedShader_1.BufferedShader);
exports.ReplicateShader = ReplicateShader;



},{"../FragmentShaders":91,"../UniformCache":98,"../VertexShaders":99,"../WebGLDataType":100,"./BufferedShader":121}],127:[function(require,module,exports){
/**
 * Created by MIC on 2015/11/20.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./BlurXShader"));
__export(require("./BlurYShader"));
__export(require("./BufferedShader"));
__export(require("./ColorTransformShader"));
__export(require("./FxaaShader"));
__export(require("./PrimitiveShader"));
__export(require("./ReplicateShader"));
__export(require("./Blur2Shader"));
__export(require("./CopyImageShader"));



},{"./Blur2Shader":118,"./BlurXShader":119,"./BlurYShader":120,"./BufferedShader":121,"./ColorTransformShader":122,"./CopyImageShader":123,"./FxaaShader":124,"./PrimitiveShader":125,"./ReplicateShader":126}],128:[function(require,module,exports){
/*

 Copyright 2000, Silicon Graphics, Inc. All Rights Reserved.
 Copyright 2015, Google Inc. All Rights Reserved.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to
 deal in the Software without restriction, including without limitation the
 rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 sell copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice including the dates of first publication and
 either this permission notice or a reference to http://oss.sgi.com/projects/FreeB/
 shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 SILICON GRAPHICS, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
 IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 Original Code. The Original Code is: OpenGL Sample Implementation,
 Version 1.2.1, released January 26, 2000, developed by Silicon Graphics,
 Inc. The Original Code is Copyright (c) 1991-2000 Silicon Graphics, Inc.
 Copyright in any portions created by third parties is as indicated
 elsewhere herein. All Rights Reserved.
*/
'use strict';var n;function t(a,b){return a.b===b.b&&a.a===b.a}function u(a,b){return a.b<b.b||a.b===b.b&&a.a<=b.a}function v(a,b,c){var d=b.b-a.b,e=c.b-b.b;return 0<d+e?d<e?b.a-a.a+d/(d+e)*(a.a-c.a):b.a-c.a+e/(d+e)*(c.a-a.a):0}function x(a,b,c){var d=b.b-a.b,e=c.b-b.b;return 0<d+e?(b.a-c.a)*d+(b.a-a.a)*e:0}function z(a,b){return a.a<b.a||a.a===b.a&&a.b<=b.b}function aa(a,b,c){var d=b.a-a.a,e=c.a-b.a;return 0<d+e?d<e?b.b-a.b+d/(d+e)*(a.b-c.b):b.b-c.b+e/(d+e)*(c.b-a.b):0}
function ba(a,b,c){var d=b.a-a.a,e=c.a-b.a;return 0<d+e?(b.b-c.b)*d+(b.b-a.b)*e:0}function ca(a){return u(a.b.a,a.a)}function da(a){return u(a.a,a.b.a)}function A(a,b,c,d){a=0>a?0:a;c=0>c?0:c;return a<=c?0===c?(b+d)/2:b+a/(a+c)*(d-b):d+c/(a+c)*(b-d)};function ea(a){var b=B(a.b);C(b,a.c);C(b.b,a.c);D(b,a.a);return b}function E(a,b){var c=!1,d=!1;a!==b&&(b.a!==a.a&&(d=!0,F(b.a,a.a)),b.d!==a.d&&(c=!0,G(b.d,a.d)),H(b,a),d||(C(b,a.a),a.a.c=a),c||(D(b,a.d),a.d.a=a))}function I(a){var b=a.b,c=!1;a.d!==a.b.d&&(c=!0,G(a.d,a.b.d));a.c===a?F(a.a,null):(a.b.d.a=J(a),a.a.c=a.c,H(a,J(a)),c||D(a,a.d));b.c===b?(F(b.a,null),G(b.d,null)):(a.d.a=J(b),b.a.c=b.c,H(b,J(b)));fa(a)}
function K(a){var b=B(a),c=b.b;H(b,a.e);b.a=a.b.a;C(c,b.a);b.d=c.d=a.d;b=b.b;H(a.b,J(a.b));H(a.b,b);a.b.a=b.a;b.b.a.c=b.b;b.b.d=a.b.d;b.f=a.f;b.b.f=a.b.f;return b}function L(a,b){var c=!1,d=B(a),e=d.b;b.d!==a.d&&(c=!0,G(b.d,a.d));H(d,a.e);H(e,b);d.a=a.b.a;e.a=b.a;d.d=e.d=a.d;a.d.a=e;c||D(d,a.d);return d}function B(a){var b=new M,c=new M,d=a.b.h;c.h=d;d.b.h=b;b.h=a;a.b.h=c;b.b=c;b.c=b;b.e=c;c.b=b;c.c=c;return c.e=b}function H(a,b){var c=a.c,d=b.c;c.b.e=b;d.b.e=a;a.c=d;b.c=c}
function C(a,b){var c=b.f,d=new N(b,c);c.e=d;b.f=d;c=d.c=a;do c.a=d,c=c.c;while(c!==a)}function D(a,b){var c=b.d,d=new ga(b,c);c.b=d;b.d=d;d.a=a;d.c=b.c;c=a;do c.d=d,c=c.e;while(c!==a)}function fa(a){var b=a.h;a=a.b.h;b.b.h=a;a.b.h=b}function F(a,b){var c=a.c,d=c;do d.a=b,d=d.c;while(d!==c);c=a.f;d=a.e;d.f=c;c.e=d}function G(a,b){var c=a.a,d=c;do d.d=b,d=d.e;while(d!==c);c=a.d;d=a.b;d.d=c;c.b=d};function ha(a){var b=0;Math.abs(a[1])>Math.abs(a[0])&&(b=1);Math.abs(a[2])>Math.abs(a[b])&&(b=2);return b};var O=4*1E150;function P(a,b){a.f+=b.f;a.b.f+=b.b.f}function ia(a,b,c){a=a.a;b=b.a;c=c.a;if(b.b.a===a)return c.b.a===a?u(b.a,c.a)?0>=x(c.b.a,b.a,c.a):0<=x(b.b.a,c.a,b.a):0>=x(c.b.a,a,c.a);if(c.b.a===a)return 0<=x(b.b.a,a,b.a);b=v(b.b.a,a,b.a);a=v(c.b.a,a,c.a);return b>=a}function Q(a){a.a.i=null;var b=a.e;b.a.c=b.c;b.c.a=b.a;a.e=null}function ja(a,b){I(a.a);a.c=!1;a.a=b;b.i=a}function ka(a){var b=a.a.a;do a=R(a);while(a.a.a===b);a.c&&(b=L(S(a).a.b,a.a.e),ja(a,b),a=R(a));return a}
function la(a,b,c){var d=new ma;d.a=c;d.e=na(a.f,b.e,d);return c.i=d}function oa(a,b){switch(a.s){case 100130:return 0!==(b&1);case 100131:return 0!==b;case 100132:return 0<b;case 100133:return 0>b;case 100134:return 2<=b||-2>=b}return!1}function pa(a){var b=a.a,c=b.d;c.c=a.d;c.a=b;Q(a)}function T(a,b,c){a=b;for(b=b.a;a!==c;){a.c=!1;var d=S(a),e=d.a;if(e.a!==b.a){if(!d.c){pa(a);break}e=L(b.c.b,e.b);ja(d,e)}b.c!==e&&(E(J(e),e),E(b,e));pa(a);b=d.a;a=d}return b}
function U(a,b,c,d,e,f){var g=!0;do la(a,b,c.b),c=c.c;while(c!==d);for(null===e&&(e=S(b).a.b.c);;){d=S(b);c=d.a.b;if(c.a!==e.a)break;c.c!==e&&(E(J(c),c),E(J(e),c));d.f=b.f-c.f;d.d=oa(a,d.f);b.b=!0;!g&&qa(a,b)&&(P(c,e),Q(b),I(e));g=!1;b=d;e=c}b.b=!0;f&&ra(a,b)}function sa(a,b,c,d,e){var f=[b.g[0],b.g[1],b.g[2]];b.d=null;b.d=a.o?a.o(f,c,d,a.c)||null:null;null===b.d&&(e?a.n||(V(a,100156),a.n=!0):b.d=c[0])}
function ta(a,b,c){var d=[null,null,null,null];d[0]=b.a.d;d[1]=c.a.d;sa(a,b.a,d,[.5,.5,0,0],!1);E(b,c)}function ua(a,b,c,d,e){var f=Math.abs(b.b-a.b)+Math.abs(b.a-a.a),g=Math.abs(c.b-a.b)+Math.abs(c.a-a.a),h=e+1;d[e]=.5*g/(f+g);d[h]=.5*f/(f+g);a.g[0]+=d[e]*b.g[0]+d[h]*c.g[0];a.g[1]+=d[e]*b.g[1]+d[h]*c.g[1];a.g[2]+=d[e]*b.g[2]+d[h]*c.g[2]}
function qa(a,b){var c=S(b),d=b.a,e=c.a;if(u(d.a,e.a)){if(0<x(e.b.a,d.a,e.a))return!1;if(!t(d.a,e.a))K(e.b),E(d,J(e)),b.b=c.b=!0;else if(d.a!==e.a){var c=a.e,f=d.a.h;if(0<=f){var c=c.b,g=c.d,h=c.e,k=c.c,l=k[f];g[l]=g[c.a];k[g[l]]=l;l<=--c.a&&(1>=l?W(c,l):u(h[g[l>>1]],h[g[l]])?W(c,l):va(c,l));h[f]=null;k[f]=c.b;c.b=f}else for(c.c[-(f+1)]=null;0<c.a&&null===c.c[c.d[c.a-1]];)--c.a;ta(a,J(e),d)}}else{if(0>x(d.b.a,e.a,d.a))return!1;R(b).b=b.b=!0;K(d.b);E(J(e),d)}return!0}
function wa(a,b){var c=S(b),d=b.a,e=c.a,f=d.a,g=e.a,h=d.b.a,k=e.b.a,l=new N;x(h,a.a,f);x(k,a.a,g);if(f===g||Math.min(f.a,h.a)>Math.max(g.a,k.a))return!1;if(u(f,g)){if(0<x(k,f,g))return!1}else if(0>x(h,g,f))return!1;var r=h,p=f,q=k,y=g,m,w;u(r,p)||(m=r,r=p,p=m);u(q,y)||(m=q,q=y,y=m);u(r,q)||(m=r,r=q,q=m,m=p,p=y,y=m);u(q,p)?u(p,y)?(m=v(r,q,p),w=v(q,p,y),0>m+w&&(m=-m,w=-w),l.b=A(m,q.b,w,p.b)):(m=x(r,q,p),w=-x(r,y,p),0>m+w&&(m=-m,w=-w),l.b=A(m,q.b,w,y.b)):l.b=(q.b+p.b)/2;z(r,p)||(m=r,r=p,p=m);z(q,y)||
(m=q,q=y,y=m);z(r,q)||(m=r,r=q,q=m,m=p,p=y,y=m);z(q,p)?z(p,y)?(m=aa(r,q,p),w=aa(q,p,y),0>m+w&&(m=-m,w=-w),l.a=A(m,q.a,w,p.a)):(m=ba(r,q,p),w=-ba(r,y,p),0>m+w&&(m=-m,w=-w),l.a=A(m,q.a,w,y.a)):l.a=(q.a+p.a)/2;u(l,a.a)&&(l.b=a.a.b,l.a=a.a.a);r=u(f,g)?f:g;u(r,l)&&(l.b=r.b,l.a=r.a);if(t(l,f)||t(l,g))return qa(a,b),!1;if(!t(h,a.a)&&0<=x(h,a.a,l)||!t(k,a.a)&&0>=x(k,a.a,l)){if(k===a.a)return K(d.b),E(e.b,d),b=ka(b),d=S(b).a,T(a,S(b),c),U(a,b,J(d),d,d,!0),!0;if(h===a.a){K(e.b);E(d.e,J(e));f=c=b;g=f.a.b.a;
do f=R(f);while(f.a.b.a===g);b=f;f=S(b).a.b.c;c.a=J(e);e=T(a,c,null);U(a,b,e.c,d.b.c,f,!0);return!0}0<=x(h,a.a,l)&&(R(b).b=b.b=!0,K(d.b),d.a.b=a.a.b,d.a.a=a.a.a);0>=x(k,a.a,l)&&(b.b=c.b=!0,K(e.b),e.a.b=a.a.b,e.a.a=a.a.a);return!1}K(d.b);K(e.b);E(J(e),d);d.a.b=l.b;d.a.a=l.a;d.a.h=xa(a.e,d.a);d=d.a;e=[0,0,0,0];l=[f.d,h.d,g.d,k.d];d.g[0]=d.g[1]=d.g[2]=0;ua(d,f,h,e,0);ua(d,g,k,e,2);sa(a,d,l,e,!0);R(b).b=b.b=c.b=!0;return!1}
function ra(a,b){for(var c=S(b);;){for(;c.b;)b=c,c=S(c);if(!b.b&&(c=b,b=R(b),null===b||!b.b))break;b.b=!1;var d=b.a,e=c.a,f;if(f=d.b.a!==e.b.a)a:{f=b;var g=S(f),h=f.a,k=g.a,l=void 0;if(u(h.b.a,k.b.a)){if(0>x(h.b.a,k.b.a,h.a)){f=!1;break a}R(f).b=f.b=!0;l=K(h);E(k.b,l);l.d.c=f.d}else{if(0<x(k.b.a,h.b.a,k.a)){f=!1;break a}f.b=g.b=!0;l=K(k);E(h.e,k.b);l.b.d.c=f.d}f=!0}f&&(c.c?(Q(c),I(e),c=S(b),e=c.a):b.c&&(Q(b),I(d),b=R(c),d=b.a));if(d.a!==e.a)if(d.b.a===e.b.a||b.c||c.c||d.b.a!==a.a&&e.b.a!==a.a)qa(a,
b);else if(wa(a,b))break;d.a===e.a&&d.b.a===e.b.a&&(P(e,d),Q(b),I(d),b=R(c))}}
function ya(a,b){a.a=b;for(var c=b.c;null===c.i;)if(c=c.c,c===b.c){var c=a,d=b,e=new ma;e.a=d.c.b;var f=c.f,g=f.a;do g=g.a;while(null!==g.b&&!f.c(f.b,e,g.b));var f=g.b,h=S(f),e=f.a,g=h.a;if(0===x(e.b.a,d,e.a))e=f.a,t(e.a,d)||t(e.b.a,d)||(K(e.b),f.c&&(I(e.c),f.c=!1),E(d.c,e),ya(c,d));else{var k=u(g.b.a,e.b.a)?f:h,h=void 0;f.d||k.c?(k===f?h=L(d.c.b,e.e):h=L(g.b.c.b,d.c).b,k.c?ja(k,h):(e=c,f=la(c,f,h),f.f=R(f).f+f.a.f,f.d=oa(e,f.f)),ya(c,d)):U(c,f,d.c,d.c,null,!0)}return}c=ka(c.i);e=S(c);f=e.a;e=T(a,
e,null);if(e.c===f){var f=e,e=f.c,g=S(c),h=c.a,k=g.a,l=!1;h.b.a!==k.b.a&&wa(a,c);t(h.a,a.a)&&(E(J(e),h),c=ka(c),e=S(c).a,T(a,S(c),g),l=!0);t(k.a,a.a)&&(E(f,J(k)),f=T(a,g,null),l=!0);l?U(a,c,f.c,e,e,!0):(u(k.a,h.a)?d=J(k):d=h,d=L(f.c.b,d),U(a,c,d,d.c,d.c,!1),d.b.i.c=!0,ra(a,c))}else U(a,c,e.c,f,f,!0)}function za(a,b){var c=new ma,d=ea(a.b);d.a.b=O;d.a.a=b;d.b.a.b=-O;d.b.a.a=b;a.a=d.b.a;c.a=d;c.f=0;c.d=!1;c.c=!1;c.h=!0;c.b=!1;d=a.f;d=na(d,d.a,c);c.e=d};function Aa(a){this.a=new Ba;this.b=a;this.c=ia}function na(a,b,c){do b=b.c;while(null!==b.b&&!a.c(a.b,b.b,c));a=new Ba(c,b.a,b);b.a.c=a;return b.a=a};function Ba(a,b,c){this.b=a||null;this.a=b||this;this.c=c||this};function X(){this.d=Y;this.p=this.b=this.q=null;this.j=[0,0,0];this.s=100130;this.n=!1;this.o=this.a=this.e=this.f=null;this.m=!1;this.c=this.r=this.i=this.k=this.l=this.h=null}var Y=0;n=X.prototype;n.x=function(){Z(this,Y)};n.B=function(a,b){switch(a){case 100142:return;case 100140:switch(b){case 100130:case 100131:case 100132:case 100133:case 100134:this.s=b;return}break;case 100141:this.m=!!b;return;default:V(this,100900);return}V(this,100901)};
n.y=function(a){switch(a){case 100142:return 0;case 100140:return this.s;case 100141:return this.m;default:V(this,100900)}return!1};n.A=function(a,b,c){this.j[0]=a;this.j[1]=b;this.j[2]=c};
n.z=function(a,b){var c=b?b:null;switch(a){case 100100:case 100106:this.h=c;break;case 100104:case 100110:this.l=c;break;case 100101:case 100107:this.k=c;break;case 100102:case 100108:this.i=c;break;case 100103:case 100109:this.p=c;break;case 100105:case 100111:this.o=c;break;case 100112:this.r=c;break;default:V(this,100900)}};
n.C=function(a,b){var c=!1,d=[0,0,0];Z(this,2);for(var e=0;3>e;++e){var f=a[e];-1E150>f&&(f=-1E150,c=!0);1E150<f&&(f=1E150,c=!0);d[e]=f}c&&V(this,100155);c=this.q;null===c?(c=ea(this.b),E(c,c.b)):(K(c),c=c.e);c.a.d=b;c.a.g[0]=d[0];c.a.g[1]=d[1];c.a.g[2]=d[2];c.f=1;c.b.f=-1;this.q=c};n.u=function(a){Z(this,Y);this.d=1;this.b=new Ca;this.c=a};n.t=function(){Z(this,1);this.d=2;this.q=null};n.v=function(){Z(this,2);this.d=1};
n.w=function(){Z(this,1);this.d=Y;var a=this.j[0],b=this.j[1],c=this.j[2],d=!1,e=[a,b,c];if(0===a&&0===b&&0===c){for(var b=[-2*1E150,-2*1E150,-2*1E150],f=[2*1E150,2*1E150,2*1E150],c=[],g=[],d=this.b.c,a=d.e;a!==d;a=a.e)for(var h=0;3>h;++h){var k=a.g[h];k<f[h]&&(f[h]=k,g[h]=a);k>b[h]&&(b[h]=k,c[h]=a)}a=0;b[1]-f[1]>b[0]-f[0]&&(a=1);b[2]-f[2]>b[a]-f[a]&&(a=2);if(f[a]>=b[a])e[0]=0,e[1]=0,e[2]=1;else{b=0;f=g[a];c=c[a];g=[0,0,0];f=[f.g[0]-c.g[0],f.g[1]-c.g[1],f.g[2]-c.g[2]];h=[0,0,0];for(a=d.e;a!==d;a=
a.e)h[0]=a.g[0]-c.g[0],h[1]=a.g[1]-c.g[1],h[2]=a.g[2]-c.g[2],g[0]=f[1]*h[2]-f[2]*h[1],g[1]=f[2]*h[0]-f[0]*h[2],g[2]=f[0]*h[1]-f[1]*h[0],k=g[0]*g[0]+g[1]*g[1]+g[2]*g[2],k>b&&(b=k,e[0]=g[0],e[1]=g[1],e[2]=g[2]);0>=b&&(e[0]=e[1]=e[2]=0,e[ha(f)]=1)}d=!0}g=ha(e);a=this.b.c;b=(g+1)%3;c=(g+2)%3;g=0<e[g]?1:-1;for(e=a.e;e!==a;e=e.e)e.b=e.g[b],e.a=g*e.g[c];if(d){e=0;d=this.b.a;for(a=d.b;a!==d;a=a.b)if(b=a.a,!(0>=b.f)){do e+=(b.a.b-b.b.a.b)*(b.a.a+b.b.a.a),b=b.e;while(b!==a.a)}if(0>e)for(e=this.b.c,d=e.e;d!==
e;d=d.e)d.a=-d.a}this.n=!1;e=this.b.b;for(a=e.h;a!==e;a=d)if(d=a.h,b=a.e,t(a.a,a.b.a)&&a.e.e!==a&&(ta(this,b,a),I(a),a=b,b=a.e),b.e===a){if(b!==a){if(b===d||b===d.b)d=d.h;I(b)}if(a===d||a===d.b)d=d.h;I(a)}this.e=e=new Da;d=this.b.c;for(a=d.e;a!==d;a=a.e)a.h=xa(e,a);Ea(e);this.f=new Aa(this);za(this,-O);for(za(this,O);null!==(e=Fa(this.e));){for(;;){a:if(a=this.e,0===a.a)d=Ga(a.b);else if(d=a.c[a.d[a.a-1]],0!==a.b.a&&(a=Ga(a.b),u(a,d))){d=a;break a}if(null===d||!t(d,e))break;d=Fa(this.e);ta(this,e.c,
d.c)}ya(this,e)}this.a=this.f.a.a.b.a.a;for(e=0;null!==(d=this.f.a.a.b);)d.h||++e,Q(d);this.f=null;e=this.e;e.b=null;e.d=null;this.e=e.c=null;e=this.b;for(a=e.a.b;a!==e.a;a=d)d=a.b,a=a.a,a.e.e===a&&(P(a.c,a),I(a));if(!this.n){e=this.b;if(this.m)for(a=e.b.h;a!==e.b;a=d)d=a.h,a.b.d.c!==a.d.c?a.f=a.d.c?1:-1:I(a);else for(a=e.a.b;a!==e.a;a=d)if(d=a.b,a.c){for(a=a.a;u(a.b.a,a.a);a=a.c.b);for(;u(a.a,a.b.a);a=a.e);b=a.c.b;for(c=void 0;a.e!==b;)if(u(a.b.a,b.a)){for(;b.e!==a&&(ca(b.e)||0>=x(b.a,b.b.a,b.e.b.a));)c=
L(b.e,b),b=c.b;b=b.c.b}else{for(;b.e!==a&&(da(a.c.b)||0<=x(a.b.a,a.a,a.c.b.a));)c=L(a,a.c.b),a=c.b;a=a.e}for(;b.e.e!==a;)c=L(b.e,b),b=c.b}if(this.h||this.i||this.k||this.l)if(this.m)for(e=this.b,d=e.a.b;d!==e.a;d=d.b){if(d.c){this.h&&this.h(2,this.c);a=d.a;do this.k&&this.k(a.a.d,this.c),a=a.e;while(a!==d.a);this.i&&this.i(this.c)}}else{e=this.b;d=!!this.l;a=!1;b=-1;for(c=e.a.d;c!==e.a;c=c.d)if(c.c){a||(this.h&&this.h(4,this.c),a=!0);g=c.a;do d&&(f=g.b.d.c?0:1,b!==f&&(b=f,this.l&&this.l(!!b,this.c))),
this.k&&this.k(g.a.d,this.c),g=g.e;while(g!==c.a)}a&&this.i&&this.i(this.c)}if(this.r){e=this.b;for(a=e.a.b;a!==e.a;a=d)if(d=a.b,!a.c){b=a.a;c=b.e;g=void 0;do g=c,c=g.e,g.d=null,null===g.b.d&&(g.c===g?F(g.a,null):(g.a.c=g.c,H(g,J(g))),f=g.b,f.c===f?F(f.a,null):(f.a.c=f.c,H(f,J(f))),fa(g));while(g!==b);b=a.d;a=a.b;a.d=b;b.b=a}this.r(this.b);this.c=this.b=null;return}}this.b=this.c=null};
function Z(a,b){if(a.d!==b)for(;a.d!==b;)if(a.d<b)switch(a.d){case Y:V(a,100151);a.u(null);break;case 1:V(a,100152),a.t()}else switch(a.d){case 2:V(a,100154);a.v();break;case 1:V(a,100153),a.w()}}function V(a,b){a.p&&a.p(b,a.c)};function ga(a,b){this.b=a||this;this.d=b||this;this.a=null;this.c=!1};function M(){this.h=this;this.i=this.d=this.a=this.e=this.c=this.b=null;this.f=0}function J(a){return a.b.e};function Ca(){this.c=new N;this.a=new ga;this.b=new M;this.d=new M;this.b.b=this.d;this.d.b=this.b};function N(a,b){this.e=a||this;this.f=b||this;this.d=this.c=null;this.g=[0,0,0];this.h=this.a=this.b=0};function Da(){this.c=[];this.d=null;this.a=0;this.e=!1;this.b=new Ha}function Ea(a){a.d=[];for(var b=0;b<a.a;b++)a.d[b]=b;a.d.sort(function(a){return function(b,e){return u(a[b],a[e])?1:-1}}(a.c));a.e=!0;Ia(a.b)}function xa(a,b){if(a.e){var c=a.b,d=++c.a;2*d>c.f&&(c.f*=2,c.c=Ja(c.c,c.f+1));var e;0===c.b?e=d:(e=c.b,c.b=c.c[c.b]);c.e[e]=b;c.c[e]=d;c.d[d]=e;c.h&&va(c,d);return e}c=a.a++;a.c[c]=b;return-(c+1)}
function Fa(a){if(0===a.a)return Ka(a.b);var b=a.c[a.d[a.a-1]];if(0!==a.b.a&&u(Ga(a.b),b))return Ka(a.b);do--a.a;while(0<a.a&&null===a.c[a.d[a.a-1]]);return b};function Ha(){this.d=Ja([0],33);this.e=[null,null];this.c=[0,0];this.a=0;this.f=32;this.b=0;this.h=!1;this.d[1]=1}function Ja(a,b){for(var c=Array(b),d=0;d<a.length;d++)c[d]=a[d];for(;d<b;d++)c[d]=0;return c}function Ia(a){for(var b=a.a;1<=b;--b)W(a,b);a.h=!0}function Ga(a){return a.e[a.d[1]]}function Ka(a){var b=a.d,c=a.e,d=a.c,e=b[1],f=c[e];0<a.a&&(b[1]=b[a.a],d[b[1]]=1,c[e]=null,d[e]=a.b,a.b=e,0<--a.a&&W(a,1));return f}
function W(a,b){for(var c=a.d,d=a.e,e=a.c,f=b,g=c[f];;){var h=f<<1;h<a.a&&u(d[c[h+1]],d[c[h]])&&(h+=1);var k=c[h];if(h>a.a||u(d[g],d[k])){c[f]=g;e[g]=f;break}c[f]=k;e[k]=f;f=h}}function va(a,b){for(var c=a.d,d=a.e,e=a.c,f=b,g=c[f];;){var h=f>>1,k=c[h];if(0===h||u(d[k],d[g])){c[f]=g;e[g]=f;break}c[f]=k;e[k]=f;f=h}};function ma(){this.e=this.a=null;this.f=0;this.c=this.b=this.h=this.d=!1}function S(a){return a.e.c.b}function R(a){return a.e.a.b};this.libtess={GluTesselator:X,windingRule:{GLU_TESS_WINDING_ODD:100130,GLU_TESS_WINDING_NONZERO:100131,GLU_TESS_WINDING_POSITIVE:100132,GLU_TESS_WINDING_NEGATIVE:100133,GLU_TESS_WINDING_ABS_GEQ_TWO:100134},primitiveType:{GL_LINE_LOOP:2,GL_TRIANGLES:4,GL_TRIANGLE_STRIP:5,GL_TRIANGLE_FAN:6},errorType:{GLU_TESS_MISSING_BEGIN_POLYGON:100151,GLU_TESS_MISSING_END_POLYGON:100153,GLU_TESS_MISSING_BEGIN_CONTOUR:100152,GLU_TESS_MISSING_END_CONTOUR:100154,GLU_TESS_COORD_TOO_LARGE:100155,GLU_TESS_NEED_COMBINE_CALLBACK:100156},
gluEnum:{GLU_TESS_MESH:100112,GLU_TESS_TOLERANCE:100142,GLU_TESS_WINDING_RULE:100140,GLU_TESS_BOUNDARY_ONLY:100141,GLU_INVALID_ENUM:100900,GLU_INVALID_VALUE:100901,GLU_TESS_BEGIN:100100,GLU_TESS_VERTEX:100101,GLU_TESS_END:100102,GLU_TESS_ERROR:100103,GLU_TESS_EDGE_FLAG:100104,GLU_TESS_COMBINE:100105,GLU_TESS_BEGIN_DATA:100106,GLU_TESS_VERTEX_DATA:100107,GLU_TESS_END_DATA:100108,GLU_TESS_ERROR_DATA:100109,GLU_TESS_EDGE_FLAG_DATA:100110,GLU_TESS_COMBINE_DATA:100111}};X.prototype.gluDeleteTess=X.prototype.x;
X.prototype.gluTessProperty=X.prototype.B;X.prototype.gluGetTessProperty=X.prototype.y;X.prototype.gluTessNormal=X.prototype.A;X.prototype.gluTessCallback=X.prototype.z;X.prototype.gluTessVertex=X.prototype.C;X.prototype.gluTessBeginPolygon=X.prototype.u;X.prototype.gluTessBeginContour=X.prototype.t;X.prototype.gluTessEndContour=X.prototype.v;X.prototype.gluTessEndPolygon=X.prototype.w; if (typeof module !== 'undefined') { module.exports = this.libtess; }

},{}],129:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

},{}]},{},[7])

