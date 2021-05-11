import { Permissions, ProductType } from '../const';

export const hasPermission = (roles, path) => {
  const rs = Permissions[path];
  if (rs) {
    return roles ? roles.some(v => rs.includes(v)) : false;
  } else {
    return false;
  }
}

export const toDateTimeString = (s) => {
  const ds = s.split('T');
  const date = ds ? ds[0] : '';
  const ts = ds[1].split('.');
  const time = ts[0]
  return `${date} ${time}`;
}

/**
 * 
 * @param {*} item :ICartItem { product, price, cost, saleTaxRate, quantity, additions }
 * @returns 
 */
export const getCartItemSummary = (item) => {
  let additionTotal = 0;
  let additionSaleTax = 0;

  if (item.additions && item.additions.length > 0) {
    item.additions.forEach(it => {
      const saleTaxRate = it.product.saleTaxRate ? it.product.saleTaxRate : 0;
      additionTotal += it.product.price * it.quantity;
      additionSaleTax += Math.round(it.product.price * it.quantity * saleTaxRate) / 100;
    });
  }

  const subTotal = Math.round((item.product.price + additionTotal) * item.quantity * 100) / 100;
  const saleTaxRate = item.product.saleTaxRate ? item.product.saleTaxRate : 0;
  const saleTax = Math.round(((item.product.price * saleTaxRate) / 100 + additionSaleTax) * item.quantity * 100) / 100;
  return { subTotal, saleTax };
}

/**
 * 
 * @param {*} order IOrder
 * @returns 
 */
export const getOrderSummary = (order) => {
  if(order.items && order.items.length > 0){
      let subTotal = 0;
      let saleTax = 0;
      order.items.forEach(it => {
          subTotal += it.subTotal;
          saleTax += it.saleTax;
      });
      subTotal = Math.round(subTotal * 100 ) / 100;
      saleTax = Math.round(saleTax * 100 ) / 100;
      let total = Math.round((subTotal + saleTax) * 100) / 100;
      
      return {subTotal, saleTax, total };
  }else{
      return {subTotal:0, saleTax:0, total: 0};
  }
}

/**
 * 
 * @param {*} items ICartItem[]
 * @param {*} item ICartItem
 * @returns 
 */
export const getCartItemIndex = (items, item) => {
  return items.findIndex(it => {
    if (it.product.type === ProductType.Single) {
      return it.product._id === item.product._id;
    } else {
      return it.comboId === item.comboId;
    }
  });
}

/**
 * 
 * @param {*} items ICartItem[]
 * @param {*} item ICartItem
 * @returns 
 */
export const removeCartItem = (items, item) => {
  return items.filter(it => {
    if (it.product.type === ProductType.Single) {
      return it.product._id !== item.product._id;
    } else {
      return it.comboId !== item.comboId;
    }
  });
}