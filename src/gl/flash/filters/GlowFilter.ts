/**
 * Created by MIC on 2015/11/30.
 */

import BitmapFilter from "./BitmapFilter";
import {default as WebGLGlowFilter} from "../../webgl/filters/GlowFilter";
import FilterManager from "../../webgl/FilterManager";
import BitmapFilterQuality from "./BitmapFilterQuality";
import MathUtil from "../../mic/MathUtil";

export default class GlowFilter extends WebGLGlowFilter implements BitmapFilter {

    constructor(filterManager: FilterManager, color: number = 0xff0000, alpha: number = 1.0, blurX: number = 6.0, blurY: number = 6.0,
                strength: number = 2, quality: number = BitmapFilterQuality.LOW, inner: boolean = false, knockout: boolean = false) {
        super(filterManager);
        this.color = color;
        this.alpha = MathUtil.clamp(alpha, 0, 1);
        this.blurX = blurX;
        this.blurY = blurY;
        this.strength = strength;
        this.quality = quality;
        this.inner = inner;
        this.knockout = knockout;
    }

    get alpha(): number {
        return this._alpha;
    }

    set alpha(v: number) {
        const b = v !== this.alpha;
        this._alpha = v;
        if (b) {
            this.__updateColorMatrix();
        }
    }

    get blurX(): number {
        return this.strengthX;
    }

    set blurX(v: number) {
        this.strengthX = v;
    }

    get blurY(): number {
        return this.strengthY;
    }

    set blurY(v: number) {
        this.strengthY = v;
    }

    get color(): number {
        return this._color;
    }

    set color(v: number) {
        v |= 0;
        const b = v !== this._color;
        this._color = v;
        if (b) {
            this.__updateColorMatrix();
        }
    }

    inner: boolean = false;
    knockout: boolean = false;

    get quality(): number {
        return this.pass;
    }

    set quality(v: number) {
        this.pass = v;
    }

    strength: number = 2;

    clone(): GlowFilter {
        return new GlowFilter(this.filterManager, this.color, this.alpha, this.blurX, this.blurY,
            this.strength, this.quality, this.inner, this.knockout);
    }

    private __updateColorMatrix(): void {
        const r = ((this._color >>> 16) & 0xff) / 0xff;
        const g = ((this._color >>> 8) & 0xff) / 0xff;
        const b = (this._color & 0xff) / 0xff;
        const a = this._alpha;
        const cm = [
            0, 0, 0, r, 0,
            0, 0, 0, g, 0,
            0, 0, 0, b, 0,
            0, 0, 0, a, 0
        ];
        this.setColorMatrix(cm);
    }

    private _color: number = 0x000000;
    private _alpha: number = 1;

}
