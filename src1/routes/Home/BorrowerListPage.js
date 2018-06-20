import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './BorrowerListPage.css';
import BorrowerItem from '../../components/BorrowerItem';

import periodizationYes from '../../assets/icon_periodization_yes.png';
import periodizationNo from '../../assets/icon_periodization_no.png';
import addImg from '../../assets/icon_information_add.png';
import editImg from '../../assets/icon_edit.png';
import deleteImg from '../../assets/icon_delete.png';

class BorrowerListPage extends Component {
  componentDidMount(){
    this.props.dispatch({
      type: 'applyInfoModel/findAllCarpricesByUserId',
    });
  }
  goBorrowerInfoPage = (item) => {
    this.props.dispatch(routerRedux.push({
      pathname: "/installment/borrowerInfo",
    }));
  }
  selectedBorrowerInfo = (item) => {
    this.props.dispatch({
      type: 'applyInfoModel/saveSelectedBorrowerInfo',
      payload: item
    }).then(() => (this.props.history.goBack()));
  }
  editBorrowerInfo =(item)=> {
    this.props.dispatch({
      type: 'applyInfoModel/saveEditBorrowerInfo',
      payload: item
    });
  }
  deleteBorrowerItem =(item)=> {
    this.props.dispatch({
      type: 'applyInfoModel/deleteCarprices',
      payload: {prid: item.prid}
    });
  }
  render() {
    return (
      <div className={styles.normal}>
        {
          this.props.borrowerList.map((item, index) => (
            <div className={styles.borrowerItem} key={index} onClick={(item) => this.selectedBorrowerInfo(item)}>
              <BorrowerItem
                name={item.pname}
                telephone={item.priphone}
                idCode={item.pridcard}
                bankName={item.bankid}
                bankCode={item.pribankid}
              />
              <div className={styles.eeeLine} style={{ "marginTop": "0.3rem" }}></div>
              <div className={styles.operationContent}>
                <div className={styles.operationContent}>
                  <div className={styles.icon}>
                    {item.prid === this.props.selectedBorrowerInfo.prid
                      ? <img src={periodizationYes} alt="" />
                      : <img src={periodizationNo} alt="" />
                    }
                  </div>
                  <div>&nbsp;当前选择</div>
                </div>
                <div className={styles.operationContent} style={{ "width": "2.4rem", "marginRight": "0.2rem" }}>
                  <div className={styles.operationContent} onClick={(item) => this.editBorrowerInfo(item)}>
                    <div className={styles.icon}><img src={editImg} alt="" /></div>
                    <div>&nbsp;编辑</div>
                  </div>
                  <div className={styles.operationContent} onClick={(item) => this.deleteBorrowerItem(item)}>
                    <div className={styles.icon}><img src={deleteImg} alt="" /></div>
                    <div>&nbsp;删除</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
        <div className={styles.addBorrower} onClick={() => this.goBorrowerInfoPage()}>
          <img className={styles.addImg} src={addImg} alt="" />
          <div>&nbsp;新增借款人信息</div>
        </div>
      </div>
    )
  }
};

BorrowerListPage.propTypes = {
};

function mapStateToProps(state) {
  return {
    borrowerList: state.applyInfoModel.borrowerList,
    selectedBorrowerInfo: state.applyInfoModel.selectedBorrowerInfo,
  };
}

export default connect(mapStateToProps)(BorrowerListPage);
