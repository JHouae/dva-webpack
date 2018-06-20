import React from 'react';
import styles from './UploadItem.css';

function UploadItem(props) {
  return (
    <div className={styles.uploadContentItem}>
      <div className={styles.uploadContentTitle}>{props.uploadTitle}</div>
      <div className={styles.uploadContentPic}>
        <input
          type="file"
          id={props.id}
          style={{ position: "absolute", opacity: "0", width: "3.26rem", height: "1.8rem" }}
          onChange={(e) => props.selectFile(e)}
          accept="*.*" 
          multiple
        />
        <img className={styles.greyBG} src={props.src} alt="" />
      </div>
    </div>
  );
}

export default UploadItem;