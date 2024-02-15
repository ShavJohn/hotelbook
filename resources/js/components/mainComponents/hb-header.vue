<template>
    <div class="header-style">
        <div class="hb-flex hb-justify-content-between padding-large hb-align-items-center header-menu-animation">
            <div class="header-logo-styling">
                <img v-if="logo.value && logo.value.length" :src="`${imagePrefix}/${logo.value}`">
            </div>
            <ul class="header-menu color-white hide-on-large-tablet">
                <li @click="$router.push({name: 'Home'})">{{ $t('home') }}</li>
                <li @click="$router.push({name: 'RoomSearch'})">{{ $t('rooms') }}</li>
                <li @click="$router.push({name: 'About'})">{{ $t('about') }}</li>
                <li @click="$router.push({name: 'Contact'})">{{ $t('contact') }}</li>
            </ul>
            <div class="hide-on-large-tablet">
                <select id="header-choose-language-large-screen" name="header-choose-language-large-screen" class="language-dropdown" v-model="$store.state.generalSettings.localeLang" @change="changeLang()">
                    <option value="en">EN</option>
                    <option value="ru">RU</option>
                </select>
            </div>
            <font-awesome-icon @click="openMenu = !openMenu" class="header-mobile-menu-icon color-white font-30 cursor-pointer" icon="fa-solid fa-bars" />
        </div>
        <div class="header-mobile-menu-container" :class="openMenu ? 'header-mobile-menu-open' : 'header-mobile-menu-close'">
            <template v-if="openMenu">
                <div class="hb-flex hb-justify-content-end padding">
                    <font-awesome-icon @click="openMenu = !openMenu" class="color-white font-20 cursor-pointer" icon="fa-solid fa-xmark" />
                </div>
                <div class="padding">
                    <select id="header-choose-language-mobile" name="header-choose-language-mobile" class="language-dropdown" v-model="$store.state.generalSettings.localeLang" @change="changeLang()">
                        <option value="en">EN</option>
                        <option value="ru">RU</option>
                    </select>
                </div>
                <ul class="header-mobile-menu-list">
                    <li @click="$router.push({name: 'Home'})">{{ $t('home') }}</li>
                    <li @click="$router.push({name: 'RoomSearch'})">{{ $t('rooms') }}</li>
                    <li @click="$router.push({name: 'About'})">{{ $t('about') }}</li>
                    <li @click="$router.push({name: 'Contact'})">{{ $t('contact') }}</li>
                </ul>
            </template>
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
    },
    computed: {
        logo() {
            return this.$store.getters['generalSettings/logo']
        },
        imagePrefix() {
            return window.imagePrefix
        }
    },
    methods: {
        changeLang() {
          this.$Progress.start()
          this.$i18n.locale = this.localeLang

          localStorage.setItem('lang', this.localeLang)
          this.$Progress.finish()
        }
    },
    mounted() {
        let appBody = document.getElementById('app-body')
        appBody.addEventListener('click', () => {
            this.openMenu = false
        })
    }
}
</script>

<style scoped>

</style>
