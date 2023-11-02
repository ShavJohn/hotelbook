<template>
    <div class="message-container">
       <div class="message-inner-container">
           <div class="messages-lists" :class="displayTab === 'messages-list' ? 'open-messenger-tabs' : 'close-messenger-tab'">
               <messages-list v-for="message in messages" :message="message" @click="toggleMessages(message, 'message-content')"/>
           </div>
           <div class="message-content" :class="displayTab === 'message-content' ? 'open-messenger-tabs' : 'close-messenger-tab'">
               <font-awesome-icon icon="fa-solid fa-arrow-left" class="show-on-ipad" @click="toggleMessages({}, 'messages-list')" />
               <message-content/>
           </div>
       </div>
    </div>
</template>

<script>
import MessagesList from "./messages-list";
import MessageContent from "./message-content";
import emails from "../../../mixins/emails-mixins";
export default {
    name: "message-container",
    components: {MessageContent, MessagesList},
    mounted() {
        this.getEmails(this.skip, this.take)
    },
    mixins: [emails],
}
</script>

<style scoped>

</style>
