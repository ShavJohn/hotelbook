<template>
    <div class="list-element" :class="message.read ? 'read' : 'unread'" @click="updateEmailStatus(message, index)">
        <div class="mail-sender-info">
            <h4>Customer request</h4>
            <div class="mail-from-container">
                <span>from:</span>
                <p>{{ message.email }}</p>
            </div>
            <p class="mail-from-message">{{ message.message }}</p>
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
        },
        index: {
            required: true
        }
    },
    mixins: [emails],
}
</script>

<style scoped>

</style>
