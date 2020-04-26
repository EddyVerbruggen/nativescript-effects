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
        var def = {
            scale: { x: animation.scale.x, y: animation.scale.y },
            translate: { x: animation.translate.x, y: animation.translate.y },
            delay: animation.delay,
            duration: animation.duration,
            curve: 'spring'
        };
        return this._view.animate(def);
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
//# sourceMappingURL=effects.android.js.map