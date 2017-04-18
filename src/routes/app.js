import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Login from './login';
import {Spin } from 'antd';
import {Helmet} from 'react-helmet';
import '../components/skin.less';

const App = ({children, location,dispatch,app, loading})=>{
const {login, loginButtonLoading, user, sideFold, darkTheme, isNavbar, menuPopoverVisible} = app;
  const loginProps = {
    loading,
    loginButtonLoading,
    onOk(data){
      dispatch({type:'app/login', payload:data})
    },
  }

  const headerProps = {
    user,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
  }
}

App.propTypes = {
  children:PropTypes.element.isRequired,
  location:PropTypes.object,
  dispatch:PropTypes.func,
  app:PropTypes.object,
  loading:PropTypes.bool,
}
export default connect(({app, loading})=>({app,loading:loading.models.app}))(App)
