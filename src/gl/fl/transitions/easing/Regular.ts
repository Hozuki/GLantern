/**
 * Created by MIC on 2015/12/26.
 */

import NotImplementedError from "../../../flash/errors/NotImplementedError";

abstract class Regular {

    static easeIn(t: number, b: number, c: number, d: number): number {
        throw new NotImplementedError();
    }

    static easeInOut(t: number, b: number, c: number, d: number): number {
        throw new NotImplementedError();
    }

    static easeOut(t: number, b: number, c: number, d: number): number {
        throw new NotImplementedError();
    }

}

export default Regular;
