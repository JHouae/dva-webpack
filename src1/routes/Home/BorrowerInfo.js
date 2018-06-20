import React, { Component } from 'react';
import { connect } from 'dva';
import { Picker } from 'antd-mobile';
import styles from './BorrowerInfo.css';
import InfoItem from '../../components/InfoItem';
import UploadItem from '../../components/UploadItem';

import arrowImg from '../../assets/icon_all_next.png';
import greyBG from '../../assets/icon_upload_grey.png';


class BorrowerInfo extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'applyInfoModel/getBank'
    })
    if (Object.keys(this.props.editBorrowerInfo).length !== 0) {
      const info = this.props.editBorrowerInfo;
      this.setState({
        borrowerName: info.pname,
        borrowerIdCode: info.pridcard,
        borrowerTelephone: info.priphone,
        bankcode: info.pribankid,
        bankName: info.bankid,
        fileThree: info.threefile,
        fileFour: info.fourfile,
        fileFive: info.fivefile,
        fileSix: info.sixfile,
      })
    }
  }
  
  state = {
    borrowerName: '',
    borrowerIdCode: '',
    borrowerTelephone: '',
    bankcode: '',
    bankName: '请选择',
    bankObj: {},
    fileThree: greyBG,
    fileFour: greyBG,
    fileFive: greyBG,
    fileSix: greyBG,
  }

  extistOrderOfPridcard =(value)=> {
    // console.log(value);
    this.props.dispatch({
      type: 'applyInfoModel/addCarprices',
      payload: {pridcard: value}
    }).then((data) => {
      if (Object.keys(this.props.editBorrowerInfo).length !== 0) {
        const info = data;
        this.setState({
          borrowerName: info.pname,
          borrowerIdCode: info.pridcard,
          borrowerTelephone: info.priphone,
          bankcode: info.pribankid,
          bankName: info.bankid,
          fileThree: info.threefile,
          fileFour: info.fourfile,
          fileFive: info.fivefile,
          fileSix: info.sixfile,
        })
      }
    });
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
        if (e.target.id === 'fileThree') {
          this.setState({ fileThree: reader.result })
        } else if (e.target.id === 'fileFour') {
          this.setState({ fileFour: reader.result })
        } else if (e.target.id === 'fileFive') {
          this.setState({ fileFive: reader.result })
        } else if (e.target.id === 'fileSix') {
          this.setState({ fileSix: reader.result })
        }
      };
    }
  }

  saveInfo = (payload) => {    
    this.setState(payload);
  }

  saveBank = (index) => {
    const obj = this.props.bankList[index];
    this.setState({
      bankName: obj.label,
      bankObj: obj
    })
  }

  submitInfo =()=> {
    const param = {
      pname: this.state.borrowerName,
      pridcard: this.state.borrowerIdCode,
      priphone: this.state.borrowerTelephone,
      pribankid: this.state.bankcode,
      bankid: this.state.bankObj.bankid,
      threefile: this.state.fileThree,
      fourfile: this.state.fileFour,
      fivefile: this.state.fileFive,
      sixfile: this.state.fileSix,
    }
    this.props.dispatch({
      type: 'applyInfoModel/addCarprices',
      payload: param
    });
  }

  render() {
    const uploadPic = [
      {
        title: "营业执照",
        fileName: 'fileThree',
        src: this.state.fileThree
      },
      {
        title: "借款人银行卡",
        fileName: 'fileFour',
        src: this.state.fileFour
      },
      {
        title: "借款人身份证正面",
        fileName: 'fileFive',
        src: this.state.fileFive
      },
      {
        title: "借款人身份证反面",
        fileName: 'fileSix',
        src: this.state.fileSix
      },
    ]
    return (
      <div className={styles.normal}>
        <div className={styles.baseInfo}>
          <div className={styles.infoTitle}>基本信息</div>
          <InfoItem>
            <div>借款人姓名</div>
            <input type="text"
              className={styles.inputStyle}
              placeholder="请输入"
              onChange={(e) => this.saveInfo({ borrowerName: e.target.value })}
            />
          </InfoItem>
          <InfoItem>
            <div>借款人身份证号</div>
            <input
              type="text"
              className={styles.inputStyle}
              placeholder="请输入"
              onBlur={(e) => this.extistOrderOfPridcard(e.target.value)}
              onChange={(e) => this.saveInfo({ borrowerIdCode: e.target.value })}
            />
          </InfoItem>
          <InfoItem>
            <div>借款人手机号</div>
            <input
              type="text"
              className={styles.inputStyle}
              placeholder="请输入"
              onChange={(e) => this.saveInfo({ borrowerTelephone: e.target.value })}
            />
          </InfoItem>
          <InfoItem>
            <div>银行卡号</div>
            <input
              type="text"
              className={styles.inputStyle}
              placeholder="请输入"
              onChange={(e) => this.saveInfo({ bankcode: e.target.value })}
            />
          </InfoItem>
          <InfoItem>
            <div>开户行</div>
            <Picker
              title="选择开户行"
              onOk={v => this.saveBank(v)}
              data={this.props.bankList}
              cols={1}
            >
              <div>
                {
                  this.state.bankName === '请选择' ?
                    <span style={{ "color": "grey" }}>请选择</span> :
                    <span>{this.state.bankName}</span>
                }
                <img className={styles.arrow} src={arrowImg} alt="" />
              </div>
            </Picker>
          </InfoItem>
        </div>
        <div className={styles.upload}>
          <div className={styles.uploadTitle}>上传影像资料</div>
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
          <div className={styles.tips}>
            <div>温馨提示:</div>
            <div>1.银行卡持卡人与借款人必须为同一人。</div>
            <div>2.只支持借记卡。</div>
          </div>
        </div>

        <div className={styles.bottomBlockView}>
        </div>
        <div className={styles.bottomView}>
          <div className={styles.nextBtn} onClick={()=>this.submitInfo()}>保存</div>
        </div>
        <div className={styles.iphoneXBottomView}>
        </div>
      </div>
    )
  }
};

BorrowerInfo.propTypes = {
};

function mapStateToProps(state) {
  return {
    bankList: state.applyInfoModel.bankList,
    editBorrowerInfo: state.applyInfoModel.editBorrowerInfo,
  };
}

export default connect(mapStateToProps)(BorrowerInfo);
