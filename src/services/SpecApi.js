import Api from "./Api";

const API_URL = process.env.REACT_APP_API_URL;

const SpecApi = {
  async get(query) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/specs.json"
        : Api.buildUrl(API_URL, "specs", query);
    return await Api.get(url);
  },

  async create(entity) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/specs.json"
        : Api.buildUrl(API_URL, "specs");
    return await Api.post(url, entity);
  },

  async update(data, id) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/specs.json"
        : Api.buildUrl(API_URL, `specs/${id}`);
    return await Api.put(url, data);
  },
};

export default SpecApi;
