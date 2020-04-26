"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var effects_common_1 = require("./effects.common");
var viewModule = require("@nativescript/core/ui/core/view");
var Effects = (function (_super) {
    __extends(Effects, _super);
    function Effects(view) {
        var _this = _super.call(this) || this;
        _this._view = view;
        return _this;
    }
    Effects.prototype.nativeSpring = function (animation) {
        var _this = this;
        var aTrans = { x: 0, y: 0 };
        var aScale = { x: 1, y: 1 };
        if (animation.translate) {
            if (animation.translate.x)
                aTrans.x = animation.translate.x;
            if (animation.translate.y)
                aTrans.y = animation.translate.y;
        }
        if (animation.scale) {
            if (animation.scale.x)
                aScale.x = animation.scale.x;
            if (animation.scale.y)
                aScale.y = animation.scale.y;
        }
        return new Promise(function (resolve, reject) {
            try {
                UIView.animateWithDurationDelayUsingSpringWithDampingInitialSpringVelocityOptionsAnimationsCompletion(animation.duration / 1000, animation.delay / 1000, animation.dampingRatio, animation.velocity, animation.options, function () {
                    _this._view.translateX = aTrans.x;
                    _this._view.translateY = aTrans.y;
                    _this._view.scaleX = aScale.x;
                    _this._view.scaleY = aScale.y;
                }, resolve);
            }
            catch (ex) {
                reject();
            }
        });
    };
    return Effects;
}(effects_common_1.Common));
exports.Effects = Effects;
viewModule.View.prototype.spring = function (duration, animation) {
    if (duration === void 0) {
        duration = Effects.defaultDuration;
    }
    var msDuration = Effects.getMsValue(duration);
    if (!animation) {
        animation = {
            translate: {
                x: 0,
                y: -100
            },
            scale: {
                x: 2,
                y: 2
            },
            duration: msDuration,
            delay: 0,
            dampingRatio: 0.3,
            velocity: 2.0,
            options: null
        };
    }
    else {
        animation.duration = msDuration;
    }
    var fx = new Effects(this);
    return fx.nativeSpring(animation);
};
//# sourceMappingURL=effects.ios.js.map