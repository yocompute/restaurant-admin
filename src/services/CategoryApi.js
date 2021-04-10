import Api from "./Api";

const API_URL = process.env.REACT_APP_API_URL;

const CategoryApi = {
  async get(query) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/categories.json"
        : Api.buildUrl(API_URL, "categories", query);
    return await Api.get(url);
  },

  async create(entity) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/categories.json"
        : Api.buildUrl(API_URL, "categories");
    return await Api.post(url, entity);
  },

  async update(data, id) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/categories.json"
        : Api.buildUrl(API_URL, `categories/${id}`);

    return await Api.put(url, data);
  },
};

export default CategoryApi;
