export default {
    data() {
        return {
            dataLang: 'en',
            imagesUploaded: 0,
            btnLoading: false,
            tableContentLoader: false,
            fSTItem: {
                en: {
                    name: '',
                    description: ''
                },
                ru: {
                    name: '',
                    description: ''
                },
                size: ''
            },
            skip: 0,
            take: 5,
            currentPage: 1,
            pageCount: 5,
            removeRoomId: 0,
            testType: "Double"
        }
    },
    watch: {
        'currentPage': function(val) {
            this.skip =  (val - 1) * 5;
            console.log(this.filtered)
            if(!this.filtered) {
                this.getRooms()
            } else {
                this.getAvailability(this.bookingDate.startDate, this.bookingDate.endDate, this.bookingData.guestCount)
            }
        }
    },
    computed: {
        imagePrefix() {
            return window.imagePrefix
        },
        roomData() {
            return this.$store.getters['rooms/roomGetter']
        },
        roomBusy() {
            return this.$store.getters['rooms/getIsRoomBusy']
        },
        roomsData() {
            return this.$store.getters['rooms/roomsGetter']
        },
        bookingData() {
            return this.$store.getters['bookings/getBookingData']
        },
        bookingDate() {
            return this.$store.getters['bookings/getBookingDate']
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
            return this.roomServices.filter((roomType) => {
                return !this.selectedServices.some((service) => {
                    // Here you can define your own logic to compare objects.
                    // For example, you can compare properties 'en', 'id', 'ru', and 'type'.
                    return (
                        service.en.description === roomType.en.description &&
                        service.en.name === roomType.en.name &&
                        service.id === roomType.id &&
                        service.ru.description === roomType.ru.description &&
                        service.ru.name === roomType.ru.name
                    );
                });
            })
        },
        roomFeatures() {
            return this.$store.getters['rooms/featuresGetter']
        },
        selectedFeatures() {
            return this.$store.getters['rooms/selectedFeaturesGetter']
        },
        filteredFeatures() {
            return this.roomFeatures.filter((roomType) => {
                return !this.selectedFeatures.some((service) => {
                    // Here you can define your own logic to compare objects.
                    // For example, you can compare properties 'en', 'id', 'ru', and 'type'.
                    return (
                        service.en.description === roomType.en.description &&
                        service.en.name === roomType.en.name &&
                        service.id === roomType.id &&
                        service.ru.description === roomType.ru.description &&
                        service.ru.name === roomType.ru.name
                    );
                });
            })
        },
        editModal() {
            return this.$store.getters['rooms/editModalGetter']
        },
        roomTotalCount() {
            return this.$store.getters['rooms/getRoomTotalCount']
        },
        filtered() {
            return this.$store.getters['rooms/getIfRoomFiltered']
        },
        totalPages() {
            return Math.ceil(this.roomTotalCount / this.take)
        },
        visiblePages() {
            const range = 2; // Number of pages to show before and after the current page
            const startPage = Math.max(1, this.currentPage - range);
            const endPage = Math.min(this.totalPages, this.currentPage + range);

            return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
        },
    },
    methods: {
        getAvailability(startDate, endDate, guestCount) {
            startDate = startDate.setHours(startDate.getHours() + 3)
            endDate = endDate.setHours(endDate.getHours() + 3)
            let data = {
                skip: this.skip,
                take: this.take,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                guestCount: guestCount
            }

            this.$store.dispatch('rooms/getAvailableRooms', data)
        },
        displayType(array) {
            return array.find(( name ) => name.type === "types")
        },
        displayFeatures(array) {
            return array.filter(( name ) => name.type === "features")
        },
        displayServices(array) {
            return array.filter(( name ) => name.type === "services")
        },
        addItemToArray(arrayName) {
            this.$store.state.rooms[`${arrayName}`].push({
                en: {
                    name: this.fSTItem.en.name,
                    description: this.fSTItem.en.description
                },
                ru: {
                    name: this.fSTItem.ru.name,
                    description: this.fSTItem.ru.description
                },
                size: this.fSTItem.size ? this.fSTItem.size : ''
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
                    },
                    size: this.fSTItem.size ? this.fSTItem.size : ''
                }
            }

            this.$store.dispatch('rooms/addRoomFST', data)


            this.fSTItem.en.name = ''
            this.fSTItem.en.description = ''
            this.fSTItem.ru.name = ''
            this.fSTItem.ru.description = ''
            this.fSTItem.size = ''
        },
        uploadImage(e) {
            let formData = new FormData()
            formData.append('image', e.target.files[0])

            this.$store.dispatch('imageActions/imageUpload', formData).then((res) => {

                this.$store.state.rooms.room.main_image = res.data.image
                this.$store.dispatch('alert/alertResponse', {
                    'type': res?.data?.type,
                    'message': res?.data?.message
                })
            }).catch((err) => {
                this.$store.dispatch('alert/alertResponse', {
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

                this.$store.state.rooms.room.additionalImages.push(res.data.image)
                this.$store.dispatch('alert/alertResponse', {
                    'type': res?.data?.type,
                    'message': res?.data?.message
                })
            }).catch((err) => {
                this.$store.dispatch('alert/alertResponse', {
                    'type': err?.data?.type,
                    'message': err?.data?.message
                })

            })
        },
        deleteImage(imageName, key, list) {
            this.$store.dispatch('imageActions/imageDelete', imageName).then((res) => {
                if(res.data.success) {
                    if(!list) {
                        this.$store.state.rooms.room.main_image = ''
                    } else {
                        this.$store.state.rooms.room.additionalImages.splice(key, 1)
                    }

                    this.$store.dispatch('alert/alertResponse', {
                        'type': res?.data?.type,
                        'message': res?.data?.message
                    })
                }
            }).catch((err) => {
                this.$store.dispatch('alert/alertResponse', {
                    'type': err?.data?.type,
                    'message': err?.data?.message
                })
            })
        },
        deleteImageFromDBToo(imageName, key) {
            this.$store.dispatch('imageActions/imageDeleteFromDb', imageName).then((res) => {
                if(res.data.success) {
                    this.$store.state.rooms.room.additionalImages.splice(key, 1)
                    this.$store.dispatch('alert/alertResponse', {
                        'type': res?.data?.type,
                        'message': res?.data?.message
                    })
                }
            }).catch((err) => {
                this.$store.dispatch('alert/alertResponse', {
                    'type': err?.data?.type,
                    'message': err?.data?.message
                })
            })
        },
        compareTwoObj(obj1, obj2) {
            return obj1.id && obj2.id && obj1.id === obj2.id && obj1.type === obj2.type;
        },
        chooseFST(type, data) {
            if(type === 'roomServices') {
                this.$store.state.rooms.room.selectedServices.push(data)
            } else if(type === 'roomFeatures') {
                this.$store.state.rooms.room.selectedFeatures.push(data)
            }
        },
        addRoom() {
            this.btnLoading = true
            if(!this.roomData.number ||
                !this.roomData[this.dataLang].adult_price ||
                !this.roomData[this.dataLang].child_price ||
                !this.roomData.main_image ||
                !this.roomData[this.dataLang].name
            ) {
                this.$store.dispatch('alert/alertResponse', {
                    'type': 'Error',
                    'status': 0,
                    'message': 'Please fill all inputs'
                }, { root:true })
                this.btnLoading = false
                return;
            }
            this.$store.dispatch('rooms/addRoom').then((res) => {
                this.getRooms()
                this.btnLoading = false
                $('#roomAction').modal("hide");
            }).catch(() => {
                this.btnLoading = false
            })
        },
        editRoom(roomData) {
            this.$store.dispatch('rooms/updateRoom',roomData).then(() => {
                this.getRooms()
                this.$store.state.rooms.editModal = false
                $('#roomAction').modal("hide");
            }).catch(() => {
                this.$store.state.rooms.editModal = false
            })
        },
        changePage(action) {
            if(action === 'next' && this.roomsData.length +1 >= this.take) {
                this.skip = this.skip + this.take
                this.getRooms()
            } else if(action === 'prev' && this.skip > 0) {
                this.skip = this.skip - this.take
                this.getRooms()
            }
        },
        openRemoveRoomModal(id) {
            this.removeRoomId = id
            $('#removeRoom').modal("show");
        },
        openRoomEditModal(roomData) {
            this.$store.state.rooms.editModal = true
            this.$store.commit('rooms/roomSetter', roomData)

            $('#roomAction').modal("show");
        },
        removeRoom(id) {
            this.btnLoading = true
            this.$store.dispatch('rooms/removeRoom', id).then(() => {
                this.btnLoading = false
                this.getRooms()
                $('#removeRoom').modal("hide");
            }).catch(() => {
                this.btnLoading = false
            })
        },
        getRooms() {
            this.$Progress.start()
            this.tableContentLoader = true
            let data = {
                'skip': this.skip,
                'take': this.take
            }
            this.$store.dispatch('rooms/getRooms', data).then(() => {
                this.$Progress.finish()
                this.tableContentLoader = false
            })
        },
        removeSFTItem(arrayName, id, key) {
            this.$store.state.rooms[arrayName].splice(key, 1)
            this.$store.dispatch('rooms/removeFST', id)
        },
        removeItemFromArray(arrayName, key) {
            this.$store.state.rooms.room[arrayName].splice(key, 1)
        }
    }
}
