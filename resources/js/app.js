/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import { createApp } from 'vue';
import router from './router'
import store from './vuex'
import i18n from './i18n'
import VueProgressBar from "@aacassandra/vue3-progressbar";
import VueLazyLoad from "vue3-lazyload";
import main from './mixins/main';
import {Chart, registerables } from 'chart.js';
import {BarChart, LineChart, PieChart } from 'vue-chart-3';
import { QuillEditor } from '@vueup/vue-quill';
import vue3StarRatings from "vue3-star-ratings";

import '@vueup/vue-quill/dist/vue-quill.snow.css';

import moment from 'moment'

import Datepicker from 'vue3-datepicker'

const options = {
    color: '#b18b3e',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
        speed: '0.5s',
        opacity: '0.8s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
}


//Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

//jQuery
window.$ = window.jQuery = require("jquery");

/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */

library.add(fas, far, fab)

import App from './views/App';

window.Vue = createApp(App);

Vue.component("font-awesome-icon", FontAwesomeIcon)
Chart.register(...registerables);
Vue.component('BarChart', BarChart);
Vue.component('LineChart', LineChart);
Vue.component('PieChart', PieChart);
Vue.component("vue3-star-ratings", vue3StarRatings);

const outside = {
    beforeMount: (el, binding) => {
        el.clickOutsideEvent = event => {
            // here I check that click was outside the el and his children
            if (!(el == event.target || el.contains(event.target))) {
                // and if it did, call method provided in attribute value
                binding.value();
            }
        };
        document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted: el => {
        document.removeEventListener("click", el.clickOutsideEvent);
    },
};

Vue.directive('outside', outside)

Vue.component('Datepicker', Datepicker);

Vue.component('QuillEditor', QuillEditor);

Vue.mixin(main)

window.i18n = i18n;

Vue.use(router)
Vue.use(VueProgressBar, options)
Vue.use(VueLazyLoad, {
    preLoad: 1.3,
    error: '/storage/err.png',
    loading: '/storage/poster_loader.gif',
    attempt: 1,
})
Vue.use(store)
Vue.use(i18n)

window.moment = moment

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// Object.entries(import.meta.globEager('./**/*.vue')).forEach(([path, definition]) => {
//     app.component(path.split('/').pop().replace(/\.\w+$/, ''), definition.default);
// });

/**
 * Finally, we will attach the application instance to a HTML element with
 * an "id" attribute of "app". This element is included with the "auth"
 * scaffolding. Otherwise, you will need to add an element yourself.
 */


Vue.mount('#app');
