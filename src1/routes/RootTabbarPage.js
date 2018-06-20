import React, { Component } from 'react';
import { connect } from 'dva';
import { TabBar } from 'antd-mobile';
import HomePage from './Home/HomePage';
import MinePage from './Mine/MinePage';
import URI from 'urijs';

import tabbarInstallmentNormal from '../assets/icon_tab_safe_nor.png';
import tabbarInstallmentSelect from '../assets/icon_tab_safe_pre.png';
import tabbarMineNormal from '../assets/icon_tab_my_nor.png';
import tabbarMineSelect from '../assets/icon_tab_my_pre.png';

class RootTabbarPage extends Component {
  componentDidMount() {
    document.title = "车险分期";

    const uri = new URI(document.location.href);
    const query = uri.query(true);
    const { code } = query;
    this.props.dispatch({
      type: 'rootTabbarModel/getWXUserInformation',
      payload: {code: code}
    });
  }
  renderTabbarIcon = (src) => {
    return (
      <div style={{
        width: '0.5rem',
        height: '0.5rem'
      }}>
        <img src={src} alt="" />
      </div>
    )
  }

  render() {

    const tabbarList = [
      {
        title: "车险分期",
        key: "installment",
        normalIcon: tabbarInstallmentNormal,
        selectedIcon: tabbarInstallmentSelect,
        selected: "installment",
        onPress: "installment",
        render: <HomePage />
      },
      {
        title: "个人中心",
        key: "mine",
        normalIcon: tabbarMineNormal,
        selectedIcon: tabbarMineSelect,
        selected: "mine",
        onPress: "mine",
        render: <MinePage />
      },
    ];

    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#999999"
          tintColor="#E2414E"
          barTintColor="white"
        >
          {
            tabbarList.map((item, index) => (
              <TabBar.Item
                title="车险分期"
                key="车险分期"
                icon={this.renderTabbarIcon(item.normalIcon)}
                selectedIcon={this.renderTabbarIcon(item.selectedIcon)}
                selected={this.props.selectedTab === item.selected}
                onPress={() => {
                  this.props.dispatch({
                    type: 'rootTabbarModel/saveSelectedTab',
                    payload: item.onPress,
                  });
                }}
              >
                {item.render}
              </TabBar.Item>
            ))
          }
        </TabBar>
      </div>
    )
  }
};

RootTabbarPage.propTypes = {
};

function mapStateToProps(state) {  
  return {
    selectedTab: state.rootTabbarModel.selectedTab,
  };
}

export default connect(mapStateToProps)(RootTabbarPage);
