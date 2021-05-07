import { Permissions } from '../const';

export const hasPermission = (roles, path) => {
    const rs = Permissions[path];
    if(rs){
        return roles ? roles.some(v => rs.includes(v)) : false;
    }else{
        return false;
    }
}

export const toDateTimeString = (s) => {
    const ds = s.split('T');
    const date = ds ? ds[0]: '';
    const ts= ds[1].split('.');
    const time = ts[0]
    return `${date} ${time}`;
}

/**
 * 
 * @param {*} item :ICartItem { product, price, cost, saleTaxRate, quantity, additions }
 * @returns 
 */
export const getSummary = (item) => {
    let additionTotal = 0;
    let additionSaleTax = 0;
  
    if(item.additions && item.additions.length > 0){
      item.additions.forEach(it => {
        const saleTaxRate = it.product.saleTaxRate ? it.product.saleTaxRate : 0;
        additionTotal += it.product.price * it.quantity;
        additionSaleTax += Math.round(it.product.price * it.quantity * saleTaxRate) / 100;
      });
    }
  
    const subTotal = Math.round((item.product.price + additionTotal) * item.quantity * 100) / 100;
    const saleTaxRate = item.product.saleTaxRate ? item.product.saleTaxRate : 0;
    const saleTax =  Math.round(((item.product.price * saleTaxRate) / 100 + additionSaleTax ) * item.quantity * 100) / 100;
    return { subTotal, saleTax };
  }