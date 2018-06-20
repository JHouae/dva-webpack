import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './MinePage.css';

import headerIcon from '../../assets/icon_my_head.png';
import arrowImg from '../../assets/icon_all_next.png';

function MineItem(props) {
  return (
    <div onClick={props.onClick}>
      {
        props.index === 0 ? <div></div> : <div className={styles.eeeLine}></div>
      }
      <div className={styles.mineItemContent}>
        <div className={styles.mineItemTitle}>{props.title}</div>
        <div className={styles.mineItemArrow}>
          <img src={arrowImg} alt="" />
        </div>
      </div>
    </div>
  );
}

class MinePage extends Component {
  mineItemClick = (index) => {
    switch (index) {
      case 0:
        this.props.dispatch(routerRedux.push({
          pathname: "/mine/myOrder",
        }));
        break;
      case 1:
        this.props.dispatch(routerRedux.push({
          pathname: "/mine/refundPlan",
        }));
        break;
      case 2:
        this.props.dispatch(routerRedux.push({
          pathname: "/mine/contactUs",
        }));
        break;
      case 3:
        this.props.dispatch(routerRedux.push({
          pathname: "/mine/viqa",
        }));
        break;
      case 4:
        this.props.dispatch(routerRedux.push({
          pathname: "/mine/invite",
        }));
        break;
      default:
    }
  }
  render() {
    const contentList = ["我的订单", "还款计划", "联系客服", "车险分期常见问题"/*, "我要邀请"*/];
    return (
      <div className={styles.normal}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <img src={headerIcon} alt="" />
          </div>
          <div className={styles.headerName}>姓名</div>
        </div>
        <div className={styles.content}>
          {
            contentList.map((value, index) => (
              <MineItem
                key={index}
                title={value}
                index={index}
                onClick={() => this.mineItemClick(index)}
              />
            ))
          }
        </div>
      </div>
    )
  }
};

MinePage.propTypes = {
};

export default connect()(MinePage);
