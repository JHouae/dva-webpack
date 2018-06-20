import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './CommitApplyResultPage.css';
import { routerRedux } from 'dva/router'

import ApplySuccess from '../../assets/icon_apply_success.png';

class CommitApplyResultPage extends Component {
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
          <div className={styles.successIcon}><img src={ApplySuccess} alt="" /></div>
          <div style={{ "fontSize": "0.32rem", "marginTop": "0.2rem", "marginBottom": "0.1rem" }}>提交申请成功</div>
          <div className={styles.tips}>您的订单正在审核中，请耐心等待短信通知~</div>
          <div className={styles.eeeLine}></div>
          <div className={styles.telephone}>
            <div className={styles.telephoneContent}>
              <div>如有疑问，请下载：</div>
              <a style={{ "textDecoration": "underline" }} href="">操作手册</a>&nbsp;<br />
            </div>
            <div className={styles.telephoneContent}>
              <div>拨打热线电话：</div>
              <a style={{ "textDecoration": "underline" }} href="tel:400-1011-960">400-1011-960</a>&nbsp;<br />
            </div>
          </div>
        </div>
        <div className={styles.bottomView}>
          <div className={styles.leftView} onClick={() => this.goRootPage()}>返回首页</div>
          <div className={styles.rightView} onClick={() => { this.goOrderDetail() }}>查看订单</div>
        </div>
      </div>
    )
  }
};

CommitApplyResultPage.propTypes = {
};

export default connect()(CommitApplyResultPage);
