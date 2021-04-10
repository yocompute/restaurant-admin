import Api from "./Api";

const API_URL = process.env.REACT_APP_API_URL;

const QrcodeApi = {
  async get(query) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/qrcodes.json"
        : Api.buildUrl(API_URL, "qrcodes", query);

    return await Api.get(url);
  },

  async create(entity) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/qrcodes.json"
        : Api.buildUrl(API_URL, "qrcodes");

    return await Api.post(url, entity);
  },

  async update(data, id) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/qrcodes.json"
        : Api.buildUrl(API_URL, `qrcodes/${id}`);

    return await Api.put(url, data);
  },
  async upload(file, qrcodeId) {
    const formData = new FormData();
    formData.append("upload", file);
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/qrcodes.json"
        : Api.buildUrl(API_URL, `qrcodes/upload/${qrcodeId}`);

    return await Api.post(url, formData);
  },
};

export default QrcodeApi;
