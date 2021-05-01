import { Permissions } from '../const';

export const hasPermission = (roles, path) => {
    const rs = Permissions[path];
    if(rs){
        return roles ? roles.some(v => rs.includes(v)) : false;
    }else{
        return false;
    }
}

export const toDateTimeString = (s) => {
    const ds = s.split('T');
    const date = ds ? ds[0]: '';
    const ts= ds[1].split('.');
    const time = ts[0]
    return `${date} ${time}`;
}