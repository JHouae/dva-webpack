import { Toast } from 'antd-mobile';

export default {

  namespace: 'commonModel',

  state: {},

  effects: {

  },

  reducers: {
    showLoading(state, action) {
      Toast.loading('上传中，请稍等', 0);
      return {...state};
    },
    hideLoading(state, action) {
      Toast.hide();
      return {...state};
    },
    showTips(state, action) {
      Toast.info(action.msg, 2);
      return {...state};
    },
  },
};
