import dva from 'dva';
import './index.css';
import browserHistory from 'history/createBrowserHistory'
import router from './router';

import commonModel from './models/commonModel';
import rootTabbarModel from './models/rootTabbarModel';
import applyInfoModel from './models/applyInfoModel';
import loginModel from './models/loginModel';
import orderModel from './models/orderModel';
import refundPlanModel from './models/refundPlanModel';

const history = browserHistory({
  // basename: 'http://localhost:8080/vi/'
})

// 1. Initialize
const app = dva({
  // history: history,
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(rootTabbarModel);
app.model(applyInfoModel);
app.model(commonModel);
app.model(loginModel);
app.model(orderModel);
app.model(refundPlanModel);

// 4. Router
app.router(router);

// 5. Start
app.start('#root');
