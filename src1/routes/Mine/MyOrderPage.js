import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './MyOrderPage.css';
import { Tabs } from 'antd-mobile';
import { DefaultTabBar } from 'antd-mobile/lib/tabs';

import OrderItem from '../../components/OrderItem';
import EmptyPage from '../../components/EmptyPage';
import orderEmptyIcon from '../../assets/icon_order_empty.png'

class MyOrderPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'orderModel/getOrderOfUser',
      payload: {status: -1}
    })
  }
  renderUnderline = (props) => (
    <DefaultTabBar
      {...props}
      renderUnderline={(ulProps) => {
        const { style, ...otherProps } = ulProps;
        const ulStyle = {
          ...style,
          border: 'none',
        };
        return (
          <div style={ulStyle} {...otherProps}>
            <div style={{
              width: "0.8rem",
              height: "2px",
              backgroundColor: 'red',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}></div>
          </div>
        );
      }}
    />
  )

  renderNoData = () => {
    return (
      <EmptyPage emptyIcon={orderEmptyIcon} title={"暂无任何数据"} />
    )
  }

  itemClick = (item) => {
    if (item.status === 2) {
      // 待付款
      this.props.dispatch(routerRedux.push({
        pathname: `/mine/installment/${item.ordetaileid}`,
      }));
    } else {
      this.props.dispatch(routerRedux.push({
        pathname: `/mine/myOrder/${item.ordetaileid}`,
      }));
    }

  }

  tabClick = (index) => {
    const param = {};
    switch (index) {
      case 0:
        param.status = -1;
        break;
      case 1:
        param.status = 1;
        break;
      case 2:
        param.status = 2;
        break;
      case 3:
        param.status = 3;
        break;
      default:
    }
    this.props.dispatch({
      type: 'orderModel/getOrderOfUser',
      payload: param
    })
  }

  render() {
    const tabs = [
      { title: "全部" },
      { title: "未完成" },
      { title: "已完成" },
      { title: "已取消" },
    ];

    return (
      <div className={styles.normal}>
        <Tabs
          tabs={tabs}
          initialPage={0}
          swipeable={false}
          // onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => this.tabClick(index)}
          tabBarActiveTextColor="red"
          tabBarInactiveTextColor="#666666"
          tabBarTextStyle={{ "fontSize": "0.28rem" }}
          renderTabBar={(props) => this.renderUnderline(props)}
        >
          <div>
            {
              this.props.allOrderList.length === 0
                ? this.renderNoData()
                : this.props.allOrderList.map((item, index) => (
                  <OrderItem data={item} key={index} onClick={() => this.itemClick(item)} />
                ))
            }
          </div>
          <div>
            {
              this.props.notCompleteOrderList.length === 0
                ? this.renderNoData()
                : this.props.notCompleteOrderList.map((item, index) => (
                  <OrderItem data={item} key={index} onClick={() => this.itemClick(item)} />
                ))
            }
          </div>
          <div>
            {
              this.props.completeOrderList.length === 0
                ? this.renderNoData()
                : this.props.completeOrderList.map((item, index) => (
                  <OrderItem data={item} key={index} onClick={() => this.itemClick(item)} />
                ))
            }
          </div>
          <div>
            {
              this.props.cancelOrderList.length === 0
                ? this.renderNoData()
                : this.props.cancelOrderList.map((item, index) => (
                  <OrderItem data={item} key={index} onClick={() => this.itemClick(item)} />
                ))
            }
          </div>
        </Tabs>
      </div>
    )
  }
};

MyOrderPage.propTypes = {
};

function mapStateToProps(state) {
  return {
    allOrderList: state.orderModel.allOrderList,
    notCompleteOrderList: state.orderModel.notCompleteOrderList,
    completeOrderList: state.orderModel.completeOrderList,
    cancelOrderList: state.orderModel.cancelOrderList,
  };
}

export default connect(mapStateToProps)(MyOrderPage);
