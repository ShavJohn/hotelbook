<template>
    <div class="list-element">
        <div class="mail-sender-info">
            <h4>Customer request</h4>
            <div class="mail-from-container">
                <span>from:</span>
                <span>{{ message.email }}</span>
            </div>
            <span>{{ message.message }}</span>
        </div>
        <div class="mail-date">
            <span>{{  formatDate(message.created_at) }}</span>
        </div>
    </div>
</template>

<script>

export default {
    name: "messages-list",
    props: {
        message: {
            required: true
        }
    },
    methods: {
        formatDate(date) {
            return moment(date).format('MM/DD/YYYY hh:mm')
        }
    }
}
</script>

<style scoped>

</style>
