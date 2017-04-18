import React from "react";
import PropTypes from 'prop-types';
import {Button,Input,Row, Form} from 'antd';
import config from '../../utils/config';
import styles from './index.less';
const FormItem = Form.Item;
const login =({loginButtonLoading,
                onOk,
                form:{
                  getFiledDecorator,
                  validateFieldsAndScroll,
                },
              })=>{
  function handleOk() {
    validateFieldsAndScroll((errors,values)=>{
      if(errors){
        return
      }
      onOk(values);
    })
  }
 return (
   <div className={styles.form}>
        <div className={styles.logo}>
          <img alt={config.logoText} src={config.logoSrc} />
          <span>Ant Design</span>
        </div>
     <Form>
       <FormItem hasFeedback>
         {getFiledDecorator('username', {
           rules:[
             {
               required:true,
               message:'username is required!',
             },
           ],
         })(<Input size="large" onpressenter={handleOk} placeholder="username"/>)}
       </FormItem>
       <FormItem hasFeedback>
         {getFiledDecorator('password', {
           rules:[
             {
               required:true,
               message:'password is required!',
             },
           ],
         })(<Input size="large" type="password" onpressenter={handleOk} placeholder="password"/>)}
       </FormItem>
       <Row>
         <Button type="primary" size="large" onClick={handleOk} loading={loginButtonLoading}>Login</Button>
       </Row>
     </Form>
   </div>
 )
};
login.propTypes = {
  form:PropTypes.object,
  loginButtonLoading:PropTypes.bool,
  onOk:PropTypes.func,
}
export default Form.create()(login);
