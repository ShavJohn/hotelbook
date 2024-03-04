export default {
    namespaced: true,
    state: {
        alert: {
            status: '',
            type: '',
            message: '',
        },
        alertOpen: false
    },
    getters: {
        alertGetter(state) {
            return state.alert
        },
        alertOpenGetter(state) {
            return state.alertOpen
        }
    },
    mutations: {
        alertSetter(state, data) {
            state.alert.status = data.status ? data.status : ''
            state.alert.type = data.type ? data.type : ''
            state.alert.message = data.message ? data.message : ''
        },
        alertOpenSetter(state, data) {
            state.alertOpen = data
        }
    },
    actions: {
        alertResponse(context, data) {
            if(data) {
                context.commit('alertSetter', data)
                context.commit('alertOpenSetter', true)
            }

            setTimeout(() => {
                context.commit('alertOpenSetter', false)

                setTimeout(() => {
                    context.commit('alertSetter', '')
                }, 1000)

            }, 5000)
        }
    }
}
