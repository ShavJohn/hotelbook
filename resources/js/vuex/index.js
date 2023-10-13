import { createStore } from 'vuex'
import auth from './moduls/auth'
import adminPanel from './moduls/adminPanel'
import alert from "./moduls/alert";
import rooms from "./moduls/rooms"
import imageActions from "./moduls/imageActions";
import generalSettings from "./moduls/generalSettings";


export default createStore({
    modules: {
        auth,
        adminPanel,
        alert,
        rooms,
        imageActions,
        generalSettings
    }
})
