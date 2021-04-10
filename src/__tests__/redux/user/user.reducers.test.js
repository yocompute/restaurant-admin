import {FETCH_USERS_SUCCESS} from '../../../redux/user/user.actions'
import {usersReducer} from '../../../redux/user/user.reducers'

const initState = {};

describe('user reducers', ()=> {

    it('should handle invalid action', ()=>{
        const users = usersReducer(initState, {type: 'Invalid Action'});
        expect(users).toEqual(initState);
    })

    it('should fetch users success', ()=>{
        const users = ['a', 'b'];
        const action = { type: FETCH_USERS_SUCCESS, users };
        const actualUsers = usersReducer(initState, action);
        expect(actualUsers).toEqual(users);
    })
})