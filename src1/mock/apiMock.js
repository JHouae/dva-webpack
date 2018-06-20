const Mock = require('mockjs');

const getAllInsurerCompany = Mock.mock({
  "data": [{ "insurerCompanyId": 1, "insurerCompanyName": "太保" }, { "insurerCompanyId": 2, "insurerCompanyName": "中国人保" }],
  "code": "0000",
  "msg": "返回成功"
});

const bankList = Mock.mock({
  "data": [{ "bankid": 1, "bankname": "太保" }, { "bankid": 2, "bankname": "中国人保" }],
  "code": "0000",
  "msg": "返回成功"
});

const decideLeg = Mock.mock({
  "data": { isSuccess: false },
  "code": "0000",
  "msg": "返回成功"
});

const phoneIsExit = Mock.mock({
  "code": "0000",
  "msg": "返回成功"
});

const getyzm = Mock.mock({
  "data": { verificationcode: 1 },
  "code": "0000",
  "msg": "返回成功"
});

const getOrderOfUser = Mock.mock({
  "code": "0000",
  "msg": "返回成功",
  "data": [{ commercialprice: 10000, platenumber: "粤A14521", status: 2, create_time: "2018-04-05", ordetaileid: 543 }]
});

const queryOrderItem = Mock.mock({
  "code": "0000",
  "msg": "返回成功",
  "data": {
    commercialprice: 13000,
    platenumber: "粤A14521",
    pname: "哈哈",
    insurer: "星",
    status: 2,
    qibaodate: "2018-04-05",
    jiezhidate: "2018-04-05",
    ordetaileid: 543,
    insurancecompany: "akakkaksjjjj",
    bankid: 123,
    pribankid: 123123123123123123,
    loanAmount: 29900,
    bankName: "y银行",
  }
});
const findRepaymentrecordBycreateId = Mock.mock({
  "code": "0000",
  "msg": "返回成功",
  "data": [
    [
      {
        "date": "2018-04-12",
        "repaymentRecordList": [
          { "shoulddate": "2018-04-12", "principal": "123.11", "lixi": "12.8", "platinum": "22222", "repaymentnum": "1/3" },
          { "shoulddate": "2018-04-12", "principal": "123.11", "lixi": "12.77", "platinum": "22222", "repaymentnum": "1/3" },
          { "shoulddate": "2018-04-12", "principal": "123.11", "lixi": "12.44", "platinum": "22222", "repaymentnum": "1/3" }
        ]
      },
      {
        "date": "2018-04-13",
        "repaymentRecordList": [
          { "shoulddate": "2018-04-12", "principal": "123.22", "lixi": "12.8", "platinum": "22222", "repaymentnum": "1/3" },
          { "shoulddate": "2018-04-12", "principal": "123.22", "lixi": "12.77", "platinum": "22222", "repaymentnum": "1/3" },
          { "shoulddate": "2018-04-12", "principal": "123.13", "lixi": "12.44", "platinum": "22222", "repaymentnum": "1/3" }
        ]
      }
    ],
    [
      {
        "date": "2019-04-12",
        "repaymentRecordList": [
          { "shoulddate": "2018-04-12", "principal": "123.33", "lixi": "12.8", "platinum": "22222", "repaymentnum": "1/3" },
          { "shoulddate": "2018-04-12", "principal": "123.33", "lixi": "12.77", "platinum": "22222", "repaymentnum": "1/3" },
          { "shoulddate": "2018-04-12", "principal": "123.88", "lixi": "12.44", "platinum": "22222", "repaymentnum": "1/3" }
        ]
      },
      {
        "date": "2019-04-13",
        "repaymentRecordList": [
          { "shoulddate": "2018-04-12", "principal": "123.44", "lixi": "12.8", "platinum": "22222", "repaymentnum": "1/3" },
          { "shoulddate": "2018-04-12", "principal": "123.55", "lixi": "12.77", "platinum": "22222", "repaymentnum": "1/3" },
          { "shoulddate": "2018-04-12", "principal": "123.88", "lixi": "12.44", "platinum": "22222", "repaymentnum": "1/3" }
        ]
      }
    ],
  ]
})

export default {
  getAllInsurerCompany,
  bankList,
  decideLeg,
  phoneIsExit,
  getyzm,
  getOrderOfUser,
  queryOrderItem,
  findRepaymentrecordBycreateId,
}

