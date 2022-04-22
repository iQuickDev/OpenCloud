<template>
    <div>
        <div id="wrapper">
            <router-view />
            <DetailsPanel v-show="isToggled" @unToggled="unToggled" />
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { useStore } from 'vuex'
import DetailsPanel from './components/DetailsPanel.vue'
import { watch, ref } from 'vue'

const isToggled = ref(false)
const userData = localStorage.getItem('token')
const store = useStore()
if (userData) {
    store.commit('SET_DATA', userData)
}

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            store.dispatch('logout')
        }
        return Promise.reject(error)
    }
)

watch(store.state.isFileDetailsToggled, () => {
    isToggled.value = true
})

function unToggled() {
    isToggled.value = false
}
</script>

<style lang="sass">
@import 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap'
:root
    --menu: #42b883
    --text-color: #FFF
    --background: #202020
*
    font-family: 'Cairo', sans-serif

body
    background: var(--background)
    color: var(--text-color)
    overflow: hidden

html,
body
    margin: 0

html
    height: 100vh
</style>
