/**
 * Created by MIC on 2015/11/21.
 */

import {EventBase} from "../../glantern/EventBase";

export class FlashEvent extends EventBase {

    static get ENTER_FRAME():string {
        return "enterFrame";
    }

}