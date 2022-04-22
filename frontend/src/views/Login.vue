<template>
    <div id="wrapper">
        <video id="bgvideo" disablePictureInPicture autoplay loop muted>
            <source src="../assets/tunnel.mp4" type="video/mp4" />
        </video>
        <div id="intern-wrapper">
            <h1 id="title">{{ title }}</h1>
            <h3 id="subtitle">Authentication</h3>
            <div class="spacer"></div>
            <form @submit.prevent="login">
                <label for="name">Username</label>
                <input
                    placeholder="Username"
                    id="name"
                    type="text"
                    v-model="username"
                />
                <label for="password">Password</label>
                <input
                    placeholder="Password"
                    id="password"
                    type="password"
                    v-model="password"
                />
                <button type="submit">Login</button>
            </form>
            <div class="spacer2"></div>
            <LoginError v-if="error" />
        </div>
    </div>
</template>

<script>
import LoginError from '../components/LoginError.vue'

export default {
    name: 'Login',
    data() {
        return {
            title: 'OpenCloud',
            username: '',
            password: '',
            error: false
        }
    },
    methods: {
        async login() {
            try {
                const error = await this.$store.dispatch('login', {
                    username: this.username.trim(),
                    password: this.password
                })

                if (!error) {
                    this.$router.push({ name: 'Dashboard' })
                } else {
                    this.error = error
                    this.$router.push({ name: 'Login' })
                }

                this.username = ''
                this.password = ''
            } catch (e) {
                console.log(e)
            }
        }
    },
    components: {
        LoginError
    }
}
</script>

<style lang="sass" scoped>

#title
    font-size: 2.8em
    font-weight: 900
    letter-spacing: 2px
    color: #fff
    text-shadow: 0 0 10px #000
    text-align: center
    margin: 0

#subtitle
    margin-top: -50px
    font-size: 1.2em
    font-weight: 400
    letter-spacing: 1px
    color: #fff
    text-shadow: 0 0 10px #000
    text-align: center

.spacer
    height: 25%

.spacer2
    height: 10%

#bgvideo
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    object-fit: cover
    z-index: 0

#wrapper
    background-image: url('../assets/tempbg.jpg')
    background-size: cover
    display: flex
    height: 100vh

#intern-wrapper
    z-index: 1
    height: 100%
    width: 540px
    background: #FFA0
    backdrop-filter: blur(5px)
    -webkit-backdrop-filter: blur(5px)
    border-right: 1px solid rgba(255, 255, 255, 0.18)
    box-sizing: border-box
    padding-left: 125px
    padding-right: 125px

    h1,
    h3
        margin: 0

form
    display: flex
    padding: 1rem
    flex-flow: column nowrap

    label
        font-weight: bold
        text-align: center
        padding: 0px
        margin: 20px 0px 5px 0px
        font-size: 1.1rem

    input
        border-radius: 8px
        border: 2px solid #405cf5
        padding-left: 0.5rem
        outline: none
        background: transparent
        color: #FFF

        &:focus
            box-shadow: 0 0 0 1px #405cf5

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active
        color: #000
        -webkit-box-shadow: 0 0 0 100px #CCC inset !important

    button
        backface-visibility: hidden
        background-color: #405cf5
        border-radius: 6px
        border-width: 0
        box-sizing: border-box
        color: #fff
        cursor: pointer
        font-size: 1.2rem
        font-weight: bold
        height: 44px
        margin: 50px 0 0
        outline: none
        overflow: hidden
        padding: 0 25px
        text-align: center
        transition: all .15s
        width: 100%

        &:hover
            box-shadow: #405cf5 0px 0px 5px 1px

        &:disabled
            cursor: default

@media (max-width: 600px)
    #intern-wrapper
        width: 100%
        padding: 10px
        z-index: 1
        background: #FFA0
        backdrop-filter: blur(1px)
        -webkit-backdrop-filter: none
        border: none
        box-sizing: border-box

        h1,
        h3
            margin: 0

    .spacer
        height: 10%

    label
        text-shadow: 1px 1px 5px #000

    input::-webkit-input-placeholder
        color: #fff
        text-shadow: 0px 0px 5px #000
</style>
cons
