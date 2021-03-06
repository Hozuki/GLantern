/**
 * Created by MIC on 2015/11/18.
 */
import IDisposable from "../mic/IDisposable";
import VirtualDom from "../mic/VirtualDom";

const gl = VirtualDom.WebGLRenderingContext;

export default class PackedArrayBuffer implements IDisposable {

    constructor() {
    }

    static create(context: WebGLRenderingContext, data: number[], elementGLType: number, bufferType: number): PackedArrayBuffer {
        const T: any = PackedArrayBuffer.getTypedArrayType(elementGLType);
        if (T === null) {
            console.warn("Failed to create typed array whose elements are of WebGL type 0x" + elementGLType.toString(16));
            return null;
        }
        const newPAB = new PackedArrayBuffer();
        newPAB._glc = context;
        newPAB._elementGLType = elementGLType;
        newPAB._webglBuffer = context.createBuffer();
        if (newPAB._webglBuffer == null) {
            console.warn("Failed to create WebGL buffer.");
            return null;
        }
        newPAB._arrayType = T;
        newPAB._bufferType = bufferType;
        newPAB.setNewData(data);
        newPAB.becomeDirty();
        newPAB.syncBufferData();
        return newPAB;
    }

    get webglBuffer(): WebGLBuffer {
        return this._webglBuffer;
    }

    get elementSize(): number {
        return this._typedArray.BYTES_PER_ELEMENT;
    }

    get elementCount(): number {
        return this._typedArray.length;
    }

    get elementGLType(): number {
        return this._elementGLType;
    }

    setNewData(data: number[]): void {
        this._array = data ? data.slice() : [];
    }

    becomeDirty(): void {
        this._isDirty = true;
    }

    syncBufferData(): void {
        if (this._isDirty) {
            const T: any = this._arrayType;
            this._typedArray = new T(this._array);
            this._isDirty = false;
        }
        const glc = this._glc;
        glc.bindBuffer(this._bufferType, this._webglBuffer);
        // DANGER! In complex scenes, bufferData() transfers large amount of data.
        // Improper optimization does harm on performance.
        glc.bufferData(this._bufferType, this._typedArray, gl.DYNAMIC_DRAW);
    }

    dispose(): void {
        this._glc.deleteBuffer(this._webglBuffer);
        this._array = null;
        this._typedArray = null;
        this._webglBuffer = null;
        this._glc = null;
    }

    static getTypedArrayType(glType: number): Function {
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
    }

    private _glc: WebGLRenderingContext = null;
    private _isDirty: boolean = true;
    private _bufferType: number = 0;
    private _elementGLType: number = 0;
    private _webglBuffer: WebGLBuffer = null;
    private _array: number[] = null;
    private _arrayType: Function = null;
    private _typedArray: Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array = null;

}
