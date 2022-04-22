<template>
    <div
        id="context-menu"
        :style="{ top: `${posY}px`, left: `${posX}px`, display: `${showMode}` }"
    >
        <ul>
            <li v-for="(element, i) in icons" :key="i" @click="element.method">
                <img :src="element.img" />
                <h3>{{ element.text }}</h3>
            </li>
        </ul>
    </div>
</template>

<script>
import downloadIcon from '../assets/download.png'
import renameIcon from '../assets/rename.png'
import deleteIcon from '../assets/delete.png'
import detailsIcon from '../assets/details.png'
import folderIcon from '../assets/dir.png'
import Endpoints from '../services/Endpoints'

let selectedItem = null

export default {
    data() {
        return {
            icons: [
                {
                    img: downloadIcon,
                    text: 'Download',
                    alt: 'download',
                    method: () => {
                        Endpoints.download(selectedItem)
                        this.hide()
                    }
                },
                {
                    img: renameIcon,
                    text: 'Rename',
                    alt: 'rename',
                    method: () => {
                        Endpoints.rename(selectedItem)
                        this.hide()
                    }
                },
                {
                    img: deleteIcon,
                    text: 'Delete',
                    alt: 'delete',
                    method: () => {
                        Endpoints.delete(selectedItem)
                        this.hide()
                    }
                },
                {
                    img: detailsIcon,
                    text: 'Details',
                    alt: 'details',
                    method: async () => {
                        this.$store.dispatch('toggleFileDetails')
                        const file = await Endpoints.details(selectedItem)
                        this.$store.dispatch('setFile', file)
                        this.hide()
                    }
                },
                {
                    img: folderIcon,
                    text: 'New folder',
                    alt: 'New folder',
                    method: () => {
                        // TODO: create new folder
                    }
                }
            ],
            selectedItem: null,
            showMode: 'none',
            posX: 0,
            posY: 0
        }
    },
    methods: {
        show(event) {
            if (event.composedPath()[0].classList[0] === 'file') {
                event.preventDefault()
                this.posX = `${event.clientX}`
                this.posY = `${event.clientY}`
                this.showMode = 'block'
                selectedItem = event.composedPath()[0].title
                return
            }
            this.hide()
        },
        hide() {
            this.showMode = 'none'
            this.selectedItem = null
        }
    }
}
</script>

<style lang="sass" scoped>
#context-menu
    position: absolute
    top: 0
    left: 0
    background-color: #fff
    color: #000
    z-index: 100
    border-radius: 5px
    border: 1px solid #ccc
    padding: 0px 5px 0px 5px
    display: block

ul
    padding: 0px

li
    list-style: none
    cursor: pointer
    transition: background-color .25s
    border-radius: 5px
    padding: 5px
    &:hover
        background-color: #ccc

img
    width: 25px
    height: 25px
    vertical-align: middle
    margin-right: 10px
    margin-bottom: 5px

h3
    display: inline-block
    margin: 0
</style>
