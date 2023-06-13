import {createRouter, createWebHistory } from 'vue-router'
import store from '../vuex'

import Home from '../views/Home'
import Rooms from '../views/Rooms';
import Room from '../views/Room'
import Contact from "../views/Contact";
import About from "../views/About";
import Login from "../views/Login"
import Bookings from "../views/adminPages/Bookings"
import Messages from "../views/adminPages/Messages"
import Statistics from "../views/adminPages/Statistics"

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
    { path: '/rooms/:room', component: Room, name: 'Room', meta: {title: 'room'} },
    { path: '/contact', component: Contact, name: 'Contact', meta: {title: 'Contact'}},
    { path: '/about', component: About, name: 'About', meta: {title: 'About'}},
    { path: '/login', component: Login, name: 'Login', meta: {title: 'Login'}},
    { path: '/bookings', component: Bookings, name: 'Bookings', meta: {title: 'Bookings', auth: true, admin: true}},
    { path: '/messages', component: Messages, name: 'Messages', meta: {title: 'Messages', auth: true, admin: true}},
    { path: '/statistics', component: Statistics, name: 'Statistics', meta: {title: 'Statistics', auth: true, admin: true}},
]

const router = createRouter({
    history: createWebHistory(process.env.APP_URL),
    routes
})

router.beforeEach(async (toRoute, fromRoute, next) => {
    if(toRoute.meta && toRoute.meta.title) {
        if(Object.keys(toRoute.params).length) {
            let metaData = toRoute.params[toRoute.meta.title].replace('-', ' ')
            window.document.title = metaData.toUpperCase()
        } else {
            window.document.title = toRoute.meta.title
        }
    } else {
        window.document.title = 'Home'
    }

    if(toRoute.name === 'Login') {
        if(store.getters['auth/authUserGetter'] && store.getters['auth/accessTokenGetter']) {
            return  next({name: 'Home'})
        }
    }

    if(toRoute.meta.auth && toRoute.meta.admin && (!store.getters['auth/authUserGetter'] || !store.getters['auth/accessTokenGetter'])) {
        return next({name: 'Home'})
    }

    return next()
})

export default router
