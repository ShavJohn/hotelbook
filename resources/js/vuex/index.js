import { createStore } from 'vuex'
import auth from './moduls/auth'
import adminPanel from './moduls/adminPanel'

export default createStore({
    modules: {
        auth,
        adminPanel
    }
})
