import { 
    fetchUsers, fetchUsersSuccess, fetchUsersFail,
    FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAIL 
} from '../../../redux/user/user.actions'

describe('user action creators', ()=> {
    it('should create an action to fetch users', ()=>{
        const expectedAction = { type: FETCH_USERS };
        expect(fetchUsers()).toEqual(expectedAction);
    })
    it('should create an action to fetch users success', ()=>{
        const users = ['a', 'b'];
        const expectedAction = { type: FETCH_USERS_SUCCESS, users };
        expect(fetchUsersSuccess(users)).toEqual(expectedAction);
    })
    it('should create an action to fetch users', ()=>{
        const error = {msg: 'Unknown Exception'}
        const expectedAction = { type: FETCH_USERS_FAIL, error };
        expect(fetchUsersFail(error)).toEqual(expectedAction);
    })
})