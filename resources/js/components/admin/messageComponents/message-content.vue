<template>
    <div class="message-view-container">
        <div v-if="!selectedMessage" class="no-message-view-inner-container">
            <span>No message selected</span>
        </div>
        <div v-else class="message-view-inner-container">
            <div class="message-section" :class="!replied ? 'message-section-height' : 'height-100'">
                <h4>Subject of mail</h4>
                <div class="mail-from-container">
                    <span>from:</span>
                    <span>test@test.com</span>
                </div>
                <div class="mail-time-info">
                    <span>Date:</span>
                    <span>26/09/2023</span>
                </div>
                <p>
                    Certainly! Here's a randomly generated email text:

                    Subject: Exciting News!

                    Dear [Recipient's Name],

                    I hope this email finds you well. I wanted to share some exciting news with you. Over the past few months, our team has been hard at work on a new project, and I'm thrilled to announce that it's finally ready to launch.

                    This project represents a significant milestone for our company, and I believe it has the potential to make a real impact in our industry. We've put a lot of effort into it, and I can't wait to see how it's received.

                    I won't keep you in suspense any longer! Please join us for the official launch event, which will take place on [Date] at [Location/Online]. We have some special surprises in store, and I'm sure you'll be impressed with what we've accomplished.

                    In the meantime, if you have any questions or would like more information, please don't hesitate to reach out to me. I'm always here to assist in any way I can.

                    Thank you for your ongoing support, and I look forward to celebrating this exciting new venture with you.

                    Warm regards,
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
export default {
    name: "message-content",
    data() {
        return {
            replied: false,
            selectedMessage: true
        }
    }
}
</script>

<style scoped>

</style>
