<template>
    <div class="message-container">
       <div class="message-inner-container">
           <div class="messages-lists">
               <messages-list v-for="list in 7"/>
           </div>
           <div class="message-content">
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
    components: {MessageContent, MessagesList}
}
</script>

<style scoped>

</style>
