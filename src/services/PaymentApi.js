import Api from './Api';

const API_URL = process.env.REACT_APP_API_URL;

const PaymentApi = {

  async get(query) {
    const url = process.env.REACT_APP_MODE === 'local' ? '/payments.json' : Api.buildUrl(API_URL, 'payments', query);

    return await Api.get(url);

  },

  async create(entity) {
    const url = process.env.REACT_APP_MODE === 'local' ? '/payments.json' : Api.buildUrl(API_URL, 'payments');

    return await Api.post(url, entity);
  },

  async update(data) {
    const url = process.env.REACT_APP_MODE === 'local' ? '/payments.json' : Api.buildUrl(API_URL, 'payments');

    return await Api.put(url, data);
  },
};

export default PaymentApi;
