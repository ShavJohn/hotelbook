<template>
    <div class="room-page-body">
        <div class="rooms-page-item">
            <h2>Single Suit</h2>
            <slider :images="images"/>
            <div class="room-ditaiels-container">
                <font-awesome-icon icon="fa-solid fa-user" />
                <span>{{ guestCount }}</span>
            </div>
            <div class="room-info-container">
                <p>

                </p>
            </div>
            <div class="room-service-container">

            </div>
        </div>
        <div class="right-menu">
            <room-date-table/>
        </div>
    </div>
</template>

<script>
import RoomDateTable from "./room-components/room-date-table";
import Slider from "../mainComponents/slider";
export default {
    name: "room-body",
    components: {Slider, RoomDateTable},
    data() {
        return {
            guestCount: 5,
            images: [
                'https://static.theprint.in/wp-content/uploads/2022/10/Hotel.jpg?compress=true&quality=80&w=376&dpr=2.6',
                'https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg',
                'https://23c133e0c1637be1e07d-be55c16c6d91e6ac40d594f7e280b390.ssl.cf1.rackcdn.com/u/gpch/Park-Hotel-Group---Explore---Grand-Park-City-Hall-Facade.jpg',
                'https://media.timeout.com/images/105938335/image.jpg',
                'https://www.welcome-hotels.com/site/assets/files/35059/welcome_hotel_marburg_lobby_2k.2560x1600.jpg',
                'https://hotelxtoronto.com/_novaimg/4906918-1481330_0_0_2200_1200_2200_1200.rc.jpg',
            ]
        }
    }
}
</script>

<style scoped>

</style>
