import Api from './Api';

const API_URL = process.env.REACT_APP_API_URL;

const AuthApi = {

  async get(query = null) {
    const url = process.env.REACT_APP_MODE === 'local' ? '/auth.json' : Api.buildUrl(API_URL, 'auth', query);

    return await Api.get(url);
  },

  async getUserByTokenId(tokenId) {
    const url = process.env.REACT_APP_MODE === 'local' ? '/auth.json' : `${API_URL}/auth/${tokenId}`;
    return await Api.get(url);
  },

  async login(credential = null) {
    const url = process.env.REACT_APP_MODE === 'local' ? '/auth.json' : Api.buildUrl(API_URL, 'auth/login');

    return await Api.post(url, credential);
  },

  async signup(entity = null) {
    const url = process.env.REACT_APP_MODE === 'local' ? '/auth.json' : Api.buildUrl(API_URL, 'auth/signup');
    return await Api.post(url, entity);
  },

  async signupBrand(entity = null) {
    const url = process.env.REACT_APP_MODE === 'local' ? '/auth.json' : Api.buildUrl(API_URL, 'auth/signupBrand');
    return await Api.post(url, entity);
  },
  
};

export default AuthApi;
