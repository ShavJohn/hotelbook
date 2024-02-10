<template>
    <div class="room-book-container">
        <div class="extra-services-container">
            <button class="back-page-btn" @click="goToPage('RoomSearch')">
                <font-awesome-icon icon="fa-solid fa-arrow-left" />
            </button>
            <h2>{{ $t('add_extra_services') }}</h2>
            <ul class="extra-services-list">
<!--                <li v-for="roomFeature in roomFeatures">-->
<!--                    <input type="checkbox" :id="roomFeature.type" :name="roomFeature.type" @change="tuggleData(roomFeature)">-->
<!--                    <label :for="roomFeature.type">{{ roomFeature[localeLang].name }}</label>-->
<!--                </li>-->
                <li v-for="roomService in roomServices">
                    <input type="checkbox" :id="roomService.type" :name="roomService.type" :checked="checkIfIncluded(roomService)" @change="tuggleData(roomService)">
                    <label :for="roomService.type">{{ roomService[localeLang].name }}</label>
                </li>
            </ul>
        </div>
        <h2 class="margin-top-large">{{ $t('add_your_information') }}</h2>
        <div class="booked-room-inputs-container">
            <div class="booked-room-input">
                <label for="user-name">{{ $t('name') }}</label>
                <input id="user-name" type="text" name="user-name" :placeholder="$t('enter_your') + ' ' + $t('name')"
                       v-model="bookingData.guestData.name">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-input">
                <label for="user-lastname">{{ $t('lastname') }}</label>
                <input id="user-lastname" type="text" name="user-lastname" :placeholder="$t('enter_your') + ' ' + $t('lastname')"
                        v-model="bookingData.guestData.lastname">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-input">
                <label for="user-email">{{ $t('email') }}</label>
                <input id="user-email" type="email" name="user-email" :placeholder="$t('enter_your') + ' ' + $t('email')"
                        v-model="bookingData.guestData.email">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-input">
                <label for="user-phone">{{ $t('phone') }}</label>
                <input id="user-phone" type="tel" name="user-phone" :placeholder="$t('enter_your') + ' ' + $t('phone')"
                       v-model="bookingData.guestData.phone">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-input">
                <label for="user-address">{{ $t('address') }}</label>
                <input id="user-address" type="text" name="user-address" :placeholder="$t('enter_your') + ' ' + $t('address')"
                       v-model="bookingData.guestData.address">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-input">
                <label for="user-city">{{ $t('city') }}</label>
                <input id="user-city" type="text" name="user-city" :placeholder="$t('enter_your') + ' ' + $t('city')"
                       v-model="bookingData.guestData.city">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-input">
                <label for="user-country">{{ $t('country') }}</label>
                <input id="user-country" type="text" name="user-country" :placeholder="$t('enter_your') + ' ' + $t('country')"
                       v-model="bookingData.guestData.country">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-dropdown">
                <div class="hour-dropdowns">
                    <label for="user-country">{{ $t('check_in') }}</label>
                    <drop-down>
                        <template #button>
                            {{ bookingData.guestData.checkIn }}
                        </template>
                        <template #dropdown-menu>
                            <li  @click="bookingData.guestData.checkIn = availableHour" v-for="availableHour in availableHours">{{ availableHour }}</li>
                        </template>
                    </drop-down>
                </div>
                <div class="hour-dropdowns">
                    <label for="user-country">{{ $t('check_out') }}</label>
                    <drop-down>
                        <template #button>
                            {{ bookingData.guestData.checkOut }}
                        </template>
                        <template #dropdown-menu>
                            <li @click="bookingData.guestData.checkOut = availableHour" v-for="availableHour in availableHours">{{ availableHour }}</li>
                        </template>
                    </drop-down>
                </div>
            </div>
            <div class="booked-room-input text-area">
                <label>{{ $t('message') }}</label>
                <textarea id="user-message"  name="user-message" :placeholder="$t('enter_your') + ' ' + $t('message')"
                          v-model="bookingData.guestData.message"></textarea>
                <div class="input-delimiter"></div>
            </div>
            <button class="chosen-room-checkout-btn" @click="checkout()">
                {{ $t('check_out') }}
            </button>
        </div>
    </div>
</template>

<script>
import BookingMixins from "../../../mixins/booking-mixins";
import DropDown from "../../mainComponents/drop-down";
import roomMixins from "../../../mixins/room-mixin";

export default {
    name: "room-book",
    components: {DropDown},
    mixins: [BookingMixins, roomMixins],
    async created() {
        await this.$store.dispatch('rooms/getRoomFST')
    },
    methods: {
        checkIfIncluded(roomService) {
            return this.bookingData.guestData.extraServices.some(item => item.id === roomService.id);
        },
        validation() {
            let message = ''

            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(!this.bookingData.guestData.name.length) {
                message = 'File the name field'
            }else if (!this.bookingData.guestData.lastname.length) {
                message = 'File the last name field'
            } else if (!this.bookingData.guestData.email.length) {
                message = 'File the email field'
            } else if (!this.bookingData.guestData.phone.length) {
                message = 'File the phone number field'
            } else if (!this.bookingData.guestData.country.length) {
                message = 'File the country field'
            } else if (!this.bookingData.guestData.city.length) {
                message = 'File the city field'
            } else if (!this.bookingData.guestData.address.length) {
                message = 'File the address field'
            }

            if(message.length) {
                this.$store.dispatch('alert/alertResponse', {
                    'type': 'error',
                    'status': 0,
                    'message': message
                })

                return false
            } else {
                if(this.bookingData.guestData.email.length) {
                    if(emailRegex.test(this.bookingData.guestData.email)) {
                        if(this.bookingData.guestData.phone.length && this.bookingData.guestData.phone.length >= 9) {
                            return true
                        }
                        this.$store.dispatch('alert/alertResponse', {
                            'type': 'error',
                            'status': 0,
                            'message': 'Write correct phone number'
                        })
                        return false
                    }
                    this.$store.dispatch('alert/alertResponse', {
                        'type': 'error',
                        'status': 0,
                        'message': 'Write correct email'
                    })
                    return false
                }
            }

        },
        checkout() {
            if(this.validation()) {
                this.$router.push({name: 'RoomCheckout'})
            }
        },
    },
    mounted() {
        if(!Object.keys(this.bookingData.chosenRoom).length) {
            this.$router.push({name: 'RoomSearch'})
        }
    }
}
</script>

<style scoped>

</style>
