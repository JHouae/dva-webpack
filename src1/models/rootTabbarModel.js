import {
  getWXUserInformation,
} from '../services/api';
export default {

  namespace: 'rootTabbarModel',

  state: {
    selectedTab: "installment",
    name: "",
    portraitUrl: "",
  },
  effects: {
    *getWXUserInformation({ payload }, { call, put }) {
      try{
        const data = yield call(getWXUserInformation, payload);
        localStorage.setItem('token', data.token);
        yield put({ type: 'saveUserInfo', payload: data });
      } catch(error) {

      }
    },
  },
  reducers: {
    saveSelectedTab(state, action) {
      return { ...state, selectedTab: action.payload };
    },
    saveUserInfo(state, action) {
      return { ...state, name: action.name, portraitUrl: action.headURL};
    },
  },
};
