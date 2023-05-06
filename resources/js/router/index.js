import {createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import Rooms from '../views/Rooms';

import RoomSearch from '../components/rooms/body-components/room-search'
import RoomBook from '../components/rooms/body-components/room-book'
import RoomCheckout from '../components/rooms/body-components/room-checkout'
import RoomFinishBooking from '../components/rooms/body-components/room-finish-booking'

const routes = [
    { path: '/', component: Home, name: 'Home', meta: {title: 'Home'}},
    { path: '/rooms', component: Rooms, name: 'Rooms', meta: {title: 'Rooms'}, children : [
            { path: '', component: RoomSearch, name: 'RoomSearch', meta: {title: 'Search Room'}},
            { path: '/room-book', component: RoomBook, name: 'RoomBook', meta: {title: 'Book Room'}},
            { path: '/room-checkout', component: RoomCheckout, name: 'RoomCheckout', meta: {title: 'Checkout Room'}},
            { path: '/finishing-room-booking', component: RoomFinishBooking, name: 'RoomFinishBooking', meta: {title: 'Finish Room Booking'}}
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.APP_URL),
    routes
})

router.beforeEach(async (toRoute, fromRoute, next) => {
    window.document.title = toRoute.meta && toRoute.meta.title ? toRoute.meta.title : 'Home';
    next()
})

export default router
