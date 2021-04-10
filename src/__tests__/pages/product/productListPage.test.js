import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductListPage from '../../../pages/product/ProductListPage';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const middlewares = [];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

it('load Product List page', async () => {
    const {container, getByTestId } = render(
        <Provider store={store}>
            <ProductListPage />
        </Provider>
    );
    const addBtn = getByTestId('add-btn');
    expect(addBtn.textContent).toBe('Add');
    console.log(addBtn.textContent);
})