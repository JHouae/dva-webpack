import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './ApplyInfoPage.css';
import BorrowerItem from '../../components/BorrowerItem';

import arrowImg from '../../assets/icon_all_next.png';
import addImg from '../../assets/icon_information_add.png';

class ApplyInfoPage extends Component {
  goBorrowerListPage =()=> {
    this.props.dispatch(routerRedux.push({
      pathname: "/installment/borrowerList",
    }));
  }
  goCarInfoPage =(item)=> {
    this.props.dispatch(routerRedux.push({
      pathname: "/installment/addCarInfo",
    }));
    this.props.dispatch({
      type: 'applyInfoModel/saveSelectedCarInfo',
      payload: item ? item : {}
    })
  }
  submitInfo =()=> {
    const param = {
      prid: this.props.selectedBorrowerInfo.prid,
      ordetaileIdArr: this.props.carInfoList.map((item, index)=>{return item.ordetaileid}),
    };
    this.props.dispatch({
      type: 'applyInfoModel/getAudit',
      payload: param
    });
  }
  render() {    
    return (
      <div className={styles.normal}>
        <div className={styles.borrowerInfo}>
          <div className={styles.borrowerInfoTitle} onClick={() => this.goBorrowerListPage()}>
            <div>借款人信息</div>
            <div className={styles.borrowerInfoBtn}>
              <div className={styles.color999}>{this.props.selectedBorrowerInfo.idCode ? "查看详情" : "新增信息"}</div>
              <div className={styles.arrowImg}><img src={arrowImg} alt="" /></div>
            </div>
          </div>
          {
            this.props.selectedBorrowerInfo.idCode ?
              <div style={{ "paddingBottom": "0.3rem" }}>
                <div className={styles.eeeLine}></div>
                <BorrowerItem 
                  name={this.props.selectedBorrowerInfo.pname}
                  telephone={this.props.selectedBorrowerInfo.priphone}
                  idCode={this.props.selectedBorrowerInfo.pridcard}
                  bankName={this.props.selectedBorrowerInfo.bankid}
                  bankCode={this.props.selectedBorrowerInfo.pribankid}
                />
              </div>
              : null
          }
        </div>
        <div className={styles.carInfo}>
          {
            this.props.carInfoList.map((item, index) => (
              <div key={index}>
                <div className={styles.carInfoTitle} onClick={(item) => this.goCarInfoPage(item)}>
                  <div style={{"fontWeight": "bold", "fontSize": "0.32rem"}}>{item.platenumber}</div>
                  <div className={styles.borrowerInfoBtn}>
                    <div className={styles.color999}>查看详情</div>
                    <div className={styles.arrowImg}><img src={arrowImg} alt="" /></div>
                  </div>
                </div>
                <div className={styles.top20}>被保险人：{item.insurer}</div>
                <div className={`${styles.top10} ${styles.color999}`}>保险公司：{item.insurancecompany}</div>
                <div className={`${styles.top10} ${styles.color999}`}>保单期限：{`${item.qibaodate}~${item.jiezhidate}`}</div>
                <div className={`${styles.eeeLine} ${styles.top30}`}></div>
              </div>
            ))
          }
          <div className={styles.addCarInfo} onClick={() => this.goCarInfoPage()}>
            <img className={styles.addImg} src={addImg} alt="" />
            <div>&nbsp;继续添加车辆信息</div>
          </div>

        </div>
        <div className={styles.bottomBtn} onClick={() => this.submitInfo()}>
          提交申请
        </div>
      </div>
    )
  }
};

ApplyInfoPage.propTypes = {
};
function mapStateToProps(state) {
  return {
    carInfoList: state.applyInfoModel.carInfoList,
    selectedBorrowerInfo: state.applyInfoModel.selectedBorrowerInfo,
  };
}

export default connect(mapStateToProps)(ApplyInfoPage);
