<template>
    <div class="padding-90 padding-very-large-tablet">
        <about-us-post/>
        <rooms-list/>
    </div>
</template>

<script>
import AboutUsPost from "./post-components/about-us-post";
import RoomsList from "./post-components/rooms-list";
export default {
    name: "home-posts",
    components: {RoomsList, AboutUsPost}
}
</script>
