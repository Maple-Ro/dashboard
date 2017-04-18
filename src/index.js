import dva from 'dva';
import './index.less';
import router from './router';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import {message} from 'antd';
import {ERROR_MSG_DURATION} from './utils/constant';
// 1. Initialize
const app = dva({
  history:browserHistory,
  onError(e){
    message.error(e.message, ERROR_MSG_DURATION);
  }
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(router);

// 5. Start
app.start('#root');
