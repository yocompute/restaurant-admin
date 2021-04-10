import { Permissions } from '../const';

export const hasPermission = (roles, path) => {
    const rs = Permissions[path];
    if(rs){
        return roles ? roles.some(v => rs.includes(v)) : false;
    }else{
        return false;
    }
}