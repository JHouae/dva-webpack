import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './OrderStatusPage.css';

class OrderStatusPage extends Component {
  componentDidMount() {
    // console.log(this.props.match.params.orderId);
    const orderId = this.props.match.params.orderId;
    this.props.dispatch({
      type: 'orderModel/queryOrderItem',
      payload: { ordetaileid: orderId }
    }).then((data) => {
      if (data && Object.keys(data).length !== 0) {
        this.setState({
          orderDetail: data
        })
      }
    })
  }
  state = {
    orderDetail: {}
  }
  statusTitle = (status) => {
    switch (status) {
      case 0:
        return "申请中";
      case 1:
        return "审核中";
      case 2:
        return "待付款";
      case 3:
        return "待放款";
      case 4:
        return "已完成";
      case 5:
        return "已取消";
      default:
    }
  }

  refundTitle = (status) => {
    switch (status) {
      case 0:
        return "已还款";
      case 1:
        return "待还款";
      case 2:
        return "逾期";
      default:
    }
  }

  renderBottomView = (status) => {
    switch (status) {
      case 3:
        return (
          <div className={styles.bottomBtn}>
            重新下单
          </div>
        );
      case 1:
        return (
          <div className={styles.bottomBtn}>
            取消订单
          </div>
        );
      default: return (<div></div>);
    }
  }

  renderRefundDetail = (status) => {
    return (
      <div className={styles.refundDetail}>
        <div style={{ "marginTop": "0.4rem", "marginLeft": "0.2rem", "color": "#666666" }}>还款明细</div>
        <div className={styles.refundDetailItem}>
          <span style={{ "color": "#666666" }}>应还日期</span>
          <span style={{ "color": "#666666" }}>应还金额</span>
          <span style={{ "color": "#666666" }}>状态</span>
        </div>
        {
          this.state.orderDetail.repaymentrecordList.map((item, index) => (
            <div className={styles.refundDetailItem} key={index}>
              <span>{item.shoulddate}</span>
              <span style={{ "color": "#F08200" }}>{item.principal}</span>
              <span style={{ "color": item.status === 0 ? "#4AB443" : "#E2414E"}}>{this.refundTitle(item.status)}</span>
            </div>
          ))
        }
      </div>
    );
  }

  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.content}>
          <div className={styles.detailContent}>
            <span>订单状态：</span>
            <span style={{ "color": "#E2414E" }}>{this.statusTitle(this.state.orderDetail.status)}</span>
          </div>
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
          <div className={styles.eeeLine}></div>
          <div className={styles.detailContent}>
            <span>总保费：</span>
            <span style={{ "color": "#F08200" }}>￥{this.state.orderDetail.commercialprice}</span>
          </div>
          {
            // 订单已完成的时候 展示 借款金额
            this.state.orderDetail.status === 4
              ? <div className={styles.detailContent}>
                <span>借款金额：</span>
                <span>￥{this.state.orderDetail.loanAmount}</span>
              </div>
              : <div></div>
          }
        </div>
        {
          // 订单已完成的时候展示 还款明细
          this.state.orderDetail.status === 4
            ? this.renderRefundDetail()
            : null
        }

        {
          this.renderBottomView(this.state.orderDetail.status)
        }
      </div>
    )
  }
};

OrderStatusPage.propTypes = {
};

export default connect()(OrderStatusPage);
