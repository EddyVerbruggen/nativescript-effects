"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("@nativescript/core/data/observable");
var viewModule = require("@nativescript/core/ui/core/view");
var typesModule = require("@nativescript/core/utils/types");
var enums = require("@nativescript/core/ui/enums");
var Common = (function (_super) {
    __extends(Common, _super);
    function Common() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Common.getMsValue = function (duration) {
        if (typesModule.isString(duration)) {
            if (typesModule.isDefined(Common.presetDurations[duration])) {
                return this.presetDurations[duration];
            }
        }
        else if (typesModule.isNumber(duration)) {
            return duration;
        }
        else {
            return this.defaultDuration;
        }
    };
    return Common;
}(observable_1.Observable));
Common.defaultDuration = 400;
Common.defaultSlideDistance = -100;
Common.defaultFloatDirection = 'up';
Common.presetDirections = {
    'up': { x: 0, y: 100 },
    'down': { x: 0, y: -100 },
    'left': { x: 100, y: 0 },
    'right': { x: -100, y: 0 }
};
Common.presetDurations = {
    'fast': 200,
    'slow': 600
};
exports.Common = Common;
viewModule.View.prototype.fadeIn = function (duration) {
    if (duration === void 0) {
        duration = Common.defaultDuration;
    }
    var msDuration = Common.getMsValue(duration);
    this.visibility = enums.Visibility.visible;
    return this.animate({
        opacity: 1,
        duration: msDuration
    });
};
viewModule.View.prototype.fadeOut = function (duration) {
    if (duration === void 0) {
        duration = Common.defaultDuration;
    }
    var msDuration = Common.getMsValue(duration);
    return this.animate({
        opacity: 0,
        duration: msDuration
    });
};
viewModule.View.prototype.fadeTo = function (duration, opacity) {
    if (duration === void 0) {
        duration = Common.defaultDuration;
    }
    if (opacity === void 0) {
        opacity = 1;
    }
    var msDuration = Common.getMsValue(duration);
    this.visibility = enums.Visibility.visible;
    return this.animate({
        opacity: opacity,
        duration: msDuration
    });
};
viewModule.View.prototype.fadeToggle = function (duration) {
    if (duration === void 0) {
        duration = Common.defaultDuration;
    }
    if (this.opacity > 0) {
        return this.fadeOut(duration);
    }
    else {
        return this.fadeIn(duration);
    }
};
viewModule.View.prototype.floatIn = function (duration, direction) {
    if (duration === void 0) {
        duration = Common.defaultDuration;
    }
    if (direction === void 0) {
        direction = Common.defaultFloatDirection;
    }
    var self = this;
    var msDuration = Common.getMsValue(duration);
    this.visibility = enums.Visibility.visible;
    var dir = Common.presetDirections[direction];
    if (!dir) {
        dir = Common.presetDirections['up'];
    }
    var promiseSetup = self.animate({
        translate: { x: dir.x, y: dir.y },
        opacity: 0,
        duration: 1
    });
    return promiseSetup.then(function () {
        return self.animate({
            translate: { x: 0, y: 0 },
            opacity: 1,
            duration: msDuration
        });
    });
};
viewModule.View.prototype.floatOut = function (duration, direction) {
    if (duration === void 0) {
        duration = Common.defaultDuration;
    }
    if (direction === void 0) {
        direction = Common.defaultFloatDirection;
    }
    var msDuration = Common.getMsValue(duration);
    var dir = Common.presetDirections[direction];
    if (!dir) {
        dir = Common.presetDirections['down'];
    }
    return this.animate({
        translate: { x: dir.x, y: dir.y },
        opacity: 0,
        duration: msDuration
    });
};
viewModule.View.prototype.hide = function (duration) {
    if (duration === void 0) {
        duration = 1;
    }
    this.visibility = enums.Visibility.collapse;
    return this.fadeOut(duration);
};
viewModule.View.prototype.show = function (duration) {
    if (duration === void 0) {
        duration = 1;
    }
    this.visibility = enums.Visibility.visible;
    return this.fadeIn(duration);
};
viewModule.View.prototype.toggle = function (duration) {
    if (duration === void 0) {
        duration = 1;
    }
    if (this.visibility === enums.Visibility.collapse) {
        return this.show(duration);
    }
    else {
        return this.hide(duration);
    }
};
viewModule.View.prototype.slideDown = function (duration, distance) {
    if (duration === void 0) {
        duration = Common.defaultDuration;
    }
    if (distance === void 0) {
        distance = Common.defaultSlideDistance;
    }
    var self = this;
    var msDuration = Common.getMsValue(duration);
    this.visibility = enums.Visibility.visible;
    this.translateY = distance;
    this.opacity = 0;
    var promiseSetup = self.animate({
        translate: { x: 0, y: distance },
        opacity: 0,
        duration: 1
    });
    return promiseSetup.then(function () {
        return self.animate({
            translate: { x: 0, y: 0 },
            opacity: 1,
            duration: msDuration
        });
    });
};
viewModule.View.prototype.slideUp = function (duration, distance) {
    if (duration === void 0) {
        duration = Common.defaultDuration;
    }
    if (distance === void 0) {
        distance = Common.defaultSlideDistance;
    }
    var msDuration = Common.getMsValue(duration);
    return this.animate({
        translate: { x: 0, y: distance },
        opacity: 0,
        duration: msDuration
    });
};
viewModule.View.prototype.slideToggle = function (duration, distance) {
    if (duration === void 0) {
        duration = Common.defaultDuration;
    }
    if (distance === void 0) {
        distance = Common.defaultSlideDistance;
    }
    if (this.opacity > 0) {
        return this.slideUp(duration, distance);
    }
    else {
        return this.slideDown(duration, distance);
    }
};
viewModule.View.prototype.shake = function () {
    var view = this;
    return new Promise(function (resolve, reject) {
        view.animate({ translate: { x: -20, y: 0 }, duration: 60, curve: enums.AnimationCurve.linear })
            .then(function () { return view.animate({ translate: { x: 20, y: 0 }, duration: 60, curve: enums.AnimationCurve.linear }); })
            .then(function () { return view.animate({ translate: { x: -20, y: 0 }, duration: 60, curve: enums.AnimationCurve.linear }); })
            .then(function () { return view.animate({ translate: { x: 20, y: 0 }, duration: 60, curve: enums.AnimationCurve.linear }); })
            .then(function () { return view.animate({ translate: { x: -10, y: 0 }, duration: 60, curve: enums.AnimationCurve.linear }); })
            .then(function () { return view.animate({ translate: { x: 10, y: 0 }, duration: 60, curve: enums.AnimationCurve.linear }); })
            .then(function () { return view.animate({ translate: { x: -5, y: 0 }, duration: 60, curve: enums.AnimationCurve.linear }); })
            .then(function () { return view.animate({ translate: { x: 5, y: 0 }, duration: 60, curve: enums.AnimationCurve.linear }); })
            .then(function () { return view.animate({ translate: { x: 0, y: 0 }, duration: 60, curve: enums.AnimationCurve.linear }); })
            .then(function () {
            return resolve(view);
        });
    });
};
//# sourceMappingURL=effects.common.js.map