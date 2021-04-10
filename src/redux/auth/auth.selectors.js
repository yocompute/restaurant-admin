import { createSelector } from 'reselect'

export const selectAuth = state => state.auth;

export const selectTokenId = createSelector([selectAuth], auth => auth ? auth.tokenId: null);
export const selectAuthUser = createSelector([selectAuth], auth => auth ? auth.user: null);
export const selectAuthRoles = createSelector([selectAuthUser], user => user ? user.roles: null);
