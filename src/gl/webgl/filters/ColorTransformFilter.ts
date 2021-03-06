/**
 * Created by MIC on 2015/11/18.
 */

import ColorTransformShader from "../shaders/ColorTransformShader";
import RenderTarget2D from "../targets/RenderTarget2D";
import WebGLRenderer from "../WebGLRenderer";
import FilterManager from "../FilterManager";
import FilterBase from "../FilterBase";
import RenderHelper from "../RenderHelper";
import ShaderID from "../ShaderID";

export default class ColorTransformFilter extends FilterBase {

    constructor(manager: FilterManager) {
        super(manager);
    }

    setColorMatrix(r4c5: number[]): void {
        this._colorMatrix = r4c5.slice();
    }

    process(renderer: WebGLRenderer, input: RenderTarget2D, output: RenderTarget2D, clearOutput: boolean): void {
        const tempTarget = this.filterManager.requestTempTarget();
        RenderHelper.renderBuffered(renderer, input, tempTarget, ShaderID.COLOR_TRANSFORM, true, (renderer: WebGLRenderer): void => {
            const shader = <ColorTransformShader>renderer.shaderManager.currentShader;
            shader.setColorMatrix(this._colorMatrix);
        });
        RenderHelper.copyTargetContent(renderer, tempTarget, output, this.flipX, this.flipY, clearOutput);
        this.filterManager.returnTempTarget(tempTarget);
    }

    protected _$initialize(): void {
    }

    protected _$dispose(): void {
    }

    private _colorMatrix: number[] = [
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0
    ];

}
