<template>
    <div class="login-page-container" style="background-image: url('https://wallpapers.com/images/featured/sdr508awonqxixqe.jpg')">
        <div class="login-inputs-container">
            <div class="login-inputs">
                <div class="login-logo-container">
                    <img class="login-logo" src="http://www.nicdarkthemes.com/themes/hotel-inn/wp/demo/inn-suites/wp-content/uploads/sites/2/2022/01/logo-motela.png">
                </div>
                <h2>Welcome To Reception</h2>
                <div class="login-input">
                    <label for="user-name">Login</label>
                    <input id="user-name" type="text" name="user-name" placeholder="Enter your User Name" v-model="loginData.email">
                    <div class="input-delimiter"></div>
                </div>
                <div class="login-input">
                    <label for="password">Password</label>
                    <input id="password" type="password" name="password" placeholder="Enter your Password" v-model="loginData.password">
                    <div class="input-delimiter"></div>
                </div>
                <button class="login-btn" @click="login()">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            loginData: {
                email: '',
                password: ''
            },
        }
    },
    methods: {
        login() {
            this.$store.dispatch('auth/login', this.loginData).then(res => {
                if(res.data.success){
                    this.$router.push({name: 'Home'})
                }

                this.$store.dispatch('alert/alertResponse', {
                    'type': res.data.type,
                    'status': res.status,
                    'message': res.data.message
                })
            }).catch(err => {
                this.$store.dispatch('alert/alertResponse', {
                    'type': err.data.type,
                    'status': err.status,
                    'message': err.data.message
                })
            })
        }
    }
}
</script>

<style scoped>

</style>
