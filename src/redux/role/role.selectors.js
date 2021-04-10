import { createSelector } from 'reselect'

export const selectRoles = state => state['roles'];

export const selectMyRoles = createSelector(selectRoles, roles => 
    roles.map(role => {
        role.name
    })
)

// export const selectRoleByPhone = phone => createSelector(selectRoles, roles => roles.find(role => role.phone === phone));