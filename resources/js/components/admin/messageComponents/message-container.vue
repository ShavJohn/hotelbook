<template>
    <div class="message-container">
       <div class="message-inner-container">
           <div class="messages-lists" @click="displayTab = 'message-content'" :class="displayTab === 'messages-list' ? 'open-messenger-tabs' : 'close-messenger-tab'">
               <messages-list v-for="list in 7"/>
           </div>
           <div class="message-content" @click="displayTab = 'messages-list'" :class="displayTab === 'message-content' ? 'open-messenger-tabs' : 'close-messenger-tab'">
               <font-awesome-icon icon="fa-solid fa-arrow-left" class="show-on-ipad" />
               <message-content/>
           </div>
       </div>
    </div>
</template>

<script>
import MessagesList from "./messages-list";
import MessageContent from "./message-content";
export default {
    name: "message-container",
    components: {MessageContent, MessagesList},
    data() {
        return {
            displayTab: 'messages-list'
        }
    }
}
</script>

<style scoped>

</style>
