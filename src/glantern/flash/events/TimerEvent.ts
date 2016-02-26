/**
 * Created by MIC on 2016/1/7.
 */

import {ICloneable} from "../../ICloneable";
import {FlashEvent} from "./FlashEvent";
import {NotImplementedError} from "../../../../lib/glantern-utils/src/NotImplementedError";

export class TimerEvent extends FlashEvent implements ICloneable<TimerEvent> {

    constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
        super(type, bubbles, cancelable);
    }

    static get TIMER():string {
        return 'timer';
    }

    static get TIMER_COMPLETE():string {
        return 'timerComplete';
    }

    updateAfterEvent():void {
        throw new NotImplementedError();
    }

    clone():TimerEvent {
        throw new NotImplementedError();
    }

}