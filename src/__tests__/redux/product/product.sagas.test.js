
import { call } from 'redux-saga/effects'

import ProductApi from '../../../services/ProductApi'
import {fetchProducts} from '../../../redux/product/product.sagas'

it("getProducts", () => {
    const it = fetchProducts('test')
    const v = it.next().value;
    console.log(v);
    // expect(v).toEqual(call(ProductApi.get, 'test'));
})