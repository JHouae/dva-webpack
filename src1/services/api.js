import { post } from '../utils/request';

const api = {
  "getAllInsurerCompany": "getAllInsurerCompany", // 获取所有保险公司接口
  "decideLeg": "decideLeg", // 判定日期接口
  "addOrdetailed": "addOrdetailed", // 保存订单接口
  "extistOrderOfPridcard": "extistOrderOfPridcard", // 根据身份证自动填充车企信息接口
  "getBank": "getBank", // 获取所有开户行接口
  "addUserPhone": "addUserPhone", // 绑定手机号
  "phoneIsExit": "phoneIsExit", // 判断手机号是否已注册接口
  "getAudit": "getAudit", // 提交申请接口
  "getyzm": "getyzm", // 发送验证码接口
  "findAllCarpricesByUserId": "findAllCarpricesByUserId", // 查询借款人信息列表接口
  "addCarprices": "addCarprices", // 添加和修改借款人接口
  "deleteOrdetailedByOrdetaileid": "deleteOrdetailedByOrdetaileid", // 删除订单接口(申请中订单才能删除)
  "deleteCarprices": "deleteCarprices", // 删除借款人接口
  "getOrderOfUser": "getOrderOfUser", // 查询用户所有订单接口
  "queryOrderItem": "queryOrderItem", // 查询订单信息接口  
  "confirmPeriodization": "confirmPeriodization", // 确认分期接口
  "getPaymentOrder": "getPaymentOrder", // 微信支付生成订单接口
  "amontMoney": "amontMoney", // 计算借款金额、服务费、总利息
  "addRepaymentrecordByOidAndDate": "addRepaymentrecordByOidAndDate", // 支付成功后生成还款计划接口
  "findRepaymentrecordBycreateId": "findRepaymentrecordBycreate_id",  // 还款计划
  "getWXUserInformation": "getWXUserInformation", // 用户授权登录接口
}

const domain = "http://192.168.0.124:8080/com-ininin-web/";
// "http://192.168.0.124:8080/com-ininin-web/"
// "http://localhost:8000/";
// http://ininin.rybsj.cn/
// http://192.168.0.145:8000/
// http://192.168.0.145:8000/

function requestUrl(api) {
  return `${domain}${api}`;
}

function getAllInsurerCompany(params) {
  return post(requestUrl(api.getAllInsurerCompany), params);
}
function decideLeg(params) {
  return post(requestUrl(api.decideLeg), params);
}
function addOrdetailed(params) {
  return post(requestUrl(api.addOrdetailed), params);
}
function extistOrderOfPridcard(params) {
  return post(requestUrl(api.extistOrderOfPridcard), params);
}
function getBank(params) {
  return post(requestUrl(api.getBank), params);
}
function addUserPhone(params) {
  return post(requestUrl(api.addUserPhone), params);
}
function phoneIsExit(params) {
  return post(requestUrl(api.phoneIsExit), params);
}
function getAudit(params) {
  return post(requestUrl(api.getAudit), params);
}
function getyzm(params) {
  return post(requestUrl(api.getyzm), params);
}
function findAllCarpricesByUserId(params) {
  return post(requestUrl(api.findAllCarpricesByUserId), params);
}
function addCarprices(params) {
  return post(requestUrl(api.addCarprices), params);
}
function deleteOrdetailedByOrdetaileid(params) {
  return post(requestUrl(api.deleteOrdetailedByOrdetaileid), params);
}
function deleteCarprices(params) {
  return post(requestUrl(api.deleteCarprices), params);
}
function getOrderOfUser(params) {
  return post(requestUrl(api.getOrderOfUser), params);
}
function queryOrderItem(params) {
  return post(requestUrl(api.queryOrderItem), params);
}
function confirmPeriodization(params) {
  return post(requestUrl(api.confirmPeriodization), params);
}
function getPaymentOrder(params) {
  return post(requestUrl(api.getPaymentOrder), params);
}
function amontMoney(params) {
  return post(requestUrl(api.amontMoney), params);
}
function addRepaymentrecordByOidAndDate(params) {
  return post(requestUrl(api.addRepaymentrecordByOidAndDate), params);
}
function findRepaymentrecordBycreateId(params) {
  return post(requestUrl(api.findRepaymentrecordBycreateId), params);
}
function getWXUserInformation(params) {
  return post(requestUrl(api.getWXUserInformation), params);
}
export {
  getAllInsurerCompany,
  decideLeg,
  addOrdetailed,
  extistOrderOfPridcard,
  getBank,
  addUserPhone,
  phoneIsExit,
  getAudit,
  getyzm,
  findAllCarpricesByUserId,
  addCarprices,
  deleteOrdetailedByOrdetaileid,
  deleteCarprices,
  getOrderOfUser,
  queryOrderItem,
  confirmPeriodization,
  getPaymentOrder,
  amontMoney,
  addRepaymentrecordByOidAndDate,
  findRepaymentrecordBycreateId,
  getWXUserInformation
};