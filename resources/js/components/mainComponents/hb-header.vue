<template>
    <div class="header-style">
        <div class="hb-flex hb-justify-content-between padding-large hb-align-items-center header-menu-animation">
            <div class="header-logo-styling">
                <img src="http://www.nicdarkthemes.com/themes/hotel-inn/wp/demo/inn-suites/wp-content/uploads/sites/2/2022/01/logo-motela.png">
            </div>
            <ul class="header-menu color-white hide-on-large-tablet">
                <li>{{ $t('home') }}</li>
                <li>{{ $t('about') }}</li>
                <li>{{ $t('rooms') }}</li>
                <li>{{ $t('contact') }}</li>
            </ul>
            <button class="btn bg-dark-yellow color-white font-bolder hide-on-large-tablet">{{ $t('book_now') }}</button>
            <font-awesome-icon @click="openMenu = !openMenu" class="header-mobile-menu-icon color-white font-30 cursor-pointer" icon="fa-solid fa-bars" />
        </div>
        <div class="header-mobile-menu-container" :class="openMenu ? 'header-mobile-menu-open' : 'header-mobile-menu-close'">
            <div v-if="openMenu">
                <div class="hb-flex hb-justify-content-end padding">
                    <font-awesome-icon @click="openMenu = !openMenu" class="color-white font-20 cursor-pointer" icon="fa-solid fa-xmark" />
                </div>
                <ul class="header-mobile-menu-list">
                    <li>{{ $t('home') }}</li>
                    <li>{{ $t('about') }}</li>
                    <li>{{ $t('rooms') }}</li>
                    <li>{{ $t('contact') }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "hb-header",
    data() {
        return {
            openMenu: false
        }
    }
}
</script>

<style scoped>

</style>
