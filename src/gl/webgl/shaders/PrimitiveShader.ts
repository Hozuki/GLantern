/**
 * Created by MIC on 2015/11/18.
 */

import Matrix3D from "../../flash/geom/Matrix3D";
import UniformCache from "../UniformCache";
import AttributeCache from "../AttributeCache";
import ShaderManager from "../ShaderManager";
import VertexShaders from "../VertexShaders";
import FragmentShaders from "../FragmentShaders";
import ShaderBase from "../ShaderBase";
import WebGLDataType from "../WebGLDataType";

export default class PrimitiveShader extends ShaderBase {

    constructor(manager: ShaderManager) {
        super(manager, PrimitiveShader.VERTEX_SOURCE, PrimitiveShader.FRAGMENT_SOURCE, null, null);
    }

    static SHADER_CLASS_NAME: string = "PrimitiveShader";
    static FRAGMENT_SOURCE: string = FragmentShaders.primitive;
    static VERTEX_SOURCE: string = VertexShaders.primitive;

    setProjection(matrix: Matrix3D): void {
        this._uniforms.get("uProjectionMatrix").value = matrix.toArray();
    }

    setTransform(matrix: Matrix3D): void {
        this._uniforms.get("uTransformMatrix").value = matrix.toArray();
    }

    setAlpha(alpha: number): void {
        this._uniforms.get("uAlpha").value = alpha;
    }

    setHollow(hollow: boolean): void {
        this._uniforms.get("uHollow").value = hollow;
    }

    protected _$localInit(manager: ShaderManager, uniforms: Map<string,UniformCache>, attributes: Map<string, AttributeCache>): void {
        super._$localInit(manager, uniforms, attributes);

        let u: UniformCache;
        const transformMatrix = new Matrix3D();
        const projectionMatrix = new Matrix3D();
        const w = manager.renderer.view.width;
        const h = manager.renderer.view.height;
        projectionMatrix.setOrthographicProjection(0, w, h, 0, -1000, 1000);

        u = Object.create(null);
        u.name = "uProjectionMatrix";
        u.type = WebGLDataType.UMat4;
        u.value = projectionMatrix.toArray();
        u.transpose = false;
        uniforms.set(u.name, u);

        u = Object.create(null);
        u.name = "uTransformMatrix";
        u.type = WebGLDataType.UMat4;
        u.value = transformMatrix.toArray();
        u.transpose = false;
        uniforms.set(u.name, u);

        u = Object.create(null);
        u.name = "uAlpha";
        u.type = WebGLDataType.U1F;
        u.value = 1;
        uniforms.set(u.name, u);

        u = Object.create(null);
        u.name = "uHollow";
        u.type = WebGLDataType.UBool;
        u.value = true;
        uniforms.set(u.name, u);
    }

}
