import { createStore } from 'vuex'
import auth from './moduls/auth'
import adminPanel from './moduls/adminPanel'
import alert from "./moduls/alert";

export default createStore({
    modules: {
        auth,
        adminPanel,
        alert
    }
})
