<template>
    <div>
        <header>{{ title }}</header>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            title: 'OpenCloud'
        }
    }
}
</script>

<style lang="sass" scoped>
header
    background-color: var(--menu)
    color: var(--text-color)
    text-align: center
    font-size: 2.5rem
    font-weight: bold
    user-select: none
</style>
