import _ from 'lodash';
window._ = _;

import 'bootstrap';

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;

// window.axios.create({
//     baseURL: `${process.env.APP_URL}/api`
// })

window.axios.defaults.baseURL = `/api`;

window.axios.interceptors.response.use(
    response => {

        return response
    },
    error => {
        const { response } = error;
        if (response.status === 422) {
            const firstErrorIndex = Object.keys(response.data.errors)[0];
            const message = `${ response.data.message || 'Error:' } ${ response.data.errors[firstErrorIndex].msg }`;
            return Promise.reject(new Error(message || 'Error'))
        } else {
            if (response.status === 401) {

                localStorage.removeItem('access_token');
                return error
            } else {

                return Promise.reject(new Error(response.data.message || 'Error'))
            }
        }
    }
)

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.imagePrefix = `${process.env.MIX_APP_URL}/storage`;

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('access_token')}`};

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// import Pusher from 'pusher-js';
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     wsHost: import.meta.env.VITE_PUSHER_HOST ?? `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//     wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });
