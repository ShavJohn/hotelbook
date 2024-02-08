export default {
    data() {
        return {

        }
    },
    computed: {
        topRooms() {
            return this.$store.getters['aboutUs/getTopRooms']
        },
        services() {
            return this.$store.getters['aboutUs/getServices']
        },
        features() {
            return this.$store.getters['aboutUs/getFeatures']
        },
        aboutUsContent() {
            return this.$store.getters['aboutUs/getAboutUsContent']
        }
    },
    methods: {
        getAllData() {
            this.$store.dispatch('aboutUs/getAllData')
        }
    }
}
