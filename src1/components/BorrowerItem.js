import React from 'react';

function InfoItem(props) {
  return (
    <div>
      <div style={{ "paddingTop": "0.3rem" }}>{props.name}&nbsp;{props.telephone}</div>
      <div style={{ "paddingTop": "0.1rem", "color": "#999999" }}>身份证号：{props.idCode}</div>
      <div style={{ "paddingTop": "0.1rem", "color": "#999999" }}>{props.bankName}：{props.bankCode}</div>
    </div>
  );
}

export default InfoItem;