import {
  findRepaymentrecordBycreateId,
} from '../services/api';
export default {

  namespace: 'refundPlanModel',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *findRepaymentrecordBycreateId({ payload }, { call, put, select }) {
      try {
        const data = yield call(findRepaymentrecordBycreateId, payload);
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

  },

};
