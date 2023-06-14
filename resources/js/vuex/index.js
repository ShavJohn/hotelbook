import { createStore } from 'vuex'
import auth from './moduls/auth'
import adminPanel from './moduls/adminPanel'
import alert from "./moduls/alert";
import rooms from "./moduls/rooms"

export default createStore({
    modules: {
        auth,
        adminPanel,
        alert,
        rooms
    }
})
