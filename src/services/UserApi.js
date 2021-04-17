import Api from "./Api";

const API_URL = process.env.REACT_APP_API_URL;

const UserApi = {
  async get(query) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/users.json"
        : Api.buildUrl(API_URL, "users", query);

    
    return await Api.get(url);
  },

  async create(entity) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/users.json"
        : Api.buildUrl(API_URL, "users");

    return await Api.post(url, entity);
  },

  async update(data, id) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/users.json"
        : Api.buildUrl(API_URL, `users/${id}`);

    return await Api.put(url, data);
  },
};

export default UserApi;
