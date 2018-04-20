import {handleDate} from '../../common/js/utils'

const state = {
  main: 0,
  arrFlight: [],
  closeFlight: [],
  dutyUsers: [],
  showSearch: true,
  showClose: false,
  showNew: false,
  fltDate: handleDate(new Date(), '-'),
  exportPlanes: [],
  planeDate: '',
  username: '',
  password: ''
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  SET_SHOW_SEARCH (state, searchBox) {
    state.showSearch = searchBox
  },
  SET_SHOW_CLOSE (state, closeFlight) {
    state.showClose = closeFlight
  },
  SET_FLT_DATE (state, fltDate) {
    state.fltDate = fltDate
  },
  SET_DUTY_USER (state, dutyUsers) {
    state.dutyUsers = dutyUsers
  },
  SET_ARR_FLIGHT (state, arrFlight) {
    state.arrFlight = arrFlight
  },
  SET_CLOSE_FLIGHT (state, closeFlight) {
    state.closeFlight = closeFlight
  },
  SET_EXPORT_PLANE (state, exportPlanes) {
    state.exportPlanes = exportPlanes
  },
  SET_PLANE_DATE (state, planeDate) {
    state.planeDate = planeDate
  },
  SET_SHOW_NEW (state, showNew) {
    state.showNew = showNew
  },
  SET_USERNAME (state, username) {
    localStorage.username = username
    state.username = username
  },
  SET_PASSWORD (state, password) {
    localStorage.password = password
    state.password = password
  }
}

const getters = {
  showSearch: state => state.showSearch,
  showClose: state => state.showClose,
  showNew: state => state.showNew,
  fltDate: state => state.fltDate,
  dutyUsers: state => state.dutyUsers,
  arrFlight: state => state.arrFlight,
  exportPlanes: state => state.exportPlanes,
  planeDate: state => state.planeDate,
  closeFlight: state => state.closeFlight,
  username: state => state.username,
  password: state => state.password
}

const actions = {
  someAsyncTask ({commit}) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
