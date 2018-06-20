import {
  getAllInsurerCompany,
  decideLeg,
  addOrdetailed,
  getBank,
  addCarprices,
  findAllCarpricesByUserId,
  getAudit,
  deleteOrdetailedByOrdetaileid,
  deleteCarprices,
  extistOrderOfPridcard,
} from '../services/api';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'applyInfoModel',

  state: {
    carInfoList: [],  // 填写的车辆被保险人列表 提交页面展示用
    selectedCarInfo: {}, // 选择的车辆被保险人信息 
    insuranceAgentList: [], // 保险公司列表
    bankList: [], // 开户行列表
    borrowerList: [], // 借款人列表
    editBorrowerInfo: {}, // 需要编辑的借款人信息
    selectedBorrowerInfo: {}, // 选择的借款人信息 提交页面展示用

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *getAllInsurerCompany({ payload }, { call, put }) {
      try {
        const companyList = yield call(getAllInsurerCompany);
        // [
        //   { "insurerCompanyId": 1, "insurerCompanyName": "太保" }, 
        //   { "insurerCompanyId": 2, "insurerCompanyName": "中国人保" }
        // ]
        companyList.map((item, index) => (
          item.label = item.insurerCompanyName,
          item.value = index,
          item.key = index
        ))
        yield put({ type: 'saveInsuranceAgentList', payload: companyList });
      } catch (err) {
        const { msg } = err.response || {};
        yield put({
          type: 'commonModel/showTips',
          msg: msg || '网络请求失败，请稍后重试 0_0 ',
        });
      }
    },
    *decideLeg({ payload }, { call, put, select }) {
      try {
        const data = yield call(decideLeg, payload);
        if (data.isSuccess) {
          return true;
        } else {
          yield put({
            type: 'commonModel/showTips',
            msg: '所选日期为节假日'
          });
        }
      } catch (err) {
        const { msg } = err.response || {};
        yield put({
          type: 'commonModel/showTips',
          msg: msg || '网络请求失败，请稍后重试 0_0 ',
        });
      }
    },
    *addOrdetailed({ payload }, { call, put }) {
      yield put({ type: 'commonModel/showLoading' });
      try {
        const ordetaileid = yield call(addOrdetailed, payload);
        yield put({ type: 'commonModel/hideLoading' });
        yield put({ type: 'saveCarInfoWithId', payload: { ...payload, ordetaileid } });
        yield put(routerRedux.goBack());
      } catch (err) {
        yield put({ type: 'commonModel/hideLoading' });
        const { msg } = err.response || {};
        yield put({
          type: 'commonModel/showTips',
          msg: msg || '网络请求失败，请稍后重试 0_0 ',
        });
      }
    },
    *deleteOrdetailedByOrdetaileid({ payload }, { call, put, select }) {
      yield put({ type: 'commonModel/showLoading' });
      try {
        yield call(deleteOrdetailedByOrdetaileid, payload);
        yield put({ type: 'commonModel/hideLoading' });
        const ordetaileid = payload.ordetaileid;
        yield put({ type: 'deleteCarInfoWithId', payload: ordetaileid });
        yield put(routerRedux.goBack());
      } catch (err) {
        yield put({ type: 'commonModel/hideLoading' });
        const { msg } = err.response || {};
        yield put({
          type: 'commonModel/showTips',
          msg: msg || '网络请求失败，请稍后重试 0_0 ',
        });
      }
    },
    *getBank({ payload }, { call, put }) {
      try {
        const bankList = yield call(getBank);
        // {"bankid":2,"bankname":"中国银行"},{"bankid":3,"bankname":"交通银行"}
        bankList.map((item, index) => (
          item.label = item.bankname,
          item.value = index,
          item.key = index
        ))
        yield put({ type: 'saveBankList', payload: bankList });
      } catch (err) {
        const { msg } = err.response || {};
        yield put({
          type: 'commonModel/showTips',
          msg: msg || '网络请求失败，请稍后重试 0_0 ',
        });
      }
    },
    *addCarprices({ payload }, { call, put }) {
      yield put({ type: 'commonModel/showLoading' });
      try {
        yield call(addCarprices, payload);
        yield put({ type: 'commonModel/hideLoading' });
        yield put(routerRedux.goBack());

      } catch (err) {
        yield put({ type: 'commonModel/hideLoading' });
        const { msg } = err.response || {};
        yield put({
          type: 'commonModel/showTips',
          msg: msg || '网络请求失败，请稍后重试 0_0 ',
        });
      }
    },
    *findAllCarpricesByUserId({ payload }, { call, put }) {
      try {
        const borrowerList = yield call(findAllCarpricesByUserId, payload);
        yield put({ type: 'saveBorrowerList', payload: borrowerList });
      } catch (err) {
        const { msg } = err.response || {};
        yield put({
          type: 'commonModel/showTips',
          msg: msg || '网络请求失败，请稍后重试 0_0 ',
        });
      }
    },
    *getAudit({ payload }, { call, put }) {
      yield put({ type: 'commonModel/showLoading' });
      try {
        yield call(getAudit, payload);
        yield put({ type: 'commonModel/hideLoading' });
        yield put(routerRedux.push({
          pathname: "/installment/commitAppltResult",
        }))
      } catch (err) {
        yield put({ type: 'commonModel/hideLoading' });
        const { code, msg } = err.response || {};
        if (parseInt(code, 0) === 1116) {
          // 用户未绑定手机号
          yield put(routerRedux.push({
            pathname: "/login",
          }))
        } else {
          yield put({
            type: 'commonModel/showTips',
            msg: msg || '网络请求失败，请稍后重试 0_0 ',
          });
        }
      }
    },
    *deleteCarprices({ payload }, { call, put }) {
      yield put({ type: 'commonModel/showLoading' });
      try {
        yield call(deleteCarprices, payload);
        yield put({ type: 'commonModel/hideLoading' });
        // 删除成功刷新页面
        yield put({ type: 'findAllCarpricesByUserId' });
      } catch (err) {
        yield put({ type: 'commonModel/hideLoading' });
        const { msg } = err.response || {};
        yield put({
          type: 'commonModel/showTips',
          msg: msg || '网络请求失败，请稍后重试 0_0 ',
        });
      }
    },
    *extistOrderOfPridcard({ payload }, { call, put }) {
      try {
        const data = yield call(extistOrderOfPridcard, payload);
        return data;
      } catch (err) {
        const { msg } = err.response || {};
        yield put({
          type: 'commonModel/showTips',
          msg: msg || '网络请求失败，请稍后重试 0_0 ',
        });
      }
    },
  },

  reducers: {
    saveInsuranceAgentList(state, { payload }) {
      return { ...state, insuranceAgentList: payload };
    },
    saveCarInfoWithId(state, { payload }) {
      return { ...state, carInfoList: state.carInfoList.push(payload) };
    },
    deleteCarInfoWithId(state, { payload }) {
      return { ...state, carInfoList: state.carInfoList.filter((item) => item.ordetaileid !== payload) };
    },
    saveSelectedCarInfo(state, { payload }) {
      return { ...state, selectedCarInfo: payload };
    },
    saveBankList(state, { payload }) {
      return { ...state, bankList: payload };
    },
    saveBorrowerList(state, { payload }) {
      return { ...state, borrowerList: payload };
    },
    saveSelectedBorrowerInfo(state, { payload }) {
      return { ...state, selectedBorrowerInfo: payload };
    },
    saveEditBorrowerInfo(state, { payload }) {
      return { ...state, editBorrowerInfo: payload };
    },
  },

};
