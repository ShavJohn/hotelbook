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

import emails from "../../../mixins/emails-mixins";

export default {
    name: "messages-list",
    props: {
        message: {
            required: true
        }
    },
    mixins: [emails],
}
</script>

<style scoped>

</style>
