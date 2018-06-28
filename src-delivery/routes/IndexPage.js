import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

import { Layout, Icon, message } from 'antd';

import GlobalHeader from '../components/GlobalHeader';

const { Content, Header, Footer } = Layout;

function IndexPage() {
  return (
    <div>
      <GlobalHeader />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
