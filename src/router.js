import React from "react";
import PropTypes from 'prop-types';
import {Router} from "dva/router";
const cached = {};
function registerModel(app, model) {
  if(!cached[model.namespace]){
    app.model(model);
    cached[model.namespace]=1;
  }
}

function Routers({history, app}) {
  const handleChildRoute = ({location,params,routes})=>{
    console.log(location,params, routes);
  }
  const routes = [
    {
      path:'/',
      component:App,
      getIndexRoute(nextState,callback){
        require.ensure([], (require)=>{
          registerModel(app, require('./models/dashboard'));
          callback(null, {component:require('')})
        },'dashboard')
      },
      childRoutes: [
        {
          path:'dashboard',
          getComponent(nextState, callback){
            require.ensure([], require=>{
              registerModel(app, require('./models/dashboard'))
              callback(null, require('./routes/dashboard'))
            }, 'dashboard')
          },
        },
        {
         path:'article',
          getComponent(nextState, callback){
           require.ensure([], require=>{
             registerModel(app, require('./models/article'))
             callback(null, require('./routes/article'))
           },'article')
          },
        },
      ]
    },
  ];
routes[0].childRoutes.map(item=>{
  item.onEnter = handleChildRoute;
  return item;
})
  return (
    <Router history={history} routes={routes}/>
  )
}
Router.propTypes={
  history:PropTypes.object,
  app:PropTypes.object,
}

export default Routers;
