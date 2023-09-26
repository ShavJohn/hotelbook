export default {
    data() {
        return {
            dataLang: 'en',
            fSTItem: {
                en: {
                    name: '',
                    description: ''
                },
                ru: {
                    name: '',
                    description: ''
                }
            },
        }
    },
    computed: {
        roomData() {
            return this.$store.getters['rooms/roomGetter']
        },
        roomsData() {
            return this.$store.getters['rooms/roomsGetter']
        },
        roomTypes() {
            return this.$store.getters['rooms/typesGetter']
        },
        roomServices() {
            return this.$store.getters['rooms/servicesGetter']
        },
        roomFeatures() {
            return this.$store.getters['rooms/featuresGetter']
        }
    },
    methods: {
        addItemToArray(arrayName) {
            this.$store.state.rooms[`${arrayName}`].push({
                en: {
                    name: this.fSTItem.en.name,
                    description: this.fSTItem.en.description
                },
                ru: {
                    name: this.fSTItem.ru.name,
                    description: this.fSTItem.ru.description
                }
            })

            let data = {
                type: arrayName,
                array: {
                    en: {
                        name: this.fSTItem.en.name,
                        description: this.fSTItem.en.description
                    },
                    ru: {
                        name: this.fSTItem.ru.name,
                        description: this.fSTItem.ru.description
                    }
                }
            }

            this.$store.dispatch('rooms/addRoomFST', data)


            this.fSTItem.en.name = ''
            this.fSTItem.en.description = ''
            this.fSTItem.ru.name = ''
            this.fSTItem.ru.description = ''
        },
        removeItemFromArray(arrayName, id, key) {
            this.$store.state.rooms[`${arrayName}`].splice(key, 1)

            this.$store.dispatch('rooms/removeFST', id)
        }
    }
}
