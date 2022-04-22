<template>
    <div>
        <Header id="header" />
        <div id="main-content">
            <NavBar id="nav-bar" />
            <router-view id="views" v-slot="{ Component }">
                <transition name="route" mode="out-in">
                    <component :is="Component" :key="$route.path"></component>
                </transition>
            </router-view>
        </div>
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue'
import Header from '../components/Header.vue'

export default {
    name: 'Main',
    data() {
        return { title: 'OpenCloud' }
    },
    components: {
        Header,
        NavBar
    }
}
</script>

<style lang="sass" scoped>
#main-content
    display: flex
    flex-flow: row nowrap
    height: calc(100vh - 60px)

#header
    flex-grow: 0
    flex-basis: 100%
#nav-bar
    flex-grow: 0
#views
    flex-grow: 1
    padding: 5px
    background-size: cover
    overflow: auto

.route-enter-from
    opacity: 0
    transform: translateY(50px)

.route-enter-active
    transition: all .2s ease-out

.route-leave-to
    opacity: 0
    transform: translateY(-50px)

.route-leave-active
    transition: all .2s ease-in
</style>
