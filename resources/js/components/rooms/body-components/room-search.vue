<template>
    <div class="padding-90 hb-flex hb-flex-wrap hb-justify-content-between">
        <div class="left-menu">
            <div class="search-table">
                <div class="date-square">
                    <span>Check-In</span>
                    <div class="rooms-booking-button-container">
                        <Datepicker class="cursor-pointer" v-model="startDate" inputFormat="dd MMM" :lowerLimit="today"></Datepicker>
                    </div>
                </div>
                <div class="date-square">
                    <span>Check-Out</span>
                    <div class="rooms-booking-button-container">
                        <Datepicker class="cursor-pointer" v-model="endDate" inputFormat="dd MMM" :lowerLimit="endDayLimit"></Datepicker>
                        
                    </div>
                </div>
                <div class="date-square">
                    <span>Guests</span>
                    <div class="hb-flex hb-align-items-center hb-justify-content-center room-guest-count-container">
                        <span>{{ guestCount }}</span>
                        <div class="room-guest-count-btn">
                            <button class="btn-strip-default" @click="guestCount++">
                                <font-awesome-icon class="color-white cursor-pointer" icon="fa-solid fa-chevron-up" />
                            </button>
                            <button class="btn-strip-default" @click="guestCount !== 1 && guestCount--">
                                <font-awesome-icon class="color-white cursor-pointer" icon="fa-solid fa-chevron-down" />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="date-square">
                    <span>Nights</span>
                    <b class="nights-count-styling">{{ parseInt((endDate - startDate) / (1000 * 60 * 60 * 24), 10) }}</b>
                </div>
            </div>
        </div>
        <div class="rooms-list">
            <room-component :price="36" room-name="Private Room" :guest-count="3"/>
        </div>
    </div>
</template>

<script>
import RoomComponent from "./room-components/room-component";
const today = new Date();
today.setHours(0, 0, 0, 0)
const tomorrow = new Date();
tomorrow.setHours(0, 0, 0, 0)
tomorrow.setDate(today.getDate()+1);
export default {
    name: "room-search",
    components: {RoomComponent},
    data() {
        return {
            guestCount: 1,
            today: today,
            startDate: today,
            endDate: tomorrow,
            endDayLimit: tomorrow,
        }
    },
    watch: {
        startDate(val) {
            if(val >= this.endDate) {
                this.endDate = this.endDate.setDate(val.getDate()+1)
                this.endDate = new Date(this.endDate)
            }

            this.endDayLimit = this.endDayLimit.setDate(this.startDate.getDate()+1)
            this.endDayLimit = new Date(this.endDayLimit)
        },
    },
    methods: {

    },
    mounted() {
    }
}
</script>

<style scoped>

</style>
