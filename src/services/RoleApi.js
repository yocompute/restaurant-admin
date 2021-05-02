import Api from "./Api";

const API_URL = process.env.REACT_APP_API_URL;

const RoleApi = {
  async get(query) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/roles.json"
        : Api.buildUrl(API_URL, "roles", query);

    
    return await Api.get(url);
  },

  async create(entity) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/roles.json"
        : Api.buildUrl(API_URL, "roles");

    return await Api.post(url, entity);
  },

  async update(data, id) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/roles.json"
        : Api.buildUrl(API_URL, `roles/${id}`);

    return await Api.put(url, data);
  },
};

export default RoleApi;
