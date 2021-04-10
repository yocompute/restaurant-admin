import { createSelector } from 'reselect'

export const selectUser = state => state.user;
export const selectUsers = state => state.users;

export const selectUserRoles = createSelector(selectUser, user => user.roles)

// export const selectMyUsers = createSelector(selectUsers, users => users.map(user => {user.name}))

// export const selectUserByPhone = phone => createSelector(selectUsers, users => users.find(user => user.phone === phone));