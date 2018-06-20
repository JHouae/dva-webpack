import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './PayOrderPage.css';
import { Switch } from 'antd-mobile';
import { routerRedux } from 'dva/router'

import AddressIcon from '../../assets/icon_all_address.png';

class PayOrderPage extends Component {
  componentDidMount() {
    document.title = "支付";
    // console.log(this.props.match.params);
    
  }
  state = {
    invoiceChecked: true,
    payData: null,
  }

  invoiceCheckedChanged = (checked) => {
    this.setState({
      invoiceChecked: checked
    })
  }

  payOrderBtnClick = () => {
    this.props.dispatch(routerRedux.push({
      pathname: `/mine/applyResult/${this.props.match.params.orderId}`
    }));
    return;
    const param = {
      ordetaileid: this.props.match.params.orderId,
      money: parseFloat(this.props.match.params.firstMoney) + parseFloat(this.props.match.params.serverMoney),
    };
    this.props.dispatch({
      type: 'orderModel/getPaymentOrder',
      payload: param
    }).then((data) => {
      if (data && Object.keys(data).length !== 0) {

        if (typeof WeixinJSBridge === "undefined") {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
          }
        } else {
          this.onBridgeReady();
        }
      }
    })
  }

  onBridgeReady=()=> {
    WeixinJSBridge.invoke( // eslint-disable-line
      'getBrandWCPayRequest', {
        "appId": this.state.payData.appId,     //公众号名称，由商户传入     
        "timeStamp": this.state.payData.timestamp,         //时间戳，自1970年以来的秒数     
        "nonceStr": this.state.payData.nonceStr, //随机串     
        "package": this.state.payData.package,
        "signType": this.state.payData.signType,         //微信签名方式：     
        "paySign": this.state.payData.paySign //微信签名 
      },
      function (res) {
        if (res.err_msg === "get_brand_wcpay_request:ok") { 
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
          this.props.dispatch(routerRedux.push({
            pathname: `/mine/applyResult/${this.props.match.params.orderId}`
          }));
          this.props.dispatch({
            type: 'orderModel/addRepaymentrecordByOidAndDate',
            payload: {ordetaileid: this.props.match.params.orderId}
          })
        }     
      }
    );
  }

  render() {
    const firstMoney = parseFloat(this.props.match.params.firstMoney);
    const serverMoney = parseFloat(this.props.match.params.serverMoney);
    const totalMoney = firstMoney + serverMoney;
    return (
      <div className={styles.normal}>
        <div className={styles.payContent}>
          <div>订单需支付</div>
          <div className={styles.eeeLine}></div>
          <div className={`${styles.payContentItem} ${styles.top30}`}>
            <span style={{ "color": "#666666" }}>首期款</span>
            <span style={{ "marginRight": "0.2rem", "fontWeight": "bold" }}>{firstMoney}</span>
          </div>
          <div className={`${styles.payContentItem} ${styles.top20}`}>
            <span style={{ "color": "#666666" }}>服务费</span>
            <span style={{ "marginRight": "0.2rem", "fontWeight": "bold" }}>{serverMoney}</span>
          </div>
          <div className={`${styles.payContentItem} ${styles.top20}`}>
            <span style={{ "color": "#666666" }}>合计</span>
            <span style={{ "marginRight": "0.2rem", "color": "#F08200", "fontWeight": "bold" }}>{totalMoney}</span>
          </div>
        </div>
        <div style={{ "marginRight": "0.2rem", "color": "#999999", "marginTop": "0.4rem" }}>注：如需发票，请联系客服</div>
        {/* <div className={styles.invoice}>
          <div className={styles.invoiceTitle}>
            <span>是否需要发票</span>
            <Switch
              style={{ "marginRight": "0.2rem", "marginBottom": "0.1rem" }}
              checked={this.state.invoiceChecked}
              onChange={(checked) => { this.invoiceCheckedChanged(checked) }}
            />
          </div>
          {
            this.state.invoiceChecked ?
              <div>
                <div className={styles.eeeLineTop10}></div>
                <div className={`${styles.top30} ${styles.invoiceDetailTitle}`}>发票抬头</div>
                <input className={styles.top20} type="text" placeholder="请输入" />
                <div className={styles.eeeLineTop10} style={{ "marginTop": "0.1rem" }}></div>
                <div className={`${styles.top30} ${styles.invoiceDetailTitle}`}>收件地址</div>
                <div className={styles.addressDetail}>
                  <div className={styles.addressIcon}><img src={AddressIcon} alt="" /></div>
                  <input className={styles.top20} style={{ "marginBottom": "0.1rem" }} type="text" placeholder="请输入收货地址" />
                </div>
              </div>
              : null
          }
        </div> */}
        <div className={styles.bottomBtn} onClick={() => this.payOrderBtnClick()}>
          支付
        </div>
      </div>
    )
  }
};

PayOrderPage.propTypes = {
};

export default connect()(PayOrderPage);
