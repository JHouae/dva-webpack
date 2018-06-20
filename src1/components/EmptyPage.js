import React from 'react';
import styles from './EmptyPage.css';

function EmptyPage(props) {
  return (
    <div className={styles.noDataContent}>
      <div className={styles.noDataImg}>
        <img src={props.emptyIcon} alt="" />
      </div>
      <div>{props.title}</div>
    </div>
  );
}

export default EmptyPage;