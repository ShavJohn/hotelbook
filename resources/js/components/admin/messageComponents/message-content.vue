<template>
    <div class="message-view-container">
        <div v-if="!Object.keys(selectedMessage).length" class="no-message-view-inner-container">
            <span>No message selected</span>
        </div>
        <div v-else class="message-view-inner-container">
            <div class="message-section" :class="!replied ? 'message-section-height' : 'height-100'">
                <h4>Subject of mail</h4>
                <div class="mail-from-container">
                    <span>from:</span>
                    <span>{{ selectedMessage.email }}</span>
                </div>
                <div class="mail-time-info">
                    <span>Date:</span>
                    <span>{{ formatDate(selectedMessage.created_at) }}</span>
                </div>
                <p>
                    {{ selectedMessage.message }}
                </p>
            </div>
            <div class="reply-section" :class="!replied ? 'reply-section-height' : 'height-0' ">
                <template v-if="!replied">
                    <div class="mail-subject-text-container">
                        <input type="text" name="mail-subject" placeholder="Enter email subject">
                        <textarea name="mail-text" placeholder="Enter email text"></textarea>
                    </div>
                    <button>Send</button>
                </template>
                <template v-else>

                </template>
            </div>
        </div>
    </div>
</template>

<script>
import emails from "../../../mixins/emails-mixins";

export default {
    name: "message-content",
    data() {
        return {
            replied: false,
        }
    },
    mixins: [emails],
}
</script>

<style scoped>

</style>
