import {
  getOrderOfUser,
  queryOrderItem,
  confirmPeriodization,
  getPaymentOrder,
  amontMoney,
  addRepaymentrecordByOidAndDate
} from '../services/api';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'orderModel',

  state: {
    allOrderList: [],
    notCompleteOrderList: [],
    completeOrderList: [],
    cancelOrderList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *getOrderOfUser({ payload }, { call, put }) {
      try {
        const data = yield call(getOrderOfUser, payload);
        yield put({ type: 'saveOrderList', payload: { data: data, status: payload.status } });
      } catch (err) {
        const { msg } = err.response || {};
        yield put({
          type: 'commonModel/showTips',
          msg: msg || '网络请求失败，请稍后重试 0_0 ',
        });
      }
    },
    *queryOrderItem({ payload }, { call, put }) {
      try {
        const data = yield call(queryOrderItem, payload);
        return data;
      } catch (err) {
        const { msg } = err.response || {};
        yield put({
          type: 'commonModel/showTips',
          msg: msg || '网络请求失败，请稍后重试 0_0 ',
        });
      }
    },
    *confirmPeriodization({ payload }, { call, put }) {
      try {
        yield call(confirmPeriodization, payload);
        //TODO 跳转支付页面 加参数
        yield put(routerRedux.push({
          pathname: `/mine/payOrder/${payload.ordetaileid}/${payload.initialcost}/${payload.servicecost}`
        }))
      } catch (err) {
        const { msg } = err.response || {};
        yield put({
          type: 'commonModel/showTips',
          msg: msg || '网络请求失败，请稍后重试 0_0 ',
        });
      }
    },
    *getPaymentOrder({ payload }, { call, put }) {
      try {
        const data = yield call(getPaymentOrder, payload);
        // 跳转支付页面
        return data;
      } catch (err) {
        const { msg } = err.response || {};
        yield put({
          type: 'commonModel/showTips',
          msg: msg || '网络请求失败，请稍后重试 0_0 ',
        });
      }
    },
    *amontMoney({ payload }, { call, put }) {
      try {
        const data = yield call(amontMoney, payload);
        // 计算借款金额、服务费、总利息
        return data;
      } catch (err) {
        const { msg } = err.response || {};
        yield put({
          type: 'commonModel/showTips',
          msg: msg || '网络请求失败，请稍后重试 0_0 ',
        });
      }
    },
    *addRepaymentrecordByOidAndDate({ payload }, { call, put }) {
      try {
        yield call(addRepaymentrecordByOidAndDate, payload);
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
    saveOrderList(state, { payload }) {
      if (payload.status === -1) {
        return { ...state, allOrderList: payload.data };
      } else if (payload.status === 1) {
        return { ...state, notCompleteOrderList: payload.data };
      } else if (payload.status === 2) {
        return { ...state, completeOrderList: payload.data };
      } else if (payload.status === 3) {
        return { ...state, cancelOrderList: payload.data };
      }
    },
  },

};
