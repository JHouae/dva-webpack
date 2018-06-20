import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './LoginPage.css';

import yrbIcon from '../assets/pic_login_logo.png';

class LoginPage extends Component {
  componentDidMount() {
    document.title = "绑定手机号";
  }
  state = {
    phone: null,
    verificationCode: null,
  }
  saveInfo = (payload) => {
    this.setState(payload);
  }
  sendVerificationCode = () => {
    this.props.dispatch({
      type: 'loginModel/phoneIsExit',
      payload: { phone: this.state.phone }
    })
  }
  bindPhone = () => {
    this.props.dispatch({
      type: 'loginModel/addUserPhone',
      payload: { phone: this.state.phone, yzm: this.state.verificationCode }
    })
  }
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.yrbIcon}>
          <img src={yrbIcon} alt="" />
        </div>
        <div className={styles.inputArea}>
          <div className={styles.phone}>
            <input type="text" placeholder="请输入手机号" onChange={(e) => this.saveInfo({ phone: e.target.value })} />
          </div>
          <div className={styles.eeeLine}></div>
          <div className={styles.password}>
            <input type="text" placeholder="请输入验证码" onChange={(e) => this.saveInfo({ verificationCode: e.target.value })} />
            <div
              className={styles.forgetPassword}
              disabled={this.props.veriCodeCountDown !== 0}
              onClick={() => this.sendVerificationCode()}
            >
              {this.props.veriCodeCountDown === 0 ? '发送验证码' : `${this.props.veriCodeCountDown}s重新获取`}
            </div>
          </div>
        </div>
        <div className={styles.loginBtn} onClick={() => this.bindPhone()}>
          绑定手机号
        </div>
      </div>
    )
  }
};

LoginPage.propTypes = {
};

function mapStateToProps(state) {
  return {
    veriCodeCountDown: state.loginModel.veriCodeCountDown,
  };
}

export default connect(mapStateToProps)(LoginPage);
