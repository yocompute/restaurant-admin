import Api from "./Api";

const API_URL = process.env.REACT_APP_API_URL;

const ProductApi = {
  async get(query) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/products.json"
        : Api.buildUrl(API_URL, "products", query);
    return await Api.get(url);
  },

  async create(entity) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/products.json"
        : Api.buildUrl(API_URL, "products");
    return await Api.post(url, entity);
  },

  async update(entity, id) {
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/products.json"
        : Api.buildUrl(API_URL, `products/${id}`);
    return await Api.put(url, entity);
  },

  async upload(file, productId) {
    const formData = new FormData();
    formData.append("upload", file);
    const url =
      process.env.REACT_APP_MODE === "local"
        ? "/products.json"
        : Api.buildUrl(API_URL, `products/upload/${productId}`);
    return await Api.post(url, formData);
  },
};

export default ProductApi;

// export default {
//   getProductList: (page, pageSize, search = "", params = null, sort = []) => {
//     let query = {};
//     if (!search) {
//       const condition = params && typeof params === "object" ? params : {};
//       query.query = buildPaginationQuery(page, pageSize, condition, [], sort);
//     } else {
//       const condition =
//         params && typeof params === "object"
//           ? {
//               ...params,
//               name: {
//                 $regex: search
//               }
//             }
//           : {
//               name: {
//                 $regex: search
//               }
//             };

//       query.query = buildPaginationQuery(page, pageSize, condition, [], sort);
//     }

//     return ApiService.v2().get("products", query);
//   },
//   toggleFeature: productId => {
//     return ApiService.v2().put("products/toggle-feature", {
//       productId
//     });
//   },

//   getProducts: conditions => { // https://duocun.ca/api/products
//     let query = {};
//     query.query = buildQuery(conditions);
//     return ApiService.v2().get("products", query);
//   },

//   getProduct: id => {
//     return ApiService.v2().get(`products/${id}`);
//   },
//   saveProduct: model => {
//     model._id = model._id || "new";
//     return ApiService.v2().post(`products/${model._id}`, { data: model });
//   },
//   deleteProduct: id => {
//     return ApiService.v2().delete(`products/${id}`);
//   },
//   getProductDeliveries: id => {
//     return ApiService.v2().get(`products/delivery/${id}`);
//   },

//   changeStatus: (productId, _currentStatus) => {
//     return ApiService.v2().put("products/toggle-status", {
//       productId
//     });
//   },

//   updateProduct: (productId, data) => {
//     return ApiService.v2().put("products/" + productId, { data });
//   },

//   uploadPicture: (file, productId) => {
//     const formData = new FormData();
//     formData.append("upload", file);
//     return ApiService.v2().post(
//       `products/imageUpload?productId=${productId}`,
//       formData
//     );
//   },
//   getProductsByKeyword: (keyword = "") => {
//     let query = {};
//     const condition = {
//       $or: [
//         {
//           name: { $regex: keyword }
//         },
//         {
//           description: { $regex: keyword }
//         }
//       ],
//       type: "G"
//     };
//     query.query = buildQuery(condition);
//     return ApiService.v2().get("products", query);
//   }
// };
