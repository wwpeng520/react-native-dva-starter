import MobclickAgent from "rn-umeng";
import  {
    Platform
} from "react-native";

class mObserver {

    constructor() {
        if (Platform.OS === 'ios') {
            MobclickAgent.startWithAppkey("xxxxxxxxxxxx"); // ios
        } else {
            MobclickAgent.startWithAppkey("xxxxxxxxxxxxxx");
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