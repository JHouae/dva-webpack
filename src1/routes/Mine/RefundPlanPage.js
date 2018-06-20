import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './RefundPlanPage.css';
import { Accordion, List } from 'antd-mobile';

import EmptyPage from '../../components/EmptyPage';
import orderEmptyIcon from '../../assets/icon_order_empty.png'

function PanelTitle(props) {
  return (
    <div className={styles.panelTitle}>
      <div style={{
        "fontSize": "0.32rem",
        "fontWeight": "bold",
      }}>{props.shoulddate.slice(5)}</div>
      <div style={{ "marginRight": "0.2rem" }}>
        <span>{props.principal}+</span>
        <span style={{
          "color": "#4AB443"
        }}>{props.lixi}</span>
      </div>
    </div>
  );
}
function PanelItem(props) {
  return (
    <div className={styles.panelTitle}>
      <div>车牌号：{props.platinum}（第{props.repaymentnum}期）</div>
      <div style={{ "marginRight": "0.5rem" }}>
        <span>{props.principal}+</span>
        <span style={{
          "color": "#4AB443"
        }}>{props.lixi}</span>
      </div>
    </div>
  );
}

class RefundPlanPage extends Component {
  componentDidMount = () => {
    document.title = "还款计划";
    this.props.dispatch({
      type: 'refundPlanModel/findRepaymentrecordBycreateId'
    }).then((data) => {
      if (data && Object.keys(data).length !== 0) {
        this.setState({
          refundPlanData: data,
        })
      }
    })
  };
  state = {
    refundPlanData: [],
  }
  renderItem = (item, index) => {
    return item.map((item, index) => {
      let principal = 0;
      let lixi = 0;
      item.repaymentRecordList.forEach(element => {
        principal += parseFloat(element.principal);
        lixi += parseFloat(element.lixi);
      })
      return (
        <Accordion key={item.date + index}>
          <Accordion.Panel header={<PanelTitle shoulddate={item.date} principal={principal.toFixed(2)} lixi={lixi.toFixed(2)} />}>
            <List>
              {this.renderRefundItem(item.repaymentRecordList)}
            </List>
          </Accordion.Panel>
        </Accordion>
      )
    })
  }
  renderRefundItem = (refundArray) => {
    return refundArray.map((refundItem, index) => (
      <List.Item key={index + refundItem.platinum}>
        <PanelItem
          platinum={refundItem.platinum}
          repaymentnum={refundItem.repaymentnum}
          principal={refundItem.principal}
          lixi={refundItem.lixi}
        />
      </List.Item>
    ));
  }

  render() {
    if (this.state.refundPlanData.length === 0) {
      return (
        <EmptyPage emptyIcon={orderEmptyIcon} title={"暂无任何数据"} />
      )
    }
    const now = new Date();
    const year = now.getFullYear();
    return (
      <div className={styles.normal}>
        <div className={styles.content}>
          <div className={styles.contentTitle}>
            <span style={{ "marginLeft": "0.6rem" }}>待还日期</span>
            <span style={{ "marginRight": "0.6rem" }}>待还本息+利息</span>
          </div>
          {this.state.refundPlanData.map((item, index) => {
            return (
              <div key={year + index}>
                <div className={styles.yearAndMonthTitle}>{year + index}</div>
                {this.renderItem(item, index)}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
};

RefundPlanPage.propTypes = {
};

export default connect()(RefundPlanPage);
