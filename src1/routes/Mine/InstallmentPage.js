import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { Modal } from 'antd-mobile';
import styles from './InstallmentPage.css';
import { dateFormat } from '../../utils/common';

import InformationIcon from '../../assets/icon_information_doubt.png';
import SelectTimeNoIcon from '../../assets/icon_periodization_no.png';
import SelectTimeYesIcon from '../../assets/icon_periodization_yes.png';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const nowMonthDay = dateFormat(now, "MM月dd日")

class InstallmentPage extends Component {
  componentDidMount() {
    document.title = "分期方案";
    // console.log(this.props.match.params.orderId);
    const orderId = this.props.match.params.orderId;
    this.props.dispatch({
      type: 'orderModel/queryOrderItem',
      payload: { ordetaileid: orderId }
    }).then((data) => {
      if (data && Object.keys(data).length !== 0) {
        this.setState({
          orderDetail: data,
          firstTimeMoney: data.commercialprice * 0.09,
        })
        this.amontMoney();
      }
    })
  }
  state = {
    orderDetail: {},
    installmentModal: false,
    firstTimeMoneyModal: false,
    firstTimeMoneyWrongModal: false,
    fiveMonth: true,
    elevenMonth: false,
    firstTimeMoney: 0,
    loanAmount: 0,
    servicecost: 0,
    interest: 0,
  }
  selectFirstTimeMoney = (key) => {
    this.setState({
      fiveMonth: false,
      elevenMonth: false,
      [key]: true,
    });
    this.amontMoney();
  }
  onCloseModal = (key) => {
    this.setState({
      [key]: false,
    });
  }
  firstTimeMoneyChange = (value) => {
    this.setState({
      firstTimeMoney: value,
    })
  }
  firstTimeMoneyAdd = () => {
    const commercialprice = this.state.orderDetail.commercialprice;
    let money = this.state.firstTimeMoney + commercialprice * 0.01;
    if (money > commercialprice * 0.2) {
      money = commercialprice * 0.2;
    }
    this.setState({
      firstTimeMoney: money,
    });
    this.amontMoney();
  }
  firstTimeMoneySubtract = () => {
    const commercialprice = this.state.orderDetail.commercialprice;
    let money = this.state.firstTimeMoney - commercialprice * 0.01;
    if (money < commercialprice * 0.09) {
      money = commercialprice * 0.09;
    }
    this.setState({
      firstTimeMoney: money,
    });
    this.amontMoney();
  }
  firstTimeMoneyBlur = (value) => {
    const commercialprice = this.state.orderDetail.commercialprice;
    if (value >= commercialprice * 0.09 && value <= commercialprice * 0.2) {
      this.amontMoney();
    } else {
      this.setState({
        firstTimeMoneyWrongModal: true,
      })
    }
  }
  amontMoney = () => {
    const param = {
      commercialprice: this.state.orderDetail.commercialprice,
      loanterm: this.state.fiveMonth ? 5 : 11,
      initialcost: this.state.firstTimeMoney
    }
    this.props.dispatch({
      type: 'orderModel/amontMoney',
      payload: param
    }).then((data) => {
      if (data && Object.keys(data).length !== 0) {
        this.setState({
          interest: data.interest,    // 总利息
          loanAmount: data.loanAmount,  // 借款金额
          servicecost: data.servicecost, // 服务费
        })
      }
    })
  }
  confirmBtnClick = () => {
    if (!this.state.fiveMonth && !this.state.elevenMonth) {
      this.props.dispatch({
        type: 'commonModel/showTips',
        msg: '请选择分期期数'
      })
    }
    const param = {
      ordetaileid: this.props.match.params.orderId,
      loanterm: this.state.fiveMonth ? 5 : 11,
      initialcost: this.state.firstTimeMoney,
      interest: this.state.interest,    // 总利息
      loanAmount: this.state.loanAmount,  // 借款金额
      servicecost: this.state.servicecost, // 服务费
    }
    this.props.dispatch({
      type: 'orderModel/confirmPeriodization',
      payload: param
    })

    // 测试
    this.props.dispatch(routerRedux.push({
      pathname: `/mine/payOrder/${this.props.match.params.orderId}/${this.state.firstTimeMoney}/${12345}`
    }))
  }
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.orderMessage}>
          <div>订单信息</div>
          <div className={styles.eeeLine}></div>
          <div className={styles.detailContent}>
            <span className={styles.detailTitle}>借款人：</span>
            <span>{this.state.orderDetail.pname}</span>
          </div>
          <div className={styles.detailContent}>
            <span className={styles.detailTitle}>被保险人：</span>
            <span>{this.state.orderDetail.insurer}</span>
          </div>
          <div className={styles.detailContent}>
            <span className={styles.detailTitle}>车牌号码：</span>
            <span>{this.state.orderDetail.platenumber}</span>
          </div>
          <div className={styles.detailContent}>
            <span className={styles.detailTitle}>保险公司：</span>
            <span>{this.state.orderDetail.insurancecompany}</span>
          </div>
          <div className={styles.detailContent}>
            <span className={styles.detailTitle}>保单起始日期：</span>
            <span>{`${this.state.orderDetail.qibaodate}-${this.state.orderDetail.jiezhidate}`}</span>
          </div>
        </div>

        <div className={styles.installment}>
          <div>订单信息</div>
          <div className={styles.eeeLine}></div>
          <div className={styles.top30}>
            <span className={styles.detailTitle}>总保费</span>
            <span style={{ "color": "#F08200" }}>￥{this.state.orderDetail.commercialprice}</span>
          </div>
          <div className={styles.installmentTime}>
            <span className={styles.detailTitle}>分期期数</span>
            <div className={styles.informationIcon} onClick={() => this.setState({ installmentModal: true })}><img src={InformationIcon} alt="" /></div>
          </div>
          <div className={styles.selectTimeContent}>
            <div className={styles.selectTimeItem} onClick={() => this.selectFirstTimeMoney('fiveMonth')}>
              <span>5个月</span>
              <div className={styles.selectTimeIcon}>
                {this.state.fiveMonth ? <img src={SelectTimeYesIcon} alt="" /> : <img src={SelectTimeNoIcon} alt="" />}
              </div>
            </div>
            <div className={styles.selectTimeItem} onClick={() => this.selectFirstTimeMoney('elevenMonth')}>
              <span>11个月</span>
              <div className={styles.selectTimeIcon}>
                {this.state.elevenMonth ? <img src={SelectTimeYesIcon} alt="" /> : <img src={SelectTimeNoIcon} alt="" />}
              </div>
            </div>
          </div>
          <div className={styles.installmentTime}>
            <span className={styles.detailTitle}>首期款</span>
            <div className={styles.informationIcon} onClick={() => this.setState({ firstTimeMoneyModal: true })}><img src={InformationIcon} alt="" /></div>
          </div>
          <div className={styles.firstTimeContent}>
            <div className={styles.firstTimeMoney}>
              <div className={styles.moneyChoose} onClick={() => this.firstTimeMoneySubtract()}>-</div>
              <div className={styles.firstTimeMoneyNum}>
                <input
                  type="text"
                  className={styles.firstTimeMoneyNumInput}
                  value={this.state.firstTimeMoney}
                  onChange={(e) => this.firstTimeMoneyChange(e.target.value)}
                  onBlur={(e) => this.firstTimeMoneyBlur(e.target.value)}
                />
              </div>
              <div className={styles.moneyChoose} onClick={() => this.firstTimeMoneyAdd()}>+</div>
            </div>
            <div>{`(${nowMonthDay})`}</div>
          </div>
          <div className={styles.eeeLine}></div>
          <div className={styles.detailContent}>
            <span className={styles.detailTitle}>借款金额：</span>
            <span style={{ "fontWeight": "bold" }}>￥{this.state.loanAmount}</span>
          </div>
          <div className={styles.detailContent}>
            <span className={styles.detailTitle}>服务费：</span>
            <span style={{ "fontWeight": "bold" }}>￥{this.state.servicecost}</span>
          </div>
          <div className={styles.detailContent}>
            <span className={styles.detailTitle}>总利息：</span>
            <span style={{ "fontWeight": "bold" }}>￥{this.state.interest}</span>
          </div>
          <div className={styles.bankCardContent}>
            <div className={styles.detailTitle}>还款银行卡：</div>
            <div className={styles.bankCardContentDetail}>
              <div>{this.state.orderDetail.bankName}</div>
              <div>{this.state.orderDetail.pribankid}</div>
            </div>
          </div>
        </div>

        <div className={styles.bottomView}>
          <div className={styles.leftView}>取消分期</div>
          <div className={styles.rightView} onClick={() => this.confirmBtnClick()}>确认分期</div>
        </div>
        <Modal
          visible={this.state.installmentModal}
          transparent
          maskClosable={false}
          footer={[{ text: '我知道了', onPress: () => { this.onCloseModal('installmentModal') } }]}
        >
          分期期数包含首期。保单有效期为半年，建议选择5个月;保单期为1年，建议选择11个月
        </Modal>
        <Modal
          visible={this.state.firstTimeMoneyModal}
          transparent
          maskClosable={false}
          footer={[{ text: '我知道了', onPress: () => { this.onCloseModal('firstTimeMoneyModal') } }]}
        >
          首期款最低为保费的9%，最高为保费的20%
        </Modal>
        <Modal
          visible={this.state.firstTimeMoneyWrongModal}
          transparent
          maskClosable={false}
          footer={[{ text: '我知道了', onPress: () => { this.onCloseModal('firstTimeMoneyWrongModal') } }]}
        >
          您输入的金额不正确
        </Modal>
      </div>
    )
  }
};

InstallmentPage.propTypes = {
};

export default connect()(InstallmentPage);
