import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './InvitePage.css';

class InvitePage extends Component {
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.content}>
          <div style={{"marginTop": "0.6rem"}}>只要您分享自己的专属二维码</div>
          <div style={{"marginTop": "0.1rem"}}>即可获得大礼包~</div>
          <div className={styles.eeeLine}></div>
          <div className={styles.inviteNum}>22</div>
          <div className={styles.inviteNumTitle}>邀请码</div>
          <div className={styles.inviteQRCode}>
            <img src="" alt="" />
          </div>
          <div className={styles.inviteQRCodeTitle}>长按图片保存二维码</div>
        </div>
      </div>
    )
  }
};

InvitePage.propTypes = {
};

export default connect()(InvitePage);
