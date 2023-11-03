<template>
    <div class="message-view-container">
        <div v-if="!Object.keys(selectedMessage).length" class="no-message-view-inner-container">
            <span>No message selected</span>
        </div>
        <div v-else class="message-view-inner-container">
            <div class="message-section" :class="!selectedMessage.reply ? 'message-section-height' : 'height-50'">
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
            <div class="reply-section" :class="!selectedMessage.reply ? 'reply-section-height' : 'height-50' ">
                <template v-if="!selectedMessage.reply">
                    <div class="mail-subject-text-container">
                        <input type="text" name="mail-subject" placeholder="Enter email subject" v-model="replyData.title">
                        <textarea name="mail-text" placeholder="Enter email text" v-model="replyData.message"></textarea>
                    </div>
                    <button @click="reply">Send</button>
                </template>
                <template v-else>
                    <div class="message-section">
                        <h4>Your Reply</h4>
                        <div class="mail-from-container">
                            <span>Subject of mail</span>
                            <span>{{ selectedMessage.reply.title }}</span>
                        </div>
                        <p>
                            {{ selectedMessage.reply.message }}
                        </p>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import emails from "../../../mixins/emails-mixins";

export default {
    name: "message-content",
    mixins: [emails],
}
</script>

<style scoped>

</style>
