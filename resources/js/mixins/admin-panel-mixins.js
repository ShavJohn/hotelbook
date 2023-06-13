export default {
    data() {
        return {

        }
    },
    computed: {
        openAdminSidebar() {
            return this.$store.getters['adminPanel/openAdminSidebarGetter']
        }
    },
    methods: {
        toggleSidebar() {
            this.$store.state.adminPanel.openAdminSidebar = !this.$store.state.adminPanel.openAdminSidebar
        }
    },
    mounted() {
        let appBody = document.getElementById('app-body')
        appBody.addEventListener('click', () => {
            this.$store.state.adminPanel.openAdminSidebar = false
        })
    }
}
