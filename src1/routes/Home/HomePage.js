import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './HomePage.css';
import { routerRedux } from 'dva/router';

import bannerImage from '../../assets/banner.png';
import truckCar from '../../assets/icon_periodization_truck.png';
import personalCar from '../../assets/icon_periodization_car.png';
import arrowImg from '../../assets/icon_all_next.png';

class HomePage extends Component {
  trunkCarClick = () => {
    this.props.dispatch(
      routerRedux.push({
        pathname: "/installment/applyInfo",
      })
    )
  }
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.bannerBox}>
          <img className={styles.bannerImage} src={bannerImage} alt="" />
        </div>
        <div className={styles.stages}>
          <div className={styles.stagesTitle}>我要分期</div>
          <div className={styles.stagesItem}>
            <div className={styles.eeeLine}></div>
            <div className={styles.itemContent} onClick={()=>this.trunkCarClick()}>
              <div className={styles.itemContentBetween}>
                <div className={styles.itemIcon}><img src={truckCar} alt="" /></div>
                <div className={styles.itemTitle}>营运货车</div>
              </div>
              <div className={styles.itemArrow}><img src={arrowImg} alt="" /></div>
            </div>
          </div>
          <div className={styles.stagesItem}>
            <div className={styles.eeeLine}></div>
            <div className={styles.itemContent}>
              <div className={styles.itemContentBetween}>
                <div className={styles.itemIcon}><img src={personalCar} alt="" /></div>
                <div className={styles.itemTitle}>个人车辆</div>
              </div>
              <div className={styles.itemExpect}>敬请期待</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

HomePage.propTypes = {
};

export default connect()(HomePage);
