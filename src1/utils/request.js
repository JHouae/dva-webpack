import fetch from 'dva/fetch';
import { stringifyParams, dataCompile } from './common';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function checkApiCode(response) {
  const { code, msg, data } = response;
  if (code === "0000") {
    return data;
  } else {
    const error = new Error(msg);
    error.response = {code, msg};
    throw error;
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkApiCode)
}

const createHeader = (headers) => {
  return new Headers(
    {
      ...headers,
      token: localStorage.getItem('token')
    });
};
/**
 * get request
 *
 * @param {String}url requested source location
 * @param {Object}params request params key-value
 * @return response
 */
export function get(url, params) {
  let tempUrl = url;
  const paramsStr = stringifyParams(params);
  tempUrl = paramsStr ? (~tempUrl.indexOf('?') ? `${tempUrl}&${paramsStr}` : `${tempUrl}?${paramsStr}`) : tempUrl;
  return request(tempUrl, {
    method: 'GET',
    headers: createHeader(),
  });
}

/**
 * post request
 *
 * @param {String}url requested source location
 * @param {Object}data request data
 * @return response
 */
export function post(url, data) {
  return request(url, {
    method: 'POST',
    headers: createHeader({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(dataCompile(data)),
  });
}

