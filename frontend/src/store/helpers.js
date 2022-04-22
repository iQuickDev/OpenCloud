import { mapState } from 'vuex'

export const isLoggedIn = {
    ...mapState(['isAuth'])
}
