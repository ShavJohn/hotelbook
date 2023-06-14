export default {
    state: {
        rooms: [],
        types: [

        ],
        features: [

        ],
        services: [

        ]
    },
    getters: {
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

    }
}
