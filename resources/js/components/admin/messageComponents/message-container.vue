<template>
    <div class="message-container">
       <div class="message-inner-container">
           <div id="messages-list-container" class="messages-lists" :class="displayTab === 'messages-list' ? 'open-messenger-tabs' : 'close-messenger-tab'">
               <messages-list v-for="(message, key) in messages" :message="message" :index="key" @click="toggleMessages(message, 'message-content', key)"/>
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
    watch: {
        dataFinished(val) {
            if(val === true) {
                document.getElementById('messages-list-container').removeEventListener('scroll', this.bringMoreData)
            }
        }
    },
    methods: {
        bringMoreData($event) {
            let elem = $event.target
            let scrollBottom  = elem.scrollHeight - elem.clientHeight - elem.scrollTop

            if(scrollBottom < 40) {
                this.skip += 10
                this.take += 10

                this.getEmails(this.skip, this.take)
            }
        }
    },
    mounted() {
        document.getElementById('messages-list-container').addEventListener('scroll', this.bringMoreData)
    },
    mixins: [emails],
}
</script>

<style scoped>

</style>
