<template>
    <transition
        :appear="true"
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"
        name="slide"
    >
        <div id="details-panel" v-if="isToggled">
            <h1 id="header">Details</h1>
            <ul id="attributes" v-if="details">
                <li>
                    Name <span class="info">{{ details.name }}</span>
                </li>
                <li>
                    Extension
                    <span class="info">{{ details.extension }}</span>
                </li>
                <li>
                    Size <span class="info">{{ details.size }}</span>
                </li>
                <li>
                    Path <span class="info">{{ details.path }}</span>
                </li>
                <li>
                    Hash <span class="info">{{ details.hash }}</span>
                </li>
                <li v-show="details.preview">
                    Preview <img id="fileimg" :src="details.preview" />
                </li>
            </ul>
            <img @click="togglePanel" id="closepanel" :src="closepanel" />
        </div>
    </transition>
</template>
<script setup>
import closepanel from '../assets/closemenu.png'
import gsap from 'gsap'
import { useStore } from 'vuex'
import { ref, watch } from 'vue'
import Helpers from '../services/Helpers.js'
const details = ref({})
const store = useStore()
const isToggled = ref(false)
const emit = defineEmits(['unToggled'])
watch(store.state.selectedFile, async (newValue) => {
    // proxy to object
    const {
        data: { data }
    } = JSON.parse(JSON.stringify(newValue))
    details.value = await data
    details.value.extension = details.value.name.split('.').pop().toUpperCase()
    details.value.size = Helpers.stringifySize(details.value.size)
    isToggled.value = true
})
function beforeEnter(el) {
    el.style.right = '-460px'
}

function enter(el, done) {
    gsap.to(el, {
        duration: 0.3,
        right: 0,
        onComplete: done
    })
}

function beforeLeave(el) {
    el.style.right = '0px'
}

function leave(el, done) {
    gsap.to(el, {
        duration: 0.3,
        right: '-460px',
        onComplete: done
    })
}

function togglePanel() {
    emit('unToggled')
}
</script>

<style scoped lang="sass">
#header
    text-align: center
    margin: auto
#details-panel
    box-shadow: -2px 0 15px #0006
    width: 20%
    position: absolute
    top: 0px
    right: 0px
    height: calc(100vh - 40px)
    background: #FFF
    color: #000
    border-radius: 20px 0px 0px 20px
    padding: 20px

#attributes
    list-style: none
    padding: 0
    margin: 0
    font-size: 1.2em
    font-weight: 400
    color: #000
    text-align: left
    font-weight: 600
    color: #000

.info
    display: block
    font-weight: 400
    color: var(--menu)
    word-wrap: break-word

#closepanel
    position: absolute
    bottom: 15px
    left: 10px
    width: 50px
    height: 50px
    cursor: pointer
    z-index: 1
    img
        width: 50px
        height: 50px
        object-fit: cover
        margin: auto

#fileimg
    width: 75%
    display: block
    margin: 2em auto
    border: 1px solid #000


@media (max-width: 800px)
    #details-panel
        width: 20%

@media (max-width: 600px)
    #details-panel
        width: 30%

@media (max-width: 400px)
    #details-panel
        width: 40%
</style>
