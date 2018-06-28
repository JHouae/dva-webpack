import React, { PureComponent } from 'react';
import styles from './index.less';

export default class Index extends PureComponent {
  render() {
    return (
      <div className={styles.header}>Example</div>
    );
  };
}

Index.propTypes = {
};