import { createRef } from 'react';
import { createSelector } from 'reselect';


export const selectProduct = (state) => state.product;
export const selectAllAdditions = (state) => state.additions;
export const selectProducts = (state) => state.products;

export const selectCombo = (state) => state.combo;
export const selectComboAdditions = createSelector([selectCombo], (combo) => combo.additions);

export const selectCategoryMap = createSelector([selectProducts], (products) => {
    const categoryMap = {};
  
    if(!products){
        return categoryMap;
    }else{
        products.forEach(product => {
            if (product.category) {
                const catName = product.category.name;
                categoryMap[catName] = {
                    ...product.category,
                    ref: createRef(),
                    products: []
                }
            }
        });
    
        products.forEach(product => {
            if (product.category) {
                const catName = product.category.name;
                const cat = categoryMap[catName];
                if (cat) {
                    cat.products.push(product); // fix me sort
                }
            }
        });
    
        return categoryMap;
    }
});

export const selectAdditions = createSelector([selectProduct, selectAllAdditions], (product, additions) => {
    if(additions && product && product.additions && product.additions.length > 0){
        const arr = [];
        additions.forEach(a => {
            const aId = product.additions.find(p => p._id === a._id);
            if(aId){
                arr.push(a);
            }else{
                arr.push({...a, checked: false});
            }
        });
        return arr;
    }else if(additions && product && product.additions && product.additions.length === 0) {
        const arr = [];
        additions.forEach(a => {
            arr.push({...a, checked: false});
        });
        return arr;
    }else{
        return additions;
    }
});