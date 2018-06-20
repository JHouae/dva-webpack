import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './VIQAPage.css';

const qaList = [
  {
    "question": "一.问题：我可以替其他人申请吗？",
    "answer": `答：可以。申请人与借款人可以不是同一人。`,
  },
  {
    "question": "二.问题：申请分期需要上传投保单，投保人和保单特别约定是如何规定的？",
    "answer": "答：投保人：深圳融易保科技有限公司保单特别约定：1、赔偿金额3万元及以上需要投保人书面同意。<br />2、经投保人书面同意后，方可对保单进行批退批减；当被保险人未履行贷款合同义务或出现违约事项，投保人有权向保险公司申请批退、批减；退减保费将直接划款至投保人指定账户。<br />3、如果发生全损或其它造成保单终止，保险人需收到投保人“保费贷款结清通知书”方可予以支付赔款，否则由保险人承担相应法律责任。",
  },
  {
    "question": "三.问题：如果车辆有第一受益人，可以做吗？",
    "answer": "答：如果客户要求在保单特别约定中增加第一受益人条款，暂时不做。",
  },
  {
    "question": "四.问题：交强险和车船税部分能做分期吗？",
    "answer": "答：不能。只有车辆商业险或承运人责任险可以做分期。",
  },
]

class VIQAPage extends Component {
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.content}>
          {
            qaList.map((item, index) => (
              <div key={index} className={styles.itemContent}>
                <div className={styles.question}>{item.question}</div>
                <div className={styles.answer} dangerouslySetInnerHTML={{__html : item.answer}}></div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
};

VIQAPage.propTypes = {
};

export default connect()(VIQAPage);
