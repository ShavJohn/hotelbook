export default {
    data() {
        return {
            dataLang: 'en',
            imagesUploaded: 0,
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
        imagePrefix() {
            return window.imagePrefix
        },
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
        uploadImage(e) {
            let formData = new FormData()
            formData.append('image', e.target.files[0])

            this.$store.dispatch('imageActions/imageUpload', formData).then((res) => {
                // this.widgetData.background_image = res.data.image


                console.log(454545, res, 45454)
                this.$store.state.rooms.room.roomImage = res.data.image
                this.$emit('alert', {
                    'type': res?.data?.type,
                    'message': res?.data?.message
                })
            }).catch((err) => {
                this.$emit('alert', {
                    'type': err?.data?.type,
                    'message': err?.data?.message
                })
            })
        },
        uploadImages(e) {
            let formData = new FormData()
            formData.append('image', e.target.files[0])

            this.imagesUploaded++
            this.$store.dispatch('imageActions/imageUpload', formData).then((res) => {
                // this.widgetData.partners.push(res.data.image)

                this.$emit('alert', {
                    'type': res?.data?.type,
                    'message': res?.data?.message
                })
            }).catch((err) => {
                this.$emit('alert', {
                    'type': err?.data?.type,
                    'message': err?.data?.message
                })
            })
        },
        deleteImage(imageName, key, list) {
            this.$store.dispatch('imageActions/imageDelete', imageName).then((res) => {
                if(res.data.success) {
                    // if(!list) {
                    //     this.widgetData.background_image = ''
                    // } else {
                    //     console.log(545454)
                    //     this.widgetData.partners.splice(key, 1)
                    // }

                    this.$emit('alert', {
                        'type': res?.data?.type,
                        'message': res?.data?.message
                    })
                }
            }).catch((err) => {
                this.$emit('alert', {
                    'type': err?.data?.type,
                    'message': err?.data?.message
                })
            })
        },
        deleteImageFromDBToo(imageName, key) {
            console.log(imageName);
            this.$store.dispatch('imageActions/imageDeleteFromDb', imageName).then((res) => {
                if(res.data.success) {
                    // this.widgetData.partners.splice(key, 1)
                    this.$emit('alert', {
                        'type': res?.data?.type,
                        'message': res?.data?.message
                    })
                }
            }).catch((err) => {
                this.$emit('alert', {
                    'type': err?.data?.type,
                    'message': err?.data?.message
                })
            })
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
