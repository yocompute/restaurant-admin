import Api from "./Api";

const API_URL = process.env.REACT_APP_API_URL;

const SpecOptionApi = {
  async get(query) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/specOptions.json"
        : Api.buildUrl(API_URL, "specOptions", query);
    return await Api.get(url);
  },

  async create(entity) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/specOptions.json"
        : Api.buildUrl(API_URL, "specOptions");
    return await Api.post(url, entity);
  },

  async update(data, id) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/specOptions.json"
        : Api.buildUrl(API_URL, `specOptions/${id}`);
    return await Api.put(url, data);
  }
};

export default SpecOptionApi;
