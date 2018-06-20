import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import URI from 'urijs';

import LoginPage from './routes/LoginPage';

import RootTabbarPage from './routes/RootTabbarPage';
// 分期
import ApplyInfoPage from './routes/Home/ApplyInfoPage';
import BorrowerListPage from './routes/Home/BorrowerListPage';
import BorrowerInfo from './routes/Home/BorrowerInfo';
import CarBaseInfo from './routes/Home/CarBaseInfo';
import ApplyResultPage from './routes/Home/ApplyResultPage';
import CommitApplyResultPage from './routes/Home/CommitApplyResultPage';
// 个人中心
import ContactUsPage from './routes/Mine/ContactUsPage';
import InvitePage from './routes/Mine/InvitePage';
import VIQAPage from './routes/Mine/VIQAPage';
import MyOrderPage from './routes/Mine/MyOrderPage';
import OrderStatusPage from './routes/Mine/OrderStatusPage';
import RefundPlanPage from './routes/Mine/RefundPlanPage';
import PayOrderPage from './routes/Mine/PayOrderPage';
import InstallmentPage from './routes/Mine/InstallmentPage';


function RouterConfig({ history }) {

  const generateGetCodeUrl = () => {
    return new URI("https://open.weixin.qq.com/connect/oauth2/authorize")
      .addQuery("appid", "wxa8de75c0acb84631")
      .addQuery("redirect_uri", "http://59d0ea3c.ngrok.io/root")
      .addQuery("response_type", "code")
      .addQuery("scope", "snsapi_userinfo")
      .addQuery("state", "123")
      .hash("wechat_redirect")
      .toString();
  };

  const wechatAuth = (nextState, replace, next) => {
    const uri = new URI(document.location.href);
    const query = uri.query(true);
    const { code } = query;
    if (code) {

    } else {
      document.location = generateGetCodeUrl(document.location.href);
    }
    // console.log(generateGetCodeUrl());
    
  }
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/" exact onEnter={wechatAuth} /> */}
        <Route path="/root" component={RootTabbarPage} />
        <Route path="/installment/applyInfo" component={ApplyInfoPage}></Route>
        <Route path="/installment/borrowerList" component={BorrowerListPage}></Route>
        <Route path="/installment/borrowerInfo" component={BorrowerInfo}></Route>
        <Route path="/installment/addCarInfo" component={CarBaseInfo}></Route>
        <Route path="/installment/commitAppltResult" component={CommitApplyResultPage}></Route>

        <Route path="/mine/myOrder" exact component={MyOrderPage} />
        <Route path="/mine/myOrder/:orderId" component={OrderStatusPage} />
        <Route path="/mine/refundPlan" component={RefundPlanPage} />
        <Route path="/mine/contactUs" component={ContactUsPage} />
        <Route path="/mine/invite" component={InvitePage} />
        <Route path="/mine/viqa" component={VIQAPage} />
        <Route path="/mine/payOrder/:orderId/:firstMoney/:serverMoney" component={PayOrderPage} />
        <Route path="/mine/installment/:orderId" component={InstallmentPage} />
        <Route path="/mine/applyResult/:orderId" component={ApplyResultPage}></Route>

        <Route path="/login" component={LoginPage} />

      </Switch>
    </Router>
  );
}

export default RouterConfig;
