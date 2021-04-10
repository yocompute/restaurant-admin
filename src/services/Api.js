import axios from 'axios';
import queryString from 'query-string';
import Cookies from 'js-cookie';
import {JWT_COOKIE} from '../const';

const Api = {
  /**
   * @param {*} url
   * return { data, error, status }
   */
  async get(url) {
    try {
      const tokenId = Cookies.get(JWT_COOKIE);
      const config = {
        headers: { Authorization: `Bearer ${tokenId}` }
      };
      const r = await axios.get(url, config);
      return { ...r.data, status: r.status };
    } catch (e) {
      return { ...e.response.data, status: e.response.status };
    }
  },

  /**
   * @param {*} url
   * return { data, error, status }
   */
   async post(url, entity) {
    try {
      const tokenId = Cookies.get(JWT_COOKIE);
      const config = {
        headers: { Authorization: `Bearer ${tokenId}` }
      };
      const r = await axios.post(url, entity, config);
      return { ...r.data, status: r.status };
    } catch (e) {
      return { ...e.response.data, status: e.response.status };
    }
  },

  /**
   * 
   * @param {*} url 
   * @param {*} updates The object include the fields to be updated
   */
  async put(url, updates) {
    try {
      const tokenId = Cookies.get(JWT_COOKIE);
      const config = {
        headers: { Authorization: `Bearer ${tokenId}` }
      };
      const r = await axios.put(url, updates, config);
      return { ...r.data, status: r.status };
    } catch (e) {
      return { ...e.response.data, status: e.response.status };
    }
  },

  /**
   * @param {*} rootUrl
   * @param {*} path
   * @param {*} params string or js object, support path/:id and path?q=x&p=y
   */
  buildUrl(rootUrl, path, params = null) {
    const url = rootUrl + (path.startsWith('/') ? path : `/${path}`);
    if (!params) {
      return url;
    }
    if (typeof params === 'string') {
      return url + params;
    }
    if (typeof params === 'object') {
      const q = JSON.stringify(params);

      return `${url}?${queryString.stringify({ where: q })}`;
    }
    return url;
  },
};

export default Api;
