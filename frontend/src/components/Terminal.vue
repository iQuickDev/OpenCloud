<template>
    <div class="terminal-wrapper">
        <textarea id="terminal" readonly>
Howdy, {{ username }}. Welcome to the shell! :)&#10;</textarea
        >
        <input
            id="command"
            placeholder="Type your commands here"
            type="text"
            v-model="command"
            @keyup.enter="exec(command)"
        />
    </div>
</template>

<script setup>
import Endpoints from '../services/Endpoints'
let workingDir = ''

async function exec(cmd) {
    let output = null
    if (cmd == 'clear') clear()
    else if (cmd.substring(0, 2) == 'cd') {
        try {
            output = await (
                await Endpoints.runShellCommand(cmd, workingDir)
            ).data
            workingDir += `${cmd.substring(3)}/`
            console.log(workingDir)
        } catch (error) {
            output = 'Directory not found\n'
        }
    } else {
        try {
            output = await (
                await Endpoints.runShellCommand(cmd, workingDir)
            ).data
        } catch (error) {
            output = 'Command not found\n'
        }
    }
    appendOutput(`\n${output}`)
    document.querySelector('#terminal').scrollTop =
        document.querySelector('#terminal').scrollHeight
    document.querySelector('#command').value = ''
}

function appendOutput(output) {
    document.querySelector('#terminal').value += `${output}`
}

function clear() {
    document.querySelector('#terminal').value = ''
}
</script>

<style lang="sass" scoped>
#terminal
    background: #000
    color: #fff
    border: none
    font-family: monospace
    font-size: 1.2em
    width: 100%
    height: 95%
    margin: auto
    border-top-left-radius: 10px
    border-top-right-radius: 10px
    padding: 5px
    outline: none
    resize: none
    scroll-behavior: smooth
    &::-webkit-scrollbar
        width: 0px
        background: transparent
    &::-webkit-scrollbar-thumb
        background: #FF0000

#command
    display: block
    background: #000
    color: #fff
    border: none
    font-family: monospace
    font-size: 1.2em
    width: 100%
    height: 5%
    outline: none
    padding: 5px
    border-bottom-left-radius: 10px
    border-bottom-right-radius: 10px
    margin: none

.terminal-wrapper
    width: 80%
    height: 80%
    margin: auto
    margin-top: 3%
</style>
