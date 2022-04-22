import { createStore } from 'vuex'
import axios from 'axios'
import Endpoints from '../services/Endpoints'

export default createStore({
    state: {
        isAuth: false,
        selectedFile: {},
        isFileDetailsToggled: [],
        fileUploaded: []
    },
    mutations: {
        SET_DATA(state, userData) {
            localStorage.setItem('token', userData)
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${localStorage.getItem('token')}`
        },
        LOGOUT(state) {
            localStorage.removeItem('token')
            location.reload()
        },
        SET_SELECTED_FILE(state, file) {
            state.selectedFile.data = file
        },
        TOGGLE_FILE_DETAILS(state) {
            if (!state.isFileDetailsToggled.length) {
                state.isFileDetailsToggled.push(1)
            } else {
                state.isFileDetailsToggled.pop()
            }
        },
        FILE_UPLOADED(state) {
            if (!state.fileUploaded.length) {
                state.fileUploaded.push(1)
            } else {
                state.fileUploaded.pop()
            }
        }
    },
    actions: {
        async login({ commit }, credentials) {
            // ma direi molto
            try {
                const {
                    data: { token }
                } = await Endpoints.login(credentials)
                if (typeof token === 'string') {
                    commit('SET_DATA', token)
                    return false
                } else {
                    throw new Error('Login failed')
                }
            } catch (e) {
                return true
            }
        },
        logout({ commit }) {
            commit('LOGOUT')
        },
        setFile({ commit }, file) {
            commit('SET_SELECTED_FILE', file)
        },
        toggleFileDetails({ commit }) {
            commit('TOGGLE_FILE_DETAILS')
        },
        fileUploaded({ commit }) {
            commit('FILE_UPLOADED')
        }
    }
})
