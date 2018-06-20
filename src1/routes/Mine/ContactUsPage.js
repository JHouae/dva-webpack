import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './ContactUsPage.css';

class ContactUsPage extends Component {
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.content}>
          <div className={styles.mailBox}>邮箱：kf@365fqb.com</div>
          <div className={styles.address}>地址：广东省中山市中山五路汇智大厦57号一座</div>
          <div className={styles.telephone}>
            客服热线：
            <a style={{ "textDecoration": "underline" }} href="tel:400-1011-960">400-1011-960</a>&nbsp;
            <a style={{ "textDecoration": "underline" }} href="tel:18923786004">18923786004</a>
          </div>
        </div>
      </div>
    )
  }
};

ContactUsPage.propTypes = {
};

export default connect()(ContactUsPage);
