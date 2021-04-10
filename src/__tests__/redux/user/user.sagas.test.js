

import { call } from 'redux-saga/effects'

import UserApi from '../../../services/UserApi'
import {fetchUsers} from '../../../redux/user/user.sagas'

it("getUsers", () => {
    const it = fetchUsers('test');
    const v = it.next().value;
    console.log(v);
    const v1 = call(UserApi.get, 'test');
    console.log(v1);
    // expect(it.next().value).toEqual(call(UserApi.get, 'test'));
})