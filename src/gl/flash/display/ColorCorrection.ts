/**
 * Created by MIC on 2015/11/18.
 */

abstract class ColorCorrection {

    static get DEFAULT(): string {
        return 'default';
    }

    static get OFF(): string {
        return 'off';
    }

    static get ON(): string {
        return 'on';
    }

}

export default ColorCorrection;
