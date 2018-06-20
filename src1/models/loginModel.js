import { getyzm, addUserPhone, phoneIsExit } from '../services/api';
import { routerRedux } from 'dva/router';

const delay = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default {

  namespace: 'loginModel',

  state: {
    veriCodeCountDown: 0,
    verificationcode: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *phoneIsExit({ payload }, { call, put }) {
      try {
        yield call(phoneIsExit, payload);
        yield put({type: 'getyzm', payload: payload});
      } catch (err) {
        const { msg } = err.response || {};
        yield put({
          type: 'commonModel/showTips',
          msg: msg || '网络请求失败，请稍后重试 0_0 ',
        });
      }
    },
    *getyzm({ payload }, { call, put, select }) {  
      try {
        const data = yield call(getyzm, payload);
        // data:{“verificationcode”:1,}}
        yield put({type: 'saveVerificationId', payload: data.verificationcode})
        yield put({type: 'saveCountDown', payload: 60});
        let countDown = true;
          while (countDown) {
            yield call(delay, 1000);
            let loginCountDown = yield select(state => state.loginModel.veriCodeCountDown);
            loginCountDown -= 1;
            yield put({
              type: 'saveCountDown',
              payload: loginCountDown,
            });
            if (loginCountDown < 1) {
              countDown = false;
            }
          }
      } catch (err) {
        const { msg } = err.response || {};
        yield put({
          type: 'commonModel/showTips',
          msg: msg || '网络请求失败，请稍后重试 0_0 ',
        });
      }
    },
    *addUserPhone({ payload }, { call, put, select }) {
      try {
        const verificationcode = yield select(state => state.loginModel.verificationcode);
        yield call(addUserPhone, {...payload, verificationcode});
        yield put(routerRedux.goBack());
      } catch (err) {
        const { msg } = err.response || {};
        yield put({
          type: 'commonModel/showTips',
          msg: msg || '网络请求失败，请稍后重试 0_0 ',
        });
      }
    }
  },

  reducers: {
    saveCountDown(state, { payload }) {
      return { ...state, veriCodeCountDown: payload };
    },
    saveVerificationId(state, { payload }) {
      return { ...state, verificationcode: payload };
    },
  },

};
