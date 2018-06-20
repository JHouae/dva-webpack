import React, { Component } from 'react';
import { connect } from 'dva';
import { Picker, DatePicker, Modal } from 'antd-mobile';
import styles from './CarBaseInfo.css';
import InfoItem from '../../components/InfoItem';
import UploadItem from '../../components/UploadItem';
import { dateFormat, addDate } from '../../utils/common';

import arrowImg from '../../assets/icon_all_next.png';
import greyBG from '../../assets/icon_upload_grey.png';
import InformationIcon from '../../assets/icon_information_doubt.png';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);


const isSelf = [
  {
    "label": '是',
    "value": '是',
  },
  {
    "label": '否',
    "value": '否',
  },
];

class CarBaseInfo extends Component {
  componentDidMount() {
    document.title = "车辆信息";
    this.props.dispatch({
      type: 'applyInfoModel/getAllInsurerCompany'
    });

    if (Object.keys(this.props.selectedCarInfo).length !== 0) {
      this.setState({
        insurer: this.props.selectedCarInfo.insurer,
        insuranceAgent: this.props.selectedCarInfo.insurancecompany,
        carLicence: this.props.selectedCarInfo.platenumber,
        issurancePrice: this.props.selectedCarInfo.commercialprice,
        isSelf: this.props.selectedCarInfo.isoneself === 1 ? "男" : "女",
        startDate: this.props.selectedCarInfo.qibaodate, // 保单起保日
        endDate: this.props.selectedCarInfo.jiezhidate, // 保单到期日
        fileOne: this.props.selectedCarInfo.onefile,
        fileTwo: this.props.selectedCarInfo.twofile,
      })
    }
  }

  selectFile = (e) => {
    console.log(e.target.files);
    console.log(e.target.id);

    if (e.target.files.length > 0) {
      let curFile = e.target.files[0];
      let reader = new FileReader();
      if (curFile) {
        reader.readAsDataURL(curFile);
      } else {
      }
      reader.onloadend = () => {
        if (e.target.id === 'fileone') {
          this.setState({ fileone: reader.result })
        } else {
          this.setState({ filetwo: reader.result })
        }
      };

    }
  }

  state = {
    insurer: null, // 被保险人
    insuranceAgent: "请选择",
    insuranceAgentObj: {}, // 保险公司json对象
    carLicence: null, // 车牌号
    issurancePrice: null, //商业险价格
    isSelf: "请选择", // 是否为借款本人
    startDate: "请选择", // 保单起保日
    endDate: "请选择", // 保单到期日
    fileOne: greyBG,
    fileTwo: greyBG,

    carLicenceModel: false,
  };

  saveInfo = (payload) => {
    this.setState(payload);
  }
  saveInsurance = (index) => {
    const obj = this.props.insuranceAgentList[index];
    this.setState({
      insuranceAgent: obj.label,
      insuranceAgentObj: obj
    })
  }

  saveStartDate = (date) => {
    const formatDate = dateFormat(date, "yyyy-MM-dd");
    this.props.dispatch({
      type: 'applyInfoModel/decideLeg',
      payload: { qibaodate: formatDate }
    }).then((result) => {
      if (result) {
        this.setState({
          startDate: formatDate
        })
      }
    });
  }
  saveEndDate = (date) => {
    // console.log(date);
    // console.log(dateFormat(date, "yyyy-MM-dd"));
    const formatDate = dateFormat(date, "yyyy-MM-dd");
    this.props.dispatch({
      type: 'applyInfoModel/decideLeg',
      payload: { qibaodate: formatDate }
    }).then((result) => {
      if (result) {
        this.setState({
          endDate: formatDate
        })
      }
    });
  }
  saveIsSelf = (value) => {
    console.log(value[0]);
    this.setState({
      isSelf: value[0]
    })

  }
  selectEndDate = (date) => {
    if (this.state.startDate === '请选择') {
      console.log('请先选择保单起保日');
    }
  }
  deleteOrder = () => {
    this.props.dispatch({
      type: 'applyInfoModel/deleteOrdetailedByOrdetaileid',
      payload: { ordetaileid: this.props.selectedCarInfo.ordetaileid }
    })
  }
  submitCarInfo = () => {
    const param = {
      insurer: this.state.insurer,
      insurancecompany: this.state.insurer,
      platenumber: this.state.carLicence,
      qibaodate: this.state.startDate,
      jiezhidate: this.state.endDate,
      commercialprice: this.state.issurancePrice,
      isoneself: this.state.isSelf === '是' ? 1 : 2,
      onefile: this.state.fileOne,
      twofile: this.state.fileTwo,
    }
    this.props.dispatch({
      type: 'applyInfoModel/addOrdetailed',
      payload: param
    });
  }

  render() {
    const uploadPic = [
      {
        title: "行驶证",
        fileName: 'fileOne',
        src: this.state.fileOne
      },
      {
        title: "投保单",
        fileName: 'fileTwo',
        src: this.state.fileTwo
      },
    ];
    return (
      <div className={styles.normal}>
        <div className={styles.baseInfo}>
          <div className={styles.infoTitle}>基本信息</div>
          <InfoItem>
            <div>被保险人</div>
            <input
              type="text"
              className={styles.inputStyle}
              placeholder="请输入"
              onChange={(e) => this.saveInfo({ insurer: e.target.value })}
            />
          </InfoItem>
          <InfoItem>
            <div>保险公司</div>
            <Picker
              title="选择保险公司"
              onOk={value => this.saveInsurance(value)}
              data={this.props.insuranceAgentList}
              cols={1}
            >
              <div>
                {
                  this.state.insuranceAgent === '请选择' ?
                    <span style={{ "color": "grey" }}>请选择</span> :
                    <span>{this.state.insuranceAgent}</span>
                }
                <img className={styles.arrow} src={arrowImg} alt="" />
              </div>
            </Picker>
          </InfoItem>
          <InfoItem>
            <div className={styles.carLicenceItem}>
              <span className={styles.detailTitle}>车牌号</span>
              <div
                className={styles.informationIcon}
                onClick={() => this.setState({ carLicenceModel: true })}>
                <img src={InformationIcon} alt="" />
              </div>
            </div>
            <input
              type="text"
              className={styles.inputStyle}
              placeholder="请输入"
              onChange={(e) => this.saveInfo({ carLicence: e.target.value })}
            />
          </InfoItem>
          <InfoItem>
            <div>保单起保日</div>
            <DatePicker
              mode="date"
              title="起保日"
              extra=""
              minDate={now}
              value={now}
              onOk={date => this.saveStartDate(date)}
            >
              <div>
                {
                  this.state.startDate === '请选择' ?
                    <span style={{ "color": "grey" }}>请选择</span> :
                    <span>{this.state.startDate}</span>
                }
                <img className={styles.arrow} src={arrowImg} alt="" />
              </div>
            </DatePicker>
          </InfoItem>
          <InfoItem>
            <div>保单到期日</div>
            <DatePicker
              mode="date"
              title="到期日"
              extra=""
              minDate={new Date(addDate(now, 1))}
              value={now}
              onOk={date => this.saveEndDate(date)}
            >
              <div>
                {
                  this.state.endDate === '请选择' ?
                    <span style={{ "color": "grey" }}>请选择</span> :
                    <span>{this.state.endDate}</span>
                }
                <img className={styles.arrow} src={arrowImg} alt="" />
              </div>
            </DatePicker>
          </InfoItem>
          <InfoItem>
            <div>商业险价格（元）</div>
            <input type="text" className={styles.inputStyle} placeholder="请输入" onChange={(e) => this.saveInfo({ issurancePrice: e.target.value })} />
          </InfoItem>
          <InfoItem>
            <div>是否为借款人本人</div>
            <Picker
              title="是否为借款本人"
              onOk={v => this.saveIsSelf(v)}
              data={isSelf}
              cols={1}
            >
              <div>
                {
                  this.state.isSelf === '请选择' ?
                    <span style={{ "color": "grey" }}>请选择</span> :
                    <span>{this.state.isSelf}</span>
                }
                <img className={styles.arrow} src={arrowImg} alt="" />
              </div>
            </Picker>
          </InfoItem>
        </div>
        <div className={styles.upload}>
          <div className={styles.uploadTitle}>上传影像资料</div>
          <div className={styles.uploadContentView}>
            <div className={styles.eeeLine}></div>
            <div className={styles.uploadContent}>
              {
                uploadPic.map(((item, index) => {
                  return <UploadItem
                    key={index}
                    uploadTitle={item.title}
                    id={item.fileName}
                    src={item.src}
                    selectFile={(e) => this.selectFile(e)}
                  />
                }))
              }
            </div>
          </div>
        </div>
        <div className={styles.bottomBlockView}>
        </div>
        <div className={styles.bottomView}>
          <div className={styles.leftView} onClick={() => this.deleteOrder()}>删除</div>
          <div className={styles.rightView} onClick={() => { this.submitCarInfo() }}>保存</div>
        </div>
        <Modal
          visible={this.state.carLicenceModel}
          transparent
          maskClosable={false}
          footer={[{ text: '我知道了', onPress: () => { this.setState({carLicenceModel: false}) } }]}
        >
          若为新车未上牌，请填写发动机号
        </Modal>
      </div>
    )
  }
};

CarBaseInfo.propTypes = {
};

function mapStateToProps(state) {
  return {
    insuranceAgentList: state.applyInfoModel.insuranceAgentList,
    selectedCarInfo: state.applyInfoModel.selectedCarInfo,
  };
}

export default connect(mapStateToProps)(CarBaseInfo);
