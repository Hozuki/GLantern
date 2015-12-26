/**
 * Created by MIC on 2015/11/18.
 */

import {WebGLRenderer} from "../../webgl/WebGLRenderer";
import {ColorCorrectionSupport} from "./ColorCorrectionSupport";
import {NotImplementedError} from "../../_util/NotImplementedError";
import {Rectangle} from "../geom/Rectangle";
import {StageScaleMode} from "./StageScaleMode";
import {StageQuality} from "./StageQuality";
import {InteractiveObject} from "./InteractiveObject";
import {StageDisplayState} from "./StageDisplayState";
import {ColorCorrection} from "./ColorCorrection";
import {StageAlign} from "./StageAlign";
import {DisplayObjectContainer} from "./DisplayObjectContainer";

export class Stage extends DisplayObjectContainer {

    constructor(renderer:WebGLRenderer) {
        super(null, null);
        this._root = this;
        this._worldRenderer = renderer;
        this._rawRenderTarget = renderer.createRenderTarget();
        this.resize(renderer.view.width, renderer.view.height);
    }

    align:string = StageAlign.TOP_LEFT;

    get allowFullScreen():boolean {
        return this._allowFullScreen;
    }

    get allowFullScreenInteractive():boolean {
        return this._allowFullScreenInteractive;
    }

    color:number = 0x000000;
    colorCorrection:string = ColorCorrection.DEFAULT;

    get colorCorrectionSupport():string {
        return this._colorCorrectionSupport;
    }

    displayState:string = StageDisplayState.NORMAL;
    focus:InteractiveObject = null;
    frameRate:number = 60;

    get fullScreenHeight():number {
        return screen.height;
    }

    fullScreenSourceRect:Rectangle = null;

    get fullScreenWidth():number {
        return screen.width;
    }

    mouseChildren:boolean = true;
    quality:string = StageQuality.HIGH;
    scaleMode:string = StageScaleMode.NO_SCALE;
    showDefaultContextMenu:boolean = true;

    get softKeyboardRect():Rectangle {
        throw new NotImplementedError();
    }

    get stageHeight():number {
        throw new NotImplementedError();
    }

    set stageHeight(v:number) {
        throw new NotImplementedError();
    }

    get stageWidth():number {
        throw new NotImplementedError();
    }

    set stageWidth(v:number) {
        throw new NotImplementedError();
    }

    tabChildren:boolean = true;

    get x():number {
        return 0;
    }

    get y():number {
        return 0;
    }

    invalidate():void {
        throw new NotImplementedError();
    }

    isFocusInaccessible():boolean {
        throw new NotImplementedError();
    }

    get worldRenderer():WebGLRenderer {
        return this._worldRenderer;
    }

    resize(width:number, height:number):void {
        this._width = width;
        this._height = height;
        // TODO: Fully implement this
    }

    render(renderer:WebGLRenderer):void {
        super.render(renderer);
        // Copy it to the screen target.
        //throw new NotImplementedError();
        renderer.copyRenderTargetContent(this.outputRenderTarget, renderer.inputTarget, true);
    }

    protected __render(renderer:WebGLRenderer):void {
        this._rawRenderTarget.clear();
    }

    protected __update():void {
    }

    private _allowFullScreen:boolean = true;
    private _allowFullScreenInteractive:boolean = true;
    private _colorCorrectionSupport:string = ColorCorrectionSupport.DEFAULT_OFF;
    private _stageHeight:number = 0;
    private _stageWidth:number = 0;
    private _worldRenderer:WebGLRenderer = null;

}
