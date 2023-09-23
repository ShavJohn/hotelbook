export default {
    namespaced: true,
    state: {
        room: {
            id: '',
            en: {
                name: '',
                price: ''
            },
            ru: {
                name: '',
                price: ''
            },
            number: '',
            roomImage: [],
            additionalImages: [],
            roomType: [],
            roomFeatures: [],
            roomServices: []
        },
        rooms: [],
        types: [],
        features: [],
        services: []
    },
    getters: {
        roomGetter(state) {
            return state.room
        },
        roomsGetter(state) {
            return state.rooms
        },
        typesGetter(state) {
            return state.types
        },
        featuresGetter(state) {
            return state.features
        },
        servicesGetter(state) {
            return state.services
        }
    },
    mutations: {
        roomSetter(state, data) {
            state.room.en.name = data.room.en.name ? data.room.en.name : ''
            state.room.en.price = data.room.en.price ? data.room.en.price : ''
            state.room.ru.name = data.room.ru.name ? data.room.ru.name : ''
            state.room.ru.price = data.room.ru.price ? data.room.ru.price : ''
            state.room.number = data.room.number ? data.room.number : ''
            state.room.roomImage = data.room.roomImage ? data.room.roomImage : []
            state.room.additionalImages = data.room.additionalImages ? data.room.additionalImages : []
            state.room.roomType = data.room.roomType ? data.room.roomType : ''
            state.room.roomFeatures = data.room.roomFeatures ? data.room.roomFeatures : []
            state.room.roomServices = data.room.roomServices ? data.room.roomServices : []
        },
        roomsSetter(state, data) {
            state.rooms = data
        },
        typesSetter(state, data) {
            state.types = data
        },
        featuresSetter(state, data) {
            state.features = data
        },
        servicesSetter(state, data) {
            state.services = data
        }
    },
    actions: {
        addRoomFST(context, data) {
            return new Promise((resolve, reject) => {
                axios.post(`/add-room-${data.type}`, data.array).then((res) => {


                    context.dispatch('alert/alertResponse', {
                        'type': res.data.type,
                        'status': res.status,
                        'message': res.data.message
                    }, { root:true })

                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getRoomFST(context, data) {
            return new Promise((resolve, reject) => {
                axios.get('/get-room-fst').then((res) => {
                    context.commit('featuresSetter', res.data.features)
                    context.commit('servicesSetter', res.data.services)
                    context.commit('typesSetter', res.data.roomTypes)

                    resolve(res)
                }).catch((err) => {

                    reject(err)
                })
            })
        }
    }
}
