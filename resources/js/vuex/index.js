import { createStore } from 'vuex'
import auth from './moduls/auth'

export default createStore({
    modules: {
        auth
    }
})
