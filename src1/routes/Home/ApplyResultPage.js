import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './ApplyResultPage.css';
import { routerRedux } from 'dva/router';

import ApplySuccess from '../../assets/icon_apply_success.png';

class ApplyResultPage extends Component {

  goRootPage =()=> {
    this.props.dispatch(routerRedux.push({
      pathname: '/root'
    }))
  }
  goOrderDetail =()=> {
    this.props.dispatch(routerRedux.push({
      pathname: `/mine/myOrder/${this.props.match.params.orderId}`,
    }));
  }
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.content}>
          <div className={styles.successIcon}><img src={ApplySuccess} alt=""/></div>
          <div style={{"fontSize": "0.32rem", "marginTop": "0.2rem", "marginBottom": "0.2rem"}}>申请成功</div>
          <div className={styles.tips}>恭喜您成功申请了车险分期，请耐心等待放款</div>
          <div className={styles.tips}>短信通知~</div>
          <div className={styles.eeeLine}></div>
          <div className={styles.telephone}>
            <div>如有疑问，请拨打热线电话：</div>
            <a style={{ "textDecoration": "underline" }} href="tel:400-1011-960">400-1011-960</a>&nbsp;
          </div>
        </div>
        <div className={styles.bottomView}>
          <div className={styles.leftView} onClick={() => this.goRootPage()}>返回首页</div>
          <div className={styles.rightView} onClick={() => this.goOrderDetail()}>查看订单</div>
        </div>
      </div>
    )
  }
};

ApplyResultPage.propTypes = {
};

export default connect()(ApplyResultPage);
