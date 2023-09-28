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
        selectedType() {
            return this.$store.getters['rooms/selectedTypeGetter']
        },
        roomServices() {
            return this.$store.getters['rooms/servicesGetter']
        },
        selectedServices() {
            return this.$store.getters['rooms/selectedServicesGetter']
        },
        filteredServices() {
            return this.roomServices.filter(roomType => !this.selectedServices.includes(roomType))
        },
        roomFeatures() {
            return this.$store.getters['rooms/featuresGetter']
        },
        selectedFeatures() {
            return this.$store.getters['rooms/selectedFeaturesGetter']
        },
        filteredFeatures() {
            return this.roomFeatures.filter(roomType => !this.selectedFeatures.includes(roomType))
        },
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
        chooseFST(type, data) {
            if(type === 'roomServices') {
                  this.$store.state.rooms.room.selectedServices.push(data)
              } else if(type === 'roomFeatures') {
                  this.$store.state.rooms.room.selectedFeatures.push(data)
              }
        },
        removeSFTItem(arrayName, id, key) {
            this.removeItemFromArray(arrayName, key)

            this.$store.dispatch('rooms/removeFST', id)
        },
        removeItemFromArray(arrayName, key) {
            this.$store.state.rooms[`${arrayName}`].splice(key, 1)
        }
    }
}
