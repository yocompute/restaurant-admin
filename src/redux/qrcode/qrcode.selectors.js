import { createSelector } from 'reselect'
export const selectQrcodes = (state) => state.qrcodes
export const selectQrcodeTag = (state) => state.qrcodeTag
export const selectQrcode = (state) => state.qrcode

export const selectQrcodesByType = createSelector([selectQrcodes, selectQrcodeTag], (qrcodes, qrcodeTag) => {
    if(qrcodes){
        return qrcodes.filter(q => q.tag === qrcodeTag);
    }else{
        return [];
    }
});