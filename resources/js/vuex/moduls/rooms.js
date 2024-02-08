export default {
    namespaced: true,
    state: {
        room: {
            id: '',
            en: {
                name: '',
                adult_price: '',
                child_price: '',
                description: ''
            },
            ru: {
                name: '',
                adult_price: '',
                child_price: '',
                description: ''
            },
            busy: false,
            number: '',
            main_image: '',
            additionalImages: [],
            selectedType: {},
            selectedFeatures: [],
            selectedServices: []
        },
        rooms: [],
        allRooms: [],
        types: [],
        features: [],
        services: [],
        editModal: false,
        roomTotalCount: 0,
        filtered: false,
        roomBusy: false,
    },
    getters: {
        roomGetter(state) {
            return state.room
        },
        roomsGetter(state) {
            return state.rooms
        },
        allRoomsGetter(state) {
            return state.allRooms
        },
        typesGetter(state) {
            return state.types
        },
        selectedTypeGetter(state) {
            return state.room.selectedType
        },
        featuresGetter(state) {
            return state.features
        },
        selectedFeaturesGetter(state) {
            return state.room.selectedFeatures
        },
        servicesGetter(state) {
            return state.services
        },
        selectedServicesGetter(state) {
            return state.room.selectedServices
        },
        editModalGetter(state) {
            return state.editModal
        },
        getRoomTotalCount(state) {
            return state.roomTotalCount
        },
        getIfRoomFiltered(state) {
            return state.filtered
        },
        getIsRoomBusy(state) {
            return state.roomBusy
        }
    },
    mutations: {
        roomSetter(state, data) {
            state.room.id = data.id
            state.room.en = data.en ? data.en : ''
            state.room.ru = data.ru ? data.ru : ''
            state.room.number = data.number ? data.number : ''
            state.room.main_image = data.main_image ? data.main_image : []
            state.room.additionalImages = data.images ? data.images : []
            state.room.selectedFeatures = []
            state.room.selectedServices = []

            state.room.selectedType = data.room_options.find(( name ) => name.type === "types") ? data.room_options.find(( name ) => name.type === "types") : ''

            if(data.room_options && data.room_options.length) {
                data.room_options.forEach(room => {
                    if(room.type === 'features') {
                        state.room.selectedFeatures.push(room)
                    } else if(room.type === 'services') {
                        state.room.selectedServices.push(room)
                    }
                })
            }
        },
        resetRoomData(state, data) {
            state.room.id = '',
            state.room.en = {
                name: '',
                adult_price: '',
                child_price: '',
                description: ''
            },
            state.room.ru = {
                name: '',
                    adult_price: '',
                    child_price: '',
                    description: ''
            },
            state.room.number = '',
            state.room.main_image = '',
            state.room.additionalImages = [],
            state.room.selectedType = {},
            state.room.selectedFeatures = [],
            state.room.selectedServices = []
        },
        roomsSetter(state, data) {
            state.rooms = data
        },
        typesSetter(state, data) {
            state.types = data
        },
        selectedTypeSetter(state, data) {
            state.room.selectedType = data
        },
        featuresSetter(state, data) {
            state.features = data
        },
        selectedFeaturesSetter(state, data) {
            state.room.selectedFeatures = data
        },
        servicesSetter(state, data) {
            state.services = data
        },
        selectedServicesSetter(state, data) {
            state.room.selectedServices = data
        },
        setRoomTotalCount(state, data) {
            state.roomTotalCount = data
        },
        setIfRoomFiltered(state, data) {
            state.filtered = data
        },
        setIsRoomBusy(state, data) {
            state.roomBusy = data;
        },
        setAllRooms(state, data) {
            state.allRooms = data
        }
    },
    actions: {
        getAvailableRooms(context, data) {
            return new Promise((resolve, reject) => {
                axios.get('/check-available-room', {params: data}).then(res => {
                    context.commit('roomsSetter', res.data.rooms)
                    context.commit('setRoomTotalCount', res.data.roomTotalCount)
                    context.commit('setIfRoomFiltered', true)
                    resolve(res)
                }).catch(err => {
                    console.log(err)
                    context.dispatch('alert/alertResponse', {
                        'type': err.data.type,
                        'status': err.status,
                        'message': err.data.message
                    }, { root:true })

                    reject(err)
                })
            })
        },
        addRoom(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/add-room', context.state.room).then((res) => {
                    resolve(res)
                    context.dispatch('alert/alertResponse', {
                        'type': res.data.type,
                        'status': res.status,
                        'message': res.data.message
                    }, { root:true })
                }).catch(err => {
                    context.dispatch('alert/alertResponse', {
                        'type': err.data.type,
                        'status': err.status,
                        'message': err.data.message
                    }, { root:true })

                    reject(err)
                })
            })
        },
        getRoom(context, data) {
            return new Promise((resolve, reject) => {
                axios.get(`/get-room/${data}`).then((res) => {
                    context.commit('roomSetter', res.data.room)
                    resolve(res)
                }).catch(err => {
                    context.dispatch('alert/alertResponse', {
                        'type': err.data.type,
                        'status': err.status,
                        'message': err.data.message
                    }, { root:true })

                    reject(err)
                })
            })
        },
        getRooms(context, data) {
            return new Promise((resolve, reject) => {
                if(!data) {
                    data = {
                        skip: 0,
                        take: 5,
                    }
                }
                data.startDate = new Date()
                data.endDate = new Date()
                data.endDate.setDate(data.startDate.getDate()+1);

                axios.get('/get-rooms', {params: data}).then((res) => {
                    context.commit('roomsSetter', res.data.roomData)
                    context.commit('setRoomTotalCount', res.data.roomTotalCount)
                    context.commit('setAllRooms', res.data.allRooms)
                    resolve(res)
                }).catch(err => {
                    context.dispatch('alert/alertResponse', {
                        'type': err.data.type,
                        'status': err.status,
                        'message': err.data.message
                    }, { root:true })

                    reject(err)
                })
            })
        },
        updateRoom(context, data) {
            return new Promise((resolve, reject) => {
                axios.put('/update-room', {params: data}).then((res) => {

                    context.dispatch('alert/alertResponse', {
                        'type': res.data.type,
                        'status': res.status,
                        'message': res.data.message
                    }, { root:true })
                    resolve(res)
                }).catch(err => {
                    context.dispatch('alert/alertResponse', {
                        'type': err.data.type,
                        'status': err.status,
                        'message': err.data.message
                    }, { root:true })

                    reject(err)
                })
            })
        },
        removeRoom(context, data) {
            return new Promise((resolve, reject) => {
                axios.delete(`/delete-room/${data}`).then((res) => {
                    context.dispatch('alert/alertResponse', {
                        'type': res.data.type,
                        'status': res.status,
                        'message': res.data.message
                    }, { root:true })

                    resolve(res)
                }).catch(err => {

                    context.dispatch('alert/alertResponse', {
                        'type': err.data.type,
                        'status': err.status,
                        'message': err.data.message
                    }, { root:true })

                    reject(err)
                })
            })
        },
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

                    context.dispatch('alert/alertResponse', {
                        'type': err.data.type,
                        'status': err.status,
                        'message': err.data.message
                    }, { root:true })

                    reject(err)
                })
            })
        },
        removeFST(context, data) {
            return new Promise((resolve, reject) => {
                axios.delete(`/delete-fst/${data}`).then((res) => {

                    context.dispatch('alert/alertResponse', {
                        'type': res.data.type,
                        'status': res.status,
                        'message': res.data.message
                    }, { root:true })
                    resolve(res)
                }).catch(err => {

                    context.dispatch('alert/alertResponse', {
                        'type': err.data.type,
                        'status': err.status,
                        'message': err.data.message
                    }, { root:true })

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
