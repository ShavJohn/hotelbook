<template>
    <div class="login-container">
        <div class="login-inputs">
            <div class="login-input">
                <label for="user-name">Login</label>
                <input id="user-name" type="text" name="user-name" placeholder="Enter your User Name">
                <div class="input-delimiter"></div>
            </div>
            <div class="login-input">
                <label for="password">Password</label>
                <input id="password" type="text" name="password" placeholder="Enter your Password">
                <div class="input-delimiter"></div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "Login"
}
</script>

<style scoped>

</style>
