<template>
    <div class="room-book-container">
        <div class="extra-services-container">
            <h2>Add Extra Services</h2>
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
        <h2 class="margin-top-large">Add Your Information</h2>
        <div class="booked-room-inputs-container">
            <div class="booked-room-input">
                <label for="user-name">Name</label>
                <input id="user-name" type="text" name="user-name" placeholder="Enter your name"
                       v-model="bookingData.guestData.name">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-input">
                <label for="user-lastname">Lastname</label>
                <input id="user-lastname" type="text" name="user-lastname" placeholder="Enter your lastname"
                        v-model="bookingData.guestData.lastName">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-input">
                <label for="user-email">Email</label>
                <input id="user-email" type="email" name="user-email" placeholder="Enter your email"
                        v-model="bookingData.guestData.email">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-input">
                <label for="user-phone">Phone</label>
                <input id="user-phone" type="tel" name="user-phone" placeholder="Enter your phone"
                       v-model="bookingData.guestData.phone">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-input">
                <label for="user-address">Address</label>
                <input id="user-address" type="text" name="user-address" placeholder="Enter your address"
                       v-model="bookingData.guestData.address">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-input">
                <label for="user-city">City</label>
                <input id="user-city" type="text" name="user-city" placeholder="Enter your city"
                       v-model="bookingData.guestData.city">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-input">
                <label for="user-country">Country</label>
                <input id="user-country" type="text" name="user-country" placeholder="Enter your country"
                       v-model="bookingData.guestData.country">
                <div class="input-delimiter"></div>
            </div>
            <div class="booked-room-dropdown">
                <div class="hour-dropdowns">
                    <label for="user-country">Check-In</label>
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
                    <label for="user-country">Check-Out</label>
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
                <label>Message</label>
                <textarea id="user-message"  name="user-message" placeholder="Enter your message"
                          v-model="bookingData.guestData.message"></textarea>
                <div class="input-delimiter"></div>
            </div>
            <button class="chosen-room-checkout-btn" @click="checkout()">
                Checkout
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
            }else if (!this.bookingData.guestData.lastName.length) {
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
