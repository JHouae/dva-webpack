/**
 * 序列化get参数
 *
 * @param {Object}params 参数列表
 */
function stringifyParams(params) {
  // 值为null和undefined时，则过滤掉
  const encodeFn = encodeURIComponent;
  const paramsStr = params && Object.entries(dataCompile(params)).map(([name, value]) => {
    return `${name}=${encodeFn(value)}`;
  }).join('&');
  return paramsStr;
}

/**
 * 过滤数据中null和undefined
 * @param {object}data
 */
function dataCompile(data) {
  const validData = {};
  for (const prop in data) {
    if (Object.prototype.hasOwnProperty.call(data, prop)) {
      const value = data[prop];
      if (value !== null && typeof value !== 'undefined' && value !== '') {
        validData[prop] = value;
      }
    }
  }
  return validData;
}

/**
*
* 描述：日期格式化
*   date   date   日期
*   format string 格式
*   return string
*
* 例子：
*   dateFormat(new Date(2015,9,27), "yyyy-MM-dd") 返回 "2015-10-27"
*
**/
function dateFormat(date, format = 'yyyy-MM-dd') {
  let tempFormat = format;
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  if (/(y+)/.test(tempFormat)) {
    tempFormat = tempFormat.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(tempFormat)) {
      tempFormat = tempFormat.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr((`${o[k]}`).length));
    }
  }
  return tempFormat;
}

// 在日期的基础上添加天数
function addDate(date,days){ 
  var d=new Date(date); 
  d.setDate(d.getDate()+days); 
  var m=d.getMonth()+1; 
  return d.getFullYear()+'-'+m+'-'+d.getDate(); 
} 

export {
  stringifyParams,
  dataCompile,
  dateFormat,
  addDate
}