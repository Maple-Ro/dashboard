import {login, info, logout} from '../services/app';
import parse from 'qs';
export default {
  namespace:'app',
  state:{
    login:false,
    user:{
      name:'liutsing'
    },
    loginButtonLoading:false,
    menuPopoverVisible:false,
    siderFold:localStorage.getItem('adminSiderFold') === 'true',
    darkTheme:localStorage.getItem('adminDarkTheme')!=='false',
    isNavbar:document.body.clientWidth<769,
    navOpenKeys:[],
    permission:{
      dashboard:{
        text:'Dashboard',
        route:'dashboard',
      },
      article:{
        text:'Article Manage',
        route:'article'
      },
    },
    userPermissions:[],
  },
  subscriptions:{
    setup({dispatch}){
      dispatch({
        type:'queryUser'
      })
      window.onresize = ()=>{
        dispatch({type:'changeNavbar'})
      }
    },
  },
  effects:{
    *login({payload}, {call, put}){
      yield put({type:'showLoginButtonLoading'})
      const {success, userPermissions, username} = yield call(login, parse(payload))
      if(success){
        yield put({
          type:'loginSuccess',
          payload:{
            userPermissions,
            user:{
              name:username
            }
          }
        })
      }else{
        yield put({
          type:'loginFail',
        })
      }
    },
    *queryUser({payload}, {call, put}){
      const data = yield call(logout, parse(payload))
      if(data.success){
        yield put({type:'logoutSuccess'})
      }
    },
    *switchSider({payload}, {put}){
      yield put({type:'handleSwitchSider'})
    },
    *changeTheme({payload}, {put}){
      yield put({type:'handleChangeTheme'})
    },
    *changeNavbar({payload},{put}){
      if(document.body.clientWidth<769){
        yield put({type:'showNavbar'})
      }else{
        yield put({type:'hideNavbar'})
      }
    },
    *switchMenuPopver({payload}, {put}){
      yield put({type:'handleSwitchMenuPopver'})
    },
  },
  reducers:{
    loginSuccess(state, action){
      return {
        ...state,
        ...action.payload,
        login:true,
        loginButtonLoading:false,
      }
    },
    logoutSuccess(state){
      return {
        ...state,
        login:false,
        loginButtonLoading:false,
      }
    },
    loginFail(state){
      return {
        ...state,
        login:false,
        loginButtonLoading:false,
      }
    },
    showLoginButtonLoading(state){
      return {
        ...state,
        loginButtonLoading:true,
      }
    },
    handleSwitchSider(state){
      localStorage.setItem('adminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold:!state.siderFold,
      }
    },
    handleChangeTheme(state){
      localStorage.setItem('adminDarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme:!state.darkTheme,
      }
    },
    showNavbar(state){
      return {
        ...state,
        isNavbar:true
      }
    },
    hideNavbar(state){
      return {
        ...state,
        isNavbar:false
      }
    },
    handleSwitchMenuPopver(state){
      return {
        ...state,
        menuPopoverVisible:!state.menuPopoverVisible,
      }
    },
    handleNavOpenKeys(state, action){
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
