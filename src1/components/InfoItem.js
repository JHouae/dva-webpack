import React from 'react';
import styles from './InfoItem.css';

function InfoItem(props) {
  return (
    <div className={styles.item}>
      <div className={styles.eeeLine}></div>
      <div className={styles.itemContent}>
        {props.children}
      </div>
    </div>
  );
}

export default InfoItem;