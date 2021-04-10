import Api from "./Api";

const API_URL = process.env.REACT_APP_API_URL;

const BrandApi = {
  async get(query) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/brands.json"
        : Api.buildUrl(API_URL, "brands", query);
    return await Api.get(url);
  },

  async create(entity) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/brands.json"
        : Api.buildUrl(API_URL, "brands");
    return await Api.post(url, entity);
  },

  async update(data, id) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/brands.json"
        : Api.buildUrl(API_URL, `brands/${id}`);
    return await Api.put(url, data);
  },

  async upload(file, brandId) {
    const formData = new FormData();
    formData.append("upload", file);
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/brands.json"
        : Api.buildUrl(API_URL, `brands/upload/${brandId}`);
    return await Api.post(url, formData);
  },
};

export default BrandApi;
