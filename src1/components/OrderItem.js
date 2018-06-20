import React from 'react';
import styles from './OrderItem.css';
import arrowImg from '../assets/icon_all_next.png';

function OrderItem(props) {
  const renderTitle = (status) => {
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
        return "已失效";
      default:
    }
  }
  return (
    <div className={styles.item} onClick={props.onClick}>
      <div className={styles.itemContent}>
        <div className={styles.itemTitle}>
          <span>订单状态</span>
          <span style={{ "color": "#e2414e" }}>{renderTitle(props.data.status)}</span>
        </div>
        <div className={styles.eeeLineHorizontal}></div>
        <div className={styles.itemMsg}>
          <div className={styles.itemCarMsg}>
            <div style={{ "fontSize": "0.32rem", "color": "#333333" }}>{props.data.platenumber}</div>
            <div style={{ "fontSize": "0.24rem", "color": "#999999" }}>车牌号码</div>
          </div>
          <div className={styles.eeeLineVertical}></div>
          <div className={styles.itemMoneyMsg}>
            <div style={{ "fontSize": "0.32rem", "color": "#F08200" }}>{props.data.commercialprice}</div>
            <div style={{ "fontSize": "0.24rem", "color": "#999999" }}>订单金额</div>
          </div>
        </div>
        <div className={styles.eeeLineHorizontal}></div>
        <div className={styles.itemTitle}>
          <span style={{ "fontSize": "0.24rem", "color": "#999999" }}>订单时间：{props.data.create_time}</span>
          <div>
            <span style={{ "fontSize": "0.28rem", "color": "#999999", "marginRight": "0.1rem" }}>查看订单</span>
            <img src={arrowImg} alt="" className={styles.arrowImg} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;