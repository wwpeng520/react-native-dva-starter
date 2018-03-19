import MobclickAgent from "rn-umeng";
import  {
    Platform
} from "react-native";

class mObserver {

    constructor() {
        if (Platform.OS === 'ios') {
            MobclickAgent.startWithAppkey("5a6834b6b27b0a5ac1000114"); // ios
        } else {
            MobclickAgent.startWithAppkey("58020f6be0f55a541b0017db");
        }
        MobclickAgent.setDebugMode(true);
    }
    
    setEvent(...params:any[]) {
        console.log(Platform.OS, ...params);
        MobclickAgent.onEvent(...params);
    }

}

var globalObserver = new mObserver();

export default globalObserver;